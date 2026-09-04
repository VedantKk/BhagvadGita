export default function VerseLoading() {
  return (
    <div className="container mx-auto px-3 sm:px-6 py-8 sm:py-16 max-w-4xl animate-pulse">
      {/* Back button skeleton */}
      <div className="h-9 w-32 bg-muted/40 rounded-md mb-6" />

      {/* Verse card skeleton */}
      <div className="bg-card/20 rounded-2xl sm:rounded-3xl p-3 sm:p-6 md:p-8 border border-border/20 backdrop-blur-sm">
        <div className="flex w-full justify-between items-center py-2 sm:py-3 border-b border-border/20 mb-8">
          <div className="h-4 w-32 bg-primary/10 rounded" />
          <div className="flex gap-1">
            <div className="h-9 w-9 bg-muted/20 rounded-full" />
            <div className="h-9 w-9 bg-muted/20 rounded-full" />
            <div className="h-9 w-9 bg-muted/20 rounded-full" />
          </div>
        </div>
        <div className="space-y-8 text-center px-4 py-8">
          <div className="h-3 w-32 bg-primary/10 rounded mx-auto" />
          <div className="space-y-3">
            <div className="h-7 w-5/6 bg-muted/25 rounded mx-auto" />
            <div className="h-7 w-4/6 bg-muted/25 rounded mx-auto" />
            <div className="h-7 w-3/6 bg-muted/25 rounded mx-auto" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-4/5 bg-muted/15 rounded mx-auto" />
            <div className="h-4 w-3/5 bg-muted/15 rounded mx-auto" />
          </div>
          <div className="w-12 h-[2px] bg-primary/10 mx-auto rounded-full" />
          <div className="space-y-3 max-w-2xl mx-auto">
            <div className="h-5 w-full bg-muted/15 rounded" />
            <div className="h-5 w-full bg-muted/15 rounded" />
            <div className="h-5 w-full bg-muted/15 rounded" />
            <div className="h-5 w-2/3 bg-muted/15 rounded" />
          </div>
        </div>
      </div>

      {/* Word meanings skeleton */}
      <div className="mt-8 bg-card/20 rounded-2xl p-6 border border-border/20">
        <div className="h-6 w-36 bg-muted/25 rounded mb-4" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted/15 rounded" />
          <div className="h-4 w-full bg-muted/15 rounded" />
          <div className="h-4 w-3/4 bg-muted/15 rounded" />
        </div>
      </div>

      {/* Navigation skeleton */}
      <div className="mt-12 flex justify-between items-center border-t border-border/40 pt-8">
        <div className="h-11 w-36 bg-muted/20 rounded-md" />
        <div className="h-11 w-36 bg-muted/20 rounded-md" />
      </div>
    </div>
  )
}
