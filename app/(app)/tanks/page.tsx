import {
  createTankAction,
  deleteTankAction,
} from "@/app/(app)/tanks/actions";
import {
  calculateTankVolumeGallons,
  calculateTankVolumeLiters,
} from "@/lib/tank-math";
import { listTanks } from "@/server/queries/tanks";

export default async function TanksPage() {
  const tanks = await listTanks();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-6 py-16 md:px-10">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
          App
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">Tanks</h1>
        <p className="max-w-2xl text-base leading-7 text-muted">
          The first database-backed page is now reading tank records from
          PostgreSQL through Prisma.
        </p>
      </div>

      <section className="mt-12 space-y-6">
        <div className="rounded-3xl bg-surface p-8 shadow-sm ring-1 ring-black/5">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Add a Tank
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-muted">
              This simple form is the first full write flow in the app: browser
              form data is submitted to a server action, validated, and then
              persisted through Prisma.
            </p>
          </div>

          <form action={createTankAction} className="mt-6 grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-medium">Tank Name</span>
              <input
                className="rounded-2xl border border-black/10 bg-background px-4 py-3 outline-none ring-0"
                type="text"
                name="name"
                placeholder="Nature Style 90P"
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium">Length (cm)</span>
              <input
                className="rounded-2xl border border-black/10 bg-background px-4 py-3 outline-none ring-0"
                type="number"
                name="lengthCm"
                min="1"
                step="1"
                placeholder="90"
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium">Width (cm)</span>
              <input
                className="rounded-2xl border border-black/10 bg-background px-4 py-3 outline-none ring-0"
                type="number"
                name="widthCm"
                min="1"
                step="1"
                placeholder="45"
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium">Height (cm)</span>
              <input
                className="rounded-2xl border border-black/10 bg-background px-4 py-3 outline-none ring-0"
                type="number"
                name="heightCm"
                min="1"
                step="1"
                placeholder="45"
                required
              />
            </label>

            <div>
              <button
                className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
                type="submit"
              >
                Create Tank
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">
            Tank Inventory
          </h2>
          <p className="text-sm text-muted">
            {tanks.length} {tanks.length === 1 ? "tank" : "tanks"}
          </p>
        </div>

        {tanks.length === 0 ? (
          <div className="rounded-3xl bg-surface p-8 shadow-sm ring-1 ring-black/5">
            <h3 className="text-lg font-semibold">No tanks yet</h3>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
              Once tank records are created, they will appear here as the first
              real Prisma-backed feature in the app.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {tanks.map((tank) => {
              const latestAquascape = tank.aquascapes[0];
              const primaryImage = latestAquascape?.images.find(
                (image) => image.isPrimary,
              ) ?? latestAquascape?.images[0];

              return (
                <article
                  key={tank.id}
                  className="rounded-3xl bg-surface p-6 shadow-sm ring-1 ring-black/5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">{tank.name}</h3>
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
                    <p className="text-xs uppercase tracking-[0.2em] text-accent">
                      Tank
                    </p>
                  </div>

                  <div className="mt-4 rounded-2xl bg-accent-soft/60 p-4">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                      Latest Aquascape
                    </p>
                    {latestAquascape ? (
                      <div className="mt-3 space-y-4">
                        {primaryImage ? (
                          <img
                            className="h-64 w-full rounded-2xl object-cover"
                            src={primaryImage.src}
                            alt={primaryImage.alt}
                          />
                        ) : (
                          <div className="flex h-64 w-full items-center justify-center rounded-2xl border border-dashed border-black/10 bg-background/70 px-6 text-center">
                            <p className="text-sm font-medium text-muted">
                              Image not available yet
                            </p>
                          </div>
                        )}

                        <div className="space-y-2">
                          <h4 className="text-base font-semibold">
                            {latestAquascape.name}
                          </h4>
                          {latestAquascape.description ? (
                            <p className="text-sm leading-7 text-muted">
                              {latestAquascape.description}
                            </p>
                          ) : null}
                        </div>

                        <div className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">
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

                  <form action={deleteTankAction} className="mt-4">
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
