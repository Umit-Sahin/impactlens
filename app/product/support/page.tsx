import ProductLayout from '@/app/components/ProductLayout';

export default function SupportPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Contact Support</h1>
      <p className="text-gray-700 mb-4">For technical or product issues, email us at:</p>
      <a href="mailto:support@impactlens.co" className="text-purple-700 font-medium underline">
        support@impactlens.co
      </a>
    </div>
  );
}
