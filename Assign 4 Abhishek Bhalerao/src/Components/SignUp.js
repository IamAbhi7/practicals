// import React from 'react'
import '../Styles/Common.css'
// import { useFormik } from 'formik'
import { useState } from "react";
import { Formik, Form, Field } from 'formik'
import React from 'react'
import { object, string, number, boolean} from 'yup'
import * as yup from 'yup';


const initialValues ={
  firstName:'',
  lastName:'',
  Age:'',
  gender:'',
  email:'',
  password:'',
  confirm:'',
  phoneNumber:''
}

const SignUp = (props) => {
  const [firstName, setColor] = useState("");


  const validationSchema = object({
    firstName: string().required().min(3).max(30),
    lastName: string().required().min(3).max(30),
    Age: number().required().min(16).max(22),
    gender: string().required(),
    email: string().email('Invalid email').required('Email is required'),
    password:string().required('Password is required').min(5, 'Your password is too short.').matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    confirm:string().oneOf([yup.ref('password')], 'Passwords must match'),
    phoneNumber: string().required().min(9).max(10)
    // email: Yup.string().email('Invalid email').required('Required')
});

  const handleSubmit = (event)=> {
    event.preventDefault()
  }

  return (
    <div>
      <section className={`vh-100 gradient-custom ${props.display}`}>
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="card shadow-2-strong card-registration" style={{borderRadius:"15px"}}>
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ values, errors }) => (
                  <form>

                    {/* <pre>{JSON.stringify(values, null, 104)}</pre>
                    <pre>{JSON.stringify(errors, null, 104)}</pre> */}

                    <div className="row">
                      <div className="col-md-6 mb-4">

                        <div className="form-outline">
                          <label className="form-label" htmlFor="firstName">First Name</label>
                          <Field type="text" id="firstName" name='firstName' className="form-control form-control-lg" />
                          <p className='err'>{errors.firstName}</p>
                        </div>

                      </div>
                      <div className="col-md-6 mb-4">

                        <div className="form-outline">
                          <label className="form-label" htmlFor="lastName">Last Name</label>
                          <Field type="text" id="lastName" name='lastName' className="form-control form-control-lg" />
                          <p className='err'>{errors.lastName}</p>
                        </div>

                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4 d-flex align-items-center">

                        <div className="form-outline datepicker w-100">
                          <label htmlFor="Age" className="form-label">Age</label>
                          <Field type="number" className="form-control form-control-lg" name='Age' id="Age" />
                          <p className='err'>{errors.Age}</p>
                        </div>

                      </div>
                      <div className="col-md-6 mb-4">

                        <h6 className="mb-2 pb-1">Gender: </h6>

                        <div className="form-check form-check-inline">
                          <Field className="form-check-input" type="radio" name="gender" id="maleGender"
                            value="option1" />
                          <label className="form-check-label" htmlFor="femaleGender">Male</label>
                        </div>

                        <div className="form-check form-check-inline">
                          <Field className="form-check-input" name="gender" type="radio"  id="femaleGender"
                            value="option2" />
                          <label className="form-check-label" htmlFor="maleGender">Female</label>
                        </div>

                        <div className="form-check form-check-inline">
                          <Field className="form-check-input" type="radio" name="gender"  id="otherGender"
                            value="option3" />
                          <label className="form-check-label" htmlFor="otherGender">Other</label>
                        </div>
                        <p className='err'>{errors.gender}</p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4 pb-2">

                        <div className="form-outline">
                          <Field type="email" id="email" name='email' className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="email">Email</label>
                          <p className='err'>{errors.email}</p>
                        </div>

                      </div>
                      <div className="col-md-6 mb-4 pb-2">

                        <div className="form-outline">
                          <Field type="tel" id="phoneNumber" name='phoneNumber' className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
                          <p className='err'>{errors.phoneNumber}</p>
                        </div>

                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4 pb-2">

                        <div className="form-outline">
                          <Field type="password" id="password" name='password' className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="password">Password</label>
                          <p className='err'>{errors.password}</p>
                        </div>

                      </div>
                      <div className="col-md-6 mb-4 pb-2">

                        <div className="form-outline">
                          <Field type="password" id="confirm" name='confirm' className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="confirm">Confirm Password</label>
                          <p className='err'>{errors.confirm}</p>
                        </div>

                      </div>
                    </div>

                  

                    <div className="mt-4 pt-2" >
                      <Field className="btn btn-primary btn-lg" type="submit" value="Submit" name='submit' />
                    </div>

                  </form>
                  )}
                </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    
    </div>
  )
}



export default SignUp