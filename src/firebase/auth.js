import {
  auth,
  providerFacebook,
  providerGoogle,
  providerPhone,
  providerTwitter,
} from './firebase';
import { APPLE, FACEBOOK, TWITTER } from '../constants/auth';
// ============================================== //
import { getAuth, signInWithPopup, OAuthProvider } from 'firebase/auth';
// const provider = new OAuthProvider('apple.com');

export const onAuthStateChanged = (callback) =>
  auth.onAuthStateChanged(callback);

// Sign Up
export const signUpEmail = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const signInEmail = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const sendCodePhone = (phoneNumber, appVerifier) =>
  auth.signInWithPhoneNumber(phoneNumber, appVerifier);

// Sign In Social
export const signInSocial = (type) => {
  let provider;

  switch (type) {
    case FACEBOOK:
      provider = providerFacebook;
      provider.setCustomParameters({ auth_type: 'reauthenticate' });
      break;
    case TWITTER:
      provider = providerTwitter;
      break;
    // case APPLE:
    //   provider = providerApple;
    //   provider.setCustomParameters({ prompt: 'select_account' });
    default:
      provider = providerGoogle;
      provider.setCustomParameters({ prompt: 'select_account' });
  }

  return auth.signInWithRedirect(provider);
};

export const signInPhone = (verificationId, code) => {
  let credential = providerPhone.credential(verificationId, code);
  return auth.signInWithCredential(credential);
};

// Sign out
export const doSignOut = () => auth.signOut();

// Password Reset
export const doPasswordReset = (email) => auth.sendPasswordResetEmail(email);

// Password Change
export const getCurrentUser = () => auth.currentUser;

export const reauthenticate = (credential) =>
  getCurrentUser().reauthenticateWithCredential(credential);

export const changePassword = (newPassword) =>
  getCurrentUser().updatePassword(newPassword);
