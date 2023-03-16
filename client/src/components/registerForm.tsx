import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  loginAsync,
  registerAsync,
  selectAuth
} from '../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export default function RegisterForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { error } = useAppSelector(selectAuth);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const username = event.currentTarget.username.value;
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    const passwordConf = event.currentTarget.passwordConf.value;

    setLoading(true);

    dispatch(registerAsync({ username, email, password, passwordConf }))
      .unwrap()
      .then(() => {
        dispatch(loginAsync({ username, password }))
          .unwrap()
          .then(() => {
            setLoading(true);
            navigate('/');
            window.location.reload();
          })
          .catch(() => {
            setLoading(false);
          });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <main className="">
        <div className="p-6 space-y-4 sm:space-y-2 sm:space-y-0 sm:p-8">
          <h1 className="text-5xl font-title leading-tight tracking-tight text-darker">
            Sign up to your account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              {error}
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
              {error}
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
              <label className="block mb-2 text-sm font-medium text-white">
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
              Already have an anccount?{' '}
              <Link
                className="font-medium hover:underline text-black"
                to="/login"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
}
