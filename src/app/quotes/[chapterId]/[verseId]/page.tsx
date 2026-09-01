import Link from "next/link"
import { getVerse } from "@/lib/api/client"
import { VerseCard } from "@/components/VerseCard"
import { buttonVariants } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { SpiritualReflection } from "@/components/SpiritualReflection"

export async function generateMetadata({ params }: { params: Promise<{ chapterId: string, verseId: string }> }) {
  const { chapterId, verseId } = await params;
  const verse = await getVerse(chapterId, verseId)
  if (!verse) return { title: "Quote Not Found | Bhagavad Gita" }
  return {
    title: `Krishna's Wisdom: Chapter ${verse.chapter_number}, Verse ${verse.verse_number}`,
    description: verse.translations[0]?.description || "Read and understand the Bhagavad Gita.",
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

  return (
    <div className="container mx-auto px-3 sm:px-6 py-8 sm:py-16 max-w-4xl">
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
