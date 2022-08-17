import React, { useState } from 'react';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';

import classNames from 'classnames';

import { Container, Nav } from 'react-bootstrap';

import { PROFILE_UPLOADS } from '../../constants/routes';
import * as Routes from '../../constants/routes';

import ProfileSettings from './tabs/ProfileSettings';
import ProfileMy from './tabs/ProfileMy';
import ProfilePayments from './tabs/ProfilePayments';
import ProfileSub from './tabs/ProfileSub';
import ProfileParental from './tabs/ProfileParental';
import ProfileUsers from './tabs/ProfileUsers';

import UploadPhoto from '../widgets/UploadPhoto';
import UserContent from '../UserContent/UserContent';

const menu = [
  { title: 'Uploads', iconClassName: 'icon_name_upload', key: PROFILE_UPLOADS },
  { title: 'Subscription', iconClassName: 'icon_name_subscription', key: null },
  { title: 'Payment methods', iconClassName: 'icon_name_payment', key: null },
  { title: 'Parental control', iconClassName: 'icon_name_parental', key: null },
  {
    title: 'Settings',
    iconClassName: 'icon_name_setings',
    key: null,
  },
  { title: 'Active users', iconClassName: 'icon_name_users', key: null },
];

const ProfilePage = inject('profile')(
  observer((props) => {
    const {
      profile: {
        profile: storeProfile,
        uploadPhoto,
        setStateProfile,
        profileState,
      },
    } = props;
    const [profileId, setProfileId] = useState(storeProfile.social.id);

    const RenderSwitch = (type) => {
      switch (type) {
        case Routes.PROFILE_MY:
          return <ProfileMy />;
        case Routes.PROFILE_SUB:
          return <ProfileSub />;
        case Routes.PROFILE_PAYMENTS:
          return <ProfilePayments />;
        case Routes.PROFILE_PARENTAL:
          return <ProfileParental />;
        case Routes.PROFILE_SETTINGS:
          return <ProfileSettings />;
        case Routes.PROFILE_USERS:
          return <ProfileUsers />;
        case Routes.PROFILE_UPLOADS:
          return (
            <div className="profile-page__body">
              <h1 className="font-weight-bold text text_typography_headline-xl mb-4">
                Uploads
              </h1>
              <UserContent profileId={profileId} />
            </div>
          );
        default:
          return '';
      }
    };

    const changeState = (type) => {
      setStateProfile(type);
    };

    return (
      <Container className="mb-4 mt-5">
        <div className="profile-page d-flex">
          <div className="profile-page__menu profile-menu">
            <div className="profile-menu__item profile-menu__user-info media mb-4">
              <div className="profile-menu__user-avatar mr-4">
                <UploadPhoto storeProfile={storeProfile} upload={uploadPhoto} />
              </div>
              <div
                className="main-settings media-body clickable"
                onClick={(e) => changeState(Routes.PROFILE_MY)}
              >
                <div>
                  {[storeProfile.name, storeProfile.last_name].join(' ')}
                </div>
                <div className="text text_view_secondary text_size_s">
                  @{storeProfile.username}
                </div>
              </div>
            </div>

            <div className="profile-menu__item row mb-4">
              <div className="col">
                <div className="text text_view_secondary text_size_xs">
                  Videos
                </div>
                <div className="text">{storeProfile.social.count_videos}</div>
              </div>
              <div className="col">
                <div className="text text_view_secondary text_size_xs">
                  Followers
                </div>
                <div className="text">
                  {storeProfile.social.count_followers}
                </div>
              </div>
              <div className="col">
                <div className="text text_view_secondary text_size_xs">
                  Following
                </div>
                <div className="text">
                  {storeProfile.social.count_following}
                </div>
              </div>
            </div>

            <div className="profile-menu__item mb-4">
              <Link href="/upload">
                <button
                  className="btn btn-primary btn-block btn_view_action"
                  type="button"
                >
                  Upload Video
                </button>
              </Link>
            </div>

            <Nav className="flex-column">
              {menu.map((item) => (
                <Nav.Item
                  key={item.title}
                  onClick={() => item.key && changeState(item.key)}
                >
                  <Nav.Link
                    className={classNames(
                      'profile-menu__item profile-menu__nav-item d-flex',
                      {
                        'profile-menu__nav-item_active':
                          item.key === profileState,
                        'profile-menu__nav-item_disable': !Boolean(item.key),
                      },
                    )}
                    bsPrefix="clear"
                    eventKey={item.key}
                    disabled={!Boolean(item.key)}
                  >
                    <span
                      className={classNames(
                        'profile-menu__nav-icon icon mr-3',
                        item.iconClassName,
                      )}
                    />
                    <span className="text text_view_secondary">
                      {item.title}
                    </span>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </div>
          {RenderSwitch(profileState)}
        </div>
      </Container>
    );
  }),
);

export default ProfilePage;
