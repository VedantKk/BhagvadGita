"use client"

import * as React from "react"
import { useSettingsStore } from "@/store/useSettingsStore"
import { useTranslation } from "@/lib/i18n"
import { Input } from "@/components/ui/input"
import { Search as SearchIcon, X, Sparkles } from "lucide-react"
import { VerseCard } from "@/components/VerseCard"
import { Verse } from "@/lib/api/types"
import { mockVerses } from "@/lib/api/mockData"

export default function SearchPage() {
  const { language } = useSettingsStore()
  const t = useTranslation(language)
  const [mounted, setMounted] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<Verse[]>([])

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const lowerQuery = query.toLowerCase()

    // Client-side search matching across verse numbers, sanskrit, transliteration and translations
    const filtered = mockVerses.filter((v) => {
      // Match by verse number format (e.g., "2.47" or "2:47" or "2 47")
      const formattedNum1 = `${v.chapter_number}.${v.verse_number}`
      const formattedNum2 = `${v.chapter_number}:${v.verse_number}`
      if (formattedNum1.includes(lowerQuery) || formattedNum2.includes(lowerQuery)) return true
      if (v.text.includes(lowerQuery)) return true
      if (v.transliteration && v.transliteration.toLowerCase().includes(lowerQuery)) return true
      
      // Match translations
      for (const tr of v.translations) {
        if (tr.description && tr.description.toLowerCase().includes(lowerQuery)) return true
      }
      
      return false
    })

    setResults(filtered.slice(0, 50)) // cap results for smooth performance
  }, [query])

  if (!mounted) return null

  return (
    <div className="container mx-auto px-3 sm:px-6 py-8 sm:py-16 max-w-4xl min-h-[calc(100vh-4rem)]">
      <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12 text-center md:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium uppercase tracking-widest">
          <SearchIcon className="w-3.5 h-3.5" />
          <span>Full Scripture Search</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground font-tiro">
          {t.search}
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
          Search all 700 verses by keyword, topic, or reference (e.g. 2.47, karma, peace, अर्जुन).
        </p>
      </div>

      <div className="relative max-w-2xl mx-auto md:mx-0 mb-8 sm:mb-12">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          type="text"
          className="pl-11 pr-10 h-12 sm:h-14 text-base sm:text-lg rounded-2xl shadow-sm border-border/50 bg-card/60 focus-visible:ring-primary/50"
          placeholder="Search verses (e.g., 2.47, karma, duty)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute inset-y-0 right-3.5 flex items-center text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="space-y-8 sm:space-y-12">
        {query && results.length === 0 && (
          <div className="text-center py-12 text-muted-foreground bg-card/20 rounded-2xl border border-border/20 p-6">
            <p className="text-base sm:text-lg font-medium">No results found for "{query}".</p>
            <p className="text-xs sm:text-sm mt-1 text-muted-foreground/70">
              Try searching by verse number like "2.47" or common concepts like "mind", "action", "yoga".
            </p>
          </div>
        )}

        {results.map((verse) => (
          <div key={verse.id} className="bg-card/20 rounded-2xl sm:rounded-3xl p-3 sm:p-6 md:p-8 border border-border/20 backdrop-blur-sm">
            <VerseCard verse={verse} />
          </div>
        ))}
      </div>
    </div>
  )
}
