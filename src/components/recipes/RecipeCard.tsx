import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import type { Recipe } from '../../data/recipes'

interface RecipeCardProps {
  recipe: Recipe
  isNew?: boolean
  isLocked?: boolean
  isFavorite?: boolean
  onToggleFavorite?: () => void
}

const categoryLabels: Record<string, { label: string; emoji: string }> = {
  termogenico: { label: 'Termogenico', emoji: '\u{1F525}' },
  detox: { label: 'Detox', emoji: '\u{2728}' },
  relaxante: { label: 'Relaxante', emoji: '\u{1F319}' },
  energizante: { label: 'Energizante', emoji: '\u{26A1}' },
  diuretico: { label: 'Diuretico', emoji: '\u{1F4A7}' },
}

export default function RecipeCard({
  recipe,
  isNew = false,
  isLocked = false,
  isFavorite = false,
  onToggleFavorite,
}: RecipeCardProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (isLocked) return
    navigate(`/recipes/${recipe.id}`)
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isLocked && onToggleFavorite) {
      onToggleFavorite()
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={isLocked ? undefined : { y: -4 }}
      whileTap={isLocked ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onClick={handleClick}
      className={`
        relative rounded-2xl overflow-hidden
        bg-white card-shadow
        cursor-pointer select-none
        transition-shadow duration-300
        ${isLocked ? 'opacity-75 cursor-not-allowed' : 'hover:card-shadow-lg'}
      `}
    >
      {/* Top accent with recipe color */}
      <div
        className="h-1.5 w-full"
        style={{ background: `linear-gradient(90deg, ${recipe.color}, ${recipe.color}88)` }}
      />

      {/* Badges row */}
      <div className="absolute top-3.5 left-3 right-3 flex items-start justify-between z-10">
        {isNew && !isLocked ? (
          <motion.span
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            className="
              inline-flex items-center px-2 py-0.5
              bg-gold-500 text-white text-[10px] font-bold uppercase
              rounded-full tracking-wider shadow-md
            "
          >
            Novo
          </motion.span>
        ) : (
          <span />
        )}

        {!isLocked && (
          <button
            onClick={handleFavorite}
            className="
              w-8 h-8 flex items-center justify-center
              rounded-full bg-white/80 backdrop-blur-sm
              shadow-sm transition-all duration-200
              hover:bg-white hover:shadow-md active:scale-90
              focus:outline-none
            "
            aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={isFavorite ? '#e25822' : 'none'}
              stroke={isFavorite ? '#e25822' : '#9ca3af'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        )}
      </div>

      {/* Emoji + color wash */}
      <div
        className="relative flex items-center justify-center pt-6 pb-3"
        style={{
          background: `linear-gradient(180deg, ${recipe.color}12 0%, transparent 100%)`,
        }}
      >
        <span className="text-5xl leading-none drop-shadow-sm">{recipe.image}</span>
      </div>

      {/* Content */}
      <div className="px-3.5 pb-3.5 space-y-1.5">
        <h3 className="font-display text-sm font-bold text-green-950 leading-tight line-clamp-2">
          {recipe.name}
        </h3>
        <p className="font-body text-[11px] text-green-700/70 leading-snug line-clamp-2">
          {recipe.subtitle}
        </p>

        {/* Category tag + prep time */}
        <div className="flex items-center justify-between pt-1">
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium"
            style={{
              backgroundColor: `${recipe.color}18`,
              color: recipe.color,
            }}
          >
            <span>{categoryLabels[recipe.category]?.emoji || '\u{1F33F}'}</span>
            <span>{categoryLabels[recipe.category]?.label || recipe.category}</span>
          </span>
          <span className="flex items-center gap-1 text-[11px] text-green-600/60 font-medium">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {recipe.prepTime} min
          </span>
        </div>
      </div>

      {/* Lock overlay */}
      {isLocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="
            absolute inset-0 flex flex-col items-center justify-center
            bg-green-950/60 backdrop-blur-[2px]
            rounded-2xl z-20
          "
        >
          <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center mb-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <span className="text-white/90 text-xs font-body font-semibold">
            {recipe.unlockDay ? `Libera no dia ${recipe.unlockDay}` : 'Receita Premium'}
          </span>
          <span className="text-white/50 text-[10px] font-body mt-0.5">
            Continue sua jornada
          </span>
        </motion.div>
      )}
    </motion.div>
  )
}
