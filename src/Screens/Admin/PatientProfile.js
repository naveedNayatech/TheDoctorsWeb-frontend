import React, { useEffect, useState, Fragment } from 'react';
import MetaData from '../../layouts/MetaData';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import patientProfileImg from '../../assets/Images/patientProfile.png';
import { patientProfile, assignDeviceToPatient, removeAssignedDevice, getPatientTelemetryData, getAllDevices, getDeviceDataByDate} from '../../actions/adminActions';
import insuranceLogo from '../../assets/Images/aetna.png';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Form, Image, Button, Badge } from 'react-bootstrap';
import systolicImg from '../../assets/Images/blood-pressure.png';
import diastolicImg from '../../assets/Images/diastolic.png';
import pulseImg from '../../assets/Images/pulse.png';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PatientProfile = (props) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    let searchedDate;
    let patientid = props?.location?.state?.patientid;
     let deviceid = props?.location?.state?.deviceid;


    const { loading, error, patient, isUpdated} = useSelector(state => state.patientProfile);
    const { loading: deviceDataLoading, deviceData } = useSelector(state => state.deviceData);

    const { devices} = useSelector(state => state.devices);
    const [sort, setSort] = useState(1);

    const [tabMode, setTabMode] = useState('telemetaryData');

    const [deviceId, setDeviceId] = useState('');
    const [searchDate, setSearchDate] = useState(new Date());

    
    useEffect(() => {
        if(error){
            return alert.error(error);
        }

        if(deviceId) {
            console.log('Device Id is ' + deviceid);
        }

        dispatch(patientProfile(patientid));

        // dispatch(getPatientTelemetryData(patientid))
        
        if(isUpdated) {
            alert.success('Updated Successfully');
        }

    }, [dispatch, alert, error, isUpdated]);

    const assignDevice = () => {
        dispatch(assignDeviceToPatient(patientid, deviceId));
    }

    // const removeAssignDevice = (deviceid) => {
    //     console.log('Device id is ' + deviceid);
    //     console.log('Patient id is ' + patientid);

    //      dispatch(removeAssignedDevice(deviceid, patientid));
    // }

    // const refreshTelemetaryData =() => {
    //     dispatch(getPatientTelemetryData(patientid, sort))
    // }

    // const sortData = (event) => {
    //     setSort(event.target.value);
    //     dispatch(getPatientTelemetryData(patientid,sort))
    // }

    // const searchByDate = (e) => {
    //     e.preventDefault();
    //     console.log('Date for search is ' + searchDate);

    //     let searchedDate = (moment(searchDate).format("YYYY-MM-DD"));
    //     console.log('Date for search is ' + searchedDate);

    //     dispatch(getDeviceDataByDate(deviceid, patientid, searchedDate))
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
                                    <h5 className="pt-2 mt-2">Patient <span style={{ color: '#F95800'}}>Details </span></h5>
                                </div>
                            </div>
                                        
                            <hr />

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
                                         {/* {patient?.deviceassigned && patient?.deviceassigned.length === 0 ? <Fragment>
                                            <b>No Device Assigned Yet</b>
                                            

                                            
                                            </Fragment> : <Fragment>
                                            <b>Assigned Devices (0{patient.deviceassigned && patient?.deviceassigned.length})</b>
                                            <hr/>
                                             {patient?.deviceassigned && patient?.deviceassigned.map((deviceass, index) => (
                                                <Fragment>
                                                <p key={index}><i>{deviceass?.deviceid}</i> <button className="btn" style={{color: 'red'}} onClick={() => removeAssignDevice(deviceass?.deviceid)}>
                                                    <i className="bx bx-trash"></i>
                                                </button></p>
                                                
                                                </Fragment>
                                            ))} 
                                                
                                        </Fragment>}  */}           
                                    
                                </div>

                                <div className="col-md-3">
                                    <span className="patient-profile-col-heading">Assign Device</span>                                 
                                    <hr />
                                    {/* Assign a device */}
                                    <b>Device: </b>
                                        <select 
                                        name="deviceId"
                                        className="form-control"
                                        value={deviceId}
                                        onChange={(e) => setDeviceId(e.target.value)}
                                        >
                                            {devices && devices.map((device, index) => (
                                                <option key={index} value={device?.deviceId}>{device?.deviceId}</option>
                                            ))} 
                                        </select>   

                                        <br />    
                                        <button className="btn btn-danger" onClick={() => assignDevice()}> Assign </button>     
                                    
                                </div>

                                <div className="col-md-3">
                                    <span className="patient-profile-col-heading">Insurance companies</span>                                 
                                        <hr />
                                    <div className="row">    
                                     <div className="col-md-7">
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

export default PatientProfile
