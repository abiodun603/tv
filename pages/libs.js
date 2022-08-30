import React from 'react';
import { useMediaQuery } from '@material-ui/core';

import Page from '../src/components/Page';
import Libs from '../src/components/Libs';

export default function LibsPage() {
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <Page>
      <Libs isMobile={isMobile} />
    </Page>
  );
}
