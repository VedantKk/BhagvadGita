import { Metadata } from "next"
import { QuotesClient } from "./QuotesClient"
import { getVerse } from "@/lib/api/client"
import { quotesList } from "@/lib/data/quotes"
import { Verse } from "@/lib/api/types"

export const metadata: Metadata = {
  title: "Bhagavad Gita Quotes by Lord Krishna | Timeless Wisdom",
  description: "100+ timeless teachings from the Bhagavad Gita on life, karma, dharma, peace, wisdom and spiritual liberation.",
  openGraph: {
    title: "Bhagavad Gita Quotes by Lord Krishna",
    description: "Explore timeless teachings from the Bhagavad Gita.",
  }
}

export default async function QuotesPage() {
  const promises = quotesList.map((q) => getVerse(q.chapterId, q.verseId))
  const verses = (await Promise.all(promises)).filter(Boolean) as Verse[]
  
  const quotesData = verses.map(v => {
    const meta = quotesList.find(q => q.chapterId === v.chapter_number && q.verseId === v.verse_number)
    return {
      verse: v,
      categories: meta?.categories || []
    }
  })

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <section className="relative w-full py-20 px-4 flex flex-col items-center text-center bg-primary/5">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground font-tiro">
            Bhagavad Gita Quotes
            <br />
            <span className="text-primary/80 text-3xl md:text-4xl">by Lord Krishna</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground pt-2">
            100+ timeless teachings from the Bhagavad Gita on life, karma, dharma, peace, wisdom and spiritual liberation.
          </p>
        </div>
      </section>

      {/* Interactive Client Component */}
      <QuotesClient initialQuotes={quotesData} />

      {/* SEO Section */}
      <section className="max-w-4xl mx-auto px-4 mt-32 pt-16 border-t border-border/30">
        <div className="space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-tiro text-foreground">About Bhagavad Gita Quotes</h2>
          <p className="leading-relaxed">
            The Bhagavad Gita is an ancient Indian scripture comprising 700 verses, set in a narrative framework of a dialogue between Pandava prince Arjuna and his guide and charioteer Lord Krishna. 
          </p>
          <p className="leading-relaxed">
            The teachings explore fundamental concepts of action (Karma), duty (Dharma), knowledge (Jnana), devotion (Bhakti), self-discipline, detachment, and spiritual realization. 
          </p>
          <p className="leading-relaxed text-sm italic">
            Note: The quotes presented in this collection are exact verses or excerpts from the original scripture. We maintain the integrity of the text by always citing the specific Chapter and Verse from the Bhagavad Gita, avoiding modern misattributions.
          </p>
        </div>
      </section>
    </div>
  )
}
