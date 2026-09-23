import type { GrokCreation } from '../types'

const STORAGE_KEY = 'grok_creations_data_v1'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isCreation(value: unknown): value is GrokCreation {
  if (!isRecord(value) || !isRecord(value.author) || !isRecord(value.engagement)) {
    return false
  }

  const { author, engagement, userInteractions } = value
  const strings = ['id', 'timestamp', 'title', 'description', 'slug', 'coverGradient']
  const counts = ['replies', 'reposts', 'likes', 'views', 'bookmarks']

  return (
    strings.every((key) => typeof value[key] === 'string') &&
    typeof value.type === 'string' &&
    ['website', 'app', 'game', 'board'].includes(value.type) &&
    typeof author.displayName === 'string' &&
    typeof author.handle === 'string' &&
    (value.caption === undefined || typeof value.caption === 'string') &&
    (value.hasPlay === undefined || typeof value.hasPlay === 'boolean') &&
    (author.avatarGradient === undefined || typeof author.avatarGradient === 'string') &&
    (author.avatarUrl === undefined || typeof author.avatarUrl === 'string') &&
    (author.verified === undefined || typeof author.verified === 'boolean') &&
    counts.every((key) => {
      const count = engagement[key]
      return typeof count === 'number' && Number.isFinite(count) && count >= 0
    }) &&
    (userInteractions === undefined ||
      (isRecord(userInteractions) &&
        ['liked', 'reposted', 'bookmarked'].every(
          (key) => userInteractions[key] === undefined || typeof userInteractions[key] === 'boolean'
        )))
  )
}

export function loadCreations(fallback: GrokCreation[]): GrokCreation[] {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return fallback
    const parsed: unknown = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      if (parsed.length === 0) return []
      const valid = parsed.filter(isCreation)
      if (valid.length > 0) return valid
    }
  } catch (err) {
    console.warn('Failed to load creations from localStorage:', err)
  }
  return fallback
}

export function saveCreations(creations: GrokCreation[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(creations))
  } catch (err) {
    console.warn('Failed to save creations to localStorage:', err)
  }
}

export function resetCreationsStorage(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (err) {
    console.warn('Failed to reset creations storage:', err)
  }
}
