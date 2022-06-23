import React, { Component } from 'react';
import ViewPanel from '../common/ViewPanel';
import '../common/style.css';
import InitiateSvg from '../common/InitiateSvg';
import DrawWordGraph from './DrawWordGraph';

export default class WordGraph extends Component {
  constructor(props) {
    super(props);

    this.containerDivId = 'word-vis-container';
    this.svgId = 'word-svg';
  }

  componentDidUpdate() {
    if (this.props.data.length > 0) {
      if (this.props.update) {
        InitiateSvg(this.containerDivId, this.svgId);
        DrawWordGraph(this.svgId, this.props.data);
        this.props.updateComplete();
      }
    }
  }
  
  render() {
    return (
      <ViewPanel height="50" header="Content" containerId={this.containerDivId} />
    )
  }
}
