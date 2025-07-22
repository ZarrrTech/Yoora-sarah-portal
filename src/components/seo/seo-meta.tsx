// src/components/seo/seo-meta.tsx
import { CONFIG } from '@/env/env'
import { Metadata } from 'next'

interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  image?: string
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  image,
}: SEOProps): Metadata {
  const siteName = 'Yoora Sarah'
  const siteUrl = CONFIG.siteUrl || 'https://yoursite.com'

  return {
    title: `${title} | ${siteName}`,
    description,
    keywords: [
      'marketplace',
      'hijab',
      'fashion',
      'muslimah',
      'e-commerce',
      'online store',
      'premium products',
      'Fashion Muslimah',
      'Marketplace Hijab',
      'Kerudung',
      'Baju Muslim',
      'Gamis',
      'Tunik',
      'Aksesoris Hijab',
      'Fashion Online',
      'Online Shopping',
      'E-commerce',
      'Marketplace',
      'Fashion Muslimah Online',
      'Hijab Fashion',
      'Gaya Muslimah',
      'Tren Hijab',
      'Sharia',
      'Aspirational',
      'Syari',
      'Yoora',
      'Sarah',
      'Yoora Sarah',
      ...keywords,
    ],
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
      title: title,
      description: description,
      url: siteUrl,
      siteName,
      images: image
        ? [
            { url: image, height: 500, width: 500 },
            { url: image, height: 405, width: 720 },
            { url: image, height: 720, width: 1280 },
            { url: image, height: 1080, width: 1920 },
          ]
        : [`${siteUrl}/icon.png`],
      locale: 'id_ID',
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: image
        ? [
            { url: image, height: 500, width: 500 },
            { url: image, height: 405, width: 720 },
            { url: image, height: 720, width: 1280 },
            { url: image, height: 1080, width: 1920 },
          ]
        : [`${siteUrl}/icon.png`],
      creator: 'yoora_sarah',
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

    // Enhanced icons configuration
    icons: {
      icon: [
        { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
        {
          url: '/web-app-manifest-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          url: '/web-app-manifest-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      shortcut: '/favicon.ico',
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        {
          rel: 'mask-icon',
          url: '/safari-pinned-tab.svg',
          color: '#000000',
        },
      ],
    },

    manifest: '/site.webmanifest',

    // Additional meta tags for better SEO
    other: {
      'msapplication-TileColor': '#000000',
      'msapplication-config': '/browserconfig.xml',
      'theme-color': '#ffffff',
    },
  }
}
