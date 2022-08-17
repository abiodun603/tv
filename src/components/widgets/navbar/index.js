import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  useMediaQuery,
  makeStyles,
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Logo } from '../../ui/logo';
import { MENU, NavBarLink, Box, UserProfileIcon } from './navbar-utils';
import SubMenu from './sub-menu';
import AppTheme from '../../../theme';
import * as url from '../../../lib/url/generator';
import { SearchBoxHistory } from './navbar-searchBox-history';
import { SideBar } from './sidebar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: AppTheme.palette.background.default,
    ['@media (min-width:1169px)']: {
      display: 'flex',
      alignItems: 'center',
    },
  },
  toolbar: {
    ['@media (min-width:1280px)']: {
      minWidth: 1280,
    },
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuButton: {
    color: AppTheme.palette.primary.main,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: AppTheme.palette.grey.grey10,
    '&:hover': {
      backgroundColor: AppTheme.palette.grey.grey10,
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'black',
  },
  inputInput: {
    padding: theme.spacing(1),
    width: '100%',
  },
}));

const SearchBox = ({ searchHistory = [] }) => {
  const classes = useStyles();
  const {
    query: { query: keyWord },
  } = useRouter();

  const [query, setQuery] = useState('');
  const [isBoxActive, setIsBoxActive] = useState(false);

  useEffect(() => {
    if (keyWord) {
      setQuery(String(keyWord));
    }
  }, [keyWord]);

  return (
    <>
      <div className={classes.search}>
        <InputBase
          placeholder="Search…"
          value={query}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
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
      </div>
      {isBoxActive && searchHistory.length > 0 && (
        <SearchBoxHistory
          historyItems={searchHistory}
          onElementCLick={(searchValue) => {
            Router.push(url.toSearch({ query: searchValue }));
          }}
        />
      )}

      <Link href={url.toSearch({ query })}>
        <Box mx={1} className="clickable">
          <span className="icon icon_name_search-navbar icon_size_l" />
        </Box>
      </Link>
    </>
  );
};

const UserProfile = ({ profile }) => {
  return (
    <Link href={url.toSettings()}>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        className="clickable"
      >
        <UserProfileIcon photo={profile.photo} />
        <Box color={AppTheme.palette.info.main} lineHeight="1.2" ml={1}>
          {profile.name} {profile.last_name}
          <Box color={AppTheme.palette.grey.grey60} fontSize="14px">
            @{profile.username}
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export const NavBar = inject(
  'auth',
  'profile',
  'search',
)(
  observer((props) => {
    const classes = useStyles();
    const [isOpen, setOpen] = useState(false);
    const isDeskTop = useMediaQuery('(min-width:1169px)');
    const isMobile = useMediaQuery('(max-width:720px)');
    const {
      profile: { profile },
      auth: { signOut },
    } = props;

    return (
      <div className={classes.root}>
        <AppBar position="relative" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Box mr={3}>
              <Logo />
            </Box>
            <Box flexDirection="row" display="flex" alignItems="center">
              {isDeskTop && (
                <>
                  {MENU.map((menu, idx) => (
                    <NavBarLink
                      key={`NavBarMenu_${idx.toString()}`}
                      menu={menu}
                    />
                  ))}
                  <SubMenu />
                </>
              )}

              {!isMobile && (
                <>
                  <SearchBox />
                  <Link href={url.toLibs()}>
                    <Box mr={4} ml={2} className="clickable">
                      <span className="icon icon_name_library icon_size_l" />
                    </Box>
                  </Link>
                  <UserProfile profile={profile} />
                </>
              )}
              {!isDeskTop && (
                <Box ml={4}>
                  <IconButton
                    edge="end"
                    className={classes.menuButton}
                    aria-label="open drawer"
                    onClick={() => setOpen(!isOpen)}
                    size="medium"
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <SideBar
          open={isOpen}
          onClose={() => setOpen(false)}
          profile={profile}
          logout={signOut}
        />
      </div>
    );
  }),
);
