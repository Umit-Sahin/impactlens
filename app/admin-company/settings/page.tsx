'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [companyName, setCompanyName] = useState('ImpactLens Inc.');
  const [defaultUserRole, setDefaultUserRole] = useState('USER');
  const [emailNotifications, setEmailNotifications] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || session.user.role !== 'SUPER_ADMIN') {
      router.replace('/signin');
    }
  }, [session, status, router]);

  if (status === 'loading') return <p>Loading session...</p>;

  const handleSave = () => {
    // TODO: Save to database via /api/admin/settings
    alert('Settings saved (mock)');
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold">Admin Settings</h1>

      {/* Company Settings */}
      <div className="bg-white border rounded p-4 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold">Company Settings</h2>
        <div>
          <label className="block text-sm font-medium mb-1">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
      </div>

      {/* User Defaults */}
      <div className="bg-white border rounded p-4 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold">User Defaults</h2>
        <div>
          <label className="block text-sm font-medium mb-1">Default Role on Signup</label>
          <select
            value={defaultUserRole}
            onChange={(e) => setDefaultUserRole(e.target.value)}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="USER">USER</option>
            <option value="DEVELOPER">DEVELOPER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white border rounded p-4 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
          />
          <span className="text-sm">Enable email notifications for system events</span>
        </label>
      </div>

      {/* Save Button */}
      <div>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
