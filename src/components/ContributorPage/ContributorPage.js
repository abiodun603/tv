import React, { useEffect } from 'react';
import Router from 'next/router';
import { inject, observer } from 'mobx-react';

import { Spinner, Row, Col, Container } from 'react-bootstrap';

import { ContributorProfileInfo } from './ContributorProfileInfo';
import UserContent from '../UserContent/UserContent';

export const ContributorPage = inject(
  'contributor',
  'profile',
  'upload',
)(
  observer((props) => {
    const socialID = Number(Router.query.id);
    const { contributor, isMobile } = props;

    useEffect(() => {
      if (socialID) {
        contributor.getProfile(socialID);
      }

      return () => contributor.clear();
    }, []);

    const {
      contributor: { profile },
      profile: {
        profile: { social },
      },
      upload: { allUploads },
    } = props;

    const isCurrentUser = profile?.social?.id === social?.id;

    if (!profile) {
      return (
        <div
          style={{
            minHeight: '330px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spinner animation="border" variant="success" />
        </div>
      );
    }

    return (
      <Container className={`mb-4 ${isMobile ? 'mt-3' : 'mt-5'}`}>
        <Row>
          <Col md={12} xl={3}>
            <ContributorProfileInfo
              contributor={contributor}
              isCurrentUser={isCurrentUser}
            />
          </Col>
          <Col md={12} xl={9}>
            <UserContent profileId={profile?.social?.id} />
          </Col>
        </Row>
      </Container>
    );
  }),
);
