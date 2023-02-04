
import Head from 'next/head';
import React from 'react';
import { History } from '../components/history';
import { Input } from '../components/input';
import { useShell } from '../utils/shellProvider';
import config from '../../config.json';
import { getPlayerData } from '@/api';
import { useRouter } from 'next/router';
import authService from '@/lib/services/auth/auth.service';
import { useData } from '@/utils/dataProvider';
import theme from '@/styles/theme.json'

interface IndexPageProps {
  inputRef: React.MutableRefObject<HTMLInputElement>;
}

const Home3: React.FC<IndexPageProps> = ({ inputRef }) => {
  
  const router = useRouter();
  const { history } = useShell();
  const { user, player, location } = useData();

  const containerRef = React.useRef(null);

  React.useEffect(() => {

  }, [history]);

  return (
    <>
      <Head>
        <title>Written Kingdom</title>
      </Head>

      <div
        className="overflow-hidden h-full rounded"
        style={{
          borderColor: theme.yellow,

        }}
      >
        <div ref={containerRef} className="overflow-y-auto h-screen p-10">
          <History history={history} />

          <Input inputRef={inputRef} containerRef={containerRef} />
        </div>
      </div>
    </>
  );
};

export default Home3;
