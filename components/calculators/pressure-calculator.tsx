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
import { useI18n } from "@/lib/i18n/context"

interface PressureResults {
  absolutePressure: number
  gaugePressure: number
  partialPressureO2: number
  partialPressureN2: number
  atmospheres: number
}

export function PressureCalculator() {
  const { t } = useI18n()
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
        <h1 className="text-3xl font-bold text-foreground mb-2">{t.calculators.pressure.title}</h1>
        <p className="text-muted-foreground">{t.calculators.pressure.description}</p>
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
                  {t.calculatorUI.labels.inputParameters}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="depth">{t.calculatorUI.labels.depth}</Label>
                  <Input
                    id="depth"
                    type="number"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    min="0"
                    step="0.1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="oxygen">{t.calculatorUI.labels.oxygenPercentage}</Label>
                  <Input
                    id="oxygen"
                    type="number"
                    value={oxygenPercentage}
                    onChange={(e) => setOxygenPercentage(e.target.value)}
                    min="1"
                    max="100"
                    step="0.1"
                  />
                </div>

                <Button onClick={calculatePressure} className="w-full" size="lg">
                  {t.calculatorUI.buttons.calculatePressures}
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card>
              <CardHeader>
                <CardTitle>{t.calculatorUI.labels.pressureResults}</CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">{t.calculatorUI.labels.depth}</Label>
                        <Badge variant="secondary" className="text-base px-3 py-1">
                          {depth}m
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">{t.calculatorUI.labels.atmospheres}</Label>
                        <Badge variant="secondary" className="text-base px-3 py-1">
                          {results.atmospheres.toFixed(1)} ATM
                        </Badge>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{t.calculatorUI.labels.absolutePressure}:</span>
                        <span className="text-lg font-bold text-primary">
                          {results.absolutePressure.toFixed(2)} bar
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{t.calculatorUI.labels.gaugePressure}:</span>
                        <span className="text-lg font-bold text-primary">{results.gaugePressure.toFixed(2)} bar</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                        {t.calculatorUI.labels.partialPressures}
                      </h4>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{t.calculatorUI.labels.oxygen}:</span>
                        <span className="text-lg font-bold text-chart-1">
                          {results.partialPressureO2.toFixed(2)} bar
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{t.calculatorUI.labels.nitrogen}:</span>
                        <span className="text-lg font-bold text-chart-2">
                          {results.partialPressureN2.toFixed(2)} bar
                        </span>
                      </div>
                    </div>

                    {/* Safety Warnings */}
                    {results.partialPressureO2 > 1.4 && (
                      <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <p className="text-sm text-destructive font-medium">
                          {t.calculatorUI.warnings.oxygenToxicity}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>{t.calculatorUI.labels.enterParametersPrompt}</p>
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
                Water Properties & Physics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Water Density Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Water Density & Mass</h3>
                <p className="text-muted-foreground">
                  Water is approximately <strong>770 times more dense than air</strong>. This fundamental property
                  affects every aspect of diving physics.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold mb-2">Fresh Water</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Density: 1.0 kg/L</li>
                      <li>• 1 cubic meter = 1000 kg</li>
                      <li>• 10.3 meters = 1 bar pressure</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold mb-2">Sea Water</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Density: 1.03 kg/L</li>
                      <li>• 1 cubic meter = 1030 kg</li>
                      <li>• 10 meters = 1 bar pressure</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Heat Transmission Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Heat Transmission</h3>
                <p className="text-muted-foreground">
                  Water conducts heat approximately <strong>20 times faster than air</strong>, making thermal protection
                  critical for divers.
                </p>
                <div className="space-y-3">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold mb-2">Three Methods of Heat Transfer:</p>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>
                        <strong>1. Conduction:</strong> Direct heat transfer through contact. Water's high thermal
                        conductivity means you lose body heat rapidly when immersed.
                      </li>
                      <li>
                        <strong>2. Convection:</strong> Heat transfer through fluid movement. Water currents carry warm
                        water away from your body, accelerating heat loss.
                      </li>
                      <li>
                        <strong>3. Radiation:</strong> Heat transfer through electromagnetic waves. Less significant
                        underwater but still contributes to heat loss.
                      </li>
                    </ul>
                  </div>
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                    <p className="text-sm text-amber-900 dark:text-amber-200">
                      <strong>Safety Note:</strong> Hypothermia is a serious risk. Always use appropriate thermal
                      protection for water temperature and dive duration. Even in tropical waters (24°C/75°F), you can
                      become hypothermic on long dives.
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Light & Vision Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Light & Vision Underwater</h3>
                <p className="text-muted-foreground">
                  Water absorbs and refracts light, dramatically affecting visibility and color perception underwater.
                </p>
                <div className="space-y-3">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold mb-2">Light Absorption by Depth:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>
                        • <strong>Surface:</strong> Only 20% of sunlight reaches 10 meters depth
                      </li>
                      <li>
                        • <strong>5 meters:</strong> Red colors disappear (absorbed first)
                      </li>
                      <li>
                        • <strong>16 meters:</strong> Orange colors disappear
                      </li>
                      <li>
                        • <strong>30 meters:</strong> Yellow colors disappear
                      </li>
                      <li>
                        • <strong>50+ meters:</strong> Only blue-green light remains
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold mb-2">Refraction Effects:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>
                        • Objects appear <strong>25% closer</strong> than they actually are
                      </li>
                      <li>
                        • Objects appear <strong>33% larger</strong> than actual size
                      </li>
                      <li>• Refraction ratio: 4:3 (water to air)</li>
                      <li>• This affects depth perception and distance judgment</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold mb-2">Turbidity & Visual Effects:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Suspended particles scatter light, reducing visibility</li>
                      <li>
                        • <strong>Visual reversal:</strong> In murky water, objects may appear darker when closer
                      </li>
                      <li>• Fluorescent colors remain visible longer at depth</li>
                      <li>• Dive lights restore true colors by providing full-spectrum light</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Sound Underwater Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Sound Underwater</h3>
                <p className="text-muted-foreground">
                  Sound travels approximately <strong>4 times faster in water</strong> than in air, but this creates
                  challenges for divers.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold mb-2">Sound Speed:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• In air: ~340 m/s (1,115 ft/s)</li>
                      <li>• In water: ~1,500 m/s (4,920 ft/s)</li>
                      <li>• 4.4x faster underwater</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold mb-2">Directional Challenges:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Difficult to determine sound direction</li>
                      <li>• Sound reaches both ears almost simultaneously</li>
                      <li>• Boat engines can be heard from great distances</li>
                    </ul>
                  </div>
                </div>
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <p className="text-sm text-amber-900 dark:text-amber-200">
                    <strong>Safety Note:</strong> Because you cannot easily determine the direction of boat engines,
                    always use a surface marker buoy (SMB) when ascending and listen carefully for boat traffic.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Pressure Theory Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Pressure Calculations</h3>
                <p className="text-muted-foreground">
                  Understanding pressure is fundamental to safe diving. Pressure increases linearly with depth.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Absolute Pressure</h3>
                <p className="text-muted-foreground">
                  The total pressure exerted on a diver, including atmospheric pressure at the surface plus the pressure
                  from the water column above. Calculated as: <strong>P = 1 + (depth ÷ 10) atmospheres</strong>
                </p>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Example:</strong> At 30 meters depth: P = 1 + (30 ÷ 10) = 4 bar absolute pressure
                  </p>
                </div>
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
                  <strong>PPO₂ = Absolute Pressure × O₂ fraction</strong>. Critical for avoiding oxygen toxicity.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Oxygen Toxicity Limits:</h4>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>
                      • <strong>PPO₂ {"<"} 1.4 bar:</strong> Safe for recreational diving (working limit)
                    </li>
                    <li>
                      • <strong>PPO₂ 1.4-1.6 bar:</strong> Acceptable for decompression stops only
                    </li>
                    <li>
                      • <strong>PPO₂ {">"} 1.6 bar:</strong> High risk of oxygen toxicity (CNS toxicity)
                    </li>
                  </ul>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Key Safety Limits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="font-semibold mb-2 text-destructive">Oxygen Limits:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Working PPO₂: {"<"} 1.4 bar</li>
                      <li>• Deco PPO₂: {"<"} 1.6 bar</li>
                      <li>• Minimum PPO₂: {">"} 0.16 bar</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                    <p className="font-semibold mb-2 text-amber-900 dark:text-amber-200">Nitrogen Limits:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• PPN₂ {">"} 3.2 bar: Narcosis risk</li>
                      <li>• PPN₂ {">"} 4.0 bar: Significant impairment</li>
                      <li>• Equivalent to alcohol intoxication</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Safety Reminders */}
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="font-semibold mb-2 text-destructive">Critical Safety Reminders:</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    • <strong>Never hold your breath:</strong> Expanding air during ascent can cause lung overexpansion
                    injuries (arterial gas embolism)
                  </li>
                  <li>
                    • <strong>Ascend slowly:</strong> Maximum ascent rate of 9-10 meters (30 feet) per minute
                  </li>
                  <li>
                    • <strong>Monitor your depth:</strong> Stay within your training and certification limits
                  </li>
                  <li>
                    • <strong>Plan your dive, dive your plan:</strong> Always use dive tables or computers
                  </li>
                  <li>
                    • <strong>Safety stops:</strong> Perform a 3-5 minute safety stop at 5 meters (15 feet) on every
                    dive
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
