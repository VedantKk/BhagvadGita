import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Search Bhagavad Gita Verses, Shlokas & Teachings Online",
  description: "Search across all 700 verses of the Bhagavad Gita by chapter, verse number, Sanskrit shloka, Hindi translation, or English topic keywords.",
  keywords: [
    "Search Bhagavad Gita",
    "Gita verse search",
    "Find Gita shlokas",
    "Bhagavad Gita search online",
    "Search Krishna teachings",
  ],
  alternates: {
    canonical: "/search",
  },
  openGraph: {
    title: "Search Bhagavad Gita Verses & Teachings Online",
    description: "Search all 700 verses of the Bhagavad Gita by keyword, shloka number, or translation.",
    url: "/search",
  },
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
