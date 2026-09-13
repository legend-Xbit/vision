import { describe, it, expect } from 'vitest'
import { loadCreations, saveCreations } from '../utils/storage'
import type { GrokCreation } from '../types'

describe('Storage utility', () => {
  const sampleCreations: GrokCreation[] = [
    {
      id: 'store-1',
      author: { displayName: 'مستخدم', handle: 'user' },
      timestamp: 'الآن',
      type: 'app',
      title: 'تطبيق تجريبي',
      description: 'وصف',
      slug: 'app-slug',
      coverGradient: '',
      engagement: { replies: 0, reposts: 0, likes: 0, views: 0, bookmarks: 0 },
    },
  ]

  it('saves and loads creations correctly', () => {
    saveCreations(sampleCreations)
    const loaded = loadCreations([])
    expect(loaded).toHaveLength(1)
    expect(loaded[0].title).toBe('تطبيق تجريبي')
  })
})
