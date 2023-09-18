import React, { Component } from 'react'
import '../Styles/Common.css'

export class SignIn extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       email:'',
       password:'',
       errors:{
        email:'',
        password:''
       }
    }
  }

  handleEmail = (e) => {
    this.setState({
      email: e.target.value
    });
  }

  handlePassword = (e) => {
    this.setState({
      password: e.target.value
    });
  }


  handleSubmit = (e) => {
    e.preventDefault();

    let errors={};
    let isValid=true;

    if(!this.state.email){
      isValid=false;
      errors.email = 'Email is required';
    }
    else if (!/^\S+@\S+\.\S+$/.test(this.state.email)) {
      isValid=false;
      errors.email = 'Invalid email address';
    }

    if(!this.state.password){
      isValid=false;
      errors.password = 'Password is required';
    }
    else if(this.state.password.length < 8){
      isValid=false;
      errors.password = 'Password must be atleast 8 characters long';
    }
    else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(this.state.password)) {
      isValid=false;
      errors.password = 'Password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character';
    }

    this.setState({ errors });

    if (isValid) {
      // Form submission logic goes here
      this.props.submission(this.state.email,this.state.password);
      console.log(this.state.errors);
      console.log('Form submitted:', this.state.email,this.state.password);
    }
  }

  render() {
    // console.log(this.props.display);
    return (
      <div >
      <form onSubmit={this.handleSubmit}>
        <section className={`vh-100 gradient-custom ${this.props.display}`} >
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card shadow-2-strong" style={{borderRadius:'1rem'}} >
                  <div className="card-body p-5 text-center">

                    <h3 className="mb-5">Sign in</h3>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                      <input type="text" id="typeEmailX-2" className="form-control form-control-lg" onChange={this.handleEmail} />
                      {this.state.errors.email ? <div className='err'>{this.state.errors.email}</div> : ''}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                      <input type="password" id="typePasswordX-2" className="form-control form-control-lg" onChange={this.handlePassword} />
                      {this.state.errors.password ? <div className='err'>{this.state.errors.password}</div> : ''}
                    </div>


                    <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>

                    <hr className="my-4"></hr>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </form>
      </div>
    )
  }
}

export default SignIn