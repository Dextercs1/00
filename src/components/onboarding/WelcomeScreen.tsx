import { motion } from 'framer-motion'

interface WelcomeScreenProps {
  onNext: () => void
}

export default function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col items-center justify-center min-h-dvh overflow-hidden bg-organic-dark px-6"
    >
      {/* ---------- decorative background blobs ---------- */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, var(--color-green-700) 0%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, var(--color-gold-500) 0%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute top-1/3 right-10 h-[260px] w-[260px] rounded-full opacity-15 blur-2xl"
        style={{
          background:
            'radial-gradient(circle, var(--color-terra-500) 0%, transparent 70%)',
        }}
      />

      {/* ---------- floating tea emoji ---------- */}
      <motion.span
        className="text-8xl select-none animate-float drop-shadow-lg"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.2 }}
        aria-hidden
      >
        🍵
      </motion.span>

      {/* ---------- title ---------- */}
      <motion.h1
        className="mt-8 font-display text-5xl font-bold tracking-tight text-center text-gradient-gold leading-tight"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
      >
        Cha Secreto
      </motion.h1>

      {/* ---------- subtitle ---------- */}
      <motion.p
        className="mt-4 max-w-xs text-center text-base leading-relaxed text-cream-200/90 font-body"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.65 }}
      >
        Receitas de chas que transformam seu corpo e sua rotina
      </motion.p>

      {/* ---------- CTA button ---------- */}
      <motion.button
        onClick={onNext}
        className="
          mt-12 w-full max-w-xs rounded-2xl bg-green-800 py-4 px-8
          text-lg font-semibold text-cream-50 font-body
          shadow-lg shadow-green-950/40
          transition-all duration-200
          hover:bg-green-700 hover:shadow-xl hover:scale-[1.02]
          active:scale-[0.97] active:bg-green-900
          focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/60
        "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.85 }}
        whileTap={{ scale: 0.97 }}
      >
        Comecar Jornada
      </motion.button>

      {/* ---------- disclaimer ---------- */}
      <motion.p
        className="mt-8 max-w-[280px] text-center text-[11px] leading-snug text-cream-300/50 font-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        Chas auxiliam uma alimentacao saudavel. Nao substituem acompanhamento
        medico.
      </motion.p>
    </motion.div>
  )
}
