import { Col, Card, Image, Row } from 'react-bootstrap';
import Link from 'next/link';
import React from 'react';
import { getPoster } from '../../utils/pathUtil';
import { CardStatsWatch, CardStatsLike, CardStatsComment } from './CardStats';
import { TYPE_MUSIC } from '../../constants/API';
import CardPoster from '../Card/CardPoster/CardPoster';
import CardTitle from '../Card/CardTitle/CardTitle';
import CardMeta from '../Card/CardMeta/CardMeta';
import { getTags } from '../../utils/formate';

export default function CardMusic({ video }) {
  return (
    <Col xs={6} xl={3} className="card-user-video">
      <Link href={`/details/${TYPE_MUSIC}?id=${video.id}`}>
        <Card style={{ border: '0px', cursor: 'pointer' }}>
          <CardPoster ratio={0.66} imgUrl={getPoster(video.poster_v)}>
            <div
              className="card-info"
              style={{
                zIndex: '42',
                bottom: '2px',
                left: '2px',
                marginLeft: '0px',
              }}
            >
              <CardStatsWatch value={video.count_watch} />
              <CardStatsLike value={video.count_like} />
              <CardStatsComment value={video.count_comments} />
            </div>
          </CardPoster>
          <div
            className="mt-3"
            style={{
              textOverflow: 'ellipsis',
              maxHeight: '1.25rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            <CardTitle title={video.title} />
          </div>
          <div className="mt-3">
            <CardMeta content={[video.year, getTags(video.tags)]} />
          </div>
        </Card>
      </Link>
    </Col>
  );
}
