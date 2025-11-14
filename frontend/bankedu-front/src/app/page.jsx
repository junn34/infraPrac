import AuthForm from '../components/AuthForm';

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center pt-16">
        <h1 className="text-3xl font-bold text-blue-700">BankEdu</h1>
        <p className="text-gray-600 mt-2">
          디지털 금융을 쉽고 재미있게 배우는  교육 플랫폼이지롱
        </p>
      </div>
      <AuthForm mode="login" />
    </main>
  );
}
