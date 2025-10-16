"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Scale, Info, ArrowLeft } from "lucide-react"

export default function WeightCalculatorPage() {
  const [bodyWeight, setBodyWeight] = useState<string>("70")
  const [weightUnit, setWeightUnit] = useState<string>("kg")
  const [suitType, setSuitType] = useState<string>("none")
  const [tankType, setTankType] = useState<string>("aluminum")
  const [waterType, setWaterType] = useState<string>("saltwater")
  const [bodyType, setBodyType] = useState<string>("average")

  const calculateWeight = () => {
    const weight = Number.parseFloat(bodyWeight)
    if (isNaN(weight) || weight <= 0) return null

    const weightInKg = weightUnit === "lbs" ? weight * 0.453592 : weight

    let baseWeight = 0

    // Suit type adjustments
    const suitWeights: Record<string, number> = {
      none: 0,
      "3mm": 2,
      "5mm": 4,
      "7mm": 7,
      drysuit: 10,
    }
    baseWeight += suitWeights[suitType] || 0

    // Tank type adjustments
    const tankWeights: Record<string, number> = {
      aluminum: 2,
      steel: -2,
    }
    baseWeight += tankWeights[tankType] || 0

    // Water type adjustments
    const waterWeights: Record<string, number> = {
      saltwater: 2.5,
      freshwater: 0,
    }
    baseWeight += waterWeights[waterType] || 0

    // Body type adjustments (percentage of body weight)
    const bodyTypeFactors: Record<string, number> = {
      lean: 0.08,
      average: 0.1,
      heavy: 0.12,
    }
    baseWeight += weightInKg * (bodyTypeFactors[bodyType] || 0.1)

    return {
      kg: Math.round(baseWeight * 10) / 10,
      lbs: Math.round(baseWeight * 2.20462 * 10) / 10,
    }
  }

  const result = calculateWeight()

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
              <Scale className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Weight Requirements Calculator</h1>
              <p className="text-lg text-muted-foreground mt-1">Calculate proper weighting for neutral buoyancy</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Weight Calculator</CardTitle>
                <CardDescription>Enter your diving configuration to calculate required weight</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bodyWeight">Body Weight</Label>
                  <div className="flex gap-2">
                    <Input
                      id="bodyWeight"
                      type="number"
                      value={bodyWeight}
                      onChange={(e) => setBodyWeight(e.target.value)}
                      placeholder="70"
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
                  <Label htmlFor="suitType">Exposure Suit Type</Label>
                  <Select value={suitType} onValueChange={setSuitType}>
                    <SelectTrigger id="suitType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Suit / Swimsuit</SelectItem>
                      <SelectItem value="3mm">3mm Wetsuit</SelectItem>
                      <SelectItem value="5mm">5mm Wetsuit</SelectItem>
                      <SelectItem value="7mm">7mm Wetsuit</SelectItem>
                      <SelectItem value="drysuit">Drysuit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tankType">Tank Type</Label>
                  <Select value={tankType} onValueChange={setTankType}>
                    <SelectTrigger id="tankType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aluminum">Aluminum</SelectItem>
                      <SelectItem value="steel">Steel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="waterType">Water Type</Label>
                  <Select value={waterType} onValueChange={setWaterType}>
                    <SelectTrigger id="waterType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saltwater">Saltwater</SelectItem>
                      <SelectItem value="freshwater">Freshwater</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bodyType">Body Composition</Label>
                  <Select value={bodyType} onValueChange={setBodyType}>
                    <SelectTrigger id="bodyType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lean">Lean (Low body fat)</SelectItem>
                      <SelectItem value="average">Average</SelectItem>
                      <SelectItem value="heavy">Heavy (Higher body fat)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {result && (
                  <Alert className="bg-primary/10 border-primary/20">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      <div className="font-semibold mb-2">Recommended Weight:</div>
                      <div className="text-2xl font-bold text-primary">
                        {result.kg} kg ({result.lbs} lbs)
                      </div>
                      <div className="text-sm mt-2 text-muted-foreground">
                        This is a starting point. Always perform a buoyancy check and adjust as needed.
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Reference</CardTitle>
                <CardDescription>Typical weight adjustments by equipment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Exposure Suit</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• No suit: 0 kg</li>
                      <li>• 3mm wetsuit: +2 kg</li>
                      <li>• 5mm wetsuit: +4 kg</li>
                      <li>• 7mm wetsuit: +7 kg</li>
                      <li>• Drysuit: +10 kg</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Tank Type</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Aluminum: +2 kg (becomes positive when empty)</li>
                      <li>• Steel: -2 kg (stays negative when empty)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Water Type</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Saltwater: +2.5 kg (more buoyant)</li>
                      <li>• Freshwater: 0 kg (baseline)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Body Composition</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Lean: ~8% of body weight</li>
                      <li>• Average: ~10% of body weight</li>
                      <li>• Heavy: ~12% of body weight</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card id="theory" className="scroll-mt-24">
            <CardHeader>
              <CardTitle className="text-2xl">Theory: Buoyancy and Weight Requirements</CardTitle>
              <CardDescription>Understanding why divers need weight and how to calculate it</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-foreground">
              <section>
                <h3 className="text-xl font-semibold mb-3">Why Do Divers Need Weight?</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The human body is naturally buoyant, especially in saltwater. When you add exposure protection
                  (wetsuits or drysuits) and equipment, you become even more buoyant. Divers add weight to achieve
                  neutral buoyancy, allowing them to hover effortlessly at any depth without floating up or sinking
                  down.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">The Goal: Neutral Buoyancy</p>
                  <p className="text-sm text-muted-foreground">
                    Proper weighting allows you to maintain depth with minimal effort, conserve air, protect marine
                    life, and improve your overall diving experience.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">Factors Affecting Weight Requirements</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">1. Body Composition</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Fat tissue is more buoyant than muscle and bone. Divers with higher body fat percentages typically
                      need more weight. As a general rule, you need approximately 10% of your body weight in lead, but
                      this varies based on individual body composition.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">2. Exposure Protection</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Neoprene wetsuits contain tiny gas bubbles that provide insulation but also add significant
                      buoyancy. Thicker suits require more weight. Drysuits add even more buoyancy because they contain
                      a layer of air for insulation.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">3. Tank Material</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Aluminum tanks become positively buoyant when empty (about +2 kg), requiring more weight at the
                      start of the dive. Steel tanks remain negatively buoyant throughout the dive, reducing the amount
                      of lead weight needed.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">4. Water Salinity</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Saltwater is denser than freshwater (1.025 g/cm³ vs 1.0 g/cm³), providing more buoyant force. You
                      typically need 2-3 kg more weight in saltwater compared to freshwater.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">The Buoyancy Check</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Calculators provide a starting point, but the only way to determine your exact weight requirements is
                  to perform a buoyancy check:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>Enter the water with all your gear and a nearly empty tank (50 bar / 500 psi)</li>
                  <li>Fully deflate your BCD</li>
                  <li>Hold a normal breath and relax</li>
                  <li>You should float at eye level</li>
                  <li>When you exhale, you should slowly sink</li>
                </ol>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  If you float too high, add weight. If you sink too quickly, remove weight. Make adjustments in 1 kg (2
                  lbs) increments.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">Weight Distribution</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Proper weight distribution is as important as the total amount of weight:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <span className="font-semibold">Weight Belt:</span> Traditional method, worn around the waist.
                    Should be easily ditchable in an emergency.
                  </li>
                  <li>
                    <span className="font-semibold">Integrated Weights:</span> Built into the BCD, often more
                    comfortable and better distributed.
                  </li>
                  <li>
                    <span className="font-semibold">Trim Weights:</span> Small weights placed on tank bands or BCD to
                    adjust body position in the water.
                  </li>
                  <li>
                    <span className="font-semibold">Ankle Weights:</span> Used to counteract buoyant feet, especially
                    with thick boots or drysuits.
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">Common Mistakes</h3>
                <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg space-y-3">
                  <div>
                    <p className="font-semibold text-destructive">Being Overweighted</p>
                    <p className="text-sm text-muted-foreground">
                      Many divers carry too much weight, leading to increased air consumption, difficulty maintaining
                      depth, and potential damage to the reef from poor buoyancy control.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-destructive">Not Accounting for Tank Weight Change</p>
                    <p className="text-sm text-muted-foreground">
                      A full tank is heavier than an empty one. You should be properly weighted for the end of your dive
                      when your tank is nearly empty.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-destructive">Forgetting to Adjust for Conditions</p>
                    <p className="text-sm text-muted-foreground">
                      Weight requirements change with different suits, tanks, and water types. Always reassess when
                      conditions change.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-3">Safety Considerations</h3>
                <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Always ensure your weights are easily ditchable in an emergency</li>
                    <li>• Practice weight removal and replacement at the surface before diving</li>
                    <li>• Never dive significantly overweighted - it increases risk and reduces enjoyment</li>
                    <li>• Reassess your weighting periodically as your skills and equipment change</li>
                    <li>• Consider using a weight check at the safety stop to verify proper weighting</li>
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
