import React, { ReactEventHandler } from 'react';
import { Spinner } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
import throttle from 'lodash/throttle';
import 'videojs-contrib-ads';
import 'videojs-ima';
import 'videojs-ima/dist/videojs.ima.css';
import { VideoJSPlayer } from './VideoJSPlayer';
import { VideoJsPlayerOptions } from 'video.js';

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

    this.injectImaSDK();

    this.state = {
      isLoadingIma: true,
    };

    this.onVideoProgress = this.onVideoProgress.bind(this);
    // fire progress every one second (videojs fires every 15-250 milliseconds)
    this.throttledOnVideoProgress = throttle(this.onVideoProgress, 1000);
  }

  componentWillUnmount() {
    const imaScript = document.getElementById(this.imaScriptId);
    imaScript.parentNode.removeChild(imaScript);
  }

  onVideoProgress(event, currentTime) {
    this.props.onProgress?.(event, currentTime);
    this.userWatchedSeconds++;
    // Run ad every AD_BREAK_SECONDS
    if (this.userWatchedSeconds > AD_BREAK_SECONDS) {
      this.userWatchedSeconds = 0;
      this.requestAd();
    }
  }

  injectImaSDK() {
    this.imaScriptId = uuid();
    this.imaScript = document.createElement('script');
    this.imaScript.id = this.imaScriptId;
    this.imaScript.src = 'https://imasdk.googleapis.com/js/sdkloader/ima3.js';
    this.imaScript.addEventListener('load', () => {
      this.setState({ isLoadingIma: false });
    });
    document.head.appendChild(this.imaScript);
  }

  requestAd() {
    const player = this.videoJsPlayerRef.current.getPlayer();
    player.ima.requestAds();
  }

  render() {
    const videojsOptions = this.props.videojsOptions || {};

    if (this.state.isLoadingIma) {
      return (
        <div
          style={{
            width: videojsOptions.width,
            height: videojsOptions.height,
          }}
        >
          <Spinner
            animation="grow"
            variant="success"
            className="mx-auto my-auto"
          />
        </div>
      );
    }

    const videoJsOptions = {
      ...videojsOptions,
      autoplay: false,
      controls: true,
      // @ts-ignore disablePictureInPicture не описан в пропсах, но он есть
      disablePictureInPicture: true,
      controlBar: {
        // @ts-ignore pictureInPictureToggle не описан в пропсах, но он есть
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
        options={videoJsOptions}
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
