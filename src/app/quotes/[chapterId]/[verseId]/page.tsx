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
        <h1 className="text-3xl font-bold mb-4">Quote not found</h1>
        <Link href={`/quotes`} className={buttonVariants({ variant: "default" })}>
          Back to Quotes
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
      <div className="mb-12 border-b border-border/30 pb-4">
        <Link href={`/quotes`} className={buttonVariants({ variant: "ghost", className: "mb-4 -ml-4 text-muted-foreground hover:text-primary transition-colors" })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Quotes Collection
        </Link>
      </div>

      <VerseCard verse={verse} hideReadMore={true} />
      
      <SpiritualReflection verseId={verse.slug} />

      <div className="mt-16 flex justify-center pt-10 border-t border-border/30">
        <Link href={`/quotes`} className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-full px-8 hover:bg-primary/5 hover:text-primary transition-colors" })}>
          Explore More Teachings
        </Link>
      </div>
    </div>
  )
}
