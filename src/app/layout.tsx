import type { Metadata, Viewport } from "next";
import { Inter, Tiro_Devanagari_Hindi } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSyncer } from "@/components/ThemeSyncer";
import { Navbar } from "@/components/Navbar";
import { SITE_URL, SITE_NAME, getWebSiteJsonLd, getBookJsonLd } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const tiro = Tiro_Devanagari_Hindi({
  weight: "400",
  variable: "--font-tiro",
  subsets: ["devanagari"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#121214" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bhagavad Gita – Read Bhagavad Gita Online | Sanskrit, Hindi & English",
    template: "%s | Bhagavad Gita",
  },
  description: "Read the Bhagavad Gita online with original Sanskrit shlokas, English and Hindi translations, verse meanings, chapter summaries, and timeless teachings of Lord Krishna.",
  keywords: [
    "Bhagavad Gita",
    "Bhagavad Geeta",
    "Shrimad Bhagavad Gita",
    "Bhagavad Gita online",
    "Bhagavad Gita Sanskrit",
    "Bhagavad Gita Hindi",
    "Bhagavad Gita English",
    "Bhagavad Gita shlokas",
    "Bhagavad Gita verses",
    "Lord Krishna teachings",
    "Krishna Arjuna dialogue",
    "Karma Yoga",
    "Bhakti Yoga",
    "Jnana Yoga",
    "Sanatana Dharma",
    "Hindu philosophy",
    "Gita quotes",
  ],
  authors: [{ name: "Sage Veda Vyasa" }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "hi-IN": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["hi_IN"],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Bhagavad Gita – Read Bhagavad Gita Online | Sanskrit, Hindi & English",
    description: "Read the Bhagavad Gita online with original Sanskrit shlokas, English and Hindi translations, verse meanings, and chapter summaries.",
    images: [
      {
        url: "/bg-krishna-arjuna.png",
        width: 1200,
        height: 630,
        alt: "Bhagavad Gita – Teachings of Lord Krishna to Arjuna on the Battlefield of Kurukshetra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhagavad Gita – Read Bhagavad Gita Online",
    description: "Explore all 18 chapters and 700 verses of the Bhagavad Gita with Sanskrit, English, and Hindi translations.",
    images: ["/bg-krishna-arjuna.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Bhagavad Gita",
  },
  formatDetection: {
    telephone: false,
  },
};

const themeScript = `
  try {
    let item = localStorage.getItem('gita-settings-storage');
    if (item) {
      let parsed = JSON.parse(item);
      if (parsed.state && parsed.state.theme) {
        document.documentElement.setAttribute('data-theme', parsed.state.theme);
      }
    }
  } catch(e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteJsonLd = getWebSiteJsonLd();
  const bookJsonLd = getBookJsonLd();

  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${tiro.variable} antialiased min-h-screen bg-background font-sans overflow-x-hidden flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeSyncer />
          
          {/* Spiritual Background Atmosphere */}
          <div className="fixed inset-0 z-[-50] overflow-hidden pointer-events-none">
            <div className="spiritual-background absolute inset-0"></div>
          </div>

          <Navbar />
          <main className="flex-1 w-full overflow-x-hidden pb-12">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
