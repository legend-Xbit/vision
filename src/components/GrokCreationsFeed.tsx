import type { CreationType, GrokCreationsFeedProps } from '../types'
import { GrokCreationCard } from './GrokCreationCard'

interface FilterTab {
  id: CreationType | 'all' | 'bookmarks'
  label: string
}

const FILTER_TABS: FilterTab[] = [
  { id: 'all', label: 'لك (الكل)' },
  { id: 'website', label: 'مواقع' },
  { id: 'app', label: 'تطبيقات' },
  { id: 'game', label: 'ألعاب' },
  { id: 'board', label: 'لوحات' },
  { id: 'bookmarks', label: 'المحفوظات' },
]

export function GrokCreationsFeed({
  creations,
  title = 'إبداعات Grok',
  activeFilter = 'all',
  searchQuery = '',
  onFilterChange,
  onSearchChange,
  onRemix,
  onPlay,
  onToggleLike,
  onToggleRepost,
  onToggleBookmark,
  onShare,
  onViewDetails,
}: GrokCreationsFeedProps) {
  return (
    <section className="w-full border-x border-x-border bg-x-bg">
      <header className="sticky top-0 z-20 border-b border-x-border bg-black/75 backdrop-blur-md">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-tight text-x-text">{title}</h1>
            <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-x-muted ring-1 ring-x-border">
              {creations.length} إبداع
            </span>
          </div>
          <p className="mt-0.5 text-[13px] text-x-muted">
            مشاركة إبداعات Grok Build كما تظهر على منصة X
          </p>

          {/* Search bar */}
          <div className="relative mt-3">
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-x-muted">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M10.25 3.75a6.5 6.5 0 105.29 10.3l4.33 4.33 1.41-1.41-4.33-4.33a6.5 6.5 0 00-6.7-8.89zm-4.5 6.5a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z" />
              </svg>
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="ابحث بالاسم، الوصف، أو المطور..."
              className="w-full rounded-full border border-x-border bg-white/[0.04] py-1.5 pr-9 pl-4 text-sm text-x-text outline-none transition focus:border-x-accent focus:bg-black/60 focus:ring-1 focus:ring-x-accent placeholder:text-x-muted"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange?.('')}
                className="absolute inset-y-0 left-3 flex items-center text-xs text-x-muted hover:text-white"
                aria-label="مسح البحث"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex overflow-x-auto border-t border-x-border no-scrollbar">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onFilterChange?.(tab.id)}
                className={`relative shrink-0 px-4 py-3 text-sm font-semibold transition hover:bg-white/[0.03] ${
                  isActive ? 'text-x-text font-bold' : 'text-x-muted'
                }`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 right-3 left-3 h-1 rounded-full bg-x-accent" />
                )}
              </button>
            )
          })}
        </div>
      </header>

      <div>
        {creations.map((creation) => (
          <GrokCreationCard
            key={creation.id}
            creation={creation}
            onRemix={onRemix}
            onPlay={onPlay}
            onToggleLike={onToggleLike}
            onToggleRepost={onToggleRepost}
            onToggleBookmark={onToggleBookmark}
            onShare={onShare}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>

      {creations.length === 0 && (
        <div className="px-4 py-16 text-center text-x-muted">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-xl">
            🔍
          </div>
          <p className="font-semibold text-x-text">لا توجد إبداعات تطابق المعايير</p>
          <p className="mt-1 text-sm text-x-muted">
            جرب تغيير الفلتر أو البحث عن مصطلح آخر، أو أنشئ إبداعك الجديد بالأعلى.
          </p>
        </div>
      )}
    </section>
  )
}

export default GrokCreationsFeed
