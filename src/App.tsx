import { useState } from 'react'
import { CreatePromptBar } from './components/CreatePromptBar'
import { GrokCreationsFeed } from './components/GrokCreationsFeed'
import { mockCreations } from './data/mockCreations'
import type { CreationType, GrokCreation } from './types'

function App() {
  const [creations, setCreations] = useState<GrokCreation[]>(mockCreations)
  const [toast, setToast] = useState<string | null>(null)

  function showToast(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(null), 2400)
  }

  function handleBuild(prompt: string, type: CreationType | 'all') {
    const resolvedType: CreationType = type === 'all' ? 'website' : type
    const gradients: Record<CreationType, string> = {
      website: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
      app: 'linear-gradient(160deg, #0a0a0a, #1a1a2e, #16213e)',
      game: 'linear-gradient(145deg, #ff006e, #8338ec, #3a86ff)',
      board: 'linear-gradient(120deg, #667eea, #764ba2, #f093fb)',
    }

    const newCreation: GrokCreation = {
      id: `local-${Date.now()}`,
      author: {
        displayName: 'أنت',
        handle: 'you',
        avatarGradient: 'linear-gradient(135deg, #1d9bf0, #7856ff)',
        verified: false,
      },
      timestamp: 'الآن',
      caption: prompt,
      type: resolvedType,
      title: prompt.slice(0, 48) || 'إبداع جديد',
      description: 'معاينة محلية — لا يوجد خادم خلفي في هذا العرض التوضيحي.',
      slug: `draft-${Date.now().toString(36)}`,
      coverGradient: gradients[resolvedType],
      engagement: {
        replies: 0,
        reposts: 0,
        likes: 0,
        views: 1,
        bookmarks: 0,
      },
      hasPlay: resolvedType === 'game',
    }

    setCreations((prev) => [newCreation, ...prev])
    showToast('تمت إضافة بطاقة تجريبية إلى الخط الزمني')
  }

  return (
    <div className="min-h-svh bg-x-bg text-x-text">
      <div className="mx-auto min-h-svh w-full max-w-[600px]">
        <CreatePromptBar onBuild={handleBuild} />
        <GrokCreationsFeed
          creations={creations}
          onRemix={(c) => showToast(`أعد المزج: ${c.title}`)}
          onPlay={(c) => showToast(`تشغيل: ${c.title}`)}
        />

        <footer className="border-x border-t border-x-border px-4 py-6 text-center text-[12px] leading-5 text-x-muted">
          <p>
            عرض توضيحي مستوحى من تجربة مشاركة X + Grok Build — تكريم بصري، وليس
            منتجاً رسمياً.
          </p>
          <p className="mt-1" dir="ltr">
            Demo inspired by X + Grok Build sharing UX (homage, not official).
          </p>
        </footer>
      </div>

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-x-accent px-4 py-2 text-sm font-semibold text-white shadow-lg"
        >
          {toast}
        </div>
      )}
    </div>
  )
}

export default App
