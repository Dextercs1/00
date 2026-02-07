import { motion } from 'framer-motion'

interface StreakCounterProps {
  currentStreak: number
  longestStreak: number
  hasTeaToday: boolean
}

function getFireDisplay(streak: number): string {
  if (streak === 0) return '\uD83D\uDD25'
  if (streak <= 2) return '\uD83D\uDD25'
  if (streak <= 5) return '\uD83D\uDD25\uD83D\uDD25'
  if (streak <= 10) return '\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25'
  if (streak <= 20) return '\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25'
  return '\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25\uD83D\uDD25'
}

export default function StreakCounter({ currentStreak, longestStreak, hasTeaToday }: StreakCounterProps) {
  const fireDisplay = getFireDisplay(currentStreak)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative overflow-hidden rounded-2xl card-shadow"
    >
      {/* Warm gradient background */}
      <div className="bg-gradient-to-br from-cream-100 via-cream-50 to-cream-100 p-5">
        {/* Subtle decorative corner element */}
        <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.04]">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="80" cy="20" r="60" fill="currentColor" className="text-gold-500" />
          </svg>
        </div>

        <div className="flex items-center gap-4">
          {/* Fire emoji section */}
          <motion.div
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 12 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              <motion.span
                animate={currentStreak > 0 ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-4xl select-none block"
              >
                {fireDisplay}
              </motion.span>
              {/* Glow effect for active streaks */}
              {currentStreak > 0 && (
                <div className="absolute inset-0 blur-xl bg-terra-400/20 rounded-full -z-10 scale-150" />
              )}
            </div>
          </motion.div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            {currentStreak > 0 ? (
              <motion.p
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="font-display text-lg font-bold text-green-950 leading-snug"
              >
                Voce esta no dia{' '}
                <span className="text-gradient-gold">{currentStreak}</span>{' '}
                consecutivo!
              </motion.p>
            ) : (
              <motion.p
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="font-display text-lg font-bold text-green-950 leading-snug"
              >
                Comece sua sequencia hoje!
              </motion.p>
            )}

            {/* Status line */}
            {hasTeaToday ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="flex items-center gap-1.5 mt-1.5"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-green-600">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Z" fill="currentColor" opacity="0.15" />
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-body text-sm text-green-700 font-medium">
                  Cha de hoje registrado!
                </span>
              </motion.div>
            ) : (
              <motion.div
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="flex items-center gap-1.5 mt-1.5"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-terra-500">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                  <path d="M12 8v4l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="font-body text-sm text-terra-500 font-semibold">
                  Registre seu cha de hoje!
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Record / longest streak */}
        {longestStreak > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.35 }}
            className="mt-3 pt-3 border-t border-cream-200/60"
          >
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gold-500">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z"
                  fill="currentColor"
                />
              </svg>
              <span className="font-body text-xs text-green-800/70 font-medium">
                Seu recorde:{' '}
                <span className="font-bold text-green-900">{longestStreak} {longestStreak === 1 ? 'dia' : 'dias'}</span>
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
