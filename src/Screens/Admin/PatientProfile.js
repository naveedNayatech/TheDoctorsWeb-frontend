import React, { useEffect, useState, Fragment } from 'react';
import MetaData from '../../layouts/MetaData';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import patientProfileImg from '../../assets/Images/patientProfile.png';
import CuffTelemetaryData from '../../components/Patient/CuffTelemetaryData'; 
import WeightTelemetaryData from '../../components/Patient/WeightTelemetaryData';
import { patientProfile, getRemainingReadings, removeAssignedDevice, getPatientTelemetryData, sortTelemetartData} from '../../actions/adminActions';
import { getPatientCarePlan } from '../../actions/HRActions';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Badge , Tabs, Tab} from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";

const PatientProfile = (props) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const [sortDate, setSortDate] = useState('');

    let searchedDate;
    let patientid = props?.location?.state?.patientid;
    let deviceid = props?.location?.state?.deviceid;


    const { loading, error, patient, isUpdated} = useSelector(state => state.patientProfile);
    const { loading: deviceDataLoading, deviceData } = useSelector(state => state.deviceData);
    const { careplan } = useSelector(state => state.careplan);
    const { count } = useSelector(state => state.readingsCount);
    
    useEffect(() => {
        if(error){
            return alert.error(error);
        }

        dispatch(patientProfile(patientid));
        dispatch(getPatientTelemetryData(patientid))
        dispatch(getPatientCarePlan(patientid));
        dispatch(getRemainingReadings(patientid));
        

        console.log('Careplan is ' + careplan)    
        
        
        if(isUpdated) {
            alert.success('Updated Successfully');
        }

    }, [dispatch, alert, error, isUpdated]);


        const sortPatientTelemetaryData = (date) => {
            const dateToFind = new Date(date).toLocaleDateString('zh-Hans-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }); 
            dispatch(sortTelemetartData(patientid, dateToFind));
        }
    

    const removeAssignDevice = (device,patientId) => {
         dispatch(removeAssignedDevice(device, patientid));
    }

    const refreshHandler = () => {
        dispatch(patientProfile(patientid));
        dispatch(getPatientTelemetryData(patientid))
        dispatch(getPatientCarePlan(patientid));
        setSortDate('');
    }

    
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

                                             {careplan !== undefined && <>
                                                <div className="patient-profile-data-div mt-2">
                                                    <p style={{fontSize: 14}} className="text-center mt-2">Readings /mo : </p>
                                                    <span className="check-icon mt-2">{ReadingsperMonth}</span>
                                                </div>
                                            </> }

                                            {careplan !== undefined && <>
                                                <div className="patient-profile-data-div mt-2">
                                                    <p style={{fontSize: 14}} className="text-center mt-2">Remaining : </p>
                                                    
                                                    <span className="check-icon mt-2">{ReadingsperMonth - readingsThisMonth}</span>
                                                </div>
                                            </> } 

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
                                    {patient?.assigned_doctor_id ? <>
                                        <span className="profile-label">Name</span>
                                    <p className="patient-profile-card-text">Dr. {patient?.assigned_doctor_id?.firstname} {patient?.assigned_doctor_id?.lastname}</p>
                                    </> : <>
                                    <span className="profile-label">Doctor Not Assigned Yet</span>
                                    </>}
                                    
                                </div>

                                <div className="col-md-3">
                                    <span className="patient-profile-col-heading">RPM Integration</span>                                 
                                        <hr />
                                         {patient?.assigned_devices && patient?.assigned_devices?.length === 0 ? <Fragment>
                                            <span className="profile-label">No Device Assigned Yet</span>
                                           
                                            </Fragment> : <Fragment>
                                            <span className="profile-label">Assigned Devices (0{patient?.assigned_devices && patient?.assigned_devices?.length})</span>
                                            
                                             {patient?.assigned_devices && patient?.assigned_devices.map((deviceass, index) => (
                                                <div key={index}>
                                                <p key={index}><Badge bg="success text-white">{deviceass?.deviceObjectId?._id} </Badge>
                                                <button className="btn" style={{color: 'red'}} onClick={() => removeAssignDevice(deviceass,patientid)}>
                                                    <i className="bx bx-trash"></i>
                                                </button>
                                                </p>
                                                
                                                </div>
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
                                

                                <div className="col-md-3">
                                    <span className="patient-profile-col-heading">Patient Careplan</span>                                 
                                    <hr /> 
                                    {careplan && careplan ? <Fragment>
                                        <span style={{float: 'right', marginTop: 10}}>
                                            <i>Careplan Added.</i> <br/>
                                            <i>By: {careplan?.data?.assigned_hr_id?.firstname} {careplan?.data?.assigned_hr_id?.lastname}
                                            &nbsp;&nbsp;<Badge bg="success text-white">{careplan?.data?.assigned_hr_id?.role}</Badge> 
                                            </i>
                                        </span>  
                                    </Fragment> : 'N/A'}
                                </div>
                            </div>

                            {deviceData && deviceData.length > 0 ? <Fragment>
                        <br/><br/>
                        <div className="row">
                            <div className="col-md-9">
                                <h5 className="pt-2 mt-2">Telemetary <span style={{ color: '#F95800'}}>Data </span></h5>
                            </div>

                            <div className="col-md-3">
                                <input 
                                type="date"
                                max={moment().format("YYYY-MM-DD")} 
                                className="form-control"
                                value={sortDate} 
                                onChange={(e) => {sortPatientTelemetaryData(e.target.value); setSortDate(e.target.value)}}
                                />
                            </div>
                        </div>

                    <Tabs defaultActiveKey="cuff" id="uncontrolled-tab-example">
                        <Tab eventKey="cuff" title="Cuff ( Telemetary Data )">
                        {deviceData && deviceData.map((devicedata, index) => (
                            <div key={index}>
                                {devicedata?.telemetaryData?.sys && devicedata?.telemetaryData?.dia ? <Fragment>
                                    <CuffTelemetaryData healthData={devicedata} isAdmin={true} />
                                </Fragment> : ''}
                            </div>
                        ))}
                        </Tab>
                        
                        <Tab eventKey="weight" title="Weight ( Telemetary Data )">
                        {deviceData && deviceData.map((devicedata, index) => (
                            <div key={index}>
                                 {devicedata?.telemetaryData?.wt && devicedata?.telemetaryData?.fat ? <Fragment>
                                    <WeightTelemetaryData healthData={devicedata} isAdmin={true} />
                                </Fragment> : ''}   
                            </div>
                        ))}
                        </Tab>
                        {/* <Tab eventKey="spo2" title="Spo2 ( Telemetary Data )">
                            Spo2 Data
                        </Tab> */}
                    </Tabs>
                    </Fragment> : <small className="text-center" style={{color: 'gray', marginLeft: '350px'}}>No telemetary data found <button className="btn btn-link" onClick={refreshHandler}>Refresh List</button></small>}
                 
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
