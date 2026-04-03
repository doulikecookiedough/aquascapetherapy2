"use client";

import { useState } from "react";

type AddImagePanelProps = {
  aquascapeId: string;
  action: (formData: FormData) => void | Promise<void>;
};

export function AddImagePanel({ aquascapeId, action }: AddImagePanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-[2rem] bg-surface p-7 shadow-sm ring-1 ring-black/5 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Journal
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">Add Image</h2>
          <p className="max-w-2xl text-sm leading-7 text-muted">
            Add a photo URL and alt text so this aquascape can be rendered
            across the portfolio and journal views.
          </p>
        </div>

        <button
          className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
          type="button"
          onClick={() => setIsOpen((currentValue) => !currentValue)}
        >
          {isOpen ? "Close" : "Add Image"}
        </button>
      </div>

      {isOpen ? (
        <div className="mt-6 border-t border-black/5 pt-6">
          <form action={action} className="mt-6 grid gap-4">
            <input type="hidden" name="aquascapeId" value={aquascapeId} />

            <label className="grid gap-2">
              <span className="text-sm font-medium">Image URL</span>
              <input
                className="rounded-2xl border border-black/10 bg-background px-4 py-3 outline-none ring-0"
                type="url"
                name="src"
                placeholder="https://raw.githubusercontent.com/..."
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium">Alt Text</span>
              <input
                className="rounded-2xl border border-black/10 bg-background px-4 py-3 outline-none ring-0"
                type="text"
                name="alt"
                placeholder="Pacific Northwest aquascape in an ADA 120P aquarium."
                required
              />
            </label>

            <label className="flex items-center gap-3 text-sm font-medium">
              <input
                className="h-4 w-4 rounded border border-black/10"
                type="checkbox"
                name="isPrimary"
              />
              Mark as primary image
            </label>

            <div>
              <button
                className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
                type="submit"
              >
                Save Image
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
