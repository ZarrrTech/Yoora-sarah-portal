import { generateSEOMetadata } from '@/components/seo/seo-meta'
import { CONFIG } from '@/env/env'
import { routing } from '@/i18n/routing'
import type { Metadata, Viewport } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { Montserrat } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#ffffff' }],
}

export const metadata: Metadata = generateSEOMetadata({
  title: 'Halaman Utama',
  description: 'Yoora Sarah | Brand Fashion Muslimah Terkemuka ',
})

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={locale} className={montserrat.variable}>
      <head>
        {/* Additional meta tags for better SEO */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Yoora Sarah" />
        <meta name="application-name" content="Yoora Sarah" />
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />

        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/favicon.ico"
          as="image"
          type="image/x-icon"
        />
        <link
          rel="preload"
          href="/apple-touch-icon.png"
          as="image"
          type="image/png"
        />

        {/* DNS prefetching for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className={`${montserrat.className} font-sans antialiased`}>
        <NextIntlClientProvider>
          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only rounded bg-blue-600 px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
          >
            Skip to main content
          </a>

          {/* Main content wrapper */}
          <div id="main-content">{children}</div>

          {/* Schema.org structured data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Yoora Sarah',
                description: 'Modern e-commerce platform with Next.js',
                url: CONFIG.siteUrl || 'https://yoursite.com',
                potentialAction: {
                  '@type': 'SearchAction',
                  target: {
                    '@type': 'EntryPoint',
                    urlTemplate: `${CONFIG.siteUrl || 'https://yoursite.com'}/search?q={search_term_string}`,
                  },
                  'query-input': 'required name=search_term_string',
                },
              }),
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
