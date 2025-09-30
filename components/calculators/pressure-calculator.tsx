"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calculator, Info } from "lucide-react"

interface PressureResults {
  absolutePressure: number
  gaugePressure: number
  partialPressureO2: number
  partialPressureN2: number
  atmospheres: number
}

export function PressureCalculator() {
  const [activeTab, setActiveTab] = useState<string>("calculator")
  const [depth, setDepth] = useState<string>("30")
  const [oxygenPercentage, setOxygenPercentage] = useState<string>("21")
  const [results, setResults] = useState<PressureResults | null>(null)

  useEffect(() => {
    if (window.location.hash === "#theory") {
      setActiveTab("theory")
    }
  }, [])

  const calculatePressure = () => {
    const depthMeters = Number.parseFloat(depth)
    const o2Percent = Number.parseFloat(oxygenPercentage) / 100

    if (isNaN(depthMeters) || isNaN(o2Percent)) return

    // Pressure calculations
    const atmospheres = 1 + depthMeters / 10 // 1 ATM per 10m depth
    const absolutePressure = atmospheres * 1.01325 // Convert to bar
    const gaugePressure = absolutePressure - 1.01325 // Gauge pressure (excluding surface pressure)
    const partialPressureO2 = absolutePressure * o2Percent
    const partialPressureN2 = absolutePressure * (1 - o2Percent)

    setResults({
      absolutePressure,
      gaugePressure,
      partialPressureO2,
      partialPressureN2,
      atmospheres,
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Pressure Calculator</h1>
        <p className="text-muted-foreground">
          Calculate absolute pressure, gauge pressure, and partial pressures at different depths
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="theory">Theory</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Input Parameters
                </CardTitle>
                <CardDescription>Enter your diving parameters to calculate pressures</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="depth">Depth (meters)</Label>
                  <Input
                    id="depth"
                    type="number"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    placeholder="Enter depth in meters"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="oxygen">Oxygen Percentage (%)</Label>
                  <Input
                    id="oxygen"
                    type="number"
                    value={oxygenPercentage}
                    onChange={(e) => setOxygenPercentage(e.target.value)}
                    placeholder="Enter oxygen percentage"
                    min="1"
                    max="100"
                    step="0.1"
                  />
                </div>

                <Button onClick={calculatePressure} className="w-full" size="lg">
                  Calculate Pressures
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card>
              <CardHeader>
                <CardTitle>Pressure Results</CardTitle>
                <CardDescription>Calculated pressure values for your dive parameters</CardDescription>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Depth</Label>
                        <Badge variant="secondary" className="text-base px-3 py-1">
                          {depth}m
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Atmospheres</Label>
                        <Badge variant="secondary" className="text-base px-3 py-1">
                          {results.atmospheres.toFixed(1)} ATM
                        </Badge>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Absolute Pressure:</span>
                        <span className="text-lg font-bold text-primary">
                          {results.absolutePressure.toFixed(2)} bar
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Gauge Pressure:</span>
                        <span className="text-lg font-bold text-primary">{results.gaugePressure.toFixed(2)} bar</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                        Partial Pressures
                      </h4>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Oxygen (O₂):</span>
                        <span className="text-lg font-bold text-chart-1">
                          {results.partialPressureO2.toFixed(2)} bar
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Nitrogen (N₂):</span>
                        <span className="text-lg font-bold text-chart-2">
                          {results.partialPressureN2.toFixed(2)} bar
                        </span>
                      </div>
                    </div>

                    {/* Safety Warnings */}
                    {results.partialPressureO2 > 1.4 && (
                      <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <p className="text-sm text-destructive font-medium">
                          ⚠️ Warning: O₂ partial pressure exceeds 1.4 bar - risk of oxygen toxicity
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Enter parameters and click calculate to see results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="theory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Pressure Theory
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Absolute Pressure</h3>
                <p className="text-muted-foreground">
                  The total pressure exerted on a diver, including atmospheric pressure at the surface plus the pressure
                  from the water column above. Calculated as: <strong>P = 1 + (depth ÷ 10) atmospheres</strong>
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Gauge Pressure</h3>
                <p className="text-muted-foreground">
                  The pressure reading on a gauge, which excludes atmospheric pressure. It represents only the pressure
                  from the water column: <strong>Gauge Pressure = Absolute Pressure - 1 atmosphere</strong>
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Partial Pressure</h3>
                <p className="text-muted-foreground">
                  The pressure exerted by each individual gas in a mixture. For oxygen:{" "}
                  <strong>PPO₂ = Absolute Pressure × O₂ fraction</strong>. Critical for avoiding oxygen toxicity (PPO₂
                  {">"} 1.4 bar is dangerous).
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Key Safety Limits</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    • <strong>PPO₂ {"<"} 1.4 bar:</strong> Safe for recreational diving
                  </li>
                  <li>
                    • <strong>PPO₂ {">"} 1.4 bar:</strong> Risk of oxygen toxicity
                  </li>
                  <li>
                    • <strong>PPN₂ {">"} 3.2 bar:</strong> Increased nitrogen narcosis risk
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
