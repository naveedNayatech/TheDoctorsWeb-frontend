import React, { Fragment, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { staffLogout } from '../../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';

const Sidebar = (props) => {

    const { isAuthenticated, staff} = useSelector(state => state.staffAuth);
    const dispatch = useDispatch();

    useEffect(() => {
		
		if(isAuthenticated === false) {
			props?.history?.push("/stafflogin");
		}
	}, [isAuthenticated])


    const logoutHandler = () => {
        dispatch(staffLogout());
    }


    return (
        <Fragment>
            <div className="sidebar">
            <div className="logo-details">
                <i className="bx bxl-c-plus-plus"></i>
                <span className="logo_name">TheDoctorsWeb</span>
            </div>

            <ul className="nav-links">
                <li>
                    <NavLink key="dashboard" to="/Dashboard" activeClassName="link-name-active">
                    <i className='bx bx-list-ul'></i>
                        <span className="link_name">My Dashboard</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink key="staffPatients" to="/staffPatients" activeClassName="link-name-active">
                    <i className='bx bx-list-ul'></i>
                        <span className="link_name">My Patients</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink key="doctors" to="/staffProfile" activeClassName="link-name-active">
                        <i className="bx bx-user"></i>
                        <span className="link_name">My Profile</span>
                    </NavLink>
                </li>

 
                <li>
                    <Link key="logout" to="#" onClick={logoutHandler}>
                        <i className="bx bx-log-out"></i>
                        <span className="link_name">Logout</span>
                    </Link>
                </li>
            </ul>
        </div>    
        </Fragment>
    )
}

export default Sidebar;
