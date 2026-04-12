"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gauge, Wind, ArrowUp, Droplets, Atom, Scale } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"
import type { LucideIcon } from "lucide-react"

type CalculatorKey = "pressure" | "airConsumption" | "henrysLaw" | "gasLaws" | "liftDisplacement" | "weight"

const calculatorConfig: { id: string; key: CalculatorKey; icon: LucideIcon }[] = [
  { id: "pressure", key: "pressure", icon: Gauge },
  { id: "air-consumption", key: "airConsumption", icon: Wind },
  { id: "henrys-law", key: "henrysLaw", icon: Droplets },
  { id: "gas-laws", key: "gasLaws", icon: Atom },
  { id: "lift-displacement", key: "liftDisplacement", icon: ArrowUp },
  { id: "weight", key: "weight", icon: Scale },
]

export function CalculatorGrid() {
  const { t } = useI18n()

  return (
    <section id="calculators" className="py-24 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.calculatorGrid.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.calculatorGrid.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculatorConfig.map((calc) => {
            const Icon = calc.icon
            const calcTranslation = t.calculators[calc.key]
            return (
              <Card
                key={calc.id}
                className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{calcTranslation.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">{calcTranslation.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {calcTranslation.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button className="w-full bg-black hover:bg-black/90 text-white" asChild>
                      <a href={`/calculators/${calc.id}#theory`}>{t.calculatorGrid.learnTheory}</a>
                    </Button>
                    <Button className="w-full" variant="default" asChild>
                      <a href={`/calculators/${calc.id}`}>{t.calculatorGrid.openCalculator}</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
