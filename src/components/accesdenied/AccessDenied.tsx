import React from 'react';
import Image from 'next/image';
import Navbar from '../navigation/Navbar';

export default function AccessDenied() {
    return (
        <div>
            <Navbar />
            <section className='flex flex-col items-center justify-center h-screen'>
                <Image src={"/images/access-denied.webp"} width={500} height={500} alt='Acceso denegado' />
                <h1 className='text-transparent bg-gradient-to-r from-red-500 to-red-700 text-4xl bg-clip-text font-extrabold mt-4'>Acceso Denegado</h1>
                <h2 className='font-semibold'>Por favor vuelve al Inicio.</h2>
            </section>
        </div>

    );
}
