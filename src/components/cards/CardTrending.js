import { Image, Col, Row, Card } from 'react-bootstrap';
import Link from 'next/link';
import React, { Component } from 'react';
import { getPhoto, getPreview } from '../../utils/pathUtil';
import Avatar from '@material-ui/core/Avatar';
import FlagIcon from '../../../public/icon/ic_flag.svg';
import { observer } from 'mobx-react';
import { CardStatsWatch, CardStatsLike, CardStatsComment } from './CardStats';
import { TYPE_USER } from '../../constants/API';

@observer
export default class CardTrending extends Component {
  render() {
    return (
      <Col md={6} xl={4} className="mb-5">
        <Card border="light">
          <Card.Body>
            <Row>
              <Col md={2}>
                <Avatar src={getPhoto(this.props.video.social.profile.photo)} />
              </Col>
              <Col className="my-auto">
                <p className="text-dark-label my-auto">
                  {this.props.video.social.profile.name}{' '}
                  {this.props.video.social.profile.last_name}
                </p>
              </Col>
              <Col
                onClick={this.props.complaint}
                className="my-auto d-flex justify-content-end"
                md={2}
              >
                <FlagIcon
                  className="icon-small"
                  fill={
                    this.props.video.lib.complaint
                      ? '#bd392d'
                      : 'rgba(172,170,170,0.4)'
                  }
                />
              </Col>
            </Row>
            <Row className="my-3">
              <Col>
                <h6>{this.props.video.description}</h6>
              </Col>
            </Row>

            <Row>
              <Link href={`/details/${TYPE_USER}?id=${this.props.video.id}`}>
                <Col>
                  <Image
                    className="card-user-video-img"
                    src={getPreview(this.props.video.preview_url)}
                  />
                  <div className="card-play" />
                  <div className="card-info">
                    <CardStatsWatch value={this.props.video.count_watch} />
                    <CardStatsLike value={this.props.video.count_like} />
                    <CardStatsComment value={this.props.video.count_comments} />
                  </div>
                </Col>
              </Link>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}
