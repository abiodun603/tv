import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

import Logo from '../src/components/widgets/Logo';

import style from '../styles/mobile.module.css';

export default function Mobile() {
  return (
    <Container fluid className={`${style.jumbotron_market} h-100 py-5`}>
      <Row className="d-flex justify-content-center">
        <Col xs="auto">
          <Logo height={80} />
        </Col>
      </Row>

      <Row className="mt-5 h-75">
        <Col xs="auto" className="m-auto">
          <div>
            <a href="https://play.google.com/store?hl=ru">
              <Image
                width={250}
                className="mt-3"
                src="/image/market/app_google.svg"
              />
            </a>
          </div>
          <div>
            <a href="https://apps.apple.com/">
              <Image
                width={250}
                className=" mt-3"
                src="/image/market/app_store.svg"
              />
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
