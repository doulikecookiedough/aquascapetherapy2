import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AddEquipmentPanel } from "@/app/(public)/aquascapes/[slug]/add-equipment-panel";
import { AddFactPanel } from "@/app/(public)/aquascapes/[slug]/add-fact-panel";
import {
  createAquascapeEquipmentAction,
  createAquascapeFactAction,
  createAquascapeImageAction,
  createAquascapePlantAction,
} from "@/app/(public)/aquascapes/[slug]/actions";
import { AddImagePanel } from "@/app/(public)/aquascapes/[slug]/add-image-panel";
import { AddPlantPanel } from "@/app/(public)/aquascapes/[slug]/add-plant-panel";
import { getAquascapeBySlug } from "@/server/queries/aquascapes";
import { listFactTypes } from "@/server/queries/fact-types";
import { listPlants } from "@/server/queries/plants";

type AquascapeDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function AquascapeDetailPage({
  params,
}: AquascapeDetailPageProps) {
  const { slug } = await params;
  const [aquascape, factTypes, plants] = await Promise.all([
    getAquascapeBySlug(slug),
    listFactTypes(),
    listPlants(),
  ]);

  if (!aquascape) {
    notFound();
  }

  const primaryImage =
    aquascape.images.find((image) => image.isPrimary) ?? aquascape.images[0];
  const additionalImages = primaryImage
    ? aquascape.images.filter((image) => image.id !== primaryImage.id)
    : aquascape.images;
  const repeatableFactCounts = new Map<string, number>();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-16 md:px-10 lg:px-12">
      <div className="space-y-6 border-b border-black/5 pb-10">
        <Link
          className="inline-flex items-center text-sm font-medium text-accent transition-opacity hover:opacity-80"
          href={`/tanks/${aquascape.tankId}`}
        >
          Back to {aquascape.tank.name}
        </Link>

        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-accent">
            Aquascape Journal
          </p>
          <h1 className="font-display max-w-4xl text-5xl leading-tight tracking-tight text-foreground md:text-6xl">
            {aquascape.name}
          </h1>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
            {aquascape.tank.name}
          </p>
          {aquascape.description ? (
            <p className="max-w-3xl text-lg leading-8 text-muted">
              {aquascape.description}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-12">
        <AddImagePanel
          aquascapeId={aquascape.id}
          action={createAquascapeImageAction}
        />
      </div>

      <div className="mt-8">
        <AddEquipmentPanel
          aquascapeId={aquascape.id}
          action={createAquascapeEquipmentAction}
        />
      </div>

      <div className="mt-8">
        <AddFactPanel
          aquascapeId={aquascape.id}
          factTypes={factTypes}
          action={createAquascapeFactAction}
        />
      </div>

      <div className="mt-8">
        <AddPlantPanel
          aquascapeId={aquascape.id}
          plants={plants}
          action={createAquascapePlantAction}
        />
      </div>

      <section className="mt-8 space-y-6 rounded-[2rem] bg-surface p-7 shadow-sm ring-1 ring-black/5 md:p-8">
        <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
          Current View
        </h2>
        {primaryImage ? (
          <div className="space-y-5">
            <div className="flex min-h-80 w-full items-center justify-center rounded-[1.5rem] bg-background/70 p-4">
              <Image
                className="max-h-[32rem] w-full object-contain"
                src={primaryImage.src}
                alt={primaryImage.alt}
                width={1800}
                height={1350}
                sizes="(min-width: 1024px) 72rem, 100vw"
              />
            </div>

            {additionalImages.length > 0 ? (
              <div className="space-y-4">
                <h3 className="font-display text-2xl tracking-tight">
                  Additional Photos
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {additionalImages.map((image) => (
                    <div
                      key={image.id}
                      className="flex min-h-56 items-center justify-center rounded-[1.25rem] bg-background/70 p-4"
                    >
                      <Image
                        className="max-h-72 w-full object-contain"
                        src={image.src}
                        alt={image.alt}
                        width={1200}
                        height={900}
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="flex min-h-80 w-full items-center justify-center rounded-[1.5rem] border border-dashed border-black/10 bg-background/70 px-6 text-center">
            <p className="text-sm font-medium text-muted">
              Image not available yet
            </p>
          </div>
        )}
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-surface p-7 shadow-sm ring-1 ring-black/5">
          <h2 className="font-display text-3xl tracking-tight">Equipment</h2>
          {aquascape.equipment.length > 0 ? (
            <ul className="mt-5 space-y-3 text-sm leading-7 text-muted">
              {aquascape.equipment.map((item) => (
                <li key={item.id}>
                  <span className="font-medium text-foreground">{item.name}</span>
                  {item.details ? ` (${item.details})` : ""}{" "}
                  <span className="uppercase tracking-[0.18em] text-accent">
                    {item.category}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-sm leading-7 text-muted">
              Equipment details have not been added yet.
            </p>
          )}
        </div>

        <div className="rounded-[2rem] bg-surface p-7 shadow-sm ring-1 ring-black/5">
          <h2 className="font-display text-3xl tracking-tight">Facts</h2>
          {aquascape.facts.length > 0 ? (
            <ul className="mt-5 space-y-3 text-sm leading-7 text-muted">
              {aquascape.facts.map((fact) => {
                const nextCount =
                  (repeatableFactCounts.get(fact.factType.id) ?? 0) + 1;
                repeatableFactCounts.set(fact.factType.id, nextCount);

                const factLabel = fact.factType.isRepeatable
                  ? `${fact.factType.name} ${nextCount}`
                  : fact.factType.name;

                return (
                  <li key={fact.id}>
                    <span className="font-medium text-foreground">
                      {factLabel}
                    </span>
                    : {fact.value}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-5 text-sm leading-7 text-muted">
              Aquascape facts have not been added yet.
            </p>
          )}
        </div>

        <div className="rounded-[2rem] bg-surface p-7 shadow-sm ring-1 ring-black/5">
          <h2 className="font-display text-3xl tracking-tight">Plants</h2>
          {aquascape.plants.length > 0 ? (
            <ul className="mt-5 space-y-3 text-sm leading-7 text-muted">
              {aquascape.plants.map((entry) => (
                <li key={entry.id}>{entry.plant.name}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-sm leading-7 text-muted">
              Plant details have not been added yet.
            </p>
          )}
        </div>

        <div className="rounded-[2rem] bg-surface p-7 shadow-sm ring-1 ring-black/5">
          <h2 className="font-display text-3xl tracking-tight">Fauna</h2>
          {aquascape.fauna.length > 0 ? (
            <ul className="mt-5 space-y-3 text-sm leading-7 text-muted">
              {aquascape.fauna.map((entry) => (
                <li key={entry.id}>{entry.fauna.name}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-sm leading-7 text-muted">
              Fauna details have not been added yet.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
