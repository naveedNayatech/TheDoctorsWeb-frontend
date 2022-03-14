import React, {Fragment, useEffect, useState} from 'react'
import  Sidebar from '../../components/Staff/Sidebar';
import TopBar from '../../components/Staff/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import {useSelector, useDispatch} from 'react-redux';
import { patientProfile, getPatientTelemetryData, getRemainingReadings} from '../../actions/adminActions';
import { getPatientCarePlan } from '../../actions/HRActions';
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
    let readingmonth;

    const { loading, error, patient, isUpdated} = useSelector(state => state.patientProfile);
    const {loading: commentLoading, commentSuccess} = useSelector(state => state.comments);
    const { loading: deviceDataLoading, deviceData } = useSelector(state => state.deviceData);
    const { isAuthenticated} = useSelector(state => state.staffAuth);
    const { careplan } = useSelector(state => state.careplan);
    const { count } = useSelector(state => state.readingsCount);

    const [addTimeShow, setAddTimeShow] = useState(false);

    useEffect(() => {
        if(isAuthenticated === false) {
			props?.history?.push("/stafflogin");
		}

        if(error){
            return alert.error(error);
        }


        dispatch(patientProfile(patientid));
        dispatch(getPatientTelemetryData(patientid));
        dispatch(getPatientCarePlan(patientid));
        dispatch(getRemainingReadings(patientid));
        
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

    let readingsThisMonth;
    let ReadingsperMonth; 
 
    readingsThisMonth = count;
    ReadingsperMonth = careplan?.data?.readingsPerMonth;


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
                                                    <span className="patient-profile-disease-span"> {patient?.diseases ? patient?.diseases : 'N/A'} </span>
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
                                            <span className="patient-profile-col-heading">Patient Analytics</span>                                 
                                             <hr />

                                             <div className="patient-profile-data-div">
                                                 <p style={{fontSize: 14}} className="text-center mt-2">RPM Consent : </p>
                                                <span className="check-icon mt-2">{patient?.rpmconsent === true ? 'Signed' : 'Not Signed'}</span>
                                            </div>

                                            {careplan ? <>
                                                        <div className="patient-profile-data-div mt-2">
                                                    <p style={{fontSize: 14}} className="text-center mt-2">Readings /mo : </p>
                                                    <span className="check-icon mt-2">{careplan?.data?.readingsPerMonth}</span>
                                                    </div>
                                                    </> : ''}
                                                    
                                            {careplan ? <>
                                                        <div className="patient-profile-data-div mt-2">
                                                            <p style={{fontSize: 14}} className="text-center mt-2">Remaining : </p>
                                                            
                                                            <span className="check-icon mt-2">{ReadingsperMonth - readingsThisMonth}</span>
                                                        </div>
                                                    </> : ''}


                                            <div className="patient-profile-data-div mt-2">
                                                <p style={{fontSize: 14}} className="text-center mt-2">Initial Month : </p>
                                                <span className="check-icon mt-2">{patient?.initialsetup ? patient?.initialsetup : 'N/A'}</span>
                                            </div>   
                                                
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
                                    <span className="patient-profile-col-heading">Patient Careplan</span>                                 
                                        <hr />
                                        {careplan && ( <Fragment>
                                                <small className="patient-profile-careplan-desc">{careplan && careplan?.data?.Description}</small>            
                                                <small style={{float: 'right', marginTop: 10}}>
                                                    <i>Added By: {careplan?.data?.assigned_hr_id?.firstname} {careplan?.data?.assigned_hr_id?.lastname}
                                                    &nbsp;&nbsp;<Badge bg="success text-white">{careplan?.data?.assigned_hr_id?.role}</Badge> 
                                                    </i>
                                                </small>    
                                                
                                            </Fragment>)}
                                   
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
