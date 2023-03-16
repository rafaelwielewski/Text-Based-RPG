import LoginForm from '../components/loginForm';
import AuthLayout from './authLayout';

export default function Login() {
  return (
    <>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </>
  );
}
