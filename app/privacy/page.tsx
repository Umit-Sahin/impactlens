// 📄 app/privacy/page.tsx

export default function PrivacyPolicyPage() {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
  
        <p className="mb-4 text-gray-700">
          ImpactLens is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our platform.
        </p>
  
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>Full name and contact information</li>
          <li>Company and organizational details</li>
          <li>Usage data and analytics</li>
        </ul>
  
        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 text-gray-700">
          <li>To provide and improve our services</li>
          <li>To communicate with you about updates or support</li>
          <li>To comply with legal obligations</li>
        </ul>
  
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
        <p className="text-gray-700 mb-4">
          We implement industry-standard measures to protect your data from unauthorized access and disclosure.
        </p>
  
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Your Rights</h2>
        <p className="text-gray-700 mb-4">
          You have the right to access, modify, or delete your data upon request. Please contact us at <a href="mailto:info@impactlens.co" className="text-blue-600 underline">info@impactlens.co</a>
        </p>
  
        <p className="text-sm text-gray-500 mt-8">
          Last updated: June 22, 2025
        </p>
      </div>
    );
  }
  