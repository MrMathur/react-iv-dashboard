import React, { Component } from 'react';
import YouTube from 'react-youtube';
import ViewPanel from '../common/ViewPanel';
import '../common/style.css';

export default class Video extends Component {

  constructor(props) {
    super(props);
  }

  initialize = (event) => {
    this.player = event.target
    let videoLen = this.player.getDuration();
    this.props.getVideoLen(videoLen);
  }

  componentDidUpdate = () => {
    this.props.jumpVideoToTime(this.player, this.props.jumpCon, this.props.appStateTime);
  }

  sendTime = event => {
    setInterval(() => {
      let timestamp = this.player.getCurrentTime();
      this.props.getCurrentTime(timestamp);
    }, 1000);
  }

  render() {

    const opts = {
      width: '100%',
      height: '100%',
      playerVars: {
        autoplay: 0,
      },  
    }

    return ( 
      <ViewPanel header="Video" height="70">
        <div className='h100 no-select'>
          {(this.props.videoId.length != 0) ? <YouTube className='h100' videoId={this.props.videoId} opts={opts} onReady={this.initialize} onPlay={this.sendTime} /> : <div></div>}
        </div>
      </ViewPanel>
    );
  }
}
