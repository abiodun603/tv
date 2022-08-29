import React from 'react';
import { useMediaQuery } from '@material-ui/core';

import Page from '../src/components/Page';
import { ContributorPage as Contributor } from '../src/components/ContributorPage/ContributorPage';

export default function ContributorPage() {
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <Page>
      <Contributor isMobile={isMobile} />
    </Page>
  );
}
