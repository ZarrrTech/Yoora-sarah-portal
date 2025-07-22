import { CONFIG } from '@/env/env'
import { set } from 'date-fns'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const language = ['en', 'id']
  const websiteBaseUrl = CONFIG.siteUrl

  const websiteCreatedAt = set(new Date(), {
    year: 2025,
    month: 8, // September (0-indexed)
    date: 30,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  })
  // Kalo ada perubahaan di page tertentu, jangan lupa update tanggal di atas
  // Misal: kalau ada perubahan di halaman About, ubah tanggal di atas
  // ke tanggal terakhir kali halaman About diupdate.
  // Contoh:
  //  {
  //     pathname: '',
  //     lastModified: set(new Date(), { <---- ubah tanggal di sini
  //       year: 2024,
  //       month: 6, // July (0-indexed)
  //       date: 23,
  //       hours: 0,
  //       minutes: 0,
  //       seconds: 0,
  //       milliseconds: 0,
  //     }),
  //     changeFrequency: 'yearly' as const,
  //     priority: 1.0,
  //   },

  const pages = [
    {
      pathname: '',
      lastModified: websiteCreatedAt,
      changeFrequency: 'yearly' as const,
      priority: 1.0,
    },
  ]

  return language.flatMap((l) => {
    return pages.map((p) => {
      return {
        url: `${websiteBaseUrl}/${l}/${p.pathname}`,
        priority: p.priority,
        lastModified: p.lastModified,
        changeFrequency: p.changeFrequency,
      }
    })
  })
}
