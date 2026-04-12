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
                {t.theory.pressure.waterPropertiesTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Water Density Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t.theory.pressure.waterDensityTitle}</h3>
                <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.theory.pressure.waterDensityIntro }} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold mb-2">{t.theory.pressure.freshWater}</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {t.theory.pressure.freshWaterDetails.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold mb-2">{t.theory.pressure.seaWater}</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {t.theory.pressure.seaWaterDetails.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Heat Transmission Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t.theory.pressure.heatTitle}</h3>
                <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.theory.pressure.heatIntro }} />
                <div className="space-y-3">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold mb-2">{t.theory.pressure.heatMethods}</p>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li><strong>1. {t.theory.pressure.conduction}</strong> {t.theory.pressure.conductionDesc}</li>
                      <li><strong>2. {t.theory.pressure.convection}</strong> {t.theory.pressure.convectionDesc}</li>
                      <li><strong>3. {t.theory.pressure.radiation}</strong> {t.theory.pressure.radiationDesc}</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                    <p className="text-sm text-amber-900 dark:text-amber-200">
                      <strong>{t.theory.pressure.heatSafetyNote}</strong> {t.theory.pressure.heatSafetyText}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Light & Vision Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t.theory.pressure.lightTitle}</h3>
                <p className="text-muted-foreground">{t.theory.pressure.lightIntro}</p>
                <div className="space-y-3">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold mb-2">{t.theory.pressure.lightAbsorption}</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {t.theory.pressure.lightAbsorptionDetails.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold mb-2">{t.theory.pressure.refraction}</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {t.theory.pressure.refractionDetails.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold mb-2">{t.theory.pressure.turbidity}</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {t.theory.pressure.turbidityDetails.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Sound Underwater Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t.theory.pressure.soundTitle}</h3>
                <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.theory.pressure.soundIntro }} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold mb-2">{t.theory.pressure.soundSpeed}</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {t.theory.pressure.soundSpeedDetails.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold mb-2">{t.theory.pressure.soundDirectionTitle}</p>
                    <p className="text-sm text-muted-foreground">{t.theory.pressure.soundDirectionText}</p>
                  </div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-semibold mb-2">{t.theory.pressure.soundPractical}</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {t.theory.pressure.soundPracticalDetails.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <Separator />

              {/* Pressure & Depth Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t.theory.pressure.pressureTitle}</h3>
                <p className="text-muted-foreground">{t.theory.pressure.pressureIntro}</p>
                <div className="space-y-3">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold mb-2">{t.theory.pressure.pressureKey}</p>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li><strong>{t.theory.pressure.atmosphericPressure}</strong> {t.theory.pressure.atmosphericPressureDesc}</li>
                      <li><strong>{t.theory.pressure.hydrostaticPressure}</strong> {t.theory.pressure.hydrostaticPressureDesc}</li>
                      <li><strong>{t.theory.pressure.absolutePressure}</strong> {t.theory.pressure.absolutePressureDesc}</li>
                      <li><strong>{t.theory.pressure.gaugePressure}</strong> {t.theory.pressure.gaugePressureDesc}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Pressure Table */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t.theory.pressure.pressureTable}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        {t.theory.pressure.pressureTableHeaders.map((header, i) => (
                          <th key={i} className="text-left p-2 font-semibold">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {t.theory.pressure.pressureTableRows.map((row, i) => (
                        <tr key={i} className="border-b">
                          {row.map((cell, j) => (
                            <td key={j} className="p-2 text-muted-foreground">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <Separator />

              {/* Partial Pressures Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{t.theory.pressure.partialPressureTitle}</h3>
                <p className="text-muted-foreground">{t.theory.pressure.partialPressureIntro}</p>
                <div className="space-y-3">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-semibold mb-2">{t.theory.pressure.partialPressureAir}</p>
                    <p className="text-sm text-muted-foreground mb-2">{t.theory.pressure.partialPressureAirText}</p>
                    <p className="font-semibold mb-1">{t.theory.pressure.partialPressureExample}</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {t.theory.pressure.partialPressureExampleDetails.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Safety Limits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="font-semibold mb-2 text-destructive">{t.theory.pressure.oxygenLimits}</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {t.theory.pressure.oxygenLimitsDetails.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <p className="font-semibold mb-2 text-amber-900 dark:text-amber-200">{t.theory.pressure.nitrogenNarcosis}</p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {t.theory.pressure.nitrogenNarcosisDetails.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
