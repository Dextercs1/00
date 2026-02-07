import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Recipe } from '../../data/recipes'
import PlanCustomizer from './PlanCustomizer'

interface DayPlanProps {
  date: string
  plan: { manha: Recipe; tarde: Recipe; noite: Recipe }
  onSwap: (slot: string, recipeId: string) => void
  onPrepare: (recipeId: string) => void
  preparedToday: string[]
}

interface SlotConfig {
  key: 'manha' | 'tarde' | 'noite'
  label: string
  emoji: string
  gradient: string
  accentBg: string
  time: string
}

const slots: SlotConfig[] = [
  {
    key: 'manha',
    label: 'Manha',
    emoji: '\u{1F305}',
    gradient: 'from-gold-400/20 via-cream-100/60 to-cream-50/40',
    accentBg: 'bg-gold-400/15',
    time: '6h - 11h',
  },
  {
    key: 'tarde',
    label: 'Tarde',
    emoji: '\u{2600}\u{FE0F}',
    gradient: 'from-green-500/15 via-cream-100/60 to-cream-50/40',
    accentBg: 'bg-green-500/15',
    time: '12h - 17h',
  },
  {
    key: 'noite',
    label: 'Noite',
    emoji: '\u{1F319}',
    gradient: 'from-green-800/15 via-cream-100/60 to-cream-50/40',
    accentBg: 'bg-green-800/12',
    time: '18h - 22h',
  },
]

const categoryLabels: Record<string, string> = {
  detox: 'Detox',
  termogenico: 'Termogenico',
  relaxante: 'Relaxante',
  energizante: 'Energizante',
  diuretico: 'Diuretico',
  digestivo: 'Digestivo',
}

const categoryColors: Record<string, string> = {
  detox: 'bg-green-600/15 text-green-800',
  termogenico: 'bg-terra-500/15 text-terra-600',
  relaxante: 'bg-gold-400/20 text-gold-500',
  energizante: 'bg-green-500/15 text-green-700',
  diuretico: 'bg-green-700/15 text-green-800',
  digestivo: 'bg-gold-300/25 text-gold-500',
}

const categoryEmojis: Record<string, string> = {
  detox: '\u{1F33F}',
  termogenico: '\u{1F525}',
  relaxante: '\u{2728}',
  energizante: '\u{26A1}',
  diuretico: '\u{1F4A7}',
  digestivo: '\u{1F33E}',
}

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.1 * i,
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

const checkVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 500, damping: 20 },
  },
}

export default function DayPlan({
  date,
  plan,
  onSwap,
  onPrepare,
  preparedToday,
}: DayPlanProps) {
  const navigate = useNavigate()
  const [customizerSlot, setCustomizerSlot] = useState<'manha' | 'tarde' | 'noite' | null>(null)

  return (
    <>
      <div className="space-y-3 px-5">
        {slots.map((slot, i) => {
          const recipe = plan[slot.key]
          const isPrepared = preparedToday.includes(recipe.id)

          return (
            <motion.div
              key={`${date}-${slot.key}`}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className={`
                relative overflow-hidden rounded-2xl
                bg-gradient-to-br ${slot.gradient}
                border border-cream-200/50
                card-shadow transition-shadow duration-300
                ${isPrepared ? 'ring-2 ring-green-600/25' : ''}
              `}
            >
              {/* Prepared overlay shimmer */}
              {isPrepared && (
                <div className="absolute inset-0 bg-green-600/[0.03] pointer-events-none" />
              )}

              <div className="p-4">
                {/* Slot header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`
                        flex items-center justify-center w-8 h-8 rounded-xl text-lg
                        ${slot.accentBg}
                      `}
                    >
                      {slot.emoji}
                    </span>
                    <div>
                      <h3 className="font-display text-sm font-bold text-green-950 leading-none">
                        {slot.label}
                      </h3>
                      <p className="font-body text-[10px] text-green-600/50 mt-0.5">
                        {slot.time}
                      </p>
                    </div>
                  </div>

                  {/* Swap button */}
                  <button
                    onClick={() => setCustomizerSlot(slot.key)}
                    className="
                      flex items-center gap-1 px-2.5 py-1.5 rounded-xl
                      bg-cream-100/80 hover:bg-cream-200
                      text-green-700 font-body text-xs font-medium
                      transition-all duration-200 active:scale-95
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600/40
                    "
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 3l4 4-4 4" />
                      <path d="M20 7H4" />
                      <path d="M8 21l-4-4 4-4" />
                      <path d="M4 17h16" />
                    </svg>
                    Trocar
                  </button>
                </div>

                {/* Recipe card body - tappable to navigate */}
                <button
                  onClick={() => navigate(`/recipes/${recipe.id}`)}
                  className="
                    w-full text-left flex items-center gap-3.5
                    rounded-xl p-3 -mx-0.5
                    bg-white/50 hover:bg-white/70
                    transition-all duration-200
                    active:scale-[0.98]
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600/30
                    group
                  "
                >
                  {/* Recipe emoji */}
                  <div
                    className="
                      flex items-center justify-center w-14 h-14
                      rounded-2xl bg-cream-100 text-3xl shrink-0
                      group-hover:scale-105 transition-transform duration-200
                    "
                  >
                    {categoryEmojis[recipe.category] || '\u{1F375}'}
                  </div>

                  {/* Recipe info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-body text-sm font-bold text-green-950 truncate leading-snug">
                      {recipe.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span
                        className={`
                          inline-flex items-center text-[10px] font-semibold font-body
                          px-2 py-0.5 rounded-lg
                          ${categoryColors[recipe.category] || 'bg-cream-200 text-green-800'}
                        `}
                      >
                        {categoryLabels[recipe.category] || recipe.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-body text-cream-300">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                        {recipe.prepTime} min
                      </span>
                    </div>
                  </div>

                  {/* Prepared indicator or arrow */}
                  <div className="shrink-0">
                    {isPrepared ? (
                      <motion.div
                        variants={checkVariants}
                        initial="hidden"
                        animate="visible"
                        className="
                          w-8 h-8 rounded-full bg-green-700
                          flex items-center justify-center
                          shadow-md shadow-green-800/20
                        "
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </motion.div>
                    ) : (
                      <svg
                        className="text-cream-300 group-hover:text-green-600 transition-colors duration-200"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    )}
                  </div>
                </button>

                {/* Prepare button */}
                {!isPrepared && (
                  <motion.button
                    onClick={() => onPrepare(recipe.id)}
                    className="
                      mt-3 w-full py-2.5 rounded-xl
                      bg-green-800 hover:bg-green-700
                      text-cream-50 font-body text-sm font-semibold
                      shadow-md shadow-green-900/20
                      transition-all duration-200
                      active:scale-[0.97] active:bg-green-900
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600/40
                      flex items-center justify-center gap-2
                    "
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="text-base">🍵</span>
                    Preparar
                  </motion.button>
                )}

                {isPrepared && (
                  <div className="mt-3 flex items-center justify-center gap-1.5 py-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    <span className="font-body text-xs font-medium text-green-600">
                      Cha preparado!
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* PlanCustomizer modal */}
      <AnimatePresence>
        {customizerSlot && (
          <PlanCustomizer
            currentRecipe={plan[customizerSlot]}
            slot={customizerSlot}
            onSelect={(recipeId) => {
              onSwap(customizerSlot, recipeId)
              setCustomizerSlot(null)
            }}
            onClose={() => setCustomizerSlot(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
