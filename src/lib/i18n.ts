import { AppLanguage } from '@/store/useSettingsStore'

type Translations = {
  [key in AppLanguage]: {
    home: string
    chapters: string
    verses: string
    quotes: string
    search: string
    todaysVerse: string
    language: string
    readGita: string
    exploreChapters: string
    readVerse: string
    readMore: string
    prevChapter: string
    nextChapter: string
    save: string
    saved: string
    copy: string
    share: string
    settings: string
    lightMode: string
    darkMode: string
    savedVerses: string
    noSavedVerses: string
    verseOfTheDay: string
    readFullVerse: string
  }
}

export const i18n: Translations = {
  en: {
    home: "Home",
    chapters: "Chapters",
    verses: "Verses",
    quotes: "Quotes",
    search: "Search",
    todaysVerse: "Today's Verse",
    language: "Language",
    readGita: "Read the Gita",
    exploreChapters: "Explore Chapters",
    readVerse: "Read Verse",
    readMore: "Read More",
    prevChapter: "Previous Chapter",
    nextChapter: "Next Chapter",
    save: "Save",
    saved: "Saved",
    copy: "Copy",
    share: "Share",
    settings: "Settings",
    lightMode: "Light Mode",
    darkMode: "Dark Mode",
    savedVerses: "Saved Verses",
    noSavedVerses: "You haven't saved any verses yet.",
    verseOfTheDay: "Verse of the Day",
    readFullVerse: "Read Full Verse"
  },
  hi: {
    home: "होम",
    chapters: "अध्याय",
    verses: "श्लोक",
    quotes: "सुविचार",
    search: "खोजें",
    todaysVerse: "आज का श्लोक",
    language: "भाषा",
    readGita: "गीता पढ़ें",
    exploreChapters: "अध्याय खोजें",
    readVerse: "श्लोक पढ़ें",
    readMore: "और पढ़ें",
    prevChapter: "पिछला अध्याय",
    nextChapter: "अगला अध्याय",
    save: "सहेजें",
    saved: "सहेजे गए",
    copy: "कॉपी करें",
    share: "साझा करें",
    settings: "सेटिंग्स",
    lightMode: "लाइट मोड",
    darkMode: "डार्क मोड",
    savedVerses: "सहेजे गए श्लोक",
    noSavedVerses: "आपने अभी तक कोई श्लोक नहीं सहेजा है।",
    verseOfTheDay: "आज का विचार",
    readFullVerse: "पूरा श्लोक पढ़ें"
  },
  mr: {
    home: "मुख्य पृष्ठ",
    chapters: "अध्याय",
    verses: "श्लोक",
    quotes: "सुविचार",
    search: "शोधा",
    todaysVerse: "आजचा श्लोक",
    language: "भाषा",
    readGita: "गीता वाचा",
    exploreChapters: "अध्याय एक्सप्लोर करा",
    readVerse: "श्लोक वाचा",
    readMore: "अधिक वाचा",
    prevChapter: "मागील अध्याय",
    nextChapter: "पुढील अध्याय",
    save: "सेव्ह करा",
    saved: "सेव्ह केलेले",
    copy: "कॉपी करा",
    share: "शेअर करा",
    settings: "सेटिंग्ज",
    lightMode: "लाईट मोड",
    darkMode: "डार्क मोड",
    savedVerses: "सेव्ह केलेले श्लोक",
    noSavedVerses: "तुम्ही अद्याप कोणतेही श्लोक सेव्ह केलेले नाहीत.",
    verseOfTheDay: "आजचा विचार",
    readFullVerse: "पूर्ण श्लोक वाचा"
  },
  te: {
    home: "హోమ్",
    chapters: "అధ్యాయాలు",
    verses: "శ్లోకం",
    quotes: "కోట్స్",
    search: "వెతకండి",
    todaysVerse: "నేటి శ్లోకం",
    language: "భాష",
    readGita: "గీత చదవండి",
    exploreChapters: "అధ్యాయాలను అన్వేషించండి",
    readVerse: "శ్లోకం చదవండి",
    readMore: "మరింత చదవండి",
    prevChapter: "మునుపటి అధ్యాయం",
    nextChapter: "తదుపరి అధ్యాయం",
    save: "సేవ్ చేయండి",
    saved: "సేవ్ చేసినవి",
    copy: "కాపీ చేయండి",
    share: "షేర్ చేయండి",
    settings: "సెట్టింగ్‌లు",
    lightMode: "లైట్ మోడ్",
    darkMode: "డార్క్ మోడ్",
    savedVerses: "సేవ్ చేసిన శ్లోకాలు",
    noSavedVerses: "మీరు ఇంకా శ్లోకాలను సేవ్ చేయలేదు.",
    verseOfTheDay: "నేటి శ్లోకం",
    readFullVerse: "పూర్తి శ్లోకం చదవండి"
  }
}

export function useTranslation(lang: AppLanguage) {
  return i18n[lang] || i18n.en
}
