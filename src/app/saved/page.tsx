"use client"

import * as React from "react"
import { useSettingsStore } from "@/store/useSettingsStore"
import { useTranslation } from "@/lib/i18n"
import { VerseCard } from "@/components/VerseCard"
import { mockVerses } from "@/lib/api/mockData"
import Link from "next/link"
import { Bookmark, Sparkles } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

export default function SavedVersesPage() {
  const { language, savedVerses } = useSettingsStore()
  const t = useTranslation(language)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const savedVersesData = mockVerses.filter((v) => savedVerses.includes(v.slug))

  return (
    <div className="container mx-auto px-3 sm:px-6 py-8 sm:py-16 max-w-4xl min-h-[calc(100vh-4rem)]">
      <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-16 text-center border-b border-border/30 pb-6 sm:pb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium uppercase tracking-widest">
          <Bookmark className="w-3.5 h-3.5" />
          <span>Personal Bookmarks</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground font-tiro drop-shadow-sm">
          {t.savedVerses}
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground/80 font-light max-w-xl mx-auto px-2">
          Your personal collection of sacred wisdom, saved locally on your device.
        </p>
      </div>

      <div className="space-y-10 sm:space-y-16">
        {savedVersesData.length === 0 ? (
          <div className="text-center py-16 sm:py-24 text-muted-foreground bg-card/20 rounded-2xl sm:rounded-3xl border border-border/20 backdrop-blur-sm p-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2">
              <Bookmark className="h-6 w-6" />
            </div>
            <p className="text-lg sm:text-xl font-tiro text-foreground">{t.noSavedVerses}</p>
            <p className="text-xs sm:text-sm font-light text-muted-foreground/80 max-w-md mx-auto">
              Explore chapters or daily verses and tap the bookmark icon to save teachings here for quick access.
            </p>
            <div className="pt-2">
              <Link 
                href="/chapters" 
                className={buttonVariants({ 
                  size: "sm", 
                  className: "rounded-full px-6 h-10 text-xs sm:text-sm font-medium" 
                })}
              >
                <Sparkles className="mr-1.5 h-4 w-4" />
                Explore Chapters
              </Link>
            </div>
          </div>
        ) : (
          savedVersesData.map((verse) => (
            <div key={verse.id} className="bg-card/20 rounded-2xl sm:rounded-3xl p-3 sm:p-6 md:p-8 border border-border/20 backdrop-blur-sm">
              <VerseCard verse={verse} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}
