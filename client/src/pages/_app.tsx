

import useAuthVerify from '@/lib/services/auth/useAuth';
import { DataProvider } from '@/utils/dataProvider';
import Head from 'next/head';
import React, { useEffect } from 'react';
import '../styles/globals.css';

const App = ({ Component, pageProps }) => {

  const auth = useAuthVerify();
  useEffect(() => {
    
  }, []);

  return (
    <DataProvider>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="viewport"
          />
        </Head>
        <div className='bg-darkest h-screen'>
          <Component {...pageProps} />
          </div>
            </DataProvider>
  );
};

export default (props) => {

  return (

      <App {...props} />

  );
};
