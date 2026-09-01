import { getVerse } from "@/lib/api/client"
import { VerseCard } from "@/components/VerseCard"

export const metadata = {
  title: "Today's Wisdom | Bhagavad Gita",
  description: "Read today's featured verse from the Bhagavad Gita.",
}

export default async function DailyVersePage() {
  const todaysVerse = await getVerse(2, 47)

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl relative">
      <div className="space-y-6 mb-16 text-center border-b border-border/30 pb-10">
        <p className="text-sm font-medium tracking-[0.3em] uppercase text-primary/60">
          Daily Reflection
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground font-tiro drop-shadow-sm">
          Today's Wisdom
        </h1>
        <p className="text-lg text-muted-foreground/80 font-light max-w-xl mx-auto">
          Begin your day with a moment of peace and a timeless truth.
        </p>
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
