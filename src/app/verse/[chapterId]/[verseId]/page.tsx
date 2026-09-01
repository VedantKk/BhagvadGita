import Link from "next/link"
import { getVerse } from "@/lib/api/client"
import { VerseCard } from "@/components/VerseCard"
import { buttonVariants } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { SpiritualReflection } from "@/components/SpiritualReflection"

export async function generateMetadata({ params }: { params: Promise<{ chapterId: string, verseId: string }> }) {
  const { chapterId, verseId } = await params;
  const verse = await getVerse(chapterId, verseId)
  if (!verse) return { title: "Verse Not Found | Bhagavad Gita" }
  return {
    title: `Chapter ${verse.chapter_number} Verse ${verse.verse_number} | Bhagavad Gita`,
    description: verse.translations[0]?.description || "Read and understand the Bhagavad Gita.",
  }
}

export default async function VersePage({ params }: { params: Promise<{ chapterId: string, verseId: string }> }) {
  const { chapterId, verseId } = await params;
  const verse = await getVerse(chapterId, verseId)

  if (!verse) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Verse not found</h1>
        <Link href={`/chapters/${chapterId}`} className={buttonVariants({ variant: "default" })}>
          Back to Chapter
        </Link>
      </div>
    )
  }

  // Basic next/prev verse navigation (assuming next verse is simply +1, but actual implementation might need max verses check per chapter)
  const prevVerse = verse.verse_number > 1 ? verse.verse_number - 1 : null
  const nextVerse = verse.verse_number + 1 // For real implementation, we should check max verses in the chapter

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
      <div className="mb-12 border-b border-border/30 pb-4">
        <Link href={`/chapters/${verse.chapter_number}`} className={buttonVariants({ variant: "ghost", className: "mb-4 -ml-4 text-muted-foreground hover:text-primary transition-colors" })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Chapter {verse.chapter_number}
        </Link>
      </div>

      <VerseCard verse={verse} hideReadMore={true} />
      
      <SpiritualReflection verseId={verse.slug} />

      <div className="mt-16 flex justify-between items-center pt-10 border-t border-border/30">
        {prevVerse ? (
          <Link href={`/verse/${verse.chapter_number}/${prevVerse}`} className={buttonVariants({ variant: "outline", className: "border-primary/20 hover:bg-primary/5" })}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Verse {prevVerse}
          </Link>
        ) : (
          <div></div>
        )}
        
        <Link href={`/verse/${verse.chapter_number}/${nextVerse}`} className={buttonVariants({ variant: "outline", className: "border-primary/20 hover:bg-primary/5" })}>
          Verse {nextVerse}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
