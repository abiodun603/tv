import React, { useState } from 'react';
import { MenuItem, Grid, makeStyles, useMediaQuery } from '@material-ui/core';
import { Box } from '../../widgets/Box';
import { inject, observer } from 'mobx-react';
import {
  CustomDatePicker,
  CustomTextField,
  MultiSelect,
} from '../../widgets/Field';
import Toggler from './../../Toggler/Toggler';
import ConfirmDialog from '../../dialogs/Confirm';
import { ButtonContainer, ButtonText } from '../../widgets/Button';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: theme.spacing(2),
  },
  rBorder: {
    borderRight: `1px solid ${theme.palette.grey.grey50}`,
  },
  gridFlex: {
    display: 'flex',
    alignItems: 'end',
  },
}));

const ProfileSociail = inject(
  'auth',
  'languages',
  'countries',
)(
  observer((props) => {
    const { profileStore, signOut } = props.auth;
    const [logoutDialog, setLogoutDialog] = useState(false);
    const classes = useStyles();

    const toggleLogoutDialog = () => {
      setLogoutDialog(!logoutDialog);
    };

    return (
      <Grid container item xs={12} md={6} className={classes.gridContainer}>
        <Grid item xs={12}>
          <Box mb={2}>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box mb={2}>
                <Box fontWeight="500">Social Media</Box>
              </Box>
            </Box>
            <CustomTextField
              id="instagram"
              fullWidth
              label="Instagram"
              value={profileStore.profile.instagram || ''}
              onChange={(event) => {
                profileStore.setInstagram(event.target.value);
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mb={2}>
            <CustomTextField
              id="facebook"
              fullWidth
              label="Facebook"
              value={profileStore.profile.facebook || ''}
              onChange={(event) => {
                profileStore.setFacebook(event.target.value);
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mb={2}>
            <CustomTextField
              id="twitter"
              fullWidth
              label="Twitter"
              value={profileStore.profile.twitter || ''}
              onChange={(event) => {
                profileStore.setTwitter(event.target.value);
              }}
            />
          </Box>
        </Grid>

        <Box my={4}>
          <Box fontWeight="500">Security & Authentication</Box>
        </Box>

        <Grid item xs={12} style={{ marginBottom: '20px' }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            backgroundColor="blue"
          >
            <Box>
              <Box>2-Step Authentication</Box>
            </Box>
            <Box>
              <Toggler title="Show On/Off" checked={Boolean(true)} />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} style={{ marginBottom: '20px' }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            backgroundColor="blue"
          >
            <Box>
              <Box>Display my contact email</Box>
            </Box>
            <Box>
              <Toggler
                id="email-show"
                title="Show On/Off"
                checked={Boolean(profileStore.profile.display_email)}
                onChange={(event) => {
                  profileStore.setShowEmail(event.target.checked);
                }}
              />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} style={{ marginBottom: '20px' }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            backgroundColor="blue"
          >
            <Box>
              <Box>Display my contact phone number</Box>
            </Box>
            <Box>
              <Toggler
                id="phone-show"
                title="Show On/Off"
                checked={Boolean(profileStore.profile.display_phone)}
                onChange={(event) => {
                  profileStore.setShowPhone(event.target.checked);
                }}
              />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} style={{ marginBottom: '20px' }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            backgroundColor="blue"
          >
            <Box>
              <Box>Display my location</Box>
            </Box>
            <Box>
              <Toggler
                id="location-show"
                title="Show On/Off"
                checked={Boolean(profileStore.profile.display_location)}
                onChange={(event) => {
                  profileStore.setShowLocation(event.target.checked);
                }}
              />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} mb={2} style={{ marginBottom: '20px' }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            backgroundColor="blue"
          >
            <Box>
              <Box>Display my social media</Box>
            </Box>
            <Box>
              <Toggler
                id="social-show"
                title="Show On/Off"
                checked={Boolean(profileStore.profile.display_social)}
                onChange={(event) => {
                  profileStore.setShowSocial(event.target.checked);
                }}
              />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box mb={2}>
            <ButtonText
              onClick={toggleLogoutDialog}
              startIcon={
                <span className="account-list__logout-icon icon icon_name_logout" />
              }
            >
              <span className="font-weight-bold text text_view_secondary text-uppercase">
                Logout
              </span>
            </ButtonText>
            <ConfirmDialog
              opened={logoutDialog}
              onClose={toggleLogoutDialog}
              onSubmit={signOut}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: '54px' }} />
        </Grid>
      </Grid>
    );
  }),
);

export default ProfileSociail;
