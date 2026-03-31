import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-black/5 bg-background/95">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-10 lg:px-12">
        <Link
          className="font-display text-xl tracking-tight text-foreground transition-opacity hover:opacity-80"
          href="/"
        >
          Aquarium Design Studio
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-6 text-sm font-medium">
          <Link
            className="text-foreground transition-opacity hover:opacity-80"
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-foreground transition-opacity hover:opacity-80"
            href="/tanks"
          >
            My Portfolio
          </Link>
        </nav>
      </div>
    </header>
  );
}
