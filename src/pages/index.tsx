import { Inter } from 'next/font/google'
import Navbar from '@/components/navigation/Navbar'
import Main from '@/components/main/main'
import Horarios from '@/components/horarios/horarios'
import EmailSection from '@/components/contact/contact'
import Footer from '@/components/footer/footer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`${inter.className}`}>
      <Navbar />
      <Main />
      <Horarios />
      <EmailSection />
      <Footer/>
    </main>
  )
}