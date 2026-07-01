"use client";

import Link from "next/link";

export default function Error({ error, reset }) {
  console.log(error);
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>
      <div className="flex gap-4">
        <Link
          href="/cabins"
          className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        >
          Back to all cabins
        </Link>
        <button
          onClick={reset}
          className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
