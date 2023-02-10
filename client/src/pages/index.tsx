import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Home from './home'
import Home2 from './home2'
import Home3 from './home3'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import authService from '@/lib/services/auth/auth.service'
import { getPlayerData } from '@/api'
import { useData } from '@/utils/dataProvider'
import { Route, Routes, useNavigate, redirect } from 'react-router-dom';


const inter = Inter({ subsets: ['latin'] })

export default function Index() {

  const router = useRouter();
  //const navigate = useNavigate();
  const data = useData();

  useEffect(() => {

    console.log('index')

    // const loader = async () => {
    //   const user = await authService.isAuth();
    //   console.log('kjkljkl')
    //   if (!user) {
    //     return redirect("/auth/login");
    //   }
    // };

    // authService.isAuth().then(async (result) => {
    //   if (!result) {


    //     setTimeout(() => {
    //       // 👇 Redirects to about page, note the `replace: true`
    //       navigate('/auth/login', { replace: true });
    //     }, 3000)


    //     //await router.push("/auth/login");
    //   }
    // })

  }, []);

  return (
    <>
      <Head>
        <title>Text Based RPG</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=''>
        <Home2 />
      </main>
    </>
  )
}
