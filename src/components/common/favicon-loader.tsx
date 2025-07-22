'use client'

import { useEffect } from 'react'

export function FaviconLoader() {
  useEffect(() => {
    // Dynamically update favicon based on theme
    const favicon = document.querySelector(
      'link[rel="icon"]'
    ) as HTMLLinkElement
    if (favicon) {
      favicon.href = '/favicon.ico'
    }

    // Add loading states for icons
    const icons = document.querySelectorAll('link[rel*="icon"]')
    icons.forEach((icon) => {
      icon.addEventListener('load', () => {
        console.log(`Icon loaded: ${(icon as HTMLLinkElement).href}`)
      })
      icon.addEventListener('error', () => {
        console.error(`Icon failed to load: ${(icon as HTMLLinkElement).href}`)
      })
    })
  }, [])

  return null
}
