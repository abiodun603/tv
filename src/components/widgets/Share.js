import React from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';
import { NAME_APP } from '../../constants/base';

export function Share({ isVert = true }) {
  return (
    <div
      className={`d-flex align-items-baseline container ${
        isVert ? 'flex-column mt-2' : 'ml-4'
      }`}
      style={{ fontFamily: "'Roboto',sans-serif" }}
    >
      <div className="row mb-2">
        <TwitterShareButton url={window.location.href} title={NAME_APP}>
          <TwitterIcon size={30} round />
          <span> Twitter</span>
        </TwitterShareButton>
      </div>
      <div className="row mb-2">
        <FacebookShareButton url={window.location.href} quote={NAME_APP}>
          <FacebookIcon size={30} round />
          <span> Facebook</span>
        </FacebookShareButton>
      </div>
      <div className="row mb-2">
        <EmailShareButton url={window.location.href} subject={NAME_APP}>
          <EmailIcon size={30} round />
          <span> E-mail</span>
        </EmailShareButton>
      </div>
    </div>
  );
}
