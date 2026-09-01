import { Chapter, Verse } from "@/lib/api/types"

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bhagavadgita.app"
export const SITE_NAME = "Bhagavad Gita"

/**
 * Famous Sanskrit verse key phrases for enriched page titles & search intent
 */
export const FAMOUS_VERSE_PHRASES: Record<string, string> = {
  "2.47": "Karmanye Vadhikaraste (Path of Selfless Action)",
  "2.14": "Matra Sparshas Tu Kaunteya (Equanimity in Joy & Sorrow)",
  "2.20": "Na Jayate Mriyate Va (Immortality of the Soul)",
  "2.22": "Vasamsi Jirnani Yatha Vihaya (Soul Changing Bodies)",
  "2.38": "Sukha-Duhkhe Same Krtva (Treating Pleasure & Pain Alike)",
  "2.48": "Yogasthah Kuru Karmani (Yoga is Equanimity)",
  "2.50": "Yogah Karmasu Kausalam (Yoga is Skill in Action)",
  "2.55": "Prajahati Yada Kaman (Sthitaprajna - Steady Wisdom)",
  "2.70": "Apuryamanam Acala-Pratistham (Ocean of Calmness)",
  "3.8": "Niyatam Kuru Karma Tvam (Action is Superior to Inaction)",
  "3.19": "Tasmad Asaktah Satatam (Detached Action)",
  "3.21": "Yad Yad Acarati Sresthas (Setting Example for Society)",
  "3.35": "Sreyan Sva-Dharmo Vigunah (Better is One's Own Dharma)",
  "4.7": "Yada Yada Hi Dharmasya (Manifestation of the Divine)",
  "4.8": "Paritranaya Sadhunam (Protection of the Righteous)",
  "4.18": "Karmany Akarma Yah Pasyed (Action in Inaction)",
  "4.38": "Na Hi Jnanena Sadrsam (Purity of Wisdom)",
  "4.39": "Sraddhaval Labhate Jnanam (Faith Leads to Wisdom)",
  "5.10": "Brahmany Adhaya Karmani (Lotus Leaf in Water)",
  "5.18": "Vidya-Vinaya-Sampanne (Equal Vision in All Beings)",
  "6.5": "Uddhared Atmanatmanam (Elevate Yourself by Your Own Mind)",
  "6.6": "Bandhur Atmatmanas Tasya (The Mind as Friend or Foe)",
  "6.19": "Yatha Dipo Nivatastho (Lamp in a Windless Place)",
  "6.26": "Yato Yato Niscalati (Taming the Restless Mind)",
  "6.35": "Abhyasena Tu Kaunteya (Mastery by Practice & Detachment)",
  "7.7": "Mattah Parataram Nanyat (All Strung on Divine Like Pearls)",
  "7.19": "Bahunam Janmanam Ante (Vasudeva Sarvam Iti)",
  "8.7": "Tasmat Sarvesu Kalesu (Remember Divine & Do Duty)",
  "9.22": "Ananyas Cintayanto Mam (Divine Providence & Grace)",
  "9.26": "Patram Pushpam Phalam Toyam (Offering Made with Pure Love)",
  "9.27": "Yat Karosi Yad Asnasi (Dedicate Every Action to Divine)",
  "10.20": "Aham Atma Gudakesa (Divine Seated in Every Heart)",
  "10.41": "Yad Yad Vibhutimat Sattvam (Every Splendor Stems from Divine)",
  "11.12": "Divi Surya-Sahasrasya (Splendor of a Thousand Suns)",
  "11.32": "Kalo 'Smi Loka-Ksaya-Krt (I Am Cosmic Time)",
  "11.55": "Mat-Karma-Krn Mat-Paramo (Devotion with Friendship to All)",
  "12.13": "Advesta Sarva-Bhutanam (Compassionate & Free from Malice)",
  "12.15": "Yasman Nodvijate Loko (Undisturbed by the World)",
  "14.22": "Prakasam Ca Pravrttim Ca (Beyond the Three Gunas)",
  "15.7": "Mamaivamso Jiva-Loke (Living Souls are Eternal Fragments)",
  "15.15": "Sarvasya Caham Hrdi Sannivisto (Seated in All Hearts)",
  "16.1": "Abhayam Sattva-Samsuddhir (Fearlessness & Purity of Mind)",
  "17.3": "Sraddhamayo 'Yam Puruso (A Person is Formed by Faith)",
  "18.46": "Yatah Pravrttir Bhutanam (Perfection Through Dedicated Duty)",
  "18.54": "Brahma-Bhutah Prasannatma (Tranquil State of Joy)",
  "18.61": "Isvarah Sarva-Bhutanam (The Lord Within Every Soul)",
  "18.63": "Yathecchasi Tatha Kuru (Reflect Deeply & Act with Freedom)",
  "18.65": "Man-Mana Bhava Mad-Bhakto (Engage Your Mind in the Divine)",
  "18.66": "Sarva-Dharman Parityajya (Supreme Surrender & Sanctuary)",
  "18.78": "Yatra Yogesvarah Krsno (Where Krishna & Arjuna Stand)",
}

/**
 * Generates Schema.org WebSite JSON-LD
 */
export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: ["Bhagavad Geeta", "Shrimad Bhagavad Gita", "The Song of God", "Gita Online"],
    url: SITE_URL,
    description: "Read the Bhagavad Gita online with original Sanskrit shlokas, English and Hindi translations, verse meanings, and chapter summaries.",
    inLanguage: ["sa", "en", "hi", "mr", "te"],
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.png`,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

/**
 * Generates Schema.org Book JSON-LD for the Bhagavad Gita
 */
export function getBookJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "Bhagavad Gita",
    alternateName: ["Shrimad Bhagavad Gita", "Bhagavad Geeta"],
    author: {
      "@type": "Person",
      name: "Sage Veda Vyasa",
    },
    character: [
      { "@type": "Person", "name": "Lord Krishna" },
      { "@type": "Person", "name": "Arjuna" },
      { "@type": "Person", "name": "Sanjaya" },
      { "@type": "Person", "name": "Dhritarashtra" },
    ],
    about: [
      "Hindu Philosophy",
      "Sanatana Dharma",
      "Karma Yoga",
      "Bhakti Yoga",
      "Jnana Yoga",
      "Raja Yoga",
      "Dhyana Yoga",
      "Dharma",
      "Moksha",
      "Spiritual Wisdom",
    ],
    inLanguage: ["sa", "en", "hi", "mr", "te"],
    numberOfPages: 700,
    genre: ["Spiritual", "Philosophy", "Sacred Scripture"],
    url: SITE_URL,
  }
}

/**
 * Generates Schema.org BreadcrumbList JSON-LD
 */
export function getBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}

/**
 * Generates Schema.org Chapter JSON-LD
 */
export function getChapterJsonLd(chapter: Chapter) {
  return {
    "@context": "https://schema.org",
    "@type": "Chapter",
    name: `Chapter ${chapter.chapter_number}: ${chapter.name_translation || chapter.name}`,
    alternateName: [chapter.name, `Chapter ${chapter.chapter_number}`, `Gita Chapter ${chapter.chapter_number}`],
    position: chapter.chapter_number,
    description: chapter.chapter_summary,
    inLanguage: ["sa", "en", "hi"],
    isPartOf: {
      "@type": "Book",
      name: "Bhagavad Gita",
      url: SITE_URL,
    },
    url: `${SITE_URL}/chapters/${chapter.chapter_number}`,
  }
}

/**
 * Generates Schema.org Verse / CreativeWork JSON-LD
 */
export function getVerseJsonLd(verse: Verse) {
  const englishTranslation = verse.translations.find((t) => t.language.toLowerCase() === "english")?.description || verse.translations[0]?.description || ""
  const hindiTranslation = verse.translations.find((t) => t.language.toLowerCase() === "hindi")?.description || ""

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `Bhagavad Gita Chapter ${verse.chapter_number}, Verse ${verse.verse_number}`,
    headline: `Bhagavad Gita ${verse.chapter_number}.${verse.verse_number}`,
    text: verse.text,
    abstract: verse.transliteration,
    description: englishTranslation,
    inLanguage: ["sa", "en", "hi"],
    character: [
      { "@type": "Person", "name": "Lord Krishna" },
      { "@type": "Person", "name": "Arjuna" },
    ],
    isPartOf: {
      "@type": "Chapter",
      name: `Bhagavad Gita Chapter ${verse.chapter_number}`,
      position: verse.chapter_number,
      url: `${SITE_URL}/chapters/${verse.chapter_number}`,
      isPartOf: {
        "@type": "Book",
        name: "Bhagavad Gita",
        url: SITE_URL,
      },
    },
    url: `${SITE_URL}/verse/${verse.chapter_number}/${verse.verse_number}`,
    ...(hindiTranslation && {
      translation: [
        {
          "@type": "CreativeWork",
          inLanguage: "hi",
          text: hindiTranslation,
        },
      ],
    }),
  }
}

/**
 * Generates Schema.org Quotation JSON-LD for Krishna's wisdom quotes
 */
export function getQuoteJsonLd(verse: Verse, quoteUrl: string) {
  const englishTranslation = verse.translations.find((t) => t.language.toLowerCase() === "english")?.description || verse.translations[0]?.description || ""

  return {
    "@context": "https://schema.org",
    "@type": "Quotation",
    text: englishTranslation,
    spokenByCharacter: {
      "@type": "Person",
      name: "Lord Krishna",
    },
    isPartOf: {
      "@type": "CreativeWork",
      name: `Bhagavad Gita Chapter ${verse.chapter_number} Verse ${verse.verse_number}`,
      url: `${SITE_URL}/verse/${verse.chapter_number}/${verse.verse_number}`,
      isPartOf: {
        "@type": "Book",
        name: "Bhagavad Gita",
        url: SITE_URL,
      },
    },
    url: quoteUrl.startsWith("http") ? quoteUrl : `${SITE_URL}${quoteUrl}`,
  }
}
