import Link from "next/link"
import { getChapter, getChapterVerses } from "@/lib/api/client"
import { VerseCard } from "@/components/VerseCard"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

export async function generateMetadata({ params }: { params: Promise<{ chapterId: string }> }) {
  const { chapterId } = await params;
  const chapter = await getChapter(chapterId)
  if (!chapter) return { title: "Chapter Not Found | Bhagavad Gita" }
  return {
    title: `Chapter ${chapter.chapter_number}: ${chapter.name} | Bhagavad Gita`,
    description: chapter.chapter_summary,
  }
}

export default async function ChapterReaderPage({ params }: { params: Promise<{ chapterId: string }> }) {
  const { chapterId } = await params;
  const chapter = await getChapter(chapterId)
  const verses = await getChapterVerses(chapterId)

  if (!chapter) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Chapter not found</h1>
        <Link href="/chapters" className={buttonVariants({ variant: "default" })}>
          Back to Chapters
        </Link>
      </div>
    )
  }

  const prevChapter = chapter.chapter_number > 1 ? chapter.chapter_number - 1 : null
  const nextChapter = chapter.chapter_number < 18 ? chapter.chapter_number + 1 : null

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
      <div className="mb-8">
        <Link href="/chapters" className={buttonVariants({ variant: "ghost", className: "mb-4 -ml-4 text-muted-foreground" })}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          All Chapters
        </Link>
        <div className="space-y-4 text-center md:text-left border-b border-border/50 pb-8">
          <h2 className="text-primary font-semibold uppercase tracking-widest text-sm">
            Chapter {chapter.chapter_number}
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold font-tiro text-foreground">
            {chapter.name}
          </h1>
          <p className="text-xl text-muted-foreground italic">
            {chapter.name_meaning}
          </p>
          <p className="text-foreground/90 leading-relaxed max-w-3xl pt-4">
            {chapter.chapter_summary}
          </p>
        </div>
      </div>

      <div className="space-y-12">
        {verses.map((verse) => (
          <VerseCard key={verse.id} verse={verse} />
        ))}
        {verses.length === 0 && (
          <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-lg">
            No verses found for this chapter.
          </div>
        )}
      </div>

      <div className="mt-16 flex justify-between items-center border-t border-border/50 pt-8">
        {prevChapter ? (
          <Link href={`/chapters/${prevChapter}`} className={buttonVariants({ variant: "outline", className: "border-primary/20 hover:bg-primary/5" })}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Chapter {prevChapter}
          </Link>
        ) : (
          <div></div>
        )}
        
        {nextChapter && (
          <Link href={`/chapters/${nextChapter}`} className={buttonVariants({ variant: "outline", className: "border-primary/20 hover:bg-primary/5" })}>
            Chapter {nextChapter}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  )
}
