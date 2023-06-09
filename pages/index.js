import React from 'react';
import Head from 'next/head';
import { useMediaQuery } from '@material-ui/core';

import LandingPage from '../src/components/LandingPage';

export default function Index() {
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <div>
      <Head>
        <title>iSabiTV - All Your Afrocentric Content</title>
      </Head>
      <LandingPage />
    </div>
  );
}


