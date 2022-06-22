import React, {useEffect} from 'react';
import patientProfileImg from '../../assets/Images/patientProfile.png';
import { Image, ProgressBar, Badge} from 'react-bootstrap';
import { removeAssignedDevice} from '../../actions/adminActions';
import { useDispatch, useSelector} from 'react-redux';
import systolicImg from '../../assets/Images/blood-pressure.png';
import { hrTimeSpentOfCurrentMonth } from '../../actions/HRActions';
import { searchAdminLogsByPatient } from '../../actions/adminActions';
const moment = require('moment-timezone');
import { Link } from 'react-router-dom';
import doctorIcon from '../../assets/Images/doctorIcon.png';
import hrIcon from '../../assets/Images/network.png';

const PatientInfo = ({patient,patientid, telemetaryReadings, count}) => {

    const dispatch = useDispatch();

    const removeAssignDevice = (device, patientid) => {
        dispatch(removeAssignedDevice(device, patientid));
    }
    const { totalTime } = useSelector(state => state.totalTimeSpent);
    const { loading, logs } = useSelector(state => state.searchLogResult);


    useEffect(() => {
        var check = moment(new Date(), 'YYYY/MM/DD');

        let month = check.format('M');
        month = Number(month)
        var year = check.format('YYYY');
        
        dispatch(hrTimeSpentOfCurrentMonth(patient?._id, patient?.assigned_hr_id?._id, `${year}-${month}-01`, `${year}-${month=month+1}-01`));

        dispatch(searchAdminLogsByPatient(patientid));

    }, [])

    const sendEmail = (email) => {
        window.open(`mailto:${email}`)
    }

    let filteredReadings = calcTotalReadings();

    function calcTotalReadings() {
       return telemetaryReadings && telemetaryReadings.filter(healthData => healthData?.deviceId?.deviceType === "bp").reduce((sum, a) =>  
        sum + 1, 0
      )
    }


    return (
        <>
            <div className="col-md-3">
                <h5 className="pt-2 mt-2">Patient <span style={{ color: '# ' }}>Details </span>
                </h5>
            </div>
            <hr />

            <div className="row">
                <div className="col-md-3">
                    <div className="card card-bordered-01">
                        <img src={patientProfileImg} className="img-responsive profile-card-img mt-4" alt="patientProfile" />

                        <b className="mt-3">Pt. {patient?.firstname} {patient?.lastname}  </b>
                        <Link to="/patientProfile" className="link" style={{marginLeft: "10%", fontSize: "14px", marginTop: "7px"}} onClick={() => sendEmail(patient?.email)}>{patient?.email}</Link>
                        <hr />
                        <>

                            <span>{moment(patient?.DOB).format("ll")} </span>
                            <span style={{backgroundColor: "#004aad", padding: '5px', color: "#FFF"}}><small>Age: {moment().diff(moment(patient?.DOB).format("ll"), 'years')} yrs</small></span>

                            <span className="text-center mt-2"><small><b>Account Created Date: </b></small></span>
                            <span className="text-center "><small>{moment(patient?.createdAt).tz("America/New_York").format("lll")}</small></span>

                            <span className="text-center mt-2"><small><b>Account Status: </b></small></span>
                            <span className="text-center "><small>{patient?.block === false ? <span style={{color: "green"}}>Active</span> : <span style={{color: "red"}}>Blocked </span>}</small></span>
                        </>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card card-bordered-01">
                        <span className="mt-3"> <small>{patient?.address}, {patient?.city} - {patient?.line2} - {patient?.city}, {patient?.state} - {patient?.zipCode} </small></span>
                        <hr />
                        <div className="row">
                        <div className="col-md-6">
                            <span className="profile-label">Primary Phone </span>
                            <p className="patient-profile-card-text" style={{color: 'dodgerblue'}}>{patient?.phone1 || 'N/A'}</p>

                            <span className="profile-label">Mobile</span>
                            <p className="patient-profile-card-text">{patient?.mobileNo || 'N/A'} </p>


                        </div>

                        <div className="col-md-6">
                            <div className="row">
                                <img src={doctorIcon} alt="" width="60" height="60"/>
                                <span className="ml-4"><b>Assigned Doctor</b>
                                {patient?.assigned_doctor_id ? <>
                                    <p className="patient-profile-card-text">Dr. {patient?.assigned_doctor_id?.firstname} {patient?.assigned_doctor_id?.lastname}</p>
                                </> : <>
                                <br />
                                    <span className="profile-label">Doctor Not Assigned</span>
                                </>}
                                </span>
                                
                            </div>
                            
                            <br />

                            <div className="row">
                                <img src={hrIcon} alt="" width="60" height="60"/>
                                <span className="ml-4"><b>Assigned Nurse</b>
                                {patient?.assigned_hr_id ? <>
                                    <p className="patient-profile-card-text">Hr. {patient?.assigned_hr_id?.firstname} {patient?.assigned_hr_id?.lastname}</p>
                                </> : <>
                                <br />
                                    <span className="profile-label">HR Not Assigned Yet</span>
                                </>}
                                </span>
                            </div>
                        </div>    
                        </div>
                        <hr />

                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-6">
                                
                                {/*  */}
                                {patient?.assigned_devices && patient?.assigned_devices?.length === 0 ? <>
                                <span className="profile-label">No Device Assigned Yet</span>

                                </> : <>
                                <small><b>Devices Assigned</b> ( 0{patient?.assigned_devices && patient?.assigned_devices?.length} ) </small>

                                {patient?.assigned_devices && patient?.assigned_devices.map((deviceass, index) => (
                                    <div key={index}>
                                        <Link className="link" to="/devices">
                                        <div style={{padding: '5px', marginTop: '5px'}}>
                                            <div className="row-display">
                                                <div style={{marginLeft: '30px'}}>
                                                <small>IMEI: {deviceass?.deviceObjectId?.imei}</small>
                                                <small><br />Type: {deviceass?.deviceObjectId?.deviceType}</small> 
                                                </div>

                                                <button className="btn" style={{ color: 'red' }}
                                                onClick={() => removeAssignDevice(deviceass, patientid)}
                                                >
                                                <i className="bx bx-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                        </Link>
                                    </div>
                                    ))}
                                    </>}
                            
                            {/*  */}


                                </div>
                                <div className="col-md-6">
                                <b><small>Diseases: </small></b>
                                <span className="patient-profile-disease-span"> {patient?.diseases ? patient?.diseases : 'N/A'} </span>

                                <small><b>Insurance Companies</b></small>
                                <p className="patient-profile-card-text pt-1">{patient?.insurancecompany ? patient?.insurancecompany : 'N/A'}</p>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                <div className="card card-bordered pt-3 col-md-3 ">
                    <span>Monthly Target ( {new Date().toLocaleString('en-us',{month:'short', year:'numeric'})} )</span>
                    <hr className="white-hr"/>

                    <small>RPM Status: <span className="activeRPMStatus">{patient?.rpmconsent == true ? "Active" : "In-Active"}</span></small> 
                    <hr />

                    {/* <small>99453 : Setup DOS - 16/8/2022 </small> */}
                    
                    <small>99454 : {count} / 16 days</small>
                    <ProgressBar min="0" max="16" variant='primary' label={(count / 16) * 100 + "%"} now={count} />

                    <br />

                    {totalTime >=0 && totalTime <= 20 ? <>
                        <small>99457 :  {totalTime} / 20 mins</small>
                        <ProgressBar min="0" max="20" variant='primary' label={(totalTime / 20) * 100 + "%"} now={totalTime} />
                    </> : <>
                    <small> 99457 : 20 / 20 mins</small>
                        <ProgressBar min="0" max="20" variant='primary' label="100%" now="20" />
                    </>}
                     

                    <br />
                    {totalTime >=21 ? <>
                        <small>99458 :  {totalTime > 40 ? "40" : totalTime} / 40 mins</small>
                        <ProgressBar min="21" max="40" variant='primary' label={totalTime > 40 ? "100%" : (totalTime / 40) * 100 + "%"} now={totalTime} />
                    </> : <>
                    <small>99458 :  0 / 40 mins</small>
                        <ProgressBar min="21" max="40" variant='primary' now="21" />
                    </>}
                    
                    <p style={{marginTop: "14px", fontSize:"12px"}}>Total {totalTime || 0} Mins - Month of {new Date().toLocaleString('en-us',{month:'short', year:'numeric'})}</p>
                </div>
            </div>
            <br />

            {/* Second Row */}
            <div className="row-display">
                <div className="card card-bordered-02 col-md-8">
                    <div className="row">
                        <div className="col-md-6"> 
                        <small><b>Telemetary Readings (Last 5)</b></small>
                        <hr />
                        {telemetaryReadings && telemetaryReadings.length > 0 ? <>
                            {telemetaryReadings && telemetaryReadings.filter(healthData => healthData?.deviceId?.deviceType === "bp").slice(0,5).map((devicedata, index) => (
                                <div key={index} className="row-display mt-2" >
                                    {devicedata.telemetaryData?.sys && devicedata.telemetaryData?.dia !== undefined ? <>
                                        <Image src={systolicImg} style={{width: '20px', height: '20px'}} /> 
                                            {devicedata?.telemetaryData?.sys} / {devicedata?.telemetaryData?.dia} 
                                        <small> {moment(devicedata?.createdAt).tz("America/New_York").format("lll")}</small>
                                    </> : " "}
                                </div>
                            ))}
                        </> : 'N/A' }
                        </div>

                        <div className="col-md-6">
                            <small><b>Average B.P</b></small>
                            <hr />
                            
                            <div className="row-display">
                           <div className="circularbox">
                            <div className="percent">
                               <svg>
                                    <circle cx="70" cy="70" r="50"></circle>
                                    <circle cx="70" cy="70" r="50"></circle>  
                                </svg> 

                                <div className="number">
                            

                                {telemetaryReadings && telemetaryReadings.filter(healthData => healthData?.deviceId?.deviceType === "bp").slice(0,10).reduce((total, devicedata) =>  
                                   (Number(total) + Number(devicedata?.telemetaryData?.sys) / filteredReadings).toFixed(), 0
                                 )}
                                
                                </div>
                            </div>
                            <h5 className="text">Avg. Systolic</h5>
                           </div>

                           <div className="circularbox">
                            <div className="percent">
                               <svg>
                                    <circle cx="70" cy="70" r="50"></circle>
                                    <circle cx="70" cy="70" r="50"></circle>  
                                </svg> 

                                <div className="number">
                                {telemetaryReadings && telemetaryReadings.filter(healthData => healthData?.deviceId?.deviceType === "bp").slice(0,10).reduce((total, devicedata) =>  
                                   (Number(total) + Number(devicedata?.telemetaryData?.dia) / filteredReadings).toFixed(), 0
                                 )}
                                </div>
                            </div>
                            <h5 className="text">Avg. Diastolic</h5>
                           </div>
                           </div>
                        </div>
                    </div>
                </div>

                <div className="patient-logs-card col-md-4 ml-4">
                <small><b>{patient?.firstname} {patient?.lastname} Logs (Recent 30)</b></small> 
                <hr />
                {logs && logs.slice(0,30).map((log, index) => (
                  <div key={index}>
                    <ul>
                        <div style={{background: '#D3D3D3', padding: '5px', listStyle:"none", borderRadius: '10px'}}>
                            <li><small>{log?.text} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{moment(log?.createdAt).tz('America/New_York').format("lll")} (EST)</small></li>
                        </div>
                    </ul>
                  </div>  
                ))}

                </div>  
            </div>
        </>
    )
}

export default PatientInfo