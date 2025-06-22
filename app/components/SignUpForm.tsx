// app/components/SignUpForm.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SignUpFormProps {
  selectedPlan: string;
}

export default function SignUpForm({ selectedPlan }: SignUpFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, plan: selectedPlan }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        setError(data.message || 'Something went wrong');
      } else {
        // ✅ Doğrulama email'ini gönder
        await fetch('/api/auth/send-verification-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, userId: data.userId }),
        });
  
        router.push('/check-email');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Surname</label>
        <input
          name="surname"
          type="text"
          required
          value={formData.surname}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-600"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800 transition"
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
}
