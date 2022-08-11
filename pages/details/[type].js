import React from 'react';
import { useRouter } from 'next/router';

import Page from '../../src/components/Page';
import { DetailsVideo } from '../../src/components/details';

export default function DetailsType() {
  const { query } = useRouter();

  return (
    <Page>
      <DetailsVideo query={query} />
    </Page>
  );
}
