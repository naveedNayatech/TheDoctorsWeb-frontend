import React, { Fragment, useEffect } from 'react'
import { Link  } from 'react-router-dom';
import TextField from '../components/Form/TextField';
import Selectbox from '../components/Form/Selectbox';
import MetaData from '../layouts/MetaData';
import Loader from '../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap'

import { login, clearErrors } from '../actions/authActions'; 

const Login = ({ history }) => {

	const alert = useAlert();
	const dispatch = useDispatch();

	const {message, error : loginError } = useSelector(state => state.common);
    
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
			alert.error(<div style={{ width: 230 }}>{error}</div>);
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
								
							<div className="col-md-12" >
								<h3 className="signin-text">Sign <span style={{color: '#F95800'}}>in</span></h3>
								<small style={{color: 'dodgerblue'}}>Enter valid credentials to log into your account.</small>

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

												<Selectbox 
													label="Select Role"
													name="role"
												/>

												
												<Link to="/auth/forgot">
													<span className="forgot-password-link">Forgot Password?</span>
												</Link>
												
												<br/><br/>
												

												<div className="row-class" style={{justifyContent: 'space-between'}}>
													<button className="reset-btn" type="reset">Reset</button>
													<button className="submit-btn ml-3" type="submit">{loading ? <Spinner animation="border" style={{height: '20px', width: '20px'}}/> : 'Login'}</button>
												</div>
											</Form>

											<br/><br/><br/>
												<div className="row" style={{justifyContent: 'space-between'}}>
													<Link to="/" style={{textDecoration: 'none'}}><small>TheDoctorWeb.com</small></Link>
													<small>Login as <Link to="/stafflogin" style={{textDecoration: 'none'}}>Doctor</Link></small>
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
