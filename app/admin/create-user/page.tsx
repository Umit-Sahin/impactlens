//app/admin/create-user/page.tsx

'use client';

import { useState } from 'react';

export default function CreateUserPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      surname: formData.get('surname'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role'),
    };

    const res = await fetch('/api/admin/create-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setMessage('✅ User created successfully.');
    } else {
      const data = await res.json();
      setMessage(`❌ ${data.message || 'Failed to create user.'}`);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create New User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" required className="w-full border p-2 rounded" />
        <input type="text" name="surname" placeholder="Surname" required className="w-full border p-2 rounded" />
        <input type="email" name="email" placeholder="Email" required className="w-full border p-2 rounded" />
        <input type="password" name="password" placeholder="Password" required className="w-full border p-2 rounded" />
        <select name="role" className="w-full border p-2 rounded">
          <option value="USER">User</option>
          <option value="DEVELOPER">Developer</option>
          <option value="ADMIN">Admin</option>
          <option value="SUPER_ADMIN">Super Admin</option>
        </select>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded">
          {loading ? 'Creating...' : 'Create User'}
        </button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
}
