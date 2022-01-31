import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import  HRSidebar from '../../components/HR/HRSidebar';
import HRPieGraph from '../../components/HR/HRPieGraph';
import HRTopBar from '../../components/HR/HRTopbar';
import MetaData from '../../layouts/MetaData';
import moment from 'moment';


const HR = () => {
  
const { loading, hr, isAuthenticated} = useSelector(state => state.hrAuth);

  return <Fragment>
    <MetaData title="Profile" />
            <HRSidebar />
            
            <section className="home-section">
                {/* TopBar */}  
                <HRTopBar />

                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded">
                  <div className="home-content">
                    <div className="container">

                    <div className="row">
                      <div className="col-lg-6 col-md-8 col-sm-12 col-xs-12">
                          <h5 className="pt-2 mt-2">{hr?.firstname} {hr?.firstname} <span style={{color: '#F95800'}}> Profile </span></h5> 
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
          </div>
        </section>
      </Fragment>;
};

export default HR;
