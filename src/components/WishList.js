import React, { Component } from 'react'
import base from '../base'
import styled from 'styled-components'
import { wishColor } from '../utils/colors'
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
    max-width: 400px;
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
  padding: 1rem 0;
`

const Wishes = styled.div`
  max-width: 600px;
`

class WishList extends Component {
  state = {
    firebase: {},
  }

  componentDidMount() {
    this.ref = base.syncState('app', {
      context: this,
      state: 'firebase',
      asArray: false,
      then: () => console.log(this.state.firebase),
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  render() {
    const people = Object.keys(this.state.firebase)
    console.log(people)

    // const good = [].concat(...goods);

    return (
      <Content>
        <h4 className="title">
          You are looking at the wish list now. Make them happen! 💫🌟 <strong>Rafael, Manuel or Tero</strong> will mark
          them green if the wish came true or will come true.
          <br />
          If the wish is not going to happen let the person know about it, only they can remove it from the wish list.
        </h4>
        <Wishes>
          {people.map(
            person =>
              this.state.firebase[person].wishes && (
                <PersonsWishes key={person}>
                  <h4>{person}</h4>
                  <Cards>
                    {this.state.firebase[person].wishes.map(wish => (
                      <WishDisplay key={wish} text={wish} color={wishColor} margin="10px" />
                    ))}
                  </Cards>
                  <hr width="100%" />
                </PersonsWishes>
              )
          )}
        </Wishes>
      </Content>
    )
  }
}

export default WishList
