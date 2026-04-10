"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n/context"
import { LanguageSelector } from "@/components/language-selector"

export function CalculatorHeader() {
  const { t } = useI18n()

  return (
    <div className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/">
          <Button variant="default" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t.common.backToHome}
          </Button>
        </Link>
        <LanguageSelector />
      </div>
    </div>
  )
}
