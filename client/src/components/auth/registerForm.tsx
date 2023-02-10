import { useEffect, useState } from "react";
import http from "@/lib/services/http";
import { signIn, signOut } from 'next-auth/react';
import Email from "next-auth/providers/email";
import authService from "@/lib/services/auth/auth.service";
import { useRouter } from "next/router";
import Link from 'next/link'
import { redirect } from 'react-router-dom';
import useAuthVerify from "@/lib/services/auth/useAuth";

export default function RegisterForm() {
  const router = useRouter();
  
  useEffect(() => {

  }, []);


  const [errorMessages, setErrorMessages] = useState({ name:'', message: ''});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errors = {

    username: "Username already taken",
    pass: "Your password must have at least 8 characteres",
    passmatch: "Your password doesn't match",

  };



  const handleSubmit = async (event) => {

    event.preventDefault();


    const username = event.target.username.value
    const email = event.target.email.value
    const password = event.target.password.value
    const password2 = event.target.password2.value

    if (password !== password2) {
        setErrorMessages({ name: "password", message: errors.passmatch });
      }

    if (password === password2) {
      
      
      
      try {

        const response = await http.post("/auth/signup", {
          username: username,
          email: email,
          password: password
        });

        console.log(response)

        if (response.statusText === "Created") {

          await authService.login(username, password).then(async (result) => {
            await router.push("/")
          })
          
        }

  
      } catch (e) {

        console.log(e);
        
        if (e.response.data.message === 'User already exists') {
          setErrorMessages({ name: "username", message: errors.username });
        }


      }

    }

  };

  const renderErrorMessage = (name: String) =>
    name === errorMessages.name && (
      <div className="mb-2 text-base font-bold text-danger">{errorMessages.message}</div>
    );


  return (
    <>
        <main className="">
            <div className="p-6 space-y-4 sm:space-y-2 sm:space-y-0 sm:p-8">
              <h1 className="text-5xl font-title leading-tight tracking-tight text-darker">
                Sign up to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  {renderErrorMessage("username")}
                  <label className="block mb-2 text-sm font-medium text-white">
                    Your Username
                  </label>
                  <input
                    type="text"
                    name="text"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  
                    hover:bg-gray-200
                    focus:ring-orange-400 focus:border-orange-400"
                    placeholder="Username"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  
                    hover:bg-gray-200
                    focus:ring-orange-400 focus:border-orange-400"
                    placeholder="email@email.com"
                    required
                  />
                </div>
                <div>
                  {renderErrorMessage("password")}
                  <label className="block mb-2 text-sm font-medium text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  
                    hover:bg-gray-200
                    focus:ring-orange-400 focus:border-orange-400"
                    required
                  />
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Repeat Password
                  </label>
                  <input
                    type="password"
                    name="password2"
                    id="password2"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  
                    hover:bg-gray-200
                    focus:ring-orange-400 focus:border-orange-400"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-base text-white bg-darker hover:bg-gray-900 focus:ring-1 focus:outline-none focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Register
                </button>
                <p className="text-sm font-light text-black">
                  Already have an anccount?{" "}
                  <Link className="font-medium hover:underline text-black" href="/auth/login">Sign in</Link>
                </p>
              </form>
            </div>
        </main>
    </>
  );
}
