import React, { useEffect } from 'react';
import { autorun } from 'mobx';
import { inject, observer } from 'mobx-react';
import Head from 'next/head';
import { Container, Row, Spinner } from 'react-bootstrap';
import { STATUS_LOADING, STATUS_NO_AUTH } from '../constants/auth';

import Auth from './Auth';
import Footer from './widgets/footer';
import { NavBar } from './widgets/navbar';

const AuthLayout = inject(
  'auth',
  'toast',
  'search',
)(
  observer((props) => {
    const { auth: storeAuth, search, children } = props;

    useEffect(() => {
      storeAuth.startListener();

      return autorun(() => {
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

        props.search.getSearchHistory();
      });
    }, []);

    return (
      <>
        <Head>
          <title>IsabiTV</title>
        </Head>
        <div className="page theme theme_font_default theme_color_default theme_space_default theme_size_default">
          <div id="recaptcha-container" />
          {storeAuth.status === STATUS_LOADING ? (
            <Container fluid>
              <Row className="justify-content-center vh-100 align-items-center">
                <Spinner
                  animation="grow"
                  variant="success"
                  className="mx-auto my-auto"
                />
              </Row>
            </Container>
          ) : storeAuth.status === STATUS_NO_AUTH ? (
            <Auth />
          ) : (
            <>
              <NavBar searchHistory={search.searchHistory} />
              {children}
              <Footer />
            </>
          )}
        </div>
      </>
    );
  }),
);

export default AuthLayout;
