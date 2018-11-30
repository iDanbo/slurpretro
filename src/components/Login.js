import React, { Component } from 'react';
import styled from 'styled-components';

const Content = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-content: center;
`;
class Login extends Component {
  render() {
    return (
      <Content>
        <h3>Login with Google</h3>
        <button onClick={this.props.authenticate}>Login</button>
      </Content>
    );
  }
}

export default Login;
