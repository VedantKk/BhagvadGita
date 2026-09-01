"use client"

import * as React from "react"
import { Verse } from "@/lib/api/types"
import { useSettingsStore } from "@/store/useSettingsStore"
import { useTranslation } from "@/lib/i18n"
import { Bookmark, Share2, Copy, Check } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
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
  
  const langMap: Record<string, string> = {
    en: "english",
    hi: "hindi",
    mr: "marathi",
    te: "telugu"
  }
  
  const exactTranslation = verse.translations.find(
    (tr) => tr.language.toLowerCase() === langMap[language]
  )
  
  const currentTranslation = exactTranslation || verse.translations[0]
  const isFallback = !exactTranslation && verse.translations.length > 0

  const verseTextClass = textSize === "large" 
    ? "text-xl sm:text-2xl md:text-3xl leading-relaxed sm:leading-loose" 
    : "text-lg sm:text-xl md:text-2xl leading-relaxed sm:leading-loose"

  const translationTextClass = textSize === "large" 
    ? "text-base sm:text-lg md:text-xl leading-relaxed" 
    : "text-sm sm:text-base md:text-lg leading-relaxed"

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
      {/* Verse Header Badge & Quick Action Buttons */}
      <div className="flex w-full justify-between items-center py-2 sm:py-3 border-b border-border/20">
        <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-primary/90">
          <span>Chapter {verse.chapter_number}</span>
          <span>•</span>
          <span>Verse {verse.verse_number}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-9 w-9 rounded-full ${saved ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => toggleSaveVerse(verse.slug)}
            title={t.save}
            aria-label={t.save}
          >
            <Bookmark className="h-4 w-4" fill={saved ? "currentColor" : "none"} />
            <span className="sr-only">{t.save}</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
            onClick={handleCopy}
            title={t.copy}
            aria-label={t.copy}
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            <span className="sr-only">{t.copy}</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground"
            onClick={handleShare}
            title={t.share}
            aria-label={t.share}
          >
            <Share2 className="h-4 w-4" />
            <span className="sr-only">{t.share}</span>
          </Button>
        </div>
      </div>
      
      {/* Verse Content */}
      <div className="w-full py-8 sm:py-12 md:py-16 space-y-8 sm:space-y-12">
        {/* Sanskrit Original & Transliteration */}
        <div className="text-center space-y-6 px-1 sm:px-4">
          <p className="text-xs sm:text-sm font-medium text-primary/70 tracking-widest uppercase">
            Take a moment to pause.
          </p>
          <p className={`font-tiro font-semibold text-foreground whitespace-pre-wrap break-words drop-shadow-sm px-2 ${verseTextClass}`}>
            {verse.text}
          </p>
          {verse.transliteration && (
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground/80 italic font-medium max-w-2xl mx-auto whitespace-pre-wrap break-words leading-relaxed tracking-wide px-2">
              {verse.transliteration}
            </p>
          )}
        </div>
        
        <div className="flex justify-center">
          <Separator className="w-12 bg-primary/30" />
        </div>
        
        {/* Translation */}
        <div className="text-center max-w-2xl mx-auto px-2 sm:px-4 space-y-4">
          <p className={`text-foreground/85 font-light leading-relaxed break-words ${translationTextClass}`}>
            {currentTranslation?.description}
          </p>
          {isFallback && (
            <p className="text-xs text-muted-foreground/60 italic pt-2">
              * Translation in {langMap[language]} is currently unavailable. Showing {currentTranslation?.language || 'fallback'}.
            </p>
          )}
        </div>

        {/* Read More Link */}
        {!hideReadMore && (
          <div className="pt-4 sm:pt-8 flex justify-center">
            <Link 
              href={`/verse/${verse.chapter_number}/${verse.verse_number}`} 
              className={buttonVariants({ 
                variant: "outline", 
                className: "text-primary border-primary/30 hover:bg-primary/10 rounded-full px-6 h-11 text-sm font-medium transition-all" 
              })}
            >
              {t.readMore}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
