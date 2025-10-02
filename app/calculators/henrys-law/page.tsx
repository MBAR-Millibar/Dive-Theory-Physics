import { HenrysLawCalculator } from "@/components/calculators/henrys-law-calculator"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Henry's Law Calculator - Dive Theory",
  description:
    "Understand gas dissolution, tissue saturation, and decompression principles with our interactive Henry's Law calculator.",
}

export default function HenrysLawPage() {
  return (
    <div className="min-h-screen bg-background">
    <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-end">
          <Link href="/">
            <Button variant="default" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
      <HenrysLawCalculator />
    </div>
  )
}
