// app/components/Footer.tsx
import { ShieldCheckIcon, LockClosedIcon } from "@heroicons/react/24/outline";

// TrustBadges bileşenini tanımlayın
function TrustBadges() {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-3">
      <div className="flex items-center rounded-lg bg-blue-50 px-3 py-1.5 text-xs text-blue-700">
        <ShieldCheckIcon className="mr-1.5 h-4 w-4" />
        <span>SOC2 Compliance in Progress</span>
      </div>
      <div className="flex items-center rounded-lg bg-green-50 px-3 py-1.5 text-xs text-green-700">
        <LockClosedIcon className="mr-1.5 h-4 w-4" />
        <span>GDPR Ready</span>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-6 border-t border-gray-200 py-6 px-4 text-center text-sm text-gray-600">
      <p className="mb-2">
        Contact us at{" "}
        <a href="mailto:info@impactlens.co" className="text-purple-700 underline">
          info@impactlens.co
        </a>
      </p>
      <p>&copy; {new Date().getFullYear()} ImpactLens, Powered by PTech. All rights reserved.</p>
      <TrustBadges /> {/* Artık tanımlı! */}
    </footer>
  );
}