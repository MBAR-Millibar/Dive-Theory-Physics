import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function QuestCta() {
  return (
    <section className="relative bg-gradient-to-br from-primary/15 via-accent/10 to-primary/5 py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-sm font-medium text-primary uppercase tracking-wider mb-3">
          Want more?
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
          Check Quest
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto text-pretty">
          Take your diving knowledge to the next level with interactive quizzes and challenges.
        </p>
        <Button asChild size="lg" className="text-lg px-8 gap-2">
          <Link href="https://quest.millibar.io" target="_blank" rel="noopener noreferrer">
            Go to Quest
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
