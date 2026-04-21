import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Inter, Roboto_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { Footer } from "@/components/footer"
import { QuestCta } from "@/components/quest-cta"
import { I18nProvider } from "@/lib/i18n/context"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Dive Theory - Scuba Diving Physics",
  description:
    "Learn scuba diving physics with interactive calculators for pressure, air consumption, gas laws, and lift calculations",
  generator: "Mbar",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QCSB23PYH8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QCSB23PYH8');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased">
        <I18nProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
          <QuestCta />
          <Footer />
        </I18nProvider>
      </body>
    </html>
  )
}
