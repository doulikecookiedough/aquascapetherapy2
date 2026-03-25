export default function TanksPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col px-6 py-16 md:px-10">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-accent">
          App
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">Tanks</h1>
        <p className="max-w-2xl text-base leading-7 text-muted">
          This page will become the first database-backed feature in the app.
          The initial milestone is simple: create a tank and list tanks from
          PostgreSQL through Prisma.
        </p>
      </div>
    </main>
  );
}
