// app/corporate/page.tsx
export default function CompanyPage() {
  return (
    <div className="min-h-screen p-10 bg-white text-gray-900">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        P<span className="text-3xl text-gray-700 " >T</span>ech 
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Learn about our company, our mission, and the team behind ImpactLens. We are determined to improve the quality of your product and make it more manageable.
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
      <div className="max-w-7xl mx-auto px-6 py-24 space-y-28">
        {/* Certificates */}
        <section className="text-center bg-blue-50 p-8 rounded-xl shadow-md">
          <h1 className="text-3xl font-extrabold text-blue-700 mb-6">
            We protect your privacy
          </h1>
          <p className="text-lg text-gray-700 font-semibold max-w-2xl mx-auto mb-8">
            Our Certificates
          </p>
            <p
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-5 rounded-lg transition">
            SOC2
            </p>
            <p
              className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-5 ml-6 rounded-lg transition">
            ISO 27001
            </p>
        </section>
        </div>
    </div>

  );
}