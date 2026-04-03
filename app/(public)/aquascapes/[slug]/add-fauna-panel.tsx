"use client";

import { useState } from "react";

type FaunaOption = {
  id: string;
  name: string;
};

type AddFaunaPanelProps = {
  aquascapeId: string;
  fauna: FaunaOption[];
  action: (formData: FormData) => void | Promise<void>;
};

export function AddFaunaPanel({
  aquascapeId,
  fauna,
  action,
}: AddFaunaPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-[2rem] bg-surface p-7 shadow-sm ring-1 ring-black/5 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Journal
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">Add Fauna</h2>
          <p className="max-w-2xl text-sm leading-7 text-muted">
            Link one fauna species to this aquascape and optionally note stocking
            or behavior details.
          </p>
        </div>

        <button
          className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
          type="button"
          onClick={() => setIsOpen((currentValue) => !currentValue)}
        >
          {isOpen ? "Close" : "Add Fauna"}
        </button>
      </div>

      {isOpen ? (
        <div className="mt-6 border-t border-black/5 pt-6">
          {fauna.length > 0 ? (
            <form action={action} className="mt-6 grid gap-4">
              <input type="hidden" name="aquascapeId" value={aquascapeId} />

              <label className="grid gap-2">
                <span className="text-sm font-medium">Fauna</span>
                <select
                  className="rounded-2xl border border-black/10 bg-background px-4 py-3 outline-none ring-0"
                  name="faunaId"
                  defaultValue={fauna[0]?.id}
                >
                  {fauna.map((entry) => (
                    <option key={entry.id} value={entry.id}>
                      {entry.name}
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
                  placeholder="Group of 12"
                />
              </label>

              <div>
                <button
                  className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
                  type="submit"
                >
                  Save Fauna
                </button>
              </div>
            </form>
          ) : (
            <p className="mt-2 text-sm leading-7 text-muted">
              Fauna have not been seeded yet.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
