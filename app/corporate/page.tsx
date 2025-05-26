// app/corporate/page.tsx
export default function CorporatePage() {
  return (
    <div className="min-h-screen p-10 bg-white text-gray-900">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Corporate</h1>
      <p className="text-lg text-gray-700 mb-8">
        Learn about our company, our mission, and the team behind ImpactLens. We are
        committed to helping developers understand their code impact effortlessly.
      </p>

      <div className="max-w-xl mx-auto">
        <a
          href="/docs/ptech-company-profile.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/docs/PTech_Profile.png"
            alt="View Company Profile PDF"
            className="w-full rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          />
        </a>
        <p className="text-sm text-center text-gray-500 mt-2">
          Click the image to view our company profile (PDF)
        </p>
      </div>
    </div>
  );
}