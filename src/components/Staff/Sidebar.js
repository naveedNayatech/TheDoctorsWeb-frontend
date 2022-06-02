import React, { Fragment, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { staffLogout } from '../../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';

const Sidebar = (props) => {

    const { isAuthenticated, staff} = useSelector(state => state.staffAuth);
    const dispatch = useDispatch();

    useEffect(() => {
		
		if(isAuthenticated === false) {
			props?.history?.push("/doctor/login");
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
                    <NavLink key="dashboard" to="/doctor/dashboard" activeClassName="link-name-active">
                    <i className='bx bx-list-ul'></i>
                        <span className="link_name">My Dashboard</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink key="staffPatients" to="/doctor/patients" activeClassName="link-name-active">
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
                    <NavLink key="doctors" to="/doctor/careplan" activeClassName="link-name-active">
                        <i className="bx bx-file"></i>
                        <span className="link_name">Careplan</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="timesummaryreport" to="/doctor/report/timesummaryreport" activeClassName="link-name-active">
                    <i className='bx bxs-timer'></i>
                        <span className="link_name">Time Summary Report</span>
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
