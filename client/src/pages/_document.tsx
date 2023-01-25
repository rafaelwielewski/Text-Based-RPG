import { Html, Head, Main, NextScript } from 'next/document'
import { setAuthToken } from '@/services/setAuthToken'

export default function Document() {

  const token = localStorage.getItem("token");
  if (token) {
      setAuthToken(token);
  }
  
  return (
    <Html lang="en">
      <Head />
      <body className='bg-darker'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
