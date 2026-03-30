import Link from "next/link";
import { notFound } from "next/navigation";

import {
  calculateTankVolumeGallons,
  calculateTankVolumeLiters,
} from "@/lib/tank-math";
import { getTankById } from "@/server/queries/tanks";

type TankDetailPageProps = {
  params: Promise<{
    tankId: string;
  }>;
};

export default async function TankDetailPage({ params }: TankDetailPageProps) {
  const { tankId } = await params;
  const tank = await getTankById(tankId);

  if (!tank) {
    notFound();
  }

  const currentAquascape = tank.aquascapes[0];
  const olderAquascapes = tank.aquascapes.slice(1);
  const currentImage =
    currentAquascape?.images.find((image) => image.isPrimary) ??
    currentAquascape?.images[0];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-16 md:px-10 lg:px-12">
      <div className="space-y-6 border-b border-black/5 pb-10">
        <Link
          className="inline-flex items-center text-sm font-medium text-accent transition-opacity hover:opacity-80"
          href="/tanks"
        >
          Back to Aquariums
        </Link>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-accent">
              Aquarium Detail
            </p>
            <h1 className="font-display text-5xl leading-tight tracking-tight text-foreground md:text-6xl">
              {tank.name}
            </h1>
            <p className="text-lg leading-8 text-muted">
              A living record of the aquascapes documented in this aquarium.
            </p>
          </div>
          <p className="rounded-full bg-accent-soft px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {tank.isPublic ? "Public" : "Private"}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-muted">
          <span>{tank.lengthCm} x {tank.widthCm} x {tank.heightCm} cm</span>
          <span aria-hidden="true">/</span>
          <span>
            {calculateTankVolumeLiters(tank.lengthCm, tank.widthCm, tank.heightCm)} liters
          </span>
          <span aria-hidden="true">/</span>
          <span>
            {calculateTankVolumeGallons(
              calculateTankVolumeLiters(
                tank.lengthCm,
                tank.widthCm,
                tank.heightCm,
              ),
            )}{" "}
            gallons
          </span>
        </div>
      </div>

      {currentAquascape ? (
        <section className="mt-12 space-y-5 rounded-[2rem] bg-surface p-7 shadow-sm ring-1 ring-black/5 md:p-8">
          <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
            Current Aquascape
          </h2>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:items-start">
            <div className="space-y-4">
              <h3 className="font-display text-4xl tracking-tight text-foreground">
                {currentAquascape.name}
              </h3>
              {currentAquascape.description ? (
                <p className="max-w-2xl text-sm leading-7 text-muted">
                  {currentAquascape.description}
                </p>
              ) : null}
              <div className="flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-accent">
                <span className="rounded-full bg-accent-soft px-3 py-2">
                  {currentAquascape.plants.length}{" "}
                  {currentAquascape.plants.length === 1 ? "plant" : "plants"}
                </span>
                <span className="rounded-full bg-accent-soft px-3 py-2">
                  {currentAquascape.fauna.length} fauna
                </span>
                <span className="rounded-full bg-accent-soft px-3 py-2">
                  {currentAquascape.facts.length}{" "}
                  {currentAquascape.facts.length === 1 ? "fact" : "facts"}
                </span>
              </div>
            </div>

            <div>
              {currentImage ? (
                <div className="flex min-h-72 w-full items-center justify-center rounded-[1.5rem] bg-background/70 p-4">
                  <img
                    className="max-h-96 w-full object-contain"
                    src={currentImage.src}
                    alt={currentImage.alt}
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
        </section>
      ) : (
        <section className="mt-12 rounded-[2rem] bg-surface p-8 shadow-sm ring-1 ring-black/5">
          <h2 className="font-display text-3xl tracking-tight">No aquascapes yet</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
            Aquascape history will appear here once layouts have been added to this aquarium.
          </p>
        </section>
      )}

      <section className="mt-12 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl tracking-tight">
            Aquascape History
          </h2>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            {tank.aquascapes.length}{" "}
            {tank.aquascapes.length === 1 ? "aquascape" : "aquascapes"}
          </p>
        </div>

        {tank.aquascapes.length === 0 ? (
          <div className="rounded-[2rem] bg-surface p-8 shadow-sm ring-1 ring-black/5">
            <p className="text-sm leading-7 text-muted">
              This aquarium does not have any documented aquascapes yet.
            </p>
          </div>
        ) : olderAquascapes.length === 0 ? (
          <div className="rounded-[2rem] bg-surface p-8 shadow-sm ring-1 ring-black/5">
            <p className="text-sm leading-7 text-muted">
              This aquarium currently has one documented aquascape. Older layouts
              will appear here as the history grows.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {olderAquascapes.map((aquascape) => {
              const historyImage =
                aquascape.images.find((image) => image.isPrimary) ??
                aquascape.images[0];

              return (
                <article
                  key={aquascape.id}
                  className="rounded-[1.75rem] bg-surface p-6 shadow-sm ring-1 ring-black/5"
                >
                  <div className="grid gap-5 md:grid-cols-[9rem_minmax(0,1fr)] md:items-start">
                    <div className="flex h-36 w-full items-center justify-center rounded-[1.25rem] bg-background/70 p-3">
                      {historyImage ? (
                        <img
                          className="max-h-32 w-full object-contain"
                          src={historyImage.src}
                          alt={historyImage.alt}
                        />
                      ) : (
                        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted">
                          No image
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-semibold tracking-tight">
                          {aquascape.name}
                        </h3>
                      </div>
                      {aquascape.description ? (
                        <p className="max-w-3xl text-sm leading-7 text-muted">
                          {aquascape.description}
                        </p>
                      ) : null}
                      <div className="flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-accent">
                        <span className="rounded-full bg-accent-soft px-3 py-2">
                          {aquascape.plants.length}{" "}
                          {aquascape.plants.length === 1 ? "plant" : "plants"}
                        </span>
                        <span className="rounded-full bg-accent-soft px-3 py-2">
                          {aquascape.fauna.length} fauna
                        </span>
                        <span className="rounded-full bg-accent-soft px-3 py-2">
                          {aquascape.facts.length}{" "}
                          {aquascape.facts.length === 1 ? "fact" : "facts"}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </section>
    </main>
  );
}
