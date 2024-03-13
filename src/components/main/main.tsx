"use-client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
  return (
    <section className='py-24'>
      <div className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-4xl lg:leading-normal font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600 z-10">
              CONOCE NUESTROS SERVICIOS
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-md text-black font-semibold">
            Somos un centro especializado en Estética de Manos, Pies y Quiropedia, dedicado al cuidado integral de las personas. Nuestro objetivo es ofrecer un ambiente de salud podal y belleza, donde hombres y mujeres puedan disfrutar de servicios diferenciados y de alta calidad.
          </p>
        </header>


        <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <li>
            <a href="#" className="group relative block">
              <Image
                width={1900}
                height={1000}
                src="/images/example1.webp"
                alt="aa"
                className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
              />

              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h2 className="text-xl  text-pink-500 font-semibold">Manicura</h2>
              </div>
            </a>
          </li>

          <li>
            <a href="#" className="group relative block">
              <Image
                width={1000}
                height={1000}
                src="/images/example.webp"
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
              <Image
                width={1000}
                height={1000}
                src="/images/example23.webp"
                alt=""
                className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
              />

              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h4 className="text-xl font-medium text-white">Quiropedia</h4>
                <Link 
                  href={"/turnos"}
                  className="button"
                >
                  Agenda tu cita!
                </Link>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <style jsx>{`
            .button {
              background-color: #fff;
              color: #E91E63;
              padding: 10px 20px;
              border: 2px solid #E91E63;
              border-radius: 5px;
              cursor: pointer;
              font-weight: bold;
              transition: background-color 0.3s, color 0.3s;
            }
    
            .button:hover {
              background-color: #E91E63;
              color: #fff;
            }
          `}</style>
    </section>
  )
}


