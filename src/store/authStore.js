import Router from 'next/router';
import {
  observable,
  computed,
  action,
  configure,
  runInAction,
  autorun,
} from 'mobx';
import cookies from 'js-cookie';

import * as firebase from '../firebase/auth';
import http from '../api/axiosApi';

import { BasicStore } from './BasicStore';

import {
  AUTH_EMAIL,
  AUTH_PHONE,
  AUTH_PHONE_CODE_SEND,
  STATUS_AUTH,
  STATUS_LOADING,
  STATUS_NO_AUTH,
  TYPE_AUTH,
  TYPE_CREATE_PROFILE,
} from '../constants/auth';
import { valEmail, valPassword, valPhone, valText } from '../utils/validate';

// don't allow state modifications outside actions
configure({ enforceActions: 'always' });

class AuthStore extends BasicStore {
  /**
   * Reference to instance of the ProfileStore
   *
   * @returns {ProfileStore}
   */
  get profileStore() {
    return this.rootStore.stores.profile;
  }

  constructor(...args) {
    super(...args);

    autorun(() => {
      const { status } = this.profileStore || {};

      if (status) {
        runInAction(() => {
          this.status = STATUS_AUTH;
        });
      }
    });
  }

  /*   @observable providerId = ""
   */
  @observable email = '';
  @observable password = '';
  @observable phone = '';
  @observable code = '';
  @observable verificationId = '';

  @observable validated = {
    code: true,
    phone: true,
    password: true,
    email: true,
  };

  @observable loading = false;
  @observable isSignIn = true;
  @observable typeAuth = 0;
  @observable second = -1;
  @observable statusPhone = AUTH_PHONE;

  @observable status = STATUS_NO_AUTH;
  @observable type = TYPE_AUTH;

  startTimer() {
    let timer = setInterval(
      action(() => {
        this.second--;
        if (this.second === -1) {
          clearInterval(timer);
        }
      }),
      1000,
    );
  }

  @action
  startListener() {
    firebase.onAuthStateChanged((user) => {
      if (user) {
        runInAction(() => {
          this.profileStore.profile.email = user.email;
          this.profileStore.profile.phone = user.phoneNumber;
        });

        firebase
          .getCurrentUser()
          .getIdToken(true)
          .then((idToken) => {
            cookies.set('token', idToken, { expires: 1 });

            http.setToken(idToken);

            http
              .get('profile')
              .then((res) => {
                if (res.data.success) {
                  runInAction(() => {
                    this.profileStore.profile = res.data.result;
                    this.status = STATUS_AUTH;
                  });
                }
              })
              .catch((error) => {
                runInAction(() => {
                  this.status = STATUS_NO_AUTH;
                  this.type = TYPE_CREATE_PROFILE;
                });
              });
          })
          .catch((error) => {
            runInAction(() => {
              this.type = TYPE_AUTH;
              this.status = STATUS_NO_AUTH;
            });
            console.log(error + '--'); // Nothing
          });
      } else {
        runInAction(() => {
          this.type = TYPE_AUTH;
          this.status = STATUS_NO_AUTH;
        });
      }
    });
  }

  @action
  signInFirebaseSocial(type) {
    this.loading = true;
    firebase.signInSocial(type).catch((error) => {
      runInAction(() => {
        this.toast.show({
          message: error.message,
          type: 'warning',
          visible: true,
        });
        this.loading = false;
      });
    });
  }

  @action.bound
  signInEmail() {
    if (!valEmail(this.email)) {
      this.validated.email = false;
    }
    if (!valPassword(this.password)) {
      this.validated.password = false;
    }
    if (this.validated.email && this.validated.password) {
      this.loading = true;
      firebase.signInEmail(this.email, this.password).then(
        action('successSignInEmail', (res) => {
          this.loading = false;
        }),
        action('errorSignInEmail', (error) => {
          this.toast.show({
            message: error.message,
            type: 'warning',
            visible: true,
          });
          this.loading = false;
        }),
      );
    }
  }

  @action.bound
  signUpEmail() {
    if (!valEmail(this.email)) {
      this.validated.email = false;
    }
    if (!valPassword(this.password)) {
      this.validated.password = false;
    }
    if (this.validated.email && this.validated.password) {
      this.loading = true;
      firebase.signUpEmail(this.email, this.password).then(
        action('successSignUpEmail', (res) => {
          this.loading = false;
        }),
        (error) => {
          runInAction(() => {
            this.loading = false;
          });
          this.toast.show({
            message: error.message,
            type: 'warning',
            visible: true,
          });
        },
      );
    }
  }

  @action.bound
  forgotPassword() {
    if (valEmail(this.email)) {
      this.loading = true;
      firebase.doPasswordReset(this.email).then(
        action('successSend', (res) => {
          this.toast.show({
            message:
              'Sent to your email on record. Please check your e-mail for instructions',
            type: 'success',
            visible: true,
          });
          this.loading = false;
        }),
        action('errorSend', (error) => {
          this.toast.show({
            message: error.message,
            type: 'warning',
            visible: true,
          });
          this.loading = false;
        }),
      );
    } else {
      this.validated.email = false;
    }
  }

  @action.bound
  signOut = () => {
    firebase
      .doSignOut()
      .then(
        action('successLogout', (res) => {
          cookies.remove('token');
          this.status = STATUS_NO_AUTH;
          Router.push('/');
          this.rootStore.refreshStore();
        }),
      )
      .catch(function (error) {
        console.log(error);
      });
  };

  @action.bound
  sendCodePhone() {
    if (valText(this.phone)) {
      if (this.second < 0) {
        this.loading = true;

        firebase.sendCodePhone(this.phone, window.recaptchaVerifier).then(
          action('successSendCode', (confirmationResult) => {
            this.verificationId = confirmationResult.verificationId;
            this.loading = false;
            this.second = 60;
            this.startTimer();
            this.statusPhone = AUTH_PHONE_CODE_SEND;
          }),
          action('errorSendCode', (error) => {
            if (error.code === 'auth/invalid-phone-number') {
              this.validated.phone = false;
            } else {
              this.toast.show({
                message: error.message,
                type: 'warning',
                visible: true,
              });
            }
            this.loading = false;
          }),
        );
      }
    } else {
      this.validated.phone = false;
    }
  }

  @action.bound
  authPhone() {
    if (valPassword(this.code)) {
      this.loading = true;

      firebase.signInPhone(this.verificationId, this.code).then(
        action('successSignInPhone', (res) => {
          this.loading = false;
        }),
        action('errorSignInPhone', (error) => {
          this.toast.show({
            message: error.message,
            type: 'warning',
            visible: true,
          });
          this.loading = false;
        }),
      );
    } else {
      this.validated.code = false;
    }
  }

  @action.bound
  setStatus(status) {
    this.status = status;
  }

  @action.bound
  setEmail(email) {
    this.validated.email = valEmail(email);
    this.email = email;
  }

  @action.bound
  setCode(code) {
    this.validated.code = true;
    this.code = code;
  }

  @action.bound
  setPhone(phone) {
    let plainPhone = phone
      .replace(/\s/g, '')
      .replace(/[()]/g, '')
      .replace(/[-]/g, '');
    console.log(plainPhone);
    this.validated.phone = valPhone(plainPhone);
    this.phone = plainPhone;
  }

  @action.bound
  setPassword(password) {
    this.validated.password = this.isSignIn ? true : valPassword(password);
    this.password = password;
  }

  @action.bound
  setTypeAuth() {
    this.typeAuth = this.typeAuth === AUTH_EMAIL ? AUTH_PHONE : AUTH_EMAIL;
  }

  @action.bound
  changeSignIn() {
    this.isSignIn = !this.isSignIn;
  }

  @computed
  get isForgotPassword() {
    return !this.isSignIn || this.typeAuth === AUTH_PHONE;
  }

  @computed
  get isSendCode() {
    return !(
      this.statusPhone === AUTH_PHONE_CODE_SEND && this.typeAuth === AUTH_PHONE
    );
  }

  @computed
  get nameButtonNext() {
    if (this.typeAuth === AUTH_PHONE) {
      if (this.statusPhone !== AUTH_PHONE_CODE_SEND) {
        return 'Next';
      } else {
        return 'Sign In';
      }
    } else {
      if (this.isSignIn) {
        return 'Sign In';
      } else {
        return 'Sign Up';
      }
    }
  }

  @action.bound
  nextStep() {
    if (this.typeAuth === AUTH_PHONE) {
      if (this.statusPhone !== AUTH_PHONE_CODE_SEND) {
        this.sendCodePhone();
      } else {
        this.authPhone();
      }
    } else {
      if (this.isSignIn) {
        this.signInEmail();
      } else {
        this.signUpEmail();
      }
    }
  }
}

export default AuthStore;
