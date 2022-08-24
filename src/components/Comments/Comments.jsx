import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import {
  Avatar,
  FormHelperText,
  FormControl,
  IconButton,
  TextField,
} from '@material-ui/core';

import { getPhoto } from '../../utils/pathUtil';
import { Comment } from './Comment';
import MessageIcon from '../../../public/icon/ic_message.svg';
import { ButtonTextGreen } from '../widgets/Button';

const Comments = inject(
  'video',
  'profile',
)(
  observer((props) => {
    useEffect(() => {
      getCommentsData();

      return () => props.video.clearComments();
    }, [props.id]);

    const getCommentsData = () => {
      props.video.clearComments();
      props.video.getComments(props.id);
    };

    const { video, profile: profileStore } = props;

    return (
      <Container className="px-0">
        <Row>
          <Col>
            <h5 className="text-dark">Comments</h5>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col sm="auto">
            <Avatar alt="photo" src={getPhoto(profileStore.profile.photo)} />
          </Col>
          <Col>
            <FormControl fullWidth variant="outlined">
              <TextField
                multiline
                variant="outlined"
                value={video.comment.value}
                onChange={(event) => {
                  video.setComment(event.target.value);
                }}
                onKeyPress={(event) => {
                  if (event.shiftKey && event.key == 'Enter') {
                    video.createComment(profileStore.profile, props.id);
                  }
                }}
              />
              <FormHelperText>must be at least 10 characters</FormHelperText>
            </FormControl>
          </Col>
          <Col sm="auto">
            <IconButton
              onClick={(e) =>
                video.createComment(profileStore.profile, props.id)
              }
            >
              <MessageIcon />
            </IconButton>
          </Col>
        </Row>

        {video.comments.data.map((item) => (
          <Comment key={item.id} comment={item} />
        ))}

        {video.comments.hasMore ? (
          <Row>
            <Col className="text-center my-3">
              {video.loading.comments ? (
                <Spinner animation="border" variant="success" />
              ) : (
                <ButtonTextGreen onClick={() => video.getComments(props.id)}>
                  Show more
                </ButtonTextGreen>
              )}
            </Col>
          </Row>
        ) : (
          <div />
        )}
      </Container>
    );
  }),
);

export { Comments };
