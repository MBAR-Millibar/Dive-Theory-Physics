"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Thermometer, Gauge, Beaker } from "lucide-react"

interface GasLawResults {
  charlesLaw: {
    finalVolume?: number
    finalTemperature?: number
  }
  daltonLaw: {
    partialPressures: { gas: string; pressure: number }[]
    totalPressure: number
  }
  gayLussacLaw: {
    finalPressure?: number
    finalTemperature?: number
  }
}

export function GasLawsCalculator() {
  const [mainTab, setMainTab] = useState<string>("calculator")
  const [activeTab, setActiveTab] = useState("charles")

  // Charles's Law state
  const [charlesV1, setCharlesV1] = useState<string>("10")
  const [charlesT1, setCharlesT1] = useState<string>("20")
  const [charlesV2, setCharlesV2] = useState<string>("")
  const [charlesT2, setCharlesT2] = useState<string>("30")
  const [charlesSolveFor, setCharlesSolveFor] = useState<string>("volume")

  // Dalton's Law state
  const [daltonO2, setDaltonO2] = useState<string>("21")
  const [daltonN2, setDaltonN2] = useState<string>("79")
  const [daltonTotalPressure, setDaltonTotalPressure] = useState<string>("4")

  // Gay-Lussac's Law state
  const [gayLussacP1, setGayLussacP1] = useState<string>("1")
  const [gayLussacT1, setGayLussacT1] = useState<string>("20")
  const [gayLussacP2, setGayLussacP2] = useState<string>("")
  const [gayLussacT2, setGayLussacT2] = useState<string>("40")
  const [gayLussacSolveFor, setGayLussacSolveFor] = useState<string>("pressure")

  const [results, setResults] = useState<GasLawResults | null>(null)

  useEffect(() => {
    if (window.location.hash === "#theory") {
      setMainTab("theory")
    }
  }, [])

  const calculateCharlesLaw = () => {
    const v1 = Number.parseFloat(charlesV1)
    const t1 = Number.parseFloat(charlesT1) + 273.15 // Convert to Kelvin
    const v2 = charlesV2 ? Number.parseFloat(charlesV2) : null
    const t2 = Number.parseFloat(charlesT2) + 273.15 // Convert to Kelvin

    if (charlesSolveFor === "volume" && !isNaN(v1) && !isNaN(t1) && !isNaN(t2)) {
      // V2 = V1 * T2 / T1
      const finalVolume = (v1 * t2) / t1
      return { finalVolume }
    } else if (charlesSolveFor === "temperature" && !isNaN(v1) && !isNaN(t1) && v2 && !isNaN(v2)) {
      // T2 = T1 * V2 / V1
      const finalTemperature = (t1 * v2) / v1 - 273.15 // Convert back to Celsius
      return { finalTemperature }
    }
    return {}
  }

  const calculateDaltonLaw = () => {
    const o2Percent = Number.parseFloat(daltonO2) / 100
    const n2Percent = Number.parseFloat(daltonN2) / 100
    const totalP = Number.parseFloat(daltonTotalPressure)

    if (!isNaN(o2Percent) && !isNaN(n2Percent) && !isNaN(totalP)) {
      const partialPressures = [
        { gas: "Oxygen (O₂)", pressure: totalP * o2Percent },
        { gas: "Nitrogen (N₂)", pressure: totalP * n2Percent },
      ]
      return { partialPressures, totalPressure: totalP }
    }
    return { partialPressures: [], totalPressure: 0 }
  }

  const calculateGayLussacLaw = () => {
    const p1 = Number.parseFloat(gayLussacP1)
    const t1 = Number.parseFloat(gayLussacT1) + 273.15 // Convert to Kelvin
    const p2 = gayLussacP2 ? Number.parseFloat(gayLussacP2) : null
    const t2 = Number.parseFloat(gayLussacT2) + 273.15 // Convert to Kelvin

    if (gayLussacSolveFor === "pressure" && !isNaN(p1) && !isNaN(t1) && !isNaN(t2)) {
      // P2 = P1 * T2 / T1
      const finalPressure = (p1 * t2) / t1
      return { finalPressure }
    } else if (gayLussacSolveFor === "temperature" && !isNaN(p1) && !isNaN(t1) && p2 && !isNaN(p2)) {
      // T2 = T1 * P2 / P1
      const finalTemperature = (t1 * p2) / p1 - 273.15 // Convert back to Celsius
      return { finalTemperature }
    }
    return {}
  }

  const calculateGasLaws = () => {
    const charlesResult = calculateCharlesLaw()
    const daltonResult = calculateDaltonLaw()
    const gayLussacResult = calculateGayLussacLaw()

    setResults({
      charlesLaw: charlesResult,
      daltonLaw: daltonResult,
      gayLussacLaw: gayLussacResult,
    })
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Gas Laws Calculator</h1>
        <p className="text-muted-foreground">
          Explore Charles's Law, Dalton's Law, and Gay-Lussac's Law with interactive calculations
        </p>
      </div>

      <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="theory">Theory</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="charles">Charles's Law</TabsTrigger>
              <TabsTrigger value="dalton">Dalton's Law</TabsTrigger>
              <TabsTrigger value="gay-lussac">Gay-Lussac's Law</TabsTrigger>
            </TabsList>

            {/* Charles's Law */}
            <TabsContent value="charles" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Thermometer className="h-5 w-5" />
                      Charles's Law (V₁/T₁ = V₂/T₂)
                    </CardTitle>
                    <CardDescription>
                      Volume is directly proportional to temperature at constant pressure
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Solve for:</Label>
                      <Select value={charlesSolveFor} onValueChange={setCharlesSolveFor}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="volume">Final Volume (V₂)</SelectItem>
                          <SelectItem value="temperature">Final Temperature (T₂)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="charles-v1">Initial Volume (L)</Label>
                        <Input
                          id="charles-v1"
                          type="number"
                          value={charlesV1}
                          onChange={(e) => setCharlesV1(e.target.value)}
                          placeholder="10"
                          step="0.1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="charles-t1">Initial Temp (°C)</Label>
                        <Input
                          id="charles-t1"
                          type="number"
                          value={charlesT1}
                          onChange={(e) => setCharlesT1(e.target.value)}
                          placeholder="20"
                          step="0.1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="charles-v2">
                          Final Volume (L) {charlesSolveFor === "volume" && "(calculated)"}
                        </Label>
                        <Input
                          id="charles-v2"
                          type="number"
                          value={charlesV2}
                          onChange={(e) => setCharlesV2(e.target.value)}
                          placeholder={charlesSolveFor === "volume" ? "calculated" : "enter value"}
                          disabled={charlesSolveFor === "volume"}
                          step="0.1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="charles-t2">
                          Final Temp (°C) {charlesSolveFor === "temperature" && "(calculated)"}
                        </Label>
                        <Input
                          id="charles-t2"
                          type="number"
                          value={charlesT2}
                          onChange={(e) => setCharlesT2(e.target.value)}
                          placeholder={charlesSolveFor === "temperature" ? "calculated" : "30"}
                          disabled={charlesSolveFor === "temperature"}
                          step="0.1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Charles's Law Results</CardTitle>
                    <CardDescription>Temperature and volume relationship</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {results?.charlesLaw ? (
                      <div className="space-y-4">
                        {results.charlesLaw.finalVolume && (
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Final Volume:</span>
                            <span className="text-lg font-bold text-primary">
                              {results.charlesLaw.finalVolume.toFixed(2)} L
                            </span>
                          </div>
                        )}
                        {results.charlesLaw.finalTemperature && (
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Final Temperature:</span>
                            <span className="text-lg font-bold text-primary">
                              {results.charlesLaw.finalTemperature.toFixed(1)} °C
                            </span>
                          </div>
                        )}
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            <strong>Diving Application:</strong> As you ascend and water temperature changes, gas
                            volumes in your BCD and wetsuit will expand or contract according to Charles's Law.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Thermometer className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Enter values and calculate to see results</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Dalton's Law */}
            <TabsContent value="dalton" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Beaker className="h-5 w-5" />
                      Dalton's Law (P_total = P₁ + P₂ + P₃...)
                    </CardTitle>
                    <CardDescription>Total pressure equals sum of partial pressures</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dalton-o2">Oxygen Percentage (%)</Label>
                        <Input
                          id="dalton-o2"
                          type="number"
                          value={daltonO2}
                          onChange={(e) => setDaltonO2(e.target.value)}
                          placeholder="21"
                          min="0"
                          max="100"
                          step="0.1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dalton-n2">Nitrogen Percentage (%)</Label>
                        <Input
                          id="dalton-n2"
                          type="number"
                          value={daltonN2}
                          onChange={(e) => setDaltonN2(e.target.value)}
                          placeholder="79"
                          min="0"
                          max="100"
                          step="0.1"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dalton-total">Total Pressure (bar)</Label>
                      <Input
                        id="dalton-total"
                        type="number"
                        value={daltonTotalPressure}
                        onChange={(e) => setDaltonTotalPressure(e.target.value)}
                        placeholder="4"
                        min="0"
                        step="0.1"
                      />
                    </div>

                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>Note:</strong> Percentages should add up to 100%. Common air mix is 21% O₂, 79% N₂.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Dalton's Law Results</CardTitle>
                    <CardDescription>Partial pressure calculations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {results?.daltonLaw && results.daltonLaw.partialPressures.length > 0 ? (
                      <div className="space-y-4">
                        <div className="space-y-3">
                          {results.daltonLaw.partialPressures.map((gas, index) => (
                            <div key={gas.gas} className="flex justify-between items-center">
                              <span className="font-medium">{gas.gas}:</span>
                              <span className={`text-lg font-bold ${index === 0 ? "text-chart-1" : "text-chart-2"}`}>
                                {gas.pressure.toFixed(2)} bar
                              </span>
                            </div>
                          ))}
                        </div>

                        <Separator />

                        <div className="flex justify-between items-center">
                          <span className="font-medium">Total Pressure:</span>
                          <span className="text-lg font-bold text-primary">
                            {results.daltonLaw.totalPressure.toFixed(2)} bar
                          </span>
                        </div>

                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            <strong>Diving Application:</strong> Understanding partial pressures is crucial for avoiding
                            oxygen toxicity (PPO₂ {">"} 1.4 bar) and nitrogen narcosis.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Beaker className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Enter values and calculate to see results</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Gay-Lussac's Law */}
            <TabsContent value="gay-lussac" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gauge className="h-5 w-5" />
                      Gay-Lussac's Law (P₁/T₁ = P₂/T₂)
                    </CardTitle>
                    <CardDescription>
                      Pressure is directly proportional to temperature at constant volume
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Solve for:</Label>
                      <Select value={gayLussacSolveFor} onValueChange={setGayLussacSolveFor}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pressure">Final Pressure (P₂)</SelectItem>
                          <SelectItem value="temperature">Final Temperature (T₂)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gay-lussac-p1">Initial Pressure (bar)</Label>
                        <Input
                          id="gay-lussac-p1"
                          type="number"
                          value={gayLussacP1}
                          onChange={(e) => setGayLussacP1(e.target.value)}
                          placeholder="1"
                          step="0.1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gay-lussac-t1">Initial Temp (°C)</Label>
                        <Input
                          id="gay-lussac-t1"
                          type="number"
                          value={gayLussacT1}
                          onChange={(e) => setGayLussacT1(e.target.value)}
                          placeholder="20"
                          step="0.1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gay-lussac-p2">
                          Final Pressure (bar) {gayLussacSolveFor === "pressure" && "(calculated)"}
                        </Label>
                        <Input
                          id="gay-lussac-p2"
                          type="number"
                          value={gayLussacP2}
                          onChange={(e) => setGayLussacP2(e.target.value)}
                          placeholder={gayLussacSolveFor === "pressure" ? "calculated" : "enter value"}
                          disabled={gayLussacSolveFor === "pressure"}
                          step="0.1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gay-lussac-t2">
                          Final Temp (°C) {gayLussacSolveFor === "temperature" && "(calculated)"}
                        </Label>
                        <Input
                          id="gay-lussac-t2"
                          type="number"
                          value={gayLussacT2}
                          onChange={(e) => setGayLussacT2(e.target.value)}
                          placeholder={gayLussacSolveFor === "temperature" ? "calculated" : "40"}
                          disabled={gayLussacSolveFor === "temperature"}
                          step="0.1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Gay-Lussac's Law Results</CardTitle>
                    <CardDescription>Pressure and temperature relationship</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {results?.gayLussacLaw ? (
                      <div className="space-y-4">
                        {results.gayLussacLaw.finalPressure && (
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Final Pressure:</span>
                            <span className="text-lg font-bold text-primary">
                              {results.gayLussacLaw.finalPressure.toFixed(2)} bar
                            </span>
                          </div>
                        )}
                        {results.gayLussacLaw.finalTemperature && (
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Final Temperature:</span>
                            <span className="text-lg font-bold text-primary">
                              {results.gayLussacLaw.finalTemperature.toFixed(1)} °C
                            </span>
                          </div>
                        )}
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            <strong>Diving Application:</strong> Tank pressure changes with temperature. A tank filled
                            in warm conditions will have lower pressure when cooled in cold water.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Gauge className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Enter values and calculate to see results</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center">
            <Button onClick={calculateGasLaws} size="lg" className="px-8">
              Calculate All Gas Laws
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="theory" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5" />
                  Charles's Law
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="font-mono text-lg">V₁/T₁ = V₂/T₂</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  At constant pressure, volume is directly proportional to absolute temperature.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Diving Applications:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• BCD volume changes with temperature</li>
                    <li>• Wetsuit buoyancy variations</li>
                    <li>• Gas expansion during ascent</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Beaker className="h-5 w-5" />
                  Dalton's Law
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="font-mono text-lg">P_total = P₁ + P₂ + P₃...</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Total pressure of gas mixture equals sum of partial pressures.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Diving Applications:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Oxygen toxicity calculations</li>
                    <li>• Nitrogen narcosis assessment</li>
                    <li>• Nitrox gas planning</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="h-5 w-5" />
                  Gay-Lussac's Law
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="font-mono text-lg">P₁/T₁ = P₂/T₂</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  At constant volume, pressure is directly proportional to absolute temperature.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Diving Applications:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Tank pressure temperature effects</li>
                    <li>• Regulator performance variations</li>
                    <li>• Gas density calculations</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
