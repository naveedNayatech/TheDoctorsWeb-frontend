import React, { Fragment, useState, useEffect } from 'react'
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import { getPatients, patientProfile, assignPatientToDoctor } from '../../actions/adminActions';
import patientProfileImg from '../../assets/Images/patientProfile.png';
import Loader from '../../layouts/Loader';
import {useDispatch, useSelector} from 'react-redux';
import { useAlert } from 'react-alert';

const AssignDoctorToPatient = (props) => {

    let id = props?.location?.state?.id;
    let firstName = props?.location?.state?.firstName;
    let lastName = props?.location?.state?.lastName;


    const dispatch = useDispatch();
    const alert = useAlert();    
    
    const [patientEmail, setPatientEmail] = useState('');
    const [patientId, setPatientId] = useState('');

    const { loading, error, patients} = useSelector(state => state.admin);
    const { loading: profileLoading, error: profileError, patient, isUpdated} = useSelector(state => state.patientProfile);

    useEffect(() => {
        
        if(error){
            return alert.error(error);
        }

        dispatch(getPatients());
        
        if(patientId){
            dispatch(patientProfile(patientId))
        }

        if(isUpdated === true){
            alert.success('Patient Assigned');
            props.history.push({pathname: '/doctorProfile', state: {id: id}});
        }
        
    }, [dispatch, alert, error, patientId, isUpdated]);


    const getPatientProfile = (e) => {
        e.preventDefault();
        console.log('patient ID is ' + patientId);
    }

    const assignDoctor = (id) => {
        dispatch(assignPatientToDoctor(id, patientId))
    }

    return (
        <Fragment>
        <MetaData title="Assign Patient"/>
            <Sidebar />    

            <section className="home-section">
            {/* TopBar */}
            <TopBar />

            <div className="col-md-0 shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">
                <div className="row">
                    <div className="col-md-4">
                        <h5 className="pt-2 mt-2">Select Patient  </h5>
                        <hr />

                        <form onSubmit={getPatientProfile}>
                            <select 
                                name="patientlist"
                                className="form-control"
                                value={patientId} 
                                onChange={(e) => setPatientId(e.target.value)}
                                >
                                {patients && patients.map((patient, index) => (
                                    <option value={patient?._id} key={index}> {patient?.firstname} {patient?.lastname} {patient?.ssn} </option>
                                ))}    
                                
                            </select> 
                        </form>
                    </div>

                    <div className="col-md-8">
                        <h5 className="pt-2 mt-2">Patient Details  </h5>
                        <hr />

                        {patientId && patient && <Fragment>
                
                                        <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <img src={patientProfileImg} className="patient-profile-card-img" alt="patientProfile" />
                                        </div>

                                        <div className="col-md-4">        
                                            <p className="profile-name">{patient?.title} {patient?.firstname} {patient?.lastname} </p>

                                            <Fragment>
                                                <p className="doctor-specilizations">{patient?.email}</p>
                                                <br />
                                            </Fragment>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-4">    
                                                <small><b>Phone Number (Primary)</b></small>
                                                <p>{patient?.contactno}</p>

                                                <small><b>Phone Number (Secondary)</b></small>
                                                <p>{patient?.phone1 !== '' ? patient?.phone1 : 'N/A' }</p>

                                        </div>

                                        <div className="col-md-4">    
                                            <small><b>Fax</b></small>
                                            <p>{patient?.phone2 !== '' ? patient?.phone2 : 'N/A' }</p>

                                            <small><b>Consent Doctor ID</b></small>
                                            <p>{patient?.consentdocid}</p>                                 
                                        </div>

                                        <div className="col-md-4">    
                                            <small><b>PCP</b></small>
                                            <p>{patient?.pcp }</p>

                                            <small><b>Insurance Status</b></small>
                                            <p>{patient?.insurancestatus}</p>                                 
                                        </div>
                                    </div>
                            </div>

                            <button className="btn btn-danger" onClick={() => assignDoctor(id)}> Assign {patient?.title} {patient?.firstname} {patient?.lastname} to Dr. {firstName && firstName} {lastName && lastName} </button>                        
                        </Fragment>}
                    </div>
                </div>
            </div>

            </section>
        </Fragment>
    )
}

export default AssignDoctorToPatient
