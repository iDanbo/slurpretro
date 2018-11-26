import React from 'react';
import firebase from 'firebase';
import base from '../base';
import styled from 'styled-components';

const Content = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-content: center;
`;

class Main extends React.Component {
  render() {
    const { name, logout } = this.props;
    const firstName = name.replace(/ .*/, '');
    return (
      <Content>
        <div>
          <h1>Hello {firstName}!</h1>
          <button onClick={this.props.logout}>Logout</button>
        </div>
      </Content>
    );
  }
}

export default Main;
