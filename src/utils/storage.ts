import type { GrokCreation } from '../types'

const STORAGE_KEY = 'grok_creations_data_v1'

export function loadCreations(fallback: GrokCreation[]): GrokCreation[] {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed
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
