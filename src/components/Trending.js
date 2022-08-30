import { Col, Container, Row, Spinner } from 'react-bootstrap';
import React, { useEffect } from 'react';
import CardTrending from './cards/CardTrending';
import { inject, observer } from 'mobx-react';
import { ButtonTextGreen } from './widgets/Button';

const Trending = inject('trending')(
  observer((props) => {
    useEffect(() => {
      props.trending.getTrending();
    }, []);

    return (
      <div className="bg-light-gray">
        <Container>
          <Row className="justify-content-center py-5">
            <Col sm={5} className="text-center mt-3">
              <h1 className="text-dark-label">Trending</h1>
              <p className="text-subtitle mt-3">
                In hac habitasse platea dictumst. Vivamus adipiscing fermentum
                quam volutpat aliquam. Integer et elit eget elit
              </p>
            </Col>
          </Row>
          <Row>
            {props.trending.media.map((item, key) => (
              <CardTrending
                complaint={() => props.trending.complaintByVideo(key)}
                key={key}
                video={item}
              />
            ))}
            {props.trending.loading ? (
              <Spinner
                animation="border"
                variant="success"
                className="m-auto"
              />
            ) : (
              ``
            )}
          </Row>
          {props.trending.isNext ? (
            <Row>
              <Col className="text-center my-5">
                <ButtonTextGreen onClick={props.trending.getTrending}>
                  Show more
                </ButtonTextGreen>
              </Col>
            </Row>
          ) : (
            ``
          )}
        </Container>
      </div>
    );
  }),
);

export default Trending;
