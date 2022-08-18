import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import { Spinner } from 'react-bootstrap';
import { MenuItem, Grid, makeStyles } from '@material-ui/core';

import { Box } from '../../widgets/Box';
import ChangePassword from '../../dialogs/ChangePassword';
import ConfirmDialog from '../../dialogs/Confirm';
import {
  CustomDatePicker,
  CustomTextField,
  MultiSelect,
} from '../../widgets/Field';
import { ButtonContainer, ButtonText } from '../../widgets/Button';
import Toggler from './../../Toggler/Toggler';
import RemoveAccount from '../buttons/RemoveAccount';

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

const MyProfile = inject(
  'auth',
  'languages',
  'countries',
)(
  observer((props) => {
    const { profileStore, signOut } = props.auth;
    const [deleteAllUploadsDialog, setDeleteAllUploadsDialog] = useState(false);
    const [removeAccountDialog, setRemoveAccountDialog] = useState(false);
    const [clearHistoryDialog, setClearHistoryDialog] = useState(false);
    const [logoutDialog, setLogoutDialog] = useState(false);
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const classes = useStyles();

    useEffect(() => {
      const {
        username: userName,
        name: name,
        last_name: lastName,
      } = profileStore.profile;

      props.languages.load();
      props.countries.load();

      setUserName(userName);
      setFirstName(name);
      setLastName(lastName);
    }, []);

    const toggleDeleteAllUploadsDialog = () => {
      setDeleteAllUploadsDialog(!deleteAllUploadsDialog);
    };

    const toggleRemoveAccount = () => {
      setRemoveAccountDialog(!removeAccountDialog);
    };

    const toggleClearHistoryDialog = () => {
      setClearHistoryDialog(!clearHistoryDialog);
    };

    const toggleLogoutDialog = () => {
      setLogoutDialog(!logoutDialog);
    };

    const handleSubmitRemoveUploads = () => {
      const {
        profileStore: { removeUploads },
      } = props.auth;

      toggleDeleteAllUploadsDialog();

      removeUploads();
    };

    const handleSubmitRemoveAccount = () => {
      const {
        profileStore: { removeAccount },
        signOut,
      } = props.auth;

      toggleRemoveAccount();

      removeAccount();
      signOut();
    };

    const handleSubmitClearHistory = () => {
      const {
        profileStore: { clearHistory },
      } = props.auth;

      toggleClearHistoryDialog();

      clearHistory();
    };

    const handleChangeName = (event) => {
      setFirstName({ name: event.target.value });
    };

    const handleChangeLastName = (event) => {
      setLastName({ lastName: event.target.value });
    };

    const handleChangeUserName = (event) => {
      setUserName({ userName: event.target.value });
    };

    const handleSave = () => {
      profileStore.setName(firstName);
      profileStore.setLastName(lastName);
      profileStore.setUserName(userName);

      profileStore.updateUser();
    };

    const isDataValid = Boolean(
      firstName && lastName && userName && profileStore.profile.birthday,
    );

    return (
      <>
        <Grid container>
          <Grid item xs={12} className={classes.gridContainer}>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Box fontWeight="500" fontSize="2rem">
                  My Profile
                </Box>
              </Box>
              <Box>
                {profileStore.loading ? (
                  <Spinner animation="border" variant="success" />
                ) : (
                  <ButtonContainer onClick={handleSave} disabled={!isDataValid}>
                    Save Changes
                  </ButtonContainer>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={6}
            className={classNames(classes.gridContainer, classes.rBorder)}
          >
            <Grid item xs={12} sm={12} md={6}>
              <Box mr={2} mb={2}>
                <CustomTextField
                  id="name"
                  fullWidth
                  error={!firstName}
                  label="Name"
                  className="mt-3"
                  helperText={!firstName ? 'Incorrect name' : ''}
                  value={firstName || ''}
                  onChange={handleChangeName}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box mb={2}>
                <CustomTextField
                  id="last_name"
                  fullWidth
                  error={!lastName}
                  label="Last Name"
                  className="mt-3"
                  helperText={!lastName ? 'Incorrect last name' : ''}
                  value={lastName || ''}
                  onChange={handleChangeLastName}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mb={2}>
                <CustomTextField
                  id="username"
                  fullWidth
                  error={!userName}
                  label="Username"
                  helperText={!userName ? 'Incorrect username' : ''}
                  value={userName || ''}
                  onChange={handleChangeUserName}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box mb={2}>
                <CustomTextField
                  id="email"
                  fullWidth
                  error={!profileStore.validated.email}
                  label="Email"
                  helperText={
                    !profileStore.validated.email ? 'Incorrect email' : ''
                  }
                  value={profileStore.profile.email || ''}
                  onChange={(event) => {
                    profileStore.setEmail(event.target.value);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4} className={classes.gridFlex}>
              <Box mb={2} ml={2}>
                <Toggler
                  id="email-show"
                  title="Show On/Off"
                  checked={Boolean(profileStore.profile.display_email)}
                  onChange={(event) => {
                    profileStore.setShowEmail(event.target.checked);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box mb={2}>
                <CustomTextField
                  id="phone"
                  fullWidth
                  error={!profileStore.validated.phone}
                  helperText={
                    !profileStore.validated.phone ? 'Incorrect phone' : ''
                  }
                  label="Phone number"
                  value={profileStore.profile.phone || ''}
                  onChange={(event) => {
                    profileStore.setPhone(event.target.value);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4} className={classes.gridFlex}>
              <Box mb={2} ml={2}>
                <Toggler
                  id="phone-show"
                  title="Show On/Off"
                  checked={Boolean(profileStore.profile.display_phone)}
                  onChange={(event) => {
                    profileStore.setShowPhone(event.target.checked);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mb={2}>
                <CustomDatePicker
                  id="birthday"
                  fullWidth
                  label="Date of birth"
                  format="yyyy-dd-MM"
                  error={
                    !profileStore.validated.birthday ||
                    !profileStore.profile.birthday
                  }
                  helperText={
                    !profileStore.validated.birthday ||
                    !profileStore.profile.birthday
                      ? 'Incorrect Date'
                      : ''
                  }
                  value={profileStore.profile.birthday}
                  onChange={(data) => profileStore.setBirthday(data)}
                  width="100%"
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box mb={2}>
                <CustomTextField
                  id="select-country"
                  select
                  fullWidth
                  label="Country"
                  value={profileStore.profile.country || ''}
                  onChange={(event) =>
                    profileStore.setCountry(event.target.value)
                  }
                >
                  {props.countries.list.map((country) => (
                    <MenuItem key={country.id} value={country.shortcode}>
                      {country.title}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box mb={2} ml={2}>
                <CustomTextField
                  id="city"
                  fullWidth
                  label="City"
                  value={profileStore.profile.city || ''}
                  onChange={(event) => {
                    profileStore.setCity(event.target.value);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4} className={classes.gridFlex}>
              <Box mb={2} ml={2}>
                <Toggler
                  id="location-show"
                  title="Show On/Off"
                  checked={Boolean(profileStore.profile.display_location)}
                  onChange={(event) => {
                    profileStore.setShowLocation(event.target.checked);
                  }}
                />
              </Box>
            </Grid>
          </Grid>
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
            <Grid item xs={12}>
              <Box mb={2}>
                {profileStore.profile.email ? (
                  <ChangePassword />
                ) : (
                  <div style={{ height: '54px' }} />
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
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
              <Box mb={2}>
                <RemoveAccount
                  onClick={toggleRemoveAccount}
                  dialog={{
                    opened: removeAccountDialog,
                    onClose: toggleRemoveAccount.bind(this),
                    onSubmit: handleSubmitRemoveAccount.bind(this),
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container item xs={12} className={classes.gridContainer}>
            <Grid item xs={12} md={6}>
              <Box>
                <Box fontWeight="500" fontSize="2rem">
                  Settings
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box ml={2}>
                <Box fontWeight="500" fontSize="2rem">
                  Watch History
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={6}
            className={classNames(classes.gridContainer, classes.rBorder)}
          >
            <Grid item xs={12}>
              <Box mb={2}>
                <MultiSelect
                  loading={props.languages.loading}
                  value={profileStore.profile.languages || []}
                  handleChange={(event) =>
                    profileStore.setLanguages(event.target.value)
                  }
                  options={props.languages.items.map((item) => ({
                    key: item.id,
                    value: item.id,
                    label: item.name,
                  }))}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mb={2}>
                <ButtonText onClick={toggleDeleteAllUploadsDialog}>
                  <span className="font-weight-bold text-danger text-uppercase">
                    <u>Delete All Uploads</u>
                  </span>
                </ButtonText>
                <ConfirmDialog
                  opened={Boolean(deleteAllUploadsDialog)}
                  onClose={toggleDeleteAllUploadsDialog}
                  onSubmit={handleSubmitRemoveUploads}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mb={2}>
                <ButtonText onClick={toggleClearHistoryDialog}>
                  <span className="font-weight-bold text-danger text-uppercase">
                    <u>Clear History</u>
                  </span>
                </ButtonText>
                <ConfirmDialog
                  opened={Boolean(clearHistoryDialog)}
                  onClose={toggleClearHistoryDialog}
                  onSubmit={handleSubmitClearHistory}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={6} className={classes.gridContainer}>
            <Grid item xs={12} className={classes.gridFlex}>
              <Box mb={2}>
                <Toggler
                  id="track_watch"
                  title="Do not track my watch history"
                  checked={Boolean(profileStore.profile.watch_history_enabled)}
                  onChange={(event) => {
                    profileStore.setDontTrackWatch(event.target.checked);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} className={classes.gridFlex}>
              <Box mb={2}>
                <Toggler
                  id="track_search"
                  title="Do not track my search history"
                  checked={Boolean(profileStore.profile.search_history_enabled)}
                  onChange={(event) => {
                    profileStore.setDontTrackSearch(event.target.checked);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box height={40} />
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }),
);

export default MyProfile;
