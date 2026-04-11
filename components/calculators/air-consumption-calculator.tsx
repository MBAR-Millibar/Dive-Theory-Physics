"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wind, Calculator, Info, Clock, Gauge } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

interface AirConsumptionResults {
  sacRate: number
  rmv: number
  airTimeAtDepth: number
  totalAirNeeded: number
  safetyReserve: number
}

export function AirConsumptionCalculator() {
  const { t } = useI18n()
  const [activeTab, setActiveTab] = useState<string>("calculator")
  const [surfaceConsumption, setSurfaceConsumption] = useState<string>("15")
  const [depth, setDepth] = useState<string>("30")
  const [diveTime, setDiveTime] = useState<string>("45")
  const [tankSize, setTankSize] = useState<string>("12")
  const [startPressure, setStartPressure] = useState<string>("200")
  const [endPressure, setEndPressure] = useState<string>("50")
  const [waterType, setWaterType] = useState<string>("saltwater")
  const [results, setResults] = useState<AirConsumptionResults | null>(null)

  useEffect(() => {
    if (window.location.hash === "#theory") {
      setActiveTab("theory")
    }
  }, [])

  const calculateAirConsumption = () => {
    const surfaceRate = Number.parseFloat(surfaceConsumption)
    const depthMeters = Number.parseFloat(depth)
    const timeMinutes = Number.parseFloat(diveTime)
    const tankVolume = Number.parseFloat(tankSize)
    const startBar = Number.parseFloat(startPressure)
    const endBar = Number.parseFloat(endPressure)

    if (
      isNaN(surfaceRate) ||
      isNaN(depthMeters) ||
      isNaN(timeMinutes) ||
      isNaN(tankVolume) ||
      isNaN(startBar) ||
      isNaN(endBar)
    )
      return

    // Calculate pressure at depth
    const absolutePressure = waterType === "saltwater" ? 1 + depthMeters / 10 : 1 + depthMeters / 10.3

    // SAC Rate (Surface Air Consumption) - liters per minute at surface
    const sacRate = surfaceRate

    // RMV (Respiratory Minute Volume) at depth
    const rmv = sacRate * absolutePressure

    // Air time at depth with current tank
    const usableAir = (startBar - endBar) * tankVolume
    const airTimeAtDepth = usableAir / rmv

    // Total air needed for planned dive
    const totalAirNeeded = rmv * timeMinutes

    // Safety reserve (typically 50 bar)
    const safetyReserve = 50 * tankVolume

    setResults({
      sacRate,
      rmv,
      airTimeAtDepth,
      totalAirNeeded,
      safetyReserve,
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">{t.calculators.airConsumption.title}</h1>
        <p className="text-muted-foreground">{t.calculators.airConsumption.description}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculator">{t.calculatorUI.tabs.calculator}</TabsTrigger>
          <TabsTrigger value="theory">{t.calculatorUI.tabs.theory}</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Dive Parameters
                </CardTitle>
                <CardDescription>Enter your diving and equipment parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="surface-consumption">SAC Rate (L/min)</Label>
                    <Input
                      id="surface-consumption"
                      type="number"
                      value={surfaceConsumption}
                      onChange={(e) => setSurfaceConsumption(e.target.value)}
                      placeholder="15"
                      min="5"
                      max="30"
                      step="0.5"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="depth">Depth (meters)</Label>
                    <Input
                      id="depth"
                      type="number"
                      value={depth}
                      onChange={(e) => setDepth(e.target.value)}
                      placeholder="30"
                      min="0"
                      step="1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dive-time">Planned Dive Time (minutes)</Label>
                  <Input
                    id="dive-time"
                    type="number"
                    value={diveTime}
                    onChange={(e) => setDiveTime(e.target.value)}
                    placeholder="45"
                    min="1"
                    step="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="water-type">Water Type</Label>
                  <Select value={waterType} onValueChange={setWaterType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saltwater">Saltwater (1 ATM/10m)</SelectItem>
                      <SelectItem value="freshwater">Freshwater (1 ATM/10.3m)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  Tank Information
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tank-size">Tank Size (liters)</Label>
                    <Input
                      id="tank-size"
                      type="number"
                      value={tankSize}
                      onChange={(e) => setTankSize(e.target.value)}
                      placeholder="12"
                      min="1"
                      step="1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="start-pressure">Start Pressure (bar)</Label>
                    <Input
                      id="start-pressure"
                      type="number"
                      value={startPressure}
                      onChange={(e) => setStartPressure(e.target.value)}
                      placeholder="200"
                      min="1"
                      step="1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-pressure">Reserve Pressure (bar)</Label>
                  <Input
                    id="end-pressure"
                    type="number"
                    value={endPressure}
                    onChange={(e) => setEndPressure(e.target.value)}
                    placeholder="50"
                    min="1"
                    step="1"
                  />
                </div>

                <Button onClick={calculateAirConsumption} className="w-full" size="lg">
                  {t.calculatorUI.buttons.calculateAirConsumption}
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card>
              <CardHeader>
                <CardTitle>Air Consumption Results</CardTitle>
                <CardDescription>Calculated air consumption and dive planning data</CardDescription>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium flex items-center gap-1">
                          <Wind className="h-4 w-4" />
                          SAC Rate
                        </Label>
                        <Badge variant="secondary" className="text-base px-3 py-1">
                          {results.sacRate} L/min
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium flex items-center gap-1">
                          <Gauge className="h-4 w-4" />
                          RMV at Depth
                        </Label>
                        <Badge variant="secondary" className="text-base px-3 py-1">
                          {results.rmv.toFixed(1)} L/min
                        </Badge>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Air Time Available:
                        </span>
                        <span className="text-lg font-bold text-primary">{results.airTimeAtDepth.toFixed(0)} min</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Air Needed for Dive:</span>
                        <span className="text-lg font-bold text-chart-1">{results.totalAirNeeded.toFixed(0)} L</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Safety Reserve:</span>
                        <span className="text-lg font-bold text-chart-2">{results.safetyReserve.toFixed(0)} L</span>
                      </div>
                    </div>

                    <Separator />

                    {/* Dive Planning Recommendations */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                        Dive Planning
                      </h4>

                      {results.airTimeAtDepth < Number.parseFloat(diveTime) && (
                        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                          <p className="text-sm text-destructive font-medium">
                            ⚠️ Warning: Insufficient air for planned dive time
                          </p>
                        </div>
                      )}

                      {results.airTimeAtDepth >= Number.parseFloat(diveTime) && (
                        <div className="p-3 bg-chart-4/10 border border-chart-4/20 rounded-lg">
                          <p className="text-sm text-chart-4 font-medium">
                            ✓ Sufficient air for planned dive with{" "}
                            {(results.airTimeAtDepth - Number.parseFloat(diveTime)).toFixed(0)} min buffer
                          </p>
                        </div>
                      )}

                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>
                          • Recommended max dive time: <strong>{(results.airTimeAtDepth * 0.8).toFixed(0)} min</strong>{" "}
                          (80% rule)
                        </p>
                        <p>
                          • Turn pressure:{" "}
                          <strong>
                            {(
                              Number.parseFloat(startPressure) -
                              results.totalAirNeeded / Number.parseFloat(tankSize)
                            ).toFixed(0)}{" "}
                            bar
                          </strong>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Wind className="h-12 w-12 mx-auto mb-4 opacity-50" />
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
                {t.theory.airConsumption.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t.theory.airConsumption.sacRateTitle}</h3>
                <p className="text-muted-foreground">
                  {t.theory.airConsumption.sacRateDesc}{" "}
                  <strong>{t.theory.airConsumption.sacRateTypical}</strong>
                </p>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t.theory.airConsumption.rmvTitle}</h3>
                <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.theory.airConsumption.rmvDesc }} />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t.theory.airConsumption.planningRulesTitle}</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    • <strong>{t.theory.airConsumption.ruleOfThirds}</strong> {t.theory.airConsumption.ruleOfThirdsDesc}
                  </li>
                  <li>
                    • <strong>{t.theory.airConsumption.rule80}</strong> {t.theory.airConsumption.rule80Desc}
                  </li>
                  <li>
                    • <strong>{t.theory.airConsumption.turnPressure}</strong> {t.theory.airConsumption.turnPressureDesc}
                  </li>
                  <li>
                    • <strong>{t.theory.airConsumption.safetyReserve}</strong> {t.theory.airConsumption.safetyReserveDesc}
                  </li>
                </ul>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t.theory.airConsumption.factorsTitle}</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    • <strong>{t.theory.airConsumption.factorExperience}</strong> {t.theory.airConsumption.factorExperienceDesc}
                  </li>
                  <li>
                    • <strong>{t.theory.airConsumption.factorFitness}</strong> {t.theory.airConsumption.factorFitnessDesc}
                  </li>
                  <li>
                    • <strong>{t.theory.airConsumption.factorTemperature}</strong> {t.theory.airConsumption.factorTemperatureDesc}
                  </li>
                  <li>
                    • <strong>{t.theory.airConsumption.factorCurrent}</strong> {t.theory.airConsumption.factorCurrentDesc}
                  </li>
                  <li>
                    • <strong>{t.theory.airConsumption.factorStress}</strong> {t.theory.airConsumption.factorStressDesc}
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
