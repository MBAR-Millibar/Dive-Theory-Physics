"use client"

import Link from "next/link"
import { ArrowLeft, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useI18n } from "@/lib/i18n/context"
import { Navigation } from "@/components/navigation"

export default function AboutPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Back to Home Link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex justify-end mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.about.backToHome}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground">{t.about.title}</h1>
            <p className="text-xl text-muted-foreground">
              {t.about.subtitle}
            </p>
          </div>

          {/* Introduction */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">{t.about.whatIsTitle}</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{t.about.whatIsContent[0]}</p>
              <p>{t.about.whatIsContent[1]}</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-foreground">{t.about.areas.pressure.title}</strong>{" "}
                  {t.about.areas.pressure.description}
                </li>
                <li>
                  <strong className="text-foreground">{t.about.areas.airConsumption.title}</strong>{" "}
                  {t.about.areas.airConsumption.description}
                </li>
                <li>
                  <strong className="text-foreground">{t.about.areas.gasLaws.title}</strong>{" "}
                  {t.about.areas.gasLaws.description}
                </li>
                <li>
                  <strong className="text-foreground">{t.about.areas.buoyancy.title}</strong>{" "}
                  {t.about.areas.buoyancy.description}
                </li>
              </ul>
              <p>{t.about.dualApproach}</p>
            </div>
          </div>

          {/* Disclaimer */}
          <Alert variant="destructive" className="border-2">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle className="text-lg font-semibold">{t.about.disclaimer.title}</AlertTitle>
            <AlertDescription className="mt-2 space-y-2 text-sm leading-relaxed">
              <p>
                <strong>{t.about.disclaimer.warning}</strong> {t.about.disclaimer.warningText}
              </p>
              <p>{t.about.disclaimer.asIs}</p>
              <p>{t.about.disclaimer.risk}</p>
            </AlertDescription>
          </Alert>

          {/* Additional Info */}
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              {t.about.footer}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
