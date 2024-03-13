import React from 'react'

import Dashboard from '@/components/dashboard/dashboard'
import { useUser } from '@/context/UserContext'
import Navbar from '@/components/navigation/Navbar'
import Link from 'next/link'
import AccessDenied from '@/components/accesdenied/AccessDenied'

export default function Index() {

    const { token } = useUser()

    if (!token) {

        return <AccessDenied />
    }
    return (
        <section className='p-24'>
            <Navbar />
            <Dashboard />
        </section>
    )
}
