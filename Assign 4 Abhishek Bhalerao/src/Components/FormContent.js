import React, { Component } from 'react'
import '../Styles/FormContent.css'

class FormContent extends Component {
  render() {
    return (
      <div className={`formcontent ${this.props.visibility}`}>
        <h2>Email: 
          <span className='weight'> {this.props.email}</span>
        </h2>
        <h2>Password: 
          <span className='weight'> {this.props.password}</span>
        </h2>
        <h2>Password: 
          <span className='weight'> {this.props.firstName}</span>
        </h2>
      </div>
    )
  }
}

export default FormContent