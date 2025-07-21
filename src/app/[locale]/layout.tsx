import { generateSEOMetadata } from '@/components/seo/seo-meta'
import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { Montserrat } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
})

export const metadata: Metadata = generateSEOMetadata({
  title: 'Home',
  description: 'Welcome to our modern Next.js application',
  keywords: ['nextjs', 'react', 'typescript', 'tailwind'],
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
      <body className={`${montserrat.className} font-sans`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
