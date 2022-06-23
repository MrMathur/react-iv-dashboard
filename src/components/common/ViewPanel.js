import React, { Component } from 'react';
import { Container, Header, Content } from 'rsuite';

export default class ViewPanel extends Component {

  constructor(props) {
    super(props);

    this.props=props;
    this.containerStyle = "padded bordered h" + this.props.height;
  }

  render() {
    const renderStyle = (this.props.scrollable ? {overflow: 'scroll'} : {overflow: 'hidden'});

    return (
      <Container className={this.containerStyle}>
        <Header className='panel-header'>{this.props.header}</Header>
        <Content className='h100' style={renderStyle}>          
          <div className='h100' id={this.props.containerId}>
           {this.props.children}            
          </div>
        </Content>
      </Container>
    )
  }
}
