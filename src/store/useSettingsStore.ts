import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AppLanguage = 'en' | 'hi' | 'mr' | 'te'
export type AppTheme = 'classic' | 'almond' | 'saffron' | 'sandalwood' | 'forest' | 'midnight' | 'lotus'

interface SettingsState {
  language: AppLanguage
  setLanguage: (lang: AppLanguage) => void
  textSize: 'normal' | 'large'
  setTextSize: (size: 'normal' | 'large') => void
  savedVerses: string[] // Array of strings like "1.1", "2.47"
  toggleSaveVerse: (verseId: string) => void
  isVerseSaved: (verseId: string) => boolean
  theme: AppTheme
  setTheme: (theme: AppTheme) => void
  reflections: Record<string, string> // verseId -> reflection text
  setReflection: (verseId: string, reflection: string) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
      textSize: 'normal',
      setTextSize: (size) => set({ textSize: size }),
      savedVerses: [],
      toggleSaveVerse: (verseId) => {
        const saved = get().savedVerses
        if (saved.includes(verseId)) {
          set({ savedVerses: saved.filter((id) => id !== verseId) })
        } else {
          set({ savedVerses: [...saved, verseId] })
        }
      },
      isVerseSaved: (verseId) => get().savedVerses.includes(verseId),
      theme: 'classic',
      setTheme: (theme) => set({ theme }),
      reflections: {},
      setReflection: (verseId, reflection) => set({
        reflections: { ...get().reflections, [verseId]: reflection }
      })
    }),
    {
      name: 'gita-settings-storage', // name of the item in the storage
    }
  )
)
