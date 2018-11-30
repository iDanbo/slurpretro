import React from 'react';
import firebase from 'firebase';
import base from '../base';
import styled from 'styled-components';
import AddCard from './AddCard';
import DisplayCard from './DisplayCard';
import GoodOrBad from './GoodOrBad';
import Number from './Number';
import { goodColor, badColor } from '../utils/colors';

const Content = styled.div`
  display: grid;
  grid-template-rows: auto;
  height: 100%;
  grid-gap: 1rem;
  justify-content: center;
  align-content: center;
  justify-items: center;
`;

const Numbers = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 1rem;
`;

const Wrapper = styled.div`
  max-width: 100vw;
  height: 100vh;
`;

const AllWrapper = styled.div`
  .logout {
    background: var(--bg-color);
  }
`;

class Main extends React.Component {
  state = {
    good: [],
    bad: [],
    isGoodOpen: true,
  };

  componentDidMount() {
    this.ref1 = base.syncState(`/app/${this.props.name}/good`, {
      context: this,
      state: 'good',
      asArray: true,
      then: () => console.log(this.state),
    });
    this.ref2 = base.syncState(`/app/${this.props.name}/bad`, {
      context: this,
      state: 'bad',
      asArray: true,
      then: () => console.log(this.state),
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref1);
    base.removeBinding(this.ref2);
  }

  setGood = good => {
    this.setState(prevState => ({ good: [good, ...prevState.good] }));
  };
  removeGood = index => {
    const good = [...this.state.good];
    good.splice(index, 1);
    this.setState({ good });
  };
  removeBad = index => {
    const bad = [...this.state.bad];
    bad.splice(index, 1);
    this.setState({ bad });
  };

  setBad = bad => {
    this.setState({ bad: [bad, ...this.state.bad] });
  };

  setIsGoodOpen = number => {
    console.log('setIsGoodOpen');
    console.log(number);

    if (number === '1') {
      this.setState({ isGoodOpen: true });
    } else {
      this.setState({ isGoodOpen: false });
    }
  };

  render() {
    const { name, logout } = this.props;
    const firstName = name.replace(/ .*/, '');
    return (
      <AllWrapper>
        <Wrapper>
          <Content>
            <h1>
              Waddup {firstName} <span>😎</span>
            </h1>
            <Numbers>
              <Number number="1" color={goodColor} setIsGoodOpen={this.setIsGoodOpen} />
              <Number number="2" color={badColor} setIsGoodOpen={this.setIsGoodOpen} />
            </Numbers>
            {this.state.isGoodOpen ? (
              <GoodOrBad
                text="What did you enjoy during the past couple of weeks? 🤩"
                color={goodColor}
                textArray={this.state.good}
                addStuff={this.setGood}
                removeStuff={this.removeGood}
              />
            ) : (
              <GoodOrBad
                text="What are the things that were blocking you or anything that you want to be improved? 💪"
                color={badColor}
                textArray={this.state.bad}
                addStuff={this.setBad}
                removeStuff={this.removeBad}
              />
            )}
          </Content>
        </Wrapper>
        <button className="logout" onClick={this.props.logout}>
          Logout
        </button>
      </AllWrapper>
    );
  }
}

export default Main;
