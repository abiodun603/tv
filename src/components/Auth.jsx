import React from 'react';
import { inject, observer } from 'mobx-react';
import 'date-fns';
import {
  Card,
  Container,
  Row,
  Form,
  Col,
  Image,
  Spinner,
} from 'react-bootstrap';

import style from '../../style/auth.module.css';
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
    const { auth: storeAuth } = this.props;

    const storeProfile = storeAuth.profileStore;

    return (
      <Container fluid id={style.auth_background}>
        <Row className={`justify-content-center vh-100 align-items-center`}>
          <Col md={6} xs={12} xl={4}>
            <Card className="text-center p-5">
              <Card.Title className="text-light-title">
                {storeAuth.type === TYPE_CREATE_PROFILE
                  ? 'create profile'
                  : 'Welcome back to'}
              </Card.Title>

              <div className="mx-auto mt-2">
                <Logo height={55} />
              </div>
              {storeAuth.type === TYPE_CREATE_PROFILE ? (
                <div>
                  <Card.Body>
                    <Form noValidate className="mt-4">
                      <CustomTextField
                        id="username"
                        fullWidth
                        error={!storeProfile.validated.username}
                        label="Username"
                        helperText={
                          !storeProfile.validated.username
                            ? 'Incorrect username'
                            : ''
                        }
                        value={storeProfile.profile.username}
                        onChange={(event) => {
                          storeProfile.setUserName(event.target.value);
                        }}
                      />
                      <CustomTextField
                        id="name"
                        fullWidth
                        error={!storeProfile.validated.name}
                        label="Name"
                        className="mt-3"
                        helperText={
                          !storeProfile.validated.name ? 'Incorrect name' : ''
                        }
                        value={storeProfile.profile.name}
                        onChange={(event) => {
                          storeProfile.setName(event.target.value);
                        }}
                      />
                      <CustomTextField
                        id="last_name"
                        fullWidth
                        error={!storeProfile.validated.last_name}
                        label="Last Name"
                        className="mt-3"
                        helperText={
                          !storeProfile.validated.last_name
                            ? 'Incorrect last name'
                            : ''
                        }
                        value={storeProfile.profile.last_name}
                        onChange={(event) => {
                          storeProfile.setLastName(event.target.value);
                        }}
                      />

                      <Row className="mt-4 mb-4">
                        <Col>
                          <CustomDatePicker
                            id="birthday"
                            label="Date of birth"
                            format="yyyy-dd-MM"
                            error={!storeProfile.validated.birthday}
                            helperText={
                              !storeProfile.validated.birthday
                                ? 'Incorrect Date'
                                : ''
                            }
                            value={storeProfile.profile.birthday}
                            onChange={this.handleChangeBirthday}
                          />
                        </Col>
                        <Col />
                      </Row>

                      {storeProfile.loading ? (
                        <Spinner
                          animation="border"
                          variant="success"
                          className="mt-4"
                        />
                      ) : (
                        <Form.Row className="mt-4">
                          <Col className="d-flex justify-content-end">
                            <button
                              type="button"
                              onClick={storeProfile.createUser}
                              className="button-text"
                            >
                              Next
                              <Image src="icon/ic_arrow.svg" />
                            </button>
                          </Col>
                        </Form.Row>
                      )}
                    </Form>
                  </Card.Body>
                  <Row noGutters className="mt-5 d-flex justify-content-center">
                    <button onClick={storeAuth.signOut} className="button-text">
                      Logout
                    </button>
                  </Row>
                </div>
              ) : (
                <div>
                  <Card.Body>
                    <Container fluid>
                      <Row
                        noGutters
                        className={`${style.auth_card_social} my-4`}
                      >
                        <Image
                          onClick={() => this.authSocial(GOOGLE)}
                          src="/icon/ic_google.svg"
                        />
                        <Image
                          onClick={() => this.authSocial(FACEBOOK)}
                          src="/icon/ic_fb.svg"
                        />
                        <Image
                          onClick={() => this.authSocial(TWITTER)}
                          src="/icon/ic_twitter.svg"
                        />
                        <Image src="/icon/ic_ig.svg" />
                      </Row>
                      <Row
                        noGutters
                        className={`text-light-second align-items-center`}
                      >
                        <hr className="col" />
                        <h6 className="m-0 px-4">or</h6>
                        <hr className="col" />
                      </Row>
                    </Container>

                    <TabsCustom
                      value={storeAuth.typeAuth}
                      onChange={storeAuth.setTypeAuth}
                      centered
                      className="mt-1"
                    >
                      <TabCustom label="Email" />
                      <TabCustom label="Phone" />
                    </TabsCustom>

                    <Form className="mt-4">
                      <Form.Group
                        controlId="formBasicEmail"
                        hidden={storeAuth.typeAuth === AUTH_PHONE}
                      >
                        <Form.Control
                          isInvalid={!storeAuth.validated.email}
                          className="border-top-0 border-right-0 border-left-0"
                          type="email"
                          onChange={(event) => {
                            storeAuth.setEmail(event.target.value);
                          }}
                          value={storeAuth.email}
                          placeholder="Enter email"
                        />
                        <Form.Control.Feedback type="invalid">
                          Your e-mail is wrong
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group
                        controlId="formBasicPassword"
                        hidden={storeAuth.typeAuth === AUTH_PHONE}
                      >
                        <Form.Control
                          isInvalid={!storeAuth.validated.password}
                          className="border-top-0 border-right-0 border-left-0"
                          type="password"
                          value={storeAuth.password}
                          onChange={(event) => {
                            storeAuth.setPassword(event.target.value);
                          }}
                          placeholder="Password"
                        />
                        <Form.Control.Feedback type="invalid">
                          Your password is wrong
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group
                        controlId="formBasicPhone"
                        className={
                          storeAuth.statusPhone !== AUTH_PHONE_CODE_SEND
                            ? 'my-5'
                            : ''
                        }
                        hidden={storeAuth.typeAuth === AUTH_EMAIL}
                      >
                        <Form.Control
                          isInvalid={!storeAuth.validated.phone}
                          className="border-top-0 border-right-0 border-left-0"
                          type="phone"
                          onChange={(event) => {
                            storeAuth.setPhone(event.target.value);
                          }}
                          value={storeAuth.phone}
                          placeholder="Enter phone"
                        />
                        <Form.Control.Feedback type="invalid">
                          Your phone is wrong
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group
                        controlId="formBasicCode"
                        hidden={storeAuth.isSendCode}
                      >
                        <Form.Control
                          isInvalid={!storeAuth.validated.code}
                          className="border-top-0 border-right-0 border-left-0"
                          type="text"
                          value={storeAuth.code}
                          onChange={(event) => {
                            storeAuth.setCode(event.target.value);
                          }}
                          placeholder="Code"
                        />
                        <Form.Control.Feedback type="invalid">
                          Your code is wrong
                        </Form.Control.Feedback>
                      </Form.Group>

                      {storeAuth.loading ? (
                        <Spinner
                          animation="border"
                          variant="success"
                          className="mt-4"
                        />
                      ) : (
                        <Form.Row className="mt-4">
                          <Col className="d-flex justify-content-start">
                            <button
                              type="button"
                              onClick={storeAuth.forgotPassword}
                              className="button-text mb-1"
                              hidden={storeAuth.isForgotPassword}
                            >
                              forgot password?
                            </button>
                            <button
                              type="button"
                              onClick={storeAuth.sendCodePhone}
                              className="button-text mb-1"
                              hidden={storeAuth.isSendCode}
                            >
                              {storeAuth.second <= 0
                                ? 'Resend code'
                                : `Time left: ${storeAuth.second} s`}
                            </button>
                          </Col>
                          <Col className="d-flex justify-content-end">
                            <button
                              type="button"
                              onClick={storeAuth.nextStep}
                              className="button-text"
                            >
                              {storeAuth.nameButtonNext}
                              <Image src="icon/ic_arrow.svg" />
                            </button>
                          </Col>
                        </Form.Row>
                      )}
                    </Form>
                  </Card.Body>
                  <Row noGutters className="mt-5 d-flex justify-content-center">
                    <h6
                      hidden={storeAuth.typeAuth === AUTH_PHONE}
                      className="text-select mr-1 mt-2"
                    >
                      {storeAuth.isSignIn
                        ? 'New to iSabiTv?'
                        : 'Have an account?'}
                    </h6>
                    <button
                      hidden={storeAuth.typeAuth === AUTH_PHONE}
                      onClick={storeAuth.changeSignIn}
                      className="button-text"
                    >
                      {storeAuth.isSignIn ? 'Sign Up' : 'Sign In'}
                    </button>
                  </Row>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Auth;
