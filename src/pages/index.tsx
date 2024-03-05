import { Inter } from 'next/font/google'
import Navbar from '@/components/navigation/Navbar'
import Main from '@/components/main/main'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`p-24 flex justify-center ${inter.className}`}>
      <Navbar />
      <Main/>
    </main>
  )
}