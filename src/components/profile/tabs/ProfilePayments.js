import Image from 'next/image';
import React from 'react';

class ProfilePayments extends React.Component {
  render() {
    return (
      <div className="profile-page__body">
        <h1 className="font-weight-bold text text_typography_headline-xl mb-4">
          Payment Methods
        </h1>
        <div className="row mb-3">
          <div className="col">
            <div className="payment-method media p-3 mb-3">
              <Image
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23ccc'%3E%3C/rect%3E%3C/svg%3E"
                width="40"
                height="40"
                className="mr-2"
                alt=""
              />
              <div className="media-body d-flex align-items-center justify-content-between">
                <div>
                  **** **** **** 2345
                  <div className="text text_view_secondary text_size_xs">
                    Expires: 07/24
                  </div>
                </div>
                <div className="font-weight-bold">
                  <button className="payment-method__edit-button btn">
                    <span className="icon icon_name_edit-grey" />
                  </button>
                </div>
              </div>
            </div>

            <div className="payment-method media p-3 mb-3">
              <Image
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23ccc'%3E%3C/rect%3E%3C/svg%3E"
                width="40"
                height="40"
                className="mr-2"
                alt=""
              />
              <div className="media-body d-flex align-items-center justify-content-between">
                <div>
                  **** **** **** 2345
                  <div className="text text_view_secondary text_size_xs">
                    Expires: 07/24
                  </div>
                </div>
                <div className="font-weight-bold">
                  <button className="payment-method__delete-button btn">
                    <span className="icon icon_name_delete" />
                  </button>
                  <button className="payment-method__cancel-button btn">
                    <span className="icon icon_name_cancel" />
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name1">Card number</label>
              <input
                value="1234 1635 6272 2345"
                type="text"
                className="form-control"
                id="name1"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name1">Cardholder name</label>
              <input
                value="Julie Martin"
                type="text"
                className="form-control"
                id="name1"
              />
            </div>
            <div className="form-row">
              <div className="col">
                <label htmlFor="name1">Expires</label>
                <input value="07/24" type="text" className="form-control" />
              </div>
              <div className="col">
                <label htmlFor="name1">CVV</label>
                <input value="***" type="text" className="form-control" />
              </div>
            </div>
            <div className="custom-control custom-checkbox mt-4 mb-4">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck11"
                checked
              />
              <label
                className="custom-control-label text text_view_secondary"
                htmlFor="customCheck11"
              >
                Set as a preferred payment method
              </label>
            </div>

            <div className="payment-method media p-3 mb-3">
              <Image
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23ccc'%3E%3C/rect%3E%3C/svg%3E"
                width="40"
                height="40"
                className="mr-2"
                alt=""
              />
              <div className="media-body d-flex align-items-center justify-content-between">
                <div>Kelli.OKon72@yahoo.com</div>
                <div className="font-weight-bold">
                  <button className="payment-method__edit-button btn">
                    <span className="icon icon_name_edit-grey" />
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-outline-primary btn-lg btn-block"
            >
              Add payment method
            </button>
          </div>

          <div className="col">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div className="font-weight-bold">Payment History</div>
              <button type="button" className="btn btn-sm">
                <span className="font-weight-bold text text_view_secondary text-uppercase">
                  Clear history
                </span>
              </button>
            </div>
            {/* style="height: 405px;"*/}
            <div className="overflow-auto">
              <ul className="list-unstyled">
                <li className="media mb-4">
                  <Image
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23ccc'%3E%3C/rect%3E%3C/svg%3E"
                    width="40"
                    height="40"
                    className="mr-2"
                    alt=""
                  />
                  <div className="media-body d-flex align-items-center justify-content-between">
                    <div>
                      <div className="text text_view_secondary text_size_xs">
                        03/01/2020
                      </div>
                      Monthly subscription
                    </div>
                    <div className="font-weight-bold pr-3">$9,99</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePayments;
