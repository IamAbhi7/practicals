import React, { Component } from 'react';
import './Button'
// import Button from './Button';
import '../Styles/Press.css';

export default class DisplayInput extends Component {
  //constructor
  constructor(props) {
    super(props)
    this.state = {
       text : ''
    }
  }

  //key-press event
  handleKeyPress = (event) => {
    this.setState({
      text : event.target.value,
    })
  }

  render() {
    return (
      <div>
        <h2>Keypress</h2>
        <div className='press'>
          <input type='text' onChange={this.handleKeyPress} placeholder=''></input>
          <h2 className='wrap-text' style={{
           display:`${this.state.visibility}` 
          }}>{this.state.text}
          </h2>
        </div>
      </div>
    )
  }
}