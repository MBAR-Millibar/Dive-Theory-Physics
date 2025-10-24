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

interface LiftResults {
  buoyantForce: number
  netForce: number
  liftBagVolume: number
  waterDisplaced: number
  requiredLiftBags: number
  safetyFactor: number
}

export function LiftDisplacementCalculator() {
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
        <h1 className="text-3xl font-bold text-foreground mb-2">Buoyancy & Displacement Calculator</h1>
        <p className="text-muted-foreground">
          Calculate buoyancy forces, lift bag requirements, and water displacement for diving operations
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
              <TabsTrigger value="buoyancy">Buoyancy</TabsTrigger>
              <TabsTrigger value="lift-bags">Lift Bags</TabsTrigger>
              <TabsTrigger value="displacement">Displacement</TabsTrigger>
            </TabsList>

            {/* Buoyancy Calculator */}
            <TabsContent value="buoyancy" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Waves className="h-5 w-5" />
                      Buoyancy Calculator
                    </CardTitle>
                    <CardDescription>Calculate buoyant force using Archimedes' principle</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="object-weight">Object Weight (kg)</Label>
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
                        <Label htmlFor="object-volume">Object Volume (m³)</Label>
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
                      <Label>Water Type</Label>
                      <Select value={waterType} onValueChange={setWaterType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="saltwater">Saltwater (1025 kg/m³)</SelectItem>
                          <SelectItem value="freshwater">Freshwater (1000 kg/m³)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="depth">Depth (meters)</Label>
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
                    <CardTitle>Buoyancy Results</CardTitle>
                    <CardDescription>Forces acting on the submerged object</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {results ? (
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Buoyant Force:</span>
                            <span className="text-lg font-bold text-primary">{results.buoyantForce.toFixed(2)} kN</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Object Weight:</span>
                            <span className="text-lg font-bold text-chart-2">
                              {((Number.parseFloat(objectWeight) * 9.81) / 1000).toFixed(2)} kN
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Net Force:</span>
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
                            Object Status
                          </h4>
                          {results.netForce > 0 ? (
                            <div className="p-3 bg-chart-4/10 border border-chart-4/20 rounded-lg">
                              <p className="text-sm text-chart-4 font-medium">
                                ✓ Object will float - Buoyant force exceeds weight
                              </p>
                            </div>
                          ) : results.netForce < 0 ? (
                            <div className="p-3 bg-chart-1/10 border border-chart-1/20 rounded-lg">
                              <p className="text-sm text-chart-1 font-medium">
                                ↓ Object will sink - Weight exceeds buoyant force
                              </p>
                            </div>
                          ) : (
                            <div className="p-3 bg-muted/50 border border-border rounded-lg">
                              <p className="text-sm text-muted-foreground font-medium">⚖️ Object is neutrally buoyant</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Waves className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Enter values and calculate to see results</p>
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
                      Lift Bag Calculator
                    </CardTitle>
                    <CardDescription>Calculate lift bag requirements for underwater recovery</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="lift-weight">Object Weight to Lift (kg)</Label>
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
                      <Label htmlFor="lift-bag-capacity">Lift Bag Capacity (L)</Label>
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
                      <Label htmlFor="safety-factor">Safety Factor (%)</Label>
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
                      <Label>Water Type</Label>
                      <Select value={waterType} onValueChange={setWaterType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="saltwater">Saltwater (1025 kg/m³)</SelectItem>
                          <SelectItem value="freshwater">Freshwater (1000 kg/m³)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>Safety Factor:</strong> Recommended 20-50% extra lift capacity to account for
                        uncertainties and provide control during ascent.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Lift Bag Results</CardTitle>
                    <CardDescription>Required lift bag configuration</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {results ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Required Lift Bags</Label>
                            <Badge variant="secondary" className="text-base px-3 py-1">
                              {results.requiredLiftBags} bags
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Safety Factor</Label>
                            <Badge variant="secondary" className="text-base px-3 py-1">
                              {results.safetyFactor}%
                            </Badge>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Total Lift Volume:</span>
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
                      Water Displacement
                    </CardTitle>
                    <CardDescription>Calculate volume of water displaced by submerged objects</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="displacement-length">Length (meters)</Label>
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
                      <Label htmlFor="displacement-width">Width (meters)</Label>
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
                      <Label htmlFor="displacement-height">Height (meters)</Label>
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
                      <Label>Water Type</Label>
                      <Select value={waterType} onValueChange={setWaterType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="saltwater">Saltwater (1025 kg/m³)</SelectItem>
                          <SelectItem value="freshwater">Freshwater (1000 kg/m³)</SelectItem>
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
                    <CardTitle>Displacement Results</CardTitle>
                    <CardDescription>Water volume and mass displaced</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {results ? (
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Volume Displaced:</span>
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
              Calculate Buoyancy & Displacement
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="theory" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Waves className="h-5 w-5" />
                  Archimedes' Principle
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="font-mono text-lg">F_b = ρ × g × V</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  The buoyant force equals the weight of the fluid displaced by the submerged object.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Key Concepts:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• F_b = Buoyant force (N)</li>
                    <li>• ρ = Fluid density (kg/m³)</li>
                    <li>• g = Gravitational acceleration (9.81 m/s²)</li>
                    <li>• V = Volume of displaced fluid (m³)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUp className="h-5 w-5" />
                  Lift Operations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Safety Guidelines:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Always use 20-50% safety factor</li>
                    <li>• Control ascent rate (max 18m/min)</li>
                    <li>• Monitor for gas expansion</li>
                    <li>• Use multiple smaller bags vs one large</li>
                    <li>• Maintain positive buoyancy control</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Water Density:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Freshwater: 1000 kg/m³</li>
                    <li>• Saltwater: 1025 kg/m³ (2.5% more lift)</li>
                    <li>• Temperature affects density slightly</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Practical Applications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Underwater Recovery:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Salvage operations</li>
                    <li>• Archaeological recovery</li>
                    <li>• Equipment retrieval</li>
                    <li>• Scientific sampling</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Buoyancy Control:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Diver buoyancy management</li>
                    <li>• Equipment neutralization</li>
                    <li>• Underwater construction</li>
                    <li>• Marine biology research</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Volume Calculations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Common Shapes:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Rectangular: L × W × H</li>
                    <li>• Cylindrical: π × r² × h</li>
                    <li>• Spherical: (4/3) × π × r³</li>
                    <li>• Irregular: Water displacement method</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Unit Conversions:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 1 m³ = 1000 liters</li>
                    <li>• 1 liter = 1 kg (freshwater)</li>
                    <li>• 1 liter = 1.025 kg (saltwater)</li>
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
