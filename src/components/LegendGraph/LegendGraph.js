import React, { Component } from 'react';
import ViewPanel from '../common/ViewPanel';
import * as d3 from 'd3';
import './style.css';
import '../common/style.css';
import '../../App.css';
import InitiateSvg from '../common/InitiateSvg';
import DrawLegendGraph from './DrawLegendGraph';

export default class LegendGraph extends Component {  

  constructor(props) {
    super(props);

    this.containerDivId = 'legend-vis-container';
    this.svgId = 'legend-svg';
  }

  componentDidUpdate() {
    if (this.props.data.length > 0) {
      InitiateSvg(this.containerDivId, this.svgId);
      DrawLegendGraph(this.svgId, this.props.data, this.props.addToFilter, this.props.removeFromFilter, this.props.filterActive, this.props.colorScale);
    }
  }

  render() {
    return (
      <ViewPanel height="100" scrollable={true} header="People" containerId={this.containerDivId} />
    )
  }
}
