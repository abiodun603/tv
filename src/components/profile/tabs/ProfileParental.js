import React from 'react';

class ProfileParental extends React.Component {
  render() {
    return (
      <div className="profile-page__body">
        <h1 className="font-weight-bold text text_typography_headline-xl mb-4">
          Parental Control
        </h1>
        <div className="row mb-3">
          <div className="col col-sm-8">
            <p className="text text_view_secondary mb-4">
              Set age restrictions and PIN code to restrict what content can be
              seen and downloaded based on maturity level.
            </p>

            <div className="row mb-4">
              <div className="form-group col-sm-6 d-flex justify-content-between align-items-center">
                Enable parental control
                <div className="custom-control custom-switch">
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

            <div className="row">
              <div className="form-group col-sm-6">
                <label htmlFor="name5">Child age</label>
                <select className="custom-select" id="name5">
                  <option selected>12-16 years old</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-6">
                <label htmlFor="name4">PIN code</label>
                <input type="text" className="form-control" id="name4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileParental;
