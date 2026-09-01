import { Metadata } from "next"
import { QuotesClient } from "./QuotesClient"
import { getVerse } from "@/lib/api/client"
import { quotesList } from "@/lib/data/quotes"
import { Verse } from "@/lib/api/types"
import { getBreadcrumbJsonLd, SITE_URL } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Bhagavad Gita Quotes by Lord Krishna | 100+ Timeless Teachings on Karma, Dharma & Life",
  description: "100+ authentic teachings from the Bhagavad Gita by Lord Krishna on life, karma, duty, peace, mind control, courage, success, and spiritual liberation.",
  keywords: [
    "Bhagavad Gita Quotes",
    "Lord Krishna Quotes",
    "Bhagavad Gita teachings",
    "Krishna wisdom",
    "Bhagavad Gita on karma",
    "Bhagavad Gita on peace",
    "Bhagavad Gita on mind",
    "Bhagavad Gita life lessons",
    "Bhagavad Gita on fear",
    "Bhagavad Gita on success and failure",
  ],
  alternates: {
    canonical: "/quotes",
  },
  openGraph: {
    title: "Bhagavad Gita Quotes by Lord Krishna | Timeless Wisdom",
    description: "Explore 100+ timeless teachings from the Bhagavad Gita on life, duty, peace, and spiritual realization.",
    url: "/quotes",
    images: [
      {
        url: "/bg-krishna-arjuna.png",
        width: 1200,
        height: 630,
        alt: "Bhagavad Gita Quotes by Lord Krishna",
      },
    ],
  },
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

  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Quotes", url: "/quotes" },
  ])

  const quotesItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: quotesData.length,
    itemListElement: quotesData.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `Krishna Wisdom: Gita ${item.verse.chapter_number}.${item.verse.verse_number}`,
      url: `${SITE_URL}/quotes/${item.verse.chapter_number}/${item.verse.verse_number}`,
    })),
  }

  return (
    <div className="min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quotesItemList) }}
      />

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
