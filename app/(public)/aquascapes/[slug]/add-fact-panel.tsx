"use client";

import { useState } from "react";

type FactTypeOption = {
  id: string;
  name: string;
  unit: string | null;
};

type AddFactPanelProps = {
  aquascapeId: string;
  factTypes: FactTypeOption[];
  action: (formData: FormData) => void | Promise<void>;
};

export function AddFactPanel({
  aquascapeId,
  factTypes,
  action,
}: AddFactPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-[2rem] bg-surface p-7 shadow-sm ring-1 ring-black/5 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Journal
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">Add Fact</h2>
          <p className="max-w-2xl text-sm leading-7 text-muted">
            Add a structured fact to document one measurable detail about this
            aquascape.
          </p>
        </div>

        <button
          className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
          type="button"
          onClick={() => setIsOpen((currentValue) => !currentValue)}
        >
          {isOpen ? "Close" : "Add Fact"}
        </button>
      </div>

      {isOpen ? (
        <div className="mt-6 border-t border-black/5 pt-6">
          {factTypes.length > 0 ? (
            <form action={action} className="mt-6 grid gap-4">
              <input type="hidden" name="aquascapeId" value={aquascapeId} />

              <label className="grid gap-2">
                <span className="text-sm font-medium">Fact Type</span>
                <select
                  className="rounded-2xl border border-black/10 bg-background px-4 py-3 outline-none ring-0"
                  name="factTypeId"
                  defaultValue={factTypes[0]?.id}
                >
                  {factTypes.map((factType) => (
                    <option key={factType.id} value={factType.id}>
                      {factType.name}
                      {factType.unit ? ` (${factType.unit})` : ""}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium">Value</span>
                <input
                  className="rounded-2xl border border-black/10 bg-background px-4 py-3 outline-none ring-0"
                  type="text"
                  name="value"
                  placeholder="7 Hours"
                  required
                />
              </label>

              <div>
                <button
                  className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
                  type="submit"
                >
                  Save Fact
                </button>
              </div>
            </form>
          ) : (
            <p className="mt-2 text-sm leading-7 text-muted">
              Fact types have not been configured yet.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
