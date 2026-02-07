import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ingredients, mythsTruths, didYouKnow } from '../data/educationalContent'
import { recipes } from '../data/recipes'
import { useUserData } from '../hooks/useUserData'
import { generateWeeklyPlan } from '../utils/teaRecommender'
import PageTransition from '../components/layout/PageTransition'
import Header from '../components/layout/Header'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type SectionKey =
  | 'ingredientes'
  | 'voce-sabia'
  | 'mitos'
  | 'dicas'
  | 'compras'
  | 'indicar'
  | 'premium'
  | 'sobre'

interface SectionDef {
  key: SectionKey
  title: string
  subtitle: string
  icon: string
  accent: string
}

// ---------------------------------------------------------------------------
// Section metadata
// ---------------------------------------------------------------------------
const sections: SectionDef[] = [
  {
    key: 'ingredientes',
    title: 'Guia de Ingredientes',
    subtitle: 'Conhoca cada ingrediente e seus beneficios',
    icon: '🌿',
    accent: 'from-green-700 to-green-500',
  },
  {
    key: 'voce-sabia',
    title: 'Voce Sabia?',
    subtitle: 'Curiosidades fascinantes sobre chas',
    icon: '💡',
    accent: 'from-gold-500 to-gold-300',
  },
  {
    key: 'mitos',
    title: 'Mitos vs Verdades',
    subtitle: 'Teste seus conhecimentos',
    icon: '🎯',
    accent: 'from-terra-500 to-terra-400',
  },
  {
    key: 'dicas',
    title: 'Dicas de Potencializacao',
    subtitle: 'Aproveite ao maximo cada cha',
    icon: '✨',
    accent: 'from-green-600 to-green-500',
  },
  {
    key: 'compras',
    title: 'Lista de Compras',
    subtitle: 'Ingredientes do seu plano semanal',
    icon: '🛒',
    accent: 'from-green-800 to-green-600',
  },
  {
    key: 'indicar',
    title: 'Indicar para Amigos',
    subtitle: 'Compartilhe essa jornada',
    icon: '💚',
    accent: 'from-green-700 to-green-500',
  },
  {
    key: 'premium',
    title: 'Conteudo Premium',
    subtitle: 'Desbloqueie recursos exclusivos',
    icon: '👑',
    accent: 'from-gold-500 to-terra-500',
  },
  {
    key: 'sobre',
    title: 'Sobre o App',
    subtitle: 'Informacoes e configuracoes',
    icon: 'ℹ️',
    accent: 'from-green-900 to-green-700',
  },
]

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
const accordionVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

const cardTap = { scale: 0.98 }

// ---------------------------------------------------------------------------
// Chevron icon component
// ---------------------------------------------------------------------------
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="text-green-600 shrink-0"
    >
      <path d="M6 9l6 6 6-6" />
    </motion.svg>
  )
}

// ---------------------------------------------------------------------------
// Sub-components for each section
// ---------------------------------------------------------------------------

/* ---- Section 1: Guia de Ingredientes ---- */
function IngredientesContent() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {ingredients.map((ing) => {
        const isOpen = expandedId === ing.id
        return (
          <motion.div
            key={ing.id}
            variants={staggerItem}
            className="rounded-2xl bg-white card-shadow overflow-hidden"
          >
            <button
              onClick={() => setExpandedId(isOpen ? null : ing.id)}
              className="w-full flex items-center gap-3 p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600/40 rounded-2xl"
            >
              <span className="text-3xl shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-cream-100">
                {ing.icon}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="font-display font-semibold text-green-950 text-sm">
                  {ing.name}
                </h4>
                <p className="font-body text-xs text-green-700/70 line-clamp-1 mt-0.5">
                  {ing.description}
                </p>
              </div>
              <ChevronIcon open={isOpen} />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  variants={accordionVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-3 border-t border-cream-100">
                    {/* Description */}
                    <p className="font-body text-xs text-green-800/80 leading-relaxed pt-3">
                      {ing.description}
                    </p>

                    {/* Benefits */}
                    <div>
                      <h5 className="font-display text-xs font-semibold text-green-800 mb-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        Beneficios
                      </h5>
                      <ul className="space-y-1.5">
                        {ing.benefits.map((b, i) => (
                          <li
                            key={i}
                            className="font-body text-xs text-green-700/80 leading-relaxed flex gap-2"
                          >
                            <span className="text-green-500 mt-0.5 shrink-0">&#8226;</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tip */}
                    <div className="bg-gradient-to-br from-green-50 to-cream-50 rounded-xl p-3 border border-green-100/50">
                      <h5 className="font-display text-xs font-semibold text-green-800 mb-1 flex items-center gap-1.5">
                        <span className="text-sm">💡</span>
                        Dica de Preparo
                      </h5>
                      <p className="font-body text-xs text-green-700/80 leading-relaxed">
                        {ing.tip}
                      </p>
                    </div>

                    {/* Curiosity */}
                    <div className="bg-gradient-to-br from-gold-300/20 to-cream-100 rounded-xl p-3 border border-gold-300/30">
                      <h5 className="font-display text-xs font-semibold text-gold-500 mb-1 flex items-center gap-1.5">
                        <span className="text-sm">🌟</span>
                        Curiosidade
                      </h5>
                      <p className="font-body text-xs text-green-800/70 leading-relaxed">
                        {ing.curiosity}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

/* ---- Section 2: Voce Sabia? ---- */
function VoceSabiaContent() {
  const [activeIndex, setActiveIndex] = useState(0)
  const total = didYouKnow.length

  const handlePrev = () => setActiveIndex((i) => (i - 1 + total) % total)
  const handleNext = () => setActiveIndex((i) => (i + 1) % total)

  return (
    <div className="space-y-4">
      {/* Carousel card */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={didYouKnow[activeIndex].id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl card-shadow p-5"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-gold-300/30 to-cream-100">
                {didYouKnow[activeIndex].icon}
              </span>
              <p className="font-body text-sm text-green-800 leading-relaxed flex-1">
                {didYouKnow[activeIndex].fact}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-1">
        <button
          onClick={handlePrev}
          className="w-10 h-10 rounded-full bg-cream-100 hover:bg-cream-200 flex items-center justify-center text-green-700 transition-colors active:scale-95"
          aria-label="Anterior"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="flex items-center gap-1.5">
          {didYouKnow.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-6 h-2 bg-green-600'
                  : 'w-2 h-2 bg-cream-200 hover:bg-cream-300'
              }`}
              aria-label={`Fato ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full bg-cream-100 hover:bg-cream-200 flex items-center justify-center text-green-700 transition-colors active:scale-95"
          aria-label="Proximo"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Counter */}
      <p className="text-center font-body text-xs text-green-600/60">
        {activeIndex + 1} de {total}
      </p>
    </div>
  )
}

/* ---- Section 3: Mitos vs Verdades ---- */
function MitosContent() {
  const [answers, setAnswers] = useState<Record<string, 'mito' | 'verdade'>>({})

  const handleAnswer = (id: string, answer: 'mito' | 'verdade') => {
    if (answers[id]) return // already answered
    setAnswers((prev) => ({ ...prev, [id]: answer }))
  }

  const answeredCount = Object.keys(answers).length
  const correctCount = mythsTruths.filter((mt) => {
    const userAnswer = answers[mt.id]
    if (!userAnswer) return false
    return (mt.isTrue && userAnswer === 'verdade') || (!mt.isTrue && userAnswer === 'mito')
  }).length

  return (
    <div className="space-y-4">
      {/* Score bar */}
      {answeredCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-3 card-shadow flex items-center justify-between"
        >
          <span className="font-body text-xs text-green-700">
            Respondidas: <span className="font-semibold">{answeredCount}/{mythsTruths.length}</span>
          </span>
          <span className="font-body text-xs text-green-700">
            Acertos: <span className="font-semibold text-green-600">{correctCount}</span>
          </span>
        </motion.div>
      )}

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {mythsTruths.map((mt) => {
          const userAnswer = answers[mt.id]
          const isCorrect =
            userAnswer &&
            ((mt.isTrue && userAnswer === 'verdade') || (!mt.isTrue && userAnswer === 'mito'))
          const isAnswered = !!userAnswer

          return (
            <motion.div
              key={mt.id}
              variants={staggerItem}
              className={`rounded-2xl overflow-hidden card-shadow transition-all duration-300 ${
                isAnswered
                  ? isCorrect
                    ? 'bg-green-50 ring-1 ring-green-200'
                    : 'bg-red-50 ring-1 ring-red-200'
                  : 'bg-white'
              }`}
            >
              <div className="p-4">
                {/* Statement */}
                <p className="font-body text-sm text-green-950 font-medium leading-relaxed mb-3">
                  {mt.statement}
                </p>

                {/* Answer buttons */}
                {!isAnswered ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAnswer(mt.id, 'mito')}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200/60 text-red-700 font-body text-sm font-semibold transition-all active:scale-95"
                    >
                      Mito
                    </button>
                    <button
                      onClick={() => handleAnswer(mt.id, 'verdade')}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-green-50 hover:bg-green-100 border border-green-200/60 text-green-700 font-body text-sm font-semibold transition-all active:scale-95"
                    >
                      Verdade
                    </button>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                  >
                    {/* Result badge */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-body text-xs font-semibold ${
                          isCorrect
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {isCorrect ? '✓ Voce acertou!' : '✗ Voce errou!'}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-body text-xs font-medium ${
                          mt.isTrue
                            ? 'bg-green-100/70 text-green-600'
                            : 'bg-red-100/70 text-red-600'
                        }`}
                      >
                        {mt.isTrue ? 'Verdade' : 'Mito'}
                      </span>
                    </div>
                    {/* Explanation */}
                    <p className="font-body text-xs text-green-800/70 leading-relaxed">
                      {mt.explanation}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

/* ---- Section 4: Dicas de Potencializacao ---- */
function DicasContent() {
  const tips = ingredients.map((ing) => ({
    id: ing.id,
    name: ing.name,
    icon: ing.icon,
    tip: ing.tip,
  }))

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      {tips.map((t) => (
        <motion.div
          key={t.id}
          variants={staggerItem}
          className="relative bg-white rounded-2xl card-shadow p-4 overflow-hidden"
        >
          {/* Decorative leaf */}
          <div className="absolute -top-2 -right-2 text-5xl opacity-[0.06] rotate-12 select-none pointer-events-none">
            🍃
          </div>

          <div className="flex items-start gap-3 relative">
            <span className="text-2xl shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-cream-100">
              {t.icon}
            </span>
            <div className="flex-1 min-w-0">
              <h4 className="font-display text-sm font-semibold text-green-800 mb-1">
                {t.name}
              </h4>
              <p className="font-body text-xs text-green-700/80 leading-relaxed">
                {t.tip}
              </p>
            </div>
          </div>

          {/* Bottom decorative accent */}
          <div className="mt-3 h-px bg-gradient-to-r from-transparent via-green-200/40 to-transparent" />
        </motion.div>
      ))}
    </motion.div>
  )
}

/* ---- Section 5: Lista de Compras ---- */
function ComprasContent() {
  const { userData } = useUserData()
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [copied, setCopied] = useState(false)

  // Generate the weekly plan and extract unique ingredients
  const shoppingList = useMemo(() => {
    if (!userData.goal || !userData.startDate) return []

    const plan = generateWeeklyPlan(userData.goal, userData.restrictions, userData.startDate)
    const ingredientMap = new Map<string, Set<string>>()

    Object.values(plan).forEach((daySlots) => {
      const dayRecipes = [daySlots.manha, daySlots.tarde, daySlots.noite]
      dayRecipes.forEach((recipe) => {
        if (!recipe) return
        recipe.ingredients.forEach((ingredient) => {
          const normalized = ingredient.toLowerCase().trim()
          // Use normalized form as key, original as display
          if (!ingredientMap.has(normalized)) {
            ingredientMap.set(normalized, new Set())
          }
          ingredientMap.get(normalized)!.add(recipe.name)
        })
      })
    })

    return Array.from(ingredientMap.entries())
      .map(([key, usedIn]) => ({
        key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        usedIn: Array.from(usedIn),
      }))
      .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'))
  }, [userData.goal, userData.restrictions, userData.startDate])

  const toggleItem = (key: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const handleCopyList = useCallback(async () => {
    const lines = shoppingList
      .filter((item) => !checkedItems.has(item.key))
      .map((item) => `- ${item.label}`)
    const text = `Lista de Compras - Chas da Semana\n\n${lines.join('\n')}`

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [shoppingList, checkedItems])

  if (shoppingList.length === 0) {
    return (
      <div className="text-center py-6">
        <span className="text-4xl block mb-3">🛒</span>
        <p className="font-body text-sm text-green-700/70">
          Complete o onboarding para gerar sua lista de compras personalizada.
        </p>
      </div>
    )
  }

  const uncheckedCount = shoppingList.length - checkedItems.size

  return (
    <div className="space-y-3">
      {/* Summary bar */}
      <div className="flex items-center justify-between px-1">
        <span className="font-body text-xs text-green-600/70">
          {uncheckedCount} {uncheckedCount === 1 ? 'item restante' : 'itens restantes'}
        </span>
        <button
          onClick={handleCopyList}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body text-xs font-medium transition-all active:scale-95 ${
            copied
              ? 'bg-green-100 text-green-700'
              : 'bg-cream-100 hover:bg-cream-200 text-green-700'
          }`}
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Copiado!
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              Copiar Lista
            </>
          )}
        </button>
      </div>

      {/* Items */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-1.5"
      >
        {shoppingList.map((item) => {
          const isChecked = checkedItems.has(item.key)
          return (
            <motion.button
              key={item.key}
              variants={staggerItem}
              whileTap={cardTap}
              onClick={() => toggleItem(item.key)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 ${
                isChecked
                  ? 'bg-cream-100/60 opacity-60'
                  : 'bg-white card-shadow'
              }`}
            >
              {/* Checkbox */}
              <span
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                  isChecked
                    ? 'bg-green-600 border-green-600'
                    : 'border-cream-300 bg-white'
                }`}
              >
                {isChecked && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </span>

              <div className="flex-1 min-w-0">
                <span
                  className={`font-body text-sm block transition-all duration-200 ${
                    isChecked
                      ? 'line-through text-green-600/50'
                      : 'text-green-900'
                  }`}
                >
                  {item.label}
                </span>
                <span className="font-body text-[10px] text-green-600/50 line-clamp-1">
                  Usado em: {item.usedIn.join(', ')}
                </span>
              </div>
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}

/* ---- Section 6: Indicar para Amigos ---- */
function IndicarContent() {
  const [shared, setShared] = useState(false)

  const handleShare = async () => {
    const shareData = {
      title: 'Cha Natural - Seu Guia de Chas',
      text: 'Descubra o poder dos chas naturais para emagrecer, desinchar e dormir melhor! Comece sua jornada com esse app incrivel.',
      url: window.location.origin,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        setShared(true)
      } else {
        // Fallback: copy link
        await navigator.clipboard.writeText(
          `${shareData.text}\n\n${shareData.url}`
        )
        setShared(true)
      }
      setTimeout(() => setShared(false), 3000)
    } catch {
      // User cancelled share
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center py-2">
        <span className="text-5xl block mb-4">🤝</span>
        <h4 className="font-display text-base font-bold text-green-950 mb-2">
          Compartilhe com amigos e ajude-os na jornada
        </h4>
        <p className="font-body text-sm text-green-700/70 leading-relaxed max-w-xs mx-auto">
          Convide seus amigos e familiares para descobrirem os beneficios dos chas naturais. Juntos, a jornada e mais gostosa!
        </p>
      </div>

      <button
        onClick={handleShare}
        className={`w-full py-3.5 px-6 rounded-2xl font-body text-sm font-semibold transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 ${
          shared
            ? 'bg-green-100 text-green-700 ring-1 ring-green-200'
            : 'bg-gradient-to-r from-green-700 to-green-600 text-white shadow-lg shadow-green-600/20'
        }`}
      >
        {shared ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Link compartilhado!
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Compartilhar com Amigos
          </>
        )}
      </button>

      {/* Referral placeholder */}
      <div className="bg-cream-100/60 rounded-xl p-3 text-center">
        <p className="font-body text-[11px] text-green-600/50">
          Em breve: programa de indicacao com recompensas exclusivas!
        </p>
      </div>
    </div>
  )
}

/* ---- Section 7: Conteudo Premium ---- */
function PremiumContent() {
  const premiumRecipeCount = recipes.filter((r) => r.premium).length

  return (
    <div className="space-y-4">
      {/* Premium upsell card */}
      <div className="relative rounded-2xl overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-950 via-green-900 to-green-800" />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold-500/20 to-transparent rounded-full -translate-y-8 translate-x-8" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gold-400/10 to-transparent rounded-full translate-y-6 -translate-x-6" />

        <div className="relative p-6 text-center space-y-4">
          <span className="text-4xl block">👑</span>

          <div>
            <h4 className="font-display text-lg font-bold text-gold-300 mb-1">
              Plano Premium
            </h4>
            <p className="font-body text-sm text-cream-200/80">
              Eleve sua experiencia com chas
            </p>
          </div>

          <div className="space-y-2.5 text-left max-w-xs mx-auto">
            {[
              `Desbloqueie +${50 - premiumRecipeCount} receitas exclusivas`,
              'Plano Avancado de 60 dias personalizado',
              'Acesso a blends e combinacoes exclusivas',
              'Suporte nutricional especializado',
              'Novos conteudos toda semana',
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#e0ca8a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <span className="font-body text-xs text-cream-100/90">{feature}</span>
              </div>
            ))}
          </div>

          <a
            href="#"
            className="block w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-400 text-green-950 font-body text-sm font-bold transition-all active:scale-95 shadow-lg shadow-gold-500/30 text-center"
          >
            Comecar Agora
          </a>

          <p className="font-body text-[10px] text-cream-200/40">
            Cancele quando quiser. Satisfacao garantida.
          </p>
        </div>
      </div>

      {/* Already unlocked info */}
      <div className="bg-white rounded-xl card-shadow p-3 flex items-center gap-3">
        <span className="text-lg">🔓</span>
        <p className="font-body text-xs text-green-700/70 flex-1">
          Voce ja tem acesso a <span className="font-semibold text-green-800">{recipes.filter((r) => !r.premium).length} receitas gratuitas</span> e{' '}
          <span className="font-semibold text-green-800">{premiumRecipeCount} receitas premium</span> que desbloqueiam apos 7 dias de uso.
        </p>
      </div>
    </div>
  )
}

/* ---- Section 8: Sobre o App ---- */
function SobreContent() {
  const { resetData } = useUserData()
  const [showConfirmReset, setShowConfirmReset] = useState(false)

  const handleReset = () => {
    resetData()
    setShowConfirmReset(false)
    window.location.reload()
  }

  return (
    <div className="space-y-4">
      {/* App info */}
      <div className="bg-white rounded-xl card-shadow p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-800 to-green-600 flex items-center justify-center">
            <span className="text-2xl">🍵</span>
          </div>
          <div>
            <h4 className="font-display text-sm font-bold text-green-950">
              Cha Natural
            </h4>
            <p className="font-body text-xs text-green-600/60">Versao 1.0.0</p>
          </div>
        </div>

        <div className="h-px bg-cream-100" />

        <p className="font-body text-xs text-green-700/70 leading-relaxed">
          Seu guia pessoal para uma jornada de bem-estar com chas naturais. Receitas, planos personalizados e muito conhecimento sobre o mundo dos chas.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="bg-gradient-to-br from-gold-300/15 to-cream-100 rounded-xl p-4 border border-gold-300/20">
        <div className="flex items-start gap-2.5">
          <span className="text-lg shrink-0 mt-0.5">⚠️</span>
          <div>
            <h5 className="font-display text-xs font-semibold text-gold-500 mb-1.5">
              Aviso Importante
            </h5>
            <p className="font-body text-xs text-green-800/70 leading-relaxed">
              Os chas sao auxiliares e nao substituem acompanhamento medico. As informacoes contidas neste aplicativo tem carater educativo e nao devem ser interpretadas como prescricao ou orientacao medica. Consulte sempre um profissional de saude antes de iniciar qualquer mudanca na sua rotina alimentar, especialmente se estiver gravida, amamentando ou em tratamento medico.
            </p>
          </div>
        </div>
      </div>

      {/* Credits */}
      <div className="bg-white rounded-xl card-shadow p-4 space-y-2">
        <h5 className="font-display text-xs font-semibold text-green-800">
          Fontes e Referencias
        </h5>
        <p className="font-body text-[11px] text-green-600/60 leading-relaxed">
          As informacoes sobre ingredientes e beneficios sao baseadas em estudos publicados em periodicos cientificos revisados por pares e em tradicoes de uso milenar documentadas pela etnobotanica e pela fitoterapia.
        </p>
      </div>

      {/* Reset button */}
      <div className="pt-2">
        {!showConfirmReset ? (
          <button
            onClick={() => setShowConfirmReset(true)}
            className="w-full py-3 px-4 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200/60 text-red-600 font-body text-sm font-medium transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
            Resetar Todos os Dados
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 rounded-xl p-4 border border-red-200/60 space-y-3"
          >
            <p className="font-body text-sm text-red-700 font-medium text-center">
              Tem certeza? Todos os seus dados serao perdidos.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-white border border-cream-200 text-green-700 font-body text-sm font-medium transition-all active:scale-95"
              >
                Cancelar
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-500 text-white font-body text-sm font-semibold transition-all active:scale-95"
              >
                Sim, Resetar
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main More page component
// ---------------------------------------------------------------------------
export default function More() {
  const [openSection, setOpenSection] = useState<SectionKey | null>(null)

  const toggleSection = (key: SectionKey) => {
    setOpenSection((prev) => (prev === key ? null : key))
  }

  const renderSectionContent = (key: SectionKey) => {
    switch (key) {
      case 'ingredientes':
        return <IngredientesContent />
      case 'voce-sabia':
        return <VoceSabiaContent />
      case 'mitos':
        return <MitosContent />
      case 'dicas':
        return <DicasContent />
      case 'compras':
        return <ComprasContent />
      case 'indicar':
        return <IndicarContent />
      case 'premium':
        return <PremiumContent />
      case 'sobre':
        return <SobreContent />
    }
  }

  return (
    <PageTransition>
      <Header title="Mais" subtitle="Explore, aprenda e personalize" />

      <main className="px-4 pb-8 space-y-3">
        {sections.map((section, index) => {
          const isOpen = openSection === section.key
          return (
            <motion.div
              key={section.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.3 }}
              className="rounded-2xl bg-white card-shadow overflow-hidden"
            >
              {/* Section header button */}
              <motion.button
                whileTap={cardTap}
                onClick={() => toggleSection(section.key)}
                className="w-full flex items-center gap-3.5 p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600/40 rounded-2xl"
              >
                {/* Icon with gradient background */}
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${section.accent} flex items-center justify-center shrink-0 shadow-sm`}
                >
                  <span className="text-xl">{section.icon}</span>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-sm font-bold text-green-950 leading-tight">
                    {section.title}
                  </h3>
                  <p className="font-body text-[11px] text-green-600/60 mt-0.5 line-clamp-1">
                    {section.subtitle}
                  </p>
                </div>

                {/* Chevron */}
                <ChevronIcon open={isOpen} />
              </motion.button>

              {/* Expandable content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key={`${section.key}-content`}
                    variants={accordionVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-5 pt-1 border-t border-cream-100/80">
                      {renderSectionContent(section.key)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}

        {/* Footer */}
        <div className="pt-4 pb-2 text-center">
          <p className="font-body text-[10px] text-green-600/30">
            Feito com carinho para sua jornada de bem-estar
          </p>
          <div className="flex items-center justify-center gap-1 mt-1">
            <span className="text-[10px] opacity-30">🍃</span>
            <span className="text-[10px] opacity-20">🍵</span>
            <span className="text-[10px] opacity-30">🌿</span>
          </div>
        </div>
      </main>
    </PageTransition>
  )
}
