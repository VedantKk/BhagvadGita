"use client"

import * as React from "react"
import { Verse } from "@/lib/api/types"
import { quoteCategories } from "@/lib/data/quotes"
import { QuoteCard } from "@/components/QuoteCard"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"

interface QuoteData {
  verse: Verse
  categories: string[]
}

interface QuotesClientProps {
  initialQuotes: QuoteData[]
}

export function QuotesClient({ initialQuotes }: QuotesClientProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All Quotes")

  const filteredQuotes = initialQuotes.filter(q => {
    const matchesCategory = selectedCategory === "All Quotes" || q.categories.includes(selectedCategory)
    
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch = 
      !searchQuery ||
      q.verse.translations.some(tr => tr.description.toLowerCase().includes(searchLower)) ||
      q.verse.text.toLowerCase().includes(searchLower) ||
      q.categories.some(c => c.toLowerCase().includes(searchLower))

    return matchesCategory && matchesSearch
  })

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 mt-8 sm:mt-12 space-y-8 sm:space-y-12">
      {/* Search and Filters */}
      <div className="space-y-6 sm:space-y-8">
        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-4 sm:h-5 w-4 sm:w-5 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Search teachings (karma, peace, mind, duty)..."
            className="pl-11 pr-10 h-12 sm:h-14 rounded-full text-sm sm:text-base bg-card/60 border-border/50 focus:border-primary/50 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-3.5 flex items-center text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Scrollable / Wrapped Category Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 px-1 sm:flex-wrap sm:justify-center max-w-4xl mx-auto touch-pan-x">
          <button
            onClick={() => setSelectedCategory("All Quotes")}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
              selectedCategory === "All Quotes" 
                ? "bg-primary text-primary-foreground shadow-sm scale-105" 
                : "bg-card/60 text-muted-foreground hover:bg-card border border-border/40 hover:text-foreground"
            }`}
          >
            All Quotes
          </button>
          {quoteCategories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                selectedCategory === category 
                  ? "bg-primary text-primary-foreground shadow-sm scale-105" 
                  : "bg-card/60 text-muted-foreground hover:bg-card border border-border/40 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      {filteredQuotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredQuotes.map(({ verse }) => (
            <QuoteCard key={verse.slug} verse={verse} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 sm:py-20 text-muted-foreground bg-card/10 rounded-2xl sm:rounded-3xl border border-border/20 p-6">
          <p className="text-lg sm:text-xl font-medium">No quotes found matching your filters.</p>
          <p className="text-xs sm:text-sm mt-1 text-muted-foreground/70">Try searching for a different keyword or category.</p>
          <button 
            onClick={() => { setSearchQuery(""); setSelectedCategory("All Quotes") }}
            className="text-primary mt-4 text-sm font-medium hover:underline inline-block"
          >
            Reset all filters
          </button>
        </div>
      )}
    </div>
  )
}
