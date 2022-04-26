import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/authActions';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, Alert } from 'react-bootstrap';
import { getAdminNotifications } from '../../actions/adminActions';
import { useAlert } from 'react-alert';
const moment = require('moment-timezone');

const TopBar = () => {
    
    const dispatch = useDispatch();
    const alert = useAlert();

    const { notifications, error} = useSelector(state => state.adminNoti);

    useEffect(() => {
        if(error) {
            alert.error(error);
        }
        dispatch(getAdminNotifications());
  }, [dispatch]);


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
                    <div className="nav-topbar">
                        <div className="left-div">
                            <div className="sidebar-button">
                                <i className="bx bx-menu sidebarBtn"></i>
                                <span className="dashboard">Admin <span style={{color: '#F95800'}}>Dashboard</span></span>    
                        </div>
                    </div>

                        {/* Notifications */}
                        <div className="right-div">
                        <div className="notification-dropdown">
                        <Dropdown className="admin-topbar-dropdown">
                            <Dropdown.Toggle variant="link" id="dropdown-basic">

                            <i className='bx bx-bell' style={{color: 'red', fontSize: '20px'}}></i>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="admin-topbar-notification-dropdown">
                            {notifications && notifications?.data?.map((noti, index) =>(
                                <Dropdown.Item key={index} className="drop-down-item-active">
                                    {noti?.noti_type === 'bp' ? <>
                                    <Link style={{textDecoration: 'none'}} to={{ pathname: "/patientProfile", state: {patientid: noti?.patientId}}}>
                                    <Alert className="notification-text" variant={noti?.status === "High" ? "danger" : noti?.status === 'Elevated' ? "warning" : "info"}>
                                        <small>{noti?.textAny}</small>
                                        <div>
                                            <small style={{fontSize: '12px', color: 'gray', float:'right'}}>{moment(noti?.createdAt).tz("America/New_York").format("lll")}</small>
                                          
                                        </div>    
                                    </Alert>
                                </Link></> : <>
                                <Link style={{textDecoration: 'none'}} to="/adminDashboard">
                                    <Alert className="notification-text" variant={noti?.status === "High" ? "danger" : noti?.status === 'Elevated' ? "warning" : "info"}>
                                        <small>{noti?.textAny}</small>
                                        <div>
                                            <small style={{fontSize: '12px', color: 'gray', float:'right'}}>{moment(noti?.createdAt).tz("America/New_York").format("lll")}</small>
                                        
                                        </div>    
                                    </Alert>
                                </Link>
                                </>    
                                }
                                
                                </Dropdown.Item>
                            ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        </div>
                        {/* Notifications */}


                        <Dropdown>
                            <Dropdown.Toggle variant="none" id="dropdown-basic" className="profile-details">
                            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="profileimg" />
                            <span className="admin-name">{isAuthenticated == true && user && user?.name}</span>  
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="admin-topbar-dropdown">
                                <Dropdown.Item>
                                    <Link className="dropdown-item" to="/me"><small>My Profile</small></Link>
                                </Dropdown.Item>
                                
                                <Dropdown.Item >
                                    <Link className="dropdown-item" to="#" onClick={logoutHandler} style={{color: "red"}}><small>Logout</small></Link>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                </nav>
                <br />
        </Fragment>
    )
}

export default TopBar;
