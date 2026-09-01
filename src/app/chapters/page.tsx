import Link from "next/link"
import { getChapters } from "@/lib/api/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"

export const metadata = {
  title: "Chapters | Bhagavad Gita",
  description: "Explore all 18 chapters of the Bhagavad Gita.",
}

export default async function ChaptersPage() {
  const chapters = await getChapters()

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-5xl">
      <div className="space-y-4 mb-12 text-center md:text-left">
        <h1 className="text-4xl font-bold tracking-tight text-foreground font-tiro">
          All Chapters
        </h1>
        <p className="text-lg text-muted-foreground">
          Select a chapter to read its verses and meaning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chapters.map((chapter) => (
          <Link key={chapter.id} href={`/chapters/${chapter.chapter_number}`}>
            <Card className="h-full hover:shadow-md transition-shadow border-muted cursor-pointer group bg-card">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-primary/80 uppercase tracking-wider">
                    Chapter {chapter.chapter_number}
                  </span>
                  <BookOpen className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <CardTitle className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors font-tiro">
                  {chapter.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground italic mt-1">
                  {chapter.name_meaning}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/80 line-clamp-3 leading-relaxed">
                  {chapter.chapter_summary}
                </p>
                <div className="mt-4 text-xs font-medium text-muted-foreground">
                  {chapter.verses_count} Verses
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
