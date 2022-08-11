import React from 'react';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';

import { Logo } from '../../ui/logo';
import { MOVIES, TV } from '../../../constants/tags';
import {
  PATH_URL_VIDEOS,
  TAG_KIDS,
  TYPE_FILM,
  TYPE_NEWS,
  TYPE_PODCAST,
} from '../../../constants/API';
import { KIDS } from '../../../constants/genres';

const Footer = () => {
  const copyToClipboard = (value) => {
    if (window) {
      navigator.clipboard.writeText(value);
    }
    return;
  };
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col sm={3}>
            <div className="mb-4">
              <Logo size="small" />
            </div>
            <div className="text text_view_secondary">
              Your go-to platform for all your Afrocentric Content
            </div>
          </Col>
          <Col>
            <ul className="footer__nav list-unstyled">
              <li className="footer__nav-item font-weight-bold">About</li>

              <li className="footer__nav-item">
                <Link href="/">
                  <a className="footer__nav-link">iSabiTV</a>
                </Link>
              </li>
              <li className="footer__nav-item">
                <Link href="/documents/iSabiTV_TermsOfUse.pdf">
                  <a className="footer__nav-link">Terms of Use</a>
                </Link>
              </li>
              <li className="footer__nav-item">
                <Link href="/documents/iSabiTV_Privacy_Policy.pdf">
                  <a className="footer__nav-link">Privacy Policy</a>
                </Link>
              </li>
            </ul>
          </Col>
          <Col>
            <ul className="footer__nav list-unstyled">
              <li className="footer__nav-item font-weight-bold">Support</li>
              <li className="footer__nav-item">
                <a
                  href="mailto:support@isabitv.com"
                  // onClick={() => {
                  //   copyToClipboard('support@isabitv.com');
                  // }}
                  className="footer__nav-link"
                >
                  support@isabitv.com
                </a>
              </li>
            </ul>
          </Col>
          <Col>
            <ul className="footer__nav list-unstyled">
              <li className="footer__nav-item font-weight-bold">Browse</li>
              <li className="footer__nav-item">
                <Link
                  href={`/${PATH_URL_VIDEOS}/${TYPE_FILM}?title=Movies&tag=${MOVIES}`}
                >
                  <a className="footer__nav-link">Movies</a>
                </Link>
              </li>
              <li className="footer__nav-item">
                <Link
                  href={`/${PATH_URL_VIDEOS}/${TYPE_FILM}?title=TV&tag=${TV}`}
                >
                  <a className="footer__nav-link">TV</a>
                </Link>
              </li>
              <li className="footer__nav-item">
                <Link
                  href={`/${PATH_URL_VIDEOS}/film?title=${KIDS}%2FAnimations&tag=${TAG_KIDS}`}
                >
                  <a className="footer__nav-link">Kids</a>
                </Link>
              </li>
              <li className="footer__nav-item">
                <Link href={`/${PATH_URL_VIDEOS}/${TYPE_PODCAST}`}>
                  <a className="footer__nav-link">Podcasts</a>
                </Link>
              </li>
              <li className="footer__nav-item">
                <Link href={`/${TYPE_NEWS}`}>
                  <a className="footer__nav-link">News</a>
                </Link>
              </li>
            </ul>
          </Col>
          <Col>
            <ul className="footer__nav list-unstyled">
              <li className="footer__nav-item font-weight-bold">
                Watch on the GO
              </li>
              <li className="footer__nav-item">
                <a href="" className="footer__nav-link">
                  <img
                    src="/image/market/app_store.svg"
                    alt=""
                    className="img-fluid mb-2"
                  />
                </a>
              </li>
              <li className="footer__nav-item">
                <a href="" className="footer__nav-link">
                  <img
                    src="/image/market/app_google.svg"
                    alt=""
                    className="img-fluid"
                  />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <div className="text text_view_secondary">
          © 2021 iSabiTV. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
