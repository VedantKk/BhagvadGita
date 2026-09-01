"use client"

import * as React from "react"
import { useSettingsStore } from "@/store/useSettingsStore"
import { useTranslation } from "@/lib/i18n"
import { VerseCard } from "@/components/VerseCard"
import { mockVerses } from "@/lib/api/mockData"

export default function SavedVersesPage() {
  const { language, savedVerses } = useSettingsStore()
  const t = useTranslation(language)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // For this mock version, we filter mockVerses. 
  // In a real app with many verses, we'd need to fetch these specific verses from the server or cache.
  const savedVersesData = mockVerses.filter((v) => savedVerses.includes(v.slug))

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl min-h-[calc(100vh-4rem)]">
      <div className="space-y-4 mb-16 text-center border-b border-border/30 pb-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground font-tiro drop-shadow-sm">
          {t.savedVerses}
        </h1>
        <p className="text-lg text-muted-foreground/80 font-light max-w-xl mx-auto">
          Your personal collection of wisdom and reflections.
        </p>
      </div>

      <div className="space-y-16">
        {savedVersesData.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground bg-card/10 rounded-3xl border border-border/20 backdrop-blur-sm">
            <p className="text-xl mb-4 font-tiro">{t.noSavedVerses}</p>
            <p className="text-sm font-light">Explore the chapters and tap the bookmark icon to save verses here.</p>
          </div>
        ) : (
          savedVersesData.map((verse) => (
            <VerseCard key={verse.id} verse={verse} />
          ))
        )}
      </div>
    </div>
  )
}
