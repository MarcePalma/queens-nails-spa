import React from 'react'

import { NavLinkProps } from '@/types/types';

const NavLink: React.FC<NavLinkProps> = ({ href, title }) => {
  return (
    <a href={href} title={title} className="text-white font-semibold">
      {title}
    </a>
  );
};

export default NavLink;
