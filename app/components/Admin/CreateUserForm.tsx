// app/components/admin/CreateUserForm.tsx

'use client';

import { useState } from 'react';

export default function CreateUserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'USER',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const res = await fetch('/api/admin/users/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setMessage('User created successfully');
      setFormData({ name: '', email: '', password: '', role: 'USER' });
    } else {
      const data = await res.json();
      setMessage(data.message || 'Failed to create user');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <h2 className="text-lg font-bold">Create New User</h2>

      {message && <p className="text-sm text-red-600">{message}</p>}

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="w-full border px-3 py-2 rounded"
        required
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      >
        <option value="USER">User</option>
        <option value="DEVELOPER">Developer</option>
        <option value="ADMIN">Admin</option>
        <option value="SUPER_ADMIN">Super Admin</option>
      </select>

      <button type="submit" className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800">
        Create User
      </button>
    </form>
  );
}
