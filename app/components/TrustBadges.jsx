// components/TrustBadges.jsx
import { LockClosedIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function TrustBadges() {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      {/* SOC2 Hazırlık Badge */}
      <div className="flex items-center rounded-lg bg-blue-50 px-4 py-2 text-sm text-blue-700">
        <ShieldCheckIcon className="mr-2 h-5 w-5" />
        <span>Security-first (SOC2 Compliant)</span>
      </div>

      {/* GDPR Badge (Opsiyonel) */}
      <div className="flex items-center rounded-lg bg-green-50 px-4 py-2 text-sm text-green-700">
        <LockClosedIcon className="mr-2 h-5 w-5" />
        <span>GDPR Ready</span>
      </div>
    </div>
  );
}