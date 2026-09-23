import { afterEach, describe, it, expect } from 'vitest'
import { loadCreations, saveCreations } from '../utils/storage'
import type { GrokCreation } from '../types'

describe('Storage utility', () => {
  afterEach(() => localStorage.clear())

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

  it('preserves an intentionally empty saved feed', () => {
    saveCreations([])
    expect(loadCreations(sampleCreations)).toEqual([])
  })

  it('falls back when the saved array contains only invalid creations', () => {
    localStorage.setItem(
      'grok_creations_data_v1',
      JSON.stringify([null, { id: 'broken' }])
    )
    expect(loadCreations(sampleCreations)).toEqual(sampleCreations)
  })

  it('retains valid creations when another saved entry is invalid', () => {
    localStorage.setItem(
      'grok_creations_data_v1',
      JSON.stringify([sampleCreations[0], null])
    )
    expect(loadCreations([])).toEqual(sampleCreations)
  })
})
