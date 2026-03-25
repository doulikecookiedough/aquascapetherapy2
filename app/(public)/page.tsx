export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-10 px-6 py-20 md:px-10">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
            Aquarium Portfolio + Tracker
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
            Aquascape Therapy
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted md:text-xl">
            A personal aquarium project for documenting contest entries,
            teaching aquarium keeping, and learning full-stack TypeScript by
            building a real product from scratch.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-surface p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold">Public Portfolio</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              Contest entries, galleries, and long-form writeups around
              aquascaping.
            </p>
          </div>
          <div className="rounded-3xl bg-surface p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold">Private Tracking App</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              Tanks, water tests, maintenance logs, and journal entries will
              live behind authentication.
            </p>
          </div>
          <div className="rounded-3xl bg-accent-soft p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold">Learning Goal</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              Each feature is being added incrementally with a clean history so
              the project also serves as a TypeScript learning record.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
