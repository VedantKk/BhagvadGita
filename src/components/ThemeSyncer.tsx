"use client"

import * as React from "react"
import { useSettingsStore } from "@/store/useSettingsStore"

export function ThemeSyncer() {
  const theme = useSettingsStore((state) => state.theme)

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  return null
}
