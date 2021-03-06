import React, { Fragment, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { hrLogout } from '../../actions/authActions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import TDW_logo from '../../assets/Images/official_logo.png';

const HRSidebar = (props) => {

    const { isAuthenticated, hr} = useSelector(state => state.hrAuth);
    const dispatch = useDispatch();

    useEffect(() => {
		if(isAuthenticated === false) {
			props?.history?.push("/hr/login");
		}
	}, [isAuthenticated])


    const logoutHandler = () => {
        dispatch(hrLogout());
    }


    return (
        <Fragment>
            <div className="sidebar">
            <div className="logo-details" style={{backgroundColor:'#FFF'}}>
                <img src={TDW_logo} className="logoImg" alt="logo" />
            </div>

            <ul className="nav-links">
                <li className="nav_link">
                    <NavLink key="dashboard" to="/HrDashboard" activeClassName="link-name-active">
                    <i className='bx bx-list-ul'></i>
                        <span className="link_name">My Dashboard</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="hrpatients" to="/HrPatients" activeClassName="link-name-active">
                    <i className='bx bx-user'></i>
                        <span className="link_name">Patients</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="timeReport" to="/timeReport" activeClassName="link-name-active">
                    <i className='bx bx-time-five'></i>
                        <span className="link_name">Time Report</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="timesummaryreport" to="/hr/report/timesummaryreport" activeClassName="link-name-active">
                    <i className='bx bxs-timer'></i>
                        <span className="link_name">Time Summary Report</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="careplans" to="/HR/careplans" activeClassName="link-name-active">
                        <i className="bx bx-file"></i>
                        <span className="link_name">Careplans</span>
                    </NavLink>
                </li>

 
                <li>
                    <NavLink key="logout" to="#" onClick={logoutHandler}>
                        <i className="bx bx-log-out"></i>
                        <span className="link_name">Logout</span>
                    </NavLink>
                </li>
            </ul>
        </div>    
        </Fragment>
    )
}

export default HRSidebar;
