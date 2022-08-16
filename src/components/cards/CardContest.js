import React from 'react';
import Link from 'next/link';

import { Col, Image, Row } from 'react-bootstrap';

import { CardTime } from './CardTime';

import { getPoster } from '../../utils/pathUtil';

import * as urlGenerator from '../../lib/url/generator';

export function CardContestHome({ contest }) {
  return (
    <Col xs={12} md={3} className="mb-4">
      <Row>
        <Link href={urlGenerator.toContest()}>
          <Col>
            <Image className="card-contest" src={getPoster(contest.poster)} />
            <div className="card-time">
              <CardTime value={contest.stop_time} />
            </div>
          </Col>
        </Link>
      </Row>
      <h4 className="text-dark mt-3 text-truncate">{contest.title}</h4>
      <h6 className="text-select mt-2">{contest.count} video entries</h6>
    </Col>
  );
}

export function CardContest({ item }) {
  return (
    <div className="contest-card col mb-4">
      <div className="contest-card__media mb-3">
        <img
          src={item.image.url}
          className="contest-card__cover rounded"
          alt=""
        />
        <div className="contest-card__ends">
          <div className="contest-card__ends-label">ENDS IN:</div>
          <div className="contest-card__time">00 : 22 : 43 : 12</div>
        </div>
        <div className="contest-card__voting">
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
      <div className="font-weight-bold text text_typography_headline-m mb-2 text-truncate">
        Show the love for cinema
      </div>
      <div className="text text_view_secondary">100 video entries</div>
    </div>
  );
}
