import React, { useState, useCallback, useEffect } from 'react';
import { Button, IconButton } from '@material-ui/core';
import {
  IoIosBookmark,
  IoIosThumbsUp,
  IoIosPlay,
  IoMdCloudDownload,
} from 'react-icons/io';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Col, Container, Row, OverlayTrigger, Popover } from 'react-bootstrap';

import style from './DetailsControl.module.css';

import ShareIcon from '../../../../public/icon/ic_share.svg';
import { CardStatsWatchDetails } from '../../cards/CardStats';
import { Complaint } from '../../Complaint/Complaint';
import { Share } from '../../widgets/Share';
import { toggleWatchLater } from '../../../utils/Networker/watchLater';

import FileSaver from 'file-saver';
import { COMING_SOON, USER } from '../../../constants/types';

import { PATH_URL_LIB_COMPLAINT } from '../../../constants/API';
import http from '../../../api/axiosApi';
import cookies from 'js-cookie';

export const DetailsControls = (props) => {
  const {
    viewsCount,
    likesCount,
    setLike,
    removeLike,
    isLike,
    isWatchLater,
    hasTrailer,
    openTrailer = () => {},
    pageType = 'prof_and_user',
    video,
  } = props;

  const [watched, setWatched] = useState(isWatchLater);
  const [complaint, setComplaint] = useState(false);

  useEffect(() => {
    setComplaint(video.lib.complaint);
  }, [video.lib.complaint]);

  useEffect(() => {
    setWatched(isWatchLater);
  }, [isWatchLater]);

  const toggleWatched = useCallback(() => {
    toggleWatchLater(watched, video.id).then((res) => {
      if (res.data && res.data.success) {
        setWatched(!watched);
      }
    });
  }, [watched, video.id]);

  const downloadHandler = () => {
    try {
      FileSaver.saveAs(
        `https://api.isabi.tv/episodes/download/${video.id}?id=${video.id}`,
        `${video.title}`,
      );
    } catch (e) {
      console.log(e);
    }
  };

  const complain = () => {
    http.setToken(cookies.get('token'));

    const method = complaint ? 'delete' : 'post';
    http[method](PATH_URL_LIB_COMPLAINT, {
      video_id: video.id,
    }).then(() => {
      setComplaint(!complaint);
    });
  };

  const shareTooltip = (
    <Popover id="share-content">
      <Popover.Content>
        <Share />
      </Popover.Content>
    </Popover>
  );

  const submenu = (
    <Popover id="submenu">
      <Popover.Content>
        <Complaint
          id={video.id}
          hasComplaint={complaint}
          isFromDetailsPage
          isButton
          onComplain={() => {
            complain();
          }}
        />
      </Popover.Content>
    </Popover>
  );

  return (
    <Container className="mb-3 px-0">
      <Row>
        {pageType !== COMING_SOON && (
          <Col className={`${style['meta-left']}`} sm="1">
            <CardStatsWatchDetails value={viewsCount} />
          </Col>
        )}
        <Col className={style['meta-right']}>
          {hasTrailer && (
            <Button
              startIcon={<IoIosPlay />}
              size="large"
              variant="contained"
              onClick={openTrailer}
              disableElevation
            >
              Trailer
            </Button>
          )}
          <Button
            variant="contained"
            disableElevation
            size="large"
            onClick={isLike ? removeLike : setLike}
            startIcon={<IoIosThumbsUp fill={isLike ? '#2DBD58' : '#2b3331'} />}
          >
            {likesCount}
          </Button>
          <Button
            onClick={toggleWatched}
            variant="contained"
            disableElevation
            size="large"
            startIcon={<IoIosBookmark fill={watched ? '#2DBD58' : '#2b3331'} />}
          >
            Watch Later
          </Button>
          {video.allow_download &&
            pageType !== COMING_SOON &&
            video.creator === USER && (
              <Button
                variant="contained"
                disableElevation
                size="large"
                onClick={downloadHandler}
                startIcon={<IoMdCloudDownload fill={'#2b3331'} />}
              >
                Download
              </Button>
            )}
          <OverlayTrigger
            trigger="click"
            rootClose
            placement="bottom"
            overlay={shareTooltip}
          >
            <Button
              startIcon={<ShareIcon />}
              size="large"
              variant="contained"
              disableElevation
            >
              Share
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            trigger="click"
            rootClose
            placement="bottom"
            overlay={submenu}
          >
            <IconButton variant="contained">
              <HiDotsHorizontal fill="#2b3331" />
            </IconButton>
          </OverlayTrigger>
        </Col>
      </Row>
    </Container>
  );
};
