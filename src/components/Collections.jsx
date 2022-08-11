import React from 'react';
import { inject, observer } from 'mobx-react';

import { Col, Container, Row } from 'react-bootstrap';

import CardCollection from './Card/CardCollection';
import { ShowMore } from './list/show-more';

@inject('collections')
@observer
class Collections extends React.Component {
  componentDidMount() {
    this.loadCollections();
  }

  loadCollections() {
    this.props.collections.getCollections();
  }

  render() {
    const {
      collections: { collections },
    } = this.props;

    return (
      <Container className="bg-light-gray mb-5 pt-4 pb-4 py-5 px-5">
        <div className="row mb-3">
          <div className="mb-4 col">
            <span className="text-title">Collections</span>
          </div>
        </div>
        <Row>
          {collections.media.map((item) => (
            <Col xs={12} md={3} className="mb-4" key={item.id}>
              <CardCollection data={item} />
            </Col>
          ))}
        </Row>

        {collections.hasMore && (
          <ShowMore onClick={() => this.loadCollections()} />
        )}
      </Container>
    );
  }
}

export default Collections;
