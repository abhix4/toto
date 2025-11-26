// app/(auth)/layout.tsx
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center  bg-[url('/test1.svg')] bg-blue-200">
      {/* optional left side / branding */}
      {/* <div className="hidden md:flex flex-1 items-center justify-center">
        <h1 className="text-3xl font-bold">Your Logo</h1>
      </div> */}

      {/* auth card */}
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        {children}
      </div>
    </div>
  );
}
