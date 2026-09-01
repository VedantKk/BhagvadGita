"use client"

import * as React from "react"
import { Verse } from "@/lib/api/types"
import { useSettingsStore } from "@/store/useSettingsStore"
import { useTranslation } from "@/lib/i18n"
import { Bookmark, Share2, Copy, Check } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

interface VerseCardProps {
  verse: Verse
  hideReadMore?: boolean
}

export function VerseCard({ verse, hideReadMore = false }: VerseCardProps) {
  const { language, textSize, toggleSaveVerse, isVerseSaved } = useSettingsStore()
  const t = useTranslation(language)
  const [mounted, setMounted] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const saved = isVerseSaved(verse.slug)
  
  // Mapping our app language codes to the API's language names (this might need adjustment based on real API)
  const langMap: Record<string, string> = {
    en: "english",
    hi: "hindi",
    mr: "marathi",
    te: "telugu"
  }
  
  const exactTranslation = verse.translations.find(
    (tr) => tr.language.toLowerCase() === langMap[language]
  )
  
  const currentTranslation = exactTranslation || verse.translations[0] // fallback to first translation
  const isFallback = !exactTranslation && verse.translations.length > 0

  const verseTextClass = textSize === "large" ? "text-2xl leading-loose" : "text-xl leading-relaxed"
  const translationTextClass = textSize === "large" ? "text-lg leading-relaxed" : "text-base leading-relaxed"

  const handleCopy = () => {
    const textToCopy = `${verse.text}\n\n${currentTranslation?.description || ""}\n\n— Bhagavad Gita ${verse.chapter_number}.${verse.verse_number}`
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    const shareData = {
      title: `Bhagavad Gita ${verse.chapter_number}.${verse.verse_number}`,
      text: `${verse.text}\n\n${currentTranslation?.description || ""}`,
      url: window.location.origin + `/verse/${verse.chapter_number}/${verse.verse_number}`,
    }
    
    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.error("Error sharing", err)
      }
    } else {
      handleCopy()
    }
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex w-full justify-between items-center px-4 md:px-0 py-4 opacity-70 hover:opacity-100 transition-opacity">
        <h3 className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
          Chapter {verse.chapter_number} • Verse {verse.verse_number}
        </h3>
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-8 w-8 rounded-full ${saved ? "text-primary bg-primary/5" : "text-muted-foreground"}`}
            onClick={() => toggleSaveVerse(verse.slug)}
            title={t.save}
          >
            <Bookmark className="h-4 w-4" fill={saved ? "currentColor" : "none"} />
            <span className="sr-only">{t.save}</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full text-muted-foreground"
            onClick={handleCopy}
            title={t.copy}
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            <span className="sr-only">{t.copy}</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full text-muted-foreground"
            onClick={handleShare}
            title={t.share}
          >
            <Share2 className="h-4 w-4" />
            <span className="sr-only">{t.share}</span>
          </Button>
        </div>
      </div>
      
      <div className="w-full py-12 md:py-16 space-y-12">
        <div className="text-center space-y-8 px-4">
          <p className="text-sm font-medium text-primary/60 tracking-widest uppercase mb-4">
            Take a moment to pause.
          </p>
          <p className={`font-tiro font-semibold text-foreground whitespace-pre-wrap drop-shadow-sm ${verseTextClass}`}>
            {verse.text}
          </p>
          <p className="text-sm md:text-base text-muted-foreground/80 italic font-medium max-w-2xl mx-auto whitespace-pre-wrap leading-loose tracking-wide">
            {verse.transliteration}
          </p>
        </div>
        
        <div className="flex justify-center">
          <Separator className="w-12 bg-primary/20" />
        </div>
        
        <div className="text-center max-w-2xl mx-auto px-4 space-y-6">
          <p className={`text-foreground/80 font-light ${translationTextClass}`}>
            {currentTranslation?.description}
          </p>
          {isFallback && (
            <p className="text-xs text-muted-foreground/60 italic pt-4">
              * Translation in {langMap[language]} is currently unavailable. Showing {currentTranslation?.language || 'fallback'}.
            </p>
          )}
        </div>

        {!hideReadMore && (
          <div className="pt-8 flex justify-center">
            <Link href={`/verse/${verse.chapter_number}/${verse.verse_number}`} className={buttonVariants({ variant: "ghost", className: "text-primary hover:bg-primary/5 rounded-full px-6 transition-all tracking-wide" })}>
              {t.readMore}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
