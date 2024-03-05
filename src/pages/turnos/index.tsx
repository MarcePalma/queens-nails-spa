import Calendar from '@/components/calendar/calendar'
import Navbar from '@/components/navigation/Navbar'
import React from 'react'

export default function Index() {
    return (
        <div className='p-10'>
            <Navbar />
            <Calendar/>
        </div>
    )
}
