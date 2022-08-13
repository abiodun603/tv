import React from 'react';
import { inject, observer } from 'mobx-react';
import { Container, Grid, Avatar } from '@material-ui/core';
import styled, { withTheme } from 'styled-components';
import {
  compose,
  flexbox,
  palette,
  spacing,
  typography,
  display,
} from '@material-ui/system';

import style from '../../styles/auth.module.css';
import {
  AUTH_EMAIL,
  AUTH_PHONE,
  AUTH_PHONE_CODE_SEND,
  FACEBOOK,
  GOOGLE,
  TWITTER,
  TYPE_CREATE_PROFILE,
} from '../constants/auth';
import { TabsCustom, TabCustom } from './widgets/Tabs';
import Logo from './widgets/Logo';
import { CustomDatePicker, CustomTextField } from './widgets/Field';

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
`;

const Box = styled('div')(
  compose(display, flexbox, spacing, palette, typography),
);

const Separator = styled.div`
  position: relative;
  &:before {
    content: '';
    position: absolute;
    border-top: ${(props) => `1px solid ${props.theme.palette.grey.grey10}`};
    width: 65px;
    top: 40%;
    right: ${(props) => `${props.theme.spacing() * 4}px`};
  }
  &:after {
    content: '';
    position: absolute;
    border-top: ${(props) => `1px solid ${props.theme.palette.grey.grey10}`};
    width: 65px;
    top: 40%;
    left: ${(props) => `${props.theme.spacing() * 4}px`};
  }
  ${palette}
`;

const SignInForm = observer(({ storeAuth, theme }) => {
  const storeProfile = storeAuth.profileStore;
  const authSocial = (type) => {
    storeAuth.signInFirebaseSocial(type);
  };

  return (
    <>
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
            onClick={() => authSocial(FACEBOOK)}
            src="/icon/ic_fb.svg"
          />
        </Grid>
        <Grid item>
          <Avatar
            variant="square"
            onClick={() => authSocial(TWITTER)}
            src="/icon/ic_twitter.svg"
          />
        </Grid>
        <Grid item>
          <Avatar variant="square" src="/icon/ic_ig.svg" />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" mt={2} mb={4}>
        <Separator color={theme.palette.grey.default}>or</Separator>
      </Box>
      <TabsCustom
        value={storeAuth.typeAuth}
        onChange={storeAuth.setTypeAuth}
        centered
      >
        <TabCustom label="Email" />
        <TabCustom label="Phone" />
      </TabsCustom>
      <Box display="flex" justifyContent="center" flexDirection="column" m={4}>
        <Box mb={2}>
          <CustomTextField
            id="email"
            fullWidth
            error={!storeProfile.validated.email}
            label="Email"
            helperText={
              !storeProfile.validated.username ? 'Incorrect username' : ''
            }
            value={storeProfile.profile.username}
            onChange={(event) => {
              storeProfile.setUserName(event.target.value);
            }}
          />
        </Box>
        <CustomTextField
          id="password"
          fullWidth
          error={!storeProfile.validated.email}
          label="Password"
          helperText={
            !storeProfile.validated.username ? 'Incorrect username' : ''
          }
          value={storeProfile.profile.username}
          onChange={(event) => {
            storeProfile.setUserName(event.target.value);
          }}
        />
      </Box>
    </>
  );
});

const AccountCreationForm = observer(({ storeAuth }) => {
  const storeProfile = storeAuth.profileStore;
  const handleChangeBirthday = (data) => {
    storeProfile.setBirthday(data);
  };

  return (
    <Box display="flex" justifyContent="center" flexDirection="column" m={4}>
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
      </Box>
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
    </Box>
  );
});

@inject('auth', 'profile')
@observer
class Auth extends React.Component {
  render() {
    const { auth: storeAuth, theme } = this.props;

    return (
      <AuthContainer>
        <Container maxWidth="xs">
          <Box
            display="flex"
            justifyContent="center"
            color={theme.palette.grey.grey60}
            mt={5}
          >
            {storeAuth.type === TYPE_CREATE_PROFILE
              ? 'create profile'
              : 'Welcome back to'}
          </Box>
          <Box display="flex" justifyContent="center" mt={2} mb={4}>
            <Logo height={68} />
          </Box>
          {storeAuth.type !== TYPE_CREATE_PROFILE ? (
            <AccountCreationForm storeAuth={storeAuth} />
          ) : (
            <SignInForm storeAuth={storeAuth} theme={theme} />
          )}
        </Container>
      </AuthContainer>
    );
  }
}

export default withTheme(Auth);
