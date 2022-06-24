import React, { Component } from 'react';
import { Divider, Modal } from 'rsuite';
import Transcript from '../DataMenu/sample_data/transcript.csv';
import TeacherPosition from '../DataMenu/sample_data/paths/teacher.csv';
import Floorplan from '../DataMenu/sample_data/floorplan.png';

export default class HelpModal extends Component {

  constructor(props) {
    super();
  }

  closeHelp = () => {
    this.props.toggleHelp();
  }

  render() {
    return (
      <Modal size='lg' onClose={this.closeHelp} open={this.props.helpModal}>
        <Modal.Header>
          <Modal.Title>Welcome to QualVis</Modal.Title>
          <p>
            QualVis lets you visualize the conversation and position data for qualitative datasets such as videos. You can enter your own data in the format specified below, or view the examplar visualizations for a billingual classroom video. 
          </p>
        </Modal.Header>
        <Modal.Body>
          <Divider />
          <h6>Video</h6>
          <p>Specify the youtube link for the video whose data you want to visualize. For example, <a href="https://youtu.be/d8_pRUR-hmg" target="_blank">https://youtu.be/d8_pRUR-hmg</a></p>
          <Divider />
          <h6>Transcript</h6>
          <p>Describe the conversations in the video in the form of timestamped transcript. The transcript should be a CSV file containing the following information: 
            <ul>
              <li>name: The name/identifier for speaker of a dialogue</li>
              <li>start_time: The timestamp in the video (in seconds) where the speaker utters the dialogue</li>
              <li>end_time: The timestamp in the video (in seconds) where the speaker stops speaking the dialogue</li>
              <li>content: The words uttered in the dialogue</li>
            </ul>
            You can find an example of a typical transcript <a href={Transcript} download="transcript.csv" target="_blank">here</a>.
          </p>
          <Divider />
          <h6>Position Data</h6>
          <p>
            Describe the positional data for every person in the video as a <a href='https://www.benrydal.com/software/mondrian-transcription' target='_blank'>Mondrian Transcript</a>. The transcript should be uploaded as a CSV, titled the name of the person, containing: 
            <ul>
              <li>time: The timestamp in the video for any given position</li>
              <li>x: The x-position of the person at that time</li>
              <li>y: The y-position of the person at that time</li>
            </ul>
            You can find an example <a href={TeacherPosition} download="teacher.csv" target='_blank'>here</a>. You can use the <a href='https://www.benrydal.com/software/mondrian-transcription' target='_blank'>Mondrian Transcription tool</a> to create these files.
          </p>
          <Divider />
          <h6>Floor Plan</h6>
          <p>
            A translucent image that describes the environment of the video. The positional data visualizations will be overlayed on the floor-plan as a background. <a href={Floorplan} target="_blank" download="floorplan.png">Here</a> is an example.
          </p>
          <Divider />
        </Modal.Body> 
        <Modal.Footer>
          <p>
          Website, visualizations, and content designed and developed by <a href="https://arpitmathur.info/" target="_blank">Arpit Mathur</a> and <a href="https://www.benrydal.com/" target="_blank">Ben Rydal Shapiro</a>. To contribute, visit <a href="https://github.com/MrMathur/react-iv-dashboard" target="_blank">https://github.com/MrMathur/react-iv-dashboard</a>.
          </p>
        </Modal.Footer>
      </Modal>
    )
  }
}
