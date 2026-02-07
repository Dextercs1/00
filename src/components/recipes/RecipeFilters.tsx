import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface RecipeFiltersProps {
  activeCategory: string | null
  onCategoryChange: (cat: string | null) => void
}

const categories = [
  { key: null, label: 'Todos', emoji: '\u{1F33F}' },
  { key: 'termogenico', label: 'Termogenico', emoji: '\u{1F525}' },
  { key: 'detox', label: 'Detox', emoji: '\u{2728}' },
  { key: 'relaxante', label: 'Relaxante', emoji: '\u{1F319}' },
  { key: 'energizante', label: 'Energizante', emoji: '\u{26A1}' },
  { key: 'diuretico', label: 'Diuretico', emoji: '\u{1F4A7}' },
] as const

export default function RecipeFilters({ activeCategory, onCategoryChange }: RecipeFiltersProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current
      const button = activeRef.current
      const scrollLeft = button.offsetLeft - container.offsetWidth / 2 + button.offsetWidth / 2
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }, [activeCategory])

  return (
    <div className="relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-5 bg-gradient-to-r from-cream-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-5 bg-gradient-to-l from-cream-50 to-transparent z-10 pointer-events-none" />

      <div
        ref={scrollRef}
        className="flex gap-2.5 overflow-x-auto no-scrollbar px-5 py-1"
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key
          return (
            <motion.button
              key={cat.key ?? 'all'}
              ref={isActive ? activeRef : undefined}
              onClick={() => onCategoryChange(cat.key)}
              whileTap={{ scale: 0.95 }}
              className={`
                relative flex items-center gap-1.5 px-4 py-2.5
                rounded-full font-body text-sm font-medium
                whitespace-nowrap transition-all duration-300 ease-out
                shrink-0 select-none
                focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600/40
                ${isActive
                  ? 'bg-green-800 text-cream-50 shadow-lg shadow-green-900/20'
                  : 'bg-cream-100 text-green-900 hover:bg-cream-200 active:bg-cream-300'
                }
              `}
            >
              {isActive && (
                <motion.span
                  layoutId="filter-pill-bg"
                  className="absolute inset-0 bg-green-800 rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
              <span className="text-base leading-none">{cat.emoji}</span>
              <span>{cat.label}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
