import Image from 'next/image';
import React from 'react';
import { Col } from 'react-bootstrap';

export const MockEmptySpace = ({
  width = 300,
  mainText = 'Nothing Here',
  secondaryText = 'There are is media :(',
}) => {
  return (
    <Col xs="auto" className="mx-auto">
      <Image
        width={width}
        height={300}
        alt=""
        src="/image/img_no_find.png"
        style={{ height: 'auto' }}
      />
      <p className="text-info-title text-center mt-4">{mainText}</p>
      {/* <p className="text-subtitle text-center mt-2">{secondaryText}</p> */}
    </Col>
  );
};
