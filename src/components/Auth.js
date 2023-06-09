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
import firebase, { app } from 'firebase';
import Image from 'next/image';
import { useDebounce } from 'usehooks-ts';
import http from '../api/axiosApi';
import { PATH_URL_PROFILE_CHECK_USERNAME } from '../constants/API';
import { Chip } from '@mui/material';
import { BiCheck } from 'react-icons/bi';
import { MdCancel } from 'react-icons/md';
import { TailSpin } from 'react-loader-spinner';
import ReCAPTCHA from 'react-google-recaptcha';
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

  const auth = firebase.auth();

  const signInWithApple = async () => {
    const provider = new firebase.auth.OAuthProvider('apple.com');
    const result = await auth.signInWithPopup(provider);

    console.log(result.user); // logged-in Apple user
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
            onClick={signInWithApple}
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
  const [loading, setLoading] = useState('IDLE');
  const recaptchaRef = React.createRef();
  const handleChangeBirthday = (data) => {
    storeProfile.setBirthday(data);
  };

  // Fetch API (optional)
  useEffect(() => {
    if (debouncedValue !== '') {
      try {
        setLoading('PENDING');
        http
          .post(PATH_URL_PROFILE_CHECK_USERNAME, {
            username: debouncedValue,
            first_name: storeProfile.profile.name,
            last_name: storeProfile.profile.last_name,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data) {
              setLoading('FULFILLED');
              setAvail(res?.data?.availableUsernames);
            }
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, [debouncedValue]);

  console.log(loading);
  const handleValidateInput = (event) => {
    const regex = /^[a-zA-Z0-9_]*$/; // regex to only allow letters, numbers, and underscores
    const value = event.target.value;

    if (regex.test(value)) {
      storeProfile.setUserName(value);
    }
  };

  function CommonKeyPressIsAlpha(e) {
    e = e || event;
    var keypressed = String.fromCharCode(e.keyCode || e.which);
    var matched = /[a-zA-Z0-9~\-_.]/i.test(keypressed);
    document.getElementById('report').innerHTML = matched
      ? ''
      : 'Invalid character [<b>' +
        (keypressed || 'unknown') +
        "</b>]. Valid input here: 'a-z' and/or 'A-Z'";
    return matched;
  }

  const onReCAPTCHAChange = (captchaCode) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captchaCode) {
      return;
    }
    // Else reCAPTCHA was executed successfully so proceed with the
    // alert
    alert(`Hey, ${email}`);
    // Reset the reCAPTCHA so that it can be executed again if user
    // submits another email.
  };

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
          // onKeyPress={(e) => CommonKeyPressIsAlpha(e)}
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
          style={{ postion: 'relative' }}
          id="username"
          fullWidth
          error={!storeProfile.validated.username}
          label="Username"
          helperText={
            !storeProfile.validated.username ? 'Incorrect username' : ''
          }
          value={storeProfile.profile.username}
          onChange={handleValidateInput}
          onKeyPress={(e) => CommonKeyPressIsAlpha(e)}
        />
        <span
          id="report"
          style={{ color: '#C81C2E', fontSize: 10, marginTop: 2 }}
        ></span>
        {loading === 'PENDING' && (
          <div
            style={{
              position: 'absolute',
              right: '22%',
              fontSize: '20',
              color: '#ED4337',
              top: '99%',
            }}
          >
            <TailSpin height="25" width="25" radius="9" />
          </div>
        )}
        {avail?.length > 0 && (
          <MdCancel
            style={{
              position: 'absolute',
              right: '22%',
              fontSize: '20',
              color: '#ED4337',
              marginTop: 20,
            }}
          />
        )}
        {avail === undefined && (
          <BiCheck
            style={{
              position: 'absolute',
              right: '22%',
              marginTop: 20,
              fontSize: '20',
              color: '#4BB543',
            }}
          />
        )}

        {/*  */}

        <Box>
          {avail?.length > 0 && (
            <p style={{ color: '#C81C2E', fontSize: 10, marginTop: 2 }}>
              {' '}
              Username already exist.
            </p>
          )}
        </Box>
        <Box>
          {avail?.length > 0 &&
            avail.map((name, index) => {
              return <Chip label={name} key={index} />;
            })}
        </Box>
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
      <Box mb={4}>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LfHGkglAAAAAAKWgo5SqZQGLNAJgnXqsDnYVCkP"
          onChange={onReCAPTCHAChange}
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
