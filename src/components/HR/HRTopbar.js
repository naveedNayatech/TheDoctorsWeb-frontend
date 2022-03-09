import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { hrLogout } from '../../actions/authActions';
import { getHRNotifications} from '../../actions/HRActions';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, Alert } from 'react-bootstrap';
const moment = require('moment-timezone');

const TopBar = () => {
    
    const dispatch = useDispatch();

    const { isAuthenticated, hr } = useSelector(state => state.hrAuth);
    const {loading, notifications} = useSelector(state => state.hrNoti);

    let hrId = hr._id;

    React.useEffect(() => {
        let sidebar = document.querySelector(".sidebar");
            let sidebarBtn = document.querySelector(".sidebarBtn");
            
            sidebarBtn.onclick = function() {
                sidebar.classList.toggle("active")
    }

    dispatch(getHRNotifications(hrId));
    }, [dispatch]);

    const logoutHandler = () => {
        dispatch(hrLogout());
    }


    
    return (
        <Fragment>
            {/* Top Header */}
            <nav>
            <div className="nav-topbar">
                <div className="left-div">
                    <div className="sidebar-button">
                        <i className="bx bx-menu sidebarBtn"></i>
                        <span className="dashboard">HR <span style={{color: '#F95800'}}>Dashboard</span></span>    
                    </div>
                </div>

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
                                    <Link style={{textDecoration: 'none'}} to={{ pathname: "/hrPatientProfile", state: {patientid: noti?.patientId}}}>
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



                <Dropdown>
                    <Dropdown.Toggle variant="none" id="dropdown-basic" className="profile-details">
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="profileimg" />
                    <span className="admin-name">{isAuthenticated == true && hr && <Fragment>{hr?.firstname} {hr?.lastname}</Fragment>}</span>  
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="admin-topbar-dropdown">
                        <Dropdown.Item>
                            <Link className="dropdown-item" to="/hr"><small>My Profile</small></Link>
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
