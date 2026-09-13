import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CreatePromptBar } from '../components/CreatePromptBar'

describe('CreatePromptBar component', () => {
  it('renders input area and type pills', () => {
    render(<CreatePromptBar />)

    expect(
      screen.getByPlaceholderText('ماذا تريد أن يبني Grok؟')
    ).toBeInTheDocument()
    expect(screen.getByText('بناء')).toBeInTheDocument()
    expect(screen.getByText('موقع')).toBeInTheDocument()
    expect(screen.getByText('لعبة')).toBeInTheDocument()
  })

  it('submits build prompt with selected type', () => {
    let builtPrompt = ''
    let builtType = ''

    render(
      <CreatePromptBar
        onBuild={(prompt, type) => {
          builtPrompt = prompt
          builtType = type
        }}
      />
    )

    const input = screen.getByPlaceholderText('ماذا تريد أن يبني Grok؟')
    const gamePill = screen.getByText('لعبة')
    const buildBtn = screen.getByText('بناء')

    fireEvent.click(gamePill)
    fireEvent.change(input, { target: { value: 'لعبة الفضاء والمغامرات' } })
    fireEvent.click(buildBtn)

    expect(builtPrompt).toBe('لعبة الفضاء والمغامرات')
    expect(builtType).toBe('game')
  })
})
