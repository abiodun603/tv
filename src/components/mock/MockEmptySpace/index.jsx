import React from 'react';
import { Col, Image } from 'react-bootstrap';

export const MockEmptySpace = ({
  width = 300,
  mainText = 'Nothing Here',
  secondaryText = 'There are is media :(',
}) => {
  return (
    <Col sm="auto" className="mx-auto">
      <Image width={width} src="../image/img_no_find.png" />
      <p className="text-info-title text-center mt-4">{mainText}</p>
      {/* <p className="text-subtitle text-center mt-2">{secondaryText}</p> */}
    </Col>
  );
};
