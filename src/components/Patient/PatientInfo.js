import React from 'react';
import patientProfileImg from '../../assets/Images/patientProfile.png';
import { Badge} from 'react-bootstrap';
import { removeAssignedDevice} from '../../actions/adminActions';
import { useDispatch} from 'react-redux';

const PatientInfo = ({patient, ReadingsperMonth, readingsThisMonth, careplan, patientid}) => {

    const dispatch = useDispatch();
    
    const removeAssignDevice = (device,patientid) => {
        dispatch(removeAssignedDevice(device, patientid));
    }


  return (
    <>
        <div className="col-md-3">
            <h5 className="pt-2 mt-2">Patient <span style={{ color: '#F95800'}}>Details </span></h5>
        </div>
        <hr />

        <div className="row">
            <div className="col-md-3">
                <div>
                    <img src={patientProfileImg} className="img-responsive profile-card-img" alt="patientProfile" />
                    
                        <p className="patient-profile-name">{patient?.firstname} {patient?.lastname} </p>
                
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
                    <p className="patient-profile-card-text">{patient?.mobileNo || 'N/A' } </p>
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

        {/* Second Row */}
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
                            {patient?.assigned_devices && patient?.assigned_devices?.length === 0 ? <>
                            <span className="profile-label">No Device Assigned Yet</span>
                            
                            </> : <>
                            <span className="profile-label">Assigned Devices (0{patient?.assigned_devices && patient?.assigned_devices?.length})</span>
                            
                                {patient?.assigned_devices && patient?.assigned_devices.map((deviceass, index) => (
                                <div key={index}>
                                <p key={index}><Badge bg="success text-white">{deviceass?.deviceObjectId?._id} </Badge>
                                <button className="btn" style={{color: 'red'}} 
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
                        <p className="patient-profile-card-text">{patient?.insurancecompany ? patient?.insurancecompany : 'N/A' }</p> 
                        </div>    
                    </div>
                </div>
                

                <div className="col-md-3">
                    <span className="patient-profile-col-heading">Patient Careplan</span>                                 
                    <hr /> 
                    {careplan && careplan ? <>
                        <span style={{float: 'right', marginTop: 10}}>
                            <i>Careplan Added.</i> <br/>
                            <i>By: {careplan?.data?.assigned_hr_id?.firstname} {careplan?.data?.assigned_hr_id?.lastname}
                            &nbsp;&nbsp;<Badge bg="success text-white">{careplan?.data?.assigned_hr_id?.role}</Badge> 
                            </i>
                        </span>  
                    </> : 'N/A'}
                </div>
            </div>
    </>
  )
}

export default PatientInfo