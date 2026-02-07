import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useUserData } from '../hooks/useUserData'
import { useStreak } from '../hooks/useStreak'
import { useAchievements } from '../hooks/useAchievements'
import { achievements as allAchievements } from '../data/achievements'
import { recipes } from '../data/recipes'
import { getDaysSinceStart } from '../utils/dateHelpers'
import PageTransition from '../components/layout/PageTransition'
import StatsOverview from '../components/progress/StatsOverview'
import FrequencyChart from '../components/progress/FrequencyChart'
import TeaProfile from '../components/progress/TeaProfile'
import Achievements from '../components/progress/Achievements'
import LevelIndicator from '../components/gamification/LevelIndicator'
import ChallengeTracker from '../components/gamification/ChallengeTracker'

export default function Progress() {
  const { userData } = useUserData()
  const { currentStreak, longestStreak } = useStreak(userData.preparedTeas)
  const { unlockedAchievements, newAchievements } = useAchievements(userData)

  const totalTeas = userData.preparedTeas.length

  const daysActive = useMemo(() => {
    if (!userData.startDate) return 1
    return getDaysSinceStart(userData.startDate)
  }, [userData.startDate])

  const recipesTriedCount = useMemo(() => {
    const uniqueRecipes = new Set(userData.preparedTeas.map((t) => t.recipeId))
    return uniqueRecipes.size
  }, [userData.preparedTeas])

  const unlockedIds = useMemo(
    () => unlockedAchievements.map((a) => a.id),
    [unlockedAchievements],
  )

  const newIds = useMemo(
    () => newAchievements.map((a) => a.id),
    [newAchievements],
  )

  return (
    <PageTransition>
      <div className="min-h-dvh bg-cream-50 pb-8">
        {/* Header */}
        <div className="relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-green-950 via-green-900 to-transparent h-56" />

          {/* Decorative circles */}
          <motion.div
            className="absolute top-8 right-6 w-32 h-32 rounded-full bg-green-800/20"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-20 left-4 w-20 h-20 rounded-full bg-green-700/10"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />

          <div className="relative px-5 pt-14 pb-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="font-display text-2xl font-bold text-cream-50 mb-1">
                Meu Progresso
              </h1>
              <p className="text-sm font-body text-cream-200/80">
                {daysActive === 1
                  ? 'Primeiro dia da sua jornada!'
                  : `${daysActive} dias na sua jornada do cha`}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 -mt-4 space-y-5">
          {/* Stats Overview */}
          <StatsOverview
            totalTeas={totalTeas}
            currentStreak={currentStreak}
            longestStreak={longestStreak}
            daysActive={daysActive}
            recipesTriedCount={recipesTriedCount}
          />

          {/* Frequency Chart */}
          <FrequencyChart preparedTeas={userData.preparedTeas} />

          {/* Tea Profile */}
          <TeaProfile preparedTeas={userData.preparedTeas} />

          {/* Achievements */}
          <Achievements
            achievements={allAchievements}
            unlockedIds={unlockedIds}
            newIds={newIds}
          />

          {/* Level Indicator */}
          <LevelIndicator totalTeas={totalTeas} />

          {/* 21-Day Challenge */}
          <ChallengeTracker
            startDate={userData.startDate}
            preparedTeas={userData.preparedTeas}
            daysActive={daysActive}
          />

          {/* Motivational footer */}
          <motion.div
            className="text-center py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-xs font-body text-green-700/50">
              Cada cha e um passo na sua jornada de bem-estar 🍃
            </p>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
