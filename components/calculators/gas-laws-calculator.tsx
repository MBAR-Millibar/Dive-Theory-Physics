"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Thermometer, Gauge, Beaker, Maximize } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

interface GasLawResults {
  boylesLaw: {
    finalVolume?: number
    finalPressure?: number
  }
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
  const { t } = useI18n()
  const [mainTab, setMainTab] = useState<string>("calculator")
  const [activeTab, setActiveTab] = useState("boyles")

  // Boyle's Law state
  const [boylesP1, setBoylesP1] = useState<string>("1")
  const [boylesV1, setBoylesV1] = useState<string>("10")
  const [boylesP2, setBoylesP2] = useState<string>("4")
  const [boylesV2, setBoylesV2] = useState<string>("")
  const [boylesSolveFor, setBoylesSolveFor] = useState<string>("volume")

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

  const calculateBoylesLaw = () => {
    const p1 = Number.parseFloat(boylesP1)
    const v1 = Number.parseFloat(boylesV1)
    const p2 = Number.parseFloat(boylesP2)
    const v2 = boylesV2 ? Number.parseFloat(boylesV2) : null

    if (boylesSolveFor === "volume" && !isNaN(p1) && !isNaN(v1) && !isNaN(p2)) {
      // V2 = P1 * V1 / P2
      const finalVolume = (p1 * v1) / p2
      return { finalVolume }
    } else if (boylesSolveFor === "pressure" && !isNaN(p1) && !isNaN(v1) && v2 && !isNaN(v2)) {
      // P2 = P1 * V1 / V2
      const finalPressure = (p1 * v1) / v2
      return { finalPressure }
    }
    return {}
  }

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
    const boylesResult = calculateBoylesLaw()
    const charlesResult = calculateCharlesLaw()
    const daltonResult = calculateDaltonLaw()
    const gayLussacResult = calculateGayLussacLaw()

    setResults({
      boylesLaw: boylesResult,
      charlesLaw: charlesResult,
      daltonLaw: daltonResult,
      gayLussacLaw: gayLussacResult,
    })
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">{t.calculators.gasLaws.title}</h1>
        <p className="text-muted-foreground">{t.calculators.gasLaws.description}</p>
      </div>

      <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculator">{t.calculatorUI.tabs.calculator}</TabsTrigger>
          <TabsTrigger value="theory">{t.calculatorUI.tabs.theory}</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="boyles">{t.calculatorUI.gasLaws.boylesLaw}</TabsTrigger>
              <TabsTrigger value="charles">{t.calculatorUI.gasLaws.charlesLaw}</TabsTrigger>
              <TabsTrigger value="dalton">{t.calculatorUI.gasLaws.daltonsLaw}</TabsTrigger>
              <TabsTrigger value="gay-lussac">{t.calculatorUI.gasLaws.gayLussacsLaw}</TabsTrigger>
            </TabsList>

            {/* Boyle's Law */}
            <TabsContent value="boyles" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Maximize className="h-5 w-5" />
                      Boyle's Law (P₁V₁ = P₂V₂)
                    </CardTitle>
                    <CardDescription>
                      Pressure is inversely proportional to volume at constant temperature
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Solve for:</Label>
                      <Select value={boylesSolveFor} onValueChange={setBoylesSolveFor}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="volume">Final Volume (V₂)</SelectItem>
                          <SelectItem value="pressure">Final Pressure (P₂)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="boyles-p1">Initial Pressure (bar)</Label>
                        <Input
                          id="boyles-p1"
                          type="number"
                          value={boylesP1}
                          onChange={(e) => setBoylesP1(e.target.value)}
                          placeholder="1"
                          step="0.1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="boyles-v1">Initial Volume (L)</Label>
                        <Input
                          id="boyles-v1"
                          type="number"
                          value={boylesV1}
                          onChange={(e) => setBoylesV1(e.target.value)}
                          placeholder="10"
                          step="0.1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="boyles-p2">
                          Final Pressure (bar) {boylesSolveFor === "pressure" && "(calculated)"}
                        </Label>
                        <Input
                          id="boyles-p2"
                          type="number"
                          value={boylesP2}
                          onChange={(e) => setBoylesP2(e.target.value)}
                          placeholder={boylesSolveFor === "pressure" ? "calculated" : "4"}
                          disabled={boylesSolveFor === "pressure"}
                          step="0.1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="boyles-v2">
                          Final Volume (L) {boylesSolveFor === "volume" && "(calculated)"}
                        </Label>
                        <Input
                          id="boyles-v2"
                          type="number"
                          value={boylesV2}
                          onChange={(e) => setBoylesV2(e.target.value)}
                          placeholder={boylesSolveFor === "volume" ? "calculated" : "enter value"}
                          disabled={boylesSolveFor === "volume"}
                          step="0.1"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>Example:</strong> At surface (1 bar), a 10L volume becomes 2.5L at 30m depth (4 bar).
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Boyle's Law Results</CardTitle>
                    <CardDescription>Pressure and volume relationship</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {results?.boylesLaw ? (
                      <div className="space-y-4">
                        {results.boylesLaw.finalVolume && (
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Final Volume:</span>
                            <span className="text-lg font-bold text-primary">
                              {results.boylesLaw.finalVolume.toFixed(2)} L
                            </span>
                          </div>
                        )}
                        {results.boylesLaw.finalPressure && (
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Final Pressure:</span>
                            <span className="text-lg font-bold text-primary">
                              {results.boylesLaw.finalPressure.toFixed(2)} bar
                            </span>
                          </div>
                        )}
                        <Separator />
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            <strong>Diving Application:</strong> Boyle's Law is THE most important gas law in diving. It
                            explains why you must never hold your breath while ascending, why air consumption increases
                            with depth, and why you must add/release air from your BCD during depth changes.
                          </p>
                        </div>
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                          <p className="text-sm text-amber-900 dark:text-amber-200">
                            <strong>Safety Note:</strong> A breath held at 10m depth will expand to 2x volume at
                            surface, potentially causing lung overexpansion injury.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Maximize className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Enter values and calculate to see results</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

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
              {t.calculatorUI.buttons.calculateGasLaws}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="theory" className="space-y-6">
          <div className="space-y-8">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle>{t.theory.gasLaws.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-semibold mb-2">{t.theory.gasLaws.importanceTitle}</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>
                      • <strong>{t.theory.gasLaws.boylesImportance}</strong> {t.theory.gasLaws.boylesImportanceDesc}
                    </li>
                    <li>
                      • <strong>{t.theory.gasLaws.daltonsImportance}</strong> {t.theory.gasLaws.daltonsImportanceDesc}
                    </li>
                    <li>
                      • <strong>{t.theory.gasLaws.charlesImportance}</strong> {t.theory.gasLaws.charlesImportanceDesc}
                    </li>
                    <li>
                      • <strong>{t.theory.gasLaws.gayLussacsImportance}</strong> {t.theory.gasLaws.gayLussacsImportanceDesc}
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Gas Laws Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">{t.theory.gasLaws.fourLawsTitle}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Maximize className="h-5 w-5" />
                      {t.theory.gasLaws.boylesLawTitle}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="font-mono text-lg mb-2">{t.theory.gasLaws.boylesFormula}</p>
                      <p className="text-sm text-muted-foreground">{t.theory.gasLaws.boylesCondition}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t.theory.gasLaws.boylesExplanation}
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">{t.theory.gasLaws.boylesApplicationsTitle}</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>
                          • <strong>{t.theory.gasLaws.boylesApp1}</strong> {t.theory.gasLaws.boylesApp1Desc}
                        </li>
                        <li>
                          • <strong>{t.theory.gasLaws.boylesApp2}</strong> {t.theory.gasLaws.boylesApp2Desc}
                        </li>
                        <li>
                          • <strong>{t.theory.gasLaws.boylesApp3}</strong> {t.theory.gasLaws.boylesApp3Desc}
                        </li>
                      </ul>
                    </div>
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <p className="text-sm text-destructive font-medium">
                        {t.theory.gasLaws.boylesWarning}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Beaker className="h-5 w-5" />
                      {t.theory.gasLaws.daltonsLawTitle}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="font-mono text-lg mb-2">{t.theory.gasLaws.daltonsFormula}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t.theory.gasLaws.daltonsExplanation}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Thermometer className="h-5 w-5" />
                      {t.theory.gasLaws.charlesLawTitle}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="font-mono text-lg mb-2">{t.theory.gasLaws.charlesFormula}</p>
                      <p className="text-sm text-muted-foreground">{t.theory.gasLaws.charlesCondition}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t.theory.gasLaws.charlesExplanation}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gauge className="h-5 w-5" />
                      {t.theory.gasLaws.gayLussacsLawTitle}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="font-mono text-lg mb-2">{t.theory.gasLaws.gayLussacsFormula}</p>
                      <p className="text-sm text-muted-foreground">{t.theory.gasLaws.gayLussacsCondition}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t.theory.gasLaws.gayLussacsExplanation}
                    </p>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>{t.theory.gasLaws.combinedLawTitle}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="font-mono text-lg mb-2">{t.theory.gasLaws.combinedFormula}</p>
                      <p className="text-sm text-muted-foreground">
                        {t.theory.gasLaws.combinedExplanation}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Pressure Conversions Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Pressure Calculations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Depth to Pressure (Metric)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                      <p className="font-mono text-sm">P_absolute = (depth in msw / 10) + 1</p>
                      <p className="text-xs text-muted-foreground">Each 10 metres of seawater = 1 bar pressure</p>
                    </div>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Example:</strong> At 30 metres
                      </p>
                      <p className="font-mono text-xs">P = 30/10 + 1 = 4 bar absolute</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Depth to Pressure (Imperial)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                      <p className="font-mono text-sm">P_absolute = (depth in fsw / 33) + 1</p>
                      <p className="text-xs text-muted-foreground">Each 33 feet of seawater = 1 atm pressure</p>
                    </div>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Example:</strong> At 99 feet
                      </p>
                      <p className="font-mono text-xs">P = 99/33 + 1 = 4 ata</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Pressure Equivalents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <p className="font-semibold">1 bar equals:</p>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• 0.987 atmospheres (~1 atm)</li>
                          <li>• 14.5 psi</li>
                          <li>• 10 metres seawater</li>
                          <li>• 1.02 kg/cm²</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <p className="font-semibold">1 atmosphere equals:</p>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• 1.01 bar (~1 bar)</li>
                          <li>• 14.7 psi</li>
                          <li>• 33 feet seawater</li>
                          <li>• 34 feet fresh water</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Partial Pressure Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Partial Pressure Calculations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>T Formula (Partial Pressure)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="font-mono text-lg mb-2">P_gas = F_g × P_total</p>
                      <p className="text-xs text-muted-foreground">
                        P_g = partial pressure, F_g = gas fraction, P_total = total pressure
                      </p>
                    </div>
                    <div className="text-sm space-y-2">
                      <p>
                        <strong>Example:</strong> Air (21% O₂) at 30m (4 bar)
                      </p>
                      <p className="font-mono text-xs">PPO₂ = 0.21 × 4 = 0.84 bar</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Maximum Depth for Gas Mix</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="font-mono text-sm mb-2">P_total = P_g / F_g</p>
                      <p className="text-xs text-muted-foreground">Rearranged T Formula</p>
                    </div>
                    <div className="text-sm space-y-2">
                      <p>
                        <strong>Example:</strong> EAN36 with PPO₂ limit 1.4
                      </p>
                      <p className="font-mono text-xs">P = 1.4 / 0.36 = 3.9 bar</p>
                      <p className="font-mono text-xs">Depth = (3.9 - 1) × 10 = 29m</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* EANx Calculations */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Enriched Air (Nitrox) Formulas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Equivalent Air Depth (Metric)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="font-mono text-xs mb-2">EAD = [(1 - O₂%) × (depth + 10) / 0.79] - 10</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Finds the depth where air would have the same nitrogen partial pressure as your nitrox mix at
                      actual depth.
                    </p>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Example:</strong> EAN32 at 30m
                      </p>
                      <p className="font-mono text-xs">EAD = (1-0.32) × (30+10) / 0.79 - 10</p>
                      <p className="font-mono text-xs">EAD = 24.6 metres</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Equivalent Air Depth (Imperial)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="font-mono text-xs mb-2">EAD = [(1 - O₂%) × (depth + 33) / 0.79] - 33</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Same calculation using feet and atmospheres instead of metres and bar.
                    </p>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Example:</strong> EAN32 at 99 feet
                      </p>
                      <p className="font-mono text-xs">EAD = (1-0.32) × (99+33) / 0.79 - 33</p>
                      <p className="font-mono text-xs">EAD = 80.7 feet</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Temperature Conversions */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Temperature Conversions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Celsius ↔ Fahrenheit</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                      <p className="font-mono text-sm">°F = (°C × 1.8) + 32</p>
                      <p className="font-mono text-sm">°C = (°F - 32) × 0.555</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Absolute Temperature Scales</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                      <p className="font-mono text-sm">K = °C + 273</p>
                      <p className="font-mono text-sm">°R = °F + 460</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Kelvin (K) and Rankine (°R) are absolute temperature scales required for gas law calculations
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Important Constants */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Important Constants & Values</h2>
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold mb-1">Water Density:</p>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Fresh water: 1.0 kg/L or 62.4 lbs/ft³</li>
                          <li>• Sea water: 1.03 kg/L or 64 lbs/ft³</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Standard Air Composition:</p>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Nitrogen (N₂): 78.084%</li>
                          <li>• Oxygen (O₂): 20.946%</li>
                          <li>• Argon: 0.934%</li>
                          <li>• CO₂ and trace gases: 0.036%</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold mb-1">Oxygen Limits:</p>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Working PPO₂ limit: 1.4 bar</li>
                          <li>• Deco PPO₂ limit: 1.6 bar</li>
                          <li>• Minimum PPO₂: 0.16 bar</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold mb-1">Simplified Air (for calculations):</p>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Nitrogen: 79%</li>
                          <li>• Oxygen: 21%</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-destructive">Critical Safety Reminders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="space-y-2">
                  <p className="font-semibold text-destructive">Absolute vs. Gauge Pressure:</p>
                  <p className="text-muted-foreground">
                    • Always use <strong>absolute pressure</strong> (not gauge pressure) in gas law calculations
                    <br />• Absolute pressure = gauge pressure + 1 bar (or + 1 atm)
                    <br />• Example: At 30m, gauge shows 3 bar, but absolute pressure is 4 bar
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="font-semibold text-destructive">Temperature Units:</p>
                  <p className="text-muted-foreground">
                    • Temperature must be in <strong>absolute units</strong> (Kelvin or Rankine) for gas law formulas
                    <br />• Kelvin = Celsius + 273
                    <br />• Rankine = Fahrenheit + 460
                    <br />• Never use Celsius or Fahrenheit directly in calculations
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="font-semibold text-destructive">Oxygen Toxicity Limits:</p>
                  <p className="text-muted-foreground">
                    • <strong>Never exceed PPO₂ of 1.4 bar</strong> during working portions of a dive
                    <br />• PPO₂ of 1.6 bar maximum for decompression stops only
                    <br />• Symptoms: Visual disturbances, ear ringing, nausea, twitching, convulsions
                    <br />• Convulsions underwater are usually fatal
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="font-semibold text-destructive">Nitrogen Narcosis:</p>
                  <p className="text-muted-foreground">
                    • Begins around 30m (4 bar) for most divers
                    <br />• Significant impairment at 40m+ (5+ bar)
                    <br />• Effects similar to alcohol intoxication
                    <br />• Impairs judgment - dangerous for decision-making
                    <br />• Ascend to shallower depth if experiencing symptoms
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="font-semibold text-destructive">General Dive Safety:</p>
                  <p className="text-muted-foreground">
                    • These calculators are for <strong>educational purposes only</strong>
                    <br />• Always follow your training and certification limits
                    <br />• Use dive tables or dive computers for actual dive planning
                    <br />• When in doubt, dive conservatively
                    <br />• Never dive beyond your training level
                    <br />• Consult with a dive professional for questions about dive planning
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
