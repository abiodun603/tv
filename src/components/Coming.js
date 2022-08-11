import { Col, Container, Row } from 'react-bootstrap';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { SkeletonVertical } from './widgets/Skeletons';
import CardComings from './Card/CardComings';
import { PARAM_LIMIT_LARGE } from '../constants/API';
import { ButtonTextGreen } from './widgets/Button';

@inject('coming')
@observer
class Coming extends React.Component {
  componentDidMount() {
    this.props.coming.getVideo(false, {});
  }

  componentWillUnmount() {
    this.props.coming.clearComingData();
  }

  loadComings() {
    this.props.coming.getVideo(true, {});
  }

  render() {
    const videos = this.props.coming.comings;

    return (
      <div className="bg-light-gray">
        <Container className={`py-5 px-5`}>
          <Row>
            <div className="col mb-4">
              <span className="text-title">Coming Soon</span>
            </div>
          </Row>
          <Row>
            {!videos.loading
              ? videos.media.map((item, key) => (
                  <Col className="mb-3" key={key} xs="2">
                    <CardComings video={item} full />
                  </Col>
                ))
              : Array(PARAM_LIMIT_LARGE)
                  .fill(0)
                  .map((item, key) => <SkeletonVertical key={key} />)}
          </Row>
          <div className="row">
            <div className="col text-center my-5">
              {videos.hasMore && (
                <ButtonTextGreen
                  onClick={() => {
                    this.loadComings();
                  }}
                >
                  Show more
                </ButtonTextGreen>
              )}
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default Coming;
