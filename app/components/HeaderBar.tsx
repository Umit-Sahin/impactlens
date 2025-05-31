"use client";

export default function HeaderBar() {
  return (
    <header className="w-full bg-white shadow px-6 py-4 flex justify-between items-center border-b">
      <h1 className="text-lg font-semibold text-gray-800">Product Dashboard</h1>
      <div className="text-sm text-gray-500">Welcome, User</div>
    </header>
  );
}
