import { motion } from 'framer-motion'
import type { Recipe } from '../../data/recipes'

interface DailyTeaProps {
  recipe: Recipe
  onPrepare: () => void
  onViewRecipe: () => void
}

const categoryLabels: Record<string, string> = {
  detox: 'Detox',
  termogenico: 'Termogenico',
  relaxante: 'Relaxante',
  energizante: 'Energizante',
  diuretico: 'Diuretico',
  digestivo: 'Digestivo',
}

const categoryEmojis: Record<string, string> = {
  detox: '\uD83C\uDF3F',
  termogenico: '\uD83D\uDD25',
  relaxante: '\uD83C\uDF19',
  energizante: '\u26A1',
  diuretico: '\uD83D\uDCA7',
  digestivo: '\uD83C\uDF3E',
}

const categoryGradients: Record<string, string> = {
  detox: 'from-green-800 via-green-700 to-green-600',
  termogenico: 'from-terra-600 via-terra-500 to-terra-400',
  relaxante: 'from-green-900 via-green-800 to-green-700',
  energizante: 'from-gold-500 via-gold-400 to-gold-300',
  diuretico: 'from-green-700 via-green-600 to-green-500',
  digestivo: 'from-green-800 via-green-600 to-green-500',
}

export default function DailyTea({ recipe, onPrepare, onViewRecipe }: DailyTeaProps) {
  const gradient = categoryGradients[recipe.category] || categoryGradients.detox
  const emoji = categoryEmojis[recipe.category] || '\uD83C\uDF75'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative overflow-hidden rounded-3xl card-shadow-lg"
    >
      {/* Background gradient */}
      <div className={`bg-gradient-to-br ${gradient} p-6 pb-7`}>
        {/* Organic background shapes */}
        <div className="absolute top-0 right-0 w-48 h-48 opacity-10">
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M160 20C180 60 190 100 170 140C150 180 100 190 60 170C20 150 0 100 20 60C40 20 100 0 140 10C150 12 155 15 160 20Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-36 h-36 opacity-8">
          <svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 130C0 90 10 50 40 25C70 0 120 5 140 40C145 50 140 70 120 90C100 110 60 130 40 135C30 137 25 135 20 130Z"
              fill="white"
              opacity="0.08"
            />
          </svg>
        </div>

        {/* Small decorative dots */}
        <div className="absolute top-8 right-12 w-2 h-2 rounded-full bg-white/15" />
        <div className="absolute top-20 right-6 w-1.5 h-1.5 rounded-full bg-white/10" />
        <div className="absolute bottom-16 left-8 w-1.5 h-1.5 rounded-full bg-white/12" />

        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex items-center gap-2 mb-4"
        >
          <span className="text-xs font-body font-semibold uppercase tracking-widest text-white/70">
            Seu cha de hoje
          </span>
          <div className="flex-1 h-px bg-white/15" />
        </motion.div>

        {/* Main content area */}
        <div className="flex items-start justify-between gap-4">
          {/* Text side */}
          <div className="flex-1 min-w-0">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.45 }}
              className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight mb-1.5"
            >
              {recipe.name}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="font-body text-sm text-white/75 leading-relaxed mb-4 line-clamp-2"
            >
              {recipe.description}
            </motion.p>

            {/* Tags row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="flex flex-wrap gap-2 mb-5"
            >
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-body font-medium text-white">
                {categoryEmojis[recipe.category]} {categoryLabels[recipe.category]}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-body font-medium text-white">
                \u23F1 {recipe.prepTime} min
              </span>
              {recipe.benefits[0] && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-body font-medium text-white">
                  \u2728 {recipe.benefits[0]}
                </span>
              )}
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="flex items-center gap-4"
            >
              <button
                onClick={onPrepare}
                className="
                  relative px-6 py-3 rounded-2xl
                  bg-white text-green-900 font-body font-bold text-sm
                  shadow-lg shadow-black/10
                  active:scale-95 transition-transform duration-150
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50
                "
              >
                <span className="flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                    <line x1="6" y1="2" x2="6" y2="4" />
                    <line x1="10" y1="2" x2="10" y2="4" />
                    <line x1="14" y1="2" x2="14" y2="4" />
                  </svg>
                  Preparar Agora
                </span>
              </button>
              <button
                onClick={onViewRecipe}
                className="
                  font-body text-sm font-semibold text-white/90
                  underline underline-offset-4 decoration-white/40
                  hover:text-white hover:decoration-white/70
                  active:scale-95 transition-all duration-150
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded
                "
              >
                Ver Receita
              </button>
            </motion.div>
          </div>

          {/* Floating tea emoji */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.6, type: 'spring', stiffness: 120 }}
            className="flex-shrink-0 relative"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-6xl sm:text-7xl select-none drop-shadow-lg"
            >
              {emoji}
            </motion.div>
            {/* Soft glow behind emoji */}
            <div className="absolute inset-0 blur-2xl bg-white/10 rounded-full -z-10 scale-150" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
