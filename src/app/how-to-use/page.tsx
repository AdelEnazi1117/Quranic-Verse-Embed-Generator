"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faArrowLeft,
  faPalette,
  faCode,
  faCopy,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

export default function HowToUsePage() {
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
            {t.howToUseTitle}
          </h1>
          <p className="text-navy-400 text-lg max-w-2xl mx-auto">
            {t.howToUseIntro}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-16">
          {/* Step 1 */}
          <div className="bg-navy-900/50 rounded-xl p-6 border border-navy-800/50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-orange/20 flex items-center justify-center flex-shrink-0">
                <FontAwesomeIcon
                  icon={faBookOpen}
                  className="w-6 h-6 text-accent-orange"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  1. {t.step1Title}
                </h2>
                <p className="text-navy-400">{t.step1Desc}</p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-navy-900/50 rounded-xl p-6 border border-navy-800/50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-orange/20 flex items-center justify-center flex-shrink-0">
                <FontAwesomeIcon
                  icon={faPalette}
                  className="w-6 h-6 text-accent-orange"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  2. {t.step2Title}
                </h2>
                <p className="text-navy-400">{t.step2Desc}</p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-navy-900/50 rounded-xl p-6 border border-navy-800/50">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-orange/20 flex items-center justify-center flex-shrink-0">
                <FontAwesomeIcon
                  icon={faCopy}
                  className="w-6 h-6 text-accent-orange"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  3. {t.step3Title}
                </h2>
                <p className="text-navy-400">{t.step3Desc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* iFrame vs HTML */}
        <div className="bg-navy-900/50 rounded-xl p-6 border border-navy-800/50 mb-12">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <FontAwesomeIcon
              icon={faCode}
              className="w-5 h-5 text-accent-orange"
            />
            {t.iframeVsHtml}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-navy-800/50 rounded-lg">
              <h3 className="font-medium text-white mb-2 flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="w-4 h-4 text-green-500"
                />
                iFrame
              </h3>
              <p className="text-sm text-navy-400">{t.iframeDesc}</p>
            </div>

            <div className="p-4 bg-navy-800/50 rounded-lg">
              <h3 className="font-medium text-white mb-2 flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="w-4 h-4 text-green-500"
                />
                Pure HTML
              </h3>
              <p className="text-sm text-navy-400">{t.htmlDesc}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
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
