import React, { useEffect } from 'react';
import { autorun } from 'mobx';
import { inject, observer } from 'mobx-react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';
import { Container, Row, Spinner } from 'react-bootstrap';
import { STATUS_LOADING, STATUS_NO_AUTH, STATUS_AUTH } from '../constants/auth';

import Footer from './widgets/footer';
import { Bar, NavBar } from './widgets/navbar';

const AuthLayout = inject(
  'auth',
  'toast',
  'search',
)(
  observer((props) => {
    const { auth: storeAuth, search, children } = props;
    const router = useRouter();

    useEffect(() => {
      storeAuth.startListener();
      autorun(() => {
        let state = props.toast.state;

        if (state.visible) {
          props.snackbar(state.message, {
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center',
            },
            variant: state.type,
          });
        }
      });
    }, [props, storeAuth]);

    useEffect(() => {
      if (storeAuth.status === STATUS_AUTH) {
        if (router.pathname === '/auth' || router.pathname === '/') {
          Router.push('/home');
        }
        props.search.getSearchHistory();
      }

      if (
        storeAuth.status === STATUS_NO_AUTH &&
        router.pathname !== '/auth' &&
        router.pathname !== '/'
      ) {
        Router.replace('/auth');
      }
    }, [props.search, router.pathname, storeAuth.status]);

    if (
      storeAuth.status === STATUS_AUTH &&
      (router.pathname === '/auth' || router.pathname === '/')
    ) {
      return (
        <Container fluid>
          <Row className="justify-content-center vh-100 align-items-center">
            <Spinner
              animation="grow"
              variant="success"
              className="mx-auto my-auto"
            />
          </Row>
        </Container>
      );
    }

    if (
      storeAuth.status === STATUS_NO_AUTH &&
      router.pathname !== '/auth' &&
      router.pathname !== '/'
    ) {
      return (
        <Container fluid>
          <Row className="justify-content-center vh-100 align-items-center">
            <Spinner
              animation="grow"
              variant="success"
              className="mx-auto my-auto"
            />
          </Row>
        </Container>
      );
    }
    return (
      <div>
        <Head>
          <title>iSabiTV</title>
        </Head>
        <div className="page theme theme_font_default theme_color_default theme_space_default theme_size_default">
          <div id="recaptcha-container" />
          {/* {storeAuth.status === STATUS_LOADING ? (
            <Container fluid>
              <Row className="justify-content-center vh-100 align-items-center">
                <Spinner
                  animation="grow"
                  variant="success"
                  className="mx-auto my-auto"
                />
              </Row>
            </Container>
          ) :  */}
          {storeAuth.status === STATUS_NO_AUTH ? (
            <div>{children}</div>
          ) : (
            <div>
              <NavBar searchHistory={search.searchHistory} />
              {children}
              <Footer />
            </div>
          )}
        </div>
      </div>
    );
  }),
);

export default AuthLayout;
