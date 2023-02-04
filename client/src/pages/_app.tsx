

import { DataProvider } from '@/utils/dataProvider';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { Layout } from '../components/layout';
import '../styles/globals.css';
import { ShellProvider } from '../utils/shellProvider';

const App = ({ Component, pageProps }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    
  }, []);

  return (
    <DataProvider>
      <ShellProvider>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="viewport"
          />
        </Head>
        <Layout >
          <Component {...pageProps} inputRef={inputRef} />
        </Layout>
      </ShellProvider>
            </DataProvider>
  );
};

export default (props) => {

  return (

      <App {...props} />

  );
};
