import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { GrokCreationCard } from '../components/GrokCreationCard'
import type { GrokCreation } from '../types'

const mockItem: GrokCreation = {
  id: 'test-1',
  author: {
    displayName: 'مطور تجريبي',
    handle: 'tester',
    verified: true,
  },
  timestamp: 'الآن',
  caption: 'تطبيق رائع تم إنشاؤه للتجربة',
  type: 'game',
  title: 'لعبة البكسل',
  description: 'وصف تجريبي للعبة البكسل السريعة',
  slug: 'pixel-game',
  coverGradient: 'linear-gradient(135deg, #000, #fff)',
  engagement: {
    replies: 5,
    reposts: 10,
    likes: 20,
    views: 100,
    bookmarks: 2,
  },
  hasPlay: true,
  userInteractions: {
    liked: false,
    reposted: false,
    bookmarked: false,
  },
}

describe('GrokCreationCard component', () => {
  it('renders creation details correctly', () => {
    render(<GrokCreationCard creation={mockItem} />)

    expect(screen.getByText('مطور تجريبي')).toBeInTheDocument()
    expect(screen.getByText('@tester')).toBeInTheDocument()
    expect(screen.getByText('لعبة البكسل')).toBeInTheDocument()
    expect(screen.getByText('وصف تجريبي للعبة البكسل السريعة')).toBeInTheDocument()
    expect(screen.getByText('تشغيل')).toBeInTheDocument()
  })

  it('triggers like, bookmark, and remix events', () => {
    let likedId = ''
    let bookmarkedId = ''
    let remixedItem: GrokCreation | undefined = undefined

    render(
      <GrokCreationCard
        creation={mockItem}
        onToggleLike={(id) => {
          likedId = id
        }}
        onToggleBookmark={(id) => {
          bookmarkedId = id
        }}
        onRemix={(item) => {
          remixedItem = item
        }}
      />
    )

    const likeButton = screen.getByLabelText(/20 إعجاب/i)
    fireEvent.click(likeButton)
    expect(likedId).toBe('test-1')

    const bookmarkButton = screen.getByLabelText(/إشارة مرجعية/i)
    fireEvent.click(bookmarkButton)
    expect(bookmarkedId).toBe('test-1')

    const remixButton = screen.getByText(/أعد المزج مع Grok/i)
    fireEvent.click(remixButton)
    expect(remixedItem && (remixedItem as GrokCreation).id).toBe('test-1')
  })
})
