"use client"

import * as React from "react"
import { useSettingsStore } from "@/store/useSettingsStore"
import { Button } from "@/components/ui/button"

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
    <div className="w-full mt-24 mb-12">
      <div className="text-center space-y-3 mb-10">
        <h4 className="text-xl md:text-2xl font-tiro text-foreground tracking-wide">
          Spiritual Experience
        </h4>
        <p className="text-sm text-muted-foreground italic font-light max-w-md mx-auto">
          What does this wisdom make you reflect upon? What can you carry with you today?
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-card/30 border border-border/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-sm transition-all focus-within:shadow-md focus-within:border-primary/30">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your private reflection here..."
          className="w-full min-h-[150px] bg-transparent resize-y outline-none text-foreground/90 placeholder:text-muted-foreground/50 leading-relaxed font-light"
        />
        <div className="flex justify-end mt-4 pt-4 border-t border-border/30">
          <Button 
            onClick={handleSave} 
            variant="ghost" 
            className="text-primary hover:bg-primary/10 rounded-full px-6 transition-all"
          >
            {isSaved ? "Saved" : "Save Reflection"}
          </Button>
        </div>
      </div>
    </div>
  )
}
