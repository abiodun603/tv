import React, { useState } from 'react';
import { Container, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import {
  Edit as EditIcon,
  CloudUpload as UploadIcon,
  Subscriptions as SubscriptionsIcon,
  Payment as PaymentIcon,
  VerifiedUser as VerifiedUserIcon,
  Settings as SettingsIcon,
  SupervisorAccount as SupervisorAccountIcon,
} from '@material-ui/icons';
import { ProfileTabs, ProfileTab } from './tabs';
import { PROFILE_UPLOADS } from '../../constants/routes';
import UploadPhoto from '../widgets/UploadPhoto';
import { Box } from '../widgets/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    margin: `${theme.spacing(10)}px 0`,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(4),
    ['@media (max-width:768px)']: {
      display: 'block',
      margin: `${theme.spacing(4)}px 0`,
      padding: 0,
    },
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.grey.grey50}`,
    ['@media (max-width:768px)']: {
      borderRight: 'none',
    },
  },
  avatar: {
    width: 60,
    height: 60,
  },
}));

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  };
}

const TAB_MENU = [
  { title: 'Uploads', icon: UploadIcon, key: PROFILE_UPLOADS },
  { title: 'Subscription', icon: SubscriptionsIcon, key: null },
  { title: 'Payment methods', icon: PaymentIcon, key: null },
  { title: 'Parental control', icon: SupervisorAccountIcon, key: null },
  {
    title: 'Settings',
    icon: SettingsIcon,
    key: null,
  },
  { title: 'Active users', icon: VerifiedUserIcon, key: null },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

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
    const theme = useTheme();
    const [profileId, setProfileId] = useState(storeProfile.social.id);
    const classes = useStyles();
    const [tabIndex, setTabIndex] = useState(0);
    const isMobile = useMediaQuery('(max-width:768px)');

    const handleChange = (event, newValue) => {
      setTabIndex(newValue);
    };

    const UserProfileBox = () => (
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent={isMobile ? 'space-between' : 'flex-start'}
        mr={1}
        p={1.5}
      >
        <UploadPhoto
          storeProfile={storeProfile}
          upload={uploadPhoto}
          classname={classes.avatar}
        />
        <Box
          color={theme.palette.info.main}
          lineHeight="1.2"
          ml={1}
          className="clickable"
          onClick={() => setTabIndex(0)}
        >
          {storeProfile.name} {storeProfile.last_name}
          <Box color={theme.palette.grey.grey60} fontSize="14px">
            @{storeProfile.username}
          </Box>
        </Box>
      </Box>
    );

    return (
      <Container>
        <div className={classes.root}>
          <ProfileTabs
            orientation={isMobile ? 'horizontal' : 'vertical'}
            variant="scrollable"
            value={tabIndex}
            onChange={handleChange}
            aria-label="Profile Settings Tab"
            className={classes.tabs}
          >
            {isMobile ? (
              <ProfileTab
                icon={<EditIcon />}
                aria-label="Profile Edit"
                {...a11yProps(0)}
              />
            ) : (
              <UserProfileBox />
            )}
            {TAB_MENU.map((menu, index) => (
              <ProfileTab
                key={menu.title}
                label={isMobile ? '' : menu.title}
                {...a11yProps(index + 1)}
                icon={<menu.icon />}
                aria-label={menu.title}
              />
            ))}
          </ProfileTabs>
          <TabPanel value={tabIndex} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={tabIndex} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={tabIndex} index={3}>
            Item Four
          </TabPanel>
          <TabPanel value={tabIndex} index={4}>
            Item Five
          </TabPanel>
          <TabPanel value={tabIndex} index={5}>
            Item Six
          </TabPanel>
          <TabPanel value={tabIndex} index={6}>
            Item Seven
          </TabPanel>
        </div>
      </Container>
    );
  }),
);

export default ProfilePage;
