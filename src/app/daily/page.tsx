import type { Metadata } from "next"
import { getDailyVerse } from "@/lib/data/daily"
import { VerseCard } from "@/components/VerseCard"
import { DailyVerseAutoRefresh } from "@/components/DailyVerseAutoRefresh"
import { Sparkles, Moon } from "lucide-react"
import { getBreadcrumbJsonLd, getVerseJsonLd } from "@/lib/seo"

export const dynamic = "force-dynamic"
export const revalidate = 60

export const metadata: Metadata = {
  title: "Today's Bhagavad Gita Shloka | Daily Verse & Spiritual Reflection",
  description: "Read today's featured verse from the Bhagavad Gita with Sanskrit shloka, Hindi and English translation. A daily reflection on peace, duty, and Krishna's wisdom. Changes daily at midnight.",
  keywords: [
    "Today's Bhagavad Gita Verse",
    "Daily Gita Shloka",
    "Bhagavad Gita daily reflection",
    "Gita thought of the day",
    "Krishna daily quote",
    "Verse of the day",
    "Daily spiritual wisdom",
  ],
  alternates: {
    canonical: "/daily",
  },
  openGraph: {
    title: "Today's Bhagavad Gita Shloka | Daily Reflection",
    description: "Read today's featured verse from the Bhagavad Gita with Sanskrit shloka, Hindi & English translation.",
    url: "/daily",
    images: [
      {
        url: "/bg-krishna-arjuna.png",
        width: 1200,
        height: 630,
        alt: "Today's Bhagavad Gita Verse",
      },
    ],
  },
}

export default async function DailyVersePage() {
  const todaysVerse = await getDailyVerse()

  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Today's Wisdom", url: "/daily" },
  ])

  const verseSchema = todaysVerse ? getVerseJsonLd(todaysVerse) : null

  return (
    <div className="container mx-auto px-3 sm:px-6 py-8 sm:py-16 md:py-24 max-w-4xl relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {verseSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(verseSchema) }}
        />
      )}

      <DailyVerseAutoRefresh />

      <div className="space-y-4 sm:space-y-6 mb-10 sm:mb-16 text-center border-b border-border/30 pb-8 sm:pb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Daily Reflection</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground font-tiro drop-shadow-sm">
          Today's Wisdom
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground/80 font-light max-w-xl mx-auto px-2">
          Begin your day with a moment of peace and a timeless truth from the Bhagavad Gita.
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/70 pt-1">
          <Moon className="w-3.5 h-3.5 text-primary/80" />
          <span>Refreshes automatically every midnight (12:00 AM)</span>
        </div>
      </div>

      <div className="space-y-8 sm:space-y-12 bg-card/20 p-3 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-sm border border-border/20">
        {todaysVerse ? (
          <VerseCard verse={todaysVerse} hideReadMore={false} />
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Unable to load today's wisdom.
          </div>
        )}
      </div>
    </div>
  )
}
