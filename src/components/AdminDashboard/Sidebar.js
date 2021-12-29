import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authActions';
import { useDispatch } from 'react-redux';

const Sidebar = () => {

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
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
                    <Link key="admindashboard" to="/adminDashboard">
                        <i className="bx bx-grid-alt"></i>
                        <span className="link_name">Dashboard</span>
                    </Link>
                </li>


                <li>
                    <Link key="patients" to="/patients">
                    <i className='bx bx-list-ul'></i>
                        <span className="link_name">Patients List</span>
                    </Link>
                </li>

                <li>
                    <Link key="doctors" to="/doctors">
                        <i className="bx bx-user"></i>
                        <span className="link_name">Doctors</span>
                    </Link>
                </li>

                <li>
                    <Link key="hr" to="#">
                        <i className="bx bx-box"></i>
                        <span className="link_name">Human Resource (HR)</span>
                    </Link>
                </li>

                <li>
                    <Link key="rpm_devices" to="/devices">
                        <i className="bx bx-pie-chart-alt-2"></i>
                        <span className="link_name">RPM Devices</span>
                    </Link>
                </li>

                <li>
                    <Link key="inventory" to="#">
                        <i className="bx bx-coin-stack"></i>
                        <span className="link_name">Inventory</span>
                    </Link>
                </li>

                <li>
                    <Link key="generate_reports" to="#">
                        <i className="bx bx-book-alt"></i>
                        <span className="link_name">Generate Report</span>
                    </Link>
                </li>

            
                <li>
                    <Link key="messages" to="#">
                    <i className='bx bx-chat'></i>
                        <span className="link_name">Messages</span>
                    </Link>
                </li>

                <li>
                    <Link key="settings" to="#">
                        <i className="bx bx-cog"></i>
                        <span className="link_name">Settings</span>
                    </Link>
                </li>

                <br/>
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
