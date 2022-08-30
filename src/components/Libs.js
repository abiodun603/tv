import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import { Col, Container, Row, Tab, Nav } from 'react-bootstrap';
import VideoCardGrid from './VideoGrid/VideoCardGrid';

import * as TYPES from '../constants/types';

const Libs = inject('lib')(
  observer((props) => {
    const { isMobile } = props;

    useEffect(() => {
      props.lib.updateFullResumeData();
      loadLibResume(1);
      loadLibCollections();

      return () => props.lib.clearLibData();
    }, []);

    const loadLibWatch = () => {
      props.lib.getLib(TYPES.LIB_WATCH);
    };

    const loadLibHistory = () => {
      props.lib.getLib(TYPES.LIB_HISTORY);
    };

    const loadLibResume = (page) => {
      props.lib.getResume(page);
    };

    const loadLibCollections = () => {
      props.lib.getSubscribedCollecions({});
    };

    const historyData = props.lib.video[TYPES.LIB_HISTORY];
    const watchData = props.lib.video[TYPES.LIB_WATCH];
    const resumeData = props.lib.video[TYPES.LIB_RESUME];
    const subscribedCollectionsData =
      props.lib.video[TYPES.LIB_SUBSCRIBED_COLLECTIONS];

    return (
      <Container className={isMobile ? 'py-3 px-2' : 'py-5 px-5'}>
        <Row className="mb-3">
          <Col>
            <span className="text-title">My Library</span>
          </Col>
          <Col></Col>
        </Row>
        <Tab.Container id="left-tabs-example" defaultActiveKey="history">
          <Row>
            <Col className="tabs__panel">
              <Nav variant="pills" className="tabs__list">
                <Nav.Item className="tab__item">
                  <Nav.Link className="tab__link" eventKey="history">
                    History
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="tab__item">
                  <Nav.Link className="tab__link" eventKey="watch">
                    Watch Later
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="tab__item">
                  <Nav.Link className="tab__link" eventKey="resume">
                    Resume
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="tab__item">
                  <Nav.Link
                    className="tab__link"
                    eventKey="subscibed_collections"
                  >
                    Collections
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
          <Row>
            <Col>
              <Tab.Content>
                <Tab.Pane eventKey="history">
                  <VideoCardGrid
                    data={historyData.media}
                    loading={historyData.loading}
                    hasMore={props.lib.isNextHistory}
                    loadData={loadLibHistory}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="watch">
                  <VideoCardGrid
                    data={watchData.media}
                    loading={watchData.loading}
                    hasMore={props.lib.isNextWatch}
                    loadData={loadLibWatch}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="resume">
                  <VideoCardGrid
                    data={resumeData.media}
                    loading={false}
                    hasMore={props.lib.isNextResume}
                    loadData={loadLibResume}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="subscibed_collections">
                  <VideoCardGrid
                    data={subscribedCollectionsData.media}
                    loading={subscribedCollectionsData.loading}
                    hasMore={props.lib.isNextWatchSubscribedCollections}
                    loadData={loadLibCollections}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    );
  }),
);

export default Libs;
