import ProductLayout from '@/app/components/ProductLayout';

const components = ['Button', 'Modal', 'Navbar', 'Card'];

export default function UIComponents() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">UI Components</h1>
      <ul className="grid grid-cols-2 gap-4">
        {components.map((comp, i) => (
          <li key={i} className="p-4 bg-white rounded shadow border">{comp}</li>
        ))}
      </ul>
    </div>
  );
}
