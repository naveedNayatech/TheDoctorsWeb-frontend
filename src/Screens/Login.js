import React, { useState, Fragment, useEffect } from 'react'
import AdminLoginImg from '../assets/Images/admin-login.jpg';
import { Link  } from 'react-router-dom';
import MetaData from '../layouts/MetaData';
import Loader from '../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';


import { login, clearErrors } from '../actions/authActions'; 

const Login = ({ history }) => {


	const alert = useAlert();
	const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin');

	const { isAuthenticated, error, loading } = useSelector(state => state.auth);

	useEffect(() => {
		
		if(isAuthenticated === true) {
			history.push("/adminDashboard");
		}

		if(error){
			
			alert.error(<div style={{ width: 230 }}>{error}</div>);
			dispatch(clearErrors());
		}

	}, [dispatch, alert, isAuthenticated, error, history])
	
	
	const submitHandler = (e) => {
        e.preventDefault();
		dispatch(login(email, password, role));
	}
	
    return (
    	<Fragment>
		<MetaData title="Login" />
		{loading ? <Loader /> : <Fragment>
				<div className="login-section">
					<div className="container">
						<div className="row content">
							<div className="col-md-6 mb-3">
								<img src={AdminLoginImg} className="img-fluid login-card-img" alt="img" />
							</div>

							<div className="vl"></div>

							<div className="col-md-1 mb-3">
								
							</div>	

							<div className="col-md-4" >
								<h3 className="signin-text mb-3">Login</h3>
								<hr />
									<form onSubmit={submitHandler} >
											<div className="form-group">
												<label htmlFor="email"><i className='bx bx-envelope label-icons'></i> Email</label>
													<input 
													type="email" 
													name="email" 
													className="form-control" 
													autoComplete="off" 
													placeholder="Email"
													value={email}		
													onChange={(e) => setEmail(e.target.value)}
													/>
											</div>
											
											<div className="form-group">
												<label htmlFor="password"><i className='bx bx-lock-alt label-icons'></i> Password</label>
													<input 
													type="password" 
													name="password" 
													className="form-control" 
													autoComplete="off" 
													placeholder="Password"
													value={password}
													onChange={(e) => setPassword(e.target.value)}
													/>
											</div>

											<div className="form-group">
												<label htmlFor="role"><i className='bx bx-user label-icons'></i> Role</label>
												<select 
													name="role" 
													className="form-control" 
													value={role} 
													onChange={(e) => setRole(e.target.value)}
													>
													<option value="admin">admin</option>
													<option value="doctor">HR</option>
												</select>
											</div>
											
											<div className="form-group">
												<Link to="/login">
													<span className="forgot-password-link">Forgot Password?</span>
												</Link>
											</div>

											<br />
											<div className="form-group form-check">
												<input type="checkbox" name="checkbox" className="form-check-input" id="checkbox" />
												<label className="form-check-label" htmlFor="checkbox">Remember Me</label>
											</div>
											
											<button className="btn login-btn-class" type="submit"> 
												Login
											</button>
									</form>	
							</div>
						</div>
					</div>
				</div>
		</Fragment>}
        
    </Fragment>
    )
}

export default Login
