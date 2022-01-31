import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { hrLogout } from '../../actions/authActions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const HRSidebar = (props) => {

    const { isAuthenticated, hr} = useSelector(state => state.hrAuth);
    const dispatch = useDispatch();

    useEffect(() => {
		if(isAuthenticated === false) {
			props?.history?.push("/hrlogin");
		}
	}, [isAuthenticated])


    const logoutHandler = () => {
        dispatch(hrLogout());
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
                    <Link key="dashboard" to="/HrDashboard">
                    <i className='bx bx-list-ul'></i>
                        <span className="link_name">My Dashboard</span>
                    </Link>
                </li>

                <li>
                    <Link key="staffPatients" to="/HrPatients">
                    <i className='bx bx-list-ul'></i>
                        <span className="link_name">My Patients</span>
                    </Link>
                </li>

                <li>
                    <Link key="doctors" to="/hr">
                        <i className="bx bx-user"></i>
                        <span className="link_name">My Profile</span>
                    </Link>
                </li>

 
                <li style={{backgroundColor: 'orangered'}}>
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

export default HRSidebar;
