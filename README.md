# Quranic Verse Embed Generator | مولد آيات القرآن

أداة مفتوحة المصدر لإنشاء آيات قرآنية قابلة للتضمين في المواقع الإلكترونية.

A beautiful, open-source micro-SaaS tool for generating embeddable Quranic verses for websites. Built with Next.js, React, and Tailwind CSS.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

---

## Features | المميزات

- All 114 Surahs with authentic Uthmanic script | جميع السور الـ 114
- Bilingual Interface - Arabic (primary) and English | واجهة ثنائية اللغة
- Full Color Customization - Accent, background, and text colors | تخصيص كامل للألوان
- English Translation - Optional Sahih International translation | ترجمة إنجليزية
- Easy Export - One-click copy for iFrame or pure HTML | تصدير سهل
- Searchable Dropdown - Quick Surah selection | بحث سريع
- Multiple Verses - Select up to 30 verses at once | اختيار عدة آيات
- Custom Text - Enter your own text with Quranic styling | نص مخصص
- Live Preview - See exactly how it will look | معاينة مباشرة
- Many Options - Verse numbers, accent line, transparent bg, etc. | خيارات متعددة
- Fully Responsive - Works on all screen sizes | متجاوب مع جميع الشاشات
- Docker Ready - Easy self-hosting deployment | جاهز للنشر

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/AdelEnazi/quranic-verse-embed.git
cd quranic-verse-embed

# Install dependencies
npm install

# Start development server
npm run dev
```

Open http://localhost:3000 in your browser.

---

## Docker Deployment

```bash
# Build the image
docker build -t quran-embed .

# Run the container
docker run -p 3000:3000 quran-embed
```

---

## How to Use

1. **Select a Surah** - Use the searchable dropdown to find your desired Surah
2. **Choose Verse Range** - Select from/to verses (up to 30 verses)
3. **Customize Colors** - Pick accent, background, and text colors
4. **Toggle Options** - Translation, reference, verse numbers, accent line, etc.
5. **Copy Code** - Get the iFrame or HTML code with one click
6. **Embed** - Paste the code into your website

---

## Customization Options

| Option                 | Description                                         |
| ---------------------- | --------------------------------------------------- |
| Accent Color           | Color of brackets, accent line, and reference badge |
| Background Color       | Card background color                               |
| Text Color             | Color of Arabic text and translation                |
| Show Translation       | Toggle English translation                          |
| Show Reference         | Toggle Surah name/number badge                      |
| Show Verse Numbers     | Toggle Arabic verse numbers (default: off)          |
| Show Accent Line       | Toggle right-side decorative border                 |
| Transparent Background | Make card background transparent                    |
| Custom Text            | Enter your own text instead of API verse            |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Builder Dashboard
│   ├── layout.tsx            # Root Layout
│   ├── globals.css           # Styles + Kitab font
│   ├── how-to-use/           # How to Use page
│   ├── docs/                 # Documentation page
│   └── embed/[surah]/[ayah]/ # Embed Route
├── components/
│   ├── QuranCard.tsx         # Core Verse Component
│   ├── ColorPicker.tsx       # Color Picker with Presets
│   ├── InfoTooltip.tsx       # Info Icon Tooltips
│   └── LanguageToggle.tsx    # Language Switcher
├── lib/
│   ├── api.ts                # AlQuran Cloud API
│   ├── constants.ts          # Presets and Helpers
│   └── translations.ts       # i18n Strings
└── types/
    └── index.ts              # TypeScript Interfaces
```

---

## Tech Stack

| Technology   | Purpose                      |
| ------------ | ---------------------------- |
| Next.js 14   | React Framework (App Router) |
| React 18     | UI Library                   |
| TypeScript   | Type Safety                  |
| Tailwind CSS | Styling                      |
| Font Awesome | Icons                        |
| Docker       | Containerization             |

### Fonts

| Font                 | Usage                            |
| -------------------- | -------------------------------- |
| IBM Plex Sans Arabic | UI (Arabic)                      |
| Inter                | UI (English)                     |
| Kitab                | Quranic verses (Uthmanic script) |

---

## API

This project uses the free AlQuran Cloud API (https://alquran.cloud/api):

- No API key required
- Uthmanic script text
- English translations
- Surah metadata

---

## Documentation

- [Development Guide](./DEVELOPMENT.md) - Local development, testing, customization
- [Deployment Guide](./DEPLOYMENT.md) - Docker, Coolify, GitHub setup
- [AI Context](./ai_context.md) - For AI assistants working on this project

---

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Developer

**Adel Enazi** (عادل العنزي)

- GitHub: [https://github.com/AdelEnazi1117](https://github.com/AdelEnazi1117)
- LinkedIn: [linkedin.com/in/adelenazi](https://www.linkedin.com/in/adelenazi/)
- Twitter/X: [https://x.com/AdelEnizy](https://x.com/AdelEnizy)
- Website: [https://adelenazi.dev](https://adelenazi.dev/)

---

## License

MIT License - Feel free to use for any purpose.

---

## Acknowledgments

- AlQuran Cloud (https://alquran.cloud/) for the free Quran API
- [Kitab Font](https://github.com/nuqayah/kitab-font) for beautiful Quranic typography
- [Font Awesome](https://fontawesome.com/v4/icons/) for icons
- The open-source community ❤️❤️

---

الحمدلله
وَإِنَّ رَبَّكَ لَذُو فَضْلٍ عَلَى ٱلنَّاسِ وَلَـٰكِنَّ أَكْثَرَهُمْ لَا يَشْكُرُونَ
