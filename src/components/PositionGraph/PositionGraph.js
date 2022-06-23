import { Checkbox } from 'rsuite';
import React, { Component } from 'react';
import ViewPanel from '../common/ViewPanel';
import '../common/style.css';
import InitiateSvg from '../common/InitiateSvg';
import DrawPositionGraph from './DrawPositionGraph';
import DrawTrails from './DrawTrails';
import DefaultFloorplan from '../DataMenu/sample_data/floorplan.png';

export default class PositionGraph extends Component {

  constructor(props) {
    super(props);

    this.containerDivId = 'position-vis-container';
    this.svgId = 'position-svg';

    this.state = {
      showTrails: true
    }

    this.src = '#';

    this.RADIUS = 18;
  }

  componentDidUpdate() {

    this.src = '#';

    if (this.props.data.length > 0) {
      InitiateSvg(this.containerDivId, this.svgId);
      if (this.state.showTrails) {
        DrawTrails(this.svgId, this.props.data, this.props.colorScale, this.RADIUS);
      }
      DrawPositionGraph(this.svgId, this.props.data, Math.floor(this.props.time), this.props.colorScale, this.RADIUS);
    }

    if (this.props.floorplan != null) {
      if (this.props.floorplan == 'default') {
        this.src = DefaultFloorplan;
      } else {
        let src = URL.createObjectURL(this.props.floorplan);
        this.src = src;
      }
    }
  }

  render() {

    const headerItem = (<div>Position 
      <Checkbox checked={this.state.showTrails} onChange={() => {this.setState({showTrails: !this.state.showTrails})}}> Show Trails?</Checkbox>
    </div>);

    return (
      <ViewPanel header={headerItem} height="50" containerId={this.containerDivId}>
        { (this.src != '#') ? <img src={this.src} width={'100%'} height={'100%'} /> : <div className='h100'></div> }
      </ViewPanel>
    );
  }
}
