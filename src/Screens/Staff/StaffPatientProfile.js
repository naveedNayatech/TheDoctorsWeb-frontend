import React, {Fragment, useEffect, useState} from 'react'
import  Sidebar from '../../components/Staff/Sidebar';
import TopBar from '../../components/Staff/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import {useSelector, useDispatch} from 'react-redux';
import { patientProfile, getPatientTelemetryData, insertComment} from '../../actions/adminActions';
import patientProfileImg from '../../assets/Images/patientProfile.png';
import CuffTelemetaryData from '../../components/Patient/CuffTelemetaryData';
import WeightTelemetaryData from '../../components/Patient/WeightTelemetaryData';
import moment from 'moment';
import { COMMENT_RESET } from '../../constants/HRConstants';
import { Badge, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';

const StaffPatientProfile = (props) => {
    
    const dispatch = useDispatch();
    const alert = useAlert();


    let patientid = props?.location?.state?.patientid;

    const { loading, error, patient, isUpdated} = useSelector(state => state.patientProfile);
    const {loading: commentLoading, commentSuccess} = useSelector(state => state.comments);
    const { loading: deviceDataLoading, deviceData } = useSelector(state => state.deviceData);
    const { isAuthenticated} = useSelector(state => state.staffAuth);

    const [addTimeShow, setAddTimeShow] = useState(false);

    useEffect(() => {
        if(isAuthenticated === false) {
			props?.history?.push("/stafflogin");
		}

        if(error){
            return alert.error(error);
        }


        dispatch(patientProfile(patientid));
        dispatch(getPatientTelemetryData(patientid))
        
        if(commentSuccess) {
            alert.success('Comment added');
            dispatch({ type: COMMENT_RESET });
            dispatch(patientProfile(patientid));
            dispatch(getPatientTelemetryData(patientid))
        }

        if(isUpdated) {
            alert.success('Updated Successfully');
        }

    }, [dispatch, alert, error, isUpdated, commentSuccess,]);

    const handleClose = () => setAddTimeShow(false);
    const handleShow = () => setAddTimeShow(true);

    

    return (
        <Fragment>
           <MetaData title="Patient Profile"/>

                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />
                
                {loading ? <Loader /> : <Fragment>
                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
                        <div className="home-content">
                            <div className="container">    

                            {patient && <Fragment>
                            <div className="row">
                                <div className="col-md-10">
                                    <h5 className="pt-2 mt-2">{patient?.firstname} {patient?.lastname}<span style={{ color: '#F95800'}}> Details </span></h5>
                                </div>

                                {/* <div className="col-md-2">
                                    <button className="submit-btn mt-2" onClick={handleShow}>Add Time</button>
                                </div> */}
                                </div>
                            <hr />

                                <div className="row">
                                <div className="col-md-3">
                                        <div>
                                            <img src={patientProfileImg} className="img-responsive profile-card-img" alt="patientProfile" />
                                            
                                                <p className="patient-profile-name">{patient?.firstname} {patient?.lastname} </p>
                                        
                                                <Fragment>
                                                    <p className="patient-email">{patient?.email}</p>
                                                    <p style={{fontSize: 14}} className="text-center">RPM Consent {patient?.rpmconsent === true ? <i className="bx bx-check check-icon"></i>: <i className='bx bx-x cross-icon'></i>}</p>
                                                    <p style={{fontSize: 14}} className="text-center">Readings /mo <i className="check-icon">16</i></p>
                                                    {patient?.initialsetup ? <p style={{fontSize: 14}} className="text-center">Initial setup <i className="check-icon">{patient?.initialsetup}</i></p> : null}
                                                </Fragment>
                                        </div>   
                                    </div>

                                    <div className="col-md-3">
                                            <span className="patient-profile-col-heading">Address</span>                                 
                                             <hr />

                                             <span className="profile-label">Address: </span>
                                             <p className="patient-profile-card-text">{patient?.address}, {patient?.city}</p>

                                             <span className="profile-label">State: </span>
                                             <p className="patient-profile-card-text">{patient?.state} , {patient?.zipCode}</p>

                                             <span className="profile-label">Line 2: </span>
                                             <p className="patient-profile-card-text">{patient?.line2}</p>
                                    </div>

                                    <div className="col-md-3">
                                            <span className="patient-profile-col-heading">Contact Information</span>                                 
                                             <hr />

                                             <span className="profile-label">Phone 1 </span>
                                             <p className="patient-profile-card-text">{patient?.phone1 ? patient?.phone1 : 'N/A'}</p>

                                             <span className="profile-label">Mobile No </span>
                                             <p className="patient-profile-card-text">{patient?.mobileNo ? patient?.mobileNo : 'N/A' } </p>
                                    </div>

                                    <div className="col-md-3 ">
                                            <span className="patient-profile-col-heading">Patient Disease (s)</span>                                 
                                             <hr />
                                            <span className="patient-profile-card-text"> {patient?.diseases} </span>   
                                                
                                    </div>
                                </div>

                                 <br />   
                                <div className="row">
                                <div className="col-md-3">
                                    <span className="patient-profile-col-heading">Physician Information</span>                                 
                                        <hr />

                                    <span className="profile-label">Name</span>
                                    <p className="patient-profile-card-text">{patient?.assigned_doctor_id && patient?.assigned_doctor_id.firstname} {patient?.assigned_doctor_id && patient?.assigned_doctor_id.lastname}</p>

                                    <span className="profile-label">Gender</span>
                                    <p className="patient-profile-card-text"><Badge bg="info text-white" className="male-tag">{patient?.assigned_doctor_id && patient?.assigned_doctor_id.gender}</Badge> </p>
                                </div>

                                <div className="col-md-3">
                                    <span className="patient-profile-col-heading">Devices Assigned</span>                                 
                                        <hr />
                                        {patient?.assigned_devices && patient?.assigned_devices.length === 0 ? <Fragment>
                                            <b>No Device Assigned Yet</b>
                                           
                                            </Fragment> : <Fragment>
                                            <span className="profile-label">Assigned Devices (0{patient?.assigned_devices && patient?.assigned_devices.length})</span>
                                            
                                             {patient?.assigned_devices && patient?.assigned_devices.map((deviceass, index) => (
                                                <Fragment>
                                                <p key={index}><Badge bg="success text-white">{deviceass?.deviceObjectId?._id} </Badge>
                                                {/* <button className="btn" style={{color: 'red'}} onClick={() => removeAssignDevice(deviceass?.deviceid)}>
                                                    <i className="bx bx-trash"></i>
                                                </button> */}
                                                </p>
                                                
                                                </Fragment>
                                            ))}           
                                        </Fragment>}             
                                    
                                </div>

                                <div className="col-md-3">
                                    <span className="patient-profile-col-heading">Assign Device</span>                                 
                                    <hr />
                                    {/* Assign a device */}
                                    <span className="profile-label">Not Authorized</span> 
                                    
                                </div>

                                <div className="col-md-3">
                                    <span className="patient-profile-col-heading">Insurance companies</span>                                 
                                        <hr />
                                        <div className="row">    
                                        <div className="col-md-12">
                                        <p className="profile-label">{patient?.insurance ? patient?.insurance : 'N/A'}</p>
                                        
                                        </div>    
                                    </div>
                                   
                                  </div>
                                  </div> {/* row ends here */}

                                  {/* Patient Telemetary Data */}
                                    <div className="col-md-3">
                                        <h5 className="pt-2 mt-2">Telemetary <span style={{ color: '#F95800'}}>Data </span></h5>
                                    </div>


                                    <Tabs defaultActiveKey="cuff" id="uncontrolled-tab-example" selectedTabClassName="bg-white">
                                        <Tab eventKey="cuff" title="Cuff ( Telemetary Data )">
                                            {deviceData && deviceData.map((devicedata, index) => (
                                                <div key={index}>
                                                    {devicedata?.telemetaryData?.sys && devicedata?.telemetaryData?.dia ? <Fragment>
                                                        <CuffTelemetaryData healthData= {devicedata} isAdmin={false} />
                                                    </Fragment> : ''}
                                                </div>
                                            ))}
                                            </Tab>

                                            <Tab eventKey="weight" title="Weight ( Telemetary Data )">
                                                {deviceData && deviceData.map((devicedata, index) => (
                                                    <div key={index}>
                                                        {devicedata?.telemetaryData?.wt && devicedata?.telemetaryData?.fat ? <Fragment>
                                                            <WeightTelemetaryData healthData={devicedata} isAdmin={false}/>
                                                        </Fragment> : ''}   
                                                    </div>
                                                ))}
                                            </Tab>
                                        </Tabs>   




                                </Fragment> }
                            </div>

                            </div>
                           </div>
                         </Fragment> 
                         }
                </section>
        </Fragment>
    )
}

export default StaffPatientProfile
