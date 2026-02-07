import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { recipes } from '../../data/recipes'
import { useUserData } from '../../hooks/useUserData'
import { getDaysSinceStart } from '../../utils/dateHelpers'
import PageTransition from '../layout/PageTransition'
import PrepTimer from './PrepTimer'

const categoryLabels: Record<string, { label: string; emoji: string }> = {
  termogenico: { label: 'Termogenico', emoji: '\u{1F525}' },
  detox: { label: 'Detox', emoji: '\u{2728}' },
  relaxante: { label: 'Relaxante', emoji: '\u{1F319}' },
  energizante: { label: 'Energizante', emoji: '\u{26A1}' },
  diuretico: { label: 'Diuretico', emoji: '\u{1F4A7}' },
}

const difficultyLabels: Record<string, string> = {
  facil: 'Facil',
  medio: 'Medio',
}

const bestTimeLabels: Record<string, string> = {
  manha: '\u{1F305} Manha',
  tarde: '\u{2600}\u{FE0F} Tarde',
  noite: '\u{1F319} Noite',
  qualquer: '\u{23F0} Qualquer horario',
}

const bestTimeEmojis: Record<string, string> = {
  manha: '\u{1F305}',
  tarde: '\u{2600}\u{FE0F}',
  noite: '\u{1F319}',
  qualquer: '\u{23F0}',
}

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { userData, toggleFavorite, isFavorite, markTeaPrepared, markRecipeSeen } = useUserData()

  const [showTimer, setShowTimer] = useState(false)
  const [showPreparedConfirm, setShowPreparedConfirm] = useState(false)
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set())

  const recipe = recipes.find((r) => r.id === id)

  // Mark recipe as seen when viewed
  useEffect(() => {
    if (recipe) {
      markRecipeSeen(recipe.id)
    }
  }, [recipe, markRecipeSeen])

  if (!recipe) {
    return (
      <PageTransition>
        <div className="min-h-dvh flex flex-col items-center justify-center px-6 bg-cream-50">
          <span className="text-6xl mb-4">{'\u{1F375}'}</span>
          <h2 className="font-display text-xl text-green-950 font-bold mb-2">
            Receita nao encontrada
          </h2>
          <p className="text-green-700/60 font-body text-sm mb-6 text-center">
            Essa receita pode ter sido removida ou o link esta incorreto.
          </p>
          <button
            onClick={() => navigate('/recipes')}
            className="px-6 py-3 bg-green-800 text-cream-50 rounded-xl font-body font-medium text-sm"
          >
            Ver todas as receitas
          </button>
        </div>
      </PageTransition>
    )
  }

  const daysSinceStart = userData.startDate ? getDaysSinceStart(userData.startDate) : 1
  const isLocked = recipe.premium && recipe.unlockDay ? daysSinceStart < recipe.unlockDay : false
  const isSene = recipe.id.toLowerCase().includes('sene')
  const recipeFavorite = isFavorite(recipe.id)

  const handleToggleFavorite = () => {
    toggleFavorite(recipe.id)
  }

  const markAsPrepared = () => {
    markTeaPrepared(recipe.id)
    setShowPreparedConfirm(true)
    setTimeout(() => setShowPreparedConfirm(false), 3000)
  }

  const toggleIngredient = (index: number) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  if (isLocked) {
    return (
      <PageTransition>
        <div className="min-h-dvh flex flex-col items-center justify-center px-6 bg-cream-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2d5a2d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h2 className="font-display text-xl text-green-950 font-bold mb-2">Receita Bloqueada</h2>
            <p className="text-green-700/60 font-body text-sm mb-1 text-center">
              Esta receita sera liberada no dia {recipe.unlockDay}.
            </p>
            <p className="text-green-600/50 font-body text-xs mb-6">
              Voce esta no dia {daysSinceStart} da sua jornada.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-green-800 text-cream-50 rounded-xl font-body font-medium text-sm"
            >
              Voltar
            </button>
          </motion.div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-dvh bg-cream-50 pb-24">
        {/* Hero section */}
        <div
          className="relative overflow-hidden"
          style={{
            background: `linear-gradient(180deg, ${recipe.color}25 0%, ${recipe.color}08 60%, transparent 100%)`,
          }}
        >
          {/* Navigation bar */}
          <div
            className="sticky top-0 z-30 flex items-center justify-between px-4 pt-3 pb-2"
            style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 0.75rem)' }}
          >
            <button
              onClick={() => navigate(-1)}
              className="
                w-10 h-10 rounded-full
                bg-white/80 backdrop-blur-sm shadow-sm
                flex items-center justify-center
                text-green-800 hover:bg-white hover:shadow-md
                transition-all duration-200 active:scale-95
                focus:outline-none
              "
              aria-label="Voltar"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleToggleFavorite}
              className="
                w-10 h-10 rounded-full
                bg-white/80 backdrop-blur-sm shadow-sm
                flex items-center justify-center
                hover:bg-white hover:shadow-md
                transition-all duration-200
                focus:outline-none
              "
              aria-label={recipeFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={recipeFavorite ? '#e25822' : 'none'}
                stroke={recipeFavorite ? '#e25822' : '#6b7280'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={recipeFavorite ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </motion.svg>
            </motion.button>
          </div>

          {/* Decorative circles */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10"
            style={{ backgroundColor: recipe.color }}
          />
          <div
            className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-5"
            style={{ backgroundColor: recipe.color }}
          />

          {/* Hero content */}
          <div className="relative px-6 pt-2 pb-8 text-center">
            <motion.span
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
              className="text-7xl block mb-4 drop-shadow-lg"
            >
              {recipe.image}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="font-display text-2xl font-bold text-green-950 mb-1"
            >
              {recipe.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-body text-sm text-green-700/70 max-w-xs mx-auto leading-relaxed"
            >
              {recipe.subtitle}
            </motion.p>
          </div>
        </div>

        {/* Tags row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="px-5 -mt-2 mb-6"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            <span
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium font-body"
              style={{
                backgroundColor: `${recipe.color}15`,
                color: recipe.color,
              }}
            >
              {categoryLabels[recipe.category]?.emoji} {categoryLabels[recipe.category]?.label || recipe.category}
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium font-body bg-cream-200 text-green-800">
              {'\u{1F4AA}'} {difficultyLabels[recipe.difficulty] || recipe.difficulty}
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium font-body bg-cream-200 text-green-800">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {recipe.prepTime} min
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium font-body bg-cream-200 text-green-800">
              {bestTimeLabels[recipe.bestTime] || recipe.bestTime}
            </span>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="px-5 space-y-6">

          {/* Ingredients */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{'\u{1F33F}'}</span>
              <h2 className="font-display text-lg font-bold text-green-950">Ingredientes</h2>
            </div>
            <div className="bg-white rounded-2xl p-4 card-shadow">
              {recipe.ingredients.map((ing, i) => (
                <button
                  key={i}
                  onClick={() => toggleIngredient(i)}
                  className={`
                    w-full flex items-center gap-3 px-2 py-3 rounded-xl
                    text-left transition-all duration-200
                    hover:bg-cream-50 active:bg-cream-100
                    focus:outline-none
                    ${i < recipe.ingredients.length - 1 ? 'border-b border-cream-100' : ''}
                  `}
                >
                  <span
                    className={`
                      w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0
                      transition-all duration-200
                      ${checkedIngredients.has(i)
                        ? 'bg-green-600 border-green-600'
                        : 'border-cream-300 bg-transparent'
                      }
                    `}
                  >
                    {checkedIngredients.has(i) && (
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </motion.svg>
                    )}
                  </span>

                  <span
                    className={`
                      font-body text-sm flex-1 transition-all duration-200
                      ${checkedIngredients.has(i)
                        ? 'text-green-600/50 line-through'
                        : 'text-green-950'
                      }
                    `}
                  >
                    {ing.quantity ? (
                      <>
                        <span className="font-semibold text-green-800">{ing.quantity}</span>
                        {' '}{ing.item}
                      </>
                    ) : (
                      ing.item
                    )}
                  </span>
                </button>
              ))}
            </div>
          </motion.section>

          {/* Steps */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{'\u{1F4D6}'}</span>
              <h2 className="font-display text-lg font-bold text-green-950">Modo de Preparo</h2>
            </div>
            <div className="space-y-3">
              {recipe.steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.06 }}
                  className="flex gap-3 bg-white rounded-2xl p-4 card-shadow"
                >
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-body shrink-0 mt-0.5"
                    style={{
                      backgroundColor: `${recipe.color}18`,
                      color: recipe.color,
                    }}
                  >
                    {i + 1}
                  </span>
                  <p className="font-body text-sm text-green-900 leading-relaxed flex-1">
                    {step}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Prepare now button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => setShowTimer(true)}
              className="
                w-full py-4 rounded-2xl
                bg-gradient-to-r from-green-800 to-green-700
                text-cream-50 font-body font-semibold text-base
                shadow-lg shadow-green-900/20
                flex items-center justify-center gap-2
                transition-all duration-200
                hover:shadow-xl hover:from-green-700 hover:to-green-600
                active:scale-[0.98]
                focus:outline-none
              "
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Preparar Agora
            </button>
          </motion.div>

          {/* Benefits */}
          {recipe.benefits.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{'\u{2B50}'}</span>
                <h2 className="font-display text-lg font-bold text-green-950">Beneficios</h2>
              </div>
              <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-2xl p-4 space-y-2.5">
                {recipe.benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-green-600/30 flex items-center justify-center shrink-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5cb85c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.85 0 3.58-.51 5.06-1.39" />
                        <path d="M17 8c-1 0-3.5.5-5 3-1 1.5-1 3-1 4" />
                        <path d="M22 2s-4 2-6 6" />
                      </svg>
                    </span>
                    <span className="font-body text-sm text-cream-100">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Best time */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{'\u{23F0}'}</span>
              <h2 className="font-display text-lg font-bold text-green-950">Melhor Horario</h2>
            </div>
            <div className="bg-white rounded-2xl p-4 card-shadow">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${recipe.color}15` }}
                >
                  <span className="text-xl">{bestTimeEmojis[recipe.bestTime] || '\u{23F0}'}</span>
                </div>
                <div>
                  <p className="font-body text-sm font-semibold text-green-950">
                    {bestTimeLabels[recipe.bestTime] || recipe.bestTime}
                  </p>
                  <p className="font-body text-xs text-green-700/60 mt-0.5">
                    Para melhores resultados
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Curiosity section */}
          {recipe.curiosity && (
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{'\u{1F4A1}'}</span>
                <h2 className="font-display text-lg font-bold text-green-950">Voce Sabia?</h2>
              </div>
              <div className="bg-gradient-to-br from-gold-300/30 to-gold-400/10 border border-gold-300/40 rounded-2xl p-4">
                <p className="font-body text-sm text-green-900 leading-relaxed italic">
                  &ldquo;{recipe.curiosity}&rdquo;
                </p>
              </div>
            </motion.section>
          )}

          {/* Sene warning */}
          {isSene && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-terra-400/15 border border-terra-400/30 rounded-2xl p-4 flex gap-3"
            >
              <span className="text-xl shrink-0">{'\u{26A0}\u{FE0F}'}</span>
              <div>
                <p className="font-body text-sm font-semibold text-terra-600 mb-1">Uso Moderado</p>
                <p className="font-body text-xs text-terra-500/80 leading-relaxed">
                  O sene e um laxante natural e deve ser usado com moderacao. Nao consuma por mais de 3 dias seguidos. Consulte um profissional de saude antes de usar regularmente.
                </p>
              </div>
            </motion.div>
          )}

          {/* Restrictions disclaimer */}
          {recipe.restrictions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-cream-100 rounded-2xl p-4 flex gap-3"
            >
              <span className="text-lg shrink-0">{'\u{2139}\u{FE0F}'}</span>
              <div>
                <p className="font-body text-xs text-green-800/70 leading-relaxed">
                  <span className="font-semibold">Restricoes:</span>{' '}
                  {recipe.restrictions.map((r) => {
                    const labels: Record<string, string> = {
                      cafeina: 'Contem cafeina',
                      gestante: 'Nao indicado para gestantes',
                      lactose: 'Contem lactose',
                    }
                    return labels[r] || r
                  }).join(' \u{2022} ')}
                </p>
                <p className="font-body text-[10px] text-green-700/50 mt-1">
                  Consulte um profissional de saude em caso de duvidas.
                </p>
              </div>
            </motion.div>
          )}

          {/* "Ja preparei!" button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="pb-4"
          >
            <button
              onClick={markAsPrepared}
              className="
                w-full py-4 rounded-2xl
                bg-gradient-to-r from-gold-500 to-terra-500
                text-white font-body font-semibold text-base
                shadow-lg shadow-terra-500/20
                flex items-center justify-center gap-2
                transition-all duration-200
                hover:shadow-xl
                active:scale-[0.98]
                focus:outline-none
              "
            >
              <span className="text-lg">{'\u{2705}'}</span>
              Ja preparei!
            </button>
          </motion.div>
        </div>

        {/* Prepared confirmation toast */}
        <AnimatePresence>
          {showPreparedConfirm && (
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="
                fixed bottom-24 left-1/2 -translate-x-1/2 z-50
                bg-green-800 text-cream-50
                px-6 py-3.5 rounded-2xl
                shadow-xl shadow-green-950/30
                flex items-center gap-3
                font-body text-sm font-medium
              "
            >
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 0.5 }}
                className="text-xl"
              >
                {'\u{1F389}'}
              </motion.span>
              Cha registrado com sucesso!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prep Timer overlay */}
        <AnimatePresence>
          {showTimer && (
            <PrepTimer
              minutes={recipe.prepTime}
              recipeName={recipe.name}
              onComplete={() => {}}
              onClose={() => setShowTimer(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}
