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
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Verse not found</h1>
        <Link href={`/chapters/${chapterId}`} className={buttonVariants({ variant: "default" })}>
          Back to Chapter
        </Link>
      </div>
    )
  }

  const prevVerse = verse.verse_number > 1 ? verse.verse_number - 1 : null
  const nextVerse = verse.verse_number + 1

  return (
    <div className="container mx-auto px-3 sm:px-6 py-8 sm:py-16 max-w-4xl">
      <div className="mb-8 border-b border-border/30 pb-4">
        <Link 
          href={`/chapters/${verse.chapter_number}`} 
          className={buttonVariants({ 
            variant: "ghost", 
            className: "mb-2 -ml-2 sm:-ml-4 text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm h-9 px-3" 
          })}
        >
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          Chapter {verse.chapter_number}
        </Link>
      </div>

      <div className="bg-card/20 rounded-2xl sm:rounded-3xl p-3 sm:p-6 md:p-8 border border-border/20 backdrop-blur-sm">
        <VerseCard verse={verse} hideReadMore={true} />
      </div>
      
      <SpiritualReflection verseId={verse.slug} />

      {/* Navigation Between Verses */}
      <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 pt-8 border-t border-border/30">
        {prevVerse ? (
          <Link 
            href={`/verse/${verse.chapter_number}/${prevVerse}`} 
            className={buttonVariants({ 
              variant: "outline", 
              className: "border-primary/20 hover:bg-primary/5 h-11 px-5 justify-center text-sm" 
            })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous Verse ({prevVerse})
          </Link>
        ) : (
          <div className="hidden sm:block"></div>
        )}
        
        <Link 
          href={`/verse/${verse.chapter_number}/${nextVerse}`} 
          className={buttonVariants({ 
            variant: "outline", 
            className: "border-primary/20 hover:bg-primary/5 h-11 px-5 justify-center text-sm" 
          })}
        >
          <span>Next Verse ({nextVerse})</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
