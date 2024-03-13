import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head'; // Importa la biblioteca `next/head`
import Transition from '@/components/transition/transition';
import { UserProvider, useUser } from '@/context/UserContext';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <UserProvider>
      <Head> 
        <title>Tatiana Ramirez salud y belleza</title> 
        <meta name="description" content="Experimenta el equilibrio entre salud y belleza con nuestros servicios de quiropedia y manicura-pedicura en Queen Nails Spa. ¡Reserva tu cita hoy!" /> 
      </Head>
      {/* @ts-ignore */}
      <AppWithTokenCheck router={router} Component={Component} pageProps={pageProps} />
    </UserProvider>
  );
}

function AppWithTokenCheck({ router, Component, pageProps }: AppProps & { router: any }) {
  const { setToken } = useUser();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div key={router.route} className='h-full'>
        <Transition />
        <Component {...pageProps} />
        <></>
      </motion.div>
    </AnimatePresence>
  );
}
