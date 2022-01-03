import React, { useEffect, useState, Fragment } from 'react';
import MetaData from '../../layouts/MetaData';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import patientProfileImg from '../../assets/Images/patientProfile.png';
import { patientProfile, assignDeviceToPatient, removeAssignedDevice, getPatientTelemetryData, getAllDevices} from '../../actions/adminActions';
import insuranceLogo from '../../assets/Images/aetna.png';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import moment from 'moment';

const PatientProfile = (props) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    let patientid = props?.location?.state?.patientid;
    let deviceid = props?.location?.state?.deviceid;

    const { loading, error, patient, isUpdated} = useSelector(state => state.patientProfile);
    const { loading: deviceDataLoading, deviceData } = useSelector(state => state.deviceData);
    const { devices} = useSelector(state => state.devices);

    const [tabMode, setTabMode] = useState('telemetaryData');

    const [deviceId, setDeviceId] = useState('');

    
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

    }, [dispatch, alert, patientid, error, isUpdated]);

    const assignDevice = () => {
        dispatch(assignDeviceToPatient(patientid, deviceId));
    }

    const removeAssignDevice = () => {
        dispatch(removeAssignedDevice(patientid));
    }

    const refreshTelemetaryData =() => {
        dispatch(getPatientTelemetryData(deviceid,patientid))
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
                                        <small>Phy. Details </small>
                                    </Link>}
                                    
                                </div>

                                <div className="col-md-3">
                                    <Link to="/patientProfile" className="btn btn-link pt-2 mt-2"><small>Update Patient Info </small> </Link>
                                </div>

                            </div>
                                        
                                <hr />

                                <div className="row">
                                    <div className="col-md-3 card-border-right">
                                        <div>
                                            <img src={patientProfileImg} className="patient-profile-card-img" alt="patientProfile" />
                                            
                                                <p className="profile-name">{patient?.title}. {patient?.firstname} {patient?.lastname} </p>
                                        
                                                <Fragment>
                                                    <p className="doctor-specilizations">{patient?.email}</p>
                                                    <br />
                                                </Fragment>
                                        </div>    
                                 </div>

                                    <div className="col-md-3 card-border-right">
                                            <span className="patient-profile-col-heading">Practice Address</span>                                 
                                             <hr />

                                             <b>Address: </b>
                                             <p className="patient-profile-card-text">651A Colony Island Ave, 2nd floor</p>

                                             <b>City: </b>
                                             <p className="patient-profile-card-text">Brooklyn</p>

                                             <b>State: </b>
                                             <p className="patient-profile-card-text">New York</p>
                                    </div>

                                    <div className="col-md-3 card-border-right">
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
                                <div className="col-md-3 card-border-right">
                                    <span className="patient-profile-col-heading">Practice Contact Information</span>                                 
                                        <hr />

                                    <b>Name: </b>
                                    <p className="patient-profile-card-text">Diago A Diaz</p>

                                    <b>Practice: </b>
                                    <p className="patient-profile-card-text">Sunset Sleep Diagnostics</p>

                                    <b>Physician NPI: </b>
                                    <p className="patient-profile-card-text">Sunset Sleep Diagnostics</p>
                                </div>

                                <div className="col-md-3 card-border-right">
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

                                <div className="col-md-3 card-border-right">
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
                                            <div className="col-md-6">
                                                <strong>Device Readings <span className="old-history-span-tag"> ( Complete history )</span></strong>         
                                            </div>

                                            <div className="col-md-2">
                                                <button className={tabMode === 'telemetaryData' ? 'btn btn-primary' : 'btn btn-link'} onClick={() => setTabMode('telemetaryData')}>TelemetaryData </button>         
                                            </div>

                                            <div className="col-md-2">
                                                <button className={tabMode === 'sphygmomanometer' ? 'btn btn-primary' : 'btn btn-link'} onClick={() => setTabMode('sphygmomanometer')}>Sphygmomanometer </button>         
                                            </div>

                                            <div className="col-md-2">
                                                <button className='btn btn-link' onClick={() => {refreshTelemetaryData()}}>Refresh </button>         
                                            </div>
                                        </div> 
                                    
                                    <hr /> 
                                        {tabMode === 'telemetaryData' ? <Fragment>
                                            {deviceData && deviceData.map((devicedata, index) => (
                                            <Fragment>
                                                {devicedata?.telemetaryData?.sys && devicedata?.telemetaryData?.dia && devicedata?.telemetaryData?.pul ? <Fragment>
                                                    
                                                    <table className="table table-bordered" key={index}>
                                                        <tbody>
                                                            <tr>
                                                                <th scope="col-md-2">User</th>
                                                                <td scope="col-md-2">{devicedata?.telemetaryData?.user}</td>
                                                                <th scope="col-md-2">sys</th>
                                                                <td scope="col-md-2">{devicedata?.telemetaryData?.sys}</td>
                                                                <th scope="col-md-2">dia</th>
                                                                <td scope="col-md-2">{devicedata?.telemetaryData?.dia}</td>
                                                            </tr>

                                                            <tr>
                                                                <th scope="col-md-2">pul</th>
                                                                <td scope="col-md-2">{devicedata?.telemetaryData?.pul}</td>
                                                                <th scope="col-md-2">ihb</th>
                                                                <td scope="col-md-2">{devicedata?.telemetaryData?.ihb === false ? 'false' : 'true'}</td>
                                                                <th scope="col-md-2">hand</th>
                                                                <td scope="col-md-2">{devicedata?.telemetaryData?.hand === false ? 'false' : 'true'}</td>
                                                            </tr>

                                                            <tr>
                                                                <th scope="col-md-2">ts</th>
                                                                <td scope="col-md-2">{devicedata?.telemetaryData?.ts}</td>
                                                                <th scope="col-md-2">zp</th>
                                                                <td scope="col-md-2">{devicedata?.telemetaryData?.zp}</td>
                                                                <th scope="col-md-2">50it</th>
                                                                <td scope="col-md-2">1203</td>
                                                            </tr>

                                                            <tr>
                                                                <th scope="col-md-2">100it</th>
                                                                <td scope="col-md-2">1756</td>
                                                                <th scope="col-md-2">ovit</th>
                                                                <td scope="col-md-2">{devicedata?.telemetaryData?.ovit}</td>
                                                                <th scope="col-md-2">ovip</th>
                                                                <td scope="col-md-2">{devicedata?.telemetaryData?.ovip}</td>
                                                            </tr>

                                                            <tr>
                                                                <th scope="col-md-2">net</th>
                                                                <td scope="col-md-2">{devicedata?.telemetaryData?.net}</td>
                                                                <th scope="col-md-2">ops</th>
                                                                <td scope="col-md-2">{devicedata?.telemetaryData?.ops}</td>
                                                                <th scope="col-md-2" style={{color: 'green', fontWeight: 'bold'}}>Created At</th>
                                                                <td scope="col-md-2">{moment(devicedata?.telemetaryData?.createdAt).format("lll")}</td>
                                                            </tr> 
                                                        </tbody>
                                                    </table>
                                                </Fragment> : ''}
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

                            </Fragment> : null}
                           
                           </div>
                         </Fragment> 
                         }         
                </section>
                            
        </Fragment>
    )
}

export default PatientProfile
