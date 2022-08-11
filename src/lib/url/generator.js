import qs from 'qs';

import {
  TYPE_FILM,
  TYPE_MUSIC,
  TYPE_PODCAST,
  TYPE_REC,
  TYPE_USER,
} from '../../constants/API';

function cleanURL(path) {
  const url = String(path);

  // remove `?` if it's last char
  return url.endsWith('?') ? url.slice(0, url.length - 1) : url;
}

export function toCollection(id) {
  return `/collection?id=${id}`;
}

export function toFilmDetails(id) {
  return `/details/film?id=${id}`;
}

export function toDetails() {
  return '/details';
}

export function toLibs() {
  return '/libs';
}

export function toSettings() {
  return '/settings';
}

export function toReleases() {
  return '/releases';
}

export function toTrending() {
  return '/trending';
}

export function toSearch(params = {}) {
  return cleanURL(`/search?${qs.stringify(params)}`);
}

export function toComing() {
  return '/coming';
}

export function toUpload() {
  return '/upload';
}

export function toMedia() {
  return '/media';
}

export function toAuth() {
  return '/auth';
}

export function toCollections() {
  return '/collections';
}

export function toContests() {
  return '/contests';
}

export function toContest() {
  return '/contest';
}

export function toHome() {
  return '/home';
}

export function toAccount() {
  return '/account';
}

export function toContestComing() {
  return '/contest/coming';
}

export function toNews() {
  return '/news';
}

export function toListVideo() {
  return '/videos';
}

export function toFilmListVideo(params = {}) {
  return cleanURL(`${toListVideo()}/${TYPE_FILM}?${qs.stringify(params)}`);
}

export function toMovies() {
  return '/movies';
}

export function toRecListVideo(params = {}) {
  return cleanURL(`${toListVideo()}/${TYPE_REC}?${qs.stringify(params)}`);
}

export function toUserListVideo(params = {}) {
  return cleanURL(`${toListVideo()}/${TYPE_USER}?${qs.stringify(params)}`);
}

export function toMusicListVideo(params = {}) {
  return cleanURL(`${toListVideo()}/${TYPE_MUSIC}?${qs.stringify(params)}`);
}

export function toPodcasts(params = {}) {
  return cleanURL(`${toListVideo()}/${TYPE_PODCAST}?${qs.stringify(params)}`);
}

export function toVideoGrid(type, tag, params = {}) {
  return cleanURL(
    `${toListVideo()}/${type}?${qs.stringify({ ...params, tag })}`,
  );
}

export function toContributor(id = '') {
  return cleanURL(`/contributor?${qs.stringify({ id })}`);
}

export function toMusic() {
  return '/music';
}

export function toProfileUsers() {
  return '/profile/users';
}

export function toProfileMy() {
  return '/profile';
}

export function toProfileParental() {
  return '/profile/parental';
}

export function toProfilePayments() {
  return '/profile/payments';
}

export function toProfileSettings() {
  return '/profile/settings';
}

export function toProfileSub() {
  return '/profile/sub';
}
