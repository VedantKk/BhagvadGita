"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Bookmark, Menu } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { LanguageSelector } from "./LanguageSelector"
import { ThemeSelector } from "./ThemeSelector"
import { useSettingsStore } from "@/store/useSettingsStore"
import { useTranslation } from "@/lib/i18n"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const pathname = usePathname()
  const { language } = useSettingsStore()
  const t = useTranslation(language)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const navLinks = [
    { href: "/", label: mounted ? t.home : "Home" },
    { href: "/chapters", label: mounted ? t.chapters : "Chapters" },
    { href: "/quotes", label: mounted ? t.quotes : "Quotes" },
    { href: "/daily", label: mounted ? t.todaysVerse : "Today's Verse" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-8">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary font-tiro leading-none mb-1">Shree</span>
            <span className="font-semibold text-lg tracking-tight">Bhagavad Gita</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium ml-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-primary ${pathname === link.href ? "text-primary" : "text-foreground/80"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="hidden sm:flex items-center space-x-2 mr-2">
            <Link href="/search" className={buttonVariants({ variant: "ghost", size: "icon" })} title={mounted ? t.search : "Search"}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
            <Link href="/saved" className={buttonVariants({ variant: "ghost", size: "icon" })} title={mounted ? t.saved : "Saved"}>
              <Bookmark className="h-5 w-5" />
              <span className="sr-only">Saved</span>
            </Link>
          </div>

          <LanguageSelector />
          <ThemeSelector />

          {/* Mobile Navigation */}
          <div className="md:hidden ml-2">
            <DropdownMenu>
              <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", size: "icon" })}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {navLinks.map((link) => (
                  <DropdownMenuItem key={link.href}>
                    <Link href={link.href} className="flex w-full">{link.label}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem>
                  <Link href="/search" className="flex w-full items-center">
                    <Search className="mr-2 h-4 w-4" />
                    <span>{mounted ? t.search : "Search"}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/saved" className="flex w-full items-center">
                    <Bookmark className="mr-2 h-4 w-4" />
                    <span>{mounted ? t.saved : "Saved"}</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
