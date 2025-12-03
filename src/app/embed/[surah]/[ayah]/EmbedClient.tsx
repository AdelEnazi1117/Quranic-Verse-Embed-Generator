"use client";

import { useEffect, useState } from "react";
import QuranCard from "@/components/QuranCard";
import { fetchSurahs, fetchVersesRange } from "@/lib/api";
import type { CardStyle, Surah, VerseData } from "@/types";

interface EmbedClientProps {
  surahNumber: number;
  fromAyah: number;
  toAyah: number;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  theme: "dark" | "light";
  showTranslation: boolean;
  showReference: boolean;
  showVerseNumbers: boolean;
  showAccentLine: boolean;
  transparentBackground: boolean;
  useCustomText: boolean;
  customText: string;
}

export default function EmbedClient({
  surahNumber,
  fromAyah,
  toAyah,
  accentColor,
  backgroundColor,
  textColor,
  theme,
  showTranslation,
  showReference,
  showVerseNumbers,
  showAccentLine,
  transparentBackground,
  useCustomText,
  customText,
}: EmbedClientProps) {
  const [verses, setVerses] = useState<VerseData[]>([]);
  const [surahName, setSurahName] = useState("");
  const [surahNameArabic, setSurahNameArabic] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const style: CardStyle = {
    accentColor,
    backgroundColor,
    textColor,
    theme,
    showTranslation,
    showReference,
    showVerseNumbers,
    showAccentLine,
    transparentBackground,
    useCustomText,
    customText,
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch surahs to get the name
        const surahs = await fetchSurahs();
        const surah = surahs.find((s: Surah) => s.number === surahNumber);

        if (!surah) {
          setError("Surah not found");
          setIsLoading(false);
          return;
        }

        setSurahName(surah.englishName);
        setSurahNameArabic(surah.name);

        // If using custom text, don't need to fetch verses
        if (useCustomText && customText) {
          setIsLoading(false);
          return;
        }

        // Validate ayah numbers
        if (fromAyah > surah.numberOfAyahs || toAyah > surah.numberOfAyahs) {
          setError(
            `Ayah ${Math.max(fromAyah, toAyah)} does not exist in ${surah.englishName}`
          );
          setIsLoading(false);
          return;
        }

        // Fetch verses
        const versesData = await fetchVersesRange(surahNumber, fromAyah, toAyah);
        setVerses(versesData);
      } catch (err) {
        console.error("Failed to load verses:", err);
        setError("Failed to load verses");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [surahNumber, fromAyah, toAyah, useCustomText, customText]);

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ background: "transparent" }}
      >
        <div className="text-center bg-navy-800 p-6 rounded-lg">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "transparent" }}
    >
      <div className="w-full max-w-2xl">
        <QuranCard
          verses={verses}
          surahName={surahName}
          surahNameArabic={surahNameArabic}
          surahNumber={surahNumber}
          style={style}
          isLoading={isLoading}
          isArabicUI={false}
        />
      </div>
    </div>
  );
}
