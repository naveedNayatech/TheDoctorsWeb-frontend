import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
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
                <span className="logo_name">THEDOCTORS<span style={{color: '#F95800'}}>WEB</span></span>
            </div>

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
                    <NavLink key="inventory" to="/devices" activeClassName="link-name-active">
                        <i className="bx bx-pie-chart-alt-2"></i>
                        <span className="link_name">Inventory</span>
                    </NavLink>
                </li>

               

                <br/>
                <li>
                    <NavLink key="logout" to="#" onClick={logoutHandler}>
                        <i className="bx bx-log-out" style={{color: 'red'}}></i>
                        <span className="link_name" style={{color: 'red'}}>Logout</span>
                    </NavLink>
                </li>
            </ul>
        </div>    
        </Fragment>
    )
}

export default Sidebar;
