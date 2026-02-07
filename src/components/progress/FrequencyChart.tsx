import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { getToday } from '../../utils/dateHelpers'

interface FrequencyChartProps {
  preparedTeas: { recipeId: string; date: string; time: string }[]
}

const DAY_LABELS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

function formatDateStr(d: Date): string {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getLast7Days(): { date: string; dayLabel: string }[] {
  const today = new Date()
  const days: { date: string; dayLabel: string }[] = []

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    days.push({
      date: formatDateStr(d),
      dayLabel: DAY_LABELS[d.getDay()],
    })
  }

  return days
}

export default function FrequencyChart({ preparedTeas }: FrequencyChartProps) {
  const today = getToday()

  const { days, maxCount } = useMemo(() => {
    const last7 = getLast7Days()

    // Count teas per day
    const countMap = new Map<string, number>()
    for (const tea of preparedTeas) {
      countMap.set(tea.date, (countMap.get(tea.date) || 0) + 1)
    }

    const daysWithCounts = last7.map((d) => ({
      ...d,
      count: countMap.get(d.date) || 0,
      isToday: d.date === today,
    }))

    const max = Math.max(5, ...daysWithCounts.map((d) => d.count))

    return { days: daysWithCounts, maxCount: max }
  }, [preparedTeas, today])

  const totalWeek = days.reduce((sum, d) => sum + d.count, 0)

  return (
    <motion.div
      className="bg-white/80 rounded-2xl p-5 card-shadow border border-cream-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display text-lg text-green-950 font-semibold">
            Ultimos 7 dias
          </h3>
          <p className="text-xs font-body text-green-700/70 mt-0.5">
            {totalWeek} {totalWeek === 1 ? 'cha preparado' : 'chas preparados'}
          </p>
        </div>
        <span className="text-2xl">📊</span>
      </div>

      {/* Chart */}
      <div className="flex items-end justify-between gap-2 h-32 mb-2">
        {/* Y-axis scale lines */}
        <div className="relative h-full w-0">
          {[0, 1, 2, 3, 4, 5].map((val) => {
            if (val > maxCount) return null
            const bottom = (val / maxCount) * 100
            return (
              <div
                key={val}
                className="absolute left-0 w-[calc(100vw-6rem)] border-t border-cream-200/50"
                style={{ bottom: `${bottom}%` }}
              />
            )
          })}
        </div>

        {/* Bars */}
        {days.map((day, idx) => {
          const heightPercent = day.count > 0 ? (day.count / maxCount) * 100 : 0

          return (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-1.5">
              {/* Count label above bar */}
              <motion.span
                className={`
                  text-[10px] font-body font-semibold
                  ${day.isToday ? 'text-green-900' : 'text-green-700/60'}
                `}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.08 + 0.6 }}
              >
                {day.count > 0 ? day.count : ''}
              </motion.span>

              {/* Bar container */}
              <div className="w-full h-24 flex items-end justify-center">
                <motion.div
                  className={`
                    w-full max-w-[28px] rounded-t-lg relative overflow-hidden
                    ${
                      day.isToday
                        ? 'bg-gradient-to-t from-green-700 to-green-500'
                        : day.count > 0
                          ? 'bg-gradient-to-t from-green-700/70 to-green-600/70'
                          : 'bg-cream-200'
                    }
                  `}
                  style={{ minHeight: day.count > 0 ? '8px' : '4px' }}
                  initial={{ height: '4px' }}
                  animate={{ height: heightPercent > 0 ? `${heightPercent}%` : '4px' }}
                  transition={{
                    duration: 0.7,
                    delay: idx * 0.08 + 0.3,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {/* Shine effect on today */}
                  {day.isToday && day.count > 0 && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-white/10"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              </div>

              {/* Day label */}
              <span
                className={`
                  text-[10px] font-body
                  ${day.isToday ? 'text-green-900 font-bold' : 'text-green-700/60'}
                `}
              >
                {day.dayLabel}
              </span>

              {/* Today indicator dot */}
              {day.isToday && (
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-green-600"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: 'spring' }}
                />
              )}
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
