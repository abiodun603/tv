import React, { FC } from 'react';
import { Row } from 'react-bootstrap';

import CardPoster from './CardPoster/CardPoster';
import CardTitle from './CardTitle/CardTitle';
import CardMoviesCounter from './CardMoviesCounter/CardMoviesCounter';
import Card from './Card';

import UserBox from '../UserBox/UserBox';
import { ButtonTextGreen } from '../widgets/Button';

import { getPoster, getPhoto } from '../../utils/pathUtil';
import { toCollection } from '../../lib/url/generator';

const CardCollection = ({
  data,
  canSubscribe = false,
  transparent,
  full,
}) => {
  const photo = data?.owner?.photo
  const username = data?.owner?.username

  return (
    <Card url={toCollection(data.id)} transparent={transparent} full={full}>
      <CardPoster imgUrl={getPoster(data.poster)} ratio={16 / 9} />

      <div className="d-flex align-items-center mt-3">
        <UserBox
          avatarUrl={getPhoto(photo)}
          userName={username || 'Dashboard'}
        />
        <CardMoviesCounter count={data.count_video} />
      </div>

      <Row className="mt-3 px-3 justify-content-between align-items-center">
        <CardTitle title={data.title} />
        {canSubscribe && (
          <ButtonTextGreen onClick={(e) => e.preventDefault()}>
            Subscribe
          </ButtonTextGreen>
        )}
      </Row>
    </Card>
  );
};

export default CardCollection;
