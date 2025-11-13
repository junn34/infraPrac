'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthForm({ mode = 'login' }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const API_BASE = "http://localhost:8080";

    const apiUrl =
      mode === 'signup'
        ? `${API_BASE}/api/auth/signup`
        : `${API_BASE}/api/auth/login`;


    const body =
      mode === 'signup'
        ? { email, password, name }
        : { email, password };

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // ✅ 세션 쿠키 주고받기 (중요!)
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      if (mode === 'signup') {
        alert('회원가입 성공!');
        router.push('/');
      } else {
        alert('로그인 성공!');
        router.push('/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || '오류가 발생했습니다.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md mt-20">
      <h1 className="text-2xl font-bold text-center mb-6">
        {mode === 'login' ? '로그인' : '회원가입'}
      </h1>

      {error && (
        <p className="text-red-600 text-center text-sm mb-3">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />

        {mode === 'signup' && (
          <input
            type="text"
            placeholder="이름 입력"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        )}

        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white rounded-lg py-2 transition"
        >
          {mode === 'login' ? '로그인' : '회원가입'}
        </button>
      </form>

      {mode === 'login' ? (
        <p className="text-center text-sm mt-4">
          아직 회원이 아니신가요?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            회원가입
          </a>
        </p>
      ) : (
        <p className="text-center text-sm mt-4">
          이미 계정이 있으신가요?{' '}
          <a href="/" className="text-blue-600 hover:underline">
            로그인
          </a>
        </p>
      )}
    </div>
  );
}
