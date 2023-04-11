'use client';
import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import classNames from 'classnames';
import { Spinner } from 'react-bootstrap';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { Country, City } from 'country-state-city';
import countries from 'get-countries-info';

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
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

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
)((props) => {
  const { profileStore, signOut } = props.auth;
  const [removeAccountDialog, setRemoveAccountDialog] = useState(false);
  const [logoutDialog, setLogoutDialog] = useState(false);
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:959px)');

  useEffect(() => {
    const {
      username: userName,
      name: name,
      last_name: lastName,
      country: selectedCountry,
      city: selectedCity
    } = profileStore.profile;

    props.languages.load();
    props.countries.load();

    setUserName(userName);
    setFirstName(name);
    setLastName(lastName);
    setSelectedCountry(selectedCountry)
    setSelectedCity(selectedCity)

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
    profileStore.setCountry(selectedCountry)
    profileStore.setCity(selectedCity)
    profileStore.updateUser();
  };

  const isDataValid = Boolean(
    firstName && lastName && userName && profileStore.profile.birthday,
  );

  const handleValidateInput = (event) => {
    const regex = /^[a-zA-Z0-9_]*$/; // regex to only allow letters, numbers, and underscores
    const value = event.target.value;

    if (regex.test(value)) {
      setUserName(value);
    }
  };

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleCountrySelect = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedCity('');
  };

  const handleCitySelect = (e) => {
    setSelectedCity(e.target.value);
  };

  const convertCountryToCode = countries({ name: selectedCountry });
  console.log(convertCountryToCode[0]);
  const getCode = convertCountryToCode[0].ISO.alpha2;

  const countryCities = City.getCitiesOfCountry(getCode);

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
              <label for="phone" className="profileCountryLabel">
                Phone Number
              </label>
              <PhoneInput
                className={'input-phone-number'}
                id="phone"
                defaultCountry="NG"
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
          <Grid item xs={12} md={8}>
            <Box mb={2} style={{ borderBottom: '1px solid #D3D3D3' }}>
              <div>
                <label htmlFor="country" className="profileCountryLabel">
                  Country
                </label>
                <select
                  className="profileCountryField"
                  value={selectedCountry || ''}
                  onChange={handleCountrySelect}
                >
                  {Country.getAllCountries().map((data) => {
                    return (
                      <option key={data.flag} value={data.name}>
                        {data.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box mb={4} style={{ borderBottom: '1px solid #D3D3D3' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label className="profileCountryLabel" htmlFor="city">
                  City
                </label>
                <select
                  id="city"
                  className="profileCountryField"
                  value={selectedCity || ''}
                  onChange={handleCitySelect}
                  disabled={!selectedCountry}
                >
                  <option value="">Select a city</option>
                  {countryCities.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
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
              <Box mb={2} mt={3} mx={3}>
                <div className="tempdelete" disabled>
                  <AccessTimeFilledIcon style={{ fontSize: 'medium' }} />
                  <p>TEMPORARILY DISABLE MY ACCOUNT</p>
                </div>
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
      </Grid>
    </Box>
  );
});

export default MyProfile;
