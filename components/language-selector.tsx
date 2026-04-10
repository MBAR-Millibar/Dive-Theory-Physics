"use client"

import { useState, useRef, useEffect } from "react"
import { useI18n, locales } from "@/lib/i18n/context"
import { ChevronDown } from "lucide-react"
import type { Locale } from "@/lib/i18n/translations"

export function LanguageSelector() {
  const { locale, setLocale } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLocale = locales.find((l) => l.code === locale) || locales[0]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (code: string) => {
    setLocale(code as Locale)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-lg leading-none">{currentLocale.flag}</span>
        <span className="hidden sm:inline">{currentLocale.name}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 min-w-[150px] rounded-md border border-border bg-popover shadow-md z-50">
          <ul role="listbox" className="py-1">
            {locales.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => handleSelect(l.code)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors ${
                    locale === l.code ? "bg-accent/50" : ""
                  }`}
                  role="option"
                  aria-selected={locale === l.code}
                >
                  <span className="text-lg leading-none">{l.flag}</span>
                  <span>{l.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
