import { useState, useMemo } from 'react'
import { CreatePromptBar } from './components/CreatePromptBar'
import { GrokCreationsFeed } from './components/GrokCreationsFeed'
import { InteractivePreviewModal } from './components/InteractivePreviewModal'
import { mockCreations } from './data/mockCreations'
import { loadCreations, saveCreations } from './utils/storage'
import type { CreationType, GrokCreation } from './types'

function App() {
  const [creations, setCreations] = useState<GrokCreation[]>(() =>
    loadCreations(mockCreations)
  )
  const [toast, setToast] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState<CreationType | 'all' | 'bookmarks'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPrompt, setCurrentPrompt] = useState('')

  // Interactive Modal State
  const [selectedCreation, setSelectedCreation] = useState<GrokCreation | null>(null)
  const [modalMode, setModalMode] = useState<'play' | 'details'>('details')

  function showToast(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(null), 2400)
  }

  function updateCreationsAndStore(
    updater: (prev: GrokCreation[]) => GrokCreation[]
  ) {
    setCreations((prev) => {
      const next = updater(prev)
      saveCreations(next)
      return next
    })
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
      description: 'معاينة محلية — تم حفظها في مساحة التخزين الخاصة بك.',
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
      userInteractions: {
        liked: false,
        reposted: false,
        bookmarked: false,
      },
    }

    updateCreationsAndStore((prev) => [newCreation, ...prev])
    setCurrentPrompt('')
    showToast('تم بناء الإبداع وحفظه محلياً بنجاح!')
  }

  function handleToggleLike(id: string) {
    updateCreationsAndStore((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        const liked = !item.userInteractions?.liked
        const delta = liked ? 1 : -1
        return {
          ...item,
          engagement: {
            ...item.engagement,
            likes: Math.max(0, item.engagement.likes + delta),
          },
          userInteractions: {
            ...item.userInteractions,
            liked,
          },
        }
      })
    )
  }

  function handleToggleRepost(id: string) {
    updateCreationsAndStore((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        const reposted = !item.userInteractions?.reposted
        const delta = reposted ? 1 : -1
        return {
          ...item,
          engagement: {
            ...item.engagement,
            reposts: Math.max(0, item.engagement.reposts + delta),
          },
          userInteractions: {
            ...item.userInteractions,
            reposted,
          },
        }
      })
    )
    showToast('تمت إعادة النشر!')
  }

  function handleToggleBookmark(id: string) {
    let isBookmarkedNow = false
    updateCreationsAndStore((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        const bookmarked = !item.userInteractions?.bookmarked
        isBookmarkedNow = bookmarked
        const delta = bookmarked ? 1 : -1
        return {
          ...item,
          engagement: {
            ...item.engagement,
            bookmarks: Math.max(0, item.engagement.bookmarks + delta),
          },
          userInteractions: {
            ...item.userInteractions,
            bookmarked,
          },
        }
      })
    )
    showToast(isBookmarkedNow ? 'تمت الإضافة إلى المحفوظات' : 'تمت الإزالة من المحفوظات')
  }

  function handleShare(creation: GrokCreation) {
    const url = `${window.location.origin}/#${creation.slug}`
    if (navigator.share) {
      navigator
        .share({
          title: creation.title,
          text: creation.description,
          url,
        })
        .catch(() => {})
    } else {
      navigator.clipboard?.writeText(url)
      showToast('تم نسخ رابط الإبداع إلى الحافظة!')
    }
  }

  function handleRemix(creation: GrokCreation) {
    const remixPrompt = creation.caption || creation.title
    setCurrentPrompt(`إعادة مزج: ${remixPrompt}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    showToast(`تم تحميل موجه "${creation.title}" لإعادة المزج`)
  }

  function handlePlay(creation: GrokCreation) {
    setSelectedCreation(creation)
    setModalMode('play')
  }

  function handleViewDetails(creation: GrokCreation) {
    setSelectedCreation(creation)
    setModalMode('details')
  }

  // Filter & Search Logic
  const filteredCreations = useMemo(() => {
    return creations.filter((item) => {
      // Filter tab check
      if (activeFilter === 'bookmarks') {
        if (!item.userInteractions?.bookmarked) return false
      } else if (activeFilter !== 'all' && item.type !== activeFilter) {
        return false
      }

      // Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchesTitle = item.title.toLowerCase().includes(q)
        const matchesDesc = item.description.toLowerCase().includes(q)
        const matchesAuthor =
          item.author.displayName.toLowerCase().includes(q) ||
          item.author.handle.toLowerCase().includes(q)
        const matchesCaption = item.caption?.toLowerCase().includes(q) || false

        if (!matchesTitle && !matchesDesc && !matchesAuthor && !matchesCaption) {
          return false
        }
      }

      return true
    })
  }, [creations, activeFilter, searchQuery])

  return (
    <div className="min-h-svh bg-x-bg text-x-text">
      <div className="mx-auto min-h-svh w-full max-w-[600px]">
        <CreatePromptBar
          onBuild={handleBuild}
          initialPrompt={currentPrompt}
          onClearInitialPrompt={() => setCurrentPrompt('')}
        />
        <GrokCreationsFeed
          creations={filteredCreations}
          activeFilter={activeFilter}
          searchQuery={searchQuery}
          onFilterChange={setActiveFilter}
          onSearchChange={setSearchQuery}
          onRemix={handleRemix}
          onPlay={handlePlay}
          onToggleLike={handleToggleLike}
          onToggleRepost={handleToggleRepost}
          onToggleBookmark={handleToggleBookmark}
          onShare={handleShare}
          onViewDetails={handleViewDetails}
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

      <InteractivePreviewModal
        creation={selectedCreation}
        mode={modalMode}
        onClose={() => setSelectedCreation(null)}
        onRemix={handleRemix}
      />

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-x-accent px-4 py-2 text-sm font-semibold text-white shadow-lg animate-fade-in"
        >
          {toast}
        </div>
      )}
    </div>
  )
}

export default App
