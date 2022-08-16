import React from 'react';
import { Provider } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';

import '../styles/vendor.scss';
import '../styles/main.css';
import '../styles/blocks/index.css';
import '../styles/components.scss';

import initializeStore from '../src/store/store';
import App from 'next/app';
import { SnackbarProvider } from 'notistack';

function CustomApp({ Component, pageProps }) {
  let store = initializeStore();

  return (
    <SnackbarProvider maxSnack={2}>
      <Provider {...store}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </SnackbarProvider>
  );
}

CustomApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { ctx } = appContext;
  const { req, res, pathname } = ctx;

  if (req) {
  }
  return {
    ...appProps,
  };
};

export default CustomApp;
