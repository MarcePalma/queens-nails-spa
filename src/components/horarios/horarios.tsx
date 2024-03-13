import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Horarios() {
    return (
        <section className="dark:bg-pink-400 dark:text-gray-100">
            <div className="container flex flex-col-reverse mx-auto lg:flex-row">
                <div className="flex flex-col px-6 py-8 space-y-6 rounded-sm sm:p-8 lg:p-12 lg:w-1/2 xl:w-2/5">
                    <div className="flex space-x-2 sm:space-x-4">
                        <div className="space-y-2">
                            <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-4xl lg:leading-normal font-extrabold">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-white to-lime-50 z-10">
                                    HORARIOS DE ATENCION
                                </span>
                            </h1>
                            <p className="text-lg font-medium">De Lunes a Sabados:</p>
                            <p className="leadi">de 12:00 a 19:00</p>
                        </div>
                    </div>
                    <div className="flex space-x-2 sm:space-x-4">
                        <div className="space-y-2">
                            <p className="text-lg font-medium">Visita nuestro Calendario!</p>
                            <p className="leadi">Si quieres saber más sobre los horarios o días disponibles, puedes visitar el calendario presionando <Link href="/turnos" className='text-white font-bold'>AQUÍ!</Link></p>
                        </div>
                    </div>
                    <div className="flex space-x-2 sm:space-x-4">
                        <div className="space-y-2">
                            <p className="text-lg font-medium">Instagram</p>
                            <p className="leadi">Ante cualquier consulta, puedes visitar nuestra página de Instagram para conocer nuestras últimas promociones, novedades y más:
                                <Link target='_blank' href={"https://www.instagram.com/t.r_nails_spa/"}>
                                    <Image className='bg-clip' src={"/images/instagram-icon.webp"} width={70} height={70} alt='Instagram-logo' />
                                </Link>
                            </p>
                            <p className="leadi">¡Síguenos en Instagram para estar al tanto de todo lo que tenemos para ofrecerte!</p>
                        </div>
                    </div>
                </div>
                <div className="lg:w-1/2 xl:w-3/5 dark:bg-pink-500">
                    <div className="flex items-center justify-center p-4 md:p-8 lg:p-12">
                        <Image alt='foto de prueba' src="/images/example24.webp" width={500} height={300} className="rounded-lg shadow-lg bg-pink-900" />
                    </div>
                </div>
            </div>
        </section>


    )
}
