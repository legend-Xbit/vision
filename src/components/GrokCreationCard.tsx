import type { CreationType, CreationTypeLabel, GrokCreationCardProps } from '../types'

const TYPE_LABELS: Record<CreationType, CreationTypeLabel> = {
  website: 'موقع',
  app: 'تطبيق',
  game: 'لعبة',
  board: 'لوحة',
}

const TYPE_CHIP_COLORS: Record<CreationType, string> = {
  website: 'bg-sky-500/15 text-sky-400 ring-sky-500/30',
  app: 'bg-violet-500/15 text-violet-400 ring-violet-500/30',
  game: 'bg-pink-500/15 text-pink-400 ring-pink-500/30',
  board: 'bg-amber-500/15 text-amber-400 ring-amber-500/30',
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`
  return String(n)
}

function VerifiedBadge() {
  return (
    <svg
      viewBox="0 0 22 22"
      aria-label="موثّق"
      className="inline-block h-[18px] w-[18px] shrink-0 text-x-accent"
    >
      <path
        fill="currentColor"
        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.878-1.708-.47-.499-1.068-.875-1.74-1.09-.672-.213-1.39-.232-2.07-.058-.262-.472-.643-.872-1.11-1.16-.466-.289-.996-.455-1.542-.482-.546-.027-1.09.086-1.585.328-.498-.227-1.045-.33-1.596-.302-.55.028-1.084.193-1.55.48-.467.29-.847.69-1.11 1.163-.68-.174-1.398-.155-2.07.058-.672.215-1.27.591-1.74 1.09-.442.49-.747 1.074-.878 1.708-.13.633-.083 1.29.14 1.897-.586.274-1.084.706-1.438 1.246-.355.541-.552 1.17-.57 1.816.018.646.215 1.275.57 1.816.354.54.852.972 1.438 1.246-.223.607-.27 1.264-.14 1.897.131.634.437 1.218.878 1.708.47.499 1.068.875 1.74 1.09.672.213 1.39.232 2.07.058.262.472.643.872 1.11 1.16.466.289.996.455 1.542.482.546.027 1.09-.086 1.585-.328.498.227 1.045.33 1.596.302.55-.028 1.084-.193 1.55-.48.467-.29.847-.69 1.11-1.163.68.174 1.398.155 2.07-.058.672-.215 1.27-.591 1.74-1.09.442-.49.747-1.074.878-1.708.13-.633.083-1.29-.14-1.897.586-.274 1.084-.706 1.438-1.246.355-.541.552-1.17.57-1.816zm-8.878 5.494l-4.827-4.828 1.414-1.414 3.413 3.414 6.586-6.586 1.414 1.414-8 8z"
      />
    </svg>
  )
}

function IconReply({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"
      />
    </svg>
  )
}

function IconRepost({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.791-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.791 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"
      />
    </svg>
  )
}

function IconLike({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.523 2.58.402 4.14.928 1.56 2.682 3.35 5.597 5.58l.52.4.51-.4c2.91-2.23 4.664-4.02 5.594-5.58.928-1.56.96-3.02.403-4.14-.561-1.13-1.666-1.84-2.913-1.91zm4.187 7.69c-1.351 2.27-4.04 4.55-7.885 7.48-.343.26-.825.26-1.167 0-3.845-2.93-6.534-5.21-7.885-7.48C.74 11.42.32 8.95 1.933 7.07 3.42 5.34 5.744 4.5 7.98 4.5c1.942 0 3.756.84 5.02 2.2 1.264-1.36 3.078-2.2 5.02-2.2 2.236 0 4.56.84 6.047 2.57 1.613 1.88 1.193 4.35-.163 6.82z"
      />
    </svg>
  )
}

function IconViews({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"
      />
    </svg>
  )
}

function IconBookmark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"
      />
    </svg>
  )
}

function IconShare({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"
      />
    </svg>
  )
}

function IconPlay({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="currentColor" d="M8 5v14l11-7z" />
    </svg>
  )
}

export function GrokCreationCard({
  creation,
  onRemix,
  onPlay,
  onToggleLike,
  onToggleRepost,
  onToggleBookmark,
  onShare,
  onViewDetails,
}: GrokCreationCardProps) {
  const { author, engagement, userInteractions } = creation
  const isGame = creation.type === 'game' || creation.hasPlay
  const isLiked = !!userInteractions?.liked
  const isReposted = !!userInteractions?.reposted
  const isBookmarked = !!userInteractions?.bookmarked

  return (
    <article className="group border-b border-x-border px-4 py-3 transition-colors hover:bg-x-card-hover">
      <div className="flex gap-3">
        {/* Avatar */}
        <div className="shrink-0">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white shadow-sm"
            style={{
              background:
                author.avatarGradient ??
                'linear-gradient(135deg, #1d9bf0, #7856ff)',
            }}
            aria-hidden
          >
            {author.displayName.charAt(0)}
          </div>
        </div>

        {/* Body */}
        <div className="min-w-0 flex-1">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5 text-[15px] leading-5">
            <span className="font-bold text-x-text hover:underline">
              {author.displayName}
            </span>
            {author.verified && <VerifiedBadge />}
            <span className="text-x-muted">@{author.handle}</span>
            <span className="text-x-muted">·</span>
            <time className="text-x-muted hover:underline">{creation.timestamp}</time>
          </div>

          {/* Caption */}
          {creation.caption && (
            <p className="mt-1 whitespace-pre-wrap text-[15px] leading-5 text-x-text">
              {creation.caption}
            </p>
          )}

          {/* Rich card */}
          <div
            onClick={() => onViewDetails?.(creation)}
            className="mt-3 cursor-pointer overflow-hidden rounded-2xl border border-x-border transition hover:border-x-muted/60"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onViewDetails?.(creation)
              }
            }}
            aria-label={`عرض تفاصيل ${creation.title}`}
          >
            {/* Cover / media */}
            <div
              className="relative flex h-44 items-center justify-center sm:h-52"
              style={{ background: creation.coverGradient }}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              {isGame && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onPlay?.(creation)
                  }}
                  className="relative z-10 flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-bold text-black shadow-lg transition hover:scale-105 hover:bg-white active:scale-100"
                >
                  <IconPlay className="h-5 w-5" />
                  تشغيل
                </button>
              )}
              {!isGame && (
                <div className="relative z-10 rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm ring-1 ring-white/20">
                  {TYPE_LABELS[creation.type]}
                </div>
              )}
            </div>

            {/* Card meta */}
            <div className="space-y-2 bg-x-bg p-3">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${TYPE_CHIP_COLORS[creation.type]}`}
                >
                  {TYPE_LABELS[creation.type]}
                </span>
                <span className="inline-flex max-w-full items-center truncate rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-x-muted ring-1 ring-inset ring-x-border">
                  grok.me/{creation.slug}
                </span>
              </div>
              <h3 className="text-[17px] font-bold leading-snug text-x-text group-hover:text-x-accent transition-colors">
                {creation.title}
              </h3>
              <p className="text-[14px] leading-5 text-x-muted line-clamp-2">
                {creation.description}
              </p>
            </div>
          </div>

          {/* Remix CTA */}
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => onRemix?.(creation)}
              className="inline-flex items-center gap-1.5 rounded-full border border-x-border px-3.5 py-1.5 text-[13px] font-semibold text-x-accent transition hover:bg-x-accent/10 active:scale-95"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-3H8v-3h3v-3h3v3h3v3h-3v3h-3z"
                />
              </svg>
              أعد المزج مع Grok
            </button>
            <button
              type="button"
              onClick={() => onViewDetails?.(creation)}
              className="inline-flex items-center gap-1 rounded-full border border-x-border px-3 py-1.5 text-[13px] font-medium text-x-muted transition hover:bg-white/5 hover:text-x-text"
            >
              معاينة وتفاصيل
            </button>
          </div>

          {/* Engagement footer */}
          <div className="mt-3 flex max-w-md items-center justify-between text-x-muted">
            {/* Reply */}
            <button
              type="button"
              onClick={() => onViewDetails?.(creation)}
              className="group/btn flex items-center gap-1 rounded-full transition hover:text-x-accent"
              aria-label={`${engagement.replies} ردود`}
            >
              <span className="rounded-full p-1.5 transition group-hover/btn:bg-x-accent/10">
                <IconReply className="h-[18px] w-[18px]" />
              </span>
              <span className="text-[13px] tabular-nums">
                {formatCount(engagement.replies)}
              </span>
            </button>

            {/* Repost */}
            <button
              type="button"
              onClick={() => onToggleRepost?.(creation.id)}
              className={`group/btn flex items-center gap-1 rounded-full transition hover:text-emerald-400 ${
                isReposted ? 'text-emerald-400 font-semibold' : ''
              }`}
              aria-label={`${engagement.reposts} إعادة نشر`}
            >
              <span className="rounded-full p-1.5 transition group-hover/btn:bg-emerald-400/10">
                <IconRepost className="h-[18px] w-[18px]" />
              </span>
              <span className="text-[13px] tabular-nums">
                {formatCount(engagement.reposts)}
              </span>
            </button>

            {/* Like */}
            <button
              type="button"
              onClick={() => onToggleLike?.(creation.id)}
              className={`group/btn flex items-center gap-1 rounded-full transition hover:text-x-like ${
                isLiked ? 'text-x-like font-semibold' : ''
              }`}
              aria-label={`${engagement.likes} إعجاب`}
            >
              <span className="rounded-full p-1.5 transition group-hover/btn:bg-x-like/10">
                <IconLike
                  className={`h-[18px] w-[18px] transition-transform ${
                    isLiked ? 'scale-110 fill-current' : ''
                  }`}
                />
              </span>
              <span className="text-[13px] tabular-nums">
                {formatCount(engagement.likes)}
              </span>
            </button>

            {/* Views */}
            <button
              type="button"
              className="group/btn flex items-center gap-1 rounded-full transition hover:text-x-accent"
              aria-label={`${engagement.views} مشاهدة`}
            >
              <span className="rounded-full p-1.5 transition group-hover/btn:bg-x-accent/10">
                <IconViews className="h-[18px] w-[18px]" />
              </span>
              <span className="text-[13px] tabular-nums">
                {formatCount(engagement.views)}
              </span>
            </button>

            {/* Actions: Bookmark & Share */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => onToggleBookmark?.(creation.id)}
                className={`group/btn rounded-full transition hover:text-x-accent ${
                  isBookmarked ? 'text-x-accent' : ''
                }`}
                aria-label={isBookmarked ? 'إزالة من المحفوظات' : 'إشارة مرجعية'}
              >
                <span className="inline-flex rounded-full p-1.5 transition group-hover/btn:bg-x-accent/10">
                  <IconBookmark className="h-[18px] w-[18px]" />
                </span>
              </button>
              <button
                type="button"
                onClick={() => onShare?.(creation)}
                className="group/btn rounded-full transition hover:text-x-accent"
                aria-label="مشاركة"
              >
                <span className="inline-flex rounded-full p-1.5 transition group-hover/btn:bg-x-accent/10">
                  <IconShare className="h-[18px] w-[18px]" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default GrokCreationCard
