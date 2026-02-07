import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PrepTimerProps {
  minutes: number
  recipeName: string
  onComplete: () => void
  onClose: () => void
}

type TimerState = 'idle' | 'running' | 'paused' | 'complete'

export default function PrepTimer({ minutes, recipeName, onComplete, onClose }: PrepTimerProps) {
  const totalSeconds = minutes * 60
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)
  const [timerState, setTimerState] = useState<TimerState>('idle')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const progress = 1 - secondsLeft / totalSeconds
  const displayMinutes = Math.floor(secondsLeft / 60)
  const displaySeconds = secondsLeft % 60

  // SVG circle parameters
  const size = 260
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - progress)

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startTimer = useCallback(() => {
    clearTimer()
    setTimerState('running')
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearTimer()
          setTimerState('complete')
          onComplete()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [clearTimer, onComplete])

  const pauseTimer = useCallback(() => {
    clearTimer()
    setTimerState('paused')
  }, [clearTimer])

  const resetTimer = useCallback(() => {
    clearTimer()
    setSecondsLeft(totalSeconds)
    setTimerState('idle')
  }, [clearTimer, totalSeconds])

  useEffect(() => {
    return () => clearTimer()
  }, [clearTimer])

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
    >
      {/* Blurred backdrop */}
      <div
        className="absolute inset-0 bg-green-950/80 backdrop-blur-xl"
        onClick={timerState === 'idle' || timerState === 'complete' ? onClose : undefined}
      />

      {/* Content */}
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative z-10 flex flex-col items-center px-6 w-full max-w-sm"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="
            absolute -top-2 right-4
            w-10 h-10 rounded-full
            bg-white/10 backdrop-blur-sm
            flex items-center justify-center
            text-white/70 hover:text-white hover:bg-white/20
            transition-all duration-200
            focus:outline-none
          "
          aria-label="Fechar"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Recipe name */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-lg text-gold-400 font-semibold text-center mb-2"
        >
          {recipeName}
        </motion.p>
        <p className="text-cream-300/60 text-sm font-body mb-8">Tempo de infusao</p>

        {/* Timer ring */}
        <div className="relative mb-10">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={strokeWidth}
            />
            {/* Progress arc */}
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="url(#timer-gradient)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
            <defs>
              <linearGradient id="timer-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#5cb85c" />
                <stop offset="50%" stopColor="#c9a84c" />
                <stop offset="100%" stopColor="#5cb85c" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {timerState === 'complete' ? (
                <motion.div
                  key="complete"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="flex flex-col items-center"
                >
                  <motion.span
                    className="text-6xl mb-2"
                    animate={{ rotate: [0, 10, -10, 5, -5, 0] }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {'\u{2615}'}
                  </motion.span>
                  <span className="text-cream-50 font-body text-sm font-medium">Pronto!</span>
                </motion.div>
              ) : (
                <motion.div
                  key="timer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-4xl mb-3">{'\u{1F375}'}</span>
                  <span className="font-display text-5xl text-cream-50 font-bold tracking-tight tabular-nums">
                    {String(displayMinutes).padStart(2, '0')}
                    <motion.span
                      animate={{ opacity: timerState === 'running' ? [1, 0.3] : 1 }}
                      transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                    >
                      :
                    </motion.span>
                    {String(displaySeconds).padStart(2, '0')}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Running glow */}
          {timerState === 'running' && (
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(92,184,92,0.0)',
                  '0 0 60px rgba(92,184,92,0.15)',
                  '0 0 30px rgba(92,184,92,0.0)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </div>

        {/* Completion message */}
        <AnimatePresence>
          {timerState === 'complete' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center mb-8"
            >
              <h3 className="font-display text-2xl text-cream-50 font-bold mb-1">
                Seu cha esta pronto!
              </h3>
              <p className="text-cream-300/70 text-sm font-body">
                Aproveite cada gole com consciencia
              </p>

              {/* Bell indicator */}
              <motion.div
                className="flex items-center justify-center gap-2 mt-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: 3 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="text-gold-400 text-sm font-medium font-body">Ding!</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Control buttons */}
        <div className="flex items-center gap-4 w-full max-w-xs">
          {timerState === 'idle' && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.95 }}
              onClick={startTimer}
              className="
                flex-1 py-4 rounded-2xl
                bg-gradient-to-r from-green-600 to-green-500
                text-white font-body font-semibold text-base
                shadow-lg shadow-green-900/30
                transition-all duration-200
                hover:shadow-xl hover:from-green-500 hover:to-green-400
                focus:outline-none
              "
            >
              Iniciar
            </motion.button>
          )}

          {timerState === 'running' && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={pauseTimer}
              className="
                flex-1 py-4 rounded-2xl
                bg-gold-500/20 border border-gold-500/40
                text-gold-400 font-body font-semibold text-base
                transition-all duration-200
                hover:bg-gold-500/30
                focus:outline-none
              "
            >
              Pausar
            </motion.button>
          )}

          {timerState === 'paused' && (
            <>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetTimer}
                className="
                  flex-1 py-4 rounded-2xl
                  bg-white/10 border border-white/20
                  text-cream-200 font-body font-medium text-base
                  transition-all duration-200
                  hover:bg-white/15
                  focus:outline-none
                "
              >
                Reiniciar
              </motion.button>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={startTimer}
                className="
                  flex-1 py-4 rounded-2xl
                  bg-gradient-to-r from-green-600 to-green-500
                  text-white font-body font-semibold text-base
                  shadow-lg shadow-green-900/30
                  transition-all duration-200
                  focus:outline-none
                "
              >
                Continuar
              </motion.button>
            </>
          )}

          {timerState === 'complete' && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="
                flex-1 py-4 rounded-2xl
                bg-gradient-to-r from-gold-500 to-terra-500
                text-white font-body font-semibold text-base
                shadow-lg shadow-terra-600/30
                transition-all duration-200
                focus:outline-none
              "
            >
              Fechar
            </motion.button>
          )}
        </div>

        {/* Hint text */}
        {timerState === 'idle' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-cream-300/40 text-xs font-body mt-4 text-center"
          >
            {minutes} {minutes === 1 ? 'minuto' : 'minutos'} de infusao recomendados
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  )
}
