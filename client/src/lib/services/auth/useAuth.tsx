import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import authService from '@/lib/services/auth/auth.service';

export default function useAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    loader();
  }, []);

  const loader = async () => {
    
    const session = await authService.isAuth();

    //   if (session?.error === "RefreshAccessTokenError") {
    //     signOut({ callbackUrl: '/auth/login' });
    // }
    console.log(session)
    if (session === null) {
      if (router.route !== '/auth/login' || '/auth/register') {
        router.replace('/auth/login');
      }
      setIsAuthenticated(false);
    } else if (session !== undefined) {
      if (router.route === '/auth/login' || '/auth/register') {
        router.replace('/');
      }
      setIsAuthenticated(true);
    }
  };

  return isAuthenticated;
}
