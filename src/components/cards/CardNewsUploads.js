import React, { Component } from 'react';
import Link from 'next/link';
import { observer } from 'mobx-react';

import { Image, Col, Row, Card } from 'react-bootstrap';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

import { CardStatsWatch, CardStatsLike, CardStatsComment } from './CardStats';
import { getPreview } from '../../utils/pathUtil';

import styles from '../Card/RemoveItem.module.scss';

@observer
export default class CardNewsUploads extends Component {
  render() {
    let {
      manageble = { isManageble: false, removingNeedsApprove: false },
      removeVideo = () => {},
    } = this.props;

    return (
      <Col>
        <Card border="light">
          <Card.Body style={{ padding: '.5rem' }}>
            <Row>
              <Link href={`/details/news?id=${this.props.item.id}`}>
                <Col>
                  <Image
                    className="card-user-video-img"
                    src={
                      getPreview(this.props.item.preview_url) ||
                      getPreview(this.props.item.video.preview_url)
                    }
                    style={{ height: '87px' }}
                  />
                  <div className="card-play" />
                  <div
                    className="card-info"
                    style={{ bottom: '3px', left: '8px' }}
                  >
                    <CardStatsWatch
                      value={
                        this.props.item.count_watch ||
                        this.props.item.video.count_watch
                      }
                    />
                    <CardStatsLike
                      value={
                        this.props.item.count_like ||
                        this.props.item.video.count_like
                      }
                    />
                    <CardStatsComment
                      value={
                        this.props.item.count_comments ||
                        this.props.item.video.count_comments
                      }
                    />
                  </div>
                </Col>
              </Link>
            </Row>
            <Row style={{ flexDirection: 'column' }}>
              <Col className="my-auto">
                <p
                  className="text-dark-label my-auto"
                  style={{
                    padding: '.5rem 0rem',
                    width: '95%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {this.props.item.social.profile ? this.props.item.title : ''}
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
                    padding: '0rem 0rem .5rem 0rem',
                  }}
                >
                  {this.props.item.description}
                </h6>
              </Col>
            </Row>
          </Card.Body>
          {manageble.isManageble && (
            <div
              style={{ transform: 'translate(6px, -2px)' }}
              onClick={(event) => {
                event.stopPropagation();
                removeVideo();
              }}
              className={styles.card__removeItem}
            >
              {manageble.removingNeedsApprove.includes(this.props.item.id) ? (
                <CheckIcon />
              ) : (
                <ClearIcon />
              )}
            </div>
          )}
        </Card>
      </Col>
    );
  }
}
