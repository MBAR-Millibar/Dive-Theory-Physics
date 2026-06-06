import { ExportToolbar } from "@/components/export/export-toolbar"
import { ExportDocument } from "@/components/export/export-document"

export default function ExportPage() {
  return (
    <main className="min-h-screen bg-background">
      <ExportToolbar />
      <div className="px-4 sm:px-6 py-8">
        <ExportDocument />
      </div>
    </main>
  )
}
