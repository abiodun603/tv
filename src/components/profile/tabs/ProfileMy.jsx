'use client';
import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import { Spinner } from 'react-bootstrap';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

// import { PATH_URL_COUNTRIES } from '../../../constants/API';

import { MenuItem, Grid, makeStyles, useMediaQuery } from '@material-ui/core';

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

import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import ProfileSociail from './ProfileSociail';

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
    const [removeAccountDialog, setRemoveAccountDialog] = useState(false);
    const [logoutDialog, setLogoutDialog] = useState(false);
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const classes = useStyles();
    const [countryCode, setcountryCode] = useState('');
    const isMobile = useMediaQuery('(max-width:959px)');

    useEffect(() => {
      try {
        axios.get('https://api.ipregistry.co/?key=tryout').then((res) => {
          console.log(res);
          setcountryCode(res?.data?.location?.country?.code);
        });
      } catch {
        (err) => console.log(err);
      }
    }, []);

    console.log(countryCode);

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
    }, [profileStore.profile, props.countries, props.languages]);

    const toggleRemoveAccount = () => {
      setRemoveAccountDialog(!removeAccountDialog);
    };

    const toggleLogoutDialog = () => {
      setLogoutDialog(!logoutDialog);
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

    const handleSave = () => {
      profileStore.setName(firstName);
      profileStore.setLastName(lastName);
      profileStore.setUserName(userName);

      profileStore.updateUser();
      console.log(profileStore);
    };

    const isDataValid = Boolean(
      firstName && lastName && userName && profileStore.profile.birthday,
    );

    const handleValidateInput = (event) => {
      const regex = /^[a-zA-Z0-9_]*$/; // regex to only allow letters, numbers, and underscores
      const value = event.target.value;

      if (regex.test(value)) {
        storeProfile.setUserName(value);
      }
    };
    console.log(props.countries.list);

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
      setModal(!modal);
    };

    return (
      <Box ml={isMobile ? 0 : 4}>
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
            <Grid item xs={12}>
              <Box mr={isMobile ? 0 : 2} mb={2}>
                <CustomTextField
                  id="name"
                  fullWidth
                  error={!firstName}
                  label="Name"
                  helperText={!firstName ? 'Incorrect name' : ''}
                  value={firstName || ''}
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mb={2}>
                <CustomTextField
                  id="last_name"
                  fullWidth
                  error={!lastName}
                  label="Last Name"
                  helperText={!lastName ? 'Incorrect last name' : ''}
                  value={lastName || ''}
                  onChange={(event) => {
                    setLastName(event.target.value);
                  }}
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
                  onChange={handleValidateInput}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
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

            <Grid item xs={12} md={8}>
              <Box mb={2} style={{ borderBottom: '1px solid #D3D3D3' }}>
                <label for="phone" style={{ fontSize: '11px', opacity: '90%' }}>
                  Phone Number
                </label>
                <PhoneInput
                  className={'input-phone-number'}
                  id="phone"
                  defaultCountry={countryCode}
                  fullWidth
                  error={!profileStore.validated.phone}
                  helperText={
                    !profileStore.validated.phone ? 'Incorrect phone' : ''
                  }
                  value={profileStore.profile.phone || ''}
                  onChange={profileStore.setPhone}
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
            {/* <Grid item xs={12} md={8}>
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
                  {props.countries.list.map((country) => {
                    return (
                      <MenuItem
                        key={country.idd.root}
                        value={country.name.common}
                      >
                        {`${country.flag} ${country.name.common}`}
                      </MenuItem>
                    );
                  })}
                </CustomTextField>
              </Box>
            </Grid> */}
            <Grid item xs={12} md={8}>
              <Box mb={4}>
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
            {/*<Grid item xs={12} md={4} className={classes.gridFlex}>
              <Box mb={2} ml={isMobile ? 0 : 2}>
                <Toggler
                  id="location-show"
                  title="Show On/Off"
                  checked={Boolean(profileStore.profile.display_location)}
                  onChange={(event) => {
                    profileStore.setShowLocation(event.target.checked);
                  }}
                />
              </Box>
                </Grid>*/}
            {/*<Grid item xs={12}>
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
                </Grid>*/}

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
              <Box
                mb={2}
                style={{
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  gap: '5px',
                  alignItems: 'center',
                }}
                onClick={toggleModal}
              >
                <SettingsIcon style={{ fontSize: 'medium' }} />
                MANAGE ACCOUNT
              </Box>
            </Grid>

            {modal && (
              <Grid
                item
                xs={12}
                style={{ backgroundColor: '#f2f2eb', borderRadius: '5px' }}
              >
                <Box mb={2} mt={2} mx={3}>
                  <RemoveAccount
                    onClick={toggleRemoveAccount}
                    dialog={{
                      opened: removeAccountDialog,
                      onClose: toggleRemoveAccount.bind(this),
                      onSubmit: handleSubmitRemoveAccount.bind(this),
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'right' }}>
                    <div
                      style={{
                        cursor: 'pointer',
                      }}
                    >
                      <p onClick={toggleModal} style={{ fontSize: '15px' }}>
                        Close
                      </p>
                    </div>
                  </div>
                </Box>
              </Grid>
            )}
          </Grid>
          <ProfileSociail />
        </Grid>
      </Box>
    );
  }),
);

export default MyProfile;
