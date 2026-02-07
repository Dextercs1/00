import { motion } from 'framer-motion'
import { ProgressDots } from './GoalSelect'

interface RestrictionSelectProps {
  selected: string[]
  onToggle: (restriction: string) => void
  onFinish: () => void
}

const restrictions = [
  {
    id: 'cafeina',
    emoji: '\u2615',
    label: 'Cafeina',
    description: 'Evitar chas com cafeina',
  },
  {
    id: 'gestante',
    emoji: '\uD83D\uDC76',
    label: 'Gestante',
    description: 'Chas seguros para gestantes',
  },
  {
    id: 'nenhuma',
    emoji: '\u2705',
    label: 'Nenhuma',
    description: 'Sem restricoes',
  },
]

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } },
}

export default function RestrictionSelect({
  selected,
  onToggle,
  onFinish,
}: RestrictionSelectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col min-h-dvh bg-cream-50 px-6 pt-14 pb-10"
    >
      <ProgressDots current={2} />

      <motion.h2
        className="font-display text-2xl font-bold text-green-900 text-center mb-2"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        Tem alguma restricao?
      </motion.h2>

      <motion.p
        className="text-sm text-green-700/70 font-body text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        Selecione tudo que se aplica
      </motion.p>

      {/* ---------- toggle cards ---------- */}
      <motion.div
        className="flex flex-col gap-4 flex-1 content-start"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {restrictions.map((opt) => {
          const isSelected = selected.includes(opt.id)
          return (
            <motion.button
              key={opt.id}
              variants={cardVariants}
              onClick={() => onToggle(opt.id)}
              whileTap={{ scale: 0.97 }}
              className={`
                relative flex items-center gap-5
                w-full rounded-2xl p-5 border-2 card-shadow
                transition-all duration-200 text-left
                focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600/40
                ${
                  isSelected
                    ? 'border-green-600 bg-green-800/[0.06] shadow-lg'
                    : 'border-cream-200 bg-white hover:border-green-500/40'
                }
              `}
            >
              {/* emoji */}
              <span className="text-4xl select-none shrink-0" aria-hidden>
                {opt.emoji}
              </span>

              {/* text */}
              <div className="flex flex-col gap-0.5">
                <span className="font-body font-semibold text-green-900 text-base">
                  {opt.label}
                </span>
                <span className="font-body text-xs text-green-700/60">
                  {opt.description}
                </span>
              </div>

              {/* toggle indicator */}
              <div
                className={`
                  ml-auto shrink-0 flex items-center justify-center
                  w-6 h-6 rounded-full border-2
                  transition-all duration-200
                  ${
                    isSelected
                      ? 'bg-green-700 border-green-700'
                      : 'bg-transparent border-cream-300'
                  }
                `}
              >
                {isSelected && (
                  <motion.span
                    className="text-cream-50 text-xs leading-none"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    ✓
                  </motion.span>
                )}
              </div>
            </motion.button>
          )
        })}
      </motion.div>

      {/* ---------- CTA ---------- */}
      <motion.button
        onClick={onFinish}
        className="
          mt-8 w-full rounded-2xl py-4 px-8
          text-base font-semibold font-body
          bg-green-800 text-cream-50
          shadow-md shadow-green-950/30
          transition-all duration-200
          hover:bg-green-700 hover:shadow-lg
          active:scale-[0.98]
          focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600/40
        "
        whileTap={{ scale: 0.98 }}
      >
        Comecar!
      </motion.button>
    </motion.div>
  )
}
