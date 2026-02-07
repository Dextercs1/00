import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getToday } from '../../utils/dateHelpers'

interface WeeklyCalendarProps {
  weekDates: string[]
  selectedDate: string
  onSelectDate: (date: string) => void
  completedDates: Record<string, number>
}

/** Monday-indexed day abbreviations (getWeekDates starts on Monday) */
const dayAbbreviations = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']

function getDayNumber(dateStr: string): number {
  return parseInt(dateStr.split('-')[2], 10)
}

const pillVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.04 * i,
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

export default function WeeklyCalendar({
  weekDates,
  selectedDate,
  onSelectDate,
  completedDates,
}: WeeklyCalendarProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const today = getToday()

  // Scroll to selected day on mount
  useEffect(() => {
    if (scrollRef.current) {
      const selectedIndex = weekDates.indexOf(selectedDate)
      if (selectedIndex >= 0) {
        const pill = scrollRef.current.children[selectedIndex] as HTMLElement
        if (pill) {
          const containerWidth = scrollRef.current.offsetWidth
          const pillLeft = pill.offsetLeft
          const pillWidth = pill.offsetWidth
          const scrollTarget = pillLeft - containerWidth / 2 + pillWidth / 2
          scrollRef.current.scrollTo({ left: scrollTarget, behavior: 'smooth' })
        }
      }
    }
  }, [selectedDate, weekDates])

  return (
    <div className="relative">
      {/* Fade edges for scroll indication */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 z-10 bg-gradient-to-r from-cream-50 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 z-10 bg-gradient-to-l from-cream-50 to-transparent" />

      <div
        ref={scrollRef}
        className="flex gap-2.5 overflow-x-auto no-scrollbar px-5 py-2"
      >
        {weekDates.map((date, i) => {
          const isSelected = date === selectedDate
          const isToday = date === today
          const completedCount = completedDates[date] || 0
          const allDone = completedCount >= 3
          const hasSome = completedCount > 0 && completedCount < 3

          return (
            <motion.button
              key={date}
              custom={i}
              variants={pillVariants}
              initial="hidden"
              animate="visible"
              onClick={() => onSelectDate(date)}
              className={`
                relative flex flex-col items-center justify-center
                min-w-[3.25rem] w-[3.25rem] h-[4.5rem]
                rounded-2xl shrink-0
                transition-all duration-250 ease-out
                focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600/40
                ${isSelected
                  ? 'bg-green-800 text-cream-50 shadow-lg shadow-green-900/25 scale-105'
                  : isToday
                    ? 'bg-cream-100 text-green-950 ring-2 ring-green-600/40'
                    : 'bg-cream-100/60 text-green-950 hover:bg-cream-200/80 active:scale-95'
                }
              `}
              whileTap={{ scale: 0.92 }}
            >
              {/* Day abbreviation */}
              <span
                className={`
                  text-[10px] font-body font-semibold uppercase tracking-wider
                  ${isSelected
                    ? 'text-cream-200/80'
                    : 'text-green-600/50'
                  }
                `}
              >
                {dayAbbreviations[i]}
              </span>

              {/* Day number */}
              <span
                className={`
                  text-lg font-display font-bold leading-none mt-0.5
                  ${isSelected ? 'text-cream-50' : 'text-green-950'}
                `}
              >
                {getDayNumber(date)}
              </span>

              {/* Completion indicator */}
              <div className="flex gap-0.5 mt-1.5">
                {allDone ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={isSelected ? '#faf8f0' : '#3d7a3d'}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </motion.div>
                ) : hasSome ? (
                  [0, 1, 2].map((dot) => (
                    <div
                      key={dot}
                      className={`
                        w-1 h-1 rounded-full transition-colors duration-200
                        ${dot < completedCount
                          ? isSelected
                            ? 'bg-gold-400'
                            : 'bg-green-600'
                          : isSelected
                            ? 'bg-cream-50/30'
                            : 'bg-cream-300/60'
                        }
                      `}
                    />
                  ))
                ) : (
                  <div className="h-1" />
                )}
              </div>

              {/* Today subtle indicator ring pulse */}
              {isToday && !isSelected && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-600 animate-pulse-soft" />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
