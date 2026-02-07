import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { getToday } from '../../utils/dateHelpers'

interface ChallengeTrackerProps {
  startDate: string
  preparedTeas: { recipeId: string; date: string }[]
  daysActive: number
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T00:00:00')
  d.setDate(d.getDate() + days)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const MILESTONE_DAYS = [7, 14, 21]

export default function ChallengeTracker({ startDate, preparedTeas }: ChallengeTrackerProps) {
  const today = getToday()

  const { days, currentDay, isCompleted } = useMemo(() => {
    const teaDates = new Set(preparedTeas.map((t) => t.date))
    const effectiveStart = startDate || today

    const dayEntries = Array.from({ length: 21 }, (_, i) => {
      const dayNumber = i + 1
      const dateStr = addDays(effectiveStart, i)
      const hasTea = teaDates.has(dateStr)
      const isToday = dateStr === today
      const isPast = dateStr < today
      const isMilestone = MILESTONE_DAYS.includes(dayNumber)
      return { dayNumber, dateStr, hasTea, isToday, isPast, isMilestone }
    })

    // currentDay = which day of the 21 we're on
    const startMs = new Date(effectiveStart + 'T00:00:00').getTime()
    const todayMs = new Date(today + 'T00:00:00').getTime()
    const diff = Math.floor((todayMs - startMs) / (1000 * 60 * 60 * 24)) + 1
    const cDay = Math.min(Math.max(diff, 1), 22) // 22 means completed+1

    const completedCount = dayEntries.filter((d) => d.hasTea).length
    const allDone = completedCount >= 21

    return { days: dayEntries, currentDay: cDay, isCompleted: allDone }
  }, [startDate, preparedTeas, today])

  return (
    <motion.div
      className="bg-white/80 rounded-2xl p-5 card-shadow border border-cream-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-display text-lg text-green-950 font-semibold">
          Desafio 21 Dias
        </h3>
        <span className="text-2xl">{isCompleted ? '🏆' : '🎯'}</span>
      </div>

      {/* Progress subtitle */}
      <p className="text-xs font-body text-green-700 mb-4">
        {isCompleted ? (
          <motion.span
            className="text-gold-500 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Parabens! Desafio completo!
          </motion.span>
        ) : (
          <>
            Dia <span className="font-semibold text-green-900">{Math.min(currentDay, 21)}</span> de 21
          </>
        )}
      </p>

      {/* 3 weeks grid */}
      <div className="space-y-3">
        {[0, 1, 2].map((week) => (
          <div key={week}>
            {/* Week label */}
            <p className="text-[10px] font-body text-green-700/60 mb-1.5 uppercase tracking-wider">
              Semana {week + 1}
            </p>

            <div className="grid grid-cols-7 gap-2">
              {days.slice(week * 7, (week + 1) * 7).map((day) => {
                const isCurrent = day.isToday
                const filled = day.hasTea
                const milestone = day.isMilestone
                const future = !day.isPast && !day.isToday

                return (
                  <motion.div
                    key={day.dayNumber}
                    className="relative flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: day.dayNumber * 0.03 + 0.2,
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                    }}
                  >
                    {/* Circle */}
                    <div
                      className={`
                        w-9 h-9 rounded-full flex items-center justify-center text-xs font-body font-semibold
                        transition-all duration-300 relative
                        ${
                          filled
                            ? 'bg-gradient-to-br from-green-600 to-green-700 text-white'
                            : isCurrent
                              ? 'bg-green-950 text-cream-50 ring-2 ring-gold-400 ring-offset-1 ring-offset-cream-50'
                              : future
                                ? 'bg-cream-100 text-cream-300 border border-cream-200'
                                : 'bg-cream-200 text-green-700/40'
                        }
                      `}
                    >
                      {filled ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', delay: 0.1 }}
                        >
                          ✓
                        </motion.span>
                      ) : (
                        day.dayNumber
                      )}

                      {/* Current day pulse ring */}
                      {isCurrent && !filled && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-gold-400"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.8, 0, 0.8],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>

                    {/* Milestone star */}
                    {milestone && (
                      <motion.span
                        className={`
                          absolute -top-1 -right-1 text-[10px]
                          ${filled ? '' : 'grayscale opacity-40'}
                        `}
                        animate={filled ? {
                          rotate: [0, 15, -15, 0],
                          scale: [1, 1.2, 1],
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                      >
                        ⭐
                      </motion.span>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom progress bar */}
      <div className="mt-4">
        <div className="flex justify-between text-[10px] font-body text-green-700/60 mb-1">
          <span>Progresso</span>
          <span>{days.filter((d) => d.hasTea).length}/21 dias</span>
        </div>
        <div className="h-2 bg-cream-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-green-600 to-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${(days.filter((d) => d.hasTea).length / 21) * 100}%` }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Completed celebration */}
      {isCompleted && (
        <motion.div
          className="mt-4 p-3 rounded-xl bg-gradient-to-r from-gold-500/10 to-terra-500/10 border border-gold-400/30 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm font-display font-bold text-gold-500">
            🎉 Parabens! Desafio completo!
          </p>
          <p className="text-xs font-body text-green-700 mt-1">
            Voce formou o habito de tomar cha diariamente. Continue assim!
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
