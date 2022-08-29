import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import { Col, Container, Row } from 'react-bootstrap';

import CardCollection from './Card/CardCollection';
import { ShowMore } from './list/show-more';
import { MockEmptySpace } from './mock/MockEmptySpace';

const Collections = inject('collections')(
  observer((props) => {
    useEffect(() => {
      loadCollections();
    }, []);

    const loadCollections = () => props.collections.getCollections();
    const {
      collections: { collections },
    } = props;

    return (
      <Container className="bg-light-gray mb-5 pt-4 pb-4 py-5">
        <div className="row mb-3">
          <div className="mb-4 col">
            <span className="text-title">Collections</span>
          </div>
        </div>
        <Row>
          {collections.media.length === 0 ? (
            <MockEmptySpace width={250} />
          ) : (
            <>
              {collections.media.map((item) => (
                <Col xs={6} xl={3} className="mb-4" key={item.id}>
                  <CardCollection data={item} />
                </Col>
              ))}
            </>
          )}
        </Row>

        {collections.hasMore && <ShowMore onClick={() => loadCollections()} />}
      </Container>
    );
  }),
);
export default Collections;
