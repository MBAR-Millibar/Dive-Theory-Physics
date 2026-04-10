"use client"

import { useI18n, locales } from "@/lib/i18n/context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import type { Locale } from "@/lib/i18n/translations"

export function LanguageSelector() {
  const { locale, setLocale } = useI18n()

  const currentLocale = locales.find((l) => l.code === locale) || locales[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 text-base">
          <span className="text-lg leading-none">{currentLocale.flag}</span>
          <span className="hidden sm:inline">{currentLocale.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLocale(l.code as Locale)}
            className={`gap-2 cursor-pointer ${locale === l.code ? "bg-accent" : ""}`}
          >
            <span className="text-lg leading-none">{l.flag}</span>
            <span>{l.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
