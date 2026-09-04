export default function ChaptersLoading() {
  return (
    <div className="container mx-auto px-3 sm:px-6 py-10 sm:py-16 max-w-5xl animate-pulse">
      <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-12 text-center md:text-left">
        <div className="h-6 w-36 bg-primary/10 rounded-full mx-auto md:mx-0" />
        <div className="h-10 sm:h-12 w-64 bg-muted/30 rounded-lg mx-auto md:mx-0" />
        <div className="h-5 w-80 bg-muted/20 rounded mx-auto md:mx-0" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="h-full border border-border/40 rounded-xl bg-card/60 backdrop-blur-sm p-5 sm:p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="h-3 w-20 bg-primary/10 rounded" />
                <div className="h-4 w-4 bg-muted/20 rounded" />
              </div>
              <div className="h-6 w-3/4 bg-muted/25 rounded mb-2" />
              <div className="h-4 w-1/2 bg-muted/15 rounded mb-4" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-muted/15 rounded" />
                <div className="h-3 w-full bg-muted/15 rounded" />
                <div className="h-3 w-2/3 bg-muted/15 rounded" />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border/20 flex items-center justify-between">
              <div className="h-3 w-16 bg-muted/15 rounded" />
              <div className="h-3 w-12 bg-primary/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
