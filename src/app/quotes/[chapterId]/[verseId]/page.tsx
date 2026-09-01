import type { Metadata } from "next"
import Link from "next/link"
import { getVerse } from "@/lib/api/client"
import { VerseCard } from "@/components/VerseCard"
import { buttonVariants } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { SpiritualReflection } from "@/components/SpiritualReflection"
import { getBreadcrumbJsonLd, getQuoteJsonLd, FAMOUS_VERSE_PHRASES } from "@/lib/seo"

export async function generateMetadata({ params }: { params: Promise<{ chapterId: string, verseId: string }> }): Promise<Metadata> {
  const { chapterId, verseId } = await params;
  const verse = await getVerse(chapterId, verseId)
  if (!verse) return { title: "Quote Not Found | Bhagavad Gita" }

  const verseKey = `${verse.chapter_number}.${verse.verse_number}`
  const famousPhrase = FAMOUS_VERSE_PHRASES[verseKey]

  const title = famousPhrase
    ? `Lord Krishna's Wisdom: Gita ${verseKey} – ${famousPhrase} | Quote & Reflection`
    : `Lord Krishna's Wisdom: Bhagavad Gita Chapter ${verse.chapter_number}, Verse ${verse.verse_number} | Quote & Life Lessons`

  const englishTranslation = verse.translations.find((t) => t.language.toLowerCase() === "english")?.description || verse.translations[0]?.description || ""
  const description = `Read Lord Krishna's teaching from Bhagavad Gita ${verseKey}: "${englishTranslation.slice(0, 140)}...". Spiritual reflection on life, duty, and peace.`

  return {
    title,
    description,
    keywords: [
      `Krishna Quote Gita ${verseKey}`,
      `Bhagavad Gita ${verseKey} quote`,
      `Bhagavad Gita Chapter ${verse.chapter_number} Verse ${verse.verse_number} teaching`,
      "Lord Krishna wisdom",
      "Bhagavad Gita life lessons",
      "Krishna teachings on karma and peace",
    ],
    alternates: {
      canonical: `/quotes/${verse.chapter_number}/${verse.verse_number}`,
    },
    openGraph: {
      title,
      description,
      url: `/quotes/${verse.chapter_number}/${verse.verse_number}`,
      type: "article",
      images: [
        {
          url: "/bg-krishna-arjuna.png",
          width: 1200,
          height: 630,
          alt: `Lord Krishna's Wisdom from Bhagavad Gita ${verseKey}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export default async function QuoteVersePage({ params }: { params: Promise<{ chapterId: string, verseId: string }> }) {
  const { chapterId, verseId } = await params;
  const verse = await getVerse(chapterId, verseId)

  if (!verse) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Quote not found</h1>
        <Link href={`/quotes`} className={buttonVariants({ variant: "default" })}>
          Back to Quotes
        </Link>
      </div>
    )
  }

  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Quotes", url: "/quotes" },
    { name: `Quote ${verse.chapter_number}.${verse.verse_number}`, url: `/quotes/${verse.chapter_number}/${verse.verse_number}` },
  ])

  const quoteSchema = getQuoteJsonLd(verse, `/quotes/${verse.chapter_number}/${verse.verse_number}`)

  return (
    <div className="container mx-auto px-3 sm:px-6 py-8 sm:py-16 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quoteSchema) }}
      />

      <div className="mb-8 sm:mb-12 border-b border-border/30 pb-4">
        <Link 
          href={`/quotes`} 
          className={buttonVariants({ 
            variant: "ghost", 
            className: "mb-2 -ml-2 sm:-ml-4 text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm h-9 px-3" 
          })}
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Back to Quotes Collection
        </Link>
      </div>

      <div className="bg-card/20 rounded-2xl sm:rounded-3xl p-3 sm:p-6 md:p-8 border border-border/20 backdrop-blur-sm">
        <VerseCard verse={verse} hideReadMore={true} />
      </div>
      
      <SpiritualReflection verseId={verse.slug} />

      <div className="mt-12 sm:mt-16 flex justify-center pt-8 border-t border-border/30">
        <Link 
          href={`/quotes`} 
          className={buttonVariants({ 
            variant: "outline", 
            size: "lg", 
            className: "rounded-full px-8 h-12 hover:bg-primary/5 hover:text-primary transition-colors text-sm sm:text-base" 
          })}
        >
          Explore More Teachings
        </Link>
      </div>
    </div>
  )
}
