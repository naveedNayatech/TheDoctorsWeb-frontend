import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import  HRSidebar from '../../components/HR/HRSidebar';
import HRTopBar from '../../components/HR/HRTopbar';
import MetaData from '../../layouts/MetaData';
import moment from 'moment';
import { Link } from 'react-router-dom';
import patientProfileImg from "../../assets/Images/patientProfile.png";

const HR = () => {
  
const {hr} = useSelector(state => state.hrAuth);

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
                      
                        <h5 className="pt-2 mt-2">My <span style={{color: '#004aad'}}>Profile</span></h5> 

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
                            <img src={patientProfileImg} className="img-responsive profile-card-img"/>
                                
                            <p className="profile-name">HR. {hr?.firstname} {hr?.lastname} </p>
                            
                        </div>
                    </div>
                    
                    <div className="col-md-8">
                      <div>
                          <div className="card-inner-margin">
                              <div className="row">
                              <div className="col-md-4">
                                  <span className="profile-label">Email: </span>
                                  <p className="profile-value-text" style={{wordWrap: 'break-word'}}>{hr?.email}</p>

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

          </div>
        </section>
      </Fragment>;
};

export default HR;
