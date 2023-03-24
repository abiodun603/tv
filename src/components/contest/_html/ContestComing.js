import React from 'react';
import { inject, observer } from 'mobx-react';
import Image from 'next/image';

@inject('contests')
@observer
class ContestComing extends React.Component {
  componentDidMount() {
    this.props.contests.getComming({ _start: 0 });
  }

  render() {
    return (
      <div className="contest-page">
        <div className="contest-header">
          <div className="container">
            <div className="contest-header__row row">
              <div className="contest-header__body-col col">
                <h1 className="font-weight-bold text text_typography_display-xl mb-4">
                  Show the love for cinema
                  <span className="contest-header__time-badge">
                    Coming Soon!
                  </span>
                </h1>
                <div className="contest-header__description text text_view_secondary">
                  Vestibulum rutrum quam vitae fringilla tincidunt. Suspendisse
                  nec tortor urna. Ut laoreet sodales nisi, quis iaculis nulla
                  iaculis vitae. Donec sagittis faucibus lacus eget blandit.
                  Mauris vitae ultricies metus, at condimentum nulla. Donec quis
                  ornare lacus. Etiam gravida mollis tortor quis porttitor.
                </div>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-primary btn-block btn_view_action"
                    type="button"
                  >
                    Notify me
                  </button>
                </div>
              </div>
              <div className="col">
                <div className="contest-promo">
                  <Image
                    src="/fake_data/contest-promo__image.jpg"
                    alt=""
                    className="contest-promo__image img-fluid"
                  />
                  <div className="contest-promo__label">
                    <div className="contest-promo__label-overline">
                      Start Date
                    </div>
                    <div className="font-weight-bold text text_typography_headline-xl">
                      September 21, 2020
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="contest-page__section container">
          <h2 className="font-weight-bold text text_typography_headline-xl mb-4">
            Rules & Info
          </h2>
          <p className="text text_view_secondary">
            Vestibulum rutrum quam vitae fringilla tincidunt. Suspendisse nec
            tortor urna. Ut laoreet sodales nisi, quis iaculis nulla iaculis
            vitae. Donec sagittis faucibus lacus eget blandit. Mauris vitae
            ultricies metus, at condimentum nulla. Donec quis ornare lacus.
            Etiam gravida mollis tortor quis porttitor.
          </p>
          <strong>Rules:</strong>
          <ol className="text text_view_secondary">
            <li>Nam tempus vel odio vitae aliquam.</li>
            <li>
              In imperdiet eros id lacus vestibulum vestibulum. Suspendisse
              fermentum sem sagittis
            </li>
            <li>
              Ante venenatis egestas quis vel justo. In imperdiet eros id lacus
              vestibulum vestibulum. Suspendisse fermentum sem sagittis
            </li>
            <li>
              Maecenas semper suscipit nunc, sed aliquam sapien convallis eu
            </li>
          </ol>
          <p className="text text_view_secondary">
            Nulla ut turpis in diam dapibus consequat!
          </p>
          <button
            className="btn btn-primary btn-block btn_view_action"
            type="button"
          >
            Enter Contest
          </button>
        </div>

        <div className="contest-page__section contest-page__section_light">
          <div className="container">
            <div className="row mb-4">
              <div className="col">
                <h2 className="font-weight-bold text text_typography_headline-xl">
                  More Contests
                </h2>
              </div>
              <div className="col">
                <div className="slider-control">
                  <button
                    type="button"
                    className="slider-control__btn slider-control__btn_direction_left btn btn-outline-primary"
                    disabled
                  >
                    <span className="icon icon_name_chevron"></span>
                  </button>
                  <button
                    type="button"
                    className="slider-control__btn slider-control__btn_direction_right btn btn-outline-primary"
                  >
                    <span className="icon icon_name_chevron"></span>
                  </button>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="contest-card col">
                <div className="contest-card__media mb-3">
                  <Image
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23ccc'%3E%3C/rect%3E%3C/svg%3E"
                    className="contest-card__cover rounded"
                    alt=""
                  />
                  <div className="contest-card__ends">
                    <div className="contest-card__ends-label">ENDS IN:</div>
                    <div className="contest-card__time">00 : 22 : 43 : 12</div>
                  </div>
                  <div className="contest-card__voting">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm font-weight-bold"
                    >
                      Vote Now
                    </button>
                  </div>
                </div>
                <div className="font-weight-bold text text_typography_headline-m mb-2 text-truncate">
                  Show the love for cinema
                </div>
                <div className="text text_view_secondary">
                  100 video entries
                </div>
              </div>

              <div className="contest-card col">
                <div className="contest-card__media mb-3">
                  <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23ccc'%3E%3C/rect%3E%3C/svg%3E"
                    className="contest-card__cover rounded"
                    alt=""
                  />
                  <div className="contest-card__ends">
                    <div className="contest-card__ends-label">ENDS IN:</div>
                    <div className="contest-card__time">00 : 22 : 43 : 12</div>
                  </div>
                  <div className="contest-card__voting">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm font-weight-bold"
                    >
                      Vote Now
                    </button>
                  </div>
                </div>
                <div className="font-weight-bold text text_typography_headline-m mb-2 text-truncate">
                  Show the love for cinema
                </div>
                <div className="text text_view_secondary">
                  100 video entries
                </div>
              </div>

              <div className="contest-card col">
                <div className="contest-card__media mb-3">
                  <Image
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23ccc'%3E%3C/rect%3E%3C/svg%3E"
                    className="contest-card__cover rounded"
                    alt=""
                  />
                  <div className="contest-card__ends">
                    <div className="contest-card__ends-label">ENDS IN:</div>
                    <div className="contest-card__time">00 : 22 : 43 : 12</div>
                  </div>
                  <div className="contest-card__voting">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm font-weight-bold"
                    >
                      Vote Now
                    </button>
                  </div>
                </div>
                <div className="font-weight-bold text text_typography_headline-m mb-2 text-truncate">
                  Show the love for cinema
                </div>
                <div className="text text_view_secondary">
                  100 video entries
                </div>
              </div>

              <div className="contest-card col">
                <div className="contest-card__media mb-3">
                  <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='%23ccc'%3E%3C/rect%3E%3C/svg%3E"
                    className="contest-card__cover rounded"
                    alt=""
                  />
                  <div className="contest-card__ends">
                    <div className="contest-card__ends-label">ENDS IN:</div>
                    <div className="contest-card__time">00 : 22 : 43 : 12</div>
                  </div>
                  <div className="contest-card__voting">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm font-weight-bold"
                    >
                      Vote Now
                    </button>
                  </div>
                </div>
                <div className="font-weight-bold text text_typography_headline-m mb-2 text-truncate">
                  Show the love for cinema
                </div>
                <div className="text text_view_secondary">
                  100 video entries
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContestComing;
