import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authActions';
import { useSelector, useDispatch } from 'react-redux';

const TopBar = () => {
    
    const dispatch = useDispatch();

    const { isAuthenticated, user } = useSelector(state => state.auth);

    React.useEffect(() => {
        let sidebar = document.querySelector(".sidebar");
            let sidebarBtn = document.querySelector(".sidebarBtn");
            
            sidebarBtn.onclick = function() {
                sidebar.classList.toggle("active")
    }
    });

    const logoutHandler = () => {
        dispatch(logout());
    }

    
    return (
        <Fragment>
            {/* Top Header */}
            <nav>
                    <div className="sidebar-button">
                        <i className="bx bx-menu sidebarBtn"></i>
                        <span className="dashboard">Dashboard</span>    
                    </div>


                    <div className="search-box">
                        <input type="text" placeholder="Search here..." autoComplete="off" />
                        <i className="bx bx-search"></i>
                    </div>

                    <div className="profile-details btn dropdown-toggle" type="button" 
                                id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" area-expanded="false">
                        <img src="https://i.pinimg.com/originals/a2/de/39/a2de3954697c636276192afea0a6f661.jpg" alt="profileimg" />
                        <span className="admin-name">{isAuthenticated == true && user && user?.name}</span>
                           
                    </div>

                    <div className="dropdown-menu">
                                    
                        <Link className="dropdown-item" to="/me"><small>My Profile</small></Link>

                        <Link className="dropdown-item" to="#" onClick={logoutHandler} style={{color: "red"}}><small>Logout</small></Link>
                    </div>
                </nav>
                <br />
        </Fragment>
    )
}

export default TopBar;
