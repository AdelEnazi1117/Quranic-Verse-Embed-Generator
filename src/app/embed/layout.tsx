import "../globals.css";

/**
 * Embed Layout - Headless & Transparent
 *
 * This layout is specifically for the embed route.
 * It provides a minimal, headless experience with no navigation,
 * header, or footer - just the Quranic card.
 * 
 * Background is transparent to allow the embedded content
 * to blend with the host page.
 */
export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className="m-0 p-0"
        style={{ background: "transparent" }}
      >
        {children}
      </body>
    </html>
  );
}
