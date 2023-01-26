import { useEffect } from "react";
import { useRouter } from "next/router";
import authService from "@/services/auth.service";

export default function authVerify() {
  
  const router = useRouter();

  useEffect(() => {
    const authUser = authService.getCurrentUser;

    // if there is no authenticated user, redirect to login page_

    if (!authUser) {
      router.push("/auth/login");
    }
  }, []);

  return;
}
