import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Transition from '@/components/transition/transition'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (<AnimatePresence mode='wait'>
    <motion.div key={router.route} className='h-full'>
      <Transition />
      <Component {...pageProps} />
      <></>

    </motion.div>
  </AnimatePresence>)
}
