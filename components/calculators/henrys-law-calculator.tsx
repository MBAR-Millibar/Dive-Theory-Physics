"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Droplets, AlertTriangle, Info, Calculator, Home } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface HenrysLawResults {
  dissolvedGas?: number
  saturationTime?: number
  desaturationTime?: number
  pressureGradient?: number
}

export function HenrysLawCalculator() {
  const [activeTab, setActiveTab] = useState<string>("calculator")
  const [calculationType, setCalculationType] = useState<string>("dissolution")

  // Dissolution state
  const [partialPressure, setPartialPressure] = useState<string>("3.16")
  const [solubilityCoefficient, setSolubilityCoefficient] = useState<string>("0.015")
  const [liquidVolume, setLiquidVolume] = useState<string>("1")

  // Saturation/Desaturation state
  const [initialPressure, setInitialPressure] = useState<string>("0.79")
  const [finalPressure, setFinalPressure] = useState<string>("3.16")
  const [tissueType, setTissueType] = useState<string>("medium")

  // Decompression planning state
  const [diveDepth, setDiveDepth] = useState<string>("30")
  const [diveTime, setDiveTime] = useState<string>("25")
  const [surfaceInterval, setSurfaceInterval] = useState<string>("60")

  const [results, setResults] = useState<HenrysLawResults | null>(null)

  useEffect(() => {
    if (window.location.hash === "#theory") {
      setActiveTab("theory")
    }
  }, [])

  const calculateDissolution = () => {
    const pp = Number.parseFloat(partialPressure)
    const k = Number.parseFloat(solubilityCoefficient)
    const v = Number.parseFloat(liquidVolume)

    if (!isNaN(pp) && !isNaN(k) && !isNaN(v)) {
      const dissolvedGas = k * pp * v
      return { dissolvedGas }
    }
    return {}
  }

  const calculateSaturation = () => {
    const p1 = Number.parseFloat(initialPressure)
    const p2 = Number.parseFloat(finalPressure)

    const halfTimes: { [key: string]: number } = {
      fast: 5,
      medium: 20,
      slow: 80,
    }

    const halfTime = halfTimes[tissueType] || 20

    if (!isNaN(p1) && !isNaN(p2)) {
      const pressureGradient = p2 - p1
      const saturationTime = halfTime * 4.3
      const desaturationTime = halfTime * 6

      return {
        pressureGradient,
        saturationTime,
        desaturationTime,
      }
    }
    return {}
  }

  const calculateDecompression = () => {
    const depth = Number.parseFloat(diveDepth)
    const time = Number.parseFloat(diveTime)
    const si = Number.parseFloat(surfaceInterval)

    if (!isNaN(depth) && !isNaN(time) && !isNaN(si)) {
      const pressure = depth / 10 + 1
      const nitrogenPressure = pressure * 0.79
      const loading = nitrogenPressure * (time / 60)
      const offGassing = si / 60

      return {
        dissolvedGas: loading,
        desaturationTime: offGassing,
        pressureGradient: nitrogenPressure - 0.79,
      }
    }
    return {}
  }

  const calculateHenrysLaw = () => {
    let result: HenrysLawResults = {}

    if (calculationType === "dissolution") {
      result = calculateDissolution()
    } else if (calculationType === "saturation") {
      result = calculateSaturation()
    } else if (calculationType === "planner") {
      result = calculateDecompression()
    }

    setResults(result)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-start justify-between mb-4">
        <div className="text-center flex-1">
          <h1 className="text-3xl font-bold text-foreground mb-2">Decompression Theory</h1>
          <p className="text-muted-foreground">
            Understand gas dissolution, tissue saturation, and decompression principles (Henry's Law)
          </p>
        </div>
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
                  Calculation Parameters
                </CardTitle>
                <CardDescription>Select calculation type and enter parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="calculation-type">Calculation Type</Label>
                  <Select value={calculationType} onValueChange={setCalculationType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dissolution">Gas Dissolution (C = k × P)</SelectItem>
                      <SelectItem value="saturation">Tissue Saturation</SelectItem>
                      <SelectItem value="planner">Dive Planner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Gas Dissolution Inputs */}
                {calculationType === "dissolution" && (
                  <>
                    <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                      Gas Dissolution
                    </h4>
                    <div className="space-y-2">
                      <Label htmlFor="partial-pressure">Partial Pressure (bar)</Label>
                      <Input
                        id="partial-pressure"
                        type="number"
                        value={partialPressure}
                        onChange={(e) => setPartialPressure(e.target.value)}
                        placeholder="3.16"
                        step="0.01"
                      />
                      <p className="text-xs text-muted-foreground">
                        Example: PN₂ at 30m depth = 3.16 bar (4 bar total × 0.79)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="solubility">Solubility Coefficient (k)</Label>
                      <Input
                        id="solubility"
                        type="number"
                        value={solubilityCoefficient}
                        onChange={(e) => setSolubilityCoefficient(e.target.value)}
                        placeholder="0.015"
                        step="0.001"
                      />
                      <p className="text-xs text-muted-foreground">N₂ in water at 37°C ≈ 0.015 mL/(mL·bar)</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="liquid-volume">Liquid Volume (L)</Label>
                      <Input
                        id="liquid-volume"
                        type="number"
                        value={liquidVolume}
                        onChange={(e) => setLiquidVolume(e.target.value)}
                        placeholder="1"
                        step="0.1"
                      />
                    </div>
                  </>
                )}

                {/* Tissue Saturation Inputs */}
                {calculationType === "saturation" && (
                  <>
                    <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                      Tissue Saturation
                    </h4>
                    <div className="space-y-2">
                      <Label htmlFor="initial-pressure">Initial N₂ Pressure (bar)</Label>
                      <Input
                        id="initial-pressure"
                        type="number"
                        value={initialPressure}
                        onChange={(e) => setInitialPressure(e.target.value)}
                        placeholder="0.79"
                        step="0.01"
                      />
                      <p className="text-xs text-muted-foreground">Surface PN₂ = 0.79 bar</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="final-pressure">Final N₂ Pressure (bar)</Label>
                      <Input
                        id="final-pressure"
                        type="number"
                        value={finalPressure}
                        onChange={(e) => setFinalPressure(e.target.value)}
                        placeholder="3.16"
                        step="0.01"
                      />
                      <p className="text-xs text-muted-foreground">At 30m: PN₂ = 3.16 bar</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Tissue Type</Label>
                      <Select value={tissueType} onValueChange={setTissueType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fast">Fast (5 min half-time)</SelectItem>
                          <SelectItem value="medium">Medium (20 min half-time)</SelectItem>
                          <SelectItem value="slow">Slow (80 min half-time)</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Different tissues absorb/release gas at different rates
                      </p>
                    </div>
                  </>
                )}

                {/* Dive Planner Inputs */}
                {calculationType === "planner" && (
                  <>
                    <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                      Dive Planning
                    </h4>
                    <div className="space-y-2">
                      <Label htmlFor="dive-depth">Dive Depth (meters)</Label>
                      <Input
                        id="dive-depth"
                        type="number"
                        value={diveDepth}
                        onChange={(e) => setDiveDepth(e.target.value)}
                        placeholder="30"
                        step="1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dive-time">Dive Time (minutes)</Label>
                      <Input
                        id="dive-time"
                        type="number"
                        value={diveTime}
                        onChange={(e) => setDiveTime(e.target.value)}
                        placeholder="25"
                        step="1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="surface-interval">Surface Interval (minutes)</Label>
                      <Input
                        id="surface-interval"
                        type="number"
                        value={surfaceInterval}
                        onChange={(e) => setSurfaceInterval(e.target.value)}
                        placeholder="60"
                        step="1"
                      />
                    </div>

                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                      <p className="text-xs text-amber-900 dark:text-amber-200">
                        <strong>Warning:</strong> This is a simplified educational tool. Always use proper dive tables
                        or computers for actual dive planning.
                      </p>
                    </div>
                  </>
                )}

                <Button onClick={calculateHenrysLaw} className="w-full" size="lg">
                  Calculate
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card>
              <CardHeader>
                <CardTitle>Calculation Results</CardTitle>
                <CardDescription>
                  {calculationType === "dissolution" && "Amount of gas dissolved"}
                  {calculationType === "saturation" && "Tissue loading times"}
                  {calculationType === "planner" && "Nitrogen loading analysis"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {results && Object.keys(results).length > 0 ? (
                  <div className="space-y-4">
                    {/* Dissolution Results */}
                    {calculationType === "dissolution" && results.dissolvedGas !== undefined && (
                      <>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium flex items-center gap-1">
                            <Droplets className="h-4 w-4" />
                            Dissolved Gas
                          </Label>
                          <Badge variant="secondary" className="text-base px-3 py-1">
                            {results.dissolvedGas.toFixed(3)} L
                          </Badge>
                        </div>
                        <Separator />
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            <strong>Diving Application:</strong> This shows how much nitrogen dissolves into your body
                            tissues at depth. The deeper you go and the longer you stay, the more nitrogen dissolves.
                          </p>
                        </div>
                      </>
                    )}

                    {/* Saturation Results */}
                    {calculationType === "saturation" && results.saturationTime !== undefined && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium flex items-center gap-1">
                              <Info className="h-4 w-4" />
                              Pressure Gradient
                            </Label>
                            <Badge variant="secondary" className="text-base px-3 py-1">
                              {results.pressureGradient?.toFixed(2)} bar
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">95% Saturation</Label>
                            <Badge variant="secondary" className="text-base px-3 py-1">
                              {results.saturationTime.toFixed(0)} min
                            </Badge>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Safe Desaturation Time:</span>
                            <span className="text-lg font-bold text-primary">
                              {results.desaturationTime?.toFixed(0)} min
                            </span>
                          </div>
                        </div>

                        <Separator />

                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            <strong>Diving Application:</strong> Fast tissues (like blood) saturate quickly but also
                            desaturate quickly. Slow tissues (like joints) take longer to saturate but also take longer
                            to off-gas.
                          </p>
                        </div>
                      </>
                    )}

                    {/* Planner Results */}
                    {calculationType === "planner" && results.dissolvedGas !== undefined && (
                      <>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4" />
                              N₂ Pressure Gradient:
                            </span>
                            <span className="text-lg font-bold text-primary">
                              {results.pressureGradient?.toFixed(2)} bar
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Estimated N₂ Loading:</span>
                            <span className="text-lg font-bold text-chart-1">
                              {results.dissolvedGas.toFixed(2)} units
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Off-gassing Progress:</span>
                            <span className="text-lg font-bold text-chart-2">
                              {results.desaturationTime?.toFixed(2)} units
                            </span>
                          </div>
                        </div>

                        <Separator />

                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            <strong>Key Principle:</strong> Henry's Law is the foundation of all decompression models.
                            Your dive computer or tables use complex algorithms based on this law to keep you safe.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Droplets className="h-12 w-12 mx-auto mb-4 opacity-50" />
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
                Decompression Theory & Henry's Law
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Henry's Law Basics</h3>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="font-mono text-lg">C = k × P</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Concentration = Solubility Coefficient × Partial Pressure
                  </p>
                </div>
                <p className="text-muted-foreground">
                  The amount of gas that dissolves into a liquid is directly proportional to the partial pressure of
                  that gas in contact with the liquid. Higher pressure means more gas dissolves; lower pressure means
                  gas comes out of solution.
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Saturation & Desaturation</h3>
                <p className="text-muted-foreground">
                  When gas pressure in tissues equals ambient pressure, tissues are saturated. When you ascend, tissues
                  become supersaturated and must off-gas. Different tissue types have different half-times:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    • <strong>Fast tissues:</strong> Blood, brain (5-10 min half-time)
                  </li>
                  <li>
                    • <strong>Medium tissues:</strong> Muscle (20-40 min half-time)
                  </li>
                  <li>
                    • <strong>Slow tissues:</strong> Joints, fat (80-120 min half-time)
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Decompression Sickness (DCS)</h3>
                <p className="text-muted-foreground">
                  If you ascend too quickly, the pressure gradient becomes too large and nitrogen forms bubbles instead
                  of dissolving out gradually. This causes decompression sickness.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    • <strong>Prevention:</strong> Follow dive computer/table limits
                  </li>
                  <li>
                    • <strong>Ascent rate:</strong> Maximum 9-10m/min
                  </li>
                  <li>
                    • <strong>Safety stops:</strong> 3-5 minutes at 5m depth
                  </li>
                  <li>
                    • <strong>Hydration:</strong> Stay well hydrated before and after diving
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Diving Applications</h3>
                <p className="text-muted-foreground">
                  Henry's Law is the foundation of all decompression theory and dive planning. It's used for:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• No-decompression limit calculations</li>
                  <li>• Repetitive dive planning and surface interval requirements</li>
                  <li>• Flying after diving guidelines (12-24 hours)</li>
                  <li>• Technical diving gas switches and decompression stops</li>
                </ul>
              </div>

              <Separator />

              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <h4 className="font-semibold text-amber-900 dark:text-amber-200 mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Important Safety Note
                </h4>
                <p className="text-sm text-amber-900 dark:text-amber-200">
                  Understanding Henry's Law helps you appreciate why dive computers and tables work the way they do.
                  However, this calculator is for educational purposes only. Always use proper dive planning tools and
                  follow your training for actual dives. Never exceed your certification limits.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
