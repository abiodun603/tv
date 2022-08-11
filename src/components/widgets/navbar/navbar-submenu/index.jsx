import React from 'react';
import Link from 'next/link';
import { Dropdown } from 'react-bootstrap';

import { dropDownMenu } from '../navbar-menu/menu';

export const NavBarSubMenu = () => {
  return (
    <>
      <Dropdown className="navbar__nav-link nav-item">
        <Dropdown.Toggle
          as="a"
          className="nav-link cursor-pointer"
          id="nav-genres-dropdown"
        >
          More
        </Dropdown.Toggle>

        <Dropdown.Menu
          renderOnMount={true}
          className="dropdown-menu_theme_isabi"
        >
          {dropDownMenu.map((menu, idx) => (
            <Link key={`genre_more_${idx.toString()}`} href={menu.href}>
              <Dropdown.Item href={menu.href}>{menu.title}</Dropdown.Item>
            </Link>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
