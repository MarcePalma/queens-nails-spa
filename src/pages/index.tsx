import { Inter } from 'next/font/google'
import Navbar from '@/components/navigation/Navbar'
import Postscard from '@/components/posts/postscard'
import InteractiveNail from '@/components/nails/InteractiveNail'
import Dashboard from '@/components/dashboard/dashboard'
import PostList from '@/components/posts/PostList'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Navbar />
      <InteractiveNail />

    </main>
  )
}
