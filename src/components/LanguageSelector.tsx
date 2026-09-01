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
import { Globe } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

const languages: { code: AppLanguage; name: string }[] = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
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
      <div className={buttonVariants({ variant: "ghost", size: "sm", className: "w-[100px] justify-start opacity-50" })}>
        <Globe className="mr-2 h-4 w-4" />
        <span className="truncate">Language</span>
      </div>
    )
  }

  const currentLang = languages.find((l) => l.code === language)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", size: "sm", className: "w-[120px] justify-start" })}>
        <Globe className="mr-2 h-4 w-4 text-primary" />
        <span className="truncate font-medium">{currentLang?.name}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
          {t.language}
        </div>
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer ${language === lang.code ? "bg-primary/10 text-primary font-medium" : ""
              }`}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
