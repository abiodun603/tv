import React from 'react';

import VideoStore from '../../store/videoDetailsStore';
import ProfileStore from '../../store/profileStore';
import ComingStore from '../../store/comingStore';
import { MANAGER } from '../../constants/API';
import { COMING, FILM, NEWS, SERIES, USER } from '../../constants/types';

class DetailsVideoCommon extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.id && prevProps.id !== this.props.id) {
      this.getData();
    }
  }

  componentDidMount() {
    this.getData();

    this.updateRec();

    if (this.props.type[0] !== NEWS && this.props.type[0] !== COMING) {
      this.props.video.getSeries(this.props.id, 1, {}, [SERIES]);
    }
  }

  componentWillUnmount() {
    if (this.props.type[0] === COMING) {
      this.props.coming.clearComingData();
      this.props.video.clearSeries();
      return;
    }
    this.props.video.clearVideoData();
  }

  getData() {
    if (this.props.type[0] === FILM) {
      this.props.video.getVideo(this.props.id, {}, MANAGER);
    }
    if (this.props.type[0] === USER) {
      this.props.video.getVideo(this.props.id, {}, USER);
    }
    if (this.props.type[0] === NEWS) {
      this.props.video.getVideo(this.props.id, { tags_contains: NEWS }, USER);
    }
    if (this.props.type[0] === COMING) {
      return this.props.coming.getSingleVideo(this.props.id);
    }
  }
  updateRec() {
    this.props.video.updateRec(this.props.id);
  }
}

export default DetailsVideoCommon;
