import React, { Component } from 'react';
import { Divider, Modal, Button } from 'rsuite';

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
          <p>Nisi reprehenderit proident duis commodo sunt excepteur ex cupidatat fugiat. Ullamco qui minim sunt laboris. Laboris labore esse cupidatat anim eiusmod. Veniam mollit commodo tempor anim est consequat.</p>
        </Modal.Header>
        <Divider />
        <Modal.Body>
          <h6>Video</h6>
          <p>Occaecat sunt nostrud dolor reprehenderit anim voluptate elit. Culpa aute fugiat adipisicing veniam adipisicing reprehenderit adipisicing mollit. Velit labore fugiat non aute ad. Id minim tempor enim duis nostrud est occaecat veniam commodo pariatur culpa nostrud in in.</p>
          <h6>Transcript</h6>
          <p>Ullamco Lorem quis amet ea mollit exercitation velit ullamco aliqua nulla nisi id ullamco. Laboris tempor irure nulla do nisi voluptate commodo excepteur elit reprehenderit ut deserunt fugiat qui. Enim tempor commodo eiusmod cillum ea qui. Magna eu culpa culpa sint velit nostrud fugiat cillum amet. Dolore nostrud enim et nostrud ullamco ea velit ea adipisicing labore non tempor cupidatat. Aute consequat consectetur nisi exercitation exercitation veniam sint cillum elit.</p>
          <h6>Position Data</h6>
          <p>Sint occaecat minim eu et adipisicing laborum aliqua non sit labore. Culpa velit in nostrud cillum. Dolore anim reprehenderit Lorem id nisi irure commodo culpa culpa nostrud ullamco ullamco amet minim.</p>
          <h6>Floor Plan</h6>
          <p>Aliqua fugiat consectetur nisi ipsum et cupidatat ad eiusmod nisi. Velit laborum ut dolore magna do commodo consectetur. Officia nisi fugiat cillum quis esse ea magna enim eu cupidatat. Id ipsum velit aute quis incididunt Lorem nisi ut labore ex. Aliquip esse veniam eu labore sit amet excepteur. Cillum incididunt eiusmod Lorem deserunt ullamco.</p>
        </Modal.Body> 
        <Divider />
        <Modal.Footer>
          <p>Exercitation aute nostrud adipisicing dolore nostrud. Eiusmod in officia amet amet est aliquip eiusmod amet aliquip. Non exercitation non laborum esse exercitation. Sit pariatur minim veniam do elit amet nostrud anim labore. Id amet reprehenderit enim nostrud ad laboris.</p>
        </Modal.Footer>
      </Modal>
    )
  }
}
