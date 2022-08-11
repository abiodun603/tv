import React from 'react';

class ProfileSub extends React.Component {
  render() {
    return (
      <div className="profile-page__body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="font-weight-bold text text_typography_headline-xl mb-0">
            Subscription
          </h1>
          <div className="text text_view_secondary">
            Upgrade or downgrade at any time
          </div>
        </div>

        <div className="row mb-4">
          <div className="col">
            <div className="subs-card d-flex mb-4">
              <div className="subs-card__info">
                <div className="d-flex">
                  <div className="subs-card__checkbox custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                      checked
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck1"
                    />
                  </div>
                  <div className="font-weight-bold text text_typography_headline-m mb-3">
                    Basic Plan
                  </div>
                </div>
                <ul className="text text_view_secondary mb-0">
                  <li>
                    <p>Lorem ipsum dolor sit amet</p>
                  </li>
                  <li>
                    <p>Sed do eiusmod tempor</p>
                  </li>
                  <li>Consectetur adipiscing elit</li>
                </ul>
              </div>
              <div className="subs-card__price d-flex justify-content-center align-items-center">
                <div className="text-center">
                  <div className="font-weight-bold text text_typography_headline-m">
                    $9.99
                  </div>
                  <div className="text text_view_secondary text_size_s font-weight-normal">
                    /per month
                  </div>
                </div>
              </div>
            </div>

            <div className="subs-card d-flex">
              <div className="subs-card__info">
                <div className="d-flex">
                  <div className="subs-card__checkbox custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                      checked
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck1"
                    />
                  </div>
                  <div className="font-weight-bold text text_typography_headline-m mb-3">
                    Advanced Plan
                  </div>
                </div>
                <ul className="text text_view_secondary mb-0">
                  <li>
                    <p>Lorem ipsum dolor sit amet</p>
                  </li>
                  <li>
                    <p>Sed do eiusmod tempor</p>
                  </li>
                  <li>Consectetur adipiscing elit</li>
                </ul>
              </div>
              <div className="subs-card__price d-flex justify-content-center align-items-center">
                <div className="text-center">
                  <div className="font-weight-bold text text_typography_headline-m">
                    $9.99
                  </div>
                  <div className="text text_view_secondary text_size_s font-weight-normal">
                    /per month
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="subs-card subs-card_active d-flex mb-4">
              <div className="subs-card__info">
                <div className="d-flex">
                  <div className="subs-card__checkbox custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                      checked
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck1"
                    />
                  </div>
                  <div className="font-weight-bold text text_typography_headline-m mb-3">
                    Pro Plan
                  </div>
                </div>
                <ul className="text text_view_secondary mb-0">
                  <li>
                    <p>Lorem ipsum dolor sit amet</p>
                  </li>
                  <li>
                    <p>Sed do eiusmod tempor</p>
                  </li>
                  <li>Consectetur adipiscing elit</li>
                </ul>
              </div>
              <div className="subs-card__price d-flex justify-content-center align-items-center">
                <div className="text-center">
                  <div className="font-weight-bold text text_typography_headline-m">
                    $9.99
                  </div>
                  <div className="text text_view_secondary text_size_s font-weight-normal">
                    /per month
                  </div>
                </div>
              </div>
            </div>

            <div className="subs-card d-flex">
              <div className="subs-card__info">
                <div className="d-flex">
                  <div className="subs-card__checkbox custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                      checked
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck1"
                    />
                  </div>
                  <div className="font-weight-bold text text_typography_headline-m mb-3">
                    Premium Plan
                  </div>
                </div>
                <ul className="text text_view_secondary mb-0">
                  <li>
                    <p>Lorem ipsum dolor sit amet</p>
                  </li>
                  <li>
                    <p>Sed do eiusmod tempor</p>
                  </li>
                  <li>Consectetur adipiscing elit</li>
                </ul>
              </div>
              <div className="subs-card__price d-flex justify-content-center align-items-center">
                <div className="text-center">
                  <div className="font-weight-bold text text_typography_headline-m">
                    $9.99
                  </div>
                  <div className="text text_view_secondary text_size_s font-weight-normal">
                    /per month
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="btn btn-primary btn-lg" type="button">
          Select & Continue
        </button>
      </div>
    );
  }
}

export default ProfileSub;
