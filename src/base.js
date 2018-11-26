import Rebase from 're-base';
import firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyAOflPso_PD0PlwGeV7g4_eRynQw3Mtg0w',
  authDomain: 'retro-c828c.firebaseapp.com',
  databaseURL: 'https://retro-c828c.firebaseio.com',
  projectId: 'retro-c828c',
  storageBucket: 'retro-c828c.appspot.com',
  messagingSenderId: '984632880849',
};

const firebaseApp = firebase.initializeApp(config);
const base = Rebase.createClass(firebase.database());

export { firebaseApp };

export default base;
