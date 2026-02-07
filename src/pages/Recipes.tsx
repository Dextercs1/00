import { useState, useMemo } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { recipes } from '../data/recipes'
import { useUserData } from '../hooks/useUserData'
import { getDaysSinceStart } from '../utils/dateHelpers'
import PageTransition from '../components/layout/PageTransition'
import RecipeFilters from '../components/recipes/RecipeFilters'
import RecipeCard from '../components/recipes/RecipeCard'

export default function Recipes() {
  const { userData, updateUserData } = useUserData()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const daysSinceStart = userData.startDate ? getDaysSinceStart(userData.startDate) : 1
  const seenRecipes: string[] = (userData as any).seenRecipes || []
  const favorites: string[] = userData.favorites || []

  const toggleFavorite = (recipeId: string) => {
    const currentFavorites = userData.favorites || []
    const newFavorites = currentFavorites.includes(recipeId)
      ? currentFavorites.filter((f: string) => f !== recipeId)
      : [...currentFavorites, recipeId]
    updateUserData({ favorites: newFavorites })
  }

  const filteredRecipes = useMemo(() => {
    let result = recipes

    // Filter by category
    if (activeCategory) {
      result = result.filter((r) => r.category === activeCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query)
      )
    }

    return result
  }, [activeCategory, searchQuery])

  const isRecipeLocked = (recipe: typeof recipes[0]) => {
    const unlockDay = (recipe as any).unlockDay
    if (recipe.premium && unlockDay) {
      return daysSinceStart < unlockDay
    }
    // Premium recipes without specific unlockDay: locked if less than 7 days
    if (recipe.premium) {
      return daysSinceStart < 7
    }
    return false
  }

  const isRecipeNew = (recipe: typeof recipes[0]) => {
    return !seenRecipes.includes(recipe.id)
  }

  const totalCount = recipes.length
  const shownCount = filteredRecipes.length

  return (
    <PageTransition>
      <div className="min-h-dvh bg-cream-50 pb-24">
        {/* Header */}
        <div
          className="sticky top-0 z-40 bg-gradient-to-b from-cream-50 via-cream-50/95 to-cream-50/80 backdrop-blur-lg"
          style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 0.5rem)' }}
        >
          <div className="px-5 pt-2 pb-3">
            {/* Title row */}
            <div className="flex items-end justify-between mb-3">
              <div>
                <h1 className="font-display text-2xl font-bold text-green-950 tracking-tight">
                  Receitas
                </h1>
                <p className="font-body text-xs text-green-600/60 mt-0.5">
                  {totalCount} receitas disponiveis
                </p>
              </div>
              <span className="text-3xl">{'\u{1F375}'}</span>
            </div>

            {/* Search bar */}
            <div
              className={`
                relative flex items-center gap-2
                bg-white rounded-xl px-3.5 py-2.5
                transition-all duration-300
                ${isSearchFocused
                  ? 'shadow-lg shadow-green-900/10 ring-2 ring-green-600/20'
                  : 'card-shadow'
                }
              `}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isSearchFocused ? '#3d7a3d' : '#9ca3af'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 transition-colors duration-200"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Buscar receitas..."
                className="
                  flex-1 bg-transparent outline-none
                  font-body text-sm text-green-950
                  placeholder:text-green-600/30
                "
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearchQuery('')}
                    className="
                      w-6 h-6 rounded-full bg-cream-200
                      flex items-center justify-center shrink-0
                      text-green-700 hover:bg-cream-300
                      transition-colors duration-200
                      focus:outline-none
                    "
                    aria-label="Limpar busca"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Filters */}
          <div className="pb-3">
            <RecipeFilters
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* Bottom edge fade */}
          <div className="h-px bg-gradient-to-r from-transparent via-cream-200/50 to-transparent" />
        </div>

        {/* Results count when filtering */}
        <AnimatePresence>
          {(searchQuery || activeCategory) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-5 pt-3 pb-1"
            >
              <p className="font-body text-xs text-green-600/50">
                {shownCount === 0
                  ? 'Nenhuma receita encontrada'
                  : `${shownCount} ${shownCount === 1 ? 'receita encontrada' : 'receitas encontradas'}`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recipe grid */}
        <div className="px-4 pt-4">
          <LayoutGroup>
            <motion.div
              layout
              className="grid grid-cols-2 gap-3"
            >
              <AnimatePresence mode="popLayout">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    isNew={isRecipeNew(recipe)}
                    isLocked={isRecipeLocked(recipe)}
                    isFavorite={favorites.includes(recipe.id)}
                    onToggleFavorite={() => toggleFavorite(recipe.id)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>

          {/* Empty state */}
          <AnimatePresence>
            {filteredRecipes.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center py-16 px-6"
              >
                <span className="text-5xl mb-4">{'\u{1F50D}'}</span>
                <h3 className="font-display text-lg font-bold text-green-950 mb-1">
                  Nenhuma receita encontrada
                </h3>
                <p className="font-body text-sm text-green-700/60 text-center mb-4 max-w-xs">
                  Tente buscar por outro nome ou altere os filtros de categoria.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setActiveCategory(null)
                  }}
                  className="
                    px-5 py-2.5 rounded-xl
                    bg-green-800 text-cream-50
                    font-body text-sm font-medium
                    transition-all duration-200
                    hover:bg-green-700
                    active:scale-95
                    focus:outline-none
                  "
                >
                  Limpar filtros
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom breathing room */}
        <div className="h-4" />
      </div>
    </PageTransition>
  )
}
