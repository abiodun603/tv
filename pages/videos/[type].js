import React, { useMemo } from 'react';
import { useRouter } from 'next/router';

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

  const { title, params, ...props } = router.query;

  const filters = useMemo(() => {
    return decodeParams(params);
  }, [params]);

  return (
    <Page>
      <VideoList
        className="py-5 px-5"
        title={title}
        showTitle
        params={filters}
        {...props}
      />
    </Page>
  );
}
