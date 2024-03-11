import React from 'react'
import Link from 'next/link';

import { NavLinkProps } from '@/types/types';

const NavLink: React.FC<NavLinkProps> = ({ href, title }) => {
  return (
    <Link href={href} title={title} className="text-pink-500 font-semibold">
      {title}
    </Link>
  );
};

export default NavLink;
