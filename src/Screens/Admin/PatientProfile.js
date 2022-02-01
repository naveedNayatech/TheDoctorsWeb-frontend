import React, { useEffect, useState, Fragment } from 'react';
import MetaData from '../../layouts/MetaData';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import patientProfileImg from '../../assets/Images/patientProfile.png';
import CuffTelemetaryData from '../../components/Patient/CuffTelemetaryData'; 
import WeightTelemetaryData from '../../components/Patient/WeightTelemetaryData';
import { patientProfile, assignDeviceToPatient, removeAssignedDevice, getPatientTelemetryData, getAllDevices, getDeviceDataByDate} from '../../actions/adminActions';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Form, Image, Button, Badge , Tabs, Tab} from 'react-bootstrap';
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

    
    useEffect(() => {
        if(error){
            return alert.error(error);
        }

        dispatch(patientProfile(patientid));
        dispatch(getPatientTelemetryData(patientid))
        
        
        if(isUpdated) {
            alert.success('Updated Successfully');
        }

    }, [dispatch, alert, error, isUpdated]);

    const assignDevice = () => {
        dispatch(assignDeviceToPatient(patientid, deviceid));
    }

    const removeAssignDevice = (device,patientId) => {
        console.log('Device id is ' + device._id);
        console.log('Patient id is ' + patientId);

         dispatch(removeAssignedDevice(device, patientid));
    }

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
                                <div className="col-md-3">
                                    <h5 className="pt-2 mt-2">Patient <span style={{ color: '#F95800'}}>Details </span></h5>
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
                                                    {patient?.initialsetup ? <p style={{fontSize: 14}} className="text-center">Initial setup <i className="check-icon">{patient?.initialsetup}</i></p> : 'Not added yet'}
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
                                                <span className="patient-profile-disease-span"> {patient?.diseases ? patient?.diseases : 'N/A'}  </span>   
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
                                            <span className="profile-label">No Device Assigned Yet</span>
                                           
                                            </Fragment> : <Fragment>
                                            <span className="profile-label">Assigned Devices (0{patient?.assigned_devices && patient?.assigned_devices.length})</span>
                                            
                                             {patient?.assigned_devices && patient?.assigned_devices.map((deviceass, index) => (
                                                <Fragment>
                                                <p key={index}><Badge bg="success text-white">{deviceass?.deviceObjectId?._id} </Badge>
                                                <button className="btn" style={{color: 'red'}} onClick={() => removeAssignDevice(deviceass,patientid)}>
                                                    <i className="bx bx-trash"></i>
                                                </button>
                                                </p>
                                                
                                                </Fragment>
                                            ))} 
                                                
                                        </Fragment>}            
                                    
                                </div>

                                <div className="col-md-3">
                                    <span className="patient-profile-col-heading">Insurance companies</span>                                 
                                        <hr />
                                    <div className="row">    
                                     <div className="col-md-7">
                                     <p className="patient-profile-card-text">{patient?.insurancecompany ? patient?.insurancecompany : 'N/A' }</p> 
                                </div>    
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <h5 className="pt-2 mt-2">Telemetary <span style={{ color: '#F95800'}}>Data </span></h5>
                    </div>

                    <Tabs defaultActiveKey="cuff" id="uncontrolled-tab-example" selectedTabClassName="bg-white">
                        <Tab eventKey="cuff" title="Cuff ( Telemetary Data )">
                        {deviceData && deviceData.map((devicedata, index) => (
                            <div key={index}>
                                {devicedata?.telemetaryData?.telemetaryData?.sys && devicedata?.telemetaryData?.telemetaryData?.dia ? <Fragment>
                                    <CuffTelemetaryData healthData={devicedata} isAdmin={true} />
                                </Fragment> : ''}
                            </div>
                        ))}
                        </Tab>
                        
                        <Tab eventKey="weight" title="Weight ( Telemetary Data )">
                        {deviceData && deviceData.map((devicedata, index) => (
                            <div key={index}>
                                 {devicedata?.telemetaryData?.telemetaryData?.wt && devicedata?.telemetaryData?.telemetaryData?.fat ? <Fragment>
                                    <WeightTelemetaryData healthData={devicedata} isAdmin={true} />
                                </Fragment> : ''}   
                            </div>
                        ))}
                        </Tab>
                        <Tab eventKey="spo2" title="Spo2 ( Telemetary Data )">
                            Spo2 Data
                        </Tab>
                    </Tabs>


                    </Fragment> }
                </div>
                
                <br /><br />
            </div>                           
        </div>
    </Fragment> 

    
    }         
    </section>
                            
        </Fragment>
    )
}

export default PatientProfile
