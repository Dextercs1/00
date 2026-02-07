import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { recipes, Recipe } from '../../data/recipes'

interface PlanCustomizerProps {
  currentRecipe: Recipe
  slot: 'manha' | 'tarde' | 'noite'
  onSelect: (recipeId: string) => void
  onClose: () => void
}

const slotLabels: Record<string, string> = {
  manha: 'manha',
  tarde: 'tarde',
  noite: 'noite',
}

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

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const sheetVariants = {
  hidden: { y: '100%', opacity: 0.5 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 30,
      stiffness: 350,
      mass: 0.8,
    },
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.05 * i,
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

export default function PlanCustomizer({
  currentRecipe,
  slot,
  onSelect,
  onClose,
}: PlanCustomizerProps) {
  const [search, setSearch] = useState('')

  const compatibleRecipes = useMemo(() => {
    return recipes.filter((r) => {
      if (!r.timeSlots.includes(slot)) return false
      if (search.trim()) {
        const q = search.toLowerCase()
        return (
          r.name.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [slot, search])

  function handleSelect(recipeId: string) {
    onSelect(recipeId)
    onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-end justify-center"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-green-950/60 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />

        {/* Bottom sheet */}
        <motion.div
          className="relative w-full max-w-lg max-h-[85vh] bg-cream-50 rounded-t-3xl overflow-hidden flex flex-col"
          style={{
            boxShadow: '0 -8px 40px rgba(26, 46, 26, 0.18), 0 -2px 12px rgba(26, 46, 26, 0.08)',
          }}
          variants={sheetVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-cream-300/80" />
          </div>

          {/* Header */}
          <div className="px-5 pt-2 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-green-950 tracking-tight">
                  Trocar cha da {slotLabels[slot]}
                </h2>
                <p className="font-body text-sm text-green-600/70 mt-0.5">
                  Escolha uma receita compativel
                </p>
              </div>
              <button
                onClick={onClose}
                className="
                  flex items-center justify-center w-9 h-9 rounded-full
                  bg-cream-200/80 hover:bg-cream-300
                  text-green-800 transition-all duration-200
                  active:scale-95 focus:outline-none
                  focus-visible:ring-2 focus-visible:ring-green-600/40
                "
                aria-label="Fechar"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search */}
            <div className="mt-3 relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-300"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar receita..."
                className="
                  w-full pl-9 pr-4 py-2.5 rounded-xl
                  bg-cream-100 border border-cream-200/60
                  font-body text-sm text-green-950
                  placeholder:text-cream-300
                  focus:outline-none focus:ring-2 focus:ring-green-600/30
                  focus:border-green-600/30 transition-all duration-200
                "
              />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-cream-200/60 to-transparent" />

          {/* Recipe list */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-3 space-y-2">
            {compatibleRecipes.length === 0 && (
              <div className="py-10 text-center">
                <p className="text-4xl mb-3">🔍</p>
                <p className="font-body text-sm text-green-600/60">
                  Nenhuma receita encontrada
                </p>
              </div>
            )}

            {compatibleRecipes.map((recipe, i) => {
              const isCurrent = recipe.id === currentRecipe.id
              return (
                <motion.button
                  key={recipe.id}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={() => handleSelect(recipe.id)}
                  className={`
                    w-full text-left rounded-2xl p-3.5 flex items-center gap-3.5
                    transition-all duration-200 group
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600/40
                    ${isCurrent
                      ? 'bg-green-800/10 ring-2 ring-green-700/30'
                      : 'bg-cream-100/70 hover:bg-cream-200/80 active:scale-[0.98]'
                    }
                  `}
                >
                  {/* Emoji */}
                  <div
                    className={`
                      flex items-center justify-center w-12 h-12 rounded-xl text-2xl
                      shrink-0 transition-transform duration-200
                      group-hover:scale-110
                      ${isCurrent
                        ? 'bg-green-800/15'
                        : 'bg-cream-200/70'
                      }
                    `}
                  >
                    {categoryEmojis[recipe.category] || '\u{1F375}'}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`
                          font-body text-sm font-semibold truncate
                          ${isCurrent ? 'text-green-800' : 'text-green-950'}
                        `}
                      >
                        {recipe.name}
                      </h3>
                      {isCurrent && (
                        <span className="shrink-0 text-[10px] font-semibold font-body px-1.5 py-0.5 rounded-md bg-green-700/15 text-green-700">
                          Atual
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`
                          inline-flex items-center text-[11px] font-medium font-body
                          px-2 py-0.5 rounded-md
                          ${categoryColors[recipe.category] || 'bg-cream-200 text-green-800'}
                        `}
                      >
                        {categoryLabels[recipe.category] || recipe.category}
                      </span>
                      <span className="text-[11px] font-body text-cream-300">
                        {recipe.prepTime} min
                      </span>
                    </div>
                  </div>

                  {/* Arrow / check */}
                  <div className="shrink-0">
                    {isCurrent ? (
                      <div className="w-6 h-6 rounded-full bg-green-700 flex items-center justify-center">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
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
                </motion.button>
              )
            })}

            {/* Bottom safe spacing */}
            <div className="h-6" />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
