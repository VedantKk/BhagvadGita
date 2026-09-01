import type { Metadata } from "next"
import Link from "next/link"
import { getVerse } from "@/lib/api/client"
import { getDailyVerse } from "@/lib/data/daily"
import { VerseCard } from "@/components/VerseCard"
import { QuoteCard } from "@/components/QuoteCard"
import { DailyVerseAutoRefresh } from "@/components/DailyVerseAutoRefresh"
import { buttonVariants } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import { quotesList } from "@/lib/data/quotes"
import { Verse } from "@/lib/api/types"

export const dynamic = "force-dynamic"
export const revalidate = 60

export const metadata: Metadata = {
  title: "Bhagavad Gita – Read Bhagavad Gita Online | Sanskrit, Hindi & English Translation",
  description: "Read the Bhagavad Gita online with original Sanskrit shlokas, English and Hindi translations, verse meanings, chapter summaries, and timeless teachings of Lord Krishna.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bhagavad Gita – Read Bhagavad Gita Online | Sanskrit, Hindi & English",
    description: "Read the Bhagavad Gita online with original Sanskrit shlokas, English and Hindi translations, verse meanings, and chapter summaries.",
    url: "/",
  },
}

export default async function Home() {
  const todaysVerse = await getDailyVerse()
  
  const featuredQuotesData = quotesList.filter((q) => q.isFeatured).slice(0, 3)
  const featuredVersesPromises = featuredQuotesData.map((q) => getVerse(q.chapterId, q.verseId))
  const featuredVerses = (await Promise.all(featuredVersesPromises)).filter(Boolean) as Verse[]

  return (
    <div className="relative flex flex-col items-center min-h-[calc(100vh-4rem)] overflow-hidden w-full">
      <DailyVerseAutoRefresh />

      {/* Ambient Spiritual Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full py-16 sm:py-24 md:py-36 px-4 flex flex-col items-center text-center">
        <div className="max-w-3xl space-y-6 sm:space-y-8 relative z-10 w-full">
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground font-tiro drop-shadow-sm">
              Bhagavad Gita
            </h1>
            <p className="text-lg sm:text-2xl md:text-3xl font-medium text-primary/80 italic tracking-wider font-tiro">
              "Read. Understand. Experience."
            </p>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto pt-2 sm:pt-4 leading-relaxed font-light px-2">
            Discover timeless wisdom in a peaceful reading experience across all your devices.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6 pt-6 sm:pt-10 max-w-md sm:max-w-none mx-auto w-full px-4">
            <Link 
              href="/verse/1/1" 
              className={buttonVariants({ 
                size: "lg", 
                className: "rounded-full h-12 sm:h-14 px-8 text-base sm:text-lg font-medium shadow-md hover:shadow-lg transition-all justify-center" 
              })}
            >
              Begin Reading
            </Link>
            <Link 
              href="/chapters" 
              className={buttonVariants({ 
                variant: "outline", 
                size: "lg", 
                className: "rounded-full h-12 sm:h-14 px-8 text-base sm:text-lg font-medium border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all bg-background/50 backdrop-blur-sm justify-center" 
              })}
            >
              <BookOpen className="mr-2.5 h-5 w-5 text-primary shrink-0" />
              Explore Chapters
            </Link>
          </div>
        </div>
      </section>

      {/* Today's Verse Section */}
      <section className="relative z-10 w-full max-w-4xl px-3 sm:px-6 pb-16 sm:pb-24 space-y-8 sm:space-y-12">
        <div className="text-center space-y-2 sm:space-y-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium tracking-wide text-foreground/90 uppercase text-xs sm:text-sm">
            Today's Wisdom
          </h2>
          <div className="w-8 h-[2px] bg-primary/30 mx-auto rounded-full"></div>
        </div>
        
        {todaysVerse ? (
          <div className="transform hover:-translate-y-0.5 transition-transform duration-300 bg-card/20 rounded-2xl sm:rounded-3xl p-3 sm:p-6 md:p-8 border border-border/20 backdrop-blur-sm">
            <VerseCard verse={todaysVerse} hideReadMore={false} />
          </div>
        ) : (
          <div className="text-center text-muted-foreground p-8 border rounded-xl bg-card">
            Unable to load today's verse.
          </div>
        )}
      </section>

      {/* Timeless Wisdom Section */}
      <section className="relative w-full py-16 sm:py-24 px-3 sm:px-6 bg-primary/5">
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          <div className="text-center space-y-3 sm:space-y-4 px-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-tiro font-bold tracking-tight text-foreground">
              Timeless Wisdom
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Selected teachings from the Bhagavad Gita to guide your daily life.
            </p>
            <div className="w-12 h-[2px] bg-primary/30 mx-auto rounded-full mt-4 sm:mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredVerses.map((verse) => (
              <QuoteCard key={verse.slug} verse={verse} />
            ))}
          </div>
          
          <div className="flex justify-center pt-4 sm:pt-8">
            <Link 
              href="/quotes" 
              className={buttonVariants({ 
                variant: "outline", 
                size: "lg", 
                className: "rounded-full px-8 h-12 hover:bg-primary/5 hover:text-primary transition-colors text-sm sm:text-base" 
              })}
            >
              View All Quotes
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
