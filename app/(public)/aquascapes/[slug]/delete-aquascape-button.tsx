"use client";

type DeleteAquascapeButtonProps = {
  aquascapeId: string;
  action: (formData: FormData) => void | Promise<void>;
};

export function DeleteAquascapeButton({
  aquascapeId,
  action,
}: DeleteAquascapeButtonProps) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        const isConfirmed = window.confirm(
          "Delete this aquascape and all of its journal entries?",
        );

        if (!isConfirmed) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="aquascapeId" value={aquascapeId} />
      <button
        className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-black/5"
        type="submit"
      >
        Delete Aquascape
      </button>
    </form>
  );
}
