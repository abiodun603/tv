import React from 'react';

import Page from '../src/components/Page';
import Trending from '../src/components/Trending';

import { BlurOverlay } from '../src/components/ui/overlay/blur';

export default function TrendingPage() {
  return (
    <Page>
      <BlurOverlay>
        <Trending />
      </BlurOverlay>
    </Page>
  );
}
