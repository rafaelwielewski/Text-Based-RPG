import authService from "@/lib/services/auth/auth.service";
import useAuthVerify from "@/lib/services/auth/useAuth";
import useAuth from "@/lib/services/auth/useAuth2";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { redirect, useNavigate } from 'react-router-dom';

export default function LoginForm() {
    
    const router = useRouter();

    useEffect(() => {
  
    }, []);

    // const loader = async () => {
    //   console.log('ksdjlj')
    //   const user = await authService.isAuth();
    //   if (user) {
    //     console.log('tem')
    //     ("/");
    //   }
    // };

    const [errorMessages, setErrorMessages] = useState({ name:'', message: ''});
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    const errors = {
  
      username: "Username already taken",
      pass: "Your password must have at least 8 characteres",
      passmatch: "Your password doesn't match",
  
    };
  
    const handleSubmit = async (event) => {
  
      event.preventDefault();
  
  
      const username = event.target.username.value;
      const password = event.target.password.value;

      await authService.login(username, password).then(async (result) => {
        await router.push("/")
      })

    };
  
    const renderErrorMessage = (name: String) =>
      name === errorMessages.name && (
        <div className="mb-2 text-base font-bold text-danger">{errorMessages.message}</div>
      );
  


  return (
    <>
        <main className="">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-4 ">
              <h1 className="text-5xl font-title leading-tight tracking-tight text-darker">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Username
                  </label>
                  <input
                    type="text"
                    name="text"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  
                    hover:bg-gray-200
                    focus:ring-orange-400 dark:focus:border-orange-400"
                    placeholder="Username"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  
                    hover:bg-gray-200
                    focus:ring-orange-400 dark:focus:border-orange-400"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-dark rounded focus:ring-0 focus:ring-offset-0 hover:outline-orange-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-black">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium hover:underline dark:text-black"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-base text-white bg-darker hover:bg-gray-900 focus:ring-1 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-black">
                  Don’t have an account yet?{" "}
                  <Link className="font-medium hover:underline text-black" href="/auth/register">Sign up</Link>
                </p>
              </form>
            </div>
        </main>
    </>
  );
}
