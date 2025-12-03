"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBookOpen,
  faCode,
  faPalette,
  faCircleQuestion,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

export default function DocsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950">
      {/* Header */}
      <header className="border-b border-navy-800/50 backdrop-blur-sm sticky top-0 z-50 bg-navy-950/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-navy-400 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
              <span>{t.backToHome}</span>
            </Link>
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-orange to-accent-gold flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faBookOpen} className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.docTitle}
          </h1>
          <p className="text-navy-400 text-lg max-w-2xl mx-auto">
            {t.docIntro}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {/* API Section */}
          <section className="bg-navy-900/50 rounded-xl p-6 border border-navy-800/50">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <FontAwesomeIcon
                icon={faCode}
                className="w-5 h-5 text-accent-orange"
              />
              {t.docApiSection}
            </h2>
            <p className="text-navy-400 mb-4">{t.docApiDesc}</p>
            <a
              href="https://alquran.cloud/api"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent-orange hover:text-accent-gold transition-colors"
            >
              api.alquran.cloud
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="w-4 h-4"
              />
            </a>
          </section>

          {/* Customization Section */}
          <section className="bg-navy-900/50 rounded-xl p-6 border border-navy-800/50">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <FontAwesomeIcon
                icon={faPalette}
                className="w-5 h-5 text-accent-orange"
              />
              {t.docCustomization}
            </h2>
            <div className="space-y-4 text-navy-400">
              <div className="p-4 bg-navy-800/50 rounded-lg">
                <h3 className="font-medium text-white mb-2">{t.accentColor}</h3>
                <p className="text-sm">{t.infoAccentColor}</p>
              </div>
              <div className="p-4 bg-navy-800/50 rounded-lg">
                <h3 className="font-medium text-white mb-2">
                  {t.backgroundColor}
                </h3>
                <p className="text-sm">{t.infoBackgroundColor}</p>
              </div>
              <div className="p-4 bg-navy-800/50 rounded-lg">
                <h3 className="font-medium text-white mb-2">{t.textColor}</h3>
                <p className="text-sm">{t.infoTextColor}</p>
              </div>
              <div className="p-4 bg-navy-800/50 rounded-lg">
                <h3 className="font-medium text-white mb-2">
                  {t.showTranslation}
                </h3>
                <p className="text-sm">{t.infoShowTranslation}</p>
              </div>
              <div className="p-4 bg-navy-800/50 rounded-lg">
                <h3 className="font-medium text-white mb-2">
                  {t.showReference}
                </h3>
                <p className="text-sm">{t.infoShowReference}</p>
              </div>
              <div className="p-4 bg-navy-800/50 rounded-lg">
                <h3 className="font-medium text-white mb-2">
                  {t.showVerseNumbers}
                </h3>
                <p className="text-sm">{t.infoShowVerseNumbers}</p>
              </div>
              <div className="p-4 bg-navy-800/50 rounded-lg">
                <h3 className="font-medium text-white mb-2">
                  {t.showAccentLine}
                </h3>
                <p className="text-sm">{t.infoShowAccentLine}</p>
              </div>
              <div className="p-4 bg-navy-800/50 rounded-lg">
                <h3 className="font-medium text-white mb-2">
                  {t.transparentBackground}
                </h3>
                <p className="text-sm">{t.infoTransparentBg}</p>
              </div>
            </div>
          </section>

          {/* Support Section */}
          <section className="bg-navy-900/50 rounded-xl p-6 border border-navy-800/50">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <FontAwesomeIcon
                icon={faCircleQuestion}
                className="w-5 h-5 text-accent-orange"
              />
              {t.docSupport}
            </h2>
            <p className="text-navy-400 mb-4">{t.docSupportDesc}</p>
            <a
              href="https://github.com/AdelEnazi1117/Quranic-Verse-Embed-Generator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent-orange hover:text-accent-gold transition-colors"
            >
              GitHub Repository
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="w-4 h-4"
              />
            </a>
          </section>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-orange hover:bg-accent-orange/90 text-white rounded-lg font-medium transition-colors"
          >
            <FontAwesomeIcon icon={faBookOpen} className="w-5 h-5" />
            {t.backToHome}
          </Link>
        </div>
      </main>
    </div>
  );
}
