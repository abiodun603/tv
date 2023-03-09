import Image from 'next/image';
import React from 'react';

class ProfileUsers extends React.Component {
  render() {
    return (
      <div className="profile-page__body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="font-weight-bold text text_typography_headline-xl mb-0">
            Active Users
          </h1>
          <button className="btn btn-primary btn-lg" type="button">
            Add user
          </button>
        </div>

        <div className="form-group d-flex align-items-center">
          One login for all my accounts
          <div className="custom-control custom-switch ml-3">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customSwitch111"
            />
            <label className="custom-control-label" htmlFor="customSwitch111" />
          </div>
        </div>

        <div className="users-list users-list_header row">
          <div className="col col-sm-4">Name</div>
          <div className="col col-sm-3">Last activity</div>
          <div className="col col-sm-2">Master account</div>
          <div className="col col-sm-3">Enable parental control</div>
        </div>
        <div className="users-list row align-items-center mb-3">
          <div className="col col-sm-4">
            <div className="media">
              <Image
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23ccc'%3E%3C/rect%3E%3C/svg%3E"
                width="52"
                height="52"
                className="users-list__userpic mr-3"
                alt=""
              />
              <div className="media-body">
                <div className="font-weight-bold">Cruz Martin</div>
                <div className="text text_view_secondary">
                  bford@brainbox.org
                </div>
              </div>
            </div>
          </div>
          <div className="col col-sm-3">
            <div className="text text_view_secondary">02 Apr 2020, 10:45</div>
          </div>
          <div className="col col-sm-2">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch111"
              />
              <label
                className="custom-control-label"
                htmlFor="customSwitch111"
              />
            </div>
          </div>
          <div className="col col-sm-3 d-flex align-items-center justify-content-between">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch111"
              />
              <label
                className="custom-control-label"
                htmlFor="customSwitch111"
              />
            </div>
            <div className="btn-group dropleft">
              <button
                type="button"
                className="profile-page__drop-button btn dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="icon icon_name_more-dots" />
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">
                  <span className="users-list__pause-icon icon icon_name_pause" />
                  Temporarily disable account
                </a>
                <a className="dropdown-item" href="#">
                  <span className="users-list__deny-icon icon icon_name_deny" />
                  Deny access
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="users-list row align-items-center mb-3">
          <div className="col col-sm-4">
            <div className="media">
              <Image
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23ccc'%3E%3C/rect%3E%3C/svg%3E"
                width="52"
                height="52"
                className="users-list__userpic mr-3"
                alt=""
              />
              <div className="media-body">
                <div className="font-weight-bold">Rose Martin</div>
                <div className="text text_view_secondary">
                  jlopez@edgeify.info
                </div>
              </div>
            </div>
          </div>
          <div className="col col-sm-3">
            <div className="text text_view_secondary">02 Apr 2020, 10:45</div>
          </div>
          <div className="col col-sm-2">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch111"
              />
              <label
                className="custom-control-label"
                htmlFor="customSwitch111"
              />
            </div>
          </div>
          <div className="col col-sm-3 d-flex align-items-center justify-content-between">
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch111"
              />
              <label
                className="custom-control-label"
                htmlFor="customSwitch111"
              />
            </div>
            <div className="btn-group dropleft">
              <button
                type="button"
                className="profile-page__drop-button btn dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="icon icon_name_more-dots" />
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">
                  <span className="users-list__pause-icon icon icon_name_pause" />
                  Temporarily disable account
                </a>
                <a className="dropdown-item" href="#">
                  <span className="users-list__deny-icon icon icon_name_deny" />
                  Deny access
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileUsers;
