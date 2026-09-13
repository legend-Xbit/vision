export type CreationType = 'website' | 'app' | 'game' | 'board'

export type CreationTypeLabel = 'موقع' | 'تطبيق' | 'لعبة' | 'لوحة'

export interface EngagementMetrics {
  replies: number
  reposts: number
  likes: number
  views: number
  bookmarks: number
}

export interface GrokAuthor {
  displayName: string
  handle: string
  avatarUrl?: string
  avatarGradient?: string
  verified?: boolean
}

export interface GrokCreation {
  id: string
  author: GrokAuthor
  timestamp: string
  caption?: string
  type: CreationType
  title: string
  description: string
  slug: string
  coverGradient: string
  engagement: EngagementMetrics
  hasPlay?: boolean
}

export interface GrokCreationCardProps {
  creation: GrokCreation
  onRemix?: (creation: GrokCreation) => void
  onPlay?: (creation: GrokCreation) => void
}

export interface GrokCreationsFeedProps {
  creations: GrokCreation[]
  title?: string
  onRemix?: (creation: GrokCreation) => void
  onPlay?: (creation: GrokCreation) => void
}

export interface CreatePromptBarProps {
  onBuild?: (prompt: string, type: CreationType | 'all') => void
  placeholder?: string
}
