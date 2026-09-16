import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold text-neutral-900">Page not found</h1>
      <p className="mt-2 text-sm text-neutral-600">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="btn btn-primary w-full sm:w-auto"
        >
          Back to the calculator
        </Link>
        <Link
          href="/tools"
          className="btn w-full sm:w-auto"
        >
          View all tools
        </Link>
      </div>
    </main>
  );
}