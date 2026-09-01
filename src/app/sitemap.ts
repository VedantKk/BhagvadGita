import { MetadataRoute } from "next"
import { mockChapters, mockVerses } from "@/lib/api/mockData"
import { quotesList } from "@/lib/data/quotes"
import { SITE_URL } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  // Core Static & Feature Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/chapters`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/quotes`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/daily`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  // All 18 Chapters
  const chapterPages: MetadataRoute.Sitemap = mockChapters.map((chapter) => ({
    url: `${SITE_URL}/chapters/${chapter.chapter_number}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.85,
  }))

  // All 700 Verse Pages
  const versePages: MetadataRoute.Sitemap = mockVerses.map((verse) => ({
    url: `${SITE_URL}/verse/${verse.chapter_number}/${verse.verse_number}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  // Curated Krishna Wisdom Quotes Pages
  const quotePages: MetadataRoute.Sitemap = quotesList.map((quote) => ({
    url: `${SITE_URL}/quotes/${quote.chapterId}/${quote.verseId}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.75,
  }))

  return [...staticPages, ...chapterPages, ...versePages, ...quotePages]
}
