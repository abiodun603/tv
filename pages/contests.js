import React from 'react';

import Page from '../src/components/Page';
import Contests from '../src/components/Contests';

import { BlurOverlay } from '../src/components/ui/overlay/blur';

export default function ContestsPage() {
  return (
    <Page>
      <BlurOverlay>
        <Contests />
      </BlurOverlay>
    </Page>
  );
}
