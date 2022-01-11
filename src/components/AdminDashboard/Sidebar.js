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
                        <span className="link_name">Patients</span>
                    </Link>
                </li>

                <li>
                    <Link key="doctors" to="/doctors">
                        <i className="bx bx-user"></i>
                        <span className="link_name">Doctors</span>
                    </Link>
                </li>


                <li>
                    <Link key="rpm_devices" to="/devices">
                        <i className="bx bx-pie-chart-alt-2"></i>
                        <span className="link_name">RPM Devices</span>
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
