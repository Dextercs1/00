import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { recipes } from '../../data/recipes'

interface TeaProfileProps {
  preparedTeas: { recipeId: string; date: string; time: string }[]
}

interface CategoryInfo {
  key: string
  label: string
  icon: string
  color: string
  bgColor: string
}

const CATEGORIES: CategoryInfo[] = [
  {
    key: 'termogenico',
    label: 'Termogenico',
    icon: '🔥',
    color: 'from-terra-500 to-terra-600',
    bgColor: 'bg-terra-500/10',
  },
  {
    key: 'detox',
    label: 'Detox',
    icon: '✨',
    color: 'from-green-600 to-green-700',
    bgColor: 'bg-green-600/10',
  },
  {
    key: 'relaxante',
    label: 'Relaxante',
    icon: '🌙',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-500/10',
  },
  {
    key: 'energizante',
    label: 'Energizante',
    icon: '⚡',
    color: 'from-gold-500 to-gold-400',
    bgColor: 'bg-gold-500/10',
  },
  {
    key: 'diuretico',
    label: 'Diuretico',
    icon: '💧',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500/10',
  },
  {
    key: 'digestivo',
    label: 'Digestivo',
    icon: '🌿',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-500/10',
  },
]

export default function TeaProfile({ preparedTeas }: TeaProfileProps) {
  const categoryBreakdown = useMemo(() => {
    if (preparedTeas.length === 0) return []

    // Count teas per category
    const counts = new Map<string, number>()
    for (const tea of preparedTeas) {
      const recipe = recipes.find((r) => r.id === tea.recipeId)
      if (recipe) {
        const cat = recipe.category
        counts.set(cat, (counts.get(cat) || 0) + 1)
      }
    }

    const total = Array.from(counts.values()).reduce((a, b) => a + b, 0)

    return CATEGORIES.map((cat) => {
      const count = counts.get(cat.key) || 0
      const percentage = total > 0 ? Math.round((count / total) * 100) : 0
      return { ...cat, count, percentage }
    })
      .filter((c) => c.count > 0)
      .sort((a, b) => b.percentage - a.percentage)
  }, [preparedTeas])

  const hasData = categoryBreakdown.length > 0
  const topCategory = hasData ? categoryBreakdown[0] : null

  return (
    <motion.div
      className="bg-white/80 rounded-2xl p-5 card-shadow border border-cream-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display text-lg text-green-950 font-semibold">
            Seu Perfil de Cha
          </h3>
          {topCategory && (
            <p className="text-xs font-body text-green-700/70 mt-0.5">
              Voce prefere chas <span className="font-semibold">{topCategory.label.toLowerCase()}s</span> {topCategory.icon}
            </p>
          )}
        </div>
        <span className="text-2xl">🎯</span>
      </div>

      {hasData ? (
        <div className="space-y-3">
          {categoryBreakdown.map((cat, idx) => (
            <motion.div
              key={cat.key}
              className="space-y-1.5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 + 0.3 }}
            >
              {/* Label row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{cat.icon}</span>
                  <span className="text-xs font-body font-semibold text-green-900">
                    {cat.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-body text-green-700/60">
                    {cat.count} {cat.count === 1 ? 'cha' : 'chas'}
                  </span>
                  <span className="text-xs font-display font-bold text-green-950">
                    {cat.percentage}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className={`h-2.5 rounded-full overflow-hidden ${cat.bgColor}`}>
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${cat.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${cat.percentage}%` }}
                  transition={{
                    duration: 0.8,
                    delay: idx * 0.1 + 0.4,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Empty state */
        <motion.div
          className="py-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-4xl mb-3">🍃</div>
          <p className="text-sm font-body text-green-700 leading-relaxed max-w-[200px] mx-auto">
            Prepare seus primeiros chas para descobrir seu perfil!
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}
