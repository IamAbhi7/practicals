import React, { Component } from 'react'
import '../Styles/Button.css'

class Button extends Component {

  render() {
    // console.log(this.props.display);
    return (
      <div>
        {/* button component  */}
        <button className={`${this.props.cls}`} onClick={this.props.display} >{this.props.val}
        </button>
      </div>
    )
  }
}

export default Button
