import { Image } from 'react-bootstrap';
import React from 'react';

const small = '/logo/logo.png';
const medium = '/logo/logo@2x.png';
const large = '/logo/logo@3x.png';

export default function Logo({ height = 30 }) {
  return (
    <Image
      src={small}
      srcSet={`${small} 300w, ${medium} 768w, ${large} 1280w`}
      height={height}
      className="isabi-logo d-inline-block align-top"
      alt="logo"
    />
  );
}
