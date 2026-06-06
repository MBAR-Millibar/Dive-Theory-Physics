"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Waves } from "lucide-react"
import { LanguageSelector } from "@/components/language-selector"
import { useI18n } from "@/lib/i18n/context"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useI18n()

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Waves className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Dive Theory</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              {t.nav.about}
            </a>
            <a href="/#calculators" className="text-muted-foreground hover:text-foreground transition-colors">
              {t.nav.topics}
            </a>
            <a href="/export" className="text-muted-foreground hover:text-foreground transition-colors">
              {t.nav.exportPdf}
            </a>
            <LanguageSelector />
          </div>

          <div className="md:hidden flex items-center gap-2">
            <LanguageSelector />
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <a href="/#calculators" className="text-muted-foreground hover:text-foreground transition-colors">
                {t.nav.calculators}
              </a>
              <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                {t.nav.about}
              </a>
              <a href="/export" className="text-muted-foreground hover:text-foreground transition-colors">
                {t.nav.exportPdf}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
