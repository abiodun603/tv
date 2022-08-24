import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@material-ui/core';

import Page from '../../src/components/Page';
import VideoList from '../../src/components/VideoList';

const decodeParams = (params) => {
  try {
    return JSON.parse(params);
  } catch (e) {
    return {};
  }
};

export default function VideosType() {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width:767px)');

  const { title, params, ...props } = router.query;

  const filters = useMemo(() => {
    return decodeParams(params);
  }, [params]);

  return (
    <Page>
      <VideoList
        className={isMobile ? 'p-3' : 'p-5'}
        title={title}
        showTitle
        params={filters}
        {...props}
      />
    </Page>
  );
}
