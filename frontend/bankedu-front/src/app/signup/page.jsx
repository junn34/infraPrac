import AuthForm from '../../components/AuthForm';

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center pt-16">
        <h1 className="text-3xl font-bold text-blue-700">BankEdu</h1>
        <p className="text-gray-600 mt-2">
          지금 가입하고 금융 지식을 쌓아보세요 💡
        </p>
      </div>
      <AuthForm mode="signup" />
    </main>
  );
}
