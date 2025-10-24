"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowUp, Info, ArrowLeft } from "lucide-react"

export default function LiftingCalculatorPage() {
  const [objectWeight, setObjectWeight] = useState<string>("200")
  const [objectVolume, setObjectVolume] = useState<string>("127")
  const [depth, setDepth] = useState<string>("17")
  const [waterType, setWaterType] = useState<string>("saltwater")
  const [weightUnit, setWeightUnit] = useState<string>("kg")
  const [volumeUnit, setVolumeUnit] = useState<string>("liters")

  const calculateLiftRequirements = () => {
    const weight = Number.parseFloat(objectWeight)
    const volume = Number.parseFloat(objectVolume)
    const depthValue = Number.parseFloat(depth)

    if (isNaN(weight) || weight <= 0 || isNaN(volume) || volume <= 0 || isNaN(depthValue) || depthValue < 0) {
      return null
    }

    // Convert to kg and liters if needed
    const weightInKg = weightUnit === "lbs" ? weight * 0.453592 : weight
    const volumeInLiters = volumeUnit === "gallons" ? volume * 3.78541 : volume

    // Water density constants (kg/L)
    const waterDensity = waterType === "saltwater" ? 1.03 : 1.0

    // Step 1: Calculate how much water weight the object displaces
    const waterWeightDisplaced = volumeInLiters * waterDensity

    // Step 2: Calculate negative buoyancy (object weight - water weight displaced)
    const negativeBuoyancy = weightInKg - waterWeightDisplaced

    // Step 3: Calculate volume of water that must be displaced to achieve neutral buoyancy
    const requiredDisplacement = negativeBuoyancy / waterDensity

    // Step 4: Add safety margin (typically 10-20% for lifting operations)
    const safetyMargin = requiredDisplacement * 0.15
    const recommendedDisplacement = requiredDisplacement + safetyMargin

    return {
      waterWeightDisplaced: Math.round(waterWeightDisplaced * 10) / 10,
      negativeBuoyancy: Math.round(negativeBuoyancy * 10) / 10,
      minimumDisplacement: Math.round(requiredDisplacement * 10) / 10,
      recommendedDisplacement: Math.round(recommendedDisplacement * 10) / 10,
      safetyMargin: Math.round(safetyMargin * 10) / 10,
      // Convert to gallons for reference
      minimumDisplacementGal: Math.round((requiredDisplacement / 3.78541) * 10) / 10,
      recommendedDisplacementGal: Math.round((recommendedDisplacement / 3.78541) * 10) / 10,
    }
  }

  const result = calculateLiftRequirements()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Button variant="ghost" asChild className="mb-6">
            <a href="/#calculators">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Topics
            </a>
          </Button>

          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-primary/10">
              <ArrowUp className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Lifting Calculator</h1>
              <p className="text-lg text-muted-foreground mt-1">
                Calculate buoyancy required to lift objects underwater
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Lifting Requirements Calculator</CardTitle>
                <CardDescription>
                  Calculate the water displacement needed to lift an object from the bottom
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="objectWeight">Object Weight</Label>
                  <div className="flex gap-2">
                    <Input
                      id="objectWeight"
                      type="number"
                      value={objectWeight}
                      onChange={(e) => setObjectWeight(e.target.value)}
                      placeholder="200"
                      min="0"
                      step="0.1"
                    />
                    <Select value={weightUnit} onValueChange={setWeightUnit}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="lbs">lbs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="objectVolume">Object Volume (Water Displaced)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="objectVolume"
                      type="number"
                      value={objectVolume}
                      onChange={(e) => setObjectVolume(e.target.value)}
                      placeholder="127"
                      min="0"
                      step="0.1"
                    />
                    <Select value={volumeUnit} onValueChange={setVolumeUnit}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="liters">L</SelectItem>
                        <SelectItem value="gallons">gal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="depth">Depth</Label>
                  <div className="flex gap-2">
                    <Input
                      id="depth"
                      type="number"
                      value={depth}
                      onChange={(e) => setDepth(e.target.value)}
                      placeholder="17"
                      min="0"
                      step="0.1"
                    />
                    <div className="w-24 flex items-center justify-center text-sm text-muted-foreground">meters</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="waterType">Water Type</Label>
                  <Select value={waterType} onValueChange={setWaterType}>
                    <SelectTrigger id="waterType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saltwater">Saltwater (1.03 kg/L)</SelectItem>
                      <SelectItem value="freshwater">Freshwater (1.0 kg/L)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {result && (
                  <div className="space-y-4">
                    <Alert className="bg-muted border-muted-foreground/20">
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm font-medium mb-1">Water Weight Displaced by Object:</div>
                            <div className="text-lg font-semibold">{result.waterWeightDisplaced} kg</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium mb-1">Negative Buoyancy:</div>
                            <div className="text-lg font-semibold">{result.negativeBuoyancy} kg</div>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>

                    <Alert className="bg-primary/10 border-primary/20">
                      <ArrowUp className="h-4 w-4" />
                      <AlertDescription>
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm font-medium mb-1">Minimum Displacement Required:</div>
                            <div className="text-2xl font-bold text-primary">
                              {result.minimumDisplacement} L ({result.minimumDisplacementGal} gal)
                            </div>
                          </div>
                          <div className="pt-2 border-t border-primary/20">
                            <div className="text-sm font-medium mb-1">Recommended (with 15% safety margin):</div>
                            <div className="text-xl font-bold text-primary">
                              {result.recommendedDisplacement} L ({result.recommendedDisplacementGal} gal)
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-2">
                            Safety margin: +{result.safetyMargin} L for controlled ascent
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calculation Steps</CardTitle>
                <CardDescription>How the lifting requirements are calculated</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Step 1: Water Weight Displaced</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Multiply the object's volume by the water density constant:
                    </p>
                    <div className="bg-muted p-3 rounded font-mono text-sm">
                      Volume × Water Density = Water Weight
                      {result && (
                        <div className="mt-1 text-primary">
                          {objectVolume} L × {waterType === "saltwater" ? "1.03" : "1.0"} kg/L ={" "}
                          {result.waterWeightDisplaced} kg
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Step 2: Negative Buoyancy</h3>
                    <p className="text-sm text-muted-foreground mb-2">Subtract water weight from object weight:</p>
                    <div className="bg-muted p-3 rounded font-mono text-sm">
                      Object Weight - Water Weight = Negative Buoyancy
                      {result && (
                        <div className="mt-1 text-primary">
                          {objectWeight} kg - {result.waterWeightDisplaced} kg = {result.negativeBuoyancy} kg
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Step 3: Required Displacement</h3>
                    <p className="text-sm text-muted-foreground mb-2">Divide negative buoyancy by water density:</p>
                    <div className="bg-muted p-3 rounded font-mono text-sm">
                      Negative Buoyancy ÷ Water Density = Volume Needed
                      {result && (
                        <div className="mt-1 text-primary">
                          {result.negativeBuoyancy} kg ÷ {waterType === "saltwater" ? "1.03" : "1.0"} kg/L ={" "}
                          {result.minimumDisplacement} L
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Step 4: Safety Margin</h3>
                    <p className="text-sm text-muted-foreground mb-2">Add 15% for controlled ascent:</p>
                    <div className="bg-muted p-3 rounded font-mono text-sm">
                      Minimum × 1.15 = Recommended
                      {result && (
                        <div className="mt-1 text-primary">
                          {result.minimumDisplacement} L × 1.15 = {result.recommendedDisplacement} L
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card id="theory" className="scroll-mt-24">
            <CardHeader>
              <CardTitle className="text-2xl">Theory: Underwater Lifting Operations</CardTitle>
              <CardDescription>Understanding buoyancy principles for lifting submerged objects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-foreground">
              <section>
                <h3 className="text-xl font-semibold mb-3">The Physics of Underwater Lifting</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When an object is submerged, it experiences an upward buoyant force equal to the weight of the water
                  it displaces (Archimedes' Principle). If the object weighs more than the water it displaces, it has
                  negative buoyancy and will sink. To lift it, we must add enough buoyancy to overcome this negative
                  buoyancy.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Archimedes' Principle</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    "Any object, wholly or partially immersed in a fluid, is buoyed up by a force equal to the weight of
                    the fluid displaced by the object."
                  </p>
                  <div className="font-mono text-sm bg-background p-2 rounded mt-2">
                    Buoyant Force = Volume × Water Density × Gravity
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">Understanding the Calculation</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">1. Water Weight Displaced</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      First, we calculate how much water weight the object displaces based on its volume. In saltwater,
                      each liter weighs 1.03 kg. In freshwater, each liter weighs 1.0 kg. This tells us the upward
                      buoyant force acting on the object.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">2. Negative Buoyancy</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      By subtracting the water weight from the object's actual weight, we find the negative buoyancy -
                      the net downward force keeping the object on the bottom. This is the force we must overcome to
                      lift the object.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">3. Required Displacement</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      To achieve neutral buoyancy (where the object neither sinks nor floats), we need to displace
                      additional water equal to the negative buoyancy. We divide the negative buoyancy by the water
                      density to find the volume of water that must be displaced.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">4. Safety Margin</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      For safe lifting operations, we add a safety margin (typically 10-20%) to ensure controlled
                      ascent. This extra buoyancy allows you to manage the lift rate and compensate for any calculation
                      errors or unexpected factors.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">Lifting Methods</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Lift Bags</h4>
                    <p className="text-muted-foreground leading-relaxed mb-2">
                      The most common method for underwater lifting. Lift bags are inflated with air from a diver's
                      regulator or surface supply. As the bag inflates, it displaces water and provides upward buoyant
                      force.
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                      <li>• Open-bottom bags: Simple but require careful inflation control</li>
                      <li>• Closed bags: More controlled but need proper venting during ascent</li>
                      <li>• Parachute bags: Large capacity for heavy objects</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Buoyancy Compensators</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      For smaller objects, a diver's BCD can provide lifting force. However, this method is limited by
                      the BCD's volume and can affect the diver's own buoyancy control.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Flotation Devices</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Foam blocks, air-filled drums, or specialized flotation devices can be attached to objects for
                      lifting. These provide consistent buoyancy without the need for inflation.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">Important Considerations</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Depth and Pressure Changes</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      As a lift bag ascends, the air inside expands due to decreasing pressure (Boyle's Law). At 10
                      meters depth, the pressure is 2 ATA, so air volume doubles when brought to the surface. This means
                      a lift bag becomes more buoyant as it rises, potentially causing uncontrolled ascent.
                    </p>
                    <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-lg mt-2">
                      <p className="text-sm font-semibold text-destructive">Critical Safety Point</p>
                      <p className="text-sm text-muted-foreground">
                        Always vent expanding air from lift bags during ascent to maintain controlled lift rate. An
                        uncontrolled ascent can be dangerous for divers and damage the object being lifted.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Center of Gravity</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Attach lift bags above the object's center of gravity to prevent tipping or rolling during ascent.
                      Unbalanced loads can shift unexpectedly and create hazardous situations.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Rigging and Attachment</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Use proper rigging techniques with appropriate lines, shackles, and attachment points. The rigging
                      must be strong enough to handle the forces involved and should be inspected before use.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Environmental Factors</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Consider currents, visibility, bottom conditions, and overhead obstructions. Plan the lift path to
                      avoid entanglement hazards and ensure clear ascent to the surface or recovery point.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">Practical Example</h3>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="font-semibold mb-3">Problem:</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    A 200 kg anchor that displaces 127 liters of water lies on the bottom in 17 meters of sea water.
                    What is the minimum amount of water that must be displaced from a lifting device to bring the anchor
                    to the surface?
                  </p>

                  <p className="font-semibold mb-2">Solution:</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      <span className="font-semibold">Step 1:</span> Water weight displaced = 127 L × 1.03 kg/L = 130.8
                      kg
                    </p>
                    <p>
                      <span className="font-semibold">Step 2:</span> Negative buoyancy = 200 kg - 130.8 kg = 69.2 kg
                    </p>
                    <p>
                      <span className="font-semibold">Step 3:</span> Required displacement = 69.2 kg ÷ 1.03 kg/L = 67.2
                      L
                    </p>
                    <p>
                      <span className="font-semibold">Step 4:</span> With 15% safety margin = 67.2 L × 1.15 = 77.3 L
                    </p>
                  </div>

                  <div className="mt-4 p-3 bg-primary/10 rounded">
                    <p className="text-sm font-semibold">Answer:</p>
                    <p className="text-sm text-muted-foreground">
                      Minimum: 67.2 liters | Recommended: 77.3 liters (with safety margin)
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">Safety Guidelines</h3>
                <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Always use proper training before attempting underwater lifting operations</li>
                    <li>• Calculate buoyancy requirements carefully and add appropriate safety margins</li>
                    <li>• Use lift bags rated for the load and depth conditions</li>
                    <li>• Maintain control of the lift at all times - never let objects ascend uncontrolled</li>
                    <li>• Vent expanding air from lift bags during ascent to prevent runaway ascents</li>
                    <li>• Stay clear of the load during lifting - objects can shift or fall</li>
                    <li>• Plan the lift operation thoroughly, including emergency procedures</li>
                    <li>• Consider surface conditions and have recovery equipment ready</li>
                    <li>• Work with a team and maintain clear communication throughout the operation</li>
                  </ul>
                </div>
              </section>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
