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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={buttonVariants({
          variant: "ghost",
          size: "icon",
          className: "h-9 w-9 focus-visible:ring-1 focus-visible:ring-primary/40",
        })}
        aria-label="Toggle Theme"
      >
        <Palette className="h-4 w-4 text-primary" />
        <span className="sr-only">Toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px] max-h-[80vh] overflow-y-auto z-50">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal text-xs text-muted-foreground uppercase tracking-wider">
            Color Atmosphere
          </DropdownMenuLabel>
          {themes.map((t) => (
            <DropdownMenuItem
              key={t.code}
              onClick={() => setTheme(t.code)}
              className={`cursor-pointer flex items-center justify-between py-2 text-sm ${
                theme === t.code ? "bg-primary/10 text-primary font-medium" : ""
              }`}
            >
              <div className="flex items-center">
                <span
                  className="w-3.5 h-3.5 rounded-full mr-2.5 border border-border/50 shadow-sm shrink-0"
                  style={{ backgroundColor: t.color }}
                ></span>
                <span>{t.name}</span>
              </div>
              {theme === t.code && <Check className="h-3.5 w-3.5 shrink-0" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal text-xs text-muted-foreground uppercase tracking-wider">
            Display Mode
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setNextTheme("light")} className="cursor-pointer py-2">
            <Sun className="mr-2 h-4 w-4 text-amber-500" />
            <span>Light</span>
            {nextTheme === "light" && <Check className="ml-auto h-3.5 w-3.5" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setNextTheme("dark")} className="cursor-pointer py-2">
            <Moon className="mr-2 h-4 w-4 text-blue-400" />
            <span>Dark</span>
            {nextTheme === "dark" && <Check className="ml-auto h-3.5 w-3.5" />}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setNextTheme("system")} className="cursor-pointer py-2">
            <Monitor className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>System</span>
            {nextTheme === "system" && <Check className="ml-auto h-3.5 w-3.5" />}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
