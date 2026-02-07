import { motion } from 'framer-motion'

interface GoalSelectProps {
  selected: string
  onSelect: (goal: string) => void
  onNext: () => void
}

const goals = [
  {
    id: 'emagrecer',
    emoji: '\uD83D\uDD25',
    label: 'Emagrecer',
    description: 'Acelerar metabolismo',
  },
  {
    id: 'desinchar',
    emoji: '\uD83D\uDCA7',
    label: 'Desinchar',
    description: 'Eliminar retencao',
  },
  {
    id: 'energia',
    emoji: '\u26A1',
    label: 'Mais Energia',
    description: 'Disposicao no dia a dia',
  },
  {
    id: 'dormir',
    emoji: '\uD83C\uDF19',
    label: 'Dormir Melhor',
    description: 'Noites tranquilas',
  },
]

function ProgressDots({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2 justify-center mb-8">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i === current
              ? 'w-8 h-2 bg-green-700'
              : i < current
                ? 'w-2 h-2 bg-green-600/60'
                : 'w-2 h-2 bg-cream-300/60'
          }`}
          layout
        />
      ))}
    </div>
  )
}

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } },
}

export default function GoalSelect({
  selected,
  onSelect,
  onNext,
}: GoalSelectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col min-h-dvh bg-cream-50 px-6 pt-14 pb-10"
    >
      <ProgressDots current={0} />

      <motion.h2
        className="font-display text-2xl font-bold text-green-900 text-center mb-2"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        Qual seu principal objetivo?
      </motion.h2>

      <motion.p
        className="text-sm text-green-700/70 font-body text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        Vamos personalizar sua experiencia
      </motion.p>

      {/* ---------- 2x2 grid ---------- */}
      <motion.div
        className="grid grid-cols-2 gap-4 flex-1 content-start"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {goals.map((goal) => {
          const isSelected = selected === goal.id
          return (
            <motion.button
              key={goal.id}
              variants={cardVariants}
              onClick={() => onSelect(goal.id)}
              whileTap={{ scale: 0.96 }}
              className={`
                relative flex flex-col items-center justify-center gap-2
                rounded-2xl p-5 border-2 card-shadow
                transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600/40
                ${
                  isSelected
                    ? 'border-green-600 bg-green-800/[0.06] shadow-lg'
                    : 'border-cream-200 bg-white hover:border-green-500/40'
                }
              `}
            >
              {/* selection check */}
              {isSelected && (
                <motion.span
                  className="absolute top-2.5 right-2.5 flex items-center justify-center w-5 h-5 rounded-full bg-green-700 text-cream-50 text-[10px]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  ✓
                </motion.span>
              )}

              <span className="text-4xl select-none" aria-hidden>
                {goal.emoji}
              </span>
              <span className="font-body font-semibold text-green-900 text-sm">
                {goal.label}
              </span>
              <span className="font-body text-[11px] text-green-700/60 leading-tight text-center">
                {goal.description}
              </span>
            </motion.button>
          )
        })}
      </motion.div>

      {/* ---------- CTA ---------- */}
      <motion.button
        onClick={onNext}
        disabled={!selected}
        className={`
          mt-8 w-full rounded-2xl py-4 px-8
          text-base font-semibold font-body
          transition-all duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600/40
          ${
            selected
              ? 'bg-green-800 text-cream-50 shadow-md shadow-green-950/30 hover:bg-green-700 hover:shadow-lg active:scale-[0.98]'
              : 'bg-cream-200 text-cream-300 cursor-not-allowed'
          }
        `}
        whileTap={selected ? { scale: 0.98 } : undefined}
      >
        Continuar
      </motion.button>
    </motion.div>
  )
}

export { ProgressDots }
