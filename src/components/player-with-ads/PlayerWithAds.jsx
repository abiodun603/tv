import React, { ReactEventHandler } from 'react';
import { Spinner } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
import throttle from 'lodash/throttle';
import { VideoJSPlayer } from './VideoJSPlayer';

const AD_BREAK_SECONDS = 10 * 60; // 10 minutes
const dummyAdURL =
  'https://pubads.g.doubleclick.net/gampad/ads?' +
  'sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&' +
  'impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&' +
  'cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=';

export class PlayerWithAds extends React.Component {
  static videoJsPlayerRef = React.createRef();
  static imaScriptId;
  static imaScript;
  static userWatchedSeconds = 0;
  static throttledOnVideoProgress;

  constructor(props) {
    super(props);

    this.onVideoProgress = this.onVideoProgress.bind(this);
    // fire progress every one second (videojs fires every 15-250 milliseconds)
    this.throttledOnVideoProgress = throttle(this.onVideoProgress, 1000);
  }

  shouldComponentUpdate() {
    return false;
  }

  onVideoProgress(event, currentTime) {
    this.props.onProgress(event, currentTime);
    this.userWatchedSeconds++;
    // Run ad every AD_BREAK_SECONDS
    if (this.userWatchedSeconds > AD_BREAK_SECONDS) {
      this.userWatchedSeconds = 0;
      this.requestAd();
    }
  }

  requestAd() {
    const player = this.videoJsPlayerRef.current.getPlayer();
    player.ima.requestAds();
  }

  render() {
    const videojsOptions = this.props.videojsOptions || {};

    const options = {
      ...videojsOptions,
      autoplay: false,
      controls: true,
      responsive: true,
      disablePictureInPicture: true,
      controlBar: {
        pictureInPictureToggle: false,
      },
      sources: [
        {
          src: this.props.url,
        },
      ],
    };

    return (
      <VideoJSPlayer
        ref={this.videoJsPlayerRef}
        imaTag={dummyAdURL}
        options={options}
        startFrom={this.props.startFrom}
        onReady={(player) => {
          if (this.props.onDuration) {
            this.props.onDuration(player.duration());
          }
        }}
        onProgress={this.throttledOnVideoProgress}
      />
    );
  }
}
