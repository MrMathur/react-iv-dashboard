import React, { Component } from 'react';
import ViewPanel from '../common/ViewPanel';
import '../common/style.css';
import InitiateSvg from '../common/InitiateSvg';
import DrawTimelineGraph from './DrawTimelineGraph';

export default class TimelineGraph extends Component {   

  constructor(props) {
    super(props);

    this.containerDivId = 'timeline-vis-container';
    this.svgId = 'timeline-svg';
  }

  componentDidUpdate() {
    if (this.props.data.length > 0) {
      InitiateSvg(this.containerDivId, this.svgId);
      DrawTimelineGraph(this.svgId, this.props.data, this.props.videoLen, this.props.time, this.props.colorScale, this.props.setPlaybackTime);
    }
  }
  
  render() {
    return (
      <ViewPanel header="Timeline" height='30' containerId={this.containerDivId} />
    )
  }
}
