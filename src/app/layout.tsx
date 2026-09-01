import type { Metadata, Viewport } from "next";
import { Inter, Tiro_Devanagari_Hindi } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSyncer } from "@/components/ThemeSyncer";
import { Navbar } from "@/components/Navbar";
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
  title: "Bhagavad Gita | Read. Understand. Experience.",
  description: "Discover timeless wisdom in a peaceful reading experience on mobile, tablet, and desktop.",
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
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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
