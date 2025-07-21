// src/components/seo/seo-meta.tsx
import { Metadata } from 'next'

interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  openGraph?: {
    title?: string
    description?: string
    images?: string[]
  }
  twitter?: {
    card?: 'summary' | 'summary_large_image'
    title?: string
    description?: string
    images?: string[]
  }
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  openGraph,
  twitter,
}: SEOProps): Metadata {
  const siteName = 'Yoora Sarah'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com'

  return {
    title: `${title} | ${siteName}`,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'Yoora Sarah' }],
    creator: 'Yoora Sarah',
    publisher: 'Yoora Sarah',
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/en',
        'id-ID': '/id',
      },
    },
    openGraph: {
      title: openGraph?.title || title,
      description: openGraph?.description || description,
      url: siteUrl,
      siteName,
      images: openGraph?.images || ['/og-image.jpg'],
      locale: 'id_ID',
      type: 'website',
    },
    twitter: {
      card: twitter?.card || 'summary_large_image',
      title: twitter?.title || title,
      description: twitter?.description || description,
      images: twitter?.images || ['/twitter-image.jpg'],
      creator: '@yourhandle',
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
  }
}
