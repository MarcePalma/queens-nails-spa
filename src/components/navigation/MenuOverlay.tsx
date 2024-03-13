import React from 'react'
import NavLink from './NavLink'
import { useUser } from '@/context/UserContext';



const links = [
  { path: '/turnos', title: 'TURNOS' },
  { path: '/publicaciones', title: 'FORO' },
  { path: '#contact', title: 'CONTACTO' },
];

export default function MenuOverlay() {
  const { token } = useUser();
  return (
    <ul className='flex flex-col py-4 items-center'>
      {links.map((link, index) => (

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
  )
}
