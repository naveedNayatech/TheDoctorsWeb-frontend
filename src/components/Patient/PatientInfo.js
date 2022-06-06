import React, {useEffect} from 'react';
import patientProfileImg from '../../assets/Images/patientProfile.png';
import { Badge, Image} from 'react-bootstrap';
import { removeAssignedDevice} from '../../actions/adminActions';
import { useDispatch, useSelector} from 'react-redux';
import systolicImg from '../../assets/Images/blood-pressure.png';
import { hrTimeSpentOfCurrentMonth } from '../../actions/HRActions';
const moment = require('moment-timezone');

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


    return (
        <>
            <div className="col-md-3">
                <h5 className="pt-2 mt-2">Patient <span style={{ color: '#ed1b24' }}>Details </span>
                </h5>
                

            </div>
            <hr />

            <div className="row">
                <div className="col-md-3">
                    <div>
                        <img src={patientProfileImg} className="img-responsive profile-card-img" alt="patientProfile" />

                        <p className="patient-profile-name">{patient?.firstname} {patient?.lastname}  </p>

                        <>
                            <p className="patient-email">{patient?.email}</p>

                            <span className="patient-profile-disease-span"> {patient?.diseases ? patient?.diseases : 'N/A'} </span>
                        </>
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
                    <p className="patient-profile-card-text">{patient?.phone1 || 'N/A'}</p>

                    <span className="profile-label">Mobile No </span>
                    <p className="patient-profile-card-text">{patient?.mobileNo || 'N/A'} </p>

                    <span className="profile-label">Time spent (This month) </span>
                    <p className="patient-profile-card-text spentTime" style={{width: '90px'}}>{totalTime || 0} Mins</p>
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
                        <span className="profile-label">Assigned Devices (0{patient?.assigned_devices && patient?.assigned_devices?.length})</span>

                        {patient?.assigned_devices && patient?.assigned_devices.map((deviceass, index) => (
                            <div key={index}>
                                <p key={index}><Badge bg="success text-white">{deviceass?.deviceObjectId?._id} </Badge>
                                    <button className="btn" style={{ color: 'red' }}
                                        onClick={() => removeAssignDevice(deviceass, patientid)}
                                    >
                                        <i className="bx bx-trash"></i>
                                    </button>
                                </p>

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