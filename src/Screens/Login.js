import React, { Fragment, useEffect } from 'react'
import { Link  } from 'react-router-dom';
import TextField from '../components/Form/TextField';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Spinner, Image } from 'react-bootstrap';
import TDW_logo from '../assets/Images/official_logo.png';

import { login, clearErrors } from '../actions/authActions'; 

const Login = ({ history }) => {

	const alert = useAlert();
	const dispatch = useDispatch();

	const {error : loginError } = useSelector(state => state.common);
    
	const validate = Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Email is Required'),
		password: Yup.string() 
		  .min(6, 'Too Short!')
		  .max(20, 'Too Long!')
		  .required('Password is Required'),
		role:Yup.string().required('Select Role')
	  });

	const { isAuthenticated, error, loading } = useSelector(state => state.auth);

	useEffect(() => {
		
		if(isAuthenticated === true) {
			history.push("/adminDashboard");
		}

		if(error){
			alert.error(error);
			dispatch(clearErrors());
		}

		if(loginError) {
			alert.error(loginError);
		}

	}, [dispatch, alert, isAuthenticated, error, loginError, history])
	
	
	const submitHandler = (values) => {
		dispatch(login(values));
	}
	
    return (
    	<Fragment>
		<MetaData title="Login" />
		 <Fragment>
				<div className="login-section">
					<div className="container">
						<div className="row content">
							<Image src={TDW_logo} style={{height:"80px"}} alt="logo"/>		
								
							<div className="col-md-12" >
								<hr />
								<h3 className="signin-text">Admin <span style={{color: '#004aad'}}> Sign in</span></h3>
								<small style={{color: "#385399"}}>Enter valid credentials to log into your account.</small>

								<hr />
								<Formik initialValues={{
									email: '',
									password: '', 
									role: 'admin'
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
													<button className="submit-btn ml-3" type="submit">
														{loading ? <Spinner animation="border" style={{height: '20px', width: '20px'}}/> : 
														'Login'}
													</button>
												</div>
											</Form>

											<br/><br/><br/>
												<div className="row-display">
													<Link to="/" style={{textDecoration: 'none', color: "#385399"}}><small>TheDoctorWeb.com</small></Link>
													<small>Switch to <Link to="/doctor/login" style={{textDecoration: 'none', color: "#385399"}}>Doctor</Link></small>
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

export default Login
