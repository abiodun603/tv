import React, { FC } from 'react';
import Link from 'next/link';

import Avatar from '@material-ui/core/Avatar';

import { getPhoto } from '../../../utils/pathUtil';

import * as url from '../../../lib/url/generator';

export const UserBox = ({ profile, children }) => {
  return (
    <div className="d-flex">
      <Link href={url.toContributor()}>
        <div className="mr-2">
          <Avatar src={getPhoto(profile.photo)} />
        </div>
      </Link>
      <div className="my-auto">
        <span className="text-dark-label my-auto">
          {profile.name} {profile.last_name}
        </span>
      </div>
      {children}
    </div>
  );
};
