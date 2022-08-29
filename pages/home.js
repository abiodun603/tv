import React from 'react';
import { useMediaQuery } from '@material-ui/core';

import Page from '../src/components/Page';
import Home from '../src/components/Home';

export default function HomePage() {
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <Page>
      <Home isMobile={isMobile} />
    </Page>
  );
}
