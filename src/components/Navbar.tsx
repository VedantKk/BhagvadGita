"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Bookmark, Menu, X, BookOpen, Quote, Sparkles, Home } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { LanguageSelector } from "./LanguageSelector"
import { ThemeSelector } from "./ThemeSelector"
import { useSettingsStore } from "@/store/useSettingsStore"
import { useTranslation } from "@/lib/i18n"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const pathname = usePathname()
  const { language } = useSettingsStore()
  const t = useTranslation(language)
  const [mounted, setMounted] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Close mobile dropdown when route changes
  React.useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { href: "/", label: mounted ? t.home : "Home", icon: Home },
    { href: "/chapters", label: mounted ? t.chapters : "Chapters", icon: BookOpen },
    { href: "/quotes", label: mounted ? t.quotes : "Quotes", icon: Quote },
    { href: "/daily", label: mounted ? t.todaysVerse : "Today's Verse", icon: Sparkles },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 transition-colors">
      <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-3 sm:px-6 md:px-8 max-w-7xl">
        {/* Brand */}
        <div className="flex items-center space-x-2 shrink-0">
          <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2 group">
            <span className="text-xl sm:text-2xl font-bold text-primary font-tiro leading-none transform group-hover:scale-110 transition-transform">
              ॐ
            </span>
            <span className="font-semibold text-base sm:text-lg tracking-tight text-foreground whitespace-nowrap">
              Bhagavad Gita
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium ml-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 hover:text-primary relative ${
                  isActive ? "text-primary font-semibold" : "text-foreground/75"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right Actions & Utilities */}
        <div className="flex items-center space-x-1 sm:space-x-1.5">
          {/* Quick Search & Saved (Tablet & Desktop) */}
          <div className="hidden sm:flex items-center space-x-1 mr-1">
            <Link
              href="/search"
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
                className: `h-9 w-9 rounded-full ${pathname === "/search" ? "text-primary bg-primary/10" : "text-foreground/70"}`,
              })}
              title={mounted ? t.search : "Search"}
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </Link>
            <Link
              href="/saved"
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
                className: `h-9 w-9 rounded-full ${pathname === "/saved" ? "text-primary bg-primary/10" : "text-foreground/70"}`,
              })}
              title={mounted ? t.saved : "Saved"}
              aria-label="Saved Verses"
            >
              <Bookmark className="h-4 w-4" />
            </Link>
          </div>

          {/* Language Selector */}
          <LanguageSelector />

          {/* Theme Selector */}
          <ThemeSelector />

          {/* Mobile Menu Dropdown */}
          <div className="md:hidden">
            <DropdownMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <DropdownMenuTrigger
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                  className: "h-9 w-9 rounded-full focus-visible:ring-1 focus-visible:ring-primary/40",
                })}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                <span className="sr-only">Toggle navigation</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 p-1.5 shadow-lg border-border/50 backdrop-blur-lg bg-background/95 z-50 mt-1"
              >
                {navLinks.map((link) => {
                  const Icon = link.icon
                  const isActive = pathname === link.href
                  return (
                    <DropdownMenuItem key={link.href} className="p-0 cursor-pointer">
                      <Link
                        href={link.href}
                        className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-sm transition-colors ${
                          isActive
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-foreground/80 hover:text-foreground"
                        }`}
                      >
                        <Icon className={`h-4 w-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                        <span>{link.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
                
                <DropdownMenuSeparator className="my-1" />

                <DropdownMenuItem className="p-0 cursor-pointer">
                  <Link
                    href="/search"
                    className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-sm transition-colors ${
                      pathname === "/search"
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    <Search className={`h-4 w-4 ${pathname === "/search" ? "text-primary" : "text-muted-foreground"}`} />
                    <span>{mounted ? t.search : "Search"}</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem className="p-0 cursor-pointer">
                  <Link
                    href="/saved"
                    className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-sm transition-colors ${
                      pathname === "/saved"
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground/80 hover:text-foreground"
                    }`}
                  >
                    <Bookmark className={`h-4 w-4 ${pathname === "/saved" ? "text-primary" : "text-muted-foreground"}`} />
                    <span>{mounted ? t.saved : "Saved Verses"}</span>
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
