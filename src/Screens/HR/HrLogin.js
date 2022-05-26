import React, { useState, Fragment, useEffect } from 'react'
import { Link  } from 'react-router-dom';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../../components/Form/TextField';
import { useAlert } from 'react-alert';
import { hrLogin, clearErrors } from '../../actions/authActions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap'


const HrLogin = ({ history }) => {

    const alert = useAlert();
	const dispatch = useDispatch();

    const validate = Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Email is Required'),
		password: Yup.string() 
		  .min(6, 'Too Short!')
		  .max(20, 'Too Long!')
		  .required('Password is Required')
	  });

    

    const { isAuthenticated, error, loading } = useSelector(state => state.hrAuth);

    useEffect(() => {
		
		if(isAuthenticated === true) {
			history.push("/HrDashboard");
		}

		if(error){			
			alert.error(<div style={{ width: 230 }}>{error}</div>);
			dispatch(clearErrors());
		}

	}, [dispatch, alert, isAuthenticated, error, history])

	const submitHandler = (values) => {
		dispatch(hrLogin(values));
	}


    return (
        <Fragment>
        <MetaData title="HR Login" />
		 <Fragment>
			<div className="login-section">
					<div className="container">
						<div className="row content">
								
							<div className="col-md-12" >
								<h3 className="signin-text">HR <span style={{color: '#ed1b24'}}> Sign in</span></h3>
								<small style={{color: '#385399'}}>Enter valid credentials to log into your account.</small>

								<hr />
								<Formik initialValues={{
									email: '',
									password: '', 
								}}
								validationSchema={validate}
								onSubmit={values => {
									submitHandler(values)
								}}
								>
									{ formik => (
										<div>
											<Form>
												<TextField 
													label="Email Address" 
													name="email" 
													type="email" 
													placeholder="Enter Email"
												/>

												<TextField 
													label="Password" 
													name="password" 
													type="password"	
													placeholder="Enter Password"
												/>

												
												<Link to="/auth/forgot">
													<span className="forgot-password-link">Forgot Password?</span>
												</Link>
												
												<br/><br/>
												

												<div className="row" style={{float: 'right'}}>
													<button className="reset-btn" type="reset"><i className='bx bx-reset' ></i></button>
													<button className="submit-btn ml-3" type="submit">{loading ? <Spinner animation="border" style={{height: '20px', width: '20px'}}/> : 'Login'}</button>
												</div>
											</Form>

											<br/><br/><br/>
												<div className="row-display">
													<Link to="/" style={{textDecoration: 'none', color: '#385399'}}><small>TheDoctorWeb.com</small></Link>
													<small>Switch to <Link to="/doctor/login" style={{textDecoration: 'none', color: '#385399'}}>Doctor</Link></small>
												</div>
										</div>
									)}
								</Formik>											
							</div>
						</div>
					</div>
				</div>
		</Fragment>
			
    </Fragment>
    )
}

export default HrLogin;
