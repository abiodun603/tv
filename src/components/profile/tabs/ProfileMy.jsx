import React from 'react';
import { inject, observer } from 'mobx-react';
import { Col, Row, Form, Spinner } from 'react-bootstrap';
import { MenuItem } from '@material-ui/core';

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

@inject('auth', 'languages', 'countries')
@observer
class ProfileMy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profileStore: this.props.auth.profileStore,
      deleteAllUploadsDialog: false,
      removeAccountDialog: false,
      clearHistoryDialog: false,
      logoutDialog: false,
      userName: '',
      name: '',
      lastName: '',
    };

    this.handleSubmitRemoveUploads = this.handleSubmitRemoveUploads.bind(this);
    this.handleSubmitClearHistory = this.handleSubmitClearHistory.bind(this);
    this.handleSubmitRemoveAccount = this.handleSubmitRemoveAccount.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    const {
      username: userName,
      name: name,
      last_name: lastName,
    } = this.state.profileStore.profile;

    this.props.languages.load();
    this.props.countries.load();

    this.setState({ name, lastName, userName });

    this.toggleDeleteAllUploadsDialog =
      this.toggleDeleteAllUploadsDialog.bind(this);
    this.toggleRemoveAccount = this.toggleRemoveAccount.bind(this);
    this.toggleClearHistoryDialog = this.toggleClearHistoryDialog.bind(this);
    this.toggleLogoutDialog = this.toggleLogoutDialog.bind(this);
  }

  toggleDeleteAllUploadsDialog() {
    this.setState({
      deleteAllUploadsDialog: !this.state.deleteAllUploadsDialog,
    });
  }

  toggleRemoveAccount() {
    this.setState({
      removeAccountDialog: !this.state.removeAccountDialog,
    });
  }

  toggleClearHistoryDialog() {
    this.setState({
      clearHistoryDialog: !this.state.clearHistoryDialog,
    });
  }

  toggleLogoutDialog() {
    this.setState({
      logoutDialog: !this.state.logoutDialog,
    });
  }

  handleSubmitRemoveUploads() {
    const {
      profileStore: { removeUploads },
    } = this.props.auth;

    this.toggleDeleteAllUploadsDialog();

    removeUploads();
  }

  handleSubmitRemoveAccount() {
    const {
      profileStore: { removeAccount },
      signOut,
    } = this.props.auth;

    this.toggleDeleteAllUploadsDialog();

    removeAccount();
    signOut();
  }

  handleSubmitClearHistory() {
    const {
      profileStore: { clearHistory },
    } = this.props.auth;

    this.toggleClearHistoryDialog();

    clearHistory();
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeLastName(event) {
    this.setState({ lastName: event.target.value });
  }

  handleChangeUserName(event) {
    this.setState({ userName: event.target.value });
  }

  handleSave() {
    const { profileStore, name, lastName, userName } = this.state;

    profileStore.setName(name);
    profileStore.setLastName(lastName);
    profileStore.setUserName(userName);

    profileStore.updateUser();
  }

  render() {
    const { profileStore, signOut } = this.props.auth;
    const { name, lastName, userName } = this.state;

    const isDataValid = Boolean(
      name && lastName && userName && profileStore.profile.birthday
    );

    const baseTitle = (text) => (
      <h1 className="font-weight-bold text text_typography_headline-xl">
        {text}
      </h1>
    );

    return (
      <div className="profile-page__body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          {baseTitle('My Profile')}
          <div className="text-right">
            {profileStore.loading ? (
              <Spinner animation="border" variant="success" />
            ) : (
              <ButtonContainer
                onClick={this.handleSave}
                disabled={!isDataValid}
              >
                Save Changes
              </ButtonContainer>
            )}
          </div>
        </div>

        <Form noValidate>
          <Row className="mb-3">
            <Col className="profile-page__left-side">
              <Row className="mb-4">
                <Col>
                  <CustomTextField
                    id="name"
                    fullWidth
                    error={!name}
                    label="Name"
                    className="mt-3"
                    helperText={!name ? 'Incorrect name' : ''}
                    value={name || ''}
                    onChange={this.handleChangeName}
                  />
                </Col>
                <Col>
                  <CustomTextField
                    id="last_name"
                    fullWidth
                    error={!lastName}
                    label="Last Name"
                    className="mt-3"
                    helperText={!lastName ? 'Incorrect last name' : ''}
                    value={lastName || ''}
                    onChange={this.handleChangeLastName}
                  />
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <CustomTextField
                    id="username"
                    fullWidth
                    error={!userName}
                    label="Username"
                    helperText={!userName ? 'Incorrect username' : ''}
                    value={userName || ''}
                    onChange={this.handleChangeUserName}
                  />
                </Col>
              </Row>

              <Row className="mb-4 align-items-end">
                <Col md={8}>
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
                </Col>
                <Col>
                  <Toggler
                    id="email-show"
                    title="Show On/Off"
                    checked={Boolean(profileStore.profile.display_email)}
                    onChange={(event) => {
                      profileStore.setShowEmail(event.target.checked);
                    }}
                  />
                </Col>
              </Row>

              <Row className="mb-4 align-items-end">
                <Col md={8}>
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
                </Col>
                <Col>
                  <Toggler
                    id="phone-show"
                    title="Show On/Off"
                    disabled={!profileStore.profile.phone}
                    checked={Boolean(
                      profileStore.profile.display_phone &&
                        profileStore.profile.phone
                    )}
                    onChange={(event) => {
                      profileStore.setShowPhone(event.target.checked);
                    }}
                  />
                </Col>
              </Row>

              <Row className="mb-4">
                <Col>
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
                </Col>
              </Row>

              <Row className="mb-4 align-items-end">
                <Col>
                  <CustomTextField
                    id="select-country"
                    select
                    fullWidth
                    label="Country"
                    value={profileStore.profile.country}
                    onChange={(event) =>
                      profileStore.setCountry(event.target.value)
                    }
                  >
                    {this.props.countries.list.map((country) => (
                      <MenuItem key={country.id} value={country.shortcode}>
                        {country.title}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                </Col>
                <Col>
                  <CustomTextField
                    id="city"
                    fullWidth
                    label="City"
                    value={profileStore.profile.city || ''}
                    onChange={(event) => {
                      profileStore.setCity(event.target.value);
                    }}
                  />
                </Col>
                <Col>
                  <Toggler
                    id="location-show"
                    title="Show On/Off"
                    checked={Boolean(profileStore.profile.display_location)}
                    onChange={(event) => {
                      profileStore.setShowLocation(event.target.checked);
                    }}
                  />
                </Col>
              </Row>
            </Col>

            <Col>
              <Row>
                <Col md={8}>
                  <h2 className="font-weight-bold text text_typography_subheader-xl mb-3">
                    Social Media
                  </h2>
                </Col>
                <Col>
                  <Toggler
                    id="social-show"
                    title="Show On/Off"
                    checked={Boolean(profileStore.profile.display_social)}
                    onChange={(event) => {
                      profileStore.setShowSocial(event.target.checked);
                    }}
                  />
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <CustomTextField
                    id="instagram"
                    fullWidth
                    label="Instagram"
                    value={profileStore.profile.instagram || ''}
                    onChange={(event) => {
                      profileStore.setInstagram(event.target.value);
                    }}
                  />
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <CustomTextField
                    id="facebook"
                    fullWidth
                    label="Facebook"
                    value={profileStore.profile.facebook || ''}
                    onChange={(event) => {
                      profileStore.setFacebook(event.target.value);
                    }}
                  />
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <CustomTextField
                    id="twitter"
                    fullWidth
                    label="Twitter"
                    value={profileStore.profile.twitter || ''}
                    onChange={(event) => {
                      profileStore.setTwitter(event.target.value);
                    }}
                  />
                </Col>
              </Row>
              <Row className="mb-4" />
              <Row className="mb-4">
                <Col>
                  {profileStore.profile.email ? <ChangePassword /> : <div />}
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <ButtonText
                    onClick={this.toggleLogoutDialog}
                    startIcon={
                      <span className="account-list__logout-icon icon icon_name_logout" />
                    }
                  >
                    <span className="font-weight-bold text text_view_secondary text-uppercase">
                      Logout
                    </span>
                  </ButtonText>
                  <ConfirmDialog
                    opened={this.state.logoutDialog}
                    onClose={this.toggleLogoutDialog}
                    onSubmit={signOut}
                  />
                </Col>
              </Row>
              <RemoveAccount
                onClick={this.toggleRemoveAccount}
                dialog={{
                  opened: this.state.removeAccountDialog,
                  onClose: this.toggleRemoveAccount.bind(this),
                  onSubmit: this.handleSubmitRemoveAccount.bind(this),
                }}
              />
            </Col>
          </Row>
          <Row className="mb-4 mt-4">
            <Col>{baseTitle('Settings')}</Col>
            <Col>{baseTitle('Watch History')}</Col>
          </Row>
          <Row className="mb-3">
            <Col className="profile-page__left-side">
              <Row className="mb-4">
                <Col>
                  <MultiSelect
                    loading={this.props.languages.loading}
                    value={profileStore.profile.languages || []}
                    handleChange={(event) =>
                      profileStore.setLanguages(event.target.value)
                    }
                    options={this.props.languages.items.map((item) => ({
                      key: item.id,
                      value: item.id,
                      label: item.name,
                    }))}
                  />
                </Col>
              </Row>
            </Col>

            <Col>
              <Row className="mb-3">
                <Col>
                  <Toggler
                    id="track_watch"
                    title="Do not track my watch history"
                    checked={Boolean(
                      profileStore.profile.watch_history_enabled
                    )}
                    onChange={(event) => {
                      profileStore.setDontTrackWatch(event.target.checked);
                    }}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Toggler
                    id="track_search"
                    title="Do not track my search history"
                    checked={Boolean(
                      profileStore.profile.search_history_enabled
                    )}
                    onChange={(event) => {
                      profileStore.setDontTrackSearch(event.target.checked);
                    }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <ButtonText onClick={this.toggleDeleteAllUploadsDialog}>
                <span className="font-weight-bold text-danger text-uppercase">
                  <u>Delete All Uploads</u>
                </span>
              </ButtonText>
              <ConfirmDialog
                opened={Boolean(this.state.deleteAllUploadsDialog)}
                onClose={this.toggleDeleteAllUploadsDialog}
                onSubmit={this.handleSubmitRemoveUploads}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <ButtonText onClick={this.toggleClearHistoryDialog}>
                <span className="font-weight-bold text-danger text-uppercase">
                  <u>Clear History</u>
                </span>
              </ButtonText>
              <ConfirmDialog
                opened={Boolean(this.state.clearHistoryDialog)}
                onClose={this.toggleClearHistoryDialog}
                onSubmit={this.handleSubmitClearHistory}
              />
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default ProfileMy;
