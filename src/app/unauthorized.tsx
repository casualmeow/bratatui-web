import * as React from "react";
import Link from 'next/link';

export function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600">Unauthorized</h1>
      <p className="mt-4 text-lg text-gray-700">
        To access this page, you need to be logged in with the appropriate
        permissions.
      </p>
      <div className="flex flex-row">
        <Link href="/" className="mt-6 text-blue-500 hover:underline">
          Go back to home
        </Link>
        <a href="/login" className="ml-4 mt-6 text-blue-500 hover:underline">
          Login
        </a>
      </div>
    </div>
  );
}
