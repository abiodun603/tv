import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyABC_t7HohIXCfWqUML-wyS-CLvYQ5Wy0c',
  authDomain: 'isabitv.firebaseapp.com',
  databaseURL: 'https://isabitv.firebaseio.com',
  projectId: 'isabitv',
  storageBucket: 'isabitv.appspot.com',
  messagingSenderId: '938535839812',
  appId: '1:938535839812:web:7ee54ffcc09c10a7aab411',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

// apple
// export const  signInWithApple = async() => {
//   const provider = new firebase.auth.OAuthProvider('apple.com');
//   const result = await auth.signInWithPopup(provider);

//   console.log(result.user); // logged-in Apple user
// }

const providerPhone = new firebase.auth.PhoneAuthProvider();
const providerGoogle = new firebase.auth.GoogleAuthProvider().addScope('email');
const providerFacebook = new firebase.auth.FacebookAuthProvider();
const providerTwitter = new firebase.auth.TwitterAuthProvider();

let credentialsEmail = (email, password) =>
  new firebase.auth.EmailAuthProvider.credential(email, password);

let recaptchaVerifier = () => {
  return new firebase.auth.RecaptchaVerifier('recaptcha-container', {
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
