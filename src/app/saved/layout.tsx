import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Saved Verses & Reflections | Bhagavad Gita",
  description: "Access your personal collection of bookmarked verses and reflections from the Bhagavad Gita.",
  alternates: {
    canonical: "/saved",
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function SavedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
