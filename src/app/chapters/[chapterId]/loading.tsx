export default function ChapterLoading() {
  return (
    <div className="container mx-auto px-3 sm:px-6 py-8 sm:py-16 max-w-4xl animate-pulse">
      {/* Back button skeleton */}
      <div className="mb-8 sm:mb-12">
        <div className="h-9 w-28 bg-muted/40 rounded-md mb-4" />
        <div className="space-y-3 sm:space-y-4 text-center md:text-left border-b border-border/40 pb-6 sm:pb-8">
          <div className="h-4 w-20 bg-primary/10 rounded mx-auto md:mx-0" />
          <div className="h-10 sm:h-12 w-64 bg-muted/30 rounded-lg mx-auto md:mx-0" />
          <div className="h-5 w-48 bg-muted/20 rounded mx-auto md:mx-0" />
          <div className="space-y-2 pt-2 sm:pt-4 max-w-3xl">
            <div className="h-4 w-full bg-muted/20 rounded" />
            <div className="h-4 w-full bg-muted/20 rounded" />
            <div className="h-4 w-3/4 bg-muted/20 rounded" />
          </div>
        </div>
      </div>

      {/* Verse skeletons */}
      <div className="space-y-10 sm:space-y-16">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-card/20 rounded-2xl sm:rounded-3xl p-3 sm:p-6 md:p-8 border border-border/20 backdrop-blur-sm"
          >
            <div className="flex w-full justify-between items-center py-2 sm:py-3 border-b border-border/20 mb-8">
              <div className="h-4 w-32 bg-primary/10 rounded" />
              <div className="flex gap-1">
                <div className="h-9 w-9 bg-muted/20 rounded-full" />
                <div className="h-9 w-9 bg-muted/20 rounded-full" />
                <div className="h-9 w-9 bg-muted/20 rounded-full" />
              </div>
            </div>
            <div className="space-y-6 text-center px-4">
              <div className="h-3 w-32 bg-primary/10 rounded mx-auto" />
              <div className="space-y-2">
                <div className="h-6 w-5/6 bg-muted/25 rounded mx-auto" />
                <div className="h-6 w-4/6 bg-muted/25 rounded mx-auto" />
              </div>
              <div className="w-12 h-[2px] bg-primary/10 mx-auto rounded-full" />
              <div className="space-y-2 max-w-2xl mx-auto">
                <div className="h-4 w-full bg-muted/15 rounded" />
                <div className="h-4 w-full bg-muted/15 rounded" />
                <div className="h-4 w-2/3 bg-muted/15 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
