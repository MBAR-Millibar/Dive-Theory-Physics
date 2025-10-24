import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gauge, Wind, ArrowUp, Droplets, Atom, Scale } from "lucide-react"

const calculators = [
  {
    id: "pressure",
    title: "Pressure",
    description: "Calculate absolute pressure, gauge pressure, and partial pressures at different depths",
    icon: Gauge,
    features: ["Absolute Pressure", "Partial Pressure", "Depth Conversion"],
  },
  {
    id: "air-consumption",
    title: "Air Consumption",
    description: "Calculate air consumption rates at various depths and plan your dive accordingly",
    icon: Wind,
    features: ["SAC Rate", "RMV Calculation", "Tank Planning"],
  },
  {
    id: "henrys-law",
    title: "Decompression",
    description: "Understand gas dissolution, tissue saturation, and decompression theory (Henry's Law)",
    icon: Droplets,
    features: ["Gas Dissolution", "Tissue Saturation", "Dive Planning"],
  },
  {
    id: "gas-laws",
    title: "Gas Laws",
    description: "Explore Boyle's, Charles's, and Gay-Lussac's laws and their applications in diving",
    icon: Atom,
    features: ["Boyle's Law", "Charles's Law", "Combined Gas Law"],
  },
  {
    id: "lift-displacement",
    title: "Buoyancy & Displacement",
    description: "Calculate buoyancy, lift requirements, and water displacement for diving operations",
    icon: ArrowUp,
    features: ["Buoyancy Force", "Lift Bags", "Water Displacement"],
  },
  {
    id: "weight",
    title: "Lifting Operations",
    description: "Calculate buoyancy requirements to lift submerged objects using lift bags or flotation devices",
    icon: Scale,
    features: ["Negative Buoyancy", "Lift Requirements", "Safety Margins"],
  },
]

export function CalculatorGrid() {
  return (
    <section id="calculators" className="py-24 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Diving Physics Topics</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interactive tools to help you understand and apply diving physics principles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculators.map((calc) => {
            const Icon = calc.icon
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
                    <CardTitle className="text-xl">{calc.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">{calc.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {calc.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button className="w-full" variant="default" asChild>
                      <a href={`/calculators/${calc.id}`}>Open Calculator</a>
                    </Button>
                    <Button className="w-full bg-black hover:bg-black/90 text-white" asChild>
                      <a href={`/calculators/${calc.id}#theory`}>Open Theory</a>
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
