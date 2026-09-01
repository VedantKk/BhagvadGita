"use client"

import * as React from "react"
import { useSettingsStore } from "@/store/useSettingsStore"
import { useTranslation } from "@/lib/i18n"
import { Input } from "@/components/ui/input"
import { Search as SearchIcon } from "lucide-react"
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

    // Basic client-side search simulation
    const filtered = mockVerses.filter((v) => {
      // Match by verse number like "2.47"
      if (`${v.chapter_number}.${v.verse_number}`.includes(lowerQuery)) return true
      if (v.text.includes(lowerQuery)) return true
      if (v.transliteration.toLowerCase().includes(lowerQuery)) return true
      
      // Match translations
      for (const tr of v.translations) {
        if (tr.description.toLowerCase().includes(lowerQuery)) return true
      }
      
      return false
    })

    setResults(filtered)
  }, [query])

  if (!mounted) return null

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl min-h-[calc(100vh-4rem)]">
      <div className="space-y-4 mb-12 text-center md:text-left">
        <h1 className="text-4xl font-bold tracking-tight text-foreground font-tiro">
          {t.search}
        </h1>
        <p className="text-lg text-muted-foreground">
          Search for verses, keywords, or translations.
        </p>
      </div>

      <div className="relative max-w-2xl mx-auto md:mx-0 mb-12">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          type="text"
          className="pl-10 h-14 text-lg rounded-xl shadow-sm border-muted focus-visible:ring-primary"
          placeholder="Search verses (e.g., 2.47, karma, कर्म)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="space-y-8">
        {query && results.length === 0 && (
          <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-lg">
            No results found for "{query}".
          </div>
        )}
        
        {results.map((verse) => (
          <VerseCard key={verse.id} verse={verse} />
        ))}
      </div>
    </div>
  )
}
