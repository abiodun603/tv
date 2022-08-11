import * as url from '../../../../lib/url/generator';

export const menu = [
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

export const dropDownMenu = [
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
