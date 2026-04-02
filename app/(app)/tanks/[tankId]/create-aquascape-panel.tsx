"use client";

import { useState } from "react";

import { AquascapeStatus } from "@/prisma/generated/enums";

type CreateAquascapePanelProps = {
  tankId: string;
  action: (formData: FormData) => void | Promise<void>;
};

const aquascapeStatuses = [
  AquascapeStatus.DRAFT,
  AquascapeStatus.PENDING_REVIEW,
  AquascapeStatus.APPROVED,
  AquascapeStatus.REJECTED,
] as const;

export function CreateAquascapePanel({
  tankId,
  action,
}: CreateAquascapePanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-[2rem] bg-surface p-7 shadow-sm ring-1 ring-black/5 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Documentation
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">
            Add Aquascape
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-muted">
            Create a new layout entry for this aquarium before adding its
            photos, plants, fauna, and facts.
          </p>
        </div>

        <button
          className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
          type="button"
          onClick={() => setIsOpen((currentValue) => !currentValue)}
        >
          {isOpen ? "Close" : "Add Aquascape"}
        </button>
      </div>

      {isOpen ? (
        <div className="mt-6 border-t border-black/5 pt-6">
          <form action={action} className="mt-6 grid gap-4">
            <input type="hidden" name="tankId" value={tankId} />

            <label className="grid gap-2">
              <span className="text-sm font-medium">Aquascape Name</span>
              <input
                className="rounded-2xl border border-black/10 bg-background px-4 py-3 outline-none ring-0"
                type="text"
                name="name"
                placeholder="Pacific Northwest"
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium">Slug</span>
              <input
                className="rounded-2xl border border-black/10 bg-background px-4 py-3 outline-none ring-0"
                type="text"
                name="slug"
                placeholder="pacific-northwest"
                pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium">Description</span>
              <textarea
                className="min-h-32 rounded-2xl border border-black/10 bg-background px-4 py-3 outline-none ring-0"
                name="description"
                placeholder="A short note about the layout, mood, or hardscape direction."
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium">Status</span>
              <select
                className="rounded-2xl border border-black/10 bg-background px-4 py-3 outline-none ring-0"
                name="status"
                defaultValue={AquascapeStatus.DRAFT}
              >
                {aquascapeStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>

            <div>
              <button
                className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
                type="submit"
              >
                Create Aquascape
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
