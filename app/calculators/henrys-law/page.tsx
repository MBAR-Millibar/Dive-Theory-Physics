"use client"

import { HenrysLawCalculator } from "@/components/calculators/henrys-law-calculator"
import { CalculatorHeader } from "@/components/calculator-header"

export default function HenrysLawPage() {
  return (
    <div className="min-h-screen bg-background">
      <CalculatorHeader />
      <HenrysLawCalculator />
    </div>
  )
}
