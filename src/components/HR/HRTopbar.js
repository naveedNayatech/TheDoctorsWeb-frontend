import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { hrLogout } from '../../actions/authActions';
import { useSelector, useDispatch } from 'react-redux';

const TopBar = () => {
    
    const dispatch = useDispatch();

    const { isAuthenticated, hr } = useSelector(state => state.hrAuth);

    React.useEffect(() => {
        let sidebar = document.querySelector(".sidebar");
            let sidebarBtn = document.querySelector(".sidebarBtn");
            
            sidebarBtn.onclick = function() {
                sidebar.classList.toggle("active")
    }
    });

    const logoutHandler = () => {
        dispatch(hrLogout());
    }


    
    return (
        <Fragment>
            {/* Top Header */}
            <nav>
                    <div className="sidebar-button">
                        <i className="bx bx-menu sidebarBtn"></i>
                        <span className="dashboard">HR <span style={{color: '#F95800'}}>Dashboard</span></span>    
                    </div>


                        <div className="profile-details btn dropdown-toggle" type="button" 
                            id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" area-expanded="false">
                        <img src="https://i.stack.imgur.com/l60Hf.png" alt="profileimg" />
                        <span className="admin-name">{isAuthenticated == true && hr && <Fragment>{hr?.firstname} {hr?.lastname}</Fragment>}</span>
                           
                    </div>

                    <div className="dropdown-menu">
                                    
                        <Link className="dropdown-item" to="/hr">My Profile</Link>

                        <Link className="dropdown-item" to="#" onClick={logoutHandler} style={{color: "red"}}>Logout</Link>
                    </div>
                </nav>
                <hr className="blue-hr"/>
        </Fragment>
    )
}

export default TopBar;
