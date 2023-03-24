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
import Image from 'next/image';

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
                <Link className="footer__nav-link" href="/">
                  iSabiTV
                </Link>
              </li>
              <li className="footer__nav-item">
                <Link className="footer__nav-link" href="/documents/iSabiTV_TermsOfUse.pdf">
                  Terms of Use
                </Link>
              </li>
              <li className="footer__nav-item">
                <Link className="footer__nav-link" href="/documents/iSabiTV_Privacy_Policy.pdf">
                  Privacy Policy
                </Link>
              </li>
              <li className="footer__nav-item">
                <Link className="footer__nav-link" href="/documents/iSabiTV_Cookie_Policy.pdf">
                  Cookies policy
                </Link>
              </li>
              <li className="footer__nav-item">
                <Link className="footer__nav-link" href="/documents/iSabiTV_GDPR_Policy.pdf">
                  GDPR
                </Link>
              </li>
            </ul>
          </Col>
          <Col xs={6} md={3} xl={2} className="mb-2">
            <ul className="footer__nav list-unstyled">
              <li className="footer__nav-item fw-bold">Browse</li>
              <li className="footer__nav-item">
                <Link
                  className="footer__nav-link"
                  href={`/${PATH_URL_VIDEOS}/${TYPE_FILM}?title=Movies&tag=${MOVIES}`}
                >
                  Movies
                </Link>
              </li>
              <li className="footer__nav-item">
                <Link
                  className="footer__nav-link"
                  href={`/${PATH_URL_VIDEOS}/${TYPE_FILM}?title=TV&tag=${TV}`}
                >
                  TV
                </Link>
              </li>
              <li className="footer__nav-item">
                <Link
                  className="footer__nav-link"
                  href={`/${PATH_URL_VIDEOS}/film?title=${KIDS}%2FAnimations&tag=${TAG_KIDS}`}
                >
                  Kids
                </Link>
              </li>
              <li className="footer__nav-item">
                <Link className="footer__nav-link" href={`/${PATH_URL_VIDEOS}/${TYPE_PODCAST}`}>
                  Podcasts
                </Link>
              </li>
              <li className="footer__nav-item">
                <Link className="footer__nav-link" href={`/${TYPE_NEWS}`}>
                  News
                </Link>
              </li>
            </ul>
          </Col>
          <Col xs={6} md={3} xl={2} className="mb-2">
            <ul className="footer__nav list-unstyled">
              <li className="footer__nav-item fw-bold">Contact Us</li>
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
