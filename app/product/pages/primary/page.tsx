import ProductLayout from '@/app/components/ProductLayout';

const pages = [
  { name: 'Home', status: 'Live', lastUpdated: '2025-05-30'  },
  { name: 'Login', status: 'Draft', lastUpdated: '2025-05-28' },
];

export default function PrimaryPages() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Primary Pages</h1>
      <ul className="space-y-4">
        {pages.map((p, i) => (
          <li key={i} className="bg-gray-50 border rounded p-4 shadow">
            <span className="font-medium">{p.name}</span> — <span className="text-sm text-gray-600">{p.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
