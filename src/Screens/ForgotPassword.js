import React, {Fragment, useEffect} from 'react';
import { Link  } from 'react-router-dom';
import TextField from '../components/Form/TextField';
import MetaData from '../layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { forgotpassword } from '../actions/authActions';


const ForgotPassword = ({history}) => {

    const alert = useAlert();
	const dispatch = useDispatch();
    const {error, message} = useSelector(state => state.common);

    useEffect(() => {
        if(message){
            alert.success(message)
        }

        if(error){
            alert.error(error)
        }
    }, [message, error])


    const validate = Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Email is Required'),
	  });

    const submitHandler = (values) => {
        dispatch(forgotpassword(values));
    }

  return (
    <Fragment>
		<MetaData title="Login" />
		 <Fragment>
				<div className="login-section">
					<div className="container">
						<div className="row content">
								
							<div className="col-md-12" >
								<h3 className="signin-text">Forgot <span style={{color: '#F95800'}}>Password</span></h3>
								<small style={{color: 'dodgerblue'}}>Please enter your email address.</small>
                                <br/><br/>
								<Formik initialValues={{
									email: '',
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
												
												<br/><br/>
												

												<div className="row-class" style={{justifyContent: 'space-between'}}>
													<button className="reset-btn" type="reset">Reset</button>
													<button className="submit-btn ml-3" type="submit">Send Email</button>
												</div>
											</Form>

											<br/><br/><br/>
												<div className="row" style={{justifyContent: 'space-between'}}>
													<Link to="/" style={{textDecoration: 'none'}}><small>TheDoctorWeb.com</small></Link>
													<small><button className="btn btn-link" style={{textDecoration: 'none', fontSize: '12px'}} onClick={() => history.goBack()}>Go Back</button></small>
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

export default ForgotPassword