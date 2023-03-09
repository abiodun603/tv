import React from 'react';
import { inject, observer } from 'mobx-react';
import { CardContest } from './cards/CardContest';
import CardContestItem from './cards/CardContestItem';
import Image from 'next/image';

@inject('contests')
@observer
class Contest extends React.Component {
  componentDidMount() {
    this.props.contests.getContests({ _start: 0 });
  }

  // loadContests() {
  //   this.props.contests.getContests()
  // }

  render() {
    return (
      <div className="contest-page">
        <div className="contest-header">
          <div className="container">
            <div className="contest-header__row row">
              <div className="contest-header__body-col col">
                <h1 className="font-weight-bold text text_typography_display-xl mb-4">
                  Show the love for cinema
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
                    Vote Now
                  </button>
                  <div className="ml-4 contest-header__keep-posted d-flex align-items-center">
                    <label
                      htmlFor="customSwitch1"
                      className="mr-3 mb-0 text text_view_secondary"
                    >
                      Keep me posted
                    </label>
                    <div className="custom-control custom-switch">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customSwitch1"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customSwitch1"
                      >
                        <span className="sr-only">Keep me posted</span>
                      </label>
                    </div>
                  </div>
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
                    <Image
                      src="/fake_data/contest-promo__counter.png"
                      alt=""
                      className="contest-promo__counter"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="contest-page__section container">
          <div className="row mb-4">
            <div className="col">
              <h2 className="font-weight-bold text text_typography_headline-xl">
                Vote for entries
              </h2>
            </div>
            <div className="col">
              <div className="text-center font-weight-bold">
                <a href="" className="link link_view_default">
                  Show More
                  <span className="text text_view_secondary">6</span>
                </a>
              </div>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
            {this.props.contests.contests.media.slice(12).map((item, index) => (
              <CardContestItem item={item} key={`contest-item-${index}`} />
            ))}
          </div>
        </div>

        <div className="contest-page__section contest-page__section_light">
          <div className="container">
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
                Ante venenatis egestas quis vel justo. In imperdiet eros id
                lacus vestibulum vestibulum. Suspendisse fermentum sem sagittis
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
              Vote Now
            </button>
          </div>
        </div>

        <div className="contest-page__section container">
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
            {this.props.contests.contests.media
              .slice(6, 10)
              .map((item, index) => (
                <CardContest item={item} key={`more-contests-${index}`} />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Contest;
