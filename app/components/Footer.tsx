// app/components/Footer.tsx

export function Footer() {
    return (
      <footer className="mt-6 border-t border-gray-200 py-6 px-4 text-center text-sm text-gray-600">
        <p className="mb-2">
          Contact us at{" "}
          <a href="mailto:support@impactlens.dev" className="text-purple-700 underline">
            info@impactlens.co
          </a>
        </p>
        <p>&copy; {new Date().getFullYear()} ImpactLens, Powered by PTech. All rights reserved.</p>
      </footer>
    );
  }
  