import React from 'react';
import Head from 'next/head';
import { useMediaQuery } from '@material-ui/core';

import LandingPage from '../src/components/LandingPage';

export default function Index() {
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <>
      <Head>
        <title>iSabiTV</title>
        <meta
          name="description"
          content="All your Afrocentric Content in one place"
        />
        <meta property="og:title" content="iSabiTV" />
        <meta
          property="og:description"
          content="All your Afrocentric Content in one place"
        />
        <meta property="og:url" content="https://isabitv.com/" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingPage />
    </>
  );
}

export async function getServerSideProps() {
  // Pass data to the page via props
  return { props: { data: 'hello' } };
}
