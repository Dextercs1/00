import { motion } from 'framer-motion'

interface StatsOverviewProps {
  totalTeas: number
  currentStreak: number
  longestStreak: number
  daysActive: number
  recipesTriedCount: number
}

interface StatCardConfig {
  icon: string
  value: number
  label: string
  gradient: string
  suffix?: string
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
}

export default function StatsOverview({
  totalTeas,
  currentStreak,
  longestStreak,
  recipesTriedCount,
}: StatsOverviewProps) {
  const cards: StatCardConfig[] = [
    {
      icon: '🍵',
      value: totalTeas,
      label: 'Total de Chas',
      gradient: 'from-green-800/10 to-green-600/10',
    },
    {
      icon: '🔥',
      value: currentStreak,
      label: 'Streak Atual',
      gradient: 'from-terra-500/10 to-gold-500/10',
      suffix: currentStreak === 1 ? ' dia' : ' dias',
    },
    {
      icon: '🏆',
      value: longestStreak,
      label: 'Recorde',
      gradient: 'from-gold-500/10 to-gold-400/10',
      suffix: longestStreak === 1 ? ' dia' : ' dias',
    },
    {
      icon: '📖',
      value: recipesTriedCount,
      label: 'Receitas Testadas',
      gradient: 'from-green-700/10 to-green-500/10',
    },
  ]

  return (
    <motion.div
      className="grid grid-cols-2 gap-3"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {cards.map((card) => (
        <motion.div
          key={card.label}
          className={`
            relative overflow-hidden rounded-2xl p-4
            bg-gradient-to-br ${card.gradient}
            bg-white/60 border border-cream-200
            card-shadow
          `}
          variants={item}
        >
          {/* Background decorative icon */}
          <div className="absolute -top-2 -right-2 text-4xl opacity-10 rotate-12">
            {card.icon}
          </div>

          {/* Icon */}
          <span className="text-2xl mb-2 block">{card.icon}</span>

          {/* Value */}
          <motion.div
            className="font-display text-3xl font-bold text-green-950 leading-none mb-1"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
          >
            <CountUp target={card.value} />
            {card.suffix && (
              <span className="text-sm font-body font-normal text-green-700/70">{card.suffix}</span>
            )}
          </motion.div>

          {/* Label */}
          <p className="text-xs font-body text-green-700 leading-snug">{card.label}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

/**
 * Animated counter that counts from 0 to target value.
 */
function CountUp({ target }: { target: number }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.span
        key={target}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {target}
      </motion.span>
    </motion.span>
  )
}
