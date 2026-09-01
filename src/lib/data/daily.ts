import { getVerse } from "@/lib/api/client"
import { Verse } from "@/lib/api/types"

/**
 * Curated list of profound and transformative verses from the Bhagavad Gita,
 * representing essential teachings on Karma, Bhakti, Jnana, Dhyana, and Dharma.
 */
export const DAILY_WISDOM_POOL: { chapterId: number; verseId: number }[] = [
  // Chapter 2: Sankhya Yoga & Sthitaprajna
  { chapterId: 2, verseId: 47 }, // Karmanye vadikaraste
  { chapterId: 2, verseId: 14 }, // Matra-sparsas tu kaunteya (Equanimity in winter/summer)
  { chapterId: 2, verseId: 20 }, // Na jayate mriyate va kadacin (Soul is never born or dies)
  { chapterId: 2, verseId: 22 }, // Vasamsi jirnani yatha vihaya (Soul changing bodies)
  { chapterId: 2, verseId: 38 }, // Sukha-duhkhe same krtva (Treat pleasure and pain alike)
  { chapterId: 2, verseId: 48 }, // Yoga-sthah kuru karmani (Perform duty with steady mind)
  { chapterId: 2, verseId: 50 }, // Buddhi-yukto jahatiha (Yoga is skill in action)
  { chapterId: 2, verseId: 55 }, // Prajahati yada kaman (Definition of steady wisdom)
  { chapterId: 2, verseId: 56 }, // Duḥkhesv anudvigna-manah (Free from distress and desire)
  { chapterId: 2, verseId: 62 }, // Dhyayato visayan pumsah (Ladder of downfall)
  { chapterId: 2, verseId: 63 }, // Krodhad bhavati sammohah (Anger destroys intellect)
  { chapterId: 2, verseId: 70 }, // Apuryamanam acala-pratistham (Ocean calm despite rivers)
  { chapterId: 2, verseId: 71 }, // Vihaya kaman yah sarvan (Attaining supreme peace)

  // Chapter 3: Karma Yoga
  { chapterId: 3, verseId: 8 },  // Niyatam kuru karma tvam (Action is superior to inaction)
  { chapterId: 3, verseId: 19 }, // Tasmad asaktah satatam (Selfless dedicated action)
  { chapterId: 3, verseId: 21 }, // Yad yad acarati sresthas (Setting standard for society)
  { chapterId: 3, verseId: 30 }, // Mayi sarvani karmani (Dedicate all actions to Divine)
  { chapterId: 3, verseId: 35 }, // Sreyan sva-dharmo vigunah (Better is one's own duty)
  { chapterId: 3, verseId: 42 }, // Indriyani parany ahur (Senses, Mind, Intellect, Soul)

  // Chapter 4: Jnana Karma Sanyasa Yoga
  { chapterId: 4, verseId: 7 },  // Yada yada hi dharmasya (Descent of the Divine)
  { chapterId: 4, verseId: 8 },  // Paritranaya sadhunam (Protection of righteous)
  { chapterId: 4, verseId: 11 }, // Ye yatha mam prapadyante (As they approach Me, I reciprocate)
  { chapterId: 4, verseId: 18 }, // Karmany akarma yah pasyed (Action in inaction)
  { chapterId: 4, verseId: 24 }, // Brahmarpanam brahma havir (Everything is Divine consciousness)
  { chapterId: 4, verseId: 34 }, // Tad viddhi pranipatena (Learning from wise teachers)
  { chapterId: 4, verseId: 38 }, // Na hi jnanena sadrsam (Purity of wisdom)
  { chapterId: 4, verseId: 39 }, // Sraddhaval labhate jnanam (Faith brings wisdom and peace)

  // Chapter 5: Karma Sanyasa Yoga
  { chapterId: 5, verseId: 10 }, // Brahmany adhaya karmani (Untouched like lotus leaf)
  { chapterId: 5, verseId: 18 }, // Vidya-vinaya-sampanne (Seeing all beings with equal vision)
  { chapterId: 5, verseId: 21 }, // Bahya-sparsesv asaktatma (Joy found within the Self)
  { chapterId: 5, verseId: 22 }, // Ye hi samsparsa-ja bhoga (Sense pleasures lead to sorrow)
  { chapterId: 5, verseId: 29 }, // Bhoktaram yajna-tapasam (Peace through knowing Supreme Lord)

  // Chapter 6: Dhyana Yoga (Meditation & Mind Control)
  { chapterId: 6, verseId: 5 },  // Uddhared atmanatmanam (Elevate self by your own mind)
  { chapterId: 6, verseId: 6 },  // Bandhur atmatmanas tasya (Mind as friend or enemy)
  { chapterId: 6, verseId: 19 }, // Yatha dipo nivata-stho (Lamp in a windless place)
  { chapterId: 6, verseId: 26 }, // Yato yato niscalati (Guiding restless mind back)
  { chapterId: 6, verseId: 30 }, // Yo mam pasyati sarvatra (Seeing Divine everywhere)
  { chapterId: 6, verseId: 32 }, // Atmaupamyena sarvatra (Feeling empathy with all beings)
  { chapterId: 6, verseId: 35 }, // Asamsayam maha-baho (Mastering mind by practice and detachment)
  { chapterId: 6, verseId: 40 }, // Na hi kalyana-krt kascid (Righteous doer never meets misfortune)

  // Chapter 7: Jnana Vijnana Yoga
  { chapterId: 7, verseId: 7 },  // Mattah parataram nanyat (All is strung on Me like pearls)
  { chapterId: 7, verseId: 8 },  // Raso 'ham apsu kaunteya (I am the taste of water, light of sun)
  { chapterId: 7, verseId: 16 }, // Catur-vidha bhajante mam (Four kinds of seekers)
  { chapterId: 7, verseId: 19 }, // Bahunam janmanam ante (Vasudeva sarvam iti)

  // Chapter 8: Aksara Brahma Yoga
  { chapterId: 8, verseId: 7 },  // Tasmat sarvesu kalesu (Remember Me and do your duty)
  { chapterId: 8, verseId: 14 }, // Ananya-cetah satatam (Constant devotion brings easy attainment)

  // Chapter 9: Raja Vidya Raja Guhya Yoga
  { chapterId: 9, verseId: 2 },  // Raja-vidya raja-guhyam (Supreme wisdom and joyful practice)
  { chapterId: 9, verseId: 22 }, // Ananyas cintayanto mam (Divine carries what devotees lack)
  { chapterId: 9, verseId: 26 }, // Patram puspam phalam toyam (Offering made with pure love)
  { chapterId: 9, verseId: 27 }, // Yat karosi yad asnasi (Offer all activities as devotion)
  { chapterId: 9, verseId: 29 }, // Samo 'ham sarva-bhutesu (Equal to all, loving to devotees)
  { chapterId: 9, verseId: 34 }, // Man-mana bhava mad-bhakto (Engage your mind in Me)

  // Chapter 10: Vibhuti Yoga
  { chapterId: 10, verseId: 8 }, // Aham sarvasya prabhavo (I am the source of all)
  { chapterId: 10, verseId: 10 },// Tesam satata-yuktanam (Bestowing discernment of truth)
  { chapterId: 10, verseId: 20 },// Aham atma gudakesa (I dwell in the heart of all creatures)
  { chapterId: 10, verseId: 41 },// Yad yad vibhutimat sattvam (Every glorious manifestation stems from Divine)

  // Chapter 11: Viswarupa Darsana Yoga
  { chapterId: 11, verseId: 32 },// Kalo 'smi loka-ksaya-krt (Cosmic Time and supreme purpose)
  { chapterId: 11, verseId: 54 },// Bhaktya tv ananyaya sakya (Attainable only through pure devotion)
  { chapterId: 11, verseId: 55 },// Mat-karma-krn mat-paramo (Living with friendly intent to all)

  // Chapter 12: Bhakti Yoga
  { chapterId: 12, verseId: 8 }, // Mayy eva mana adhatsva (Fix your mind in the Divine)
  { chapterId: 12, verseId: 12 },// Sreyo hi jnanam abhyasat (Peace follows renunciation of attachment)
  { chapterId: 12, verseId: 13 },// Advésta sarva-bhutanam (Free from malice, friendly and compassionate)
  { chapterId: 12, verseId: 15 },// Yasman nodvijate loko (Neither disturbed by nor disturbing the world)
  { chapterId: 12, verseId: 18 },// Samah satrau ca mitre ca (Equal to friend and foe, honor and dishonor)

  // Chapter 13: Kshetra Kshetrajna Vibhaga Yoga
  { chapterId: 13, verseId: 28 },// Samam pasyan hi sarvatra (Seeing the Lord equally in all)

  // Chapter 14: Gunatraya Vibhaga Yoga
  { chapterId: 14, verseId: 22 },// Prakasam ca pravrttim ca (Transcendence above the three modes)
  { chapterId: 14, verseId: 27 },// Brahmano hi pratisthaham (Ground of the immortal Brahman)

  // Chapter 15: Purushottama Yoga
  { chapterId: 15, verseId: 7 }, // Mamaivamso jiva-loke (The living soul is an eternal fragment of the Divine)
  { chapterId: 15, verseId: 15 },// Sarvasya caham hrdi sannivisto (Seated in everyone's heart with memory & wisdom)

  // Chapter 16: Daivasura Sampad Vibhaga Yoga
  { chapterId: 16, verseId: 1 }, // Abhayam sattva-samsuddhir (Fearlessness, purity of heart, charity)
  { chapterId: 16, verseId: 2 }, // Ahimsa satyam akrodhas (Non-violence, truthfulness, serenity)
  { chapterId: 16, verseId: 22 },// Etai vimuktah kaunteya (Liberation from lust, anger, greed)

  // Chapter 17: Sraddhatraya Vibhaga Yoga
  { chapterId: 17, verseId: 3 }, // Sattvanurupa sarvasya (A person is shaped by their core faith)
  { chapterId: 17, verseId: 15 },// Anudvega-karam vakyam (Words that cause no distress, truthful & pleasant)
  { chapterId: 17, verseId: 16 },// Manah-prasadah saumyatvam (Serenity of mind and inner self-control)

  // Chapter 18: Moksha Sanyasa Yoga
  { chapterId: 18, verseId: 46 },// Yatah pravrttir bhutanam (Perfection by worship through one's own duty)
  { chapterId: 18, verseId: 48 },// Saha-jam karma kaunteya (Every endeavor has flaws, like fire has smoke)
  { chapterId: 18, verseId: 54 },// Brahma-bhutah prasannatma (Tranquil in Brahman, seeing all equally)
  { chapterId: 18, verseId: 61 },// Isvarah sarva-bhutanam (The Supreme Guide in the core of our being)
  { chapterId: 18, verseId: 63 },// Iti te jnanam akhyatam (Reflect deeply and then act as you choose)
  { chapterId: 18, verseId: 65 },// Man-mana bhava mad-bhakto (Absorb your heart in the Eternal)
  { chapterId: 18, verseId: 66 },// Sarva-dharman parityajya (Surrender all and find complete sanctuary)
  { chapterId: 18, verseId: 78 },// Yatra yogesvarah krsno (Where truth and action unite, victory and grace reside)
]

/**
 * Calculates the day index for any given date.
 * Automatically changes at midnight 12:00:00 AM.
 */
export function getDayNumber(date: Date = new Date()): number {
  // Use UTC midnight of the local date to ensure clean 24-hour day boundaries
  const localYear = date.getFullYear()
  const localMonth = date.getMonth()
  const localDay = date.getDate()

  const utcDate = Date.UTC(localYear, localMonth, localDay)
  return Math.floor(utcDate / (1000 * 60 * 60 * 24))
}

/**
 * Deterministically selects the chapter & verse for a given calendar day.
 * Rotates every midnight seamlessly across the curated pool.
 */
export function getDailyVerseCoordinates(date: Date = new Date()): { chapterId: number; verseId: number } {
  const dayNumber = getDayNumber(date)
  const poolSize = DAILY_WISDOM_POOL.length
  
  // Modulo calculation ensuring positive index
  const index = ((dayNumber % poolSize) + poolSize) % poolSize
  return DAILY_WISDOM_POOL[index]
}

/**
 * Retrieves the full Verse object for today's date.
 */
export async function getDailyVerse(date: Date = new Date()): Promise<Verse | null> {
  const { chapterId, verseId } = getDailyVerseCoordinates(date)
  return await getVerse(chapterId, verseId)
}

/**
 * Helper to get milliseconds remaining until the next local midnight 12:00 AM.
 */
export function getMillisecondsUntilMidnight(now: Date = new Date()): number {
  const nextMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0,
    0
  )
  return Math.max(1000, nextMidnight.getTime() - now.getTime())
}
