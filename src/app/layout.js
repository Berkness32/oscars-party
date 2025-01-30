import { Geist, Geist_Mono, Ballet, MonteCarlo } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ballet = Ballet({
  variable: "--font-ballet",
  subsets: ["latin"],
});

const monteCarlo = MonteCarlo({
  variable: "--font-monteCarlo",
  weight: "400",
  subsets: ["latin"],
})

export const metadata = {
  title: "Oscars 2025",
  description: "Aarons Oscars Pool",
  icons: {
    icon: '/oscars.svg',
    // Optionally add other sizes or a PNG fallback
    // shortcut: '/oscars.png',
    // apple: '/oscars.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ballet.variable} ${monteCarlo.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
