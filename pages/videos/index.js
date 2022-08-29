import React from 'react';
import { useMediaQuery } from '@material-ui/core';

import Page from '../../src/components/Page';
import UserVideos from '../../src/components/UserVideos';

export default function UserVideosPage() {
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <Page>
      <UserVideos isMobile={isMobile} />
    </Page>
  );
}
