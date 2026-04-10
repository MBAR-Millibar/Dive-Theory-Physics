"use client"

import { PressureCalculator } from "@/components/calculators/pressure-calculator"
import { CalculatorHeader } from "@/components/calculator-header"

export default function PressureCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <CalculatorHeader />
      <PressureCalculator />
    </div>
  )
}
