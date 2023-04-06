'use client';
import React, { useState } from 'react';
import { Container, Menu, useMediaQuery } from '@material-ui/core';
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
import ProfileSettings from './tabs/ProfileSettings';
import ProfileMy from './tabs/ProfileMy';
import ProfilePayments from './tabs/ProfilePayments';
import ProfileSub from './tabs/ProfileSub';
import ProfileParental from './tabs/ProfileParental';
import ProfileUsers from './tabs/ProfileUsers';
import { PROFILE_UPLOADS } from '../../constants/routes';
import UploadPhoto from '../widgets/UploadPhoto';
import UserContent from '../UserContent/UserContent';
import { Box } from '../widgets/Box';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import myStore from '../../store/uploadName';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    margin: `${theme.spacing(10)}px 0`,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(4),
    ['@media (max-width:767px)']: {
      display: 'block',
      margin: `${theme.spacing(4)}px 0`,
      padding: 0,
    },
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.grey.grey50}`,
    ['@media (max-width:767px)']: {
      borderRight: 'none',
    },
  },
  avatar: {
    width: 60,
    height: 60,
  },
  tabPanel: {
    width: '100%',
  },
}));

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  };
}

const TAB_MENU = [
  { title: 'Uploads', icon: UploadIcon, disabled: false },
  { title: 'Subscription', icon: SubscriptionsIcon, disabled: true },
  { title: 'Payment methods', icon: PaymentIcon, disabled: true },
  { title: 'Parental control', icon: SupervisorAccountIcon, disabled: true },
  {
    title: 'Settings',
    icon: SettingsIcon,
    disabled: false,
  },
  { title: 'Active users', icon: VerifiedUserIcon, disabled: true },
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

const MenuListComposition = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    const uploadPageTitle = event.target.innerText
    myStore.nameupload(uploadPageTitle);
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
      <div style={{margin: 'auto', marginTop: '10px', width: 'full'}}>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          // bgcolor={theme.palette.primary.main}
          // color={theme.palette.background.default}
          style={{
            color: '#FFFFFF',
            backgroundColor: '#2EBC58',
            paddingHorizontal: 30,
            paddingVertical: 30,
            display: 'flex',
            gap: '4px'
          }}
        >
          Content Upload
          <ArrowDropDownIcon style={{fontSize: 'medium'}}/>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
          style={{ zIndex: 100 }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper style={{ background: '#FFFFFF'}}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                    style={{ background: '#FFFFFF'}}
                  >
                    <MenuItem onClick={handleClose}>
                      <Link href="/upload?music">Videos</Link>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                      <Link href="/upload?music">Music Video</Link>
                    </MenuItem>

                    <MenuItem disabled onClick={handleClose}>
                      <Link href="/upload?music">News</Link>
                    </MenuItem>

                    <MenuItem disabled onClick={handleClose}>
                      <Link href="/upload?music"> Podcasts</Link>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
};

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
    const [profileId, setProfileId] = useState(storeProfile?.social?.id);
    const classes = useStyles();
    const [tabIndex, setTabIndex] = useState(0);
    const isMobile = useMediaQuery('(max-width:767px)');

    // dropdown
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleChange = (event, newValue) => {
      setTabIndex(newValue);
    };

    const UserProfileBox = () => (
      <Box mr={1} p={1.5} style={{ position: 'relative' }}>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
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
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          mt={3}
        >
          <Box>
            <Box color={theme.palette.grey.default} fontSize={12}>
              Videos
            </Box>
            <Box textAlign="center">{storeProfile?.social?.count_videos}</Box>
          </Box>
          <Box>
            <Box color={theme.palette.grey.default} fontSize={12}>
              Followers
            </Box>
            <Box textAlign="center">
              {storeProfile?.social?.count_followers}
            </Box>
          </Box>
          <Box>
            <Box color={theme.palette.grey.default} fontSize={12}>
              Following
            </Box>
            <Box textAlign="center">
              {storeProfile?.social?.count_following}
            </Box>
          </Box>
        </Box>
        {/* <Link href="/upload">
          <Box
            className="clickable"
            bgcolor={theme.palette.primary.main}
            color={theme.palette.background.default}
            textAlign="center"
            py={1.75}
            mt={1}
            borderRadius={4}
          >
            Content Upload
          </Box>
        </Link> */}
        <MenuListComposition />
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
                disabled={menu.disabled}
                style={{cursor: 'pointer'}}
              />
            ))}
          </ProfileTabs>
          <TabPanel className={classes.tabPanel} value={tabIndex} index={0}>
            {isMobile && <UserProfileBox />}
            <ProfileMy />
          </TabPanel>
          <TabPanel className={classes.tabPanel} value={tabIndex} index={1}>
            <Box ml={isMobile ? 0 : 4}>
              <Box
                ml={1}
                mt={isMobile ? 2 : 0}
                fontSize="2rem"
                fontWeight="500"
                mb={2}
              >
                Uploads
              </Box>
              <UserContent profileId={profileId} />
            </Box>
          </TabPanel>
          <TabPanel className={classes.tabPanel} value={tabIndex} index={2}>
            <ProfileSub />
          </TabPanel>
          {/*<TabPanel className={classes.tabPanel} value={tabIndex} index={3}>
            <ProfilePayments />
          </TabPanel>
          <TabPanel className={classes.tabPanel} value={tabIndex} index={4}>
            <ProfileParental />
            </TabPanel>*/}
          <TabPanel className={classes.tabPanel} value={tabIndex} index={5}>
            <ProfileSettings />
          </TabPanel>
          {/*<TabPanel className={classes.tabPanel} value={tabIndex} index={6}>
            <ProfileUsers />
          </TabPanel>*/}
        </div>
      </Container>
    );
  }),
);

export default ProfilePage;
