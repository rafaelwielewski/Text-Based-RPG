import RegisterForm from '../components/registerForm';
import AuthLayout from './authLayout';

export default function Register() {
  return (
    <>
      <AuthLayout>
        <RegisterForm />
      </AuthLayout>
    </>
  );
}
