import Link from "next/link"

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <p className="mt-4 text-muted-foreground">
            <Link href="https://millibar.io/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            {" | "}
            <Link href="https://millibar.io/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            {" | "}
            <Link href="https://millibar.io/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            {" | "}
            <Link href="https://millibar.io/security" className="hover:text-foreground transition-colors">
              Security
            </Link>
            {" | "}
            <Link href="https://millibar.io/imprint" className="hover:text-foreground transition-colors">
              Imprint
            </Link>
          </p>
          <p className="mt-4 text-muted-foreground">2025 © Millibar Technologies UG - All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}
