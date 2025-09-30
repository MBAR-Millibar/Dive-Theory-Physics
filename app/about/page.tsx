import Link from "next/link"
import { ArrowLeft, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Back to Home Link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex justify-end mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground">About Dive Theory</h1>
            <p className="text-xl text-muted-foreground">
              Your comprehensive companion for scuba diving physics and calculations
            </p>
          </div>

          {/* Introduction */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">What is Dive Theory?</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Dive Theory is an educational application designed to help scuba diving students and professionals
                understand and apply the fundamental physics principles that govern underwater diving. Whether you're
                preparing for your certification exams or need a quick reference tool in the field, our app provides
                accurate calculations and clear explanations of essential diving concepts.
              </p>
              <p>The app covers four critical areas of dive theory:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-foreground">Pressure Calculations:</strong> Calculate absolute pressure, gauge
                  pressure, and partial pressures at various depths, with built-in safety warnings for oxygen toxicity.
                </li>
                <li>
                  <strong className="text-foreground">Air Consumption:</strong> Determine your Surface Air Consumption
                  (SAC) rate, Respiratory Minute Volume (RMV), and plan your dives with accurate air supply
                  calculations.
                </li>
                <li>
                  <strong className="text-foreground">Gas Laws:</strong> Explore and apply Charles's Law, Dalton's Law,
                  and Gay-Lussac's Law with interactive calculators that demonstrate how these principles affect diving
                  operations.
                </li>
                <li>
                  <strong className="text-foreground">Lift and Displacement:</strong> Calculate buoyancy forces, lifting
                  capacity, and water displacement for underwater operations and object recovery.
                </li>
              </ul>
              <p>
                Each calculator includes both practical calculation tools and comprehensive theory sections to help you
                understand the underlying physics. This dual approach ensures you not only get the right numbers but
                also comprehend why they matter for safe diving practices.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <Alert variant="destructive" className="border-2">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle className="text-lg font-semibold">Important Disclaimer</AlertTitle>
            <AlertDescription className="mt-2 space-y-2 text-sm leading-relaxed">
              <p>
                <strong>Warning:</strong> These calculations should only be used carefully and as educational
                references. Always verify calculations independently and follow safe diving practices established by
                recognized diving organizations.
              </p>
              <p>
                This application is provided "as is" without warranty of any kind, either expressed or implied,
                including but not limited to the implied warranties of merchantability and fitness for a particular
                purpose. We do not accept any responsibility for inaccuracies, errors, or any consequences that may
                result from the use of this application.
              </p>
              <p>
                Scuba diving is an inherently risky activity. Always dive within your training and certification limits,
                follow proper dive planning procedures, and consult with certified dive professionals before making any
                diving decisions.
              </p>
            </AlertDescription>
          </Alert>

          {/* Additional Info */}
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              Dive Theory is designed for educational purposes to support scuba diving training and certification
              programs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
