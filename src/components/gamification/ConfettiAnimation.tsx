import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CONFETTI_COLORS = [
  'bg-gold-500',
  'bg-gold-400',
  'bg-gold-300',
  'bg-green-600',
  'bg-green-500',
  'bg-green-700',
  'bg-terra-500',
  'bg-terra-400',
  'bg-cream-200',
  'bg-cream-300',
]

const CONFETTI_COUNT = 28

interface ConfettiPiece {
  id: number
  x: number
  delay: number
  duration: number
  rotation: number
  size: number
  color: string
  shape: 'square' | 'circle' | 'rectangle'
}

function generatePieces(): ConfettiPiece[] {
  return Array.from({ length: CONFETTI_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.8,
    duration: 2 + Math.random() * 1.5,
    rotation: Math.random() * 720 - 360,
    size: 6 + Math.random() * 8,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    shape: (['square', 'circle', 'rectangle'] as const)[Math.floor(Math.random() * 3)],
  }))
}

export function ConfettiAnimation() {
  const [visible, setVisible] = useState(true)
  const [pieces] = useState(generatePieces)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
        >
          {pieces.map((piece) => (
            <motion.span
              key={piece.id}
              className={`absolute ${piece.color} ${
                piece.shape === 'circle' ? 'rounded-full' : 'rounded-sm'
              }`}
              style={{
                left: `${piece.x}%`,
                width: piece.shape === 'rectangle' ? piece.size * 0.5 : piece.size,
                height: piece.shape === 'rectangle' ? piece.size * 1.6 : piece.size,
              }}
              initial={{
                top: '-5%',
                rotate: 0,
                opacity: 1,
                scale: 0,
              }}
              animate={{
                top: '110%',
                rotate: piece.rotation,
                opacity: [1, 1, 1, 0.6, 0],
                scale: [0, 1.2, 1, 1, 0.8],
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
