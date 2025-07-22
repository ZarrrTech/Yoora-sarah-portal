'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    window.addEventListener('beforeinstallprompt', handler as EventListener)

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handler as EventListener
      )
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('PWA install accepted')
    } else {
      console.log('PWA install dismissed')
    }

    setDeferredPrompt(null)
    setShowInstallPrompt(false)
  }

  if (!showInstallPrompt) return null

  return (
    <div className="fixed right-4 bottom-4 left-4 z-50 rounded-lg bg-blue-600 p-4 text-white shadow-lg md:right-4 md:left-auto md:w-80">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <Image
            src="/icon-192x192.png"
            width={48}
            height={48}
            alt="App icon"
            className="h-8 w-8 rounded"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold">Install Yoora Sarah</h3>
          <p className="text-xs opacity-90">
            Add to home screen for quick access
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowInstallPrompt(false)}
            className="rounded border border-white/30 px-3 py-1 text-xs hover:bg-white/10"
          >
            Later
          </button>
          <button
            onClick={handleInstallClick}
            className="rounded bg-white px-3 py-1 text-xs text-blue-600 hover:bg-gray-100"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  )
}
