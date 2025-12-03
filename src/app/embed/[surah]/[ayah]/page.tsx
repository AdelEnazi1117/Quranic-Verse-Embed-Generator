import { Metadata } from "next";
import EmbedClient from "./EmbedClient";

interface EmbedPageProps {
  params: Promise<{
    surah: string;
    ayah: string; // Can be "5" or "1-5" for range
  }>;
  searchParams: Promise<{
    color?: string;
    bg?: string;
    text?: string;
    theme?: string;
    translation?: string;
    reference?: string;
    verseNumbers?: string;
    accentLine?: string;
    transparentBg?: string;
    custom?: string;
    customText?: string;
  }>;
}

export async function generateMetadata({
  params,
}: EmbedPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `Quran - Surah ${resolvedParams.surah}:${resolvedParams.ayah}`,
    description: `Embedded Quranic verse from Surah ${resolvedParams.surah}, Ayah ${resolvedParams.ayah}`,
    robots: "noindex, nofollow", // Embeds shouldn't be indexed
  };
}

export default async function EmbedPage({
  params,
  searchParams,
}: EmbedPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const surahNumber = parseInt(resolvedParams.surah, 10);

  // Parse ayah - can be single "5" or range "1-5"
  let fromAyah = 1;
  let toAyah = 1;

  if (resolvedParams.ayah.includes("-")) {
    const parts = resolvedParams.ayah.split("-");
    fromAyah = parseInt(parts[0], 10);
    toAyah = parseInt(parts[1], 10);
  } else {
    fromAyah = parseInt(resolvedParams.ayah, 10);
    toAyah = fromAyah;
  }

  // Validate params
  if (
    isNaN(surahNumber) ||
    isNaN(fromAyah) ||
    isNaN(toAyah) ||
    surahNumber < 1 ||
    surahNumber > 114 ||
    fromAyah < 1 ||
    toAyah < fromAyah
  ) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ background: "transparent" }}
      >
        <div className="text-center bg-navy-800 p-6 rounded-lg">
          <h1 className="text-2xl font-bold mb-2 text-white">Invalid Verse</h1>
          <p className="text-navy-400">
            Please check the Surah and Ayah numbers.
          </p>
        </div>
      </div>
    );
  }

  // Parse style from query params
  const accentColor = resolvedSearchParams.color
    ? `#${resolvedSearchParams.color}`
    : "#f97316";
  const backgroundColor = resolvedSearchParams.bg
    ? `#${resolvedSearchParams.bg}`
    : "#1c2331";
  const textColor = resolvedSearchParams.text
    ? `#${resolvedSearchParams.text}`
    : "#ffffff";
  const theme = (
    resolvedSearchParams.theme === "light" ? "light" : "dark"
  ) as "dark" | "light";
  const showTranslation = resolvedSearchParams.translation !== "false";
  const showReference = resolvedSearchParams.reference !== "false";
  const showVerseNumbers = resolvedSearchParams.verseNumbers !== "false";
  const showAccentLine = resolvedSearchParams.accentLine !== "false";
  const transparentBackground = resolvedSearchParams.transparentBg === "true";
  const useCustomText = resolvedSearchParams.custom === "true";
  const customText = resolvedSearchParams.customText
    ? decodeURIComponent(resolvedSearchParams.customText)
    : "";

  return (
    <EmbedClient
      surahNumber={surahNumber}
      fromAyah={fromAyah}
      toAyah={toAyah}
      accentColor={accentColor}
      backgroundColor={backgroundColor}
      textColor={textColor}
      theme={theme}
      showTranslation={showTranslation}
      showReference={showReference}
      showVerseNumbers={showVerseNumbers}
      showAccentLine={showAccentLine}
      transparentBackground={transparentBackground}
      useCustomText={useCustomText}
      customText={customText}
    />
  );
}
