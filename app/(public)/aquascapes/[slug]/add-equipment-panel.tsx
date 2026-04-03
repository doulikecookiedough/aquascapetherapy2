"use client";

import { useState } from "react";

import { EquipmentCategory } from "@/prisma/generated/enums";

const equipmentCategories = [
  EquipmentCategory.TANK,
  EquipmentCategory.LIGHTING,
  EquipmentCategory.FILTER,
  EquipmentCategory.CO2,
  EquipmentCategory.HEATING,
  EquipmentCategory.SUBSTRATE,
  EquipmentCategory.FERTILIZER,
  EquipmentCategory.OTHER,
] as const;

type AddEquipmentPanelProps = {
  aquascapeId: string;
  action: (formData: FormData) => void | Promise<void>;
};

function formatEquipmentCategory(category: (typeof equipmentCategories)[number]) {
  return category.toLowerCase().replace("_", " ");
}

export function AddEquipmentPanel({
  aquascapeId,
  action,
}: AddEquipmentPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-[2rem] bg-surface p-7 shadow-sm ring-1 ring-black/5 md:p-8">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Journal
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">
            Add Equipment
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-muted">
            Add one piece of equipment used in this aquascape, along with any
            optional setup details.
          </p>
        </div>

        <button
          className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
          type="button"
          onClick={() => setIsOpen((currentValue) => !currentValue)}
        >
          {isOpen ? "Close" : "Add Equipment"}
        </button>
      </div>

      {isOpen ? (
        <div className="mt-6 border-t border-black/5 pt-6">
          <form action={action} className="mt-6 grid gap-4">
            <input type="hidden" name="aquascapeId" value={aquascapeId} />

            <label className="grid gap-2">
              <span className="text-sm font-medium">Category</span>
              <select
                className="rounded-2xl border border-black/10 bg-background px-4 py-3 capitalize outline-none ring-0"
                name="category"
                defaultValue={EquipmentCategory.LIGHTING}
              >
                {equipmentCategories.map((category) => (
                  <option key={category} value={category}>
                    {formatEquipmentCategory(category)}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium">Name</span>
              <input
                className="rounded-2xl border border-black/10 bg-background px-4 py-3 outline-none ring-0"
                type="text"
                name="name"
                placeholder="ADA Solar RGB"
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium">Details</span>
              <input
                className="rounded-2xl border border-black/10 bg-background px-4 py-3 outline-none ring-0"
                type="text"
                name="details"
                placeholder="x2"
              />
            </label>

            <div>
              <button
                className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background"
                type="submit"
              >
                Save Equipment
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
