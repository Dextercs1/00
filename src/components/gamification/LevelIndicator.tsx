import { motion } from 'framer-motion'

interface LevelIndicatorProps {
  totalTeas: number
}

interface LevelConfig {
  name: string
  icon: string
  min: number
  max: number
  gradient: string
}

const LEVELS: LevelConfig[] = [
  { name: 'Iniciante', icon: '🌱', min: 0, max: 5, gradient: 'from-green-500 to-green-600' },
  { name: 'Aprendiz', icon: '🌿', min: 6, max: 15, gradient: 'from-green-600 to-green-700' },
  { name: 'Conhecedor', icon: '🍃', min: 16, max: 30, gradient: 'from-green-700 to-green-800' },
  { name: 'Mestre', icon: '🏅', min: 31, max: 50, gradient: 'from-gold-500 to-terra-500' },
  { name: 'Grao-Mestre', icon: '👑', min: 51, max: Infinity, gradient: 'from-gold-400 to-gold-500' },
]

function getCurrentLevel(totalTeas: number): LevelConfig {
  for (const level of LEVELS) {
    if (totalTeas >= level.min && totalTeas <= level.max) {
      return level
    }
  }
  return LEVELS[LEVELS.length - 1]
}

function getNextLevel(totalTeas: number): LevelConfig | null {
  const currentIdx = LEVELS.findIndex(
    (l) => totalTeas >= l.min && totalTeas <= l.max,
  )
  if (currentIdx < LEVELS.length - 1) {
    return LEVELS[currentIdx + 1]
  }
  return null
}

export default function LevelIndicator({ totalTeas }: LevelIndicatorProps) {
  const current = getCurrentLevel(totalTeas)
  const next = getNextLevel(totalTeas)

  const progressInLevel = totalTeas - current.min
  const levelRange = current.max === Infinity ? 1 : current.max - current.min + 1
  const progressPercent =
    current.max === Infinity ? 100 : Math.min(100, (progressInLevel / levelRange) * 100)

  const teasToNext = next ? next.min - totalTeas : 0

  return (
    <motion.div
      className="bg-white/80 rounded-2xl p-5 card-shadow border border-cream-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg text-green-950 font-semibold">Seu Nivel</h3>
        <motion.div
          className="flex items-center gap-2 bg-gradient-to-r from-cream-50 to-cream-100 rounded-full px-3 py-1.5 border border-cream-200"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.4 }}
        >
          <span className="text-xl">{current.icon}</span>
          <span className="font-display font-bold text-green-900 text-sm">{current.name}</span>
        </motion.div>
      </div>

      {/* Level progress visual */}
      <div className="flex items-center gap-3 mb-3">
        {LEVELS.map((level, idx) => {
          const isActive = level.name === current.name
          const isPast = totalTeas > level.max
          return (
            <motion.div
              key={level.name}
              className={`
                flex flex-col items-center flex-1
                ${isActive ? 'scale-110' : ''}
              `}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx + 0.3 }}
            >
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm
                  transition-all duration-500
                  ${isActive ? 'ring-2 ring-gold-400 ring-offset-2 ring-offset-cream-50' : ''}
                  ${isPast || isActive ? 'bg-gradient-to-br ' + level.gradient : 'bg-cream-200'}
                `}
              >
                <span className={isPast || isActive ? '' : 'grayscale opacity-40'}>
                  {level.icon}
                </span>
              </div>
              <span
                className={`
                  text-[8px] font-body mt-1 text-center leading-tight
                  ${isActive ? 'text-green-900 font-bold' : 'text-green-700/50'}
                `}
              >
                {level.name}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className="relative h-3 bg-cream-200 rounded-full overflow-hidden mb-2">
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${current.gradient}`}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        />
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
          style={{ width: `${progressPercent}%` }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 3 }}
        />
      </div>

      {/* Next level info */}
      <div className="text-center">
        {next ? (
          <motion.p
            className="text-xs font-body text-green-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-gold-500 font-semibold">{teasToNext}</span>
            {teasToNext === 1 ? ' cha' : ' chas'} para o proximo nivel:{' '}
            <span className="font-semibold">{next.icon} {next.name}</span>
          </motion.p>
        ) : (
          <motion.p
            className="text-xs font-body text-gold-500 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Nivel maximo alcancado! Voce e um Grao-Mestre! 👑
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}
