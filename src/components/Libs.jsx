import React from 'react';
import { inject, observer } from 'mobx-react';

import { Col, Container, Row, Tab, Nav } from 'react-bootstrap';
import VideoGrid from './VideoGrid/VideoGrid';

import * as TYPES from '../constants/types';

@inject('lib')
@observer
class Libs extends React.Component {
  constructor(props) {
    super(props);

    this.loadLibWatch = this.loadLibWatch.bind(this);
    this.loadLibHistory = this.loadLibHistory.bind(this);
    this.loadLibResume = this.loadLibResume.bind(this);
    this.loadLibSubScribedCollections = this.loadLibSubScribedCollections.bind(
      this,
    );
  }

  componentDidMount() {
    this.props.lib.updateFullResumeData();
    this.loadLibResume(1);
    this.loadLibSubScribedCollections();
  }
  componentWillUnmount() {
    this.props.lib.clearLibData();
  }

  loadLibWatch() {
    this.props.lib.getLib(TYPES.LIB_WATCH);
  }

  loadLibHistory() {
    this.props.lib.getLib(TYPES.LIB_HISTORY);
  }

  loadLibResume(page) {
    this.props.lib.getResume(page);
  }

  loadLibSubScribedCollections() {
    this.props.lib.getSubscribedCollecions({});
  }

  render() {
    const historyData = this.props.lib.video[TYPES.LIB_HISTORY];
    const watchData = this.props.lib.video[TYPES.LIB_WATCH];
    const resumeData = this.props.lib.video[TYPES.LIB_RESUME];
    const subscribedCollectionsData = this.props.lib.video[
      TYPES.LIB_SUBSCRIBED_COLLECTIONS
    ];

    return (
      <Container className="py-5 px-5">
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
                  <VideoGrid
                    data={historyData.media}
                    loading={historyData.loading}
                    hasMore={this.props.lib.isNextHistory}
                    hasContainer={false}
                    loadData={this.loadLibHistory}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="watch">
                  <VideoGrid
                    data={watchData.media}
                    loading={watchData.loading}
                    hasMore={this.props.lib.isNextWatch}
                    hasContainer={false}
                    loadData={this.loadLibWatch}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="resume">
                  <VideoGrid
                    data={resumeData.media}
                    hasMore={this.props.lib.isNextResume}
                    hasContainer={false}
                    loadData={this.loadLibResume}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="subscibed_collections">
                  <VideoGrid
                    data={subscribedCollectionsData.media}
                    loading={subscribedCollectionsData.loading}
                    hasMore={this.props.lib.isNextWatchSubscribedCollections}
                    hasContainer={false}
                    loadData={this.loadLibSubscribedCollections}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    );
  }
}

export default Libs;
