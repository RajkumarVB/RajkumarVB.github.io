import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Page not found</h1>
      <p className="mt-3">That page doesn&apos;t exist or has moved.</p>
      <Link href="/" className="mt-6 inline-block font-semibold text-blue-600 hover:underline dark:text-blue-400">
        Go home →
      </Link>
    </div>
  );
}
