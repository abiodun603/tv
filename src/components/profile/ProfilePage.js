import React, { useState } from 'react';
import { Container, Tabs, Tab, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Link from 'next/link';
import { inject, observer } from 'mobx-react';

const ProfilePage = inject('profile')(
  observer((props) => {
    const {
      profile: {
        profile: storeProfile,
        uploadPhoto,
        setStateProfile,
        profileState,
      },
    } = props;
    const [profileId, setProfileId] = useState(storeProfile.social.id);

    return <Container></Container>;
  }),
);

export default ProfilePage;
