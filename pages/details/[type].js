import React from 'react';
import Script from 'next/script';
import { useRouter } from 'next/router';

import Page from '../../src/components/Page';
import { DetailsVideo } from '../../src/components/details';

export default function DetailsType() {
  const { query } = useRouter();
  return (
    <>
      <Script src="https://imasdk.googleapis.com/js/sdkloader/ima3.js" />
      <Page>
        <DetailsVideo query={query} />
      </Page>
    </>
  );
}
