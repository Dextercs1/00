import { motion } from 'framer-motion'
import { getWeekDates, getToday } from '../../utils/dateHelpers'
import type { PreparedTea } from '../../hooks/useUserData'

interface WeeklyProgressProps {
  preparedTeas: PreparedTea[]
}

const dayLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']

export default function WeeklyProgress({ preparedTeas }: WeeklyProgressProps) {
  const weekDates = getWeekDates()
  const today = getToday()

  // Set of dates this week where a tea was prepared
  const preparedDatesSet = new Set(preparedTeas.map(t => t.date))

  // Count how many days this week have a prepared tea
  const completedCount = weekDates.filter(d => preparedDatesSet.has(d)).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
      className="rounded-2xl card-shadow bg-white p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-base font-bold text-green-950">
          Progresso Semanal
        </h3>
        <span className="font-body text-xs font-semibold text-green-700 bg-green-600/10 px-2.5 py-1 rounded-full">
          {completedCount} de 7 dias
        </span>
      </div>

      {/* Day circles */}
      <div className="flex items-center justify-between gap-1">
        {weekDates.map((date, index) => {
          const isToday = date === today
          const isPrepared = preparedDatesSet.has(date)
          const isPast = date < today

          return (
            <motion.div
              key={date}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05, duration: 0.35, type: 'spring', stiffness: 200 }}
              className="flex flex-col items-center gap-1.5"
            >
              {/* Day label */}
              <span
                className={`
                  font-body text-[10px] font-semibold uppercase tracking-wider
                  ${isToday ? 'text-green-800' : 'text-green-950/40'}
                `}
              >
                {dayLabels[index]}
              </span>

              {/* Circle */}
              <div className="relative">
                {/* Current day ring */}
                {isToday && (
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -inset-1 rounded-full border-2 border-green-500/40"
                  />
                )}

                <div
                  className={`
                    w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300
                    ${isPrepared
                      ? 'bg-green-600 shadow-md shadow-green-600/25'
                      : isToday
                        ? 'bg-cream-100 border-2 border-green-500/50'
                        : isPast
                          ? 'bg-cream-100 border-2 border-cream-200'
                          : 'bg-cream-50 border-2 border-cream-200'
                    }
                  `}
                >
                  {isPrepared ? (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, delay: 0.3 + index * 0.05 }}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12l5 5L20 7" />
                    </motion.svg>
                  ) : isToday ? (
                    <div className="w-2 h-2 rounded-full bg-green-500/60" />
                  ) : null}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-1.5 rounded-full bg-cream-200 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(completedCount / 7) * 100}%` }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-green-700 to-green-500"
        />
      </div>
    </motion.div>
  )
}
