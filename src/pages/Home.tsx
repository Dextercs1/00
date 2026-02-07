import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/layout/PageTransition'
import DailyTea from '../components/home/DailyTea'
import StreakCounter from '../components/home/StreakCounter'
import WeeklyProgress from '../components/home/WeeklyProgress'
import MotivationalQuote from '../components/home/MotivationalQuote'
import { useUserData } from '../hooks/useUserData'
import { useStreak } from '../hooks/useStreak'
import { useDailyTea } from '../hooks/useDailyTea'
import type { Recipe } from '../data/recipes'

const categoryEmojis: Record<string, string> = {
  detox: '\uD83C\uDF3F',
  termogenico: '\uD83D\uDD25',
  relaxante: '\uD83C\uDF19',
  energizante: '\u26A1',
  diuretico: '\uD83D\uDCA7',
  digestivo: '\uD83C\uDF3E',
}

const timeSlotLabels: Record<string, string> = {
  manha: 'Manha',
  tarde: 'Tarde',
  noite: 'Noite',
}

const timeSlotIcons: Record<string, string> = {
  manha: '\u2600\uFE0F',
  tarde: '\uD83C\uDF24\uFE0F',
  noite: '\uD83C\uDF19',
}

function getTeaTimeBanner(timeOfDay: 'manha' | 'tarde' | 'noite'): string | null {
  const hour = new Date().getHours()

  // Show contextual banners at ideal tea times
  if (timeOfDay === 'manha' && hour >= 6 && hour <= 9) {
    return 'Sao ' + String(hour).padStart(2, '0') + 'h \u2014 hora perfeita para um cha energizante!'
  }
  if (timeOfDay === 'tarde' && hour >= 14 && hour <= 16) {
    return 'Sao ' + String(hour).padStart(2, '0') + 'h \u2014 hora perfeita para um cha termogenico!'
  }
  if (timeOfDay === 'noite' && hour >= 20 && hour <= 22) {
    return 'Sao ' + String(hour).padStart(2, '0') + 'h \u2014 hora perfeita para um cha relaxante!'
  }

  return null
}

interface SuggestionCardProps {
  tea: Recipe
  slotLabel: string
  slotIcon: string
  index: number
  onPress: () => void
}

function SuggestionCard({ tea, slotLabel, slotIcon, index, onPress }: SuggestionCardProps) {
  const emoji = categoryEmojis[tea.category] || '\uD83C\uDF75'

  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={onPress}
      className="
        flex-shrink-0 w-56 text-left
        rounded-2xl card-shadow bg-white p-4
        active:scale-[0.97] transition-transform duration-150
        focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600/40
      "
    >
      {/* Slot label */}
      <div className="flex items-center gap-1.5 mb-3">
        <span className="text-sm select-none">{slotIcon}</span>
        <span className="font-body text-[10px] font-semibold uppercase tracking-widest text-green-800/50">
          {slotLabel}
        </span>
      </div>

      {/* Tea emoji + name */}
      <div className="flex items-start gap-3">
        <span className="text-3xl select-none flex-shrink-0">{emoji}</span>
        <div className="min-w-0">
          <h4 className="font-display text-sm font-bold text-green-950 leading-snug line-clamp-2">
            {tea.name}
          </h4>
          <p className="font-body text-xs text-green-800/50 mt-1">
            {tea.prepTime} min
          </p>
        </div>
      </div>
    </motion.button>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { userData, markTeaPrepared } = useUserData()
  const { currentStreak, longestStreak, hasTeaToday } = useStreak(userData.preparedTeas)
  const { dailyTea, morningTea, afternoonTea, nightTea, timeOfDay, greeting } = useDailyTea(userData)

  const teaTimeBanner = getTeaTimeBanner(timeOfDay)

  // Build suggestion cards for other time slots
  const suggestions = useMemo(() => {
    const items: { tea: Recipe; slot: 'manha' | 'tarde' | 'noite' }[] = []

    if (timeOfDay === 'manha') {
      items.push({ tea: afternoonTea, slot: 'tarde' })
      items.push({ tea: nightTea, slot: 'noite' })
    } else if (timeOfDay === 'tarde') {
      items.push({ tea: nightTea, slot: 'noite' })
      items.push({ tea: morningTea, slot: 'manha' })
    } else {
      items.push({ tea: morningTea, slot: 'manha' })
      items.push({ tea: afternoonTea, slot: 'tarde' })
    }

    return items
  }, [timeOfDay, morningTea, afternoonTea, nightTea])

  const handlePrepare = () => {
    markTeaPrepared(dailyTea.id)
  }

  const handleViewRecipe = () => {
    navigate(`/recipes/${dailyTea.id}`)
  }

  const handleSuggestionPress = (recipeId: string) => {
    navigate(`/recipes/${recipeId}`)
  }

  return (
    <PageTransition>
      <div className="min-h-dvh px-5 pt-6 pb-8 max-w-lg mx-auto">
        {/* Header with greeting */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-green-950">
                  {greeting}
                </h1>
                <motion.span
                  animate={{ rotate: [0, 15, -10, 0] }}
                  transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatDelay: 4 }}
                  className="text-2xl select-none"
                >
                  {'\uD83C\uDF3F'}
                </motion.span>
              </div>
              <p className="font-body text-sm text-green-800/60 mt-0.5">
                Seu ritual de bem-estar diario
              </p>
            </div>
          </div>
        </motion.header>

        {/* Tea time notification banner */}
        {teaTimeBanner && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-5 px-4 py-3 rounded-2xl bg-gradient-to-r from-green-800 to-green-700 card-shadow"
          >
            <div className="flex items-center gap-2.5">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="text-lg select-none"
              >
                {'\uD83C\uDF75'}
              </motion.span>
              <p className="font-body text-sm font-medium text-white/90">
                {teaTimeBanner}
              </p>
            </div>
          </motion.div>
        )}

        {/* Main content stack */}
        <div className="flex flex-col gap-5">
          {/* 1. Hero daily tea card */}
          <DailyTea
            recipe={dailyTea}
            onPrepare={handlePrepare}
            onViewRecipe={handleViewRecipe}
          />

          {/* 2. Streak counter */}
          <StreakCounter
            currentStreak={currentStreak}
            longestStreak={longestStreak}
            hasTeaToday={hasTeaToday}
          />

          {/* 3. Weekly progress */}
          <WeeklyProgress preparedTeas={userData.preparedTeas} />

          {/* 4. Motivational quote */}
          <MotivationalQuote />

          {/* 5. Quick suggestions for other time slots */}
          {suggestions.length > 0 && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <h3 className="font-display text-base font-bold text-green-950 mb-3">
                Sugestoes para depois
              </h3>
              <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1">
                {suggestions.map((item, index) => (
                  <SuggestionCard
                    key={item.tea.id + '-' + item.slot}
                    tea={item.tea}
                    slotLabel={timeSlotLabels[item.slot]}
                    slotIcon={timeSlotIcons[item.slot]}
                    index={index}
                    onPress={() => handleSuggestionPress(item.tea.id)}
                  />
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
