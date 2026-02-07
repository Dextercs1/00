import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Achievement } from '../../data/achievements'
import BadgeCard from '../gamification/BadgeCard'

interface AchievementsProps {
  achievements: Achievement[]
  unlockedIds: string[]
  newIds: string[]
}

type FilterTab = 'todas' | 'conquistadas' | 'bloqueadas'

const TABS: { key: FilterTab; label: string }[] = [
  { key: 'todas', label: 'Todas' },
  { key: 'conquistadas', label: 'Conquistadas' },
  { key: 'bloqueadas', label: 'Bloqueadas' },
]

export default function Achievements({ achievements, unlockedIds, newIds }: AchievementsProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>('todas')

  const unlockedSet = new Set(unlockedIds)
  const newSet = new Set(newIds)
  const unlockedCount = unlockedIds.length

  const filtered = achievements.filter((a) => {
    switch (activeTab) {
      case 'conquistadas':
        return unlockedSet.has(a.id)
      case 'bloqueadas':
        return !unlockedSet.has(a.id)
      default:
        return true
    }
  })

  // Sort: new first, then unlocked, then locked
  const sorted = [...filtered].sort((a, b) => {
    const aNew = newSet.has(a.id) ? 0 : 1
    const bNew = newSet.has(b.id) ? 0 : 1
    if (aNew !== bNew) return aNew - bNew

    const aUnlocked = unlockedSet.has(a.id) ? 0 : 1
    const bUnlocked = unlockedSet.has(b.id) ? 0 : 1
    return aUnlocked - bUnlocked
  })

  return (
    <motion.div
      className="bg-white/80 rounded-2xl p-5 card-shadow border border-cream-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-display text-lg text-green-950 font-semibold">Conquistas</h3>
        <span className="text-2xl">🏅</span>
      </div>

      {/* Counter */}
      <p className="text-xs font-body text-green-700/70 mb-4">
        <motion.span
          className="font-semibold text-green-900"
          key={unlockedCount}
          initial={{ scale: 1.3, color: '#c9a84c' }}
          animate={{ scale: 1, color: '#1b3a1b' }}
          transition={{ duration: 0.5 }}
        >
          {unlockedCount}
        </motion.span>
        {' '}de {achievements.length} conquistadas
      </p>

      {/* Filter tabs */}
      <div className="flex gap-1 mb-4 bg-cream-100 rounded-xl p-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`
              flex-1 py-2 px-3 rounded-lg text-xs font-body font-semibold
              transition-all duration-300
              ${
                activeTab === tab.key
                  ? 'bg-white text-green-950 card-shadow'
                  : 'text-green-700/60 hover:text-green-800'
              }
            `}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Achievements grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="grid grid-cols-3 gap-2.5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {sorted.length > 0 ? (
            sorted.map((achievement, idx) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: idx * 0.04,
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <BadgeCard
                  achievement={achievement}
                  isUnlocked={unlockedSet.has(achievement.id)}
                  isNew={newSet.has(achievement.id)}
                />
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 py-8 text-center">
              <p className="text-sm font-body text-green-700/60">
                {activeTab === 'conquistadas'
                  ? 'Nenhuma conquista desbloqueada ainda. Continue tomando chas!'
                  : 'Todas as conquistas foram desbloqueadas! Incrivel!'}
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
