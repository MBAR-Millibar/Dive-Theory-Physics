"use client"

import { GasLawsCalculator } from "@/components/calculators/gas-laws-calculator"
import { CalculatorHeader } from "@/components/calculator-header"

export default function GasLawsCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <CalculatorHeader />
      <GasLawsCalculator />
    </div>
  )
}
