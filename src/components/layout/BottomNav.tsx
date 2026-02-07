import { useLocation, useNavigate } from 'react-router-dom'

interface Tab {
  path: string
  label: string
  icon: (active: boolean) => React.ReactNode
}

const tabs: Tab[] = [
  {
    path: '/',
    label: 'Home',
    icon: (active) => (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={active ? 2 : 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Leaf-shaped house */}
        <path d="M12 3C12 3 4 10 4 14c0 4 3.5 7 8 7s8-3 8-7c0-4-8-11-8-11Z" />
        <path d="M12 21v-8" />
        <path d="M8.5 16c0 0 1.5-2 3.5-2s3.5 2 3.5 2" />
      </svg>
    ),
  },
  {
    path: '/recipes',
    label: 'Receitas',
    icon: (active) => (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={active ? 2 : 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Open book with leaf accent */}
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19v16H6.5a2.5 2.5 0 0 0 0 5H19" />
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H19" />
        <path d="M9 7c0 0 2 1.5 2 4" />
        <path d="M13 7c0 0-2 1.5-2 4" />
      </svg>
    ),
  },
  {
    path: '/plan',
    label: 'Plano',
    icon: (active) => (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={active ? 2 : 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Calendar with leaf detail */}
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4" />
        <path d="M8 2v4" />
        <path d="M3 10h18" />
        <path d="M12 14c0 0-1.5 1-1.5 2.5S12 19 12 19s1.5-1 1.5-2.5S12 14 12 14Z" />
      </svg>
    ),
  },
  {
    path: '/progress',
    label: 'Progresso',
    icon: (active) => (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={active ? 2 : 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Growing chart with organic curve */}
        <path d="M3 20h18" />
        <path d="M5 20v-6c0-1 .5-1.5 1-1.5s1 .5 1 1.5v6" />
        <path d="M10 20v-9c0-1 .5-1.5 1-1.5s1 .5 1 1.5v9" />
        <path d="M15 20V7c0-1 .5-1.5 1-1.5s1 .5 1 1.5v13" />
        <path d="M4 11c3-3 6-5.5 9-6.5 2-.7 4-.5 6 .5" />
      </svg>
    ),
  },
  {
    path: '/more',
    label: 'Mais',
    icon: (active) => (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={active ? 2 : 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Organic grid / menu dots */}
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-cream-200/60"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-center justify-around px-2 h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const active = isActive(tab.path)
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`
                relative flex flex-col items-center justify-center gap-0.5
                w-full h-full rounded-xl
                transition-all duration-300 ease-out
                focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600/40
                ${active
                  ? 'text-green-800 scale-105'
                  : 'text-cream-300 hover:text-green-600 active:scale-95'
                }
              `}
              aria-label={tab.label}
              aria-current={active ? 'page' : undefined}
            >
              {/* Active indicator dot */}
              {active && (
                <span className="absolute top-1 w-1 h-1 rounded-full bg-green-700 transition-all duration-300" />
              )}

              <span className="transition-transform duration-300 ease-out">
                {tab.icon(active)}
              </span>

              <span
                className={`
                  text-[10px] font-body leading-tight tracking-wide
                  transition-all duration-300
                  ${active ? 'font-semibold text-green-800' : 'font-medium'}
                `}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
