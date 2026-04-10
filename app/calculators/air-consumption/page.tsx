"use client"

import { AirConsumptionCalculator } from "@/components/calculators/air-consumption-calculator"
import { CalculatorHeader } from "@/components/calculator-header"

export default function AirConsumptionCalculatorPage() {
  return (
    <div className="min-h-screen bg-background">
      <CalculatorHeader />
      <AirConsumptionCalculator />
    </div>
  )
}
