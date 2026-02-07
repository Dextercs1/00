import { motion } from 'framer-motion'
import { quotes } from '../../data/quotes'

function getDailyQuoteIndex(): number {
  const today = new Date()
  // Combine year + month + day into a seed that changes daily
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
  return seed % quotes.length
}

export default function MotivationalQuote() {
  const quoteIndex = getDailyQuoteIndex()
  const quote = quotes[quoteIndex]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative overflow-hidden rounded-2xl card-shadow bg-gradient-to-br from-cream-50 via-cream-100 to-cream-50"
    >
      {/* Subtle organic background shape */}
      <div className="absolute -top-6 -right-6 w-28 h-28 opacity-[0.04]">
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M60 10C80 10 100 30 100 60C100 80 85 100 65 105C45 110 20 95 15 75C10 55 25 30 45 15C50 12 55 10 60 10Z"
            fill="currentColor"
            className="text-green-800"
          />
        </svg>
      </div>

      <div className="p-5">
        {/* Leaf decoration */}
        <motion.div
          initial={{ opacity: 0, rotate: -20 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mb-3"
        >
          <span className="text-2xl select-none">{'\uD83C\uDF43'}</span>
        </motion.div>

        {/* Quote text */}
        <motion.blockquote
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.45 }}
          className="font-display text-base sm:text-lg italic text-green-900 leading-relaxed"
        >
          &ldquo;{quote}&rdquo;
        </motion.blockquote>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.55, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-4 h-0.5 w-12 rounded-full bg-gradient-to-r from-green-700/30 to-gold-400/30 origin-left"
        />
      </div>
    </motion.div>
  )
}
