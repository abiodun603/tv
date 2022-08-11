import { Col, Row } from 'react-bootstrap';
import React from 'react';
import { getPhoto } from '../../utils/pathUtil';
import Avatar from '@material-ui/core/Avatar';
import { getDate } from '../../utils/formate';

export const Comment = ({ comment }) => {
  return (
    <Row className="mt-4">
      <Col sm="auto">
        <Avatar alt="photo" src={getPhoto(comment.social.profile.photo)} />
      </Col>
      <Col>
        <h5 className="text-break text-dark-label m-0">
          {comment.social.profile.name}
        </h5>
        {comment.message.split(/\n/).map((paragraph, index) => (
          <p key={index} className="text-break m-0 pt-1">{paragraph}</p>
        ))}
      </Col>
      <Col sm="auto">
        <p className="text-break m-0 pt-1">{getDate(comment.created_at)}</p>
      </Col>
    </Row>
  );
}
