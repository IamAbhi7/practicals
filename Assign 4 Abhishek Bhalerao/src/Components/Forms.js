import { Formik, Form, Field } from 'formik'
import React from 'react'
import { object, string, number, boolean } from 'yup'

const initialValues = {
    name: "",
    initialInvestment: 0,
    reasonForInvestment: "",
    investmentRisk: [],
    dependents: "",
    acceptTermsAndConditions: false,
}

function Forms() {

    const validationSchema = object({
        name: string().required().min(3).max(30),
        initialInvestment: number().required().min(100),
        dependents: number().required().min(0).max(5),
        acceptTermsAndConditions: boolean().oneOf([true])
    });

    return (
        <>
            <div className="container">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={values => console.log(values)}>
                    {({ values, errors }) => (
                        <Form>
                            <pre>{JSON.stringify(values, null, 104)}</pre>
                            <pre>{JSON.stringify(errors, null, 104)}</pre>
                            <div className="form-group">
                                <Field name="name" type="text" placeholder="Enter name" className="form-control" />
                                <p>{errors.name}</p>
                            </div>
                            <div className="form-group">
                                <Field name="initialInvestment" type="number" placeholder="Enter Initial Investment" className="form-control" />
                            </div>
                            <div className="form-group">
                                <Field name="reasonForInvestment" as="textarea" placeholder="Enter reason for investment" className="form-control" />
                            </div>
                            <div className='form-group'>
                                <label>Investment Risk:</label>
                                <div class="form-check form-check-inline">
                                    <Field name="investmentRisk" type="checkbox"
                                        value="high"
                                        className="form-check-input"
                                    />
                                    <label className="form-check-label" >High</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <Field name="investmentRisk" type="checkbox"
                                        value="medium"
                                        className="form-check-input"
                                    />
                                    <label className="form-check-label" >Medium</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <Field name="investmentRisk" type="checkbox"
                                        value="low"
                                        className="form-check-input"
                                    />
                                    <label className="form-check-label" >Low</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <Field name="dependents" as="select" className="form-control">
                                    <option value={0}>0</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                </Field>
                            </div>
                            <div className="form-group">
                                <Field name="acceptTermsAndConditions" type="checkbox"></Field><label htmlFor="">I agree terms and conditions.</label>
                            </div>
                            <input type="submit" value="Save" className="btn btn-info" />
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default Forms