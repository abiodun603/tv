import React from 'react';
import { useMediaQuery } from '@material-ui/core';

import Page from '../src/components/Page';
import { Search } from '../src/components/search';

export default function SearchPage() {
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <Page>
      <Search isMobile={isMobile} />
    </Page>
  );
}
