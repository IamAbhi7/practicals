import React, { Component } from 'react'
import Button from './Button'
import '../Styles/ButtonSpace.css'

class ButtonSection extends Component {
  render() {
    // console.log(this.props.displayIn);
    return (
      <div className='btnspace container'>
        <Button cls="btn btn-primary mr-4" val="Sign In" display={this.props.displayIn} />
        <Button cls="btn btn-primary ml-4" val="Sign Up" display={this.props.displayUp}/>
      </div>
    )
  }
}

export default ButtonSection