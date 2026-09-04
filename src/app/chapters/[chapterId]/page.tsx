import type { Metadata } from "next"
import Link from "next/link"
import { getChapter, getChapterVerses } from "@/lib/api/client"
import { VerseCard } from "@/components/VerseCard"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { getBreadcrumbJsonLd, getChapterJsonLd, SITE_URL } from "@/lib/seo"

// Pre-render all 18 chapter pages at build time for instant navigation
export async function generateStaticParams() {
  return Array.from({ length: 18 }, (_, i) => ({
    chapterId: String(i + 1),
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ chapterId: string }> }): Promise<Metadata> {
  const { chapterId } = await params;
  const chapter = await getChapter(chapterId)
  if (!chapter) return { title: "Chapter Not Found | Bhagavad Gita" }

  const title = `Bhagavad Gita Chapter ${chapter.chapter_number} – ${chapter.name_translation || chapter.name} | Shlokas, Meaning & Translation`
  const description = `${chapter.chapter_summary.slice(0, 150)}... Read all ${chapter.verses_count} verses with Sanskrit shlokas, English and Hindi translations.`

  return {
    title,
    description,
    keywords: [
      `Bhagavad Gita Chapter ${chapter.chapter_number}`,
      `Gita Chapter ${chapter.chapter_number}`,
      chapter.name,
      chapter.name_translation,
      chapter.name_meaning,
      `Bhagavad Gita Chapter ${chapter.chapter_number} summary`,
      `Bhagavad Gita Chapter ${chapter.chapter_number} shlokas`,
      `Chapter ${chapter.chapter_number} Hindi translation`,
      `Chapter ${chapter.chapter_number} English translation`,
    ],
    alternates: {
      canonical: `/chapters/${chapter.chapter_number}`,
    },
    openGraph: {
      title,
      description,
      url: `/chapters/${chapter.chapter_number}`,
      type: "article",
      images: [
        {
          url: "/bg-krishna-arjuna.png",
          width: 1200,
          height: 630,
          alt: `Bhagavad Gita Chapter ${chapter.chapter_number} - ${chapter.name}`,
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

export default async function ChapterReaderPage({ params }: { params: Promise<{ chapterId: string }> }) {
  const { chapterId } = await params;
  const [chapter, verses] = await Promise.all([
    getChapter(chapterId),
    getChapterVerses(chapterId),
  ])

  if (!chapter) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Chapter not found</h1>
        <Link href="/chapters" className={buttonVariants({ variant: "default" })}>
          Back to Chapters
        </Link>
      </div>
    )
  }

  const prevChapter = chapter.chapter_number > 1 ? chapter.chapter_number - 1 : null
  const nextChapter = chapter.chapter_number < 18 ? chapter.chapter_number + 1 : null

  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Chapters", url: "/chapters" },
    { name: `Chapter ${chapter.chapter_number}`, url: `/chapters/${chapter.chapter_number}` },
  ])

  const chapterSchema = getChapterJsonLd(chapter)

  const versesItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: verses.length,
    itemListElement: verses.map((verse, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `Bhagavad Gita ${verse.chapter_number}.${verse.verse_number}`,
      url: `${SITE_URL}/verse/${verse.chapter_number}/${verse.verse_number}`,
    })),
  }

  return (
    <div className="container mx-auto px-3 sm:px-6 py-8 sm:py-16 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(chapterSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(versesItemList) }}
      />

      <div className="mb-8 sm:mb-12">
        <Link href="/chapters" className={buttonVariants({ variant: "ghost", className: "mb-4 -ml-2 sm:-ml-4 text-muted-foreground hover:text-foreground text-xs sm:text-sm h-9 px-3" })}>
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          All Chapters
        </Link>
        <div className="space-y-3 sm:space-y-4 text-center md:text-left border-b border-border/40 pb-6 sm:pb-8">
          <span className="text-primary font-semibold uppercase tracking-widest text-xs sm:text-sm">
            Chapter {chapter.chapter_number}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-tiro text-foreground leading-tight">
            {chapter.name}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground italic font-tiro">
            {chapter.name_meaning}
          </p>
          <p className="text-sm sm:text-base text-foreground/90 leading-relaxed max-w-3xl pt-2 sm:pt-4">
            {chapter.chapter_summary}
          </p>
        </div>
      </div>

      <div className="space-y-10 sm:space-y-16">
        {verses.map((verse) => (
          <div key={verse.id} className="bg-card/20 rounded-2xl sm:rounded-3xl p-3 sm:p-6 md:p-8 border border-border/20 backdrop-blur-sm">
            <VerseCard verse={verse} />
          </div>
        ))}
        {verses.length === 0 && (
          <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-xl">
            No verses found for this chapter.
          </div>
        )}
      </div>

      {/* Responsive Chapter Navigation */}
      <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 border-t border-border/40 pt-8">
        {prevChapter ? (
          <Link 
            href={`/chapters/${prevChapter}`} 
            className={buttonVariants({ 
              variant: "outline", 
              className: "border-primary/20 hover:bg-primary/5 h-11 px-5 justify-center text-sm" 
            })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Chapter {prevChapter}
          </Link>
        ) : (
          <div className="hidden sm:block"></div>
        )}
        
        {nextChapter && (
          <Link 
            href={`/chapters/${nextChapter}`} 
            className={buttonVariants({ 
              variant: "outline", 
              className: "border-primary/20 hover:bg-primary/5 h-11 px-5 justify-center text-sm" 
            })}
          >
            Chapter {nextChapter}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  )
}
