import NavigationBar from './components/NavigationBar/NavigationBar';
import DataMenu from './components/DataMenu/DataMenu';
import LegendGraph from './components/LegendGraph/LegendGraph';
import Video from './components/Video/Video';
import TimelineGraph from './components/TimelineGraph/TimelineGraph';
import PositionGraph from './components/PositionGraph/PositionGraph';
import WordGraph from './components/WordGraph/WordGraph';
import FilterPeople from './components/common/FilterPeople';
import { Container, Content, FlexboxGrid } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import './components/common/style.css';
import './App.css';
import React, { Component } from 'react';
import WordDataPrep from './components/WordGraph/WordDataPrep';
import Tooltip from './components/Tooltip/Tooltip';
import * as d3 from 'd3';

export default class App extends Component {

  constructor() {
    super();
    this.LEFT_COL = 2;
    this.MID_COL = 14
    this.RIGHT_COL = 8;
    
    this.state = {
      datamenu_expanded: true,
      videoId: '',
      legendData: [],
      positionData: [],
      timelineData: [],
      wordData: [],
      time: 0,
      videoLen: 0,
      updateWord: false,
      filterActive: false,
      filteredPeople: [],
      transcript: [],
      helpModal: true,
      colorScale: null,
      jumpCon: false
    }
  }

  componentDidMount() {
    d3.select('.tooltip').style('opacity', 0);
  }

  toggleHelp = () => {
    this.setState({helpModal: !this.state.helpModal});
  }

  addToFilter = (person) => {
    let filteredPeople = this.state.filteredPeople;
    filteredPeople.push(person);
    let legendData = FilterPeople(this.state.legendData, filteredPeople, true);
    let timeline = FilterPeople(this.state.timelineData, filteredPeople, true);
    let positionData = FilterPeople(this.state.positionData, filteredPeople, true);
    let transcript = FilterPeople(this.state.transcript, filteredPeople, true);
    let wordData = WordDataPrep(transcript);
    this.setState({
      filteredPeople: filteredPeople,
      filterActive: true,
      legendData: legendData,
      timeline: timeline,
      positionData: positionData,
      transcript: transcript,
      wordData: wordData,
      updateWord: true
    });

  }

  removeFromFilter = (person) => {
    let filteredPeople = this.state.filteredPeople;
    filteredPeople = filteredPeople.filter(e => e !== person);
    let status = filteredPeople.length > 0 ? true : false;
    let legendData = FilterPeople(this.state.legendData, filteredPeople, status);
    let timeline = FilterPeople(this.state.timelineData, filteredPeople, status);
    let positionData = FilterPeople(this.state.positionData, filteredPeople, status);
    let transcript = FilterPeople(this.state.transcript, filteredPeople, status);
    let wordData = WordDataPrep(transcript);
    this.setState({
      filteredPeople: filteredPeople,
      filterActive: status,
      legendData: legendData,
      timeline: timeline,
      positionData: positionData,
      transcript: transcript,
      wordData: wordData,
      updateWord: true
    });
  }

  wordUpdateComplete = () => {
    this.setState({updateWord: false});
  }

  getVideoLen = (videoLen) => {
    this.setState({videoLen: videoLen});
  }

  updateData = (newData) => {
    this.setState(newData);
  }

  getCurrentTime = (timestamp) => {
    this.setState({time: timestamp});
  }

  toggleDataMenu = () => {
    this.setState({
      datamenu_expanded: !this.state.datamenu_expanded,
      updateWord: true
    });
  }

  jumpVideoToTime = (player, jumpCon, time) => {
    if (jumpCon) {
      player.seekTo(time);
      this.setState({jumpCon: false});
    }
  }

  setPlaybackTime = time => {
    this.setState({time: time, jumpCon: true});
  }

  render() {
    return (
      <div className='App h100'>
        <Tooltip />
        <Container className='h100'>

            {/* Navbar */}
            <NavigationBar clickFunction={this.toggleDataMenu} /> 
          
            <Container className='h100'>
              {/* Sidebar */}
              { this.state.datamenu_expanded ? <DataMenu updateData={this.updateData} helpModal={this.state.helpModal} toggleHelp={this.toggleHelp} /> : <div></div>}
              <Content>
                <div className="show-grid h100">
            
                {/* Visualization Grid */}
                <FlexboxGrid justify="center" className='h100'>
                  <FlexboxGrid.Item className='h100' colspan={this.LEFT_COL}>
                    <LegendGraph
                      colorScale={this.state.colorScale}
                      data={this.state.legendData}
                      addToFilter={this.addToFilter}
                      removeFromFilter={this.removeFromFilter}
                      filterActive={this.state.filterActive} />
                  </FlexboxGrid.Item>
                  <FlexboxGrid.Item className='h100' colspan={this.MID_COL}>
                    <Video videoId={this.state.videoId}
                      getVideoLen={this.getVideoLen}
                      getCurrentTime={this.getCurrentTime}
                      jumpCon={this.state.jumpCon}
                      jumpVideoToTime={this.jumpVideoToTime}
                      appStateTime={this.state.time} />
                    <TimelineGraph
                      colorScale={this.state.colorScale}
                      data={this.state.timelineData}
                      videoLen={this.state.videoLen}
                      time={this.state.time}
                      setPlaybackTime={this.setPlaybackTime} />
                  </FlexboxGrid.Item>
                  <FlexboxGrid.Item className='h100' colspan={this.RIGHT_COL}>
                    <PositionGraph
                      colorScale={this.state.colorScale}
                      data={this.state.positionData}
                      time={this.state.time}
                      floorplan={this.state.floorplan} />
                    <WordGraph
                      data={this.state.wordData}
                      updateComplete={this.wordUpdateComplete}
                      update={this.state.updateWord} />
                  </FlexboxGrid.Item>
                </FlexboxGrid>
              </div>
            </Content>
          </Container>          
        </Container>
      </div>
    );
  }
}

