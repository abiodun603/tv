import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';

import { inject, observer } from 'mobx-react';

import { Navbar, Container, FormControl } from 'react-bootstrap';

import ProfileStore from '../../../store/profileStore';
import searchStore from '../../../store/searchStore';

import { Logo } from '../../ui/logo';
import { NavBarMenu } from './navbar-menu';

import { getPhoto } from '../../../utils/pathUtil';
import * as url from '../../../lib/url/generator';
import { SearchBoxHistory } from './navbar-searchBox-history';

@inject('profile', 'search')
@observer
class NavBarProfile extends React.Component {
  render() {
    const {
      profile: { profile },
    } = this.props;

    return (
      <Link href={url.toSettings()}>
        <a
          className="media ml-3 color-inherit text-decoration-none col-sm-auto"
          style={{
            maxWidth: '250px',
          }}
        >
          <img
            src={getPhoto(profile.photo)}
            width="52"
            height="52"
            className="rounded-circle mr-2"
            alt="avatar"
            style={{ objectFit: 'cover' }}
          />
          <div className="media-body">
            <div>
              {profile.name} {profile.last_name}
            </div>
            <div className="text text_view_secondary text_size_s">
              @{profile.username}
            </div>
          </div>
        </a>
      </Link>
    );
  }
}

const SearchBox = ({ searchHistory = [] }) => {
  const {
    query: { query: keyWord },
  } = useRouter();

  const [query, setQuery] = useState('');
  const [isBoxActive, setIsBoxActive] = useState < Boolean > false;

  useEffect(() => {
    if (keyWord) {
      setQuery(String(keyWord));
    }
  }, [keyWord]);

  return (
    <>
      <FormControl
        placeholder="Search"
        value={query}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            Router.push(url.toSearch({ query }));
          }
        }}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {
          setIsBoxActive(true);
        }}
        onBlur={() => {
          // todo: refactor
          setTimeout(() => {
            setIsBoxActive(false);
          }, 100);
        }}
      />
      {isBoxActive && searchHistory.length > 0 && (
        <SearchBoxHistory
          historyItems={searchHistory}
          onElementCLick={(searchValue) => {
            Router.push(url.toSearch({ query: searchValue }));
          }}
        />
      )}

      <Link href={url.toSearch({ query })}>
        <button className="navbar__search-button btn" type="button">
          <span className="icon icon_name_search-navbar icon_size_l" />
          <span className="sr-only">Search</span>
        </button>
      </Link>
    </>
  );
};

export const NavBar = ({ searchHistory = [] }) => {
  return (
    <nav className="navbar navbar-expand-sm">
      <Container style={{ position: 'relative' }}>
        <Logo />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <NavBarMenu />
          <div className="navbar__end d-flex align-items-center">
            <SearchBox searchHistory={searchHistory} />

            <Link href={url.toLibs()}>
              <button className="navbar__library-button btn" type="button">
                <span className="icon icon_name_library icon_size_l" />
                <span className="sr-only">Library</span>
              </button>
            </Link>

            <NavBarProfile />
          </div>
        </Navbar.Collapse>
      </Container>
    </nav>
  );
};
