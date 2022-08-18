import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Tab, Tabs } from 'react-bootstrap';
import { Container } from '@material-ui/core';

import VideoGrid from '../VideoGrid/VideoGrid';

const UserContent = inject('userUpload')(
  observer((props) => {
    const [uploadLoading, setUploadLoading] = useState(false);
    const { allUploads, allNews } = props.userUpload;

    useEffect(() => {
      return () => props.userUpload.clearUploads();
    }, []);

    const clearData = () => {
      props.userUpload.clearUploads();
    };
    const getUploads = () => {
      setUploadLoading(true);

      props.userUpload
        .getAllUploads({
          social: props.profileId,
        })
        .then(() => {
          setUploadLoading(false);
        })
        .catch(() => {
          setUploadLoading(false);
        });
    };

    const getNews = () => {
      setUploadLoading(true);

      props.userUpload
        .getUserNews({
          social: props.profileId,
        })
        .then(() => {
          setUploadLoading(false);
        })
        .catch(() => {
          setUploadLoading(false);
        });
    };

    return (
      <Tabs defaultActiveKey="alluploads">
        <Tab eventKey="alluploads" title="All Uploads">
          <Container className="mt-5">
            <VideoGrid
              data={allUploads.data}
              loading={uploadLoading}
              hasMore={allUploads.hasMore}
              loadData={getUploads}
              clearData={clearData}
              manageble
              needRefresh
              isUpload
              profileId={props.profileId}
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
              loadData={getNews}
              clearData={clearData}
              manageble
              needRefresh
              isUpload
            />
          </Container>
        </Tab>
        <Tab eventKey="contests" title="Contests" disabled />
      </Tabs>
    );
  }),
);

export default UserContent;
