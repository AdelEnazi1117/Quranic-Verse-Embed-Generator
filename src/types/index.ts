/**
 * Type definitions for the Quranic Verse Embed Generator
 */

// Surah metadata from API
export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: "Meccan" | "Medinan";
}

// Ayah/Verse data from API
export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | { id: number; recommended: boolean; obligatory: boolean };
  surah?: Surah;
}

// Verse with both Arabic and translation
export interface VerseData {
  number: number;
  arabicText: string;
  translationText: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  code: number;
  status: string;
  data: T;
}

// Card customization options
export interface CardStyle {
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  theme: "dark" | "light";
  showTranslation: boolean;
  showReference: boolean;
  showVerseNumbers: boolean;
  showAccentLine: boolean;
  transparentBackground: boolean;
  customText: string;
  useCustomText: boolean;
}

// Preset color options
export interface ColorPreset {
  name: string;
  value: string;
}

// Embed configuration
export interface EmbedConfig {
  surah: number;
  fromAyah: number;
  toAyah: number;
  style: CardStyle;
}

// Export formats
export type ExportFormat = "iframe" | "html";

// Loading states
export interface LoadingState {
  surahs: boolean;
  ayah: boolean;
  translation: boolean;
}

// Error state
export interface ErrorState {
  message: string;
  type: "network" | "api" | "validation";
}
