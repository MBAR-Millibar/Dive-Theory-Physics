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
import { ArrowUp, Waves, Package, Scale } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

interface LiftResults {
  buoyantForce: number
  netForce: number
  liftBagVolume: number
  waterDisplaced: number
  requiredLiftBags: number
  safetyFactor: number
}

export function LiftDisplacementCalculator() {
  const { t } = useI18n()
  const [mainTab, setMainTab] = useState<string>("calculator")
  const [activeTab, setActiveTab] = useState("buoyancy")

  // Buoyancy Calculator
  const [objectWeight, setObjectWeight] = useState<string>("100")
  const [objectVolume, setObjectVolume] = useState<string>("0.05")
  const [waterType, setWaterType] = useState<string>("saltwater")
  const [depth, setDepth] = useState<string>("20")

  // Lift Bag Calculator
  const [liftWeight, setLiftWeight] = useState<string>("50")
  const [liftBagCapacity, setLiftBagCapacity] = useState<string>("25")
  const [safetyFactorPercent, setSafetyFactorPercent] = useState<string>("20")

  // Water Displacement
  const [displacementLength, setDisplacementLength] = useState<string>("2")
  const [displacementWidth, setDisplacementWidth] = useState<string>("1")
  const [displacementHeight, setDisplacementHeight] = useState<string>("0.5")

  const [results, setResults] = useState<LiftResults | null>(null)

  const calculateLiftAndDisplacement = () => {
    // Water density (kg/m³)
    const waterDensity = waterType === "saltwater" ? 1025 : 1000
    const gravity = 9.81 // m/s²

    // Buoyancy calculations
    const weight = Number.parseFloat(objectWeight)
    const volume = Number.parseFloat(objectVolume)
    const buoyantForce = waterDensity * gravity * volume // Archimedes' principle
    const netForce = buoyantForce - weight * gravity // Net upward force

    // Lift bag calculations
    const liftWeightKg = Number.parseFloat(liftWeight)
    const bagCapacity = Number.parseFloat(liftBagCapacity)
    const safetyFactor = Number.parseFloat(safetyFactorPercent) / 100

    // Required lift force with safety factor
    const requiredLift = liftWeightKg * gravity * (1 + safetyFactor)
    const liftPerBag = bagCapacity * waterDensity * gravity
    const requiredLiftBags = Math.ceil(requiredLift / liftPerBag)

    // Water displacement
    const length = Number.parseFloat(displacementLength)
    const width = Number.parseFloat(displacementWidth)
    const height = Number.parseFloat(displacementHeight)
    const waterDisplaced = length * width * height * 1000 // Convert to liters

    // Lift bag volume needed
    const liftBagVolume = (requiredLift / (waterDensity * gravity)) * 1000 // Convert to liters

    setResults({
      buoyantForce: buoyantForce / 1000, // Convert to kN
      netForce: netForce / 1000, // Convert to kN
      liftBagVolume,
      waterDisplaced,
      requiredLiftBags,
      safetyFactor: safetyFactor * 100,
    })
  }

  useEffect(() => {
    if (window.location.hash === "#theory") {
      setMainTab("theory")
    }
  }, [])

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">{t.calculators.liftDisplacement.title}</h1>
        <p className="text-muted-foreground">{t.calculators.liftDisplacement.description}</p>
      </div>

      <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculator">{t.calculatorUI.tabs.calculator}</TabsTrigger>
          <TabsTrigger value="theory">{t.calculatorUI.tabs.theory}</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="buoyancy">{t.calculatorUI.liftDisplacement.buoyancy}</TabsTrigger>
              <TabsTrigger value="lift-bags">{t.calculatorUI.liftDisplacement.liftBags}</TabsTrigger>
              <TabsTrigger value="displacement">{t.calculatorUI.liftDisplacement.displacement}</TabsTrigger>
            </TabsList>

            {/* Buoyancy Calculator */}
            <TabsContent value="buoyancy" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Waves className="h-5 w-5" />
                      {t.calculatorUI.liftDisplacement.buoyancyCalculator}
                    </CardTitle>
                    <CardDescription>{t.calculatorUI.liftDisplacement.buoyancyCalculatorDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="object-weight">{t.calculatorUI.liftDisplacement.objectWeight}</Label>
                        <Input
                          id="object-weight"
                          type="number"
                          value={objectWeight}
                          onChange={(e) => setObjectWeight(e.target.value)}
                          placeholder="100"
                          min="0"
                          step="0.1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="object-volume">{t.calculatorUI.liftDisplacement.objectVolume}</Label>
                        <Input
                          id="object-volume"
                          type="number"
                          value={objectVolume}
                          onChange={(e) => setObjectVolume(e.target.value)}
                          placeholder="0.05"
                          min="0"
                          step="0.001"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>{t.calculatorUI.liftDisplacement.waterType}</Label>
                      <Select value={waterType} onValueChange={setWaterType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="saltwater">{t.calculatorUI.liftDisplacement.saltwater} (1025 kg/m³)</SelectItem>
                          <SelectItem value="freshwater">{t.calculatorUI.liftDisplacement.freshwater} (1000 kg/m³)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="depth">{t.calculatorUI.liftDisplacement.depth}</Label>
                      <Input
                        id="depth"
                        type="number"
                        value={depth}
                        onChange={(e) => setDepth(e.target.value)}
                        placeholder="20"
                        min="0"
                        step="1"
                      />
                    </div>

                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>Formula:</strong> Buoyant Force = ρ × g × V
                        <br />
                        Where ρ = water density, g = gravity (9.81 m/s²), V = displaced volume
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t.calculatorUI.liftDisplacement.buoyancyResults}</CardTitle>
                    <CardDescription>{t.calculatorUI.labels.results}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {results ? (
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{t.calculatorUI.liftDisplacement.buoyantForce}</span>
                            <span className="text-lg font-bold text-primary">{results.buoyantForce.toFixed(2)} kN</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{t.calculatorUI.liftDisplacement.objectWeight}</span>
                            <span className="text-lg font-bold text-chart-2">
                              {((Number.parseFloat(objectWeight) * 9.81) / 1000).toFixed(2)} kN
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{t.calculatorUI.liftDisplacement.netForce}</span>
                            <span
                              className={`text-lg font-bold ${results.netForce > 0 ? "text-chart-4" : "text-chart-1"}`}
                            >
                              {results.netForce.toFixed(2)} kN {results.netForce > 0 ? "↑" : "↓"}
                            </span>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                            {t.calculatorUI.labels.results}
                          </h4>
                          {results.netForce > 0 ? (
                            <div className="p-3 bg-chart-4/10 border border-chart-4/20 rounded-lg">
                              <p className="text-sm text-chart-4 font-medium">
                                {t.calculatorUI.liftDisplacement.positive}
                              </p>
                            </div>
                          ) : results.netForce < 0 ? (
                            <div className="p-3 bg-chart-1/10 border border-chart-1/20 rounded-lg">
                              <p className="text-sm text-chart-1 font-medium">
                                {t.calculatorUI.liftDisplacement.negative}
                              </p>
                            </div>
                          ) : (
                            <div className="p-3 bg-muted/50 border border-border rounded-lg">
                              <p className="text-sm text-muted-foreground font-medium">{t.calculatorUI.labels.results}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Waves className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>{t.calculatorUI.labels.enterParametersPrompt}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Lift Bags Calculator */}
            <TabsContent value="lift-bags" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ArrowUp className="h-5 w-5" />
                      {t.calculatorUI.liftDisplacement.liftBagCalculator}
                    </CardTitle>
                    <CardDescription>{t.calculatorUI.liftDisplacement.liftBagCalculatorDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="lift-weight">{t.calculatorUI.liftDisplacement.weightToLift}</Label>
                      <Input
                        id="lift-weight"
                        type="number"
                        value={liftWeight}
                        onChange={(e) => setLiftWeight(e.target.value)}
                        placeholder="50"
                        min="0"
                        step="0.1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lift-bag-capacity">{t.calculatorUI.liftDisplacement.bagCapacity}</Label>
                      <Input
                        id="lift-bag-capacity"
                        type="number"
                        value={liftBagCapacity}
                        onChange={(e) => setLiftBagCapacity(e.target.value)}
                        placeholder="25"
                        min="1"
                        step="1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="safety-factor">{t.calculatorUI.liftDisplacement.safetyFactor}</Label>
                      <Input
                        id="safety-factor"
                        type="number"
                        value={safetyFactorPercent}
                        onChange={(e) => setSafetyFactorPercent(e.target.value)}
                        placeholder="20"
                        min="0"
                        max="100"
                        step="5"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>{t.calculatorUI.liftDisplacement.waterType}</Label>
                      <Select value={waterType} onValueChange={setWaterType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="saltwater">{t.calculatorUI.liftDisplacement.saltwater} (1025 kg/m³)</SelectItem>
                          <SelectItem value="freshwater">{t.calculatorUI.liftDisplacement.freshwater} (1000 kg/m³)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>{t.calculatorUI.liftDisplacement.safetyFactor}:</strong> Recommended 20-50% extra lift capacity to account for
                        uncertainties and provide control during ascent.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t.calculatorUI.liftDisplacement.liftBagResults}</CardTitle>
                    <CardDescription>{t.calculatorUI.labels.results}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {results ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">{t.calculatorUI.liftDisplacement.requiredBags}</Label>
                            <Badge variant="secondary" className="text-base px-3 py-1">
                              {results.requiredLiftBags}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">{t.calculatorUI.liftDisplacement.safetyFactor}</Label>
                            <Badge variant="secondary" className="text-base px-3 py-1">
                              {results.safetyFactor}%
                            </Badge>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{t.calculatorUI.liftDisplacement.requiredLiftVolume}</span>
                            <span className="text-lg font-bold text-primary">{results.liftBagVolume.toFixed(0)} L</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Lift per Bag:</span>
                            <span className="text-lg font-bold text-chart-1">
                              {(
                                (Number.parseFloat(liftBagCapacity) *
                                  (waterType === "saltwater" ? 1025 : 1000) *
                                  9.81) /
                                1000
                              ).toFixed(1)}{" "}
                              kN
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Total Lift Force:</span>
                            <span className="text-lg font-bold text-chart-4">
                              {(
                                (results.requiredLiftBags *
                                  (Number.parseFloat(liftBagCapacity) *
                                    (waterType === "saltwater" ? 1025 : 1000) *
                                    9.81)) /
                                1000
                              ).toFixed(1)}{" "}
                              kN
                            </span>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                            Lift Operation
                          </h4>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <p>
                              • Use <strong>{results.requiredLiftBags}</strong> × {liftBagCapacity}L lift bags
                            </p>
                            <p>• Inflate gradually to control ascent rate</p>
                            <p>• Monitor for gas expansion during ascent</p>
                            <p>• Maintain positive control throughout lift</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <ArrowUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Enter values and calculate to see results</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Water Displacement */}
            <TabsContent value="displacement" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      {t.calculatorUI.liftDisplacement.displacementCalculator}
                    </CardTitle>
                    <CardDescription>{t.calculatorUI.liftDisplacement.displacementCalculatorDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="displacement-length">{t.calculatorUI.liftDisplacement.length}</Label>
                      <Input
                        id="displacement-length"
                        type="number"
                        value={displacementLength}
                        onChange={(e) => setDisplacementLength(e.target.value)}
                        placeholder="2"
                        min="0"
                        step="0.1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="displacement-width">{t.calculatorUI.liftDisplacement.width}</Label>
                      <Input
                        id="displacement-width"
                        type="number"
                        value={displacementWidth}
                        onChange={(e) => setDisplacementWidth(e.target.value)}
                        placeholder="1"
                        min="0"
                        step="0.1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="displacement-height">{t.calculatorUI.liftDisplacement.height}</Label>
                      <Input
                        id="displacement-height"
                        type="number"
                        value={displacementHeight}
                        onChange={(e) => setDisplacementHeight(e.target.value)}
                        placeholder="0.5"
                        min="0"
                        step="0.1"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>{t.calculatorUI.liftDisplacement.waterType}</Label>
                      <Select value={waterType} onValueChange={setWaterType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="saltwater">{t.calculatorUI.liftDisplacement.saltwater} (1025 kg/m³)</SelectItem>
                          <SelectItem value="freshwater">{t.calculatorUI.liftDisplacement.freshwater} (1000 kg/m³)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>Volume:</strong> V = Length × Width × Height
                        <br />
                        <strong>Mass:</strong> m = Volume × Water Density
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t.calculatorUI.liftDisplacement.displacementResults}</CardTitle>
                    <CardDescription>{t.calculatorUI.labels.results}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {results ? (
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{t.calculatorUI.liftDisplacement.waterDisplaced}</span>
                            <span className="text-lg font-bold text-primary">
                              {results.waterDisplaced.toFixed(0)} L
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Volume (m³):</span>
                            <span className="text-lg font-bold text-chart-1">
                              {(results.waterDisplaced / 1000).toFixed(3)} m³
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Water Mass:</span>
                            <span className="text-lg font-bold text-chart-2">
                              {(results.waterDisplaced * (waterType === "saltwater" ? 1.025 : 1)).toFixed(0)} kg
                            </span>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                            Buoyant Force
                          </h4>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Maximum Buoyant Force:</span>
                            <span className="text-lg font-bold text-chart-4">
                              {(
                                ((results.waterDisplaced / 1000) * (waterType === "saltwater" ? 1025 : 1000) * 9.81) /
                                1000
                              ).toFixed(2)}{" "}
                              kN
                            </span>
                          </div>
                        </div>

                        <div className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            This object will displace <strong>{results.waterDisplaced.toFixed(0)} liters</strong> of
                            water when fully submerged, creating a maximum buoyant force of{" "}
                            <strong>
                              {(
                                ((results.waterDisplaced / 1000) * (waterType === "saltwater" ? 1025 : 1000) * 9.81) /
                                1000
                              ).toFixed(2)}{" "}
                              kN
                            </strong>
                            .
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Enter dimensions and calculate to see results</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center">
            <Button onClick={calculateLiftAndDisplacement} size="lg" className="px-8">
              {t.calculatorUI.buttons.calculate}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="theory" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Waves className="h-5 w-5" />
                  {t.theory.liftDisplacement.archimedesTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="font-mono text-lg">{t.theory.liftDisplacement.archimedesFormula}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t.theory.liftDisplacement.archimedesDesc}
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.theory.liftDisplacement.keyConcepts}</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {t.theory.liftDisplacement.fbForce}</li>
                    <li>• {t.theory.liftDisplacement.density}</li>
                    <li>• {t.theory.liftDisplacement.gravity}</li>
                    <li>• {t.theory.liftDisplacement.volume}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUp className="h-5 w-5" />
                  {t.theory.liftDisplacement.liftOperationsTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.theory.liftDisplacement.safetyGuidelines}</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {t.theory.liftDisplacement.safetyFactor}</li>
                    <li>• {t.theory.liftDisplacement.ascentRate}</li>
                    <li>• {t.theory.liftDisplacement.gasExpansion}</li>
                    <li>• {t.theory.liftDisplacement.multipleBags}</li>
                    <li>• {t.theory.liftDisplacement.buoyancyControl}</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.theory.liftDisplacement.waterDensityTitle}</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {t.theory.liftDisplacement.freshwaterDensity}</li>
                    <li>• {t.theory.liftDisplacement.saltwaterDensity}</li>
                    <li>• {t.theory.liftDisplacement.temperatureEffect}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  {t.theory.liftDisplacement.practicalTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.theory.liftDisplacement.underwaterRecovery}</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {t.theory.liftDisplacement.salvageOps}</li>
                    <li>• {t.theory.liftDisplacement.archaeological}</li>
                    <li>• {t.theory.liftDisplacement.equipmentRetrieval}</li>
                    <li>• {t.theory.liftDisplacement.scientificSampling}</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.theory.liftDisplacement.buoyancyControlTitle}</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {t.theory.liftDisplacement.diverBuoyancy}</li>
                    <li>• {t.theory.liftDisplacement.equipmentNeutralization}</li>
                    <li>• {t.theory.liftDisplacement.underwaterConstruction}</li>
                    <li>• {t.theory.liftDisplacement.marineBiology}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  {t.theory.liftDisplacement.volumeCalculationsTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.theory.liftDisplacement.commonShapes}</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {t.theory.liftDisplacement.rectangular}</li>
                    <li>• {t.theory.liftDisplacement.cylindrical}</li>
                    <li>• {t.theory.liftDisplacement.spherical}</li>
                    <li>• {t.theory.liftDisplacement.irregular}</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">{t.theory.liftDisplacement.unitConversions}</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {t.theory.liftDisplacement.cubicMeterToLiter}</li>
                    <li>• {t.theory.liftDisplacement.literToKgFresh}</li>
                    <li>• {t.theory.liftDisplacement.literToKgSalt}</li>
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
