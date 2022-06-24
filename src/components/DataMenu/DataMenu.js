import React, { Component } from 'react';
import { Form, Button, Uploader, Divider, Sidebar } from 'rsuite';
import './style.css';
import '../common/style.css';
import LinkToVideoId from '../Video/LinkToVideoId';
import Papa from 'papaparse';
import ParseData from '../common/ParseData';
import LegendDataPrep from '../LegendGraph/LegendDataPrep';
import TimelineDataPrep from '../TimelineGraph/TimelineDataPrep';
import WordDataPrep from '../WordGraph/WordDataPrep';
import AddActiveProperty from '../common/AddActiveProperty';
import HelpModal from '../HelpModal/HelpModal';
import UploadLocal from '../common/UploadLocal';
import data from './sample_data/transcript.csv';
import ColorScaleGenerator from '../common/ColorScaleGenerator';

export default class DataMenu extends Component {

  importAll(r) {
    let paths = {};
    r.keys().map((item, index) => { paths[item.replace('./', '')] = r(item); });
    return paths;
  }

  constructor(props) {
    super(props);
    
    this.state = {
      videoLink: '',
      transcript: [],
      position: [],
      floorplan: null,
      defaultData: {
        videoLink: 'https://www.youtube.com/watch?v=d8_pRUR-hmg&ab_channel=LearningHowtoLook%26Listen',
        transcript: [],
        position: [],
        floorplan: 'default'
      }
    }  
  }

  componentDidMount = () => {
    UploadLocal(data, this.defaultTranscript);
    this.paths = this.importAll(require.context('./sample_data/paths/', false, /\.(csv)$/));
    for (let path in this.paths) {
      UploadLocal(this.paths[path], this.defaultPosition, true, path);
    }
  }

  defaultTranscript = (data) => {
    let def_transcript = this.state.defaultData;
    def_transcript.transcript = data;
    this.setState({defaultData: def_transcript});
  }

  defaultPosition = data => {
    let def_position = this.state.defaultData;
    def_position.position.push(data);
    this.setState({defaultData: def_position});
  }

  updateVideoLink = (e) => {
    this.setState({videoLink: e});
  }

  uploadTranscript = (e) => {
    let file = (e.target.files[0]);
    Papa.parse(file, {
      complete: results => {
        let newData = ParseData(results);

        this.setState({transcript: newData});
      }
    } );
  }

  uploadPositionData = (e) => {
    let positionData = [];
    let files = e.target.files;
    for (let file of files) {
      Papa.parse(file, {
        complete: results => {
          let person = {
            name: file.name.slice(0, -4),
            data: ParseData(results)
          }

          positionData.push(person);
        }
      });
    }
    this.setState({position: positionData});
  }

  updateData = (data) => {
    let newId = LinkToVideoId(data.videoLink);
    let legendData = LegendDataPrep(data.transcript);
    let positionData = AddActiveProperty(data.position);
    let timelineData = TimelineDataPrep(data.transcript);
    let transcript = AddActiveProperty(data.transcript);
    let wordData = WordDataPrep(transcript);
    let colorScale = ColorScaleGenerator(legendData);
    let floorplan = data.floorplan;
    let newData = {
      datamenu_expanded: false,
      videoId: newId,
      legendData: legendData,
      positionData: positionData,
      timelineData: timelineData,
      wordData: wordData,
      updateWord: true,
      filterActive: false,
      filteredPeople: [],
      transcript: transcript,
      colorScale: colorScale,
      floorplan: floorplan
    }
    this.props.updateData(newData);
  }

  uploadFloorPlan = e => {
    let file = (e.target.files[0]);
    this.setState({floorplan: file});
  }

  render() {  
    return (
      <Sidebar className='h100 data-menu-container'>
        <Form fluid>
          <Form.Group controlId="video-link">
            <Form.ControlLabel className='form-header'>Video</Form.ControlLabel>
            <Form.HelpText>Youtube link of video to analyse.</Form.HelpText>
            <Form.Control name="video-link" value={this.state.videoLink} onChange={this.updateVideoLink} />
          </Form.Group>
          <Divider />
          <Form.Group controlId="transcript">
            <Form.ControlLabel className='form-header'>Transcript</Form.ControlLabel>
            <Form.HelpText>Transcript of the video as CSV</Form.HelpText>
            <input type="file"
              name="file"
              id="transcript"
              className="form-button"
              required
              onChange={this.uploadTranscript} />
          </Form.Group>
          <Divider />
          <Form.Group controlId="position-data">
            <Form.ControlLabel className='form-header'>Position Data</Form.ControlLabel>
            <Form.HelpText>Coordinates for every person as CSV</Form.HelpText>              
            <input type="file"
              name="file"
              id="position"
              className="form-button"
              multiple
              required
              onChange={this.uploadPositionData} />
          </Form.Group>
          <Divider />
          <Form.Group controlId="floor-plan">
            <Form.ControlLabel className='form-header'>Floor Plan (Optional)</Form.ControlLabel>
            <Form.HelpText>Floor plan for spatial analysis</Form.HelpText>              
            <input
              type="file"
              name="file"
              id="floor-plan"
              accept="image/*" 
              className="form-button"
              onChange={this.uploadFloorPlan} />
          </Form.Group>
          <Divider />
          <Form.Group>
            <Button block appearance="subtle" onClick={this.props.toggleHelp}>More Information</Button>
            <Button block appearance="default" onClick={() => this.updateData(this.state.defaultData)} >"Matter Occupies Space" Example</Button>
            <Button block appearance="primary" onClick={() => this.updateData(this.state)}>Render Visualization</Button>
          </Form.Group>
        </Form>
        <HelpModal helpModal={this.props.helpModal} toggleHelp={this.props.toggleHelp} />
      </Sidebar>
    );
  }
}
