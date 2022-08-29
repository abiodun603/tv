import React from 'react';
import { useMediaQuery } from '@material-ui/core';

import Page from '../src/components/Page';
import Release from '../src/components/Release';

export default function ReleasesPage() {
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <Page>
      <Release isMobile={isMobile} />
    </Page>
  );
}
