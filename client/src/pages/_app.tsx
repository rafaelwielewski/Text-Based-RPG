import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';
import RefreshTokenHandler from '@/lib/services/auth/refreshTokenHandler';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {


  return (

    <div className='bg-darker'>
  <Component {...pageProps} />
    </div>
  )
}
