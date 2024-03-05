"use-client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
  return (
    <section className='p-10'>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-4xl lg:leading-normal font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600 z-10">
              CONOCE NUESTROS SERVICIOS
            </span>
          </h1>
        </header>


        <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <li>
            <a href="#" className="group relative block">
              <img
                src="/images/example.jpg"
                alt="aa"
                className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
              />

              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl  text-pink-500 font-semibold">Manicura</h3>
              </div>
            </a>
          </li>

          <li>
            <a href="#" className="group relative block">
              <img
                src="/images/example.png"
                alt="aaa"
                className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
              />

              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl text-pink-500 font-semibold">Pedicura</h3>


              </div>
            </a>
          </li>

          <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <a href="#" className="group relative block">
              <img
                src="/images/example23.jpeg"
                alt=""
                className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
              />

              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-medium text-white">Quiropedia</h3>
                <Link
                  href={"/turnos"}
                  className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                >
                  Agenda tu cita!
                </Link>
              </div>
            </a>
          </li>
        </ul>
        <ul className="mx-auto mt-4 max-w-md text-white">
          <li>⚪Prevención y tratamiento de pie diabético.</li>
          <li>⚪Hongos y enfermedades de la uña.</li>
          <li>⚪Cauterizacion de lunares y verrugas.</li>
          <li>⚪Uñas encarnadas.</li>
          <li>⚪Hidratacion.</li>
          <li>⚪Masaje podal.</li>
          <li>⚪Callosidades.</li>
          <li>⚪Reconstrucción de uñas.</li>
          <li>⚪Pedicure preventivo.</li>
          <li>⚪Pedicure estetico.</li>
          <li>⚪Spa de pies.</li>
          <li>⚪Terápia laser.</li>
        </ul>
      </div>
    </section>
  )
}


