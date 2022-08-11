import React from 'react';

class ProfileSettings extends React.Component {
  render() {
    return (
      <div className="profile-page__body">
        <h1 className="font-weight-bold text text_typography_headline-xl mb-4">
          Settings
        </h1>

        <div className="row">
          <div className="col col-sm-4">
            {/*<div className="font-weight-bold mb-3">Downloads location</div>*/}
            {/*<div className="profile-page__downloads d-flex align-items-center justify-content-between mb-3">*/}
            {/*  <div className="text text_view_secondary text-truncate">*/}
            {/*    D:/Users/Downloads*/}
            {/*  </div>*/}
            {/*  <a href="" className="link link_view_default font-weight-bold">*/}
            {/*    Change*/}
            {/*  </a>*/}
            {/*</div>*/}
            {/*<div className="custom-control custom-checkbox mb-5">*/}
            {/*  <input*/}
            {/*    type="checkbox"*/}
            {/*    className="custom-control-input"*/}
            {/*    id="customCheck1"*/}
            {/*  />*/}
            {/*  <label*/}
            {/*    className="custom-control-label text text_view_secondary"*/}
            {/*    htmlFor="customCheck1"*/}
            {/*  >*/}
            {/*    Always ask where to save file*/}
            {/*  </label>*/}
            {/*</div>*/}
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="font-weight-bold">Video quality</div>
              <div className="text">Low 480p</div>
            </div>
            <input
              type="range"
              className="custom-range mb-5"
              id="customRange1"
            />
            <div className="font-weight-bold mb-4">Watch history</div>
            <div className="form-group d-flex align-items-center justify-content-between">
              Do not track my watch history
              <div className="custom-control custom-switch ml-2">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customSwitch1"
                />
                <label
                  className="custom-control-label"
                  htmlFor="customSwitch1"
                />
              </div>
            </div>
            <div className="form-group d-flex align-items-center justify-content-between">
              Do not track my search history
              <div className="custom-control custom-switch ml-2">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customSwitch1"
                />
                <label
                  className="custom-control-label"
                  htmlFor="customSwitch1"
                />
              </div>
            </div>
          </div>

          <div className="col col-sm-8">
            {/*<div className="d-flex align-items-center justify-content-between mb-3">*/}
            {/*  <div className="font-weight-bold">Storage usage</div>*/}
            {/*  <div className="text text_view_secondary">*/}
            {/*    49,56 GB free of 499,62 GB*/}
            {/*  </div>*/}
            {/*</div>*/}
            {/*<div className="progress progress_theme_isabi mb-3">*/}
            {/*   <div className="progress-bar" role="progressbar" style="width: 75%" aria-valuenow="15"
                             aria-valuemin="0" aria-valuemax="100"></div>
                        <div className="progress-bar bg-success" role="progressbar" style="width: 10%"
                             aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>*/}
            {/*</div>*/}
            {/*<div className="d-flex align-items-center justify-content-between mb-4">*/}
            {/*  <div>*/}
            {/*    <div className="text text_view_secondary text_size_xs">*/}
            {/*      Other*/}
            {/*    </div>*/}
            {/*    400,04 GB*/}
            {/*  </div>*/}
            {/*  <div>*/}
            {/*    <div className="text text_view_secondary text_size_xs">*/}
            {/*      iSabiTV*/}
            {/*    </div>*/}
            {/*    2,1GB*/}
            {/*  </div>*/}
            {/*  <div>*/}
            {/*    <div className="text text_view_secondary text_size_xs">*/}
            {/*      Available*/}
            {/*    </div>*/}
            {/*    49,56 GB*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className="mb-5">
              <a
                href=""
                className="link link_view_danger font-weight-bold text-uppercase text text_size_s"
              >
                <u>Delete all Uploads</u>
              </a>
            </div>
            <div className="font-weight-bold mb-3">My devices</div>
            <p className="text text_view_secondary">
              Devices that are currently signed in on your account
            </p>
            <div className="mb-2">
              <strong>PC, Windows 10</strong>
              <span className="text text_view_secondary">
                — Toronto, Canada
              </span>
              <span className="text text_view_link">This device</span>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="">
                <strong>Samsung Galaxy Note II, Android 9 P</strong>
                <span className="text text_view_secondary">
                  — Toronto, Canada
                </span>
              </div>
              <div className="">
                <span className="text text_view_secondary">Sun</span>
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
                      Temporarily disable account
                    </a>
                    <a className="dropdown-item" href="#">
                      Deny access
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileSettings;
