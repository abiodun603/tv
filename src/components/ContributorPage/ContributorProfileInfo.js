import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { ContributorSubscribeButton } from './ContributorSubscribeButton';
import { Box } from '../widgets/Box';
import { getPhoto } from '../../utils/pathUtil';
import { getNumber } from '../../utils/formate';

export const ContributorProfileInfo = ({ contributor, isCurrentUser }) => {
  const { profile } = contributor;
  const theme = useTheme();

  const {
    photo,
    name,
    last_name,
    username,
    social,
    city,
    country,
    phone,
    email,
    facebook,
    instagram,
    twitter,
  } = profile;

  const profileInfoItem = (title, params = []) => {
    const details = params.filter(Boolean);

    if (!details.length) {
      return null;
    }

    return (
      <>
        <div className="text text_view_ghost text_size_xs">{title}</div>
        <div className="mb-4">{details.join(', ')}</div>
      </>
    );
  };

  const profileSocialLinks = () => {
    const details = [facebook, instagram, twitter].filter(Boolean);

    if (!details.length) {
      return null;
    }

    return (
      <>
        <div className="text text_view_ghost text_size_xs">Links</div>
        <ul className="profile-view__socials list-inline mb-0">
          {instagram && (
            <li className="list-inline-item">
              <a
                href={`https://instagram.com/${instagram}`}
                className="link link_view_default font-weight-bold"
              >
                <span className="icon icon_name_instagram" />
                Instagram
              </a>
            </li>
          )}
          {twitter && (
            <li className="list-inline-item">
              <a
                href={`https://twitter.com/${twitter}`}
                className="link link_view_default font-weight-bold"
              >
                <span className="icon icon_name_twitter" />
                Twitter
              </a>
            </li>
          )}
          {facebook && (
            <li className="list-inline-item">
              <a
                href={`https://facebook.com/${facebook}`}
                className="link link_view_default font-weight-bold"
              >
                <span className="icon icon_name_facebook" />
                Facebook
              </a>
            </li>
          )}
        </ul>
      </>
    );
  };

  return (
    <div className="profile-view">
      <div className="profile-view__header text-center">
        <img
          src={getPhoto(photo)}
          width="60"
          height="60"
          className="rounded-circle mb-2"
          alt=""
          style={{ objectFit: 'cover' }}
        />
        <div className="font-weight-bold">
          {name} {last_name}
        </div>
        <div className="text text_view_secondary text_size_s mb-3">
          @{username}
        </div>

        <ContributorSubscribeButton
          contributor={contributor}
          isCurrentUser={isCurrentUser}
        />
      </div>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around"
        mt={3}
      >
        <Box>
          <Box color={theme.palette.grey.default} fontSize={12}>
            Videos
          </Box>
          <Box textAlign="center">{getNumber(social.count_videos)}</Box>
        </Box>
        <Box>
          <Box color={theme.palette.grey.default} fontSize={12}>
            Followers
          </Box>
          <Box textAlign="center">{getNumber(social.count_followers)}</Box>
        </Box>
        <Box>
          <Box color={theme.palette.grey.default} fontSize={12}>
            Following
          </Box>
          <Box textAlign="center">{getNumber(social.count_following)}</Box>
        </Box>
      </Box>
      <div className="profile-view__body">
        {profileInfoItem('Location', [city, country])}
        {profileInfoItem('Email', [email])}
        {profileInfoItem('Phone Number', [phone])}
        {profileSocialLinks()}
      </div>
    </div>
  );
};
