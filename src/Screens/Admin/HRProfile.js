import React, {Fragment} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import moment from 'moment';
import {Link} from 'react-router-dom';


const HRProfile = (props) => {

  let hrInfo = props?.location?.state?.hr;
  let doctor = props?.location?.state?.hr?.assigned_doctor_id;


  return <Fragment>
      <MetaData title="HR Profile"/>
        <Sidebar />    

        <section className="home-section">
        {/* TopBar */}
        <TopBar />

        <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded">
            <div className="home-content">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-6 col-md-8 col-sm-12 col-xs-12">
                        <h5 className="pt-2 mt-2">HR <span style={{color: '#F95800'}}> Profile </span></h5> 
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <Link to={{ pathname: "/assignDrToHr", state: {id: hrInfo?._id, firstName: hrInfo?.firstname, lastName: hrInfo?.lastname}}} 
                            className="add-staff-btn mt-2">Assign Doctor to Hr. {hrInfo?.lastname}
                        </Link>
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <Link to={{ pathname: "/assignPatientToHr", state: {id: hrInfo?._id, firstName: hrInfo?.firstname, lastName: hrInfo?.lastname}}} 
                            className="add-staff-btn mt-2">Assign patient to Hr. {hrInfo?.lastname}
                        </Link>
                    </div>
                    
                    </div>
                    <hr className="blue-hr"/>



                        <div className="row">
                            <div className="col-md-4">
                                <div>
                                    <img src='https://freepikpsd.com/file/2019/10/default-user-image-png-4-Transparent-Images.png' className="img-responsive profile-card-img"/>
                                        
                                    <p className="profile-name">{hrInfo?.firstname} {hrInfo?.lastname} </p>
                                    
                                </div>
                            </div>

                            <div className="col-md-8">
                                <div>
                                    <div className="card-inner-margin">
                                        <div className="row">
                                        <div className="col-md-4">
                                            <span className="profile-label">Email: </span>
                                            <p className="profile-value-text">{hrInfo?.email}</p>

                                            <span className="profile-label">Gender: </span>
                                            <p className="profile-value-text">{hrInfo?.gender}</p>                            
                                            </div>


                                            <div className="col-md-4">
                                                <span className="profile-label">DOB : </span>
                                                <p className="profile-value-text">{moment(hrInfo.DOB).format("ll")}</p>

                                                <span className="profile-label">Phone 1: </span>
                                                <p className="profile-value-text">{hrInfo?.phone1 ? <span style={{color: 'dodgerblue'}}><i className='bx bx-phone'></i> {hrInfo?.phone1} </span> : 'N/A'}</p>                                            
                                            </div>

                                            <div className="col-md-4">
                                                <span className="profile-label">Mobile No: </span>
                                                <p className="profile-value-text">{hrInfo?.mobileNo ? <span style={{color: 'dodgerblue'}}><i className='bx bx-phone'></i> {hrInfo?.mobileNo} </span> : 'N/A'}</p>

                                                <span className="profile-label">Created At: </span>
                                                <p className="profile-value-text">{moment(hrInfo?.createdAt).format("lll")}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>    

                    {/* HR To Doctor */}
                    {doctor && <Fragment>
                        <h5 className="pt-2 mt-2">Doctor <span style={{color: '#F95800'}}> Details </span></h5>
                        <hr className="blue-hr" />

                            <div className="row">
                            <div className="col-md-4">
                                <div>
                                    <img src={doctor?.avatar?.url ? doctor?.avatar?.url : 'https://freepikpsd.com/file/2019/10/default-user-image-png-4-Transparent-Images.png'} className="img-responsive profile-card-img"/>
                                        
                                    <p className="profile-name">Dr. {doctor?.firstname} {doctor?.lastname} </p>
                                    
                                </div>
                            </div>

                            <div className="col-md-8">
                                <div>
                                    <div className="card-inner-margin">
                                        <div className="row">
                                        <div className="col-md-4">
                                            <span className="profile-label">Email: </span>
                                            <p className="profile-value-text">{doctor?.email}</p>

                                            <span className="profile-label">Gender: </span>
                                            <p className="profile-value-text">{doctor?.gender}</p>

                                            <span className="profile-label">License Number: </span>
                                            <p className="profile-value-text">{doctor?.licensenumber ? doctor?.licensenumber : 'N/A'}</p>
                                            
                                            </div>


                                            <div className="col-md-4">
                                                <span className="profile-label">DOB : </span>
                                                <p className="profile-value-text">{moment(doctor.DOB).format("ll")}</p>

                                                <span className="profile-label">Phone 1: </span>
                                                <p className="profile-value-text">{doctor?.phone1 ? <span style={{color: 'dodgerblue'}}><i className='bx bx-phone'></i> {doctor?.phone1} </span> : 'N/A'}</p>
                                                
                                                <span className="profile-label">Created At: </span>
                                                <p className="profile-value-text">{moment(doctor?.createdAt).format("lll")}</p>
                                            
                                            </div>

                                            <div className="col-md-4">
                                                <span className="profile-label">NPI #: </span>
                                                <p className="profile-value-text">{doctor?.licensenumber}</p>

                                                <span className="profile-label">Mobile No: </span>
                                                <p className="profile-value-text">{doctor?.mobileNo ? <span style={{color: 'dodgerblue'}}><i className='bx bx-phone'></i> {doctor?.mobileNo} </span> : 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>     
                        </Fragment> }                   
                      </div>
                    </div>
                </div>
       </section>
  </Fragment>;
};

export default HRProfile;
