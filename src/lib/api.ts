/**
 * API utilities for fetching Quranic data from api.alquran.cloud
 */

import type { Surah, Ayah, ApiResponse, VerseData } from "@/types";

const API_BASE = "https://api.alquran.cloud/v1";

// Maximum verses that can be fetched at once (to limit API load)
export const MAX_VERSES_LIMIT = 30;

/**
 * Fetch all Surahs with metadata
 */
export async function fetchSurahs(): Promise<Surah[]> {
  try {
    const response = await fetch(`${API_BASE}/surah`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data: ApiResponse<Surah[]> = await response.json();

    if (data.code !== 200) {
      throw new Error(`API returned code: ${data.code}`);
    }

    return data.data;
  } catch (error) {
    console.error("Failed to fetch Surahs:", error);
    throw error;
  }
}

/**
 * Fetch a specific Ayah in Uthmanic script
 */
export async function fetchAyah(
  surahNumber: number,
  ayahNumber: number
): Promise<Ayah> {
  try {
    const response = await fetch(
      `${API_BASE}/ayah/${surahNumber}:${ayahNumber}/quran-uthmani`
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data: ApiResponse<Ayah> = await response.json();

    if (data.code !== 200) {
      throw new Error(`API returned code: ${data.code}`);
    }

    return data.data;
  } catch (error) {
    console.error("Failed to fetch Ayah:", error);
    throw error;
  }
}

/**
 * Fetch English translation for an Ayah
 */
export async function fetchTranslation(
  surahNumber: number,
  ayahNumber: number
): Promise<string> {
  try {
    const response = await fetch(
      `${API_BASE}/ayah/${surahNumber}:${ayahNumber}/en.sahih`
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data: ApiResponse<Ayah> = await response.json();

    if (data.code !== 200) {
      throw new Error(`API returned code: ${data.code}`);
    }

    return data.data.text;
  } catch (error) {
    console.error("Failed to fetch translation:", error);
    throw error;
  }
}

/**
 * Fetch both Ayah and translation in parallel
 */
export async function fetchAyahWithTranslation(
  surahNumber: number,
  ayahNumber: number
): Promise<{ ayah: Ayah; translation: string }> {
  const [ayah, translation] = await Promise.all([
    fetchAyah(surahNumber, ayahNumber),
    fetchTranslation(surahNumber, ayahNumber),
  ]);

  return { ayah, translation };
}

/**
 * Fetch multiple verses (range) with translations
 */
export async function fetchVersesRange(
  surahNumber: number,
  fromAyah: number,
  toAyah: number
): Promise<VerseData[]> {
  // Limit the number of verses
  const actualTo = Math.min(toAyah, fromAyah + MAX_VERSES_LIMIT - 1);

  const verses: VerseData[] = [];

  // Fetch all verses in parallel
  const promises = [];
  for (let i = fromAyah; i <= actualTo; i++) {
    promises.push(fetchAyahWithTranslation(surahNumber, i));
  }

  const results = await Promise.all(promises);

  for (let i = 0; i < results.length; i++) {
    verses.push({
      number: fromAyah + i,
      arabicText: results[i].ayah.text,
      translationText: results[i].translation,
    });
  }

  return verses;
}
