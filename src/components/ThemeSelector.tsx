"use client"

import * as React from "react"
import { Palette, Check, Sun, Moon, Monitor } from "lucide-react"
import { useSettingsStore, AppTheme } from "@/store/useSettingsStore"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { buttonVariants } from "@/components/ui/button"

const themes: { code: AppTheme; name: string; color: string }[] = [
  { code: "classic", name: "Classic", color: "#f8fafc" },
  { code: "almond", name: "Almond", color: "#faecd6" },
  { code: "saffron", name: "Saffron", color: "#ffd8b5" },
  { code: "sandalwood", name: "Sandalwood", color: "#e8c9b3" },
  { code: "forest", name: "Forest", color: "#dbe8d3" },
  { code: "midnight", name: "Midnight", color: "#d8dce8" },
  { code: "lotus", name: "Lotus", color: "#f2d8e8" },
]

export function ThemeSelector() {
  const { theme, setTheme } = useSettingsStore()
  const { theme: nextTheme, setTheme: setNextTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={buttonVariants({ variant: "ghost", size: "icon", className: "h-9 w-9 opacity-50" })}>
        <Palette className="h-4 w-4" />
        <span className="sr-only">Theme</span>
      </div>
    )
  }

  const currentTheme = themes.find((t) => t.code === theme)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "h-9 w-9" })}>
        <Palette className="h-4 w-4 text-primary" />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[180px]">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal text-xs text-muted-foreground uppercase tracking-wider">
            Color Theme
          </DropdownMenuLabel>
          {themes.map((t) => (
            <DropdownMenuItem
              key={t.code}
              onClick={() => setTheme(t.code)}
              className={`cursor-pointer flex items-center justify-between ${
                theme === t.code ? "bg-primary/10 text-primary font-medium" : ""
              }`}
            >
              <div className="flex items-center">
                <span
                  className="w-3 h-3 rounded-full mr-2 border border-border/50 shadow-sm"
                  style={{ backgroundColor: t.color }}
                ></span>
                {t.name}
              </div>
              {theme === t.code && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal text-xs text-muted-foreground uppercase tracking-wider">
            Mode
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setNextTheme("light")} className="cursor-pointer">
            <Sun className="mr-2 h-4 w-4" />
            <span>Light</span>
            {nextTheme === "light" && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setNextTheme("dark")} className="cursor-pointer">
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
            {nextTheme === "dark" && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setNextTheme("system")} className="cursor-pointer">
            <Monitor className="mr-2 h-4 w-4" />
            <span>System</span>
            {nextTheme === "system" && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
