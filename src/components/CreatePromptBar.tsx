import { useState, type FormEvent } from 'react'
import type { CreationType, CreatePromptBarProps } from '../types'

const TYPE_PILLS: { id: CreationType | 'all'; label: string }[] = [
  { id: 'all', label: 'الكل' },
  { id: 'website', label: 'موقع' },
  { id: 'app', label: 'تطبيق' },
  { id: 'game', label: 'لعبة' },
  { id: 'board', label: 'لوحة' },
]

export function CreatePromptBar({
  onBuild,
  placeholder = 'ماذا تريد أن يبني Grok؟',
  initialPrompt,
  onClearInitialPrompt,
}: CreatePromptBarProps) {
  const [internalPrompt, setInternalPrompt] = useState('')
  const [selectedType, setSelectedType] = useState<CreationType | 'all'>('all')

  const prompt = initialPrompt !== undefined && initialPrompt !== '' ? initialPrompt : internalPrompt

  function handlePromptChange(val: string) {
    if (initialPrompt) {
      onClearInitialPrompt?.()
    }
    setInternalPrompt(val)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = prompt.trim()
    if (!trimmed) return
    onBuild?.(trimmed, selectedType)
    setInternalPrompt('')
    onClearInitialPrompt?.()
  }

  return (
    <div className="border-b border-x-border bg-x-bg px-4 py-3">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{
            background: 'linear-gradient(135deg, #1d9bf0, #7856ff)',
          }}
          aria-hidden
        >
          G
        </div>

        <div className="min-w-0 flex-1">
          <label htmlFor="grok-prompt" className="sr-only">
            {placeholder}
          </label>
          <textarea
            id="grok-prompt"
            rows={2}
            value={prompt}
            onChange={(e) => handlePromptChange(e.target.value)}
            placeholder={placeholder}
            className="w-full resize-none bg-transparent text-[20px] leading-6 text-x-text outline-none placeholder:text-x-muted"
          />

          <div className="mt-2 flex flex-wrap items-center gap-2">
            {TYPE_PILLS.map((pill) => {
              const active = selectedType === pill.id
              return (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setSelectedType(pill.id)}
                  className={`rounded-full px-3 py-1 text-[13px] font-semibold transition ring-1 ring-inset ${
                    active
                      ? 'bg-x-accent/15 text-x-accent ring-x-accent/40'
                      : 'text-x-muted ring-x-border hover:bg-white/5 hover:text-x-text'
                  }`}
                >
                  {pill.label}
                </button>
              )
            })}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-x-border pt-3">
            <p className="text-[12px] text-x-muted">
              Grok Build · تجربة واجهة مشاركة
            </p>
            <button
              type="submit"
              disabled={!prompt.trim()}
              className="rounded-full bg-x-accent px-4 py-1.5 text-[15px] font-bold text-white transition hover:bg-[#1a8cd8] disabled:cursor-not-allowed disabled:opacity-50"
            >
              بناء
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreatePromptBar
