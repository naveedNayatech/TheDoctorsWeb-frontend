import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { hrLogout } from '../../actions/authActions';
import { getHRNotifications, timeSpentOnPatientAuto} from '../../actions/HRActions';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, Alert } from 'react-bootstrap';
const moment = require('moment-timezone');
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import {useAlert} from 'react-alert';

const TopBar = ({displayTimer, patientid}) => {
    
    const dispatch = useDispatch();
    const alert = useAlert();

    // start/stop timer
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [running, setRunning] = useState(false);


    // submit Modal
    const [addTimeShow, setAddTimeShow] = useState(false);
    const [description, setDescription] = useState('');
    const handleShow = () => setAddTimeShow(true);
    const [error, setError] = useState('');

    const { isAuthenticated, hr } = useSelector(state => state.hrAuth);
    const { notifications} = useSelector(state => state.hrNoti);
    const { isSuccessful } = useSelector(state => state.timeSpent);

    let hrId = hr._id;

    React.useEffect(() => {
        let sidebar = document.querySelector(".sidebar");
            let sidebarBtn = document.querySelector(".sidebarBtn");
            
            sidebarBtn.onclick = function() {
                sidebar.classList.toggle("active")
    }


    dispatch(getHRNotifications(hrId));
    }, [dispatch, isSuccessful]);

    const logoutHandler = () => {
        dispatch(hrLogout());
    }

    const handleClose = () => setAddTimeShow(false);

    

    var counter;
    React.useEffect(() => {
        if(running === true){
            counter = setInterval(() => {
            setSeconds(seconds + 1)
    
            if(seconds === 59){
                setMinutes(minutes + 1)
                setSeconds(0)
            }
        }, 1000)
    
        return () => clearInterval(counter)
         }
    })


        const startTimer = () => {
            setRunning(true);
        }

        const stopTimer = () => {
            clearInterval(counter)  
        }

        const resetTimer = () => {
            setRunning(false);
            setSeconds(0);
            setMinutes(0);
        }

        const submitHandler = () => {
            if(minutes < 1) {
                setError('minute shouldnt be less than 1');
                return
            }

            if(description === '') {
                setError('Notes cannot be empty');
            }

            dispatch(timeSpentOnPatientAuto(patientid, hrId ,minutes, description));
            resetTimer();
            setAddTimeShow(false)
        }
    
    return (
        <Fragment>
            {/* Top Header */}
            <nav>
            <div className="nav-topbar">
                <div className="left-div">
                    <div className="sidebar-button">
                        <i className="bx bx-menu sidebarBtn"></i>
                        <span className="dashboard">HR <span style={{color: '#004aad'}}>Dashboard</span></span>    
                    </div>
                </div>


                {/* TIMER */}
                {displayTimer === 'yes' ? <>
                <div style={{
                    backgroundColor: '#23408e',
                    width: '32%',
                    padding: '10px',
                    overflowX: 'hidden',
                    borderRadius: '10px',
                    color: "#FFF"
                }} className="row-display">
                <h4 id="counter">{minutes < 10 ? '0'+minutes : minutes} : {seconds < 10 ? '0'+seconds : seconds}</h4>
                
                   <div className="ml-5">
                       <button className="btn btn-success btn-sm start-button shadow-none" onClick={startTimer} disabled={running === true ? true: false}><i className='bx bx-play'></i></button>&nbsp;
                       <button className="btn btn-danger btn-sm stop-button shadow-none" onClick={stopTimer}><i className='bx bx-stop'></i></button> &nbsp;
                       <button className="btn btn-warning btn-sm shadow-none" onClick={resetTimer}><i className='bx bx-reset' ></i></button>
                       <button className="btn btn-info btn-sm ml-1 shadow-none" onClick={handleShow}><small>Submit</small></button>
                   </div>
                </div>
                {/* TIMER */}
                </> : <>
                <div style={{
                    width: '25vw',
                    padding: '15px',
                }} className="row-display"></div>
                </>}
                

                
                &nbsp;&nbsp;&nbsp;    
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
                                <Link style={{textDecoration: 'none'}} to="/HrDashboard">
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


        {/* Time spent Modal */}
        <Modal show={addTimeShow} onHide={handleClose}>
         <Modal.Header >
            <Modal.Title>Add Time</Modal.Title> 
            <Button variant="danger" onClick={handleClose}><i className='bx bx-x'></i></Button>
         </Modal.Header>

            <Modal.Body>

            {error ? <small style={{color: 'red'}}>{error}</small> : ' '}

                <Formik 
                initialValues={{
                    description: '', 
                }}
                onSubmit={() => {submitHandler()}}>
                { formik => (
                    <div>
                        <Form>
                        <input 
                                label="Mins Spent"
                                className="form-control"	
                                value={minutes} 
                                placeholder="Type description here .... "
                                disabled
                        />
                    
                        <br />
                        <textarea 
                                label="Description" 
                                name="description"
                                className="form-control shadow-none"
                                rows="4"	
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Type description here .... "
                        />
                        <br />

                        <div className="row-class" style={{justifyContent: 'space-between'}}>
                            <button className="reset-btn ml-3 shadow-none" type="submit">Submit</button>
                        </div>
                        </Form>
                    </div>
                )}   
                </Formik>   
            </Modal.Body>
        </Modal>
        {/* Time spent Modal ended here */}
        </Fragment>
    )
}

export default TopBar;
