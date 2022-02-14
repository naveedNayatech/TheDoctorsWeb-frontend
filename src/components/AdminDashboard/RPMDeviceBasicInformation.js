import React, { useState, useEffect, Fragment } from 'react';
import moment from 'moment';
import { Badge } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import { getPatients, patientProfile, assignRPMDeviceToPatient } from '../../actions/adminActions';
import { useAlert } from 'react-alert';
import patientProfileImg from '../../assets/Images/patientProfile.png';
import { ADD_RPM_DEVICE_RESET } from '../../constants/adminConstants';
import { Link } from 'react-router-dom';


const RPMDeviceBasicInformation = (props) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    let deviceDetails = props?.deviceData;

    const { error, patients} = useSelector(state => state.admin);
    const { patient } = useSelector(state => state.patientProfile);
    const { error: deviceError, isUpdated} = useSelector(state => state.device);

    const [patientId, setPatientId] = useState('');

    useEffect(() => {
        if(error){
            return alert.error(error);
        }

        if(deviceError){
            return alert.error(error);
        }

        dispatch(getPatients());

        if(patientId){
            dispatch(patientProfile(patientId))
        }

        if(isUpdated) {
            alert.success('Updated');
            // props?.history?.('/devicedetails');

            dispatch({
                type: ADD_RPM_DEVICE_RESET
            });
        }
        
    }, [dispatch, alert, error, isUpdated, patientId]);

    const AssignDeviceToPatient = () => {
        dispatch(assignRPMDeviceToPatient(deviceDetails?._id, patientId));
    }

    return (
        <Fragment>
            <small><b>Basic Information: </b></small>
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <th scope="col-md-3">Model Number</th>
                            <td scope="col-md-3">{deviceDetails?.modelNumber ? deviceDetails?.modelNumber : 'N/A'}</td>
                            <th scope="col-md-3">IMEI</th>
                            <td scope="col-md-3">{deviceDetails?.imei ? deviceDetails?.imei : 'N/A'}</td>
                        </tr>

                        <tr>
                            <th scope="col-md-3">Type</th>
                            {deviceDetails?.deviceType === 'bp' ? <td scope="col-md-3"><Badge bg="warning text-white" className="male-tag">cuff</Badge></td> : <td><Badge bg="info text-white" className="male-tag">Weight</Badge></td>}
                            <th scope="col-md-3">Broken Status</th>
                            <td scope="col-md-3" style={{color: deviceDetails?.broken === true ? 'red': 'green'}}><b>{deviceDetails?.broken  === true ? 'broken' : 'unbroken'}</b></td>
                        </tr>

                        <tr>
                            <th scope="col-md-3">Created At</th>
                            <td scope="col-md-3">{moment(deviceDetails?.createdAt).format("lll")}</td>
                            <th scope="col-md-3">Firmware Version</th>
                            <td scope="col-md-3">{deviceDetails?.firmwareVersion ? deviceDetails?.firmwareVersion : 'N/A'}</td>
                        </tr>

                        <tr>
                            <th scope="col-md-3">hardware Version</th>
                            <td scope="col-md-3">{deviceDetails?.hardwareVersion ? deviceDetails?.hardwareVersion : 'N/A'}</td>
                            <th scope="col-md-3">Patient Assigned Status</th>
                            {deviceDetails?.assigned_patient_id ?  <td scope="col-md-3"><Badge bg="info text-white"> Assigned</Badge></td> : <td><Badge bg="success text-white"> In Stock</Badge></td>
                             } 
                        </tr>

                        {deviceDetails?.assigned_patient_id && <Fragment>
                            <tr>
                            <th scope="col-md-3">Assigned To: </th>
                            <td scope="col-md-3" style={{backgroundColor: '#F95800', color: '#FFF', letterSpacing:1}}>{deviceDetails?.assigned_patient_id?.firstname} {deviceDetails?.assigned_patient_id?.lastname} ( {deviceDetails?.assigned_patient_id?.gender} )</td>
                        </tr>
                        </Fragment> 
                        }
                        
                    </tbody>
                </table>

                <div>

                <small><b>Assign Device to Patient</b></small>

                <div className="row">
                    <div className="col-md-4">
                        <label className="form-label mt-3">Select Patient</label>
                        <select 
                            name="patientlist"
                            className="form-control"
                            defaultValue={'Select Patient'} 
                            value={patientId}
                            onChange={(e) => setPatientId(e.target.value)}
                            >
                                <option >Select Patient</option>
                                    {patients && patients.map((patient, index) => (
                                        <option value={patient?._id} key={index} > {patient?.firstname} {patient?.lastname} {patient?.ssn} </option>
                                    ))}    
                        </select>
                    </div>

                    {/* Patient Profile */}
                    <div className="col-md-8">

                    {patientId && patient && <Fragment>

                                    <div className="col-md-12">
                                        <div className="row">
                                    
                                        <img src={patientProfileImg} className="patient-profile-card-img" alt="patientProfile" />
                                    
                                        <p className="profile-name pl-3 pb-2">{patient?.title} {patient?.firstname} {patient?.lastname} </p>
                                    </div>
                                    <br />
                                <div className="row">
                                    <div className="col-md-4">    
                                        <span className="profile-label">Gender: </span>
                                        <p className="profile-value-text">{patient?.gender === 'male' ? <Badge bg="info text-white" className="male-tag">Male</Badge> : <Badge bg="danger text-white" className="female-tag">Female</Badge>}</p>

                                        <span className="profile-label">DOB: </span>
                                        <p className="profile-value-text">{moment(patient?.DOB).format("ll")}</p>
                                    </div>

                                    <div className="col-md-4">    
                                        <span className="profile-label">Email Address: </span>
                                        <p className="profile-value-text">{patient?.email ? patient?.email : 'N/A' }</p>

                                        <span className="profile-label">SSN Number: </span>
                                        <p className="profile-value-text">{patient?.ssn ? patient?.ssn : 'N/A'}</p>                                 
                                    </div>

                                    <div className="col-md-4">    
                                        <span className="profile-label">Phone 1: </span>
                                        <p className="profile-value-text">{patient?.phone1 ? patient?.phone1 : 'N/A' }</p>
                                    </div>

                                    <br/>
                                    <div style={{ display: "flex" }}>
                                        {patient?.block === false ? 
                                        <Fragment>
                                        <button className="submit-btn ml-3" onClick={AssignDeviceToPatient}>Assign </button>
                                        <Link to={{ pathname: "/printReceipt", state: {deviceAssigned: deviceDetails, patientDetails: patient }}} className="ml-3 mt-2">Print Receipt</Link>
                                        </Fragment>
                                        : 
                                        <Fragment>
                                            <small style={{ color: "red", marginBottom: "30px"}}>Cannot assigned device, {patient?.firstname} {patient?.lastname}'s account is de-activated.</small>
                                        </Fragment>    
                                    }
                                        
                                    </div>
                                </div>
                            </div>                             
                        </Fragment> }
                    </div>
                </div> 
            </div> 
        </Fragment>
    )
}

export default RPMDeviceBasicInformation
