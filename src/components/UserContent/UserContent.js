import React from 'react';
import { inject, observer } from 'mobx-react';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';

import VideoGrid from '../VideoGrid/VideoGrid';

import UserUploadStore from '../../store/userUploadStore';

@inject('userUpload')
@observer
class UserContent extends React.Component {
  state = {
    uploadLoading: false,
  };
  constructor(props) {
    super(props);

    this.getUploads = this.getUploads.bind(this);
    this.getNews = this.getNews.bind(this);
  }

  componentWillUnmount() {
    this.props.userUpload.clearUploads();
  }

  getUploads() {
    this.setState({ uploadLoading: true });

    this.props.userUpload
      .getAllUploads({
        social: this.props.profileId,
      })
      .then(() => {
        this.setState({
          uploadLoading: false,
        });
      })
      .catch(() => {
        this.setState({ uploadLoading: false });
      });
  }
  getNews() {
    this.setState({ uploadLoading: true });

    this.props.userUpload
      .getUserNews({
        social: this.props.profileId,
      })
      .then(() => {
        this.setState({
          uploadLoading: false,
        });
      })
      .catch(() => {
        this.setState({ uploadLoading: false });
      });
  }

  render() {
    const { uploadLoading } = this.state;

    const { allUploads, allNews } = this.props.userUpload;

    return (
      <Container>
        <Row>
          <Col>
            <Tabs defaultActiveKey="alluploads">
              <Tab eventKey="alluploads" title="All Uploads">
                <Container className="mt-5">
                  <VideoGrid
                    data={allUploads.data}
                    loading={uploadLoading}
                    hasMore={allUploads.hasMore}
                    loadData={this.getUploads}
                    manageble
                    needRefresh
                    isUpload
                    profileId={this.props.profileId}
                    isFromALlUploads={true}
                  />
                </Container>
              </Tab>
              <Tab eventKey="news" title="News">
                <Container className="mt-5">
                  <VideoGrid
                    data={allNews.data}
                    loading={uploadLoading}
                    hasMore={allNews.hasMore}
                    loadData={this.getNews}
                    manageble
                    needRefresh
                    isUpload
                  />
                </Container>
              </Tab>
              <Tab eventKey="contests" title="Contests" disabled />
            </Tabs>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UserContent;
