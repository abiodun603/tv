import React from 'react';
import Router from 'next/router';
import { inject, observer } from 'mobx-react';

import { Spinner } from 'react-bootstrap';

import ContributorStore from '../../store/contributorStore';
import ProfileStore from '../../store/profileStore';
import UploadStore from '../../store/uploadStore';

import { ContributorProfileInfo } from './ContributorProfileInfo';
import UserContent from '../UserContent/UserContent';

@inject('contributor', 'profile', 'upload')
@observer
export class ContributorPage extends React.Component {
  componentDidMount() {
    const { contributor } = this.props;
    const { id } = Router.query;

    const socialID = Number(id);

    if (socialID) {
      contributor.getProfile(socialID);
    }
  }

  componentWillUnmount() {
    this.props.contributor.clear();
  }

  render() {
    const {
      contributor: { profile },
      profile: {
        profile: { social },
      },
      upload: { allUploads },
    } = this.props;

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
      <div className="container mb-4 mt-5 ">
        <div className="row">
          <div className="col col-sm-3">
            <ContributorProfileInfo
              contributor={this.props.contributor}
              isCurrentUser={isCurrentUser}
            />
          </div>
          <div className="col col-sm-9">
            <UserContent profileId={profile?.social?.id} />
          </div>
        </div>
      </div>
    );
  }
}
