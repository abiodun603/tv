import React from 'react';
import { inject, observer } from 'mobx-react';
import 'date-fns';
import NoSsr from '@material-ui/core/NoSsr';
import { Container, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
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

const Box = styled('div')(
  compose(display, flexbox, spacing, palette, typography),
);

@inject('auth', 'profile')
@observer
class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeBirthday = this.handleChangeBirthday.bind(this);
  }
  authSocial(type) {
    let store = this.props.auth;
    store.signInFirebaseSocial(type);
  }

  handleChangeBirthday(data) {
    const { auth: storeAuth } = this.props;

    const storeProfile = storeAuth.profileStore;

    storeProfile.setBirthday(data);
  }

  render() {
    const { auth: storeAuth, theme } = this.props;
    const storeProfile = storeAuth.profileStore;

    return (
      <NoSsr>
        <Container maxWidth="sm">
          <div>
            <Box
              display="flex"
              justifyContent="center"
              color={theme.palette.grey.default}
            >
              {storeAuth.type === TYPE_CREATE_PROFILE
                ? 'create profile'
                : 'Welcome back to'}
            </Box>
            <Box display="flex" justifyContent="center" mt={2}>
              <Logo height={55} />
            </Box>
          </div>
        </Container>
      </NoSsr>
    );
  }
}

export default withTheme(Auth);
