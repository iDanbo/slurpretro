import React, { Component } from 'react';
import { navigate } from '@reach/router';
import Login from './components/Login';
import firebase from 'firebase';
import base from './base';
import Main from './components/Main';

class Home extends Component {
  state = {
    uid: '',
    name: '',
  };

  componentDidMount() {
    // On mount check for if user is already authenticaed
    firebase.auth().onAuthStateChanged(user => {
      user && this.authHandler({ user });
    });
  }

  // Handle authentication with firebases incoming data about the user
  authHandler = authData => {
    console.log(authData);
    const { uid, displayName } = authData.user;
    this.setState({ uid, name: displayName });
  };

  logout = async () => {
    console.log('LOGGING OUT');
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  authenticate = () => {
    const authProvider = new firebase.auth[`GoogleAuthProvider`]();
    firebase
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };
  render() {
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }
    return <Main logout={this.logout} uid={this.state.uid} name={this.state.name} />;
  }
}

export default Home;
