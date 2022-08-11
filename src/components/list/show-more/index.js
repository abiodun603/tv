import React from 'react';
import { Col, Row } from 'react-bootstrap';

import { ButtonTextGreen } from '../../widgets/Button';

export const ShowMore = ({ onClick }) => {
  return (
    <Row>
      <Col className="text-center my-5">
        <ButtonTextGreen onClick={onClick}>Show more</ButtonTextGreen>
      </Col>
    </Row>
  );
};
