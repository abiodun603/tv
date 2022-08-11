import React from 'react';
import { inject, observer } from 'mobx-react';
import Link from 'next/link';
import { CardContest } from './cards/CardContest';

@inject('contests')
@observer
class Contests extends React.Component {
  componentDidMount() {
    this.props.contests.getContests({ _start: 0 });
  }

  loadContests() {
    this.props.contests.getContests();
  }

  render() {
    return (
      <div className="contest-page">
        <div className="contest-page__section container">
          <h1 className="text-center font-weight-bold text text_typography_display-xl mb-4">
            Vote or Rate
          </h1>
          <div className="text text_view_secondary text-center w-50 ml-auto mr-auto mb-5">
            In hac habitasse platea dictumst. Vivamus adipiscing fermentum quam
            volutpat aliquam. Integer et elit eget elit
          </div>

          <h2 className="font-weight-bold text text_typography_headline-xl mb-4">
            Tranding Now
          </h2>

          <div className="contest-page__vote-grid row contest-vote-grid">
            <div className="col-sm-8">
              <div className="contest-card contest-card_size_l">
                <div className="contest-card__media">
                  <img
                    src={`/fake_data/contests/contest-1.png`}
                    className="contest-card__cover rounded"
                    alt=""
                  />
                  <div className="contest-card__ends contest-card__ends_size_l">
                    <div className="contest-card__ends-label">ENDS IN:</div>
                    <div className="contest-card__time">00 : 22 : 43 : 12</div>
                  </div>
                  <div className="contest-card__info d-flex justify-content-between">
                    <div className="contest-card__info-title">
                      <div className="font-weight-bold text text_typography_headline-m mb-1 text-truncate text_view_light">
                        Show the love for cinema
                      </div>
                      <div className="text text_view_light">
                        31 video entries
                      </div>
                    </div>
                    <div className="contest-card__info-action">
                      <Link href="/contest/1">
                        <button
                          type="button"
                          className="btn btn-primary font-weight-bold"
                        >
                          Vote Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <div className="contest-vote-grid__card-s contest-card contest-card_size_s">
                <div className="contest-card__media">
                  <img
                    src={`/fake_data/contests/contest-2.png`}
                    className="contest-card__cover rounded"
                    alt=""
                  />
                  <div className="contest-card__ends contest-card__ends_size_l">
                    <div className="contest-card__ends-label">ENDS IN:</div>
                    <div className="contest-card__time">00 : 22 : 43 : 12</div>
                  </div>
                  <div className="contest-card__info d-flex justify-content-between">
                    <div className="contest-card__info-title">
                      <div className="font-weight-bold text text_typography_subheader-xl mb-1 text-truncate text_view_light">
                        Show the love for cinema
                      </div>
                      <div className="text text_view_light text_size_s">
                        31 video entries
                      </div>
                    </div>
                    <div className="contest-card__info-action">
                      <Link href="/contest/1">
                        <button
                          type="button"
                          className="btn btn-primary btn-sm font-weight-bold"
                        >
                          Vote Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contest-card contest-card_size_s">
                <div className="contest-card__media">
                  <img
                    src={`/fake_data/contests/contest-3.png`}
                    className="contest-card__cover rounded"
                    alt=""
                  />
                  <div className="contest-card__ends contest-card__ends_size_l">
                    <div className="contest-card__ends-label">ENDS IN:</div>
                    <div className="contest-card__time">00 : 22 : 43 : 12</div>
                  </div>
                  <div className="contest-card__info d-flex justify-content-between">
                    <div className="contest-card__info-title">
                      <div className="font-weight-bold text text_typography_subheader-xl mb-1 text-truncate text_view_light">
                        Show the love for cinema
                      </div>
                      <div className="text text_view_light text_size_s">
                        31 video entries
                      </div>
                    </div>
                    <div className="contest-card__info-action">
                      <Link href="/contest/1">
                        <button
                          type="button"
                          className="btn btn-primary btn-sm font-weight-bold"
                        >
                          Vote Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row contest-vote-grid">
            <div className="col-sm-4">
              <div className="contest-vote-grid__card-s contest-card contest-card_size_s">
                <div className="contest-card__media">
                  <img
                    src={`/fake_data/contests/contest-4.png`}
                    className="contest-card__cover rounded"
                    alt=""
                  />
                  <div className="contest-card__ends contest-card__ends_size_l">
                    <div className="contest-card__ends-label">ENDS IN:</div>
                    <div className="contest-card__time">00 : 22 : 43 : 12</div>
                  </div>
                  <div className="contest-card__info d-flex justify-content-between">
                    <div className="contest-card__info-title">
                      <div className="font-weight-bold text text_typography_subheader-xl mb-1 text-truncate text_view_light">
                        Show the love for cinema
                      </div>
                      <div className="text text_view_light text_size_s">
                        31 video entries
                      </div>
                    </div>
                    <div className="contest-card__info-action">
                      <Link href="/contest/1">
                        <button
                          type="button"
                          className="btn btn-primary btn-sm font-weight-bold"
                        >
                          Vote Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contest-card contest-card_size_s">
                <div className="contest-card__media">
                  <img
                    src={`/fake_data/contests/contest-5.png`}
                    className="contest-card__cover rounded"
                    alt=""
                  />
                  <div className="contest-card__ends contest-card__ends_size_l">
                    <div className="contest-card__ends-label">ENDS IN:</div>
                    <div className="contest-card__time">00 : 22 : 43 : 12</div>
                  </div>
                  <div className="contest-card__info d-flex justify-content-between">
                    <div className="contest-card__info-title">
                      <div className="font-weight-bold text text_typography_subheader-xl mb-1 text-truncate text_view_light">
                        Show the love for cinema
                      </div>
                      <div className="text text_view_light text_size_s">
                        31 video entries
                      </div>
                    </div>
                    <div className="contest-card__info-action">
                      <Link href="/contest/1">
                        <button
                          type="button"
                          className="btn btn-primary btn-sm font-weight-bold"
                        >
                          Vote Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-8">
              <div className="contest-card contest-card_size_l">
                <div className="contest-card__media">
                  <img
                    src={`/fake_data/contests/contest-7.png`}
                    className="contest-card__cover rounded"
                    alt=""
                  />
                  <div className="contest-card__ends contest-card__ends_size_l">
                    <div className="contest-card__ends-label">ENDS IN:</div>
                    <div className="contest-card__time">00 : 22 : 43 : 12</div>
                  </div>
                  <div className="contest-card__info d-flex justify-content-between">
                    <div className="contest-card__info-title">
                      <div className="font-weight-bold text text_typography_headline-m mb-1 text-truncate text_view_light">
                        Show the love for cinema
                      </div>
                      <div className="text text_view_light">
                        31 video entries
                      </div>
                    </div>
                    <div className="contest-card__info-action">
                      <Link href="/contest/1">
                        <button
                          type="button"
                          className="btn btn-primary font-weight-bold"
                        >
                          Vote Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                    <span className="icon icon_name_chevron" />
                  </button>
                  <button
                    type="button"
                    className="slider-control__btn slider-control__btn_direction_right btn btn-outline-primary"
                  >
                    <span className="icon icon_name_chevron" />
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
      </div>
    );
  }
}

export default Contests;
