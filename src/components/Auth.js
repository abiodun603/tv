import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Container, Grid, Avatar, NoSsr, useTheme } from '@material-ui/core';
import styled from 'styled-components';
import {
  compose,
  flexbox,
  palette,
  spacing,
  typography,
  display,
} from '@material-ui/system';

import {
  AUTH_EMAIL,
  AUTH_PHONE,
  FACEBOOK,
  GOOGLE,
  TWITTER,
  TYPE_CREATE_PROFILE,
} from '../constants/auth';
import { TabsCustom, TabCustom } from './widgets/Tabs';
import Logo from './widgets/Logo';
import {
  CustomDatePicker,
  CustomTextField,
  CustomPhoneField,
} from './widgets/Field';
import { TextButton } from './ui/buttons/TextButton';
import { Spinner } from './ui/spiner';
import { app } from 'firebase';
import Image from 'next/image';
import { useDebounce } from 'usehooks-ts';
import http from '../api/axiosApi';
import { PATH_URL_PROFILE_CHECK_USERNAME } from '../constants/API';
import { Chip } from '@mui/material';

const AuthContainer = styled.div`
  width: 612px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
  margin: 0 auto;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  @media only screen and (max-width: 767px) {
    width: 99%;
    height: 100vh;
  }
`;

const Box = styled('div')(
  compose(display, flexbox, spacing, palette, typography),
);

const Separator = styled.div`
  position: relative;
  &:before {
    content: '';
    position: absolute;
    border-top: ${(props) => `1px solid ${props.color}`};
    width: 65px;
    top: 40%;
    right: ${(props) => `${props.spacing}px`};
  }
  &:after {
    content: '';
    position: absolute;
    border-top: ${(props) => `1px solid ${props.color}`};
    width: 65px;
    top: 40%;
    left: ${(props) => `${props.spacing}px`};
  }
  ${palette}
`;

const SignInForm = observer(({ storeAuth, theme }) => {
  const authSocial = (type) => {
    storeAuth.signInFirebaseSocial(type);
  };

  return (
    <div>
      <Grid
        container
        spacing={4}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Avatar
            variant="square"
            onClick={() => authSocial(GOOGLE)}
            src="/icon/ic_google.svg"
          />
        </Grid>
        
        <Grid item>
          <Avatar
            variant="square"
            src="/icon/apple.png"
          />
        </Grid>
        {/*<Grid item>
          <Avatar
            variant="square"
            className="disabled"
            src="/icon/ic_twitter.svg"
          />
        </Grid>
        <Grid item>
          <Avatar
            variant="square"
            className="disabled"
            src="/icon/ic_ig.svg"
            disabled
          />
          </Grid>*/}
      </Grid>
      <Box display="flex" justifyContent="center" mt={2} mb={4}>
        <Separator color={theme.palette.grey.grey10} spacing={theme.spacing(4)}>
          or
        </Separator>
      </Box>
      <TabsCustom
        value={storeAuth.typeAuth}
        onChange={storeAuth.setTypeAuth}
        centered
      >
        <TabCustom label="Email" />
        {/* <TabCustom label="Phone" /> */}
      </TabsCustom>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        mx={4}
        mt={4}
        mb={3}
      >
        <Box
          mb={2}
          display={storeAuth.typeAuth === AUTH_PHONE ? 'none' : 'block'}
        >
          <CustomTextField
            id="email"
            fullWidth
            error={!storeAuth.validated.email}
            label="Email"
            type="email"
            helperText={
              !storeAuth.validated.email ? 'Your e-mail is wrong' : ''
            }
            value={storeAuth.email}
            onChange={(event) => {
              storeAuth.setEmail(event.target.value);
            }}
          />
        </Box>
        <Box
          mb={2}
          display={storeAuth.typeAuth === AUTH_PHONE ? 'none' : 'block'}
        >
          <CustomTextField
            id="password"
            fullWidth
            error={!storeAuth.validated.password}
            label="Password"
            type="password"
            helperText={
              !storeAuth.validated.password
                ? storeAuth.isSignIn
                  ? 'Your password is wrong.'
                  : 'Password must be more than 6 characters including at least one number and one character.'
                : ''
            }
            value={storeAuth.password}
            onChange={(event) => {
              storeAuth.setPassword(event.target.value);
            }}
          />
        </Box>
        {/*<Box
          mb={2}
          display={storeAuth.typeAuth === AUTH_EMAIL ? 'none' : 'block'}
        >
          <CustomPhoneField
            id="phone"
            fullWidth
            error={!storeAuth.validated.phone}
            label="Phone"
            type="phone"
            defaultCountry={'us'}
            helperText={
              !storeAuth.validated.phone ? 'Your phone number is wrong' : ''
            }
            value={storeAuth.phone}
            onChange={(value) => {
              storeAuth.setPhone(value);
            }}
          />
        </Box>
        <Box mb={2} display={storeAuth.isSendCode ? 'none' : 'block'}>
          <CustomTextField
            id="code"
            fullWidth
            error={!storeAuth.validated.code}
            type="number"
            label="Code"
            helperText={!storeAuth.validated.code ? 'Your code is wrong' : ''}
            value={storeAuth.code}
            onChange={(event) => {
              storeAuth.setCode(event.target.value);
            }}
          />
          </Box>*/}
      </Box>
      {storeAuth.loading ? (
        <Box display="flex" justifyContent="center" mb={5}>
          <Spinner color="primary" />
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="row"
          mx={4}
          mb={5}
        >
          {!storeAuth.isForgotPassword && (
            <TextButton onClick={storeAuth.forgotPassword}>
              Forgot password?
            </TextButton>
          )}
          {!storeAuth.isSendCode && (
            <TextButton onClick={storeAuth.sendCodePhone}>
              {storeAuth.second <= 0
                ? 'Resend code'
                : `Time left: ${storeAuth.second} s`}
            </TextButton>
          )}
          {storeAuth.isForgotPassword && storeAuth.isSendCode && <div />}
          <TextButton onClick={storeAuth.nextStep} imageSrc="icon/ic_arrow.svg">
            {storeAuth.nameButtonNext}
          </TextButton>
        </Box>
      )}
      <Box
        display={storeAuth.typeAuth === AUTH_PHONE ? 'none' : 'flex'}
        justifyContent="center"
        mb={7}
      >
        <TextButton
          onClick={storeAuth.changeSignIn}
          helperText={
            storeAuth.isSignIn ? 'New to iSabiTv?' : 'Have an account?'
          }
        >
          {storeAuth.isSignIn ? 'Sign Up' : 'Sign In'}
        </TextButton>
      </Box>
    </div>
  );
});

const AccountCreationForm = observer(({ storeAuth }) => {
  const storeProfile = storeAuth.profileStore;
  const debouncedValue = useDebounce(storeProfile.profile.username, 3000);
  const [avail, setAvail] = useState([]);
  const handleChangeBirthday = (data) => {
    storeProfile.setBirthday(data);
  };

  // Fetch API (optional)
  useEffect(() => {
    if (debouncedValue !== '') {
      http
        .post(PATH_URL_PROFILE_CHECK_USERNAME, {
          username: debouncedValue,
          first_name: storeProfile.profile.name,
          last_name: storeProfile.profile.last_name,
        })
        .then((res) => {
          if (res.data) {
            console.log(res?.data);
            setAvail(res?.data?.availableUsernames);
          }
        });
    }
  }, [debouncedValue]);

  console.log(avail);

  return (
    <Box display="flex" justifyContent="center" flexDirection="column" m={4}>
      <Box mb={2}>
        <CustomTextField
          id="name"
          fullWidth
          error={!storeProfile.validated.name}
          label="First Name"
          className="mt-3"
          helperText={!storeProfile.validated.name ? 'Incorrect name' : ''}
          value={storeProfile.profile.name}
          onChange={(event) => {
            storeProfile.setName(event.target.value);
          }}
        />
      </Box>
      <Box mb={2}>
        <CustomTextField
          id="last_name"
          fullWidth
          error={!storeProfile.validated.last_name}
          label="Last Name"
          className="mt-3"
          helperText={
            !storeProfile.validated.last_name ? 'Incorrect last name' : ''
          }
          value={storeProfile.profile.last_name}
          onChange={(event) => {
            storeProfile.setLastName(event.target.value);
          }}
        />
      </Box>
      <Box mb={2}>
        <CustomTextField
          id="username"
          fullWidth
          error={!storeProfile.validated.username}
          label="Username"
          helperText={
            !storeProfile.validated.username ? 'Incorrect username' : ''
          }
          value={storeProfile.profile.username}
          onChange={(event) => {
            storeProfile.setUserName(event.target.value);
          }}
        />
        {avail?.length > 0 &&
          avail.map((name, index) => {
            return <Chip label={name} key={index} />;
          })}
      </Box>
      <Box mb={4}>
        <CustomDatePicker
          id="birthday"
          label="Date of birth"
          format="yyyy-dd-MM"
          error={!storeProfile.validated.birthday}
          helperText={!storeProfile.validated.birthday ? 'Incorrect Date' : ''}
          value={storeProfile.profile.birthday}
          onChange={handleChangeBirthday}
        />
      </Box>
      {storeProfile.loading ? (
        <Box display="flex" justifyContent="center" mb={4}>
          <Spinner color="primary" />
        </Box>
      ) : (
        <>
          <Box display="flex" justifyContent="end" mb={4}>
            <TextButton
              onClick={storeProfile.createUser}
              imageSrc="icon/ic_arrow.svg"
            >
              Next
            </TextButton>
          </Box>
          <Box display="flex" justifyContent="center" mb={2}>
            <TextButton onClick={() => storeAuth.signOut()}>Logout</TextButton>
          </Box>
        </>
      )}
    </Box>
  );
});

const Auth = inject(
  'auth',
  'profile',
)(
  observer((props) => {
    const theme = useTheme();
    const { auth: storeAuth } = props;

    return (
      <NoSsr>
        <AuthContainer>
          <Container maxWidth="xs">
            <Box
              display="flex"
              justifyContent="center"
              color={theme.palette.grey.grey60}
              mt={7}
            >
              {storeAuth.type === TYPE_CREATE_PROFILE
                ? 'create profile'
                : 'Welcome back to'}
            </Box>
            <Box display="flex" justifyContent="center" mt={2} mb={4}>
              <Logo height={68} />
            </Box>
            {storeAuth.type === TYPE_CREATE_PROFILE ? (
              <AccountCreationForm storeAuth={storeAuth} />
            ) : (
              <SignInForm storeAuth={storeAuth} theme={theme} />
            )}
          </Container>
        </AuthContainer>
      </NoSsr>
    );
  }),
);

export default Auth;
