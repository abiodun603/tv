import { initializeApp } from 'firebase/app';
import {
  getAuth,
  PhoneAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  EmailAuthProvider,
  RecaptchaVerifier,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyABC_t7HohIXCfWqUML-wyS-CLvYQ5Wy0c',
  authDomain: 'isabitv.firebaseapp.com',
  databaseURL: 'https://isabitv.firebaseio.com',
  projectId: 'isabitv',
  storageBucket: 'isabitv.appspot.com',
  messagingSenderId: '938535839812',
  appId: '1:938535839812:web:7ee54ffcc09c10a7aab411',
  measurementId: 'G-E8KDZC9EH5',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const providerPhone = new PhoneAuthProvider();
const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();
const providerTwitter = new TwitterAuthProvider();

let credentialsEmail = (email, password) =>
  new EmailAuthProvider.credential(email, password);

let recaptchaVerifier = () => {
  return new RecaptchaVerifier('recaptcha-container', {
    size: 'invisible',
  });
};

export {
  auth,
  providerGoogle,
  providerFacebook,
  providerTwitter,
  providerPhone,
  recaptchaVerifier,
  credentialsEmail,
};
