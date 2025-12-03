"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faCheck,
  faEye,
  faEyeSlash,
  faBookOpen,
  faCode,
  faPalette,
  faChevronDown,
  faFont,
  faHashtag,
  faSquare,
  faSquareCheck,
  faCircleQuestion,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe, faFileLines } from "@fortawesome/free-solid-svg-icons";
import QuranCard, { generateStaticHTML } from "@/components/QuranCard";
import LanguageToggle from "@/components/LanguageToggle";
import ColorPicker from "@/components/ColorPicker";
import InfoTooltip from "@/components/InfoTooltip";
import { useLanguage } from "@/contexts/LanguageContext";
import { fetchSurahs, fetchVersesRange, MAX_VERSES_LIMIT } from "@/lib/api";
import {
  COLOR_PRESETS,
  BACKGROUND_PRESETS,
  TEXT_COLOR_PRESETS,
  DEFAULT_STYLE,
  DEFAULT_SURAH,
  DEFAULT_FROM_AYAH,
  DEFAULT_TO_AYAH,
  generateIframeCode,
} from "@/lib/constants";
import type { Surah, CardStyle, ExportFormat, VerseData } from "@/types";

export default function BuilderPage() {
  const { t, isRTL } = useLanguage();

  // Data state
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState(DEFAULT_SURAH);
  const [fromAyah, setFromAyah] = useState(DEFAULT_FROM_AYAH);
  const [toAyah, setToAyah] = useState(DEFAULT_TO_AYAH);
  const [verses, setVerses] = useState<VerseData[]>([]);

  // UI state
  const [style, setStyle] = useState<CardStyle>(DEFAULT_STYLE);
  const [exportFormat, setExportFormat] = useState<ExportFormat>("iframe");
  const [copied, setCopied] = useState(false);
  const [surahSearch, setSurahSearch] = useState("");
  const [isSurahDropdownOpen, setIsSurahDropdownOpen] = useState(false);

  // Loading state
  const [isLoadingSurahs, setIsLoadingSurahs] = useState(true);
  const [isLoadingVerses, setIsLoadingVerses] = useState(false);

  // Base URL for embeds (only available on client)
  const [baseUrl, setBaseUrl] = useState("");

  // Set baseUrl on client mount
  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  // Get current surah data
  const currentSurah = surahs.find((s) => s.number === selectedSurah);
  const maxAyahs = currentSurah?.numberOfAyahs || 7;

  // Filter surahs based on search
  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.englishName.toLowerCase().includes(surahSearch.toLowerCase()) ||
      surah.name.includes(surahSearch) ||
      surah.number.toString().includes(surahSearch)
  );

  // Fetch Surahs on mount
  useEffect(() => {
    const loadSurahs = async () => {
      try {
        const data = await fetchSurahs();
        setSurahs(data);
      } catch (error) {
        console.error("Failed to load Surahs:", error);
      } finally {
        setIsLoadingSurahs(false);
      }
    };
    loadSurahs();
  }, []);

  // FIX: Reset verse selection when surah changes
  useEffect(() => {
    setFromAyah(1);
    setToAyah(1);
  }, [selectedSurah]);

  // Ensure verse numbers are valid when maxAyahs changes
  useEffect(() => {
    if (fromAyah > maxAyahs) {
      setFromAyah(1);
    }
    if (toAyah > maxAyahs) {
      setToAyah(Math.min(fromAyah, maxAyahs));
    }
  }, [maxAyahs, fromAyah, toAyah]);

  // Ensure toAyah is always >= fromAyah
  useEffect(() => {
    if (toAyah < fromAyah) {
      setToAyah(fromAyah);
    }
  }, [fromAyah, toAyah]);

  // Fetch verses when selection changes
  const loadVerses = useCallback(async () => {
    if (selectedSurah && fromAyah && toAyah && !style.useCustomText) {
      setIsLoadingVerses(true);
      try {
        const data = await fetchVersesRange(selectedSurah, fromAyah, toAyah);
        setVerses(data);
      } catch (error) {
        console.error("Failed to load verses:", error);
        setVerses([]);
      } finally {
        setIsLoadingVerses(false);
      }
    }
  }, [selectedSurah, fromAyah, toAyah, style.useCustomText]);

  useEffect(() => {
    loadVerses();
  }, [loadVerses]);

  // Calculate actual verses count (with limit)
  const actualVerseCount = Math.min(toAyah - fromAyah + 1, MAX_VERSES_LIMIT);

  // Generate embed code
  const getEmbedCode = () => {
    if (exportFormat === "iframe") {
      return generateIframeCode(
        baseUrl,
        selectedSurah,
        fromAyah,
        toAyah,
        style
      );
    } else {
      return generateStaticHTML(
        verses,
        currentSurah?.englishName || "",
        currentSurah?.name || "",
        selectedSurah,
        style,
        isRTL
      );
    }
  };

  // Copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getEmbedCode());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  // Update style helper
  const updateStyle = (updates: Partial<CardStyle>) => {
    setStyle((prev) => ({ ...prev, ...updates }));
  };

  // Get localized color name
  const getColorName = (colorName: string) => {
    return t.colors[colorName as keyof typeof t.colors] || colorName;
  };

  // Get surah display name based on language
  const getSurahDisplayName = (surah: Surah) => {
    return isRTL ? surah.name : surah.englishName;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950 flex flex-col">
      {/* Header */}
      <header className="border-b border-navy-800/50 backdrop-blur-sm sticky top-0 z-50 bg-navy-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-orange to-accent-gold flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faBookOpen}
                  className="w-5 h-5 text-white"
                />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">
                  {t.appTitle}
                </h1>
                <p className="text-sm text-navy-400">{t.appSubtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/how-to-use"
                className="flex items-center gap-2 px-3 py-2 text-sm text-navy-400 hover:text-white hover:bg-navy-800/50 rounded-lg transition-colors"
              >
                <FontAwesomeIcon icon={faCircleQuestion} className="w-4 h-4" />
                <span className="hidden sm:inline">{t.howToUse}</span>
              </Link>
              <LanguageToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        <div className="grid lg:grid-cols-[360px_1fr] gap-8">
          {/* Sidebar Controls */}
          <aside className="space-y-6">
            {/* Verse Selection */}
            <div className="bg-navy-900/50 rounded-xl p-5 border border-navy-800/50">
              <h2 className="text-sm font-medium text-navy-300 mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faBookOpen} className="w-4 h-4" />
                {t.selectVerse}
              </h2>

              {/* Custom Text Toggle */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-navy-800">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faFont}
                    className="w-4 h-4 text-navy-400"
                  />
                  <span className="text-sm text-navy-400">
                    {t.useCustomText}
                  </span>
                  <InfoTooltip text={t.infoUseCustomText} />
                </div>
                <button
                  onClick={() => {
                    const newUseCustomText = !style.useCustomText;
                    if (newUseCustomText) {
                      updateStyle({
                        useCustomText: true,
                        showReference: false,
                      });
                    } else {
                      updateStyle({ useCustomText: false });
                    }
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    style.useCustomText
                      ? "bg-accent-orange text-white"
                      : "bg-navy-700 text-navy-400"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={style.useCustomText ? faSquareCheck : faSquare}
                    className="w-4 h-4"
                  />
                </button>
              </div>

              {style.useCustomText ? (
                /* Custom Text Input */
                <div className="space-y-3">
                  <label className="block text-sm text-navy-400">
                    {t.customText}
                  </label>
                  <textarea
                    value={style.customText}
                    onChange={(e) =>
                      updateStyle({ customText: e.target.value })
                    }
                    placeholder={t.customTextPlaceholder}
                    rows={4}
                    dir="rtl"
                    className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-lg text-white placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-accent-orange/50 hover:border-navy-600 transition-colors font-arabic text-lg"
                  />
                </div>
              ) : (
                <>
                  {/* Surah Selector */}
                  <div className="space-y-3">
                    <label className="block text-sm text-navy-400">
                      {t.surah}
                    </label>
                    <div className="relative">
                      <button
                        onClick={() =>
                          setIsSurahDropdownOpen(!isSurahDropdownOpen)
                        }
                        className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-lg text-start text-white flex items-center justify-between hover:border-navy-600 transition-colors"
                        disabled={isLoadingSurahs}
                      >
                        {isLoadingSurahs ? (
                          <span className="text-navy-400">{t.loading}</span>
                        ) : currentSurah ? (
                          <span>
                            {currentSurah.number}.{" "}
                            {getSurahDisplayName(currentSurah)}
                          </span>
                        ) : (
                          <span className="text-navy-400">{t.selectSurah}</span>
                        )}
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className={`w-4 h-4 transition-transform ${
                            isSurahDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown */}
                      {isSurahDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-navy-800 border border-navy-700 rounded-lg shadow-xl max-h-64 overflow-hidden">
                          {/* Search input */}
                          <div className="p-2 border-b border-navy-700">
                            <input
                              type="text"
                              placeholder={t.searchSurah}
                              value={surahSearch}
                              onChange={(e) => setSurahSearch(e.target.value)}
                              className="w-full px-3 py-2 bg-navy-900 border border-navy-600 rounded-md text-white text-sm placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-accent-orange/50"
                              autoFocus
                            />
                          </div>
                          {/* Surah list */}
                          <div className="max-h-48 overflow-y-auto custom-scrollbar">
                            {filteredSurahs.map((surah) => (
                              <button
                                key={surah.number}
                                onClick={() => {
                                  setSelectedSurah(surah.number);
                                  setIsSurahDropdownOpen(false);
                                  setSurahSearch("");
                                }}
                                className={`w-full px-4 py-2 text-start text-sm hover:bg-navy-700 transition-colors flex items-center justify-between ${
                                  selectedSurah === surah.number
                                    ? "bg-navy-700 text-accent-orange"
                                    : "text-white"
                                }`}
                              >
                                <span>
                                  {surah.number}. {getSurahDisplayName(surah)}
                                </span>
                                <span className="text-navy-500 text-xs">
                                  {surah.numberOfAyahs} {t.verses}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* From Ayah Selector */}
                  <div className="space-y-3 mt-4">
                    <label className="block text-sm text-navy-400">
                      {t.fromAyah}
                    </label>
                    <select
                      value={fromAyah}
                      onChange={(e) => setFromAyah(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-orange/50 hover:border-navy-600 transition-colors"
                    >
                      {Array.from({ length: maxAyahs }, (_, i) => i + 1).map(
                        (num) => (
                          <option key={num} value={num}>
                            {t.verse} {num}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  {/* To Ayah Selector */}
                  <div className="space-y-3 mt-4">
                    <label className="block text-sm text-navy-400">
                      {t.toAyah}
                    </label>
                    <select
                      value={toAyah}
                      onChange={(e) => setToAyah(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-navy-800 border border-navy-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-orange/50 hover:border-navy-600 transition-colors"
                    >
                      {Array.from(
                        { length: maxAyahs - fromAyah + 1 },
                        (_, i) => fromAyah + i
                      ).map((num) => (
                        <option key={num} value={num}>
                          {t.verse} {num}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Verses count indicator */}
                  {toAyah > fromAyah && (
                    <div className="mt-3 text-xs text-navy-400">
                      {actualVerseCount} {t.versesSelected}
                      {toAyah - fromAyah + 1 > MAX_VERSES_LIMIT && (
                        <span className="text-accent-orange ml-2">
                          ({t.maxVersesNote})
                        </span>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Customization Controls */}
            <div className="bg-navy-900/50 rounded-xl p-5 border border-navy-800/50">
              <h2 className="text-sm font-medium text-navy-300 mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faPalette} className="w-4 h-4" />
                {t.customizeStyle}
              </h2>

              {/* Accent Color Picker */}
              <div className="flex items-center gap-1 mb-1">
                <span className="text-sm text-navy-400">{t.accentColor}</span>
                <InfoTooltip text={t.infoAccentColor} />
              </div>
              <ColorPicker
                value={style.accentColor}
                onChange={(color) => updateStyle({ accentColor: color })}
                presets={COLOR_PRESETS}
                getColorName={getColorName}
                label=""
                customColorLabel={t.customColor}
              />

              {/* Background Color Picker */}
              <div className="flex items-center gap-1 mb-1">
                <span className="text-sm text-navy-400">
                  {t.backgroundColor}
                </span>
                <InfoTooltip text={t.infoBackgroundColor} />
              </div>
              <ColorPicker
                value={style.backgroundColor}
                onChange={(color) => updateStyle({ backgroundColor: color })}
                presets={BACKGROUND_PRESETS}
                getColorName={getColorName}
                label=""
                customColorLabel={t.customColor}
              />

              {/* Text Color Picker */}
              <div className="flex items-center gap-1 mb-1">
                <span className="text-sm text-navy-400">{t.textColor}</span>
                <InfoTooltip text={t.infoTextColor} />
              </div>
              <ColorPicker
                value={style.textColor}
                onChange={(color) => updateStyle({ textColor: color })}
                presets={TEXT_COLOR_PRESETS}
                getColorName={getColorName}
                label=""
                customColorLabel={t.customColor}
              />

              {/* Transparent Background Toggle */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-navy-400">
                    {t.transparentBackground}
                  </span>
                  <InfoTooltip text={t.infoTransparentBg} />
                </div>
                <button
                  onClick={() =>
                    updateStyle({
                      transparentBackground: !style.transparentBackground,
                    })
                  }
                  className={`p-2 rounded-lg transition-colors ${
                    style.transparentBackground
                      ? "bg-accent-orange text-white"
                      : "bg-navy-700 text-navy-400"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={style.transparentBackground ? faEye : faEyeSlash}
                    className="w-4 h-4"
                  />
                </button>
              </div>

              {/* Show Accent Line Toggle */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faMinus}
                    className="w-4 h-4 text-navy-400"
                  />
                  <span className="text-sm text-navy-400">
                    {t.showAccentLine}
                  </span>
                  <InfoTooltip text={t.infoShowAccentLine} />
                </div>
                <button
                  onClick={() =>
                    updateStyle({ showAccentLine: !style.showAccentLine })
                  }
                  className={`p-2 rounded-lg transition-colors ${
                    style.showAccentLine
                      ? "bg-accent-orange text-white"
                      : "bg-navy-700 text-navy-400"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={style.showAccentLine ? faEye : faEyeSlash}
                    className="w-4 h-4"
                  />
                </button>
              </div>

              {/* Show Verse Numbers Toggle */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faHashtag}
                    className="w-4 h-4 text-navy-400"
                  />
                  <span className="text-sm text-navy-400">
                    {t.showVerseNumbers}
                  </span>
                  <InfoTooltip text={t.infoShowVerseNumbers} />
                </div>
                <button
                  onClick={() =>
                    updateStyle({ showVerseNumbers: !style.showVerseNumbers })
                  }
                  className={`p-2 rounded-lg transition-colors ${
                    style.showVerseNumbers
                      ? "bg-accent-orange text-white"
                      : "bg-navy-700 text-navy-400"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={style.showVerseNumbers ? faEye : faEyeSlash}
                    className="w-4 h-4"
                  />
                </button>
              </div>

              {/* Show Translation Toggle */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-navy-400">
                    {t.showTranslation}
                  </span>
                  <InfoTooltip text={t.infoShowTranslation} />
                </div>
                <button
                  onClick={() =>
                    updateStyle({ showTranslation: !style.showTranslation })
                  }
                  className={`p-2 rounded-lg transition-colors ${
                    style.showTranslation
                      ? "bg-accent-orange text-white"
                      : "bg-navy-700 text-navy-400"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={style.showTranslation ? faEye : faEyeSlash}
                    className="w-4 h-4"
                  />
                </button>
              </div>

              {/* Show Reference Toggle - disabled when using custom text */}
              <div
                className={`flex items-center justify-between ${
                  style.useCustomText ? "opacity-50" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm text-navy-400">
                    {t.showReference}
                  </span>
                  <InfoTooltip text={t.infoShowReference} />
                </div>
                <button
                  onClick={() =>
                    !style.useCustomText &&
                    updateStyle({ showReference: !style.showReference })
                  }
                  disabled={style.useCustomText}
                  className={`p-2 rounded-lg transition-colors ${
                    style.showReference && !style.useCustomText
                      ? "bg-accent-orange text-white"
                      : "bg-navy-700 text-navy-400"
                  } ${style.useCustomText ? "cursor-not-allowed" : ""}`}
                >
                  <FontAwesomeIcon
                    icon={
                      style.showReference && !style.useCustomText
                        ? faEye
                        : faEyeSlash
                    }
                    className="w-4 h-4"
                  />
                </button>
              </div>
            </div>

            {/* Export Section */}
            <div className="bg-navy-900/50 rounded-xl p-5 border border-navy-800/50">
              <h2 className="text-sm font-medium text-navy-300 mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faCode} className="w-4 h-4" />
                {t.exportCode}
                <Link href="/how-to-use" className="ml-auto">
                  <InfoTooltip text={t.infoExportCode} />
                </Link>
              </h2>

              {/* Format Tabs */}
              <div className="flex rounded-lg bg-navy-800 p-1 mb-4">
                <button
                  onClick={() => setExportFormat("iframe")}
                  className={`flex-1 py-2 px-3 text-sm rounded-md transition-colors ${
                    exportFormat === "iframe"
                      ? "bg-accent-orange text-white"
                      : "text-navy-400 hover:text-white"
                  }`}
                >
                  {t.iframe}
                </button>
                <button
                  onClick={() => setExportFormat("html")}
                  className={`flex-1 py-2 px-3 text-sm rounded-md transition-colors ${
                    exportFormat === "html"
                      ? "bg-accent-orange text-white"
                      : "text-navy-400 hover:text-white"
                  }`}
                >
                  {t.pureHtml}
                </button>
              </div>

              {/* Code Preview */}
              <div
                className="bg-navy-950 rounded-lg p-3 mb-4 max-h-40 overflow-auto custom-scrollbar"
                dir="ltr"
              >
                <pre className="text-xs text-navy-300 whitespace-pre-wrap break-all font-mono">
                  {getEmbedCode()}
                </pre>
              </div>

              {/* Copy Button */}
              <button
                onClick={copyToClipboard}
                className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                  copied
                    ? "bg-green-500 text-white"
                    : "bg-accent-orange hover:bg-accent-orange/90 text-white"
                }`}
              >
                <FontAwesomeIcon
                  icon={copied ? faCheck : faCopy}
                  className="w-4 h-4"
                />
                {copied ? t.copied : t.copyToClipboard}
              </button>
            </div>
          </aside>

          {/* Main Preview Area */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-navy-900/30 rounded-xl p-6 border border-navy-800/50">
              <h2 className="text-sm font-medium text-navy-300 mb-4">
                {t.livePreview}
              </h2>

              {/* Preview Container - transparent background */}
              <div className="rounded-lg p-4 bg-[repeating-conic-gradient(#1f2937_0%_25%,#111827_0%_50%)] bg-[length:20px_20px]">
                <div className="max-w-lg mx-auto">
                  <QuranCard
                    verses={verses}
                    surahName={currentSurah?.englishName || "Al-Fatiha"}
                    surahNameArabic={currentSurah?.name || "الفاتحة"}
                    surahNumber={selectedSurah}
                    style={style}
                    isLoading={isLoadingVerses}
                    isArabicUI={isRTL}
                  />
                </div>
              </div>

              {/* Preview Info */}
              <p className="text-xs text-navy-500 mt-4 text-center">
                {t.previewNote}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-navy-800/50 mt-auto bg-navy-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Developer Info */}
            <div>
              <p className="text-sm text-navy-400 mb-2">{t.developedBy}</p>
              <p className="text-white font-medium">{t.developerName}</p>
              <div className="flex items-center gap-3 mt-3">
                <a
                  href="https://github.com/AdelEnazi1117"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy-400 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/adelenazi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/AdelEnizy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy-400 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <FontAwesomeIcon icon={faXTwitter} className="w-5 h-5" />
                </a>
                <a
                  href="https://adelenazi.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-navy-400 hover:text-white transition-colors"
                  aria-label="Website"
                >
                  <FontAwesomeIcon icon={faGlobe} className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <p className="text-sm text-navy-400 mb-2">
                {t.openSourceProject}
              </p>
              <div className="space-y-2">
                <a
                  href="https://github.com/AdelEnazi/quranic-verse-embed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white hover:text-accent-orange transition-colors text-sm"
                >
                  <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
                  {t.sourceCode}
                </a>
                <Link
                  href="/docs"
                  className="flex items-center gap-2 text-white hover:text-accent-orange transition-colors text-sm"
                >
                  <FontAwesomeIcon icon={faFileLines} className="w-4 h-4" />
                  {t.documentation}
                </Link>
              </div>
            </div>

            {/* Copyright */}
            <div className="md:text-end">
              <p className="text-sm text-navy-500">
                © {new Date().getFullYear()} {t.developerName}
              </p>
              <p className="text-xs text-navy-600 mt-1">
                {t.allRightsReserved}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
