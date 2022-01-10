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
import { Form, Image, Button } from 'react-bootstrap';
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
            console.log('Device Id is ' + deviceId);
        }
        dispatch(patientProfile(patientid));
        dispatch(getPatientTelemetryData(deviceid,patientid))
        
        if(isUpdated) {
            alert.success('Updated Successfully');
        }

    }, [dispatch, alert, error, isUpdated]);

    const assignDevice = () => {
        dispatch(assignDeviceToPatient(patientid, deviceId));
    }

    const removeAssignDevice = () => {
        dispatch(removeAssignedDevice(patientid));
    }

    const refreshTelemetaryData =() => {
        dispatch(getPatientTelemetryData(deviceid,patientid, sort))
    }

    const sortData = (event) => {
        setSort(event.target.value);
        dispatch(getPatientTelemetryData(deviceid,patientid,sort))
    }

    const searchByDate = (e) => {
        e.preventDefault();
        console.log('Date for search is ' + searchDate);

        let searchedDate = (moment(searchDate).format("YYYY-MM-DD"));
        console.log('Date for search is ' + searchedDate);

        dispatch(getDeviceDataByDate(deviceid, patientid, searchedDate))
    }

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
                                    <h5 className="pt-2 mt-2">Patient Details  </h5>
                                </div>

                                <div className="col-md-2">
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
                                </div>

                            </div>
                                        
                            <hr />

                                <div className="row">
                                    <div className="col-md-3">
                                        <div>
                                            <img src={patientProfileImg} className="patient-profile-card-img" alt="patientProfile" />
                                            
                                                <p className="profile-name">{patient?.title}. {patient?.firstname} {patient?.lastname} </p>
                                        
                                                <Fragment>
                                                    <p className="doctor-specilizations">{patient?.email}</p>
                                                    <p style={{fontSize: 14}} className="text-center">RPM Consent {patient?.rpmconsent === true ? <i className="bx bx-check check-icon"></i>: <i class='bx bx-x cross-icon'></i>}</p>
                                                    <p style={{fontSize: 14}} className="text-center">Readings /mo <i className="check-icon">{patient?.readingsperday}</i></p>
                                                </Fragment>
                                        </div>    
                                 </div>

                                    <div className="col-md-3">
                                            <span className="patient-profile-col-heading">Practice Address</span>                                 
                                             <hr />

                                             <b>Address: </b>
                                             <p className="patient-profile-card-text">651A Colony Island Ave, 2nd floor</p>

                                             <b>City: </b>
                                             <p className="patient-profile-card-text">Brooklyn</p>

                                             <b>State: </b>
                                             <p className="patient-profile-card-text">New York</p>
                                    </div>

                                    <div className="col-md-3">
                                            <span className="patient-profile-col-heading">Patient Contact Information</span>                                 
                                             <hr />

                                             <b>Phone No. (primary): </b>
                                             <p className="patient-profile-card-text">{patient?.contactno === ' ' ? 'N/A' : patient?.contactno}</p>

                                             <b>Phone No. (Secondary): </b>
                                             <p className="patient-profile-card-text">{patient?.phone1 === '' ? 'N/A' : patient?.phone1}</p>

                                             <b>Fax Number: </b>
                                             <p className="patient-profile-card-text">{patient?.phone2 === '' ? 'N/A' : patient?.phone2}</p>
                                    </div>

                                    <div className="col-md-3 ">
                                            <span className="patient-profile-col-heading">Patient Disease (s)</span>                                 
                                             <hr />
                                            {patient?.diseases && patient?.diseases.map((disease, index) => (
                                                <Fragment key={index}>
                                                     <span className="patient-profile-disease-span"> {disease?.diseasename} </span>   
                                                </Fragment>
                                            ))}
                                    </div>
                                </div>

                                 <br />   
                                <div className="row">
                                <div className="col-md-3">
                                    <span className="patient-profile-col-heading">Practice Contact Information</span>                                 
                                        <hr />

                                    <b>Name: </b>
                                    <p className="patient-profile-card-text">Diago A Diaz</p>

                                    <b>Practice: </b>
                                    <p className="patient-profile-card-text">Sunset Sleep Diagnostics</p>

                                    <b>Physician NPI: </b>
                                    <p className="patient-profile-card-text">Sunset Sleep Diagnostics</p>
                                </div>

                                <div className="col-md-3">
                                    <span className="patient-profile-col-heading">RPM Integration</span>                                 
                                        <hr />
                                    {patient?.deviceid === null ? <Fragment>
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
                                        </Fragment> : <Fragment>
                                        <small style={{color: 'green'}}>Device already assigned</small>
                                        <br/>
                                        <p><i>{patient?.deviceid}</i></p>
                                        <button className="btn btn-danger" onClick={() => removeAssignDevice()}>
                                            <small>Remove Device</small></button>    
                                    </Fragment>}            
                                    
                                </div>

                                <div className="col-md-3">
                                    <span className="patient-profile-col-heading">Device Details</span>                                 
                                    <hr />
                                    {patient?.deviceid === null ? <Fragment>
                                        <span style={{ color: 'dodgerblue', 
                                    margin: '20%', 
                                    fontSize: '12px',  
                                    }}>No device assigned yet</span> </Fragment> : <Fragment>
                                        <b>Device ID: </b>
                                        <p className="patient-profile-card-text">{patient?.deviceid}</p>

                                        <b>Name: </b>
                                        <p className="patient-profile-card-text">Device Name:</p>

                                        <b>Manufecturer: </b>
                                        <p className="patient-profile-card-text">lifesense</p>
                                    </Fragment> }   
                                    
                                </div>

                                <div className="col-md-3">
                                    <span className="patient-profile-col-heading">Insurance companies</span>                                 
                                        <hr />
                                    <div className="row">    
                                    <div className="col-md-4">
                                     <img src={insuranceLogo} className="patient-profile-insurance-logo" alt="insurance-logo" />   
                                     </div>

                                     <div className="col-md-7">
                                        <span>Aetna</span> 
                                        <p>4788547755552458</p>   
                                    </div>    
                                    </div>
                                   
                                  </div>
                                 </div>
                                </Fragment> }
                            </div>

                            </div>


                            {deviceData && deviceData.length > 0 ? <Fragment>
                                <hr style={{backgroundColor: '#F95800', height: '2px'}}/>
                                <div>
                                    <div className="row">
                                            <div className="col-md-7">
                                                <strong>Device Readings <span className="old-history-span-tag"> ( Complete history )</span></strong>         
                                            </div>

                                            
                                            <div className="col-md-2">
                                                <select className="form-control" 
                                                    placeholder="Sort By" 
                                                    value={sort}
                                                    onChange={sortData}
                                                    >
                                                    <option selected disabled>Sort By</option>
                                                    <option value="1">Ascending Order</option>
                                                    <option value="-1">Descending Order</option>
                                                </select>
                                            </div>

                                            <form onSubmit={searchByDate}>
                                                <div className="col-md-12">
                                                    <Form.Group>
                                                        <DatePicker  
                                                        placeholder="Search By Date" 
                                                        className="form-control"
                                                        selected={searchDate}
                                                        onChange={(date) => setSearchDate(date)}
                                                        />
                                                        
                                                    </Form.Group>
                                                   
                                                    <Button className="btn btn-small" type="submit">Search</Button>                                                    
                                                </div>
                                            </form>

                                            {/* <div className="col-md-2">
                                                <button className={tabMode === 'telemetaryData' ? 'btn btn-primary' : 'btn btn-link'} onClick={() => setTabMode('telemetaryData')}>TelemetaryData </button>         
                                            </div>

                                            <div className="col-md-2">
                                                <button className={tabMode === 'sphygmomanometer' ? 'btn btn-primary' : 'btn btn-link'} onClick={() => setTabMode('sphygmomanometer')}>Sphygmomanometer </button>         
                                            </div>

                                            <div className="col-md-2">
                                                <button className='btn btn-link' onClick={() => {refreshTelemetaryData()}}>Refresh </button>         
                                            </div> */}
                                        </div> 
                                        <hr />
                                    
                                        {tabMode === 'telemetaryData' ? <Fragment>
                                            {deviceData && deviceData.map((devicedata, index) => (
                                            <Fragment>
                                                {devicedata?.telemetaryData?.sys && devicedata?.telemetaryData?.dia && devicedata?.telemetaryData?.pul ? <Fragment>
                                                    <div className="row">
                                                        <div className="col-md-1">
                                                            <Image src={systolicImg} className="systolic-image" />    
                                                        </div>

                                                        
                                                        <div className="col-md-3">
                                                            <b>Systolic: {devicedata?.telemetaryData?.sys}</b>
                                                            {devicedata?.telemetaryData?.sys <= 120 && devicedata?.telemetaryData?.sys >= 80 ? 
                                                            <p className="normalBP">Normal</p> : devicedata?.telemetaryData?.sys >= 120 && devicedata?.telemetaryData?.sys ? <p className="elevatedBP">Elevated</p> : 
                                                            devicedata?.telemetaryData?.sys >= 130 && devicedata?.telemetaryData?.sys <= 140 ? <p>High BP</p> : 
                                                            devicedata?.telemetaryData?.sys >= 140 ? <p>Hypertension</p> : <p>Hypertensive Crisis</p>}
                                                        </div>

                                                        <div className="col-md-1">
                                                            <Image src={diastolicImg} className="systolic-image" />    
                                                        </div>

                                                        <div className="col-md-3">
                                                            <b>Diastolic: {devicedata?.telemetaryData?.dia}</b>
                                                            {devicedata?.telemetaryData?.dia < 120 && devicedata?.telemetaryData?.dia > 80 ? 
                                                            <p className="normalBP">Normal</p> : devicedata?.telemetaryData?.dia > 120 && devicedata?.telemetaryData?.dia ? <p className="elevatedBP">Elevated</p> : 
                                                            devicedata?.telemetaryData?.dia > 130 && devicedata?.telemetaryData?.dia < 140 ? <p>High BP</p> : 
                                                            devicedata?.telemetaryData?.dia > 140 ? <p>Hypertension</p> : <p>Hypertensive Crisis</p>}
                                                        </div>

                                                        <div className="col-md-1">
                                                            <Image src={pulseImg} className="systolic-image" />    
                                                        </div>

                                                        <div className="col-md-3">
                                                            <b>Pulse {devicedata?.telemetaryData?.pul}</b>
                                                            <p className="normalBP">Normal</p>
                                                        </div>
                                                    </div>

                                                    <br/>            
                                                    <div>
                                                        <small className="devicedata-createddata"><i>Created At: {moment(devicedata?.createdAt).format("lll")}</i></small>
                                                    </div>

                                                </Fragment> : ''} <hr />
                                        </Fragment>
                                        ))}
                                          
                                        </Fragment> : ''
                                       
                                        }         
                                         
                                        

                                        {tabMode === 'sphygmomanometer' ? <Fragment>
                                        {deviceData && deviceData.map((devicedata, index) => (
                                            <Fragment>
                                                    {devicedata?.telemetaryData?.wt ? <Fragment>
                                                <table className="table table-bordered" key={index}>
                                                        <tbody>
                                                            <tr>
                                                                <th scope="col-md-3">wt</th>
                                                                <td scope="col-md-3">{devicedata?.telemetaryData?.wt}</td>
                                                                <th scope="col-md-3">bmi</th>
                                                                <td scope="col-md-3">{devicedata?.telemetaryData?.bmi}</td>
                                                                <th scope="col-md-2">fat</th>
                                                                <td scope="col-md-2">{devicedata?.telemetaryData?.fat}</td>
                                                            </tr>

                                                            <tr>
                                                                <th scope="col-md-3">bm</th>
                                                                <td scope="col-md-3">{devicedata?.telemetaryData?.bm}</td>
                                                                <th scope="col-md-3">mus</th>
                                                                <td scope="col-md-3">{devicedata?.telemetaryData?.mus}</td>
                                                                <th scope="col-md-2">ts</th>
                                                                <td scope="col-md-2">{devicedata?.telemetaryData?.ts}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>        
                                                    </Fragment> : '' }
                                            </Fragment>
                                        ))}
                                        </Fragment> : ''}
                                    </div>

                            </Fragment> : <Fragment>
                                <div style={{textAlign: 'center'}}>
                                    <p>No Data Found</p>
                                    <button className="btn btn-primary" onClick={() => {refreshTelemetaryData()}}> Refresh Data</button>                        
                                </div>
                                </Fragment>}
                           
                           </div>
                         </Fragment> 
                         }         
                </section>
                            
        </Fragment>
    )
}

export default PatientProfile
