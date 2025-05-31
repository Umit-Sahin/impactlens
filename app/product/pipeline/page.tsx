// app/product/pipeline/page.tsx

export default function ProductPipelinePage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold text-gray-800">Product Pipeline</h1>
      <div className="border p-4 rounded shadow">
        <p className="text-purple-700 font-semibold">Add GitHub Integration</p>
        <p className="text-sm text-gray-600">Status: In Progress | Owner: U. Sahin</p>
      </div>
      <div className="border p-4 rounded shadow">
        <p className="text-purple-700 font-semibold">Generate Impact Map</p>
        <p className="text-sm text-gray-600">Status: Planned | Owner: A. Kaya</p>
      </div>
    </div>
  );
}
