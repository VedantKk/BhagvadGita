export interface QuoteEntry {
  chapterId: number
  verseId: number
  categories: string[]
  isFeatured?: boolean
}

export const quoteCategories = [
  "Life", "Karma", "Dharma", "Peace", "Wisdom", 
  "Mind", "Action", "Duty", "Courage", "Fear", 
  "Success", "Failure", "Detachment", "Self-Knowledge", 
  "Spirituality", "Liberation"
]

export const quotesList: QuoteEntry[] = [
  { chapterId: 2, verseId: 47, categories: ["Karma", "Action", "Duty", "Detachment"], isFeatured: true },
  { chapterId: 2, verseId: 14, categories: ["Life", "Peace", "Detachment", "Wisdom"], isFeatured: true },
  { chapterId: 6, verseId: 5, categories: ["Mind", "Self-Knowledge"], isFeatured: true },
  { chapterId: 6, verseId: 6, categories: ["Mind", "Self-Knowledge", "Fear"] },
  { chapterId: 2, verseId: 22, categories: ["Life", "Spirituality", "Self-Knowledge"] },
  { chapterId: 2, verseId: 27, categories: ["Life", "Fear"] },
  { chapterId: 2, verseId: 71, categories: ["Peace", "Detachment", "Liberation"] },
  { chapterId: 3, verseId: 8, categories: ["Action", "Duty", "Karma"] },
  { chapterId: 3, verseId: 19, categories: ["Action", "Karma", "Liberation"], isFeatured: true },
  { chapterId: 3, verseId: 35, categories: ["Dharma", "Duty"] },
  { chapterId: 4, verseId: 7, categories: ["Dharma", "Spirituality", "Wisdom"] },
  { chapterId: 4, verseId: 8, categories: ["Dharma", "Peace"] },
  { chapterId: 4, verseId: 38, categories: ["Wisdom", "Self-Knowledge", "Liberation"], isFeatured: true },
  { chapterId: 6, verseId: 34, categories: ["Mind", "Fear"] },
  { chapterId: 6, verseId: 35, categories: ["Mind", "Peace"] },
  { chapterId: 18, verseId: 47, categories: ["Dharma", "Duty"] },
  { chapterId: 18, verseId: 66, categories: ["Liberation", "Spirituality", "Peace"], isFeatured: true },
  { chapterId: 2, verseId: 38, categories: ["Success", "Failure", "Courage"] },
  { chapterId: 2, verseId: 48, categories: ["Success", "Failure", "Detachment", "Action"] },
  { chapterId: 12, verseId: 15, categories: ["Peace", "Fear"] }
]
