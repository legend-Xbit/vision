import { useEffect, useState } from 'react'
import type { GrokCreation } from '../types'

interface InteractivePreviewModalProps {
  creation: GrokCreation | null
  mode?: 'play' | 'details'
  onClose: () => void
  onRemix?: (creation: GrokCreation) => void
}

export function InteractivePreviewModal({
  creation,
  mode = 'details',
  onClose,
  onRemix,
}: InteractivePreviewModalProps) {
  // Mini interactive game state if game mode
  const [score, setScore] = useState(0)
  const [gameActive, setGameActive] = useState(false)
  const [timer, setTimer] = useState(30)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  useEffect(() => {
    if (!gameActive || timer <= 0) return
    const interval = window.setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setGameActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [gameActive, timer])

  if (!creation) return null

  const isGame = creation.type === 'game' || mode === 'play'

  function startGame() {
    setScore(0)
    setTimer(20)
    setGameActive(true)
  }

  function handleCopyShareLink() {
    const url = `${window.location.origin}/#${creation?.slug}`
    navigator.clipboard?.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-x-border bg-black text-x-text shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-x-border px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-bold">
              {creation.author.displayName.charAt(0)}
            </span>
            <div>
              <h2 id="modal-title" className="text-base font-bold text-x-text leading-tight">
                {creation.title}
              </h2>
              <span className="text-xs text-x-muted">grok.me/{creation.slug}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-x-muted transition hover:bg-white/10 hover:text-white"
            aria-label="إغلاق"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Top Banner or Game Viewport */}
          <div
            className="relative flex min-h-[200px] flex-col items-center justify-center overflow-hidden rounded-xl border border-x-border text-center p-6"
            style={{ background: creation.coverGradient }}
          >
            {isGame ? (
              <div className="relative z-10 w-full rounded-xl bg-black/60 p-6 backdrop-blur-md">
                <h3 className="text-xl font-bold text-white mb-2">
                  🎮 تجربة تفاعلية سريعة: {creation.title}
                </h3>
                {gameActive ? (
                  <div className="space-y-4">
                    <div className="flex justify-around text-lg font-bold">
                      <span className="text-emerald-400">النقاط: {score}</span>
                      <span className="text-amber-400">الوقت: {timer} ث</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setScore((s) => s + 10)}
                      className="rounded-full bg-x-accent px-8 py-3 text-lg font-black text-white shadow-lg transition hover:scale-105 active:scale-95"
                    >
                      اضغط للتسجيل! 🎯
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-neutral-300">
                      {timer === 0
                        ? `انتهى الوقت! نتيجتك النهائية هي ${score} نقطة.`
                        : 'هذا محاكي تشغيل مسبق لإبداع Grok Build.'}
                    </p>
                    <button
                      type="button"
                      onClick={startGame}
                      className="rounded-full bg-white px-6 py-2.5 font-bold text-black transition hover:bg-neutral-200 active:scale-95"
                    >
                      {timer === 0 ? 'إعادة المحاولة' : 'ابدأ اللعب الآن'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative z-10 space-y-3 text-white">
                <div className="inline-block rounded-full bg-black/40 px-3 py-1 text-xs font-semibold backdrop-blur-sm ring-1 ring-white/20">
                  معاينة مباشرة للإبداع
                </div>
                <h3 className="text-2xl font-bold">{creation.title}</h3>
                <p className="max-w-md text-sm text-neutral-200">
                  {creation.description}
                </p>
              </div>
            )}
          </div>

          {/* Details & Metadata Section */}
          <div className="mt-5 space-y-4">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-x-muted">
                فكرة البناء (Prompt)
              </h4>
              <p className="mt-1 rounded-xl bg-white/[0.04] p-3 text-sm text-x-text border border-x-border">
                {creation.caption || creation.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 text-center">
              <div className="rounded-xl border border-x-border bg-white/[0.02] p-3">
                <div className="text-xs text-x-muted">النوع</div>
                <div className="mt-1 font-bold text-x-text">{creation.type}</div>
              </div>
              <div className="rounded-xl border border-x-border bg-white/[0.02] p-3">
                <div className="text-xs text-x-muted">المشاهدات</div>
                <div className="mt-1 font-bold text-x-text">{creation.engagement.views}</div>
              </div>
              <div className="rounded-xl border border-x-border bg-white/[0.02] p-3">
                <div className="text-xs text-x-muted">الإعجابات</div>
                <div className="mt-1 font-bold text-x-text">{creation.engagement.likes}</div>
              </div>
              <div className="rounded-xl border border-x-border bg-white/[0.02] p-3">
                <div className="text-xs text-x-muted">المطور</div>
                <div className="mt-1 font-bold text-x-text truncate">@{creation.author.handle}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-x-border bg-white/[0.01] px-5 py-3.5">
          <button
            type="button"
            onClick={handleCopyShareLink}
            className="flex items-center gap-1.5 rounded-full border border-x-border px-3.5 py-1.5 text-xs font-medium text-x-muted transition hover:bg-white/5 hover:text-white"
          >
            {copied ? '✓ تم نسخ الرابط' : 'نسخ رابط المشاركة'}
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onRemix?.(creation)
                onClose()
              }}
              className="flex items-center gap-1.5 rounded-full bg-x-accent px-4 py-1.5 text-sm font-bold text-white transition hover:bg-[#1a8cd8]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-3H8v-3h3v-3h3v3h3v3h-3v3h-3z" />
              </svg>
              أعد المزج في شريط البناء
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
