import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navigation/Navbar'
import Postscard from '@/components/posts/postscard'
import InteractiveNail from '@/components/nails/InteractiveNail'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Navbar />
      <InteractiveNail/>
      <Postscard/>
    </main>
  )
}
