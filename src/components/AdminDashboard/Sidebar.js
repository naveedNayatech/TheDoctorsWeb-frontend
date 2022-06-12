import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../../actions/authActions';
import { useDispatch } from 'react-redux';
import TDW_logo from '../../assets/Images/official_logo.png';

const Sidebar = () => {

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <Fragment>
            <div className="sidebar">
            <div className="logo-details">
                <img src={TDW_logo} className="logoImg" alt="logo" />
            </div>

            <hr className="blue-hr"/>
            <ul className="nav-links">
                <li className="nav_link">
                    <NavLink key="admindashboard" to="/adminDashboard" activeClassName="link-name-active">
                        <i className="bx bx-grid-alt"></i>
                        <span className="link_name">Dashboard</span>
                    </NavLink>
                </li>


                <li className="nav_link">
                    <NavLink key="patients" to="/patients" activeClassName="link-name-active">
                    <i className='bx bx-list-ul'></i>
                        <span className="link_name">Patients</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="doctors" to="/doctors" activeClassName="link-name-active">
                        <i className="bx bx-user"></i>
                        <span className="link_name">Doctors</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="hr" to="/hrlist" activeClassName="link-name-active">
                         <i className='bx bxs-user'></i>
                        <span className="link_name">Nurse Resources</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="timereport" to="/Admin/Report">
                        <i className='bx bx-time-five'></i>
                        <span className="link_name">Time Report</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="telemetarydatareport" to="/report/telemetary" activeClassName="link-name-active">
                    <i className='bx bx-heart'></i>
                        <span className="link_name">Telemetary Data Report</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="ndjaiusd" to="/Admin/Report/InitialMonth" activeClassName="link-name-active">
                        <i className="bx bx-grid-alt"></i>
                        <span className="link_name">Initial Month Report</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="ksandasd" to="/report/timesummaryreport" activeClassName="link-name-active">
                    <i className='bx bxs-timer'></i>
                        <span className="link_name">Time Summary Report</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="knsadan" to="/Admin/Report/patient" activeClassName="link-name-active">
                        <i className='bx bxs-report'></i>
                        <span className="link_name">Patient CP</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="inventory" to="/devices" activeClassName="link-name-active">
                         <i className='bx bxs-data'></i>
                        <span className="link_name">Inventory Management</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="'managelogs'" to="/logs" activeClassName="link-name-active">
                    <i className='bx bx-slider-alt'></i>
                        <span className="link_name">Manage Logs</span>
                    </NavLink>
                </li>

                <li className="nav_link">
                    <NavLink key="credentials" to="/credentials" activeClassName="link-name-active">
                        <i className='bx bxs-lock'></i>
                        <span className="link_name">Hard Reset Password</span>
                    </NavLink>
                </li>
            </ul>
        </div>    
        </Fragment>
    )
}

export default Sidebar;
