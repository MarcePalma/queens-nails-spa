import React from 'react'

import Dashboard from '@/components/dashboard/dashboard'
import Navbar from '@/components/navigation/Navbar'
export default function Index() {
    return (
        <section className='p-24'>
            <Navbar />
            <Dashboard />
        </section>
    )
}
