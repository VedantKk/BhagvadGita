"use client"

import * as React from "react"
import { Verse } from "@/lib/api/types"
import { quoteCategories } from "@/lib/data/quotes"
import { QuoteCard } from "@/components/QuoteCard"
import { Search } from "lucide-react"
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
      q.verse.translations.some(tr => tr.description.toLowerCase().includes(searchLower)) ||
      q.categories.some(c => c.toLowerCase().includes(searchLower))

    return matchesCategory && matchesSearch
  })

  return (
    <div className="max-w-7xl mx-auto px-4 mt-12 space-y-12">
      {/* Search and Filters */}
      <div className="space-y-8">
        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Search Krishna's teachings (e.g. karma, peace, mind)..."
            className="pl-12 h-14 rounded-full text-base bg-card/50 border-border/50 focus:border-primary/50 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedCategory("All Quotes")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === "All Quotes" 
                ? "bg-primary text-primary-foreground shadow-sm" 
                : "bg-card/50 text-muted-foreground hover:bg-card border border-border/40"
            }`}
          >
            All Quotes
          </button>
          {quoteCategories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "bg-card/50 text-muted-foreground hover:bg-card border border-border/40"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {filteredQuotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredQuotes.map(({ verse }) => (
            <QuoteCard key={verse.slug} verse={verse} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-xl">No quotes found for your search criteria.</p>
          <button 
            onClick={() => { setSearchQuery(""); setSelectedCategory("All Quotes") }}
            className="text-primary mt-4 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
