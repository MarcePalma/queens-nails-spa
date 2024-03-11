import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter, Router } from 'next/router'; // Importa Router en lugar de NextRouter
import { AnimatePresence, motion } from 'framer-motion';
import Transition from '@/components/transition/transition';
import { UserProvider, useUser } from '@/context/UserContext';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <UserProvider>
      {/* @ts-ignore */}
      <AppWithTokenCheck router={router} Component={Component} pageProps={pageProps} />
    </UserProvider>
  );
}

function AppWithTokenCheck({ router, Component, pageProps }: AppProps & { router: Router }) {
  const { setToken } = useUser();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <AnimatePresence mode='wait'>
      <motion.div key={router.route} className='h-full'>
        <Transition />
        <Component {...pageProps} />
        <></>
      </motion.div>
    </AnimatePresence>
  );
}
