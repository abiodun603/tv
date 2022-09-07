import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

import { recaptchaVerifier } from '../firebase/firebase';
import AuthLayout from './AuthLayout';

const PageHOC = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  // useEffect(() => {
  //   window.recaptchaVerifier = recaptchaVerifier();
  // });

  return (
    <AuthLayout router={router} snackbar={enqueueSnackbar}>
      {children}
    </AuthLayout>
  );
};

export default PageHOC;
