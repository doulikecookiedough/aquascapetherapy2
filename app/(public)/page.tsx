import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-10 px-6 py-20 md:px-10">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
            Personal Portfolio + Studio
          </p>
          <h1 className="font-display text-5xl leading-tight tracking-tight text-foreground md:text-7xl">
            Aquarium Design Studio
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted md:text-xl">
            A personal portfolio for documenting aquariums, aquascapes, and the
            design decisions that shape them over time.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-surface p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold">Public Portfolio</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              A curated collection of aquariums, contest entries, and
              portfolio-grade aquascape presentation.
            </p>
          </div>
          <div className="rounded-3xl bg-surface p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold">Aquascape Documentation</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              Structured notes, equipment, plants, fauna, facts, and photo
              history for each aquascape.
            </p>
          </div>
          <div className="rounded-3xl bg-accent-soft p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold">Private Tracking</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              Tank management, maintenance, and future private workflows will
              live behind authentication.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 pt-2">
          <Link
            className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            href="/tanks"
          >
            <span style={{ color: "#ffffff" }}>See Preview</span>
          </Link>
          <p className="max-w-xl text-center text-sm leading-7 text-muted">
            View the current portfolio preview while the authoring and gallery
            flows take shape.
          </p>
        </div>
      </section>
    </main>
  );
}
