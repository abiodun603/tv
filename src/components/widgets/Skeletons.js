import { Col } from 'react-bootstrap';
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export function SkeletonHorizontal({ isMobile }) {
  return (
    <Col>
      <Skeleton
        animation="wave"
        variant="rect"
        height={150}
        style={{ borderRadius: '0.25rem 0.25rem 0rem 0rem' }}
      />
      <Skeleton className="mt-1" animation="wave" variant="rect" />
      <Skeleton
        className="mt-1"
        animation="wave"
        variant="rect"
        width={65}
        style={{ borderRadius: '0rem 0rem 0.25rem 0.25rem' }}
      />
    </Col>
  );
}
export function SkeletonHorizontalCollection() {
  return (
    <Col>
      <Skeleton
        animation="wave"
        variant="rect"
        height={150}
        style={{ borderRadius: '0.25rem 0.25rem 0rem 0rem' }}
      />
      <Skeleton
        className="mt-3"
        height={40.99}
        animation="wave"
        variant="rect"
      />
      <Skeleton
        className="mt-3 mb-4 col-md-3"
        width={130}
        height={30}
        animation="wave"
        variant="rect"
        style={{ borderRadius: '0rem 0rem 0.25rem 0.25rem' }}
      />
    </Col>
  );
}

export function SkeletonVertical() {
  return (
    <Col>
      <Skeleton
        animation="wave"
        variant="rect"
        height={240}
        style={{ borderRadius: '0.25rem 0.25rem 0rem 0rem' }}
      />
      <Skeleton className="mt-3" animation="wave" variant="rect" />
      <Skeleton
        className="mt-3"
        animation="wave"
        variant="rect"
        width={65}
        style={{ borderRadius: '0rem 0rem 0.25rem 0.25rem' }}
      />
    </Col>
  );
}
