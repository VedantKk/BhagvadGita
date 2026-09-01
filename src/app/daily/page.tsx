import { getDailyVerse } from "@/lib/data/daily"
import { VerseCard } from "@/components/VerseCard"
import { DailyVerseAutoRefresh } from "@/components/DailyVerseAutoRefresh"
import { Sparkles, Moon } from "lucide-react"

export const dynamic = "force-dynamic"
export const revalidate = 60

export const metadata = {
  title: "Today's Wisdom | Bhagavad Gita",
  description: "Read today's featured verse from the Bhagavad Gita. Changes daily at midnight.",
}

export default async function DailyVersePage() {
  const todaysVerse = await getDailyVerse()

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl relative">
      <DailyVerseAutoRefresh />

      <div className="space-y-6 mb-16 text-center border-b border-border/30 pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Daily Reflection</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground font-tiro drop-shadow-sm">
          Today's Wisdom
        </h1>
        <p className="text-lg text-muted-foreground/80 font-light max-w-xl mx-auto">
          Begin your day with a moment of peace and a timeless truth from the Bhagavad Gita.
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground/60">
          <Moon className="w-3.5 h-3.5" />
          <span>Refreshes automatically every midnight (12:00 AM)</span>
        </div>
      </div>

      <div className="space-y-12 bg-card/10 p-4 md:p-8 rounded-3xl backdrop-blur-sm border border-border/20">
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
