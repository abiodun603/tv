import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Nav } from 'react-bootstrap';

import classNames from 'classnames';

import { menu, MenuLink } from './menu';

import css from './navbar-menu.module.scss';
import { NavBarSubMenu } from '../navbar-submenu';

export const NavBarLink = ({ menu }) => {
  const { asPath: path } = useRouter();

  const isActive = menu.href === path;

  return (
    <li className="nav-item">
      <Link href={menu.href}>
        <a
          className={classNames(
            'navbar__nav-link nav-link',
            isActive && 'navbar__nav-link_active',
          )}
        >
          {menu.title}
        </a>
      </Link>
    </li>
  );
};

export const NavBarMenu = () => {
  return (
    <Nav
      className={classNames(
        'flex-grow-1 justify-content-between ml-3 mr-3',
        css.nav,
      )}
    >
      {menu.map((menu, idx) => (
        <NavBarLink key={`NavBarMenu_${idx.toString()}`} menu={menu} />
      ))}

      <NavBarSubMenu />
    </Nav>
  );
};
