import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { CalculatorGrid } from "@/components/calculator-grid"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <CalculatorGrid />
    </div>
  )
}
