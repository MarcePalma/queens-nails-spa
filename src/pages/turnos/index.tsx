import BackButton from '@/components/buttons/buttons'
import Calendar from '@/components/calendar/calendar'
import Navbar from '@/components/navigation/Navbar'
import React from 'react'

export default function Index() {
    return (
        <div className='p-10'>
            <Navbar />
            <Calendar />
            {/* @ts-ignore */}
            <BackButton path="/" />
        </div>
    )
}
