import type { Metadata } from "next"
import Link from "next/link"
import { getChapters } from "@/lib/api/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Sparkles } from "lucide-react"
import { getBreadcrumbJsonLd, SITE_URL } from "@/lib/seo"

export const metadata: Metadata = {
  title: "All 18 Chapters of Bhagavad Gita | Summary, Meaning & Sanskrit Shlokas",
  description: "Explore all 18 chapters of the Bhagavad Gita from Arjuna Vishada Yoga to Moksha Sanyasa Yoga. Read Sanskrit verses, Hindi & English translations, and chapter summaries.",
  keywords: [
    "Bhagavad Gita Chapters",
    "All 18 Chapters of Gita",
    "Bhagavad Gita summary",
    "Gita chapters in English",
    "Gita chapters in Hindi",
    "Sankhya Yoga",
    "Karma Yoga",
    "Bhakti Yoga",
    "Jnana Yoga",
    "Moksha Sanyasa Yoga",
  ],
  alternates: {
    canonical: "/chapters",
  },
  openGraph: {
    title: "All 18 Chapters of Bhagavad Gita | Shlokas & Meanings",
    description: "Explore all 18 chapters of the Bhagavad Gita with summaries, shloka counts, and word meanings.",
    url: "/chapters",
  },
}

export default async function ChaptersPage() {
  const chapters = await getChapters()

  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Chapters", url: "/chapters" },
  ])

  const chaptersItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: chapters.map((chapter, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `Chapter ${chapter.chapter_number}: ${chapter.name_translation || chapter.name}`,
      description: chapter.chapter_summary,
      url: `${SITE_URL}/chapters/${chapter.chapter_number}`,
    })),
  }

  return (
    <div className="container mx-auto px-3 sm:px-6 py-10 sm:py-16 max-w-5xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(chaptersItemList) }}
      />

      <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12 text-center md:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Complete Scripture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground font-tiro">
          All 18 Chapters
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl">
          Select a chapter to explore its verses, word meanings, and spiritual essence.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {chapters.map((chapter) => (
          <Link key={chapter.id} href={`/chapters/${chapter.chapter_number}`} className="group">
            <Card className="h-full hover:shadow-md hover:border-primary/40 transition-all border-border/40 cursor-pointer bg-card/60 backdrop-blur-sm flex flex-col justify-between">
              <CardHeader className="p-5 sm:p-6 pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-primary/80 uppercase tracking-widest">
                    Chapter {chapter.chapter_number}
                  </span>
                  <BookOpen className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </div>
                <CardTitle className="text-lg sm:text-xl font-semibold leading-snug group-hover:text-primary transition-colors font-tiro">
                  {chapter.name}
                </CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground italic mt-1">
                  {chapter.name_meaning}
                </p>
              </CardHeader>
              <CardContent className="p-5 sm:p-6 pt-0">
                <p className="text-xs sm:text-sm text-foreground/80 line-clamp-3 leading-relaxed">
                  {chapter.chapter_summary}
                </p>
                <div className="mt-4 pt-3 border-t border-border/20 flex items-center justify-between text-xs font-medium text-muted-foreground">
                  <span>{chapter.verses_count} Verses</span>
                  <span className="text-primary group-hover:translate-x-0.5 transition-transform">Read &rarr;</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
