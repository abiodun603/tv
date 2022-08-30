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
          <Col xs={12} xl={3} className="mb-2">
            <div className="mb-2">
              <Logo size="small" />
            </div>
            <div className="text text_view_secondary mb-4">
              Your go-to platform for all your Afrocentric Content
            </div>
          </Col>
          <Col xs={6} md={3} xl={2} className="mb-2">
            <ul className="footer__nav list-unstyled">
              <li className="footer__nav-item fw-bold">About</li>

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
          <Col xs={6} md={3} xl={2} className="mb-2">
            <ul className="footer__nav list-unstyled">
              <li className="footer__nav-item fw-bold">Browse</li>
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
          <Col xs={6} md={3} xl={2} className="mb-2">
            <ul className="footer__nav list-unstyled">
              <li className="footer__nav-item fw-bold">Support</li>
              <li className="footer__nav-item">
                <a
                  href="mailto:support@isabitv.com"
                  className="footer__nav-link text-break"
                >
                  support@isabitv.com
                </a>
              </li>
            </ul>
          </Col>
          <Col xs={6} md={3} xl={2} className="mb-2">
            <ul className="footer__nav list-unstyled">
              <li className="footer__nav-item fw-bold">Watch on the GO</li>
              <li className="footer__nav-item">
                <Link
                  href="https://apps.apple.com/us/app/isabitv/id1522221735"
                  className="footer__nav-link"
                >
                  <img
                    src="/image/market/app_store.svg"
                    alt=""
                    className="img-fluid mb-2"
                  />
                </Link>
              </li>
              <li className="footer__nav-item">
                <Link
                  href="https://play.google.com/store/apps/details?id=com.rvtech.iSabiTV"
                  className="footer__nav-link"
                >
                  <img
                    src="/image/market/app_google.svg"
                    alt=""
                    className="img-fluid"
                  />
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
        <div className="text text_view_secondary mt-4">
          © 2021 iSabiTV. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
