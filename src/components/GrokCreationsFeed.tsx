import type { GrokCreationsFeedProps } from '../types'
import { GrokCreationCard } from './GrokCreationCard'

export function GrokCreationsFeed({
  creations,
  title = 'إبداعات Grok',
  onRemix,
  onPlay,
}: GrokCreationsFeedProps) {
  return (
    <section className="w-full border-x border-x-border bg-x-bg">
      <header className="sticky top-0 z-20 border-b border-x-border bg-black/65 px-4 py-3 backdrop-blur-md">
        <h1 className="text-xl font-bold tracking-tight text-x-text">{title}</h1>
        <p className="mt-0.5 text-[13px] text-x-muted">
          مشاركة إبداعات Grok Build كما تظهر على X
        </p>
      </header>

      <div>
        {creations.map((creation) => (
          <GrokCreationCard
            key={creation.id}
            creation={creation}
            onRemix={onRemix}
            onPlay={onPlay}
          />
        ))}
      </div>

      {creations.length === 0 && (
        <div className="px-4 py-16 text-center text-x-muted">
          لا توجد إبداعات بعد — ابدأ بالبناء أعلاه.
        </div>
      )}
    </section>
  )
}

export default GrokCreationsFeed
