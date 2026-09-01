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

  const translationTextClass = textSize === "large" ? "text-2xl leading-relaxed" : "text-xl md:text-2xl leading-relaxed"

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
    <div className="w-full flex flex-col items-center bg-card/40 border border-border/30 rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-md transition-all duration-500 backdrop-blur-sm relative overflow-hidden group">
      {/* Decorative gradient blob */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-primary/10 transition-colors duration-700"></div>
      
      {/* ॐ Accent */}
      <div className="text-3xl font-tiro text-primary/40 mb-8 opacity-70">ॐ</div>
      
      {/* Quote Text */}
      <div className="text-center max-w-3xl mx-auto space-y-8 relative z-10">
        <p className={`text-foreground/90 font-tiro font-medium tracking-wide ${translationTextClass}`}>
          "{currentTranslation?.description}"
        </p>
        
        {isFallback && (
          <p className="text-xs text-muted-foreground/60 italic pt-2 font-sans">
            * Translation in {langMap[language]} is currently unavailable.
          </p>
        )}

        <div className="space-y-1 font-sans">
          <p className="text-base font-semibold text-primary/80 uppercase tracking-widest">
            — Lord Krishna
          </p>
          <p className="text-sm text-muted-foreground/70 font-medium tracking-wider">
            Bhagavad Gita • Chapter {verse.chapter_number}, Verse {verse.verse_number}
          </p>
        </div>
      </div>

      {/* Actions */}
      {!hideActions && (
        <div className="w-full flex justify-between items-center mt-12 pt-6 border-t border-border/20 z-10">
          <Link 
            href={`/quotes/${verse.chapter_number}/${verse.verse_number}`} 
            className={buttonVariants({ variant: "ghost", className: "text-primary hover:bg-primary/10 rounded-full transition-all group/btn" })}
          >
            Read Full Verse
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>

          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`rounded-full transition-colors ${saved ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-primary/5 hover:text-primary"}`}
              onClick={() => toggleSaveVerse(verse.slug)}
              title={t.save}
            >
              <Bookmark className="h-5 w-5" fill={saved ? "currentColor" : "none"} />
              <span className="sr-only">{t.save}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors"
              onClick={handleShare}
              title={copied ? "Copied!" : t.share}
            >
              {copied ? <Check className="h-5 w-5 text-green-500" /> : <Share2 className="h-5 w-5" />}
              <span className="sr-only">{t.share}</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
