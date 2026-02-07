import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  title: string
  subtitle?: string
  rightAction?: React.ReactNode
  showBack?: boolean
}

export default function Header({ title, subtitle, rightAction, showBack = false }: HeaderProps) {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-b from-cream-50 via-cream-50/90 to-transparent backdrop-blur-md">
      <div
        className="px-5 pt-3 pb-4"
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 0.75rem)' }}
      >
        <div className="flex items-center justify-between gap-3">
          {/* Left section: back button or spacer */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            {showBack && (
              <button
                onClick={() => navigate(-1)}
                className="
                  flex items-center justify-center
                  w-9 h-9 -ml-1 rounded-full
                  bg-cream-100/80 hover:bg-cream-200
                  text-green-800
                  transition-all duration-200 ease-out
                  active:scale-95
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600/40
                  shrink-0
                "
                aria-label="Voltar"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}

            <div className="min-w-0">
              <h1 className="font-display text-xl font-bold text-green-950 tracking-tight truncate">
                {title}
              </h1>
              {subtitle && (
                <p className="font-body text-sm text-green-600/70 mt-0.5 truncate">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Right action slot */}
          {rightAction && (
            <div className="shrink-0">
              {rightAction}
            </div>
          )}
        </div>
      </div>

      {/* Subtle bottom edge fade */}
      <div className="h-px bg-gradient-to-r from-transparent via-cream-200/50 to-transparent" />
    </header>
  )
}
