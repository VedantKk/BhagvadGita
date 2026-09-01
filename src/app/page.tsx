import Link from "next/link"
import { getVerse } from "@/lib/api/client"
import { VerseCard } from "@/components/VerseCard"
import { QuoteCard } from "@/components/QuoteCard"
import { buttonVariants } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import { quotesList } from "@/lib/data/quotes"
import { Verse } from "@/lib/api/types"

export default async function Home() {
  const todaysVerse = await getVerse(2, 47)
  
  const featuredQuotesData = quotesList.filter((q) => q.isFeatured).slice(0, 3)
  const featuredVersesPromises = featuredQuotesData.map((q) => getVerse(q.chapterId, q.verseId))
  const featuredVerses = (await Promise.all(featuredVersesPromises)).filter(Boolean) as Verse[]

  return (
    <div className="relative flex flex-col items-center min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Ambient Spiritual Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-40 px-4 flex flex-col items-center text-center">
        <div className="max-w-3xl space-y-8 relative z-10">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground font-tiro drop-shadow-sm">
              Bhagavad Gita
            </h1>
            <p className="text-xl md:text-3xl font-medium text-primary/80 italic tracking-wider font-tiro">
              "Read. Understand. Experience."
            </p>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto pt-4 leading-relaxed font-light">
            Discover timeless wisdom in a peaceful reading experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <Link href="/verse/1/1" className={buttonVariants({ size: "lg", className: "rounded-full px-10 h-14 text-lg font-medium shadow-md hover:shadow-lg transition-all" })}>
              Begin Reading
            </Link>
            <Link href="/chapters" className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-full px-8 h-14 text-lg font-medium border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all bg-background/50 backdrop-blur-sm" })}>
              <BookOpen className="mr-3 h-5 w-5 text-primary" />
              Explore Chapters
            </Link>
          </div>
        </div>
      </section>

      {/* Today's Verse Section */}
      <section className="relative z-10 w-full max-w-4xl px-4 pb-24 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-2xl md:text-3xl font-medium tracking-wide text-foreground/90 uppercase text-sm">
            Today's Wisdom
          </h2>
          <div className="w-8 h-[2px] bg-primary/30 mx-auto rounded-full"></div>
        </div>
        
        {todaysVerse ? (
          <div className="transform hover:-translate-y-1 transition-transform duration-500">
            <VerseCard verse={todaysVerse} hideReadMore={false} />
          </div>
        ) : (
          <div className="text-center text-muted-foreground p-8 border rounded-xl bg-card">
            Unable to load today's verse.
          </div>
        )}
      </section>

      {/* Timeless Wisdom Section */}
      <section className="relative w-full py-24 px-4 bg-primary/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-tiro font-bold tracking-tight text-foreground">
              Timeless Wisdom
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Selected teachings from the Bhagavad Gita to guide your daily life.
            </p>
            <div className="w-12 h-[2px] bg-primary/30 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVerses.map((verse) => (
              <QuoteCard key={verse.slug} verse={verse} />
            ))}
          </div>
          
          <div className="flex justify-center pt-8">
            <Link href="/quotes" className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-full px-8 hover:bg-primary/5 hover:text-primary transition-colors" })}>
              View All Quotes
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
