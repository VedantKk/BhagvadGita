import { Chapter, Verse } from "./types";
import { mockChapters, mockVerses } from "./mockData";

const API_HOST = "bhagavad-gita3.p.rapidapi.com";
const BASE_URL = `https://${API_HOST}`;

async function fetchFromApi(endpoint: string) {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    console.warn("RAPIDAPI_KEY is not set. Falling back to mock data.");
    return null; // Return null to signal fallback
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": API_HOST,
    },
    next: { revalidate: 86400 }, // Cache for 24 hours
  });

  if (!res.ok) {
    console.error(`API Error: ${res.status} ${res.statusText}`);
    return null;
  }

  return res.json();
}

export async function getChapters(): Promise<Chapter[]> {
  const data = await fetchFromApi("/v2/chapters/");
  if (!data) return mockChapters;
  return data as Chapter[];
}

export async function getChapter(chapterId: string | number): Promise<Chapter | null> {
  const data = await fetchFromApi(`/v2/chapters/${chapterId}/`);
  if (!data) return mockChapters.find((c) => c.chapter_number.toString() === chapterId.toString()) || null;
  return data as Chapter;
}

export async function getChapterVerses(chapterId: string | number): Promise<Verse[]> {
  const data = await fetchFromApi(`/v2/chapters/${chapterId}/verses/`);
  if (!data) return mockVerses.filter((v) => v.chapter_number.toString() === chapterId.toString());
  return data as Verse[];
}

export async function getVerse(chapterId: string | number, verseId: string | number): Promise<Verse | null> {
  const data = await fetchFromApi(`/v2/chapters/${chapterId}/verses/${verseId}/`);
  if (!data) return mockVerses.find((v) => v.chapter_number.toString() === chapterId.toString() && v.verse_number.toString() === verseId.toString()) || null;
  return data as Verse;
}
