"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export function Hero() {
  const { t } = useI18n()

  const scrollToCalculators = () => {
    const calculatorsSection = document.getElementById("calculators")
    if (calculatorsSection) {
      calculatorsSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">{t.hero.title}</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          {t.hero.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8" onClick={scrollToCalculators}>
            {t.hero.startLearning}
          </Button>
        </div>
        <div className="mt-12 animate-bounce">
          <ArrowDown className="h-6 w-6 text-muted-foreground mx-auto" />
        </div>
      </div>
    </section>
  )
}
