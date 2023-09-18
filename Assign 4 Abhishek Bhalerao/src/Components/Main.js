import React, { Component } from 'react'
import ButtonSection from './ButtonSection'
import SignIn from './SignIn'
import SignUp from './SignUp'
import FormContent from './FormContent'

class Main extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       SignIn: "none",
       SignUp: "none",
       email: "",
       password: ""
    }
  }

  onSignInClick = () => {
    this.setState({
      SignIn: "block",
      SignUp: "none"
    })
  }

  onSignUpClick = () => {
    this.setState({
      SignIn: "none",
      SignUp: "block",
      visibility: "none"
    })
  }

  handleSubmit = (emailData,passwordData) =>{
    this.setState({
      email: emailData,
      password: passwordData,
      visibility: 'block'
    })
  }

  handleSubmitSignUp = (first,emailData,passwordData) =>{
    this.setState({
      firstName:first,
      email: emailData,
      password: passwordData
    })
  }

  render() {
    return (
      <div>
        <ButtonSection displayIn={this.onSignInClick} displayUp={this.onSignUpClick} />
        <SignIn display={this.state.SignIn} submission={this.handleSubmit}/>
        <SignUp display={this.state.SignUp} submission={this.handleSubmitSignUp} />
        <FormContent {...this.state}/>
      </div>
    )
  }
}

export default Main