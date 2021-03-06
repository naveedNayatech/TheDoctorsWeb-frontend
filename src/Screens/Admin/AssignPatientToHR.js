import React, { Fragment, useState, useEffect } from 'react'
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import { getPatients, patientProfile, assignPatientToHR } from '../../actions/adminActions';
import patientProfileImg from '../../assets/Images/patientProfile.png';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import moment from 'moment';
import { RESET_ASSIGN_PATIENT_TO_HR } from '../../constants/adminConstants';
import Select from 'react-select'

const AssignPatientToHr = (props) => {

    let id = props?.location?.state?.id;
    let hrId = props?.location?.state?.id?._id;
    let firstName = props?.location?.state?.id?.firstname;
    let lastName = props?.location?.state?.id?.lastname;


    const dispatch = useDispatch();
    const alert = useAlert();


    const [patientId, setPatientId] = useState('');


    const { loading, error, patients, isUpdated } = useSelector(state => state.admin);
    const { patient } = useSelector(state => state.patientProfile);
    const { isAssigned } = useSelector(state => state.hrslist);


    useEffect(() => {

        if (error) {
            return alert.error(error);
        }

        dispatch(getPatients());

        if (patientId) {
            dispatch(patientProfile(patientId))
        }

        if (isAssigned === true) {
            alert.success('Doctor Assigned');
            props.history.push({ pathname: "/hrProfile", state: { hr: id } });
            dispatch({
                type: RESET_ASSIGN_PATIENT_TO_HR
            })
        }

    }, [dispatch, alert, error, patientId, isAssigned]);

    const assignPatient = () => {
        dispatch(assignPatientToHR(hrId, patientId))
    }

    const funcSetPatientProfile = (patient) => {
        setPatientId(patient.value)
        console.log('patient ID is ' + patient.value);
    }

    const options = []
    patients && patients.filter(patients => !patients.assigned_hr_id).map((patient, index) => (
        options.push({ value: patient?._id, label: [patient?.firstname, patient?.lastname, patient?.ssn].join(" ") })
    ))
    return (
        <Fragment>
            <MetaData title="Assign Patient" />
            <Sidebar />

            <section className="home-section">
                {/* TopBar */}
                <TopBar />

                <div className="col-md-0 shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">
                    <div className="row">
                        <div className="col-md-4">
                            <h5 className="pt-2 mt-2">Select <span style={{ color: '#F95800' }}>Patient </span></h5>
                            <hr />
                            {/* 
                            <select 
                                name="patientlist"
                                className="form-control"
                                defaultValue={'Select Patient'}
                                value={patientId} 
                                onChange={(e) => setPatientId(e.target.value)}
                                >
                                <option value="Select Doctor">Select Patient</option>    
                                {patients && patients.filter(patients => !patients.assigned_hr_id).map((pat, index) => (
                                    <option value={pat?._id} key={index}> {pat?.firstname} {pat?.lastname} {pat?.npinumber} </option>
                                ))}    
                                
                            </select>  */}
                            <Select
                                options={options}
                                onChange={funcSetPatientProfile}
                            />
                        </div>

                        <div className="col-md-8">
                            <h5 className="pt-2 mt-2">Patient <span style={{ color: '#F95800' }}>Details </span></h5>
                            <hr />

                            {patientId && patient && <Fragment>
                                <div className="col-md-12">
                                    <div className="row">
                                        <img src={patientProfileImg} className="patient-profile-card-img" alt="patientProfile" />
                                        <p className="profile-name pl-3 pb-2">{patient?.firstname} {patient?.lastname} </p>
                                    </div>

                                    <br />

                                    <div className="row">
                                        <div className="col-md-4">
                                            <span className="profile-label">Email Address: </span>
                                            <p className="profile-value-text">{patient?.email ? patient?.email : 'N/A'}</p>

                                            <span className="profile-label">Address: </span>
                                            <p className="profile-value-text">{patient?.address} , {patient?.state}</p>

                                            {patient?.assigned_doctor_id?.firstname ? <Fragment> <span className="profile-label">Dr Name: </span>
                                            <p className="profile-value-text">{patient?.assigned_doctor_id?.firstname} , {patient?.assigned_doctor_id?.lastname}</p>
                                            </Fragment>
                                            :null}
                                        </div>

                                        <div className="col-md-4">
                                            <span className="profile-label">D.O.B: </span>
                                            <p className="profile-value-text">{moment(patient?.DOB).format("ll")}</p>

                                            <span className="profile-label">Role: </span>
                                            <p className="profile-value-text">{patient?.role}</p>
                                        </div>

                                        <div className="col-md-4">
                                            <span className="profile-label">Gender: </span>
                                            <p className="profile-value-text">{patient?.gender ? patient?.gender : 'N/A'}</p>

                                            <span className="profile-label">SSN: </span>
                                            <p className="profile-value-text">{patient?.ssn ? patient?.ssn : 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="add-staff-btn mr-5" style={{ float: 'right' }} onClick={() => assignPatient()}> Assign {patient?.firstname} {patient?.lastname} to HR. {firstName && firstName} {lastName && lastName} </button>
                            </Fragment>}
                        </div>
                    </div>
                </div>

            </section>
        </Fragment>
    )
}

export default AssignPatientToHr;
