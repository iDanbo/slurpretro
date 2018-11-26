import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div>
        <h1>Login with Google</h1>
        <button onClick={this.props.authenticate}>Login</button>
      </div>
    );
  }
}

export default Login;
