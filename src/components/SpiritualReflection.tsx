"use client"

import * as React from "react"
import { useSettingsStore } from "@/store/useSettingsStore"
import { Button } from "@/components/ui/button"
import { Check, Sparkles } from "lucide-react"

interface SpiritualReflectionProps {
  verseId: string
}

export function SpiritualReflection({ verseId }: SpiritualReflectionProps) {
  const { reflections, setReflection } = useSettingsStore()
  const [text, setText] = React.useState("")
  const [isSaved, setIsSaved] = React.useState(false)

  React.useEffect(() => {
    setText(reflections[verseId] || "")
  }, [verseId, reflections])

  const handleSave = () => {
    setReflection(verseId, text)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  return (
    <div className="w-full mt-12 sm:mt-20 mb-8 sm:mb-12">
      <div className="text-center space-y-2 sm:space-y-3 mb-6 sm:mb-10 px-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Personal Reflection</span>
        </div>
        <h4 className="text-xl sm:text-2xl font-tiro text-foreground tracking-wide">
          Spiritual Journal
        </h4>
        <p className="text-xs sm:text-sm text-muted-foreground italic font-light max-w-md mx-auto">
          What does this wisdom make you reflect upon? What can you carry with you today?
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-card/40 border border-border/40 rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-sm shadow-sm transition-all focus-within:shadow-md focus-within:border-primary/40">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your private reflection here (saved securely on your device)..."
          className="w-full min-h-[130px] sm:min-h-[160px] bg-transparent resize-y outline-none text-foreground/90 placeholder:text-muted-foreground/50 text-sm sm:text-base leading-relaxed font-light"
        />
        <div className="flex justify-end mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border/30">
          <Button 
            onClick={handleSave} 
            variant={isSaved ? "outline" : "default"}
            size="sm"
            className="rounded-full px-5 sm:px-6 h-10 text-xs sm:text-sm font-medium transition-all"
          >
            {isSaved ? (
              <>
                <Check className="mr-1.5 h-4 w-4 text-green-500" />
                <span>Saved</span>
              </>
            ) : (
              "Save Reflection"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
