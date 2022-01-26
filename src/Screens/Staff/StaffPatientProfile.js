import React, {Fragment, useEffect, useState} from 'react'
import  Sidebar from '../../components/Staff/Sidebar';
import TopBar from '../../components/Staff/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import {useSelector, useDispatch} from 'react-redux';
import { patientProfile, getPatientTelemetryData, insertComment} from '../../actions/adminActions';
import patientProfileImg from '../../assets/Images/patientProfile.png';
import insuranceLogo from '../../assets/Images/aetna.png';
import moment from 'moment';
import { Form, Image, Button, Badge } from 'react-bootstrap';
import systolicImg from '../../assets/Images/blood-pressure.png';
import diastolicImg from '../../assets/Images/diastolic.png';
import pulseImg from '../../assets/Images/pulse.png';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';

const StaffPatientProfile = (props) => {
    
    const dispatch = useDispatch();
    const alert = useAlert();


    let patientid = props?.location?.state?.patientid;

    const { loading, error, patient, isUpdated} = useSelector(state => state.patientProfile);
    // const { loading: deviceDataLoading, deviceData } = useSelector(state => state.deviceData);
    const { isAuthenticated} = useSelector(state => state.staffAuth);

    const [sort, setSort] = useState(1);
    const [tabMode, setTabMode] = useState('telemetaryData');
    const [deviceId, setDeviceId] = useState('');
    const [comment, setComment] = useState('');

    useEffect(() => {
        if(isAuthenticated === false) {
			props?.history?.push("/stafflogin");
		}

        if(error){
            return alert.error(error);
        }

        dispatch(patientProfile(patientid));

        // dispatch(getPatientTelemetryData(patientid))
        
        if(isUpdated) {
            alert.success('Updated Successfully');
        }

    }, [dispatch, alert, error, isUpdated]);


    // const sortData = (event) => {
    //     setSort(event.target.value);
    //     dispatch(getPatientTelemetryData(patientid,sort))
    // }

    // const refreshTelemetaryData =() => {
    //     dispatch(getPatientTelemetryData(patientid, sort))
    // }

    // const submitCommentHandler = (deviceid) => {
    //     // e.preventDefault();
    //     if(comment === '') {
    //         return alert.error('Comment Cannot be Empty')
    //     }

    //     dispatch(insertComment(deviceid, comment, patientid));
    // }


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
                                <div className="col-md-3">
                                    <h5 className="pt-2 mt-2">Patient <span style={{color: '#F95800'}}>Details</span>  </h5>
                                </div>

                                {/* <div className="col-md-2">
                                    <Link to="/patientProfile" className="btn btn-link pt-2 mt-2"><small>Patient Notes </small></Link>
                                </div>

                                <div className="col-md-2">
                                <Link to="/patientProfile" className="btn btn-link pt-2 mt-2"><small>Messages(s)</small></Link>
                                </div>

                                <div className="col-md-2">
                                    {patient?.doctorid === null ? <Link to="/patientProfile" className="btn btn-link pt-2 mt-2">
                                        <small style={{color: 'red'}}>Phy. not assigned</small>
                                        </Link> : <Link to={{ pathname: "/doctorProfile", state: {id: patient?.doctorid}}} className="btn btn-link pt-2 mt-2">
                                        
                                        <i className="bx bx-user"> Phy. Details </i>
                                    </Link>}
                                    
                                </div>

                                <div className="col-md-3">
                                    <Link to="/patientProfile" className="btn btn-link pt-2 mt-2"><small>Update Patient Info </small> </Link>
                                </div> */}

                            </div>
                                        
                            <hr className="blue-hr"/>

                                <div className="row">
                                <div className="col-md-3">
                                        <div>
                                            <img src={patientProfileImg} className="img-responsive profile-card-img" alt="patientProfile" />
                                            
                                                <p className="patient-profile-name">{patient?.firstname} {patient?.lastname} </p>
                                        
                                                <Fragment>
                                                    <p className="patient-email">{patient?.email}</p>
                                                    <p style={{fontSize: 14}} className="text-center">RPM Consent {patient?.rpmconsent === true ? <i className="bx bx-check check-icon"></i>: <i class='bx bx-x cross-icon'></i>}</p>
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
                                            {patient?.diseases && patient?.diseases.map((diseases, index) => (
                                                <Fragment key={index}>
                                                     <span className="patient-profile-disease-span"> {diseases} </span>   
                                                </Fragment>
                                            ))}
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
                                    <span className="patient-profile-col-heading">RPM Integration</span>                                 
                                        <hr />
                                        {patient?.assigned_devices && patient?.assigned_devices.length === 0 ? <Fragment>
                                            <span className="profile-label">No device assigned yet</span>
                                            

                                            
                                            </Fragment> : <Fragment>
                                            <b>Assigned Devices (0{patient.assigned_devices && patient?.assigned_devices.length})</b>
                                            <hr/>
                                            {patient?.deviceassigned && patient?.deviceassigned.map((deviceass, index) => (
                                                <Fragment>
                                                <p key={index}><i>{deviceass?.deviceid}</i></p>
                                                
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
                                        <p className="patient-profile-card-text">AETNA</p>
                                        <p className="patient-profile-card-text">584750054874500
                                        </p>   
                                        </div>    
                                    </div>
                                   
                                  </div>
                                 </div>
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
