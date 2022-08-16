import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import {
  compose,
  palette,
  typography,
  display,
  flexbox,
  spacing,
  width,
} from '@material-ui/system';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AppTheme from '../../../theme';
import * as url from '../../../lib/url/generator';
import { getPhoto } from '../../../utils/pathUtil';

export const LinkText = styled.div`
  color: ${(props) =>
    props.isActive
      ? AppTheme.palette.primary.main
      : AppTheme.palette.info.main};
  cursor: pointer;
  margin: ${(props) => `0 ${props.theme.spacing(2)}px`};
  &:hover {
    color: ${AppTheme.palette.primary.main};
  }
`;

const MobileLinkText = styled.div`
  color: ${(props) =>
    props.isActive
      ? AppTheme.palette.background.default
      : AppTheme.palette.info.main};
  background-color: ${(props) =>
    props.isActive ? AppTheme.palette.primary.main : 'transparent'};
  padding: ${(props) => `${props.theme.spacing(2)}px`};
  font-size: 1rem;
  font-weight: 600;
  &:hover {
    color: ${AppTheme.palette.primary.main};
  }
`;

export const Box = styled('div')(
  compose(width, display, flexbox, spacing, palette, typography),
);

export const UserProfileIcon = ({ photo }) => {
  return (
    <Avatar
      src={getPhoto(photo)}
      alt="avatar"
      style={{ width: 50, height: 50 }}
    />
  );
};

export const NavBarLink = ({ menu, isDesktop = true }) => {
  const { asPath: path } = useRouter();
  const isActive = menu.href === path;

  return (
    <Link href={menu.href}>
      {isDesktop ? (
        <LinkText isActive={isActive}>{menu.title}</LinkText>
      ) : (
        <MobileLinkText isActive={isActive}>{menu.title}</MobileLinkText>
      )}
    </Link>
  );
};

export const MENU = [
  {
    title: 'Home',
    href: url.toHome(),
  },
  {
    title: 'New Releases',
    href: url.toReleases(),
  },
  {
    title: 'Podcasts',
    href: url.toPodcasts(),
  },
  {
    title: 'Music',
    href: url.toMusic(),
  },
  {
    title: 'News',
    href: url.toNews(),
  },
];

export const MOBLE_MENU = [
  {
    title: 'Home',
    href: url.toHome(),
  },
  {
    title: 'New Releases',
    href: url.toReleases(),
  },
  {
    title: 'Podcasts',
    href: url.toPodcasts(),
  },
  {
    title: 'Music',
    href: url.toMusic(),
  },
  {
    title: 'News',
    href: url.toNews(),
  },
  {
    title: 'My Library',
    href: url.toLibs(),
  },
  {
    title: 'Settings',
    href: url.toSettings(),
  },
];

export const MOBLE_SUB_MENU = [
  {
    title: 'My Library',
    href: url.toLibs(),
  },
  {
    title: 'Settings',
    href: url.toSettings(),
  },
];

export const SUB_MENU = [
  {
    title: 'Coming Soon',
    href: url.toComing(),
  },
  {
    title: 'Trending',
    href: url.toTrending(),
  },
  {
    title: 'Contests',
    href: url.toContests(),
  },
];
