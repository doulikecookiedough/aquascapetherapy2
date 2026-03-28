import {
  createTankAction,
  deleteTankAction,
} from "@/app/(app)/tanks/actions";
import { CreateTankPanel } from "@/app/(app)/tanks/create-tank-panel";
import {
  calculateTankVolumeGallons,
  calculateTankVolumeLiters,
} from "@/lib/tank-math";
import { listTanks } from "@/server/queries/tanks";

export default async function TanksPage() {
  const tanks = await listTanks();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-16 md:px-10 lg:px-12">
      <div className="space-y-5 border-b border-black/5 pb-10">
        <p className="text-xs font-medium uppercase tracking-[0.4em] text-accent">
          Aquarium Design Studio
        </p>
        <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
          Aquariums
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-muted">
          A living index of the aquariums and aquascapes currently being
          documented.
        </p>
      </div>

      <section className="mt-12 space-y-8">
        <CreateTankPanel action={createTankAction} />

        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold tracking-tight">
            Aquarium Collection
          </h2>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            {tanks.length} {tanks.length === 1 ? "tank" : "tanks"}
          </p>
        </div>

        {tanks.length === 0 ? (
          <div className="rounded-3xl bg-surface p-10 shadow-sm ring-1 ring-black/5">
            <h3 className="text-lg font-semibold">No tanks yet</h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
              Start by adding an aquarium to begin documenting its aquascapes
              over time.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {tanks.map((tank) => {
              const latestAquascape = tank.aquascapes[0];
              const primaryImage = latestAquascape?.images.find(
                (image) => image.isPrimary,
              ) ?? latestAquascape?.images[0];

              return (
                <article
                  key={tank.id}
                  className="rounded-[2rem] bg-surface p-7 shadow-sm ring-1 ring-black/5 md:p-8"
                >
                  <div className="flex items-start justify-between gap-6 border-b border-black/5 pb-5">
                    <div className="space-y-3">
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                        Aquarium
                      </p>
                      <h3 className="text-2xl font-semibold tracking-tight">
                        {tank.name}
                      </h3>
                      <p className="text-sm leading-7 text-muted">
                        {tank.lengthCm} x {tank.widthCm} x {tank.heightCm} cm
                      </p>
                      <p className="text-sm text-muted">
                        {calculateTankVolumeLiters(
                          tank.lengthCm,
                          tank.widthCm,
                          tank.heightCm,
                        )}{" "}
                        liters /{" "}
                        {calculateTankVolumeGallons(
                          calculateTankVolumeLiters(
                            tank.lengthCm,
                            tank.widthCm,
                            tank.heightCm,
                          ),
                        )}{" "}
                        gallons
                      </p>
                    </div>
                    <p className="rounded-full bg-accent-soft px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                      {tank.isPublic ? "Public" : "Private"}
                    </p>
                  </div>

                  <div className="mt-6 rounded-[1.5rem] bg-accent-soft/60 p-5 md:p-6">
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
                      Latest Aquascape
                    </p>
                    {latestAquascape ? (
                      <div className="mt-4 space-y-5">
                        {primaryImage ? (
                          <div className="flex min-h-64 w-full items-center justify-center rounded-2xl bg-background/70 p-4">
                            <img
                              className="max-h-80 w-full object-contain"
                              src={primaryImage.src}
                              alt={primaryImage.alt}
                            />
                          </div>
                        ) : (
                          <div className="flex h-64 w-full items-center justify-center rounded-2xl border border-dashed border-black/10 bg-background/70 px-6 text-center">
                            <p className="text-sm font-medium text-muted">
                              Image not available yet
                            </p>
                          </div>
                        )}

                        <div className="space-y-2">
                          <h4 className="text-xl font-semibold tracking-tight">
                            {latestAquascape.name}
                          </h4>
                          {latestAquascape.description ? (
                            <p className="max-w-3xl text-sm leading-7 text-muted">
                              {latestAquascape.description}
                            </p>
                          ) : null}
                        </div>

                        <div className="flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-accent">
                          <span className="rounded-full bg-background/70 px-3 py-2">
                            {latestAquascape.plants.length}{" "}
                            {latestAquascape.plants.length === 1
                              ? "plant"
                              : "plants"}
                          </span>
                          <span className="rounded-full bg-background/70 px-3 py-2">
                            {latestAquascape.fauna.length}{" "}
                            {latestAquascape.fauna.length === 1
                              ? "fauna"
                              : "fauna"}
                          </span>
                          <span className="rounded-full bg-background/70 px-3 py-2">
                            {latestAquascape.facts.length}{" "}
                            {latestAquascape.facts.length === 1
                              ? "fact"
                              : "facts"}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="mt-2 text-sm leading-7 text-muted">
                        No aquascapes have been added to this tank yet.
                      </p>
                    )}
                  </div>

                  <form action={deleteTankAction} className="mt-5">
                    <input type="hidden" name="tankId" value={tank.id} />
                    <button
                      className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-black/5"
                      type="submit"
                    >
                      Delete Tank
                    </button>
                  </form>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
