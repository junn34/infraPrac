'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ 페이지 로드 시 로그인 상태 확인
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me', {
          credentials: 'include', // 세션 쿠키 포함 (중요!)
        });

        if (res.status === 200) {
          const id = await res.text();
          setUserId(id);
        } else {
          router.push('/'); // 로그인 안 된 상태면 로그인 페이지로 이동
        }
      } catch (err) {
        console.error('인증 확인 실패:', err);
        router.push('/');
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return <p className="text-center mt-10">로딩 중...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-bold text-gray-800">
          {userId ? `환영합니다, 사용자 #${userId}` : '대시보드'}
        </h1>
        <p className="text-gray-600 mt-2">
          금융 학습을 시작해볼까요? 💡
        </p>

        <div className="grid grid-cols-2 gap-4 mt-10">
          <button
            onClick={() => alert('예금 튜토리얼 시작!')}
            className="bg-primary text-white py-4 rounded-lg hover:bg-primary-dark transition"
          >
            💰 예금 학습
          </button>
          <button
            onClick={() => alert('대출 튜토리얼 시작!')}
            className="bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition"
          >
            🏦 대출 학습
          </button>
        </div>

        <button
          onClick={() => {
            fetch('/api/auth/logout', {
              method: 'POST',
              credentials: 'include',
            }).then(() => router.push('/'));
          }}
          className="mt-10 text-sm text-gray-500 underline hover:text-gray-700"
        >
          로그아웃
        </button>
      </div>
    </main>
  );
}
