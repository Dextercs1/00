import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Achievement } from '../../data/achievements'

interface BadgeCardProps {
  achievement: Achievement
  isUnlocked: boolean
  isNew?: boolean
}

const rarityConfig: Record<string, { border: string; glow: string; label: string }> = {
  comum: {
    border: 'border-cream-300',
    glow: 'shadow-[0_0_12px_rgba(221,208,176,0.5)]',
    label: 'Comum',
  },
  raro: {
    border: 'border-blue-400',
    glow: 'shadow-[0_0_16px_rgba(96,165,250,0.5)]',
    label: 'Raro',
  },
  epico: {
    border: 'border-purple-400',
    glow: 'shadow-[0_0_16px_rgba(192,132,252,0.5)]',
    label: 'Epico',
  },
  lendario: {
    border: 'border-gold-500',
    glow: 'shadow-[0_0_20px_rgba(201,168,76,0.6)]',
    label: 'Lendario',
  },
}

export default function BadgeCard({ achievement, isUnlocked, isNew }: BadgeCardProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const rarity = rarityConfig[achievement.rarity] || rarityConfig.comum

  return (
    <div className="relative">
      <motion.button
        className={`
          relative flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 w-full
          transition-colors duration-300
          ${isUnlocked ? rarity.border : 'border-cream-200'}
          ${isUnlocked ? 'bg-white/80' : 'bg-cream-100/60'}
          ${isNew ? rarity.glow : isUnlocked ? 'card-shadow' : ''}
        `}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowTooltip(!showTooltip)}
        aria-label={`Conquista: ${achievement.name}`}
      >
        {/* New indicator pulse */}
        {isNew && (
          <motion.div
            className={`absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gold-500`}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [1, 0.6, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        {/* Icon */}
        <motion.div
          className={`
            text-3xl leading-none
            ${!isUnlocked ? 'grayscale opacity-40' : ''}
          `}
          initial={isNew ? { scale: 0, rotate: -180 } : { scale: 1 }}
          animate={isNew ? { scale: 1, rotate: 0 } : { scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
        >
          {isUnlocked ? achievement.icon : '🔒'}
        </motion.div>

        {/* Name */}
        <span
          className={`
            text-[11px] font-body font-semibold leading-tight text-center line-clamp-2
            ${isUnlocked ? 'text-green-950' : 'text-cream-300'}
          `}
        >
          {achievement.name}
        </span>

        {/* Rarity dot */}
        {isUnlocked && (
          <div className="flex items-center gap-1">
            <span
              className={`
                inline-block w-1.5 h-1.5 rounded-full
                ${achievement.rarity === 'comum' ? 'bg-cream-300' : ''}
                ${achievement.rarity === 'raro' ? 'bg-blue-400' : ''}
                ${achievement.rarity === 'epico' ? 'bg-purple-400' : ''}
                ${achievement.rarity === 'lendario' ? 'bg-gold-500' : ''}
              `}
            />
            <span className="text-[9px] text-green-700/60 font-body">{rarity.label}</span>
          </div>
        )}
      </motion.button>

      {/* Tooltip / Popup */}
      <AnimatePresence>
        {showTooltip && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTooltip(false)}
            />

            {/* Tooltip bubble */}
            <motion.div
              className="absolute left-1/2 bottom-full mb-2 z-50 w-52 -translate-x-1/2"
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-green-950 text-cream-50 rounded-xl p-3 card-shadow-lg relative">
                {/* Arrow */}
                <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-3 bg-green-950 rotate-45 rounded-sm" />

                <p className="text-xs font-display font-semibold mb-1">{achievement.name}</p>
                <p className="text-[11px] font-body text-cream-200 leading-relaxed">
                  {achievement.description}
                </p>
                {!isUnlocked && (
                  <div className="mt-2 pt-2 border-t border-green-800">
                    <p className="text-[10px] text-gold-400 font-body flex items-center gap-1">
                      <span>🔒</span> Continue preparando chas para desbloquear!
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
