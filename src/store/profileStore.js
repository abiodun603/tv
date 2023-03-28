import Router from 'next/router';
import { observable, action, configure, runInAction, toJS } from 'mobx';
import cookies from 'js-cookie';

import http from '../api/axiosApi';
import * as firebase from '../firebase/auth';
import { credentialsEmail } from '../firebase/firebase';

import {
  PATH_URL_PROFILE_CREATE,
  PATH_URL_PROFILE_UPDATE,
  PATH_URL_UPLOAD,
  PATH_URL_PROFILE_REMOVE_UPLOADS,
  PATH_URL_PROFILE_CLEAR_HISTORY,
  PATH_URL_SEARCH_HISTORY_MY,
  PATH_URL_SEARCH_HISTORY_MY_LIST,
  PATH_URL_PROFILE_REMOVE_ACCOUNT,
  PATH_URL_PROFILE_CHECK_USERNAME,
} from '../constants/API';

import { PROFILE_MY } from '../constants/routes';

import { BasicStore } from './BasicStore';

import { valText, valEmail, valPhone, valDate } from '../utils/validate';
import { getFormDataWithImage } from '../utils/getFormDataWithImage';

configure({ enforceActions: 'always' });

class ProfileStore extends BasicStore {
  constructor(props) {
    super(props);

    this.clearProfile();
  }

  cleanProfile = {
    id: null,
    username: '',
    name: '',
    last_name: '',
    birthday: null,
    country: '',
    city: '',
    social: null,
    photo: null,
    phone: null,
    email: '',
    languages: [],
    instagram: '',
    facebook: '',
    twitter: '',
    display_email: true,
    display_phone: true,
    display_location: true,
    display_social: true,
    watch_history_enabled: false,
    search_history_enabled: false,
  };
  @observable loading = false;
  @observable isSuccess = false;

  @observable profileState = PROFILE_MY;

  @observable statusChangePass = 'pending';

  @observable password = {
    old: '',
    new: '',
    repeat: '',
  };

  @observable validated = {
    username: true,
    email: true,
    name: true,
    last_name: true,
    birthday: true,
    country: true,
    newPass: true,
    oldPass: true,
    repeatPass: true,
    phone: true,
  };

  @observable profile = { ...this.cleanProfile };

  @action clearProfile() {
    this.profile = { ...this.cleanProfile };
  }

  @action.bound
  createUser() {
    debugger;
    let profile = toJS(this.profile);
    debugger;
    if (!valText(profile.username)) {
      this.validated.username = false;
      return;
    }
    if (!valText(profile.name)) {
      this.validated.name = false;
      return;
    }
    if (!valText(profile.last_name)) {
      this.validated.last_name = false;
      return;
    }
    if (!valDate(profile.birthday)) {
      this.validated.birthday = false;
      return;
    }

    profile.email = firebase.getCurrentUser().providerData[0].email;
    profile.phone = firebase.getCurrentUser().providerData[0].phoneNumber;

    this.loading = true;

    http
      .post(PATH_URL_PROFILE_CREATE, JSON.stringify(profile))
      // profile/check-username

      .then((res) => {
        debugger;

        if (res.data.success) {
          runInAction(() => {
            this.isSuccess = true;
            Router.reload();
          });
        } else {
          if (res.data.message.includes('UNIQUE')) {
            runInAction(() => {
              this.validated.username = false;
              this.toast.show({
                message: 'username must be unique',
                type: 'warning',
                visible: true,
              });
            });
          } else {
            runInAction(() => {
              this.toast.show({
                message: 'something went wrong',
                type: 'warning',
                visible: true,
              });
            });
          }
        }
        runInAction(() => {
          this.loading = false;
        });
      })
      .catch((e) => {
        runInAction(() => {
          this.toast.show({
            message: e.message,
            type: 'warning',
            visible: true,
          });
          this.loading = false;
        });
      });
  }

  @action.bound
  updateUser() {
    debugger;
    let profile = toJS(this.profile);

    if (!valText(this.profile.username)) {
      this.validated.username = false;
      return;
    }

    if (!valText(this.profile.name)) {
      this.validated.name = false;
      return;
    }

    if (!valText(this.profile.last_name)) {
      this.validated.last_name = false;
      return;
    }

    if (!valEmail(this.profile.email)) {
      this.validated.email = false;
      return;
    }

    if (!valPhone(this.profile.phone)) {
      this.validated.phone = false;
      return;
    }

    if (!valDate(this.profile.birthday)) {
      this.validated.birthday = false;
      return;
    }

    this.loading = true;

    http
      .put(PATH_URL_PROFILE_UPDATE, JSON.stringify(profile))
      .then((res) => {
        if (res.data.success) {
          runInAction(() => {
            this.toast.show({
              message: 'success',
              type: 'success',
              visible: true,
            });

            this.loading = false;
          });
        } else {
          runInAction(() => {
            if (res.data.message.includes('UNIQUE')) {
              this.validated.username = false;
              this.toast.show({
                message: 'username must be unique',
                type: 'warning',
                visible: true,
              });
            } else {
              this.toast.show({
                message: 'something went wrong',
                type: 'warning',
                visible: true,
              });
            }
            this.loading = false;
          });
        }
      })
      .catch((e) => {
        runInAction(() => {
          this.toast.show({
            message: e.message,
            type: 'warning',
            visible: true,
          });
          this.loading = false;
        });
      });
  }

  @action.bound
  deleteUser() {}

  @action.bound
  changePassword() {
    if (!valText(this.password.old)) {
      this.validated.oldPass = false;
      return;
    }
    if (!valText(this.password.new)) {
      this.validated.newPass = false;
      return;
    }
    if (!valText(this.password.repeat)) {
      this.validated.repeatPass = false;
      return;
    }

    if (this.password.repeat !== this.password.new) {
      this.validated.repeatPass = false;
      this.toast.show({
        message: 'passwords do not match',
        type: 'warning',
        visible: true,
      });
      return;
    }

    if (this.profile.email !== null) {
      this.statusChangePass = 'loading';

      firebase
        .reauthenticate(credentialsEmail(this.profile.email, this.password.old))
        .then(() => {
          firebase
            .changePassword(this.password.new)
            .then(() => {
              runInAction(() => {
                this.statusChangePass = 'success';
              });
            })
            .catch((error) => {
              runInAction(() => {
                this.statusChangePass = 'pending';
                this.toast.show({
                  message: error.message,
                  type: 'warning',
                  visible: true,
                });
              });
            });
        })
        .catch((error) => {
          runInAction(() => {
            this.statusChangePass = 'pending';
            this.toast.show({
              message: error.message,
              type: 'warning',
              visible: true,
            });
          });
        });
    }
  }

  @action.bound
  removeUploads() {
    http.setToken(cookies.get('token'));

    return http
      .post(PATH_URL_PROFILE_REMOVE_UPLOADS)
      .then(
        action('successRemoveUploads', (res) => {
          this.toast.show({
            message: 'successfully removed',
            type: 'success',
            visible: true,
          });
        }),
        action('errorRemoveUploads', (error) => {
          this.toast.show({
            message: error.message,
            type: 'error',
            visible: true,
          });
        }),
      )
      .catch((e) => {
        runInAction(() => {
          this.toast.show({
            message: e.message,
            type: 'error',
            visible: true,
          });
        });
      });
  }

  @action.bound
  async removeAccount() {
    await http.setToken(cookies.get('token'));

    //delete account from firebase
    const user = firebase.getCurrentUser();
    user
      .delete()
      .then(() => {
        console.log('User Account deleted successfully');
      })
      .catch((error) => {
        console.log('Error deleting User account', error);
      });

    return http
      .delete(PATH_URL_PROFILE_REMOVE_ACCOUNT)
      .then(
        action('successRemoveAccount', (res) => {
          console.log(res.data);
          this.toast.show({
            message: 'Removed Account Successfully',
            type: 'success',
            visible: true,
          });
        }),
        action('errorRemoveAccount', (error) => {
          this.toast.show({
            message: error.message,
            type: 'error',
            visible: true,
          });
        }),
      )
      .catch((e) => {
        runInAction(() => {
          this.toast.show({
            message: e.message,
            type: 'error',
            visible: true,
          });
        });
      });
  }

  // Clears both search-history and watch-history
  @action.bound
  clearHistory() {
    http.setToken(cookies.get('token'));

    http
      .post(PATH_URL_PROFILE_CLEAR_HISTORY)
      .then(
        action('successClearHistory', (res) => {
          this.toast.show({
            message: 'Watch history successfully cleared',
            type: 'success',
            visible: true,
          });
        }),
        action('errorClearHistory', (error) => {
          this.toast.show({
            message: error.message,
            type: 'error',
            visible: true,
          });
        }),
      )
      .catch((e) => {
        runInAction(() => {
          this.toast.show({
            message: e.message,
            type: 'error',
            visible: true,
          });
        });
      });

    http
      .delete(PATH_URL_SEARCH_HISTORY_MY)
      .then(
        action('successClearHistory', (res) => {
          this.toast.show({
            message: 'Search history successfully cleared',
            type: 'success',
            visible: true,
          });
        }),
        action('errorClearHistory', (error) => {
          this.toast.show({
            message: error.message,
            type: 'error',
            visible: true,
          });
        }),
      )
      .catch((e) => {
        runInAction(() => {
          this.toast.show({
            message: e.message,
            type: 'error',
            visible: true,
          });
        });
      })
      .then(() => {
        this.rootStore.stores.search.getSearchHistory();
      });
  }

  @action.bound
  uploadPhoto(files) {
    const formData = getFormDataWithImage(files);

    if (formData.error) {
      return this.toast.show({
        ...formData,
        type: 'warning',
        visible: true,
      });
    }

    return http.uploadPhoto(PATH_URL_UPLOAD, formData).then(
      action('successUploadPhoto', (res) => {
        let data = res.data;

        if (data.length) {
          data = data[0];
        }

        const isSuccess = data.success;
        const imageUrl = data.result && data.result.url;

        if (isSuccess && imageUrl) {
          this.toast.show({
            message: 'successfully uploaded',
            type: 'success',
            visible: true,
          });

          this.profile.photo = { url: imageUrl };
        } else {
          this.toast.show({
            message: data.message || 'something wrong',
            type: 'warning',
            visible: true,
          });
        }
      }),
      action('errorUploadPhoto', (error) => {
        if (http.isCancel(error)) {
          console.log('Request cancelled...');
        } else {
          this.toast.show({
            message: error.message,
            type: 'warning',
            visible: true,
          });
        }
      }),
    );
  }

  @action.bound
  setName(name) {
    this.validated.name = true;
    this.profile.name = name;
  }

  @action.bound
  setBirthday(date) {
    this.validated.birthday = true;
    this.profile.birthday = date;
  }

  @action.bound
  setCountry(country) {
    this.profile.country = country;
  }

  @action.bound
  setShowEmail(isShow) {
    this.profile.display_email = Boolean(isShow);
  }

  @action.bound
  setShowPhone(isShow) {
    this.profile.display_phone = Boolean(isShow);
  }

  @action.bound
  setShowLocation(isShow) {
    this.profile.display_location = Boolean(isShow);
  }

  @action.bound
  setShowSocial(isShow) {
    this.profile.display_social = Boolean(isShow);
  }

  @action.bound
  setDontTrackWatch(isShow) {
    this.profile.watch_history_enabled = isShow;
  }

  @action.bound
  setDontTrackSearch(isShow) {
    this.profile.search_history_enabled = isShow;
  }

  @action.bound
  setCity(city) {
    this.profile.city = city;
  }

  @action.bound
  setPhone(phone) {
    this.validated.phone = true;
    this.profile.phone = phone;
  }

  @action.bound
  setLanguages(languages) {
    this.profile.languages = languages;
  }

  @action.bound
  setLastName(lastName) {
    this.validated.last_name = true;
    this.profile.last_name = lastName;
  }

  @action.bound
  setUserName(username) {
    this.validated.username = true;
    this.profile.username = username;
  }

  @action.bound
  setEmail(value) {
    this.validated.email = true;
    this.profile.email = value;
  }

  @action.bound
  setOldPass(oldPass) {
    this.validated.oldPass = true;
    this.password.old = oldPass;
  }

  @action.bound
  setRepPass(repeatPass) {
    this.validated.repeatPass = true;
    this.password.repeat = repeatPass;
  }

  @action.bound
  setNewPass(newPass) {
    this.validated.newPass = true;
    this.password.new = newPass;
  }

  @action.bound
  setInstagram(text) {
    this.profile.instagram = text;
  }
  @action.bound
  setFacebook(text) {
    this.profile.facebook = text;
  }
  @action.bound
  setTwitter(text) {
    this.profile.twitter = text;
  }

  @action.bound
  clearPass() {
    this.validated.oldPass = true;
    this.validated.repeatPass = true;
    this.validated.newPass = true;
    this.password.new = '';
    this.password.repeat = '';
    this.password.old = '';
  }

  @action.bound
  setStateProfile(state) {
    this.profileState = state;
  }
}

export default ProfileStore;
