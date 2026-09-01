"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { getMillisecondsUntilMidnight, getDayNumber } from "@/lib/data/daily"

/**
 * Client component that monitors date transitions.
 * When local midnight (12:00 AM) is reached, or when user returns to the tab
 * on a new day, it triggers router.refresh() to automatically load today's new verse.
 */
export function DailyVerseAutoRefresh() {
  const router = useRouter()
  const initialDayRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    initialDayRef.current = getDayNumber(new Date())

    let timerId: NodeJS.Timeout

    const scheduleMidnightRefresh = () => {
      const msUntilMidnight = getMillisecondsUntilMidnight(new Date())
      // Add a small buffer (500ms) after midnight to guarantee date has ticked over
      timerId = setTimeout(() => {
        const currentDay = getDayNumber(new Date())
        if (currentDay !== initialDayRef.current) {
          initialDayRef.current = currentDay
          router.refresh()
        }
        scheduleMidnightRefresh()
      }, msUntilMidnight + 500)
    }

    scheduleMidnightRefresh()

    // Also check when tab becomes visible or user focuses window
    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === "visible") {
        const currentDay = getDayNumber(new Date())
        if (initialDayRef.current !== null && currentDay !== initialDayRef.current) {
          initialDayRef.current = currentDay
          router.refresh()
        }
      }
    }

    window.addEventListener("focus", handleVisibilityOrFocus)
    document.addEventListener("visibilitychange", handleVisibilityOrFocus)

    return () => {
      clearTimeout(timerId)
      window.removeEventListener("focus", handleVisibilityOrFocus)
      document.removeEventListener("visibilitychange", handleVisibilityOrFocus)
    }
  }, [router])

  return null
}
