'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center dark:bg-black">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Something went wrong!
      </h2>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        We apologize for the inconvenience.
      </p>
      <button
        onClick={reset}
        className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
      >
        Try again
      </button>
    </div>
  );
}
