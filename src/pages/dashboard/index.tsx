import React from 'react'

import Dashboard from '@/components/dashboard/dashboard'
import { useUser } from '@/context/UserContext'
import Navbar from '@/components/navigation/Navbar'
import Link from 'next/link'

export default function Index() {

    const { token } = useUser()

    if(!token){
        return <h1>Acceso denegado. Por favor inicia sesion para acceder a la Dashboard <Link className='font-bold' href={"/"}>VOLVER</Link></h1>
    }
    return (
        <section className='p-24'>
            <Navbar />
            <Dashboard />
        </section>
    )
}
