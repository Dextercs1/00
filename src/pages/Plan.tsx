import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { recipes } from '../data/recipes'
import { useUserData } from '../hooks/useUserData'
import { getWeekDates, formatDateBR, getToday } from '../utils/dateHelpers'
import { generateWeeklyPlan } from '../utils/teaRecommender'
import PageTransition from '../components/layout/PageTransition'
import WeeklyCalendar from '../components/plan/WeeklyCalendar'
import DayPlan from '../components/plan/DayPlan'

/**
 * Prepared teas are stored as "YYYY-MM-DD:recipeId" strings
 * in the userData.preparedTeas array so we can track per-day completion.
 */
function makePreparedKey(date: string, recipeId: string): string {
  return `${date}:${recipeId}`
}

function parsePreparedKeys(keys: string[], date: string): string[] {
  const prefix = `${date}:`
  return keys
    .filter((k) => k.startsWith(prefix))
    .map((k) => k.slice(prefix.length))
}

function countPreparedForDate(keys: string[], date: string): number {
  const prefix = `${date}:`
  return keys.filter((k) => k.startsWith(prefix)).length
}

export default function Plan() {
  const { userData, updateUserData } = useUserData()
  const weekDates = useMemo(() => getWeekDates(), [])
  const today = getToday()
  const [selectedDate, setSelectedDate] = useState(today)

  // Generate the base weekly plan
  const basePlan = useMemo(
    () => generateWeeklyPlan(userData.goal, userData.restrictions, userData.startDate),
    [userData.goal, userData.restrictions, userData.startDate],
  )

  // Track swaps in local state (persisted via localStorage under a dedicated key)
  const swapStorageKey = 'cha-secreto-plan-swaps'
  const [swaps, setSwaps] = useState<Record<string, string>>(() => {
    try {
      const stored = localStorage.getItem(swapStorageKey)
      return stored ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  })

  // Merge swaps into the base plan
  const weeklyPlan = useMemo(() => {
    const merged = { ...basePlan }
    for (const [compositeKey, recipeId] of Object.entries(swaps)) {
      const [date, slot] = compositeKey.split('|')
      if (merged[date] && (slot === 'manha' || slot === 'tarde' || slot === 'noite')) {
        const recipe = recipes.find((r) => r.id === recipeId)
        if (recipe) {
          merged[date] = { ...merged[date], [slot]: recipe }
        }
      }
    }
    return merged
  }, [basePlan, swaps])

  // Computed completed dates map for the calendar
  const completedDates = useMemo(() => {
    const map: Record<string, number> = {}
    for (const date of weekDates) {
      map[date] = countPreparedForDate(userData.preparedTeas, date)
    }
    return map
  }, [weekDates, userData.preparedTeas])

  // Total completed this week
  const totalCompleted = useMemo(
    () => weekDates.reduce((sum, d) => sum + (completedDates[d] || 0), 0),
    [weekDates, completedDates],
  )

  const allComplete = totalCompleted >= 21

  // Prepared teas for the selected day
  const preparedToday = useMemo(
    () => parsePreparedKeys(userData.preparedTeas, selectedDate),
    [userData.preparedTeas, selectedDate],
  )

  // Handle marking a tea as prepared
  const handlePrepare = useCallback(
    (recipeId: string) => {
      const key = makePreparedKey(selectedDate, recipeId)
      if (!userData.preparedTeas.includes(key)) {
        updateUserData({
          preparedTeas: [...userData.preparedTeas, key],
        })
      }
    },
    [selectedDate, userData.preparedTeas, updateUserData],
  )

  // Handle swapping a recipe
  const handleSwap = useCallback(
    (slot: string, recipeId: string) => {
      const compositeKey = `${selectedDate}|${slot}`
      const newSwaps = { ...swaps, [compositeKey]: recipeId }
      setSwaps(newSwaps)
      try {
        localStorage.setItem(swapStorageKey, JSON.stringify(newSwaps))
      } catch {
        // storage full - ignore
      }
    },
    [selectedDate, swaps],
  )

  // Format week range for subtitle
  const weekRangeLabel = useMemo(() => {
    if (weekDates.length < 7) return ''
    return `${formatDateBR(weekDates[0])} - ${formatDateBR(weekDates[6])}`
  }, [weekDates])

  const currentDayPlan = weeklyPlan[selectedDate]

  return (
    <PageTransition>
      <div className="min-h-dvh pb-28 bg-cream-50">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-gradient-to-b from-cream-50 via-cream-50/95 to-transparent backdrop-blur-md">
          <div
            className="px-5 pt-3 pb-2"
            style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 0.75rem)' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display text-xl font-bold text-green-950 tracking-tight">
                  Seu Plano Semanal
                </h1>
                <p className="font-body text-sm text-green-600/70 mt-0.5">
                  {weekRangeLabel}
                </p>
              </div>

              {/* Week progress ring */}
              <div className="relative flex items-center justify-center w-11 h-11">
                <svg className="w-11 h-11 -rotate-90" viewBox="0 0 44 44">
                  <circle
                    cx="22"
                    cy="22"
                    r="18"
                    fill="none"
                    stroke="var(--color-cream-200)"
                    strokeWidth="3.5"
                  />
                  <circle
                    cx="22"
                    cy="22"
                    r="18"
                    fill="none"
                    stroke={allComplete ? 'var(--color-gold-500)' : 'var(--color-green-700)'}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray={`${(totalCompleted / 21) * 113.1} 113.1`}
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <span className="absolute font-body text-[10px] font-bold text-green-800">
                  {totalCompleted}
                </span>
              </div>
            </div>
          </div>

          {/* Calendar */}
          <WeeklyCalendar
            weekDates={weekDates}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            completedDates={completedDates}
          />

          <div className="h-px bg-gradient-to-r from-transparent via-cream-200/50 to-transparent" />
        </header>

        {/* Day plan section */}
        <div className="pt-5">
          {/* Selected date label */}
          <motion.div
            key={selectedDate}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="px-5 mb-4 flex items-center gap-2"
          >
            <div className="w-1 h-5 rounded-full bg-green-700" />
            <h2 className="font-display text-base font-bold text-green-950">
              {selectedDate === today
                ? 'Hoje'
                : formatDateBR(selectedDate)}
            </h2>
            {selectedDate === today && (
              <span className="font-body text-xs text-green-600/60 ml-1">
                {formatDateBR(selectedDate)}
              </span>
            )}
          </motion.div>

          {/* Day plan cards */}
          {currentDayPlan ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDate}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <DayPlan
                  date={selectedDate}
                  plan={currentDayPlan}
                  onSwap={handleSwap}
                  onPrepare={handlePrepare}
                  preparedToday={preparedToday}
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="px-5 py-12 text-center">
              <p className="text-4xl mb-3">📋</p>
              <p className="font-body text-sm text-green-600/60">
                Plano nao disponivel para esta data
              </p>
            </div>
          )}
        </div>

        {/* Weekly summary */}
        <motion.div
          className="mx-5 mt-8 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div
            className={`
              p-5 border
              ${allComplete
                ? 'bg-gradient-to-br from-gold-400/15 via-gold-300/10 to-cream-50 border-gold-400/30'
                : 'bg-gradient-to-br from-green-800/[0.06] via-cream-100/60 to-cream-50 border-cream-200/50'
              }
            `}
          >
            {allComplete ? (
              /* All done - congratulations */
              <div className="text-center">
                <motion.p
                  className="text-4xl mb-2"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  🏆
                </motion.p>
                <h3 className="font-display text-lg font-bold text-green-950">
                  Semana Completa!
                </h3>
                <p className="font-body text-sm text-green-600/70 mt-1 max-w-xs mx-auto">
                  Parabens! Voce completou todos os 21 chas desta semana.
                  Sua dedicacao e inspiradora!
                </p>
              </div>
            ) : (
              /* Progress summary */
              <div className="flex items-center gap-4">
                <div className="shrink-0">
                  <div className="relative flex items-center justify-center w-14 h-14">
                    <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                      <circle
                        cx="28"
                        cy="28"
                        r="23"
                        fill="none"
                        stroke="var(--color-cream-200)"
                        strokeWidth="4"
                      />
                      <circle
                        cx="28"
                        cy="28"
                        r="23"
                        fill="none"
                        stroke="var(--color-green-700)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={`${(totalCompleted / 21) * 144.51} 144.51`}
                        className="transition-all duration-700 ease-out"
                      />
                    </svg>
                    <span className="absolute font-display text-sm font-bold text-green-800">
                      {Math.round((totalCompleted / 21) * 100)}%
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-body text-sm font-bold text-green-950">
                    Progresso Semanal
                  </h3>
                  <p className="font-body text-xs text-green-600/70 mt-0.5">
                    {totalCompleted} de 21 chas completados esta semana
                  </p>

                  {/* Mini progress bar */}
                  <div className="mt-2.5 h-1.5 rounded-full bg-cream-200 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-green-700 to-green-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(totalCompleted / 21) * 100}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Motivational tip */}
        <motion.div
          className="mx-5 mt-4 p-4 rounded-2xl bg-cream-100/60 border border-cream-200/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-start gap-3">
            <span className="text-lg shrink-0 mt-0.5">💡</span>
            <p className="font-body text-xs text-green-600/70 leading-relaxed">
              Dica: Toque em &quot;Trocar&quot; para substituir um cha por outra receita
              compativel com o horario. Personalize seu plano conforme sua preferencia!
            </p>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  )
}
