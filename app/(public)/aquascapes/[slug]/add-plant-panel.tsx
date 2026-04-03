"use client";

import { useState } from "react";

type PlantOption = {
  id: string;
  name: string;
  scientificName: string | null;
};

type AddPlantPanelProps = {
  aquascapeId: string;
  plants: PlantOption[];
  action: (formData: FormData) => void | Promise<void>;
};

export function AddPlantPanel({
  aquascapeId,
  plants,
  action,
}: AddPlantPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-[2rem] bg-surface p-7 shadow-sm ring-1 ring-black/5 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Journal
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">Add Plant</h2>
          <p className="max-w-2xl text-sm leading-7 text-muted">
            Link one plant species to this aquascape and optionally capture a
            note about placement or use.
          </p>
        </div>

        <button
          className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
          type="button"
          onClick={() => setIsOpen((currentValue) => !currentValue)}
        >
          {isOpen ? "Close" : "Add Plant"}
        </button>
      </div>

      {isOpen ? (
        <div className="mt-6 border-t border-black/5 pt-6">
          {plants.length > 0 ? (
            <form action={action} className="mt-6 grid gap-4">
              <input type="hidden" name="aquascapeId" value={aquascapeId} />

              <label className="grid gap-2">
                <span className="text-sm font-medium">Plant</span>
                <select
                  className="rounded-2xl border border-black/10 bg-background px-4 py-3 outline-none ring-0"
                  name="plantId"
                  defaultValue={plants[0]?.id}
                >
                  {plants.map((plant) => (
                    <option key={plant.id} value={plant.id}>
                      {plant.name}
                      {plant.scientificName ? ` (${plant.scientificName})` : ""}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium">Notes</span>
                <input
                  className="rounded-2xl border border-black/10 bg-background px-4 py-3 outline-none ring-0"
                  type="text"
                  name="notes"
                  placeholder="Midground cluster"
                />
              </label>

              <div>
                <button
                  className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
                  type="submit"
                >
                  Save Plant
                </button>
              </div>
            </form>
          ) : (
            <p className="mt-2 text-sm leading-7 text-muted">
              Plants have not been seeded yet.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
