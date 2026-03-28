import Link from "next/link";

import { listTanks } from "@/server/queries/tanks";

export default async function Home() {
  const tanks = await listTanks();
  const featuredTank = tanks[0];
  const featuredAquascape = featuredTank?.aquascapes[0];
  const featuredImage =
    featuredAquascape?.images.find((image) => image.isPrimary) ??
    featuredAquascape?.images[0];

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

        <div className="flex flex-col gap-4 pt-2 sm:flex-row">
          <Link
            className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            href="/tanks"
          >
            <span style={{ color: "#ffffff" }}>Aquariums</span>
          </Link>
          <p className="max-w-xl text-sm leading-7 text-muted">
            View the current aquarium collection, preview the latest aquascape
            for each tank, and continue documenting new work over time.
          </p>
        </div>

        {featuredTank && featuredAquascape ? (
          <div className="rounded-[2rem] bg-surface p-6 shadow-sm ring-1 ring-black/5 md:p-8">
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
                Featured Aquarium
              </p>
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                <div className="flex-1 space-y-3">
                  <h2 className="font-display text-3xl tracking-tight text-foreground md:text-4xl">
                    {featuredTank.name}
                  </h2>
                  <p className="text-sm leading-7 text-muted">
                    Latest aquascape: {featuredAquascape.name}
                  </p>
                  {featuredAquascape.description ? (
                    <p className="max-w-2xl text-sm leading-7 text-muted">
                      {featuredAquascape.description}
                    </p>
                  ) : null}
                  <Link
                    className="inline-flex items-center justify-center rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-black/5"
                    href="/tanks"
                  >
                    View Collection
                  </Link>
                </div>

                <div className="w-full lg:max-w-xl">
                  {featuredImage ? (
                    <div className="flex min-h-72 w-full items-center justify-center rounded-[1.5rem] bg-background/70 p-4">
                      <img
                        className="max-h-96 w-full object-contain"
                        src={featuredImage.src}
                        alt={featuredImage.alt}
                      />
                    </div>
                  ) : (
                    <div className="flex min-h-72 w-full items-center justify-center rounded-[1.5rem] border border-dashed border-black/10 bg-background/70 px-6 text-center">
                      <p className="text-sm font-medium text-muted">
                        Image not available yet
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
