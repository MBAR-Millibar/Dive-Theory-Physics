"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n/context"
import { exportStrings } from "@/lib/i18n/export-strings"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/language-selector"
import { Download, ArrowLeft } from "lucide-react"

export function ExportToolbar() {
  const { locale } = useI18n()
  const e = exportStrings[locale]
  const [preparing, setPreparing] = useState(false)

  const handleDownload = () => {
    setPreparing(true)
    // Give the browser a tick to render the "preparing" state, then open print dialog.
    setTimeout(() => {
      window.print()
      setPreparing(false)
    }, 100)
  }

  return (
    <div className="print:hidden sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {e.backToHome}
        </a>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <Button onClick={handleDownload} disabled={preparing} className="gap-2">
            <Download className="h-4 w-4" />
            {preparing ? e.preparing : e.downloadPdf}
          </Button>
        </div>
      </div>
    </div>
  )
}
