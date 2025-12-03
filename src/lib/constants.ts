/**
 * Constants and preset values for the Quranic Verse Embed Generator
 */

import type { ColorPreset, CardStyle } from "@/types";

// Color presets for the accent color picker
export const COLOR_PRESETS: ColorPreset[] = [
  { name: "Orange", value: "#f97316" },
  { name: "Gold", value: "#f59e0b" },
  { name: "Emerald", value: "#10b981" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Indigo", value: "#6366f1" },
];

// Background color presets
export const BACKGROUND_PRESETS: ColorPreset[] = [
  { name: "Navy", value: "#1c2331" },
  { name: "Black", value: "#0a0a0a" },
  { name: "Dark Gray", value: "#1f2937" },
  { name: "Dark Blue", value: "#1e3a5f" },
  { name: "Dark Green", value: "#14532d" },
  { name: "White", value: "#ffffff" },
  { name: "Light Gray", value: "#f3f4f6" },
  { name: "Cream", value: "#fef3c7" },
];

// Text color presets
export const TEXT_COLOR_PRESETS: ColorPreset[] = [
  { name: "White", value: "#ffffff" },
  { name: "Light Gray", value: "#e5e7eb" },
  { name: "Black", value: "#000000" },
  { name: "Dark Gray", value: "#374151" },
  { name: "Gold", value: "#fbbf24" },
  { name: "Orange", value: "#f97316" },
];

// Default card style
export const DEFAULT_STYLE: CardStyle = {
  accentColor: "#f97316", // Orange
  backgroundColor: "#1c2331", // Navy
  textColor: "#ffffff", // White
  theme: "dark",
  showTranslation: true,
  showReference: true,
  showVerseNumbers: false, // Default off
  showAccentLine: true,
  transparentBackground: false,
  customText: "",
  useCustomText: false,
};

// Default Surah and Ayah for initial load
export const DEFAULT_SURAH = 1; // Al-Fatiha
export const DEFAULT_FROM_AYAH = 1; // First verse
export const DEFAULT_TO_AYAH = 1; // First verse

// App metadata
export const APP_NAME = "Quranic Verse Embed Generator";
export const APP_DESCRIPTION =
  "Generate beautiful, embeddable Quranic verses for your website";

// Embed base URL (will be replaced with actual domain in production)
export const getEmbedUrl = (
  baseUrl: string,
  surah: number,
  fromAyah: number,
  toAyah: number,
  style: CardStyle
): string => {
  const params = new URLSearchParams({
    color: style.accentColor.replace("#", ""),
    bg: style.backgroundColor.replace("#", ""),
    text: style.textColor.replace("#", ""),
    theme: style.theme,
    translation: style.showTranslation.toString(),
    reference: style.showReference.toString(),
    verseNumbers: style.showVerseNumbers.toString(),
    accentLine: style.showAccentLine.toString(),
    transparentBg: style.transparentBackground.toString(),
  });

  // Add custom text params if using custom text
  if (style.useCustomText && style.customText) {
    params.set("custom", "true");
    params.set("customText", encodeURIComponent(style.customText));
  }

  // If single verse, use simpler URL
  if (fromAyah === toAyah) {
    return `${baseUrl}/embed/${surah}/${fromAyah}?${params.toString()}`;
  }

  // For range, include both in URL
  return `${baseUrl}/embed/${surah}/${fromAyah}-${toAyah}?${params.toString()}`;
};

// Generate iframe embed code
export const generateIframeCode = (
  baseUrl: string,
  surah: number,
  fromAyah: number,
  toAyah: number,
  style: CardStyle
): string => {
  const embedUrl = getEmbedUrl(baseUrl, surah, fromAyah, toAyah, style);
  const verseCount = toAyah - fromAyah + 1;
  // Estimate height based on verse count
  const height = Math.min(200 + verseCount * 150, 800);

  const verseLabel =
    fromAyah === toAyah ? `${surah}:${fromAyah}` : `${surah}:${fromAyah}-${toAyah}`;

  return `<iframe 
  src="${embedUrl}"
  width="100%"
  height="${height}"
  frameborder="0"
  style="max-width: 700px; border: none; background: transparent;"
  title="Quranic Verse - Surah ${verseLabel}"
  loading="lazy"
></iframe>`;
};
