"use client"

import * as React from "react"
import { useSettingsStore, AppLanguage } from "@/store/useSettingsStore"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { buttonVariants } from "@/components/ui/button"
import { Globe, Check } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

const languages: { code: AppLanguage; name: string; short: string }[] = [
  { code: "en", name: "English", short: "EN" },
  { code: "hi", name: "हिंदी", short: "हि" },
]

export function LanguageSelector() {
  const { language, setLanguage } = useSettingsStore()
  const t = useTranslation(language)
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={buttonVariants({ variant: "ghost", size: "sm", className: "h-9 px-2 sm:px-3 justify-center sm:justify-start opacity-50" })}>
        <Globe className="h-4 w-4 text-primary" />
        <span className="hidden sm:inline ml-1.5 text-xs font-medium">Language</span>
      </div>
    )
  }

  const currentLang = languages.find((l) => l.code === language)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
          className: "h-9 px-2.5 sm:px-3 flex items-center justify-center sm:justify-start gap-1.5 focus-visible:ring-1 focus-visible:ring-primary/40",
        })}
        aria-label="Select Language"
      >
        <Globe className="h-4 w-4 text-primary shrink-0" />
        <span className="hidden sm:inline text-xs font-medium truncate">{currentLang?.name}</span>
        <span className="sm:hidden text-xs font-semibold uppercase">{currentLang?.short}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[140px] z-50">
        <div className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t.language}
        </div>
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer flex items-center justify-between py-2 text-sm ${
              language === lang.code ? "bg-primary/10 text-primary font-semibold" : ""
            }`}
          >
            <span>{lang.name}</span>
            {language === lang.code && <Check className="h-3.5 w-3.5" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
