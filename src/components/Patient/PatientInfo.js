import React, {useEffect} from 'react';
import patientProfileImg from '../../assets/Images/patientProfile.png';
import { Image} from 'react-bootstrap';
import { removeAssignedDevice} from '../../actions/adminActions';
import { useDispatch, useSelector} from 'react-redux';
import systolicImg from '../../assets/Images/blood-pressure.png';
import { hrTimeSpentOfCurrentMonth } from '../../actions/HRActions';
const moment = require('moment-timezone');
import { Link } from 'react-router-dom';

const PatientInfo = ({patient, ReadingsperMonth, readingsThisMonth, careplan, patientid, telemetaryReadings}) => {

    const dispatch = useDispatch();

    const removeAssignDevice = (device, patientid) => {
        dispatch(removeAssignedDevice(device, patientid));
    }
    const { totalTime } = useSelector(state => state.totalTimeSpent);

    
    useEffect(() => {
        var check = moment(new Date(), 'YYYY/MM/DD');

        let month = check.format('M');
        month = Number(month)
        var year = check.format('YYYY');
        
        dispatch(hrTimeSpentOfCurrentMonth(patient?._id, patient?.assigned_hr_id?._id, `${year}-${month}-01`, `${year}-${month=month+1}-01`));

    }, [])

    const sendEmail = (email) => {
        window.open(`mailto:${email}`)
    }


    return (
        <>
            <div className="col-md-3">
                <h5 className="pt-2 mt-2">Patient <span style={{ color: '#004aad' }}>Details </span>
                </h5>
                

            </div>
            <hr />

            <div className="row">
                <div className="col-md-3">
                    <div>
                        <img src={patientProfileImg} className="img-responsive profile-card-img" alt="patientProfile" />

                        <p className="patient-profile-name" style={{fontWeight: 'bold'}}>{patient?.firstname} {patient?.lastname}  </p>

                        <>
                            <Link to="/patientProfile" className="link" style={{marginLeft: "10%"}} onClick={() => sendEmail(patient?.email)}>{patient?.email}</Link>

                            <span className="patient-profile-disease-span"> {patient?.diseases ? patient?.diseases : 'N/A'} </span>
                        </>
                    </div>
                </div>

                <div className="col-md-3">
                    <span className="patient-profile-col-heading">Address</span>
                    <hr />

                    <span className="profile-label">Address: </span>
                    <p className="patient-profile-card-text">{patient?.address}, {patient?.city}</p>

                    <span className="profile-label">Line 2: </span>
                    <p className="patient-profile-card-text">{patient?.line2}</p>

                    <span className="profile-label">City, State & Zipcode: </span>
                    <p className="patient-profile-card-text">{patient?.city}, {patient?.state} - {patient?.zipCode} </p>                    
                </div>

                <div className="col-md-3">
                    <span className="patient-profile-col-heading">Contact Information</span>
                    <hr />

                    <span className="profile-label">Primary Phone </span>
                    <p className="patient-profile-card-text">{patient?.phone1 || 'N/A'}</p>

                    <span className="profile-label">Mobile</span>
                    <p className="patient-profile-card-text">{patient?.mobileNo || 'N/A'} </p>
                </div>


                <div className="col-md-3 ">
                    <span className="patient-profile-col-heading">Patient Analytics</span>
                    <hr />

                    <div className="patient-profile-data-div">
                        <p style={{ fontSize: 14 }} className="text-center mt-2">RPM Consent : </p>
                        <span className="check-icon mt-2">{patient?.rpmconsent === true ? 'Signed' : 'Not Signed'}</span>
                    </div>

                    {careplan !== undefined && <>
                        <div className="patient-profile-data-div mt-2">
                            <p style={{ fontSize: 14 }} className="text-center mt-2">Readings /mo : </p>
                            <span className="check-icon mt-2">{ReadingsperMonth}</span>
                        </div>
                    </>}


                    {careplan !== undefined && <>
                        <div className="patient-profile-data-div mt-2">
                            <p style={{ fontSize: 14 }} className="text-center mt-2">Remaining : </p>

                            <span className="check-icon mt-2">{ReadingsperMonth - readingsThisMonth}</span>
                        </div>
                    </>}

                    <div className="patient-profile-data-div mt-2">
                        <p style={{ fontSize: 14 }} className="text-center mt-2">Initial Month : </p>
                        <span className="check-icon mt-2">{patient?.initialsetup ? patient?.initialsetup : 'N/A'}</span>
                    </div>
                    
                    <br/>
                    <span className="patient-profile-col-heading">Nurse Engagement Time </span>
                    <p style={{marginTop: "14px", fontSize:"12px"}}>{totalTime || 0} Mins - Month of {new Date().toLocaleString('en-us',{month:'short', year:'numeric'})}</p>
                   
                </div>
            </div>
            <br />

            {/* Second Row */}
            <div className="row">
                <div className="col-md-3">
                    <span className="patient-profile-col-heading">Physician Information</span>
                    <hr />
                    {patient?.assigned_doctor_id ? <>
                        <span className="profile-label">Dr Name</span>
                        <p className="patient-profile-card-text">Dr. {patient?.assigned_doctor_id?.firstname} {patient?.assigned_doctor_id?.lastname}</p>
                    </> : <>
                        <span className="profile-label">Doctor Not Assigned Yet</span>
                    </>}
                    
                    <br />
                    {patient?.assigned_hr_id ? <>
                        <span className="profile-label">HR Name</span>
                        <p className="patient-profile-card-text">Hr. {patient?.assigned_hr_id?.firstname} {patient?.assigned_hr_id?.lastname}</p>
                    </> : <>
                        <span className="profile-label">HR Not Assigned Yet</span>
                    </>}

                </div>

                <div className="col-md-3">
                    <span className="patient-profile-col-heading">RPM Integration</span>
                    <hr />
                    {patient?.assigned_devices && patient?.assigned_devices?.length === 0 ? <>
                        <span className="profile-label">No Device Assigned Yet</span>

                    </> : <>
                        <span className="profile-label">Assigned Devices ( 0{patient?.assigned_devices && patient?.assigned_devices?.length} )</span>

                        {patient?.assigned_devices && patient?.assigned_devices.map((deviceass, index) => (
                            <div key={index}>
                                <Link to="/devices">
                                <div className="card" style={{padding: '5px', marginTop: '5px'}}>
                                    <div className="row-display">
                                        <div>
                                        <small>IMEI: {deviceass?.deviceObjectId?.imei}</small>
                                        <small className="mt-2"><br />Type: {deviceass?.deviceObjectId?.deviceType}</small> 
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

                </div>

                <div className="col-md-3">
                    <span className="patient-profile-col-heading">Insurance companies</span>
                    <hr />
                    <div className="row">
                        <div className="col-md-7">
                            <p className="patient-profile-card-text">{patient?.insurancecompany ? patient?.insurancecompany : 'N/A'}</p>
                        </div>
                    </div>
                </div>


                <div className="col-md-3">
                    <span className="patient-profile-col-heading">Telemetary Readings (Last 5)</span>                                 
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
            </div>
        </>
    )
}

export default PatientInfo