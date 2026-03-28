"use client";

import { useState } from "react";

type CreateTankPanelProps = {
  action: (formData: FormData) => void | Promise<void>;
};

export function CreateTankPanel({ action }: CreateTankPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-3xl bg-surface p-8 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Studio
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">Add Tank</h2>
          <p className="max-w-2xl text-sm leading-7 text-muted">
            Add a new physical tank to your portfolio when you are ready to
            document a new setup.
          </p>
        </div>

        <button
          className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
          type="button"
          onClick={() => setIsOpen((currentValue) => !currentValue)}
        >
          Add Tank
        </button>
      </div>

      {isOpen ? (
        <div className="mt-6 border-t border-black/5 pt-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold tracking-tight">
              Add a Tank
            </h3>
            <p className="max-w-2xl text-sm leading-7 text-muted">
              This simple form is the first full write flow in the app: browser
              form data is submitted to a server action, validated, and then
              persisted through Prisma.
            </p>
          </div>

          <form action={action} className="mt-6 grid gap-4">
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
      ) : null}
    </div>
  );
}
