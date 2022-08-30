import { Image, Col, Row, Card } from 'react-bootstrap';
import Link from 'next/link';
import React, { Component } from 'react';
import { getPhoto, getPreview } from '../../utils/pathUtil';
import Avatar from '@material-ui/core/Avatar';
import FlagIcon from '../../../public/icon/ic_flag.svg';
import { observer } from 'mobx-react';
import { CardStatsWatch, CardStatsLike, CardStatsComment } from './CardStats';

@observer
export default class CardNews extends Component {
  render() {
    return (
      <Col>
        <Card border="light">
          <Card.Body style={{ padding: '.5rem' }}>
            <Row style={{ flexDirection: 'column' }}>
              <Col className="my-auto d-flex ">
                <Avatar
                  src={
                    this.props.item?.video.social.profile
                      ? getPhoto(this.props.item?.video?.social.profile.photo)
                      : ''
                  }
                />
                <p className="text-dark-label my-auto mx-2">
                  {this.props.item?.video.social.profile
                    ? this.props.item.video.social.profile.name
                    : ''}{' '}
                  {this.props.item?.video.social.profile
                    ? this.props.item?.video.social.profile.last_name
                    : ''}
                </p>
              </Col>
            </Row>
            <Row>
              <Col style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h6
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: '100%',
                    margin: '10px 0px',
                  }}
                >
                  {this.props.item.video.description}
                </h6>
                <FlagIcon
                  // onClick={this.props.item.video.lib.complaint}
                  className="my-auto d-flex justify-content-end icon-small"
                  fill={
                    this.props.item.video.lib.complaint
                      ? '#bd392d'
                      : 'rgba(172,170,170,0.4)'
                  }
                />
              </Col>
            </Row>

            <Row>
              <Link href={`/details/news?id=${this.props.item.video.id}`}>
                <Col className="position-relative">
                  <Image
                    className="card-user-video-img"
                    src={getPreview(this.props.item.video.preview_url)}
                  />
                  <div className="card-play" />
                  <div className="card-info">
                    <CardStatsWatch value={this.props.item.video.count_watch} />
                    <CardStatsLike value={this.props.item.video.count_like} />
                    <CardStatsComment
                      value={this.props.item.video.count_comments}
                    />
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
