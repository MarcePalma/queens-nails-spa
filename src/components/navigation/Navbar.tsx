import React, { useState } from 'react';
import Link from 'next/link';
import NavLink from './NavLink.tsx';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import MenuOverlay from './MenuOverlay.tsx';
import Image from 'next/image.js';
import { useUser } from '@/context/UserContext';

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { token } = useUser();

  const navLinks = [
    {
      title: `TURNOS`,
      path: '/turnos',
    },
    {
      title: `FORO`,
      path: '/publicaciones',
    },
  ];

  return (
    <nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-10 bg-[#fff] bg-opacity-100">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link href={'/'} className="text-2xl md:text-5xl text-black font-semibold flex items-center justify-between">
          <Image className="mx-auto" width={70} height={70} src="/images/logo.webp" alt="Logo" />
        </Link>
        <Link href={"/"} className='flex'>
          <video width={100} height={190} autoPlay loop muted>
            <source src="/images/babyfoot2.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <video width={200} height={200} autoPlay loop muted>
            <source src="/images/queens-nails-spa.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </Link>

        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button title='boton de menu' name='Boton de Menu'
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-black hover:text-pink-500 hover:border-white"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button title='boton de menu' name='Boton de Menu'
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-black hover:text-pink-500 hover:border-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
            {token && (
              <li>
                <NavLink href="/dashboard" title="ADMINISTRAR" />
              </li>
            )}
          </ul>
        </div>
      </div>
      {/* @ts-ignore */}
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}

    </nav>
  );
}
