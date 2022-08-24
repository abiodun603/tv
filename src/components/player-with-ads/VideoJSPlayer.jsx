import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-ads';
import 'videojs-contrib-ads/dist/videojs.ads.css';
import 'videojs-ima';
import 'videojs-ima/dist/videojs.ima.css';

export class VideoJSPlayer extends React.Component {
  static player;
  static videoNode;

  constructor(props) {
    super(props);

    this.onPlayerReady = this.onPlayerReady.bind(this);
  }

  onPlayerReady() {
    this.player.on('loadedmetadata', () => {
      this.props.onReady(this.player);
    });
  }

  componentDidMount() {
    this.player = videojs(
      this.videoNode,
      this.props.options,
      this.onPlayerReady,
    );

    const onProgress = this.props.onProgress;

    this.player.currentTime(this.props.startFrom || 0);

    this.player.on('timeupdate', function (event) {
      onProgress(event, this.currentTime());
    });

    if (this.player.isReady_) {
      this.player.ima({
        adTagUrl: this.props.imaTag,
      });
    }
  }

  componentDidUpdate() {
    // todo обрабатывать несколько sources
    if (this.player) {
      this.player.src(this.props.options.sources[0].src);
      this.player.currentTime(this.props.startFrom || 0);
    }
  }

  componentWillUnmount() {
    if (this.player && this.player.isReady_) {
      this.player.dispose();
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div data-vjs-player>
        <video
          ref={(node) => (this.videoNode = node)}
          className="video-js vjs-big-play-centered vjs-tech"
        />
      </div>
    );
  }
}
