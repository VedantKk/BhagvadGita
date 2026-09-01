// These types are inferred from common Gita API responses. 
// They may need adjustment once the real RapidAPI response is inspected.

export interface Translation {
  id?: number;
  description: string;
  authorName: string;
  language: string;
}

export interface Commentary {
  id?: number;
  description: string;
  authorName: string;
  language: string;
}

export interface Verse {
  id: number;
  verse_number: number;
  chapter_number: number;
  slug: string;
  text: string; // Sanskrit
  transliteration: string;
  word_meanings: string;
  translations: Translation[];
  commentaries: Commentary[];
}

export interface Chapter {
  id: number;
  chapter_number: number;
  chapter_summary: string;
  chapter_summary_hindi: string;
  name: string; // Sankhya Yoga
  name_meaning: string;
  name_translation: string;
  verses_count: number;
}
