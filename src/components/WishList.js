import React, { Component } from 'react'
import firebase from 'firebase'
import base from '../base'
import styled from 'styled-components'
import { wishColor, wishColorQuestion } from '../utils/colors'
import GodDisplayCard from './GodDisplayCard'
import WishDisplay from './WishDisplay'

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  .title {
    color: rgb(80, 80, 80);
    font-weight: lighter;
    max-width: 600px;
    line-height: 1.5rem;
  }
  h4,
  hr {
    margin-bottom: 0;
    margin-block-end: 0;
  }
`

const Cards = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const PersonsWishes = styled.div`
  margin: 1rem 0;
  padding: 1rem 0;
  border: 1px dashed ${wishColor};
  border-radius: 15px;
  max-width: 600px;
`

const Wishes = styled.div``

class WishList extends Component {
  state = {
    firebase: {},
    name: '',
  }

  componentDidMount() {
    this.ref = base.syncState('app', {
      context: this,
      state: 'firebase',
      asArray: false,
      then: () => console.log(this.state.firebase),
    })
    // On mount check for if user is already authenticaed
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user })
      }
    })
  }

  // Handle authentication with firebases incoming data about the user
  authHandler = authData => {
    console.log(authData)
    const { uid, displayName } = authData.user
    this.setState({ name: displayName })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  toggleWishColor = (person, index) => {
    if (this.state.name === 'Daniel Egerev') {
      const firebaseState = { ...this.state.firebase }
      firebaseState[person].wishes[index].isGreen = !firebaseState[person].wishes[index].isGreen
      this.setState({ firebase: firebaseState })
    }
  }

  render() {
    const people = Object.keys(this.state.firebase)
    return (
      <Content>
        <h4 className="title">You are looking at the wish list now. Lets make them happen! 💫🌟</h4>
        <Wishes>
          {people.map(
            person =>
              this.state.firebase[person].wishes && (
                <PersonsWishes key={person}>
                  <h4>{person}</h4>
                  <Cards>
                    {this.state.firebase[person].wishes.map((wish, index) => (
                      <WishDisplay
                        person={person}
                        index={index}
                        key={wish.wish}
                        text={wish.wish}
                        color={wish.isGreen ? wishColorQuestion : wishColor}
                        margin="10px"
                        toggleWishColor={this.toggleWishColor}
                      />
                    ))}
                  </Cards>
                </PersonsWishes>
              )
          )}
        </Wishes>
      </Content>
    )
  }
}

export default WishList
