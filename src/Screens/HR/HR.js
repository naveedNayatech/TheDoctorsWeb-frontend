import React, {Fragment, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import  HRSidebar from '../../components/HR/HRSidebar';
import HRTopBar from '../../components/HR/HRTopbar';
import MetaData from '../../layouts/MetaData';
import moment from 'moment';
import { Link } from 'react-router-dom';


const HR = () => {
  
const {hr} = useSelector(state => state.hrAuth);

const [seconds, setSeconds] = useState(0);
const [minutes, setMinutes] = useState(0);
const [running, setRunning] = useState(false);

var timer;

const startTimer = () => {
    setRunning(true);
    // document.querySelector('.stop-button').removeAttribute("disabled")
 }

 const resetTimer = () => {
     setRunning(false);
     setSeconds(0);
     setMinutes(0);
 }


useEffect(() => {
    if(running === true){
    timer = setInterval(() => {
        setSeconds(seconds + 1)

        if(seconds === 59){
            setMinutes(minutes + 1)
            setSeconds(0)
        }
    }, 1000)

    return () => clearInterval(timer)
     }
})

const stopTimer = () => {
  clearInterval(timer)  
}

  return <Fragment>
    <MetaData title="Profile" />
            <HRSidebar />
            
            <section className="home-section">
                {/* TopBar */}  
                <HRTopBar />

                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded">
                  <div className="home-content">
                    <div className="container">

                    <div className="row-display">
                      
                        <h5 className="pt-2 mt-2">My <span style={{color: '#007673'}}>Profile</span></h5> 

                        <div className="row-display">
                              <Link to="/HrDashboard">
                                  <button className="btn btn-primary mt-3">
                                      <i className='bx bx-arrow-back'></i>
                                  </button>
                              </Link>
                              &nbsp;&nbsp;
                              <Link to="/HrDashboard">
                                  <button className="btn btn-primary mt-3">
                                  <i className='bx bxs-home'></i>
                                  </button>
                              </Link>
                          </div> 
                    </div>  
                    <hr />

                    <div className="row">
                    <div className="col-md-4">
                        <div>
                            <img src='https://freepikpsd.com/file/2019/10/default-user-image-png-4-Transparent-Images.png' className="img-responsive profile-card-img"/>
                                
                            <p className="profile-name">{hr?.firstname} {hr?.lastname} </p>
                            
                        </div>
                    </div>
                    
                    <div className="col-md-8">
                      <div>
                          <div className="card-inner-margin">
                              <div className="row">
                              <div className="col-md-4">
                                  <span className="profile-label">Email: </span>
                                  <p className="profile-value-text">{hr?.email}</p>

                                  <span className="profile-label">Gender: </span>
                                  <p className="profile-value-text">{hr?.gender}</p>                            
                                  </div>


                                  <div className="col-md-4">
                                      <span className="profile-label">DOB : </span>
                                      <p className="profile-value-text">{moment(hr.DOB).format("ll")}</p>

                                      <span className="profile-label">Phone 1: </span>
                                      <p className="profile-value-text">{hr?.phone1 ? <span style={{color: 'dodgerblue'}}><i className='bx bx-phone'></i> {hr?.phone1} </span> : 'N/A'}</p>                                            
                                  </div>

                                  <div className="col-md-4">
                                      <span className="profile-label">Mobile No: </span>
                                      <p className="profile-value-text">{hr?.mobileNo ? <span style={{color: 'dodgerblue'}}><i className='bx bx-phone'></i> {hr?.mobileNo} </span> : 'N/A'}</p>

                                      <span className="profile-label">Created At: </span>
                                      <p className="profile-value-text">{moment(hr?.createdAt).format("lll")}</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>
                </div>
            </div>

            {/* Practising auto time spent here */}
            <div className="counter-container">
                <p id="counter">{minutes < 10 ? '0'+minutes : minutes} : {seconds < 10 ? '0'+seconds : seconds}</p>
                <button className="btn btn-success start-button shadow-none" onClick={startTimer} disabled={running === true ? true: false}>start</button>&nbsp;
                <button className="btn btn-danger stop-button shadow-none" onClick={stopTimer}>stop</button> &nbsp;
                <button className="btn btn-warning shadow-none" onClick={resetTimer}>Reset</button>

            </div>

            
            <br />

          </div>
        </section>
      </Fragment>;
};

export default HR;
