import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import { Image } from 'react-bootstrap';

import * as url from '../../../lib/url/generator';

import css from './logo.module.scss';

const small = '/logo/logo.png';
const medium = '/logo/logo@2x.png';
const large = '/logo/logo@3x.png';

export const Logo = ({ height, size = 'medium', pageUrl = '' }) => {
  return (
    <Link href={pageUrl || url.toHome()}>
        <Image
          src={small}
          srcSet={`${small} 300w, ${medium} 768w, ${large} 1280w`}
          height={height}
          className={classNames('d-inline-block align-top', css.logo, {
            [css.size_s]: size === 'small',
            [css.size_l]: size === 'large',
          })}
          alt="logo"
        />
    </Link>
  );
};
