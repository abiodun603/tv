import React from 'react';

import Page from '../src/components/Page';
import Coming from '../src/components/Coming';

import { BlurOverlay } from '../src/components/ui/overlay/blur';

export default function ComingPage() {
  return (
    <Page>
      {/* <BlurOverlay> */}
      <Coming />
      {/* </BlurOverlay> */}
    </Page>
  );
}
