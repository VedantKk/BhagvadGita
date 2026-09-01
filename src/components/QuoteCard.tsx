"use client"

import * as React from "react"
import { Verse } from "@/lib/api/types"
import { useSettingsStore } from "@/store/useSettingsStore"
import { useTranslation } from "@/lib/i18n"
import { Bookmark, Share2, Check, ArrowRight } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"

interface QuoteCardProps {
  verse: Verse
  hideActions?: boolean
}

export function QuoteCard({ verse, hideActions = false }: QuoteCardProps) {
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

  const translationTextClass = textSize === "large" 
    ? "text-lg sm:text-2xl leading-relaxed" 
    : "text-base sm:text-xl md:text-2xl leading-relaxed"

  const handleShare = async () => {
    const shareData = {
      title: `Bhagavad Gita ${verse.chapter_number}.${verse.verse_number}`,
      text: `"${currentTranslation?.description || ""}"\n\n— Lord Krishna\nBhagavad Gita ${verse.chapter_number}.${verse.verse_number}`,
      url: window.location.origin + `/quotes/${verse.chapter_number}/${verse.verse_number}`,
    }
    
    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.error("Error sharing", err)
      }
    } else {
      navigator.clipboard.writeText(shareData.text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="w-full flex flex-col items-center bg-card/50 border border-border/40 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300 backdrop-blur-sm relative overflow-hidden group">
      {/* Decorative gradient blob */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-primary/10 transition-colors duration-700"></div>
      
      {/* ॐ Accent */}
      <div className="text-2xl sm:text-3xl font-tiro text-primary/40 mb-4 sm:mb-6 opacity-70">ॐ</div>
      
      {/* Quote Text */}
      <div className="text-center max-w-3xl mx-auto space-y-6 relative z-10 w-full">
        <p className={`text-foreground/90 font-tiro font-medium tracking-wide break-words ${translationTextClass}`}>
          "{currentTranslation?.description}"
        </p>
        
        {isFallback && (
          <p className="text-xs text-muted-foreground/60 italic pt-1 font-sans">
            * Translation in {langMap[language]} is currently unavailable.
          </p>
        )}

        <div className="space-y-1 font-sans pt-2">
          <p className="text-sm sm:text-base font-semibold text-primary/85 uppercase tracking-widest">
            — Lord Krishna
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground/75 font-medium tracking-wider">
            Bhagavad Gita • Chapter {verse.chapter_number}, Verse {verse.verse_number}
          </p>
        </div>
      </div>

      {/* Actions */}
      {!hideActions && (
        <div className="w-full flex flex-wrap items-center justify-between gap-3 mt-8 pt-5 border-t border-border/25 z-10">
          <Link 
            href={`/quotes/${verse.chapter_number}/${verse.verse_number}`} 
            className={buttonVariants({ 
              variant: "ghost", 
              size: "sm",
              className: "text-primary hover:bg-primary/10 rounded-full transition-all group/btn text-xs sm:text-sm h-9 px-3" 
            })}
          >
            <span>Read Full Verse</span>
            <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
          </Link>

          <div className="flex items-center space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-9 w-9 rounded-full transition-colors ${saved ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-primary/5 hover:text-primary"}`}
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
              className="h-9 w-9 rounded-full text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors"
              onClick={handleShare}
              title={copied ? "Copied!" : t.share}
              aria-label={t.share}
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Share2 className="h-4 w-4" />}
              <span className="sr-only">{t.share}</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
