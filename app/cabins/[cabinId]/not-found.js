import Link from "next/link";

function NotFound({ reset }) {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        This cabin could not be found :(
      </h1>
      <div className="flex gap-4 items-center justify-center">
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
export default NotFound;
