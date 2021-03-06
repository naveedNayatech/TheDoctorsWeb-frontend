import React, { Fragment, useState, useEffect } from 'react'
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import { getPatients, patientProfile, assignPatientToDoctor } from '../../actions/adminActions';
import patientProfileImg from '../../assets/Images/patientProfile.png';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import moment from 'moment';
import Select from 'react-select'

const AssignDoctorToPatient = (props) => {

    let id = props?.location?.state?.id;
    let firstName = props?.location?.state?.firstName;
    let lastName = props?.location?.state?.lastName;


    const dispatch = useDispatch();
    const alert = useAlert();

    const [patientEmail, setPatientEmail] = useState('');
    const [patientId, setPatientId] = useState('');

    const { loading, error, patients } = useSelector(state => state.admin);
    const { patient } = useSelector(state => state.patientProfile);
    const { message, error: commonError } = useSelector(state => state.common);

    useEffect(() => {

        if (error) {
            return alert.error(error);
        }

        if (commonError) {
            return alert.error(commonError);
        }

        dispatch(getPatients());

        if (patientId) {
            dispatch(patientProfile(patientId))
        }

        if (message) {
            alert.success(message);
            props.history.push({ pathname: '/doctorProfile', state: { id: id } });
        }

    }, [dispatch, alert, error, patientId, message, commonError]);


    const getPatientProfile = (patient) => {
        // e.preventDefault();
        setPatientId(patient.value)
        console.log('patient ID is ' + patient.value);
    }

    const assignDoctor = (id) => {
        dispatch(assignPatientToDoctor(id, patientId))
    }

    const options = []
    patients && patients.filter(patients => !patients.assigned_doctor_id).map((patient, index) => (
        options.push({ value: patient?._id, label: [patient?.firstname, patient?.lastname, patient?.ssn].join(" ")  })
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

                            {/* <form onSubmit={getPatientProfile}> */}
                                <Select
                                    options={options}
                                    onChange={getPatientProfile}
                                />
                            {/* </form> */}
                        </div>

                        <div className="col-md-8">
                            <h5 className="pt-2 mt-2">Patient <span style={{ color: '#F95800' }}>Details </span></h5>
                            <hr />

                            {patientId && patient && <Fragment>

                                <div className="col-md-12">
                                    <div className="row">
                                        <img src={patientProfileImg} className="patient-profile-card-img" alt="patientProfile" />
                                        <p className="profile-name pl-3 pb-2">{patient?.title} {patient?.firstname} {patient?.lastname} </p>
                                    </div>

                                    <br />

                                    <div className="row">
                                        <div className="col-md-4">
                                            <span className="profile-label">Email Address: </span>
                                            <p className="profile-value-text">{patient?.email ? patient?.email : 'N/A'}</p>

                                            <span className="profile-label">Address: </span>
                                            <p className="profile-value-text">{patient?.address} , {patient?.state}</p>

                                        </div>

                                        <div className="col-md-4">
                                            <span className="profile-label">D.O.B: </span>
                                            <p className="profile-value-text">{moment(patient?.DOB).format("ll")}</p>

                                            <span className="profile-label">Role: </span>
                                            <p className="profile-value-text">{patient?.role}</p>
                                        </div>

                                        <div className="col-md-4">
                                            <span className="profile-label">Gender: </span>
                                            <p className="profile-value-text">{patient?.gender}</p>

                                            <span className="profile-label">SSN: </span>
                                            <p className="profile-value-text">{patient?.ssn}</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="add-staff-btn mr-5" style={{ float: 'right' }} onClick={() => assignDoctor(id)}> Assign {patient?.title} {patient?.firstname} to Dr. {firstName && firstName} {lastName && lastName} </button>

                            </Fragment>}
                        </div>
                    </div>
                </div>

            </section>
        </Fragment>
    )
}

export default AssignDoctorToPatient
