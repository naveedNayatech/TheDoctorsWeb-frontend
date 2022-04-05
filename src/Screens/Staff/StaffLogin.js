import React, { useState, Fragment, useEffect } from 'react'
import { Link  } from 'react-router-dom';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../../components/Form/TextField';
import { useAlert } from 'react-alert';
import { staffLogin, clearErrors } from '../../actions/authActions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Spinner } from 'react-bootstrap'


const StaffLogin = ({ history }) => {

    const alert = useAlert();
	const dispatch = useDispatch();

    const validate = Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Email is Required'),
		password: Yup.string() 
		  .min(6, 'Too Short!')
		  .max(20, 'Too Long!')
		  .required('Password is Required')
	  });

    

    const { isAuthenticated, error, loading } = useSelector(state => state.staffAuth);

    useEffect(() => {
		
		if(isAuthenticated === true) {
			history.push("/Dashboard");
		}

		if(error){			
			alert.error(<div style={{ width: 230 }}>{error}</div>);
			dispatch(clearErrors());
		}

	}, [dispatch, alert, isAuthenticated, error, history])

	const submitHandler = (values) => {
		dispatch(staffLogin(values));
	}


    return (
        <Fragment>
        <MetaData title="Doctor Login" />
		 <Fragment>
			<div className="login-section">
					<div className="container">
						<div className="row content">
								
							<div className="col-md-12" >
								<h3 className="signin-text">Doctor <span style={{color: '#F95800'}}> Sign in</span></h3>
								<small style={{color: 'dodgerblue'}}>Enter valid credentials to log into your account.</small>

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
												

												<div className="row-class" style={{justifyContent: 'space-between'}}>
													<button className="reset-btn" type="reset">Reset</button>
													<button className="submit-btn ml-3" type="submit">{loading ? <Spinner animation="border" style={{height: '20px', width: '20px'}}/> : 'Login'}</button>
												</div>
											</Form>

											<br/><br/><br/>
												<div className="row" style={{justifyContent: 'space-between'}}>
													<Link to="/" style={{textDecoration: 'none'}}><small>TheDoctorWeb.com</small></Link>
													<small>Login as <Link to="/hrLogin" style={{textDecoration: 'none'}}>HR</Link></small>
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

export default StaffLogin;
