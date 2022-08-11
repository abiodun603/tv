import React, { useEffect } from 'react';

import { autorun } from 'mobx';
import { inject, observer } from 'mobx-react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { useSnackbar } from 'notistack';

import { Container, Row, Spinner } from 'react-bootstrap';

import { STATUS_LOADING, STATUS_NO_AUTH } from '../constants/auth';

// import { recaptchaVerifier } from '../firebase/firebase';

import Auth from './Auth';

import { NavBar } from './widgets/navbar';
import Footer from './widgets/footer';

@inject('auth', 'toast', 'search')
@observer
class Page extends React.Component {
  componentDidMount() {
    let store = this.props.auth;
    store.startListener();

    this.status = autorun(() => {
      let state = this.props.toast.state;

      if (state.visible) {
        this.props.snackbar(state.message, {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          variant: state.type,
        });
      }
      this.props.search.getSearchHistory();
    });
  }

  componentWillUnmount() {
    this.status();
    this.props.toast.clear();
  }

  render() {
    const { auth: storeAuth, children, search } = this.props;

    return (
      <>
        <Head>
          <title>IsabiTV</title>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3971957669020641"
            crossOrigin="anonymous"
          ></script>
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
  }
}

const PageHOC = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  useEffect(() => {
    window.recaptchaVerifier = recaptchaVerifier();
  });

  return (
    <Page router={router} snackbar={enqueueSnackbar}>
      {children}
    </Page>
  );
};

export default PageHOC;
