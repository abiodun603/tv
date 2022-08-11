import { FC } from 'react';
import { NextPageContext } from 'next';

import {
  TYPE_COMING_SOON,
  TYPE_FILM,
  TYPE_NEWS,
  TYPE_USER,
} from '../../constants/API';

import UserVideo from './UserVideo';
import FilmVideo from './FilmVideo';
import ComingVideo from './ComingVideo';

export const DetailsVideo = ({ query }) => {
  if (query.type === TYPE_USER) {
    return <UserVideo id={String(query.id)} type={[TYPE_USER]} />;
  }
  if (query.type === TYPE_NEWS) {
    return <UserVideo id={String(query.id)} type={[TYPE_NEWS]} />;
  }
  if (query.type === TYPE_COMING_SOON) {
    return <ComingVideo id={String(query.id)} type={[TYPE_COMING_SOON]} />;
  }
  return <FilmVideo id={String(query.id)} type={[TYPE_FILM]} />;
};
