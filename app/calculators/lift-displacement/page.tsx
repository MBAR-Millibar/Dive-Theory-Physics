"use client"

import { LiftDisplacementCalculator } from "@/components/calculators/lift-displacement-calculator"
import { CalculatorHeader } from "@/components/calculator-header"

export default function LiftDisplacementCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <CalculatorHeader />
      <LiftDisplacementCalculator />
    </div>
  )
}
