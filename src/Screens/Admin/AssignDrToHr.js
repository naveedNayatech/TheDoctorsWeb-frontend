import React, { Fragment, useState, useEffect } from 'react'
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import { getDoctors, doctorProfile, assignDoctorToHR } from '../../actions/adminActions';
import patientProfileImg from '../../assets/Images/patientProfile.png';
import Loader from '../../layouts/Loader';
import {useDispatch, useSelector} from 'react-redux';
import { useAlert } from 'react-alert';
import moment from 'moment';

const AssignDrToHr = (props) => {

    let hrId = props?.location?.state?.id;
    let firstName = props?.location?.state?.firstName;
    let lastName = props?.location?.state?.lastName;


    const dispatch = useDispatch();
    const alert = useAlert();    
    
    const [doctorId, setDoctorId] = useState('');
    const [patientId, setPatientId] = useState('');


    const { loading, error, doctors, isUpdated} = useSelector(state => state.admin);
    const { loading : doctorLoading, doctor } = useSelector(state => state.doctorProfile);
    const { isAssigned } = useSelector(state => state.hrslist);


    useEffect(() => {
        
        if(error){
            return alert.error(error);
        }

        dispatch(getDoctors());

        if(doctorId){
            console.log('Doctor ID is ' + doctorId);
            dispatch(doctorProfile(doctorId))
        }

        if(isAssigned === true){
            alert.success('Doctor Assigned');
            props.history.push({pathname: '/hrlist'});
        }
        
    }, [dispatch, alert, error, doctorId, isAssigned]);

    const assignDoctor = () => {
        dispatch(assignDoctorToHR(hrId, doctorId))
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
                        <h5 className="pt-2 mt-2">Select <span style={{ color: '#F95800'}}>Doctor </span></h5>
                        <hr />

                            <select 
                                name="patientlist"
                                className="form-control"
                                defaultValue={'Select Doctor'}
                                value={doctorId} 
                                onChange={(e) => setDoctorId(e.target.value)}
                                >
                                <option disabled value="Select Doctor">Select Doctor</option>    
                                {doctors && doctors.map((doc, index) => (
                                    <option value={doc?._id} key={index}> {doc?.firstname} {doc?.lastname} {doc?.npinumber} </option>
                                ))}    
                                
                            </select> 
                    </div>

                    <div className="col-md-8">
                        <h5 className="pt-2 mt-2">Doctor <span style={{ color: '#F95800'}}>Details </span></h5>
                        <hr />

                        {doctorId && doctor && <Fragment>
                                    <div className="col-md-12">
                                        <div className="row">
                                            <img src={patientProfileImg} className="patient-profile-card-img" alt="patientProfile" />
                                            <p className="profile-name pl-3 pb-2">{doctor?.title} {doctor?.firstname} {doctor?.lastname} </p>
                                        </div>

                                        <br />

                                    <div className="row">
                                        <div className="col-md-4">    
                                            <span className="profile-label">Email Address: </span>
                                        <p className="profile-value-text">{doctor?.email ? doctor?.email : 'N/A'}</p>

                                        <span className="profile-label">Address: </span>
                                            <p className="profile-value-text">{doctor?.address} , {doctor?.state}</p>    
                                        </div>

                                        <div className="col-md-4">    
                                            <span className="profile-label">D.O.B: </span>
                                        <p className="profile-value-text">{moment(doctor?.DOB).format("ll")}</p>

                                        <span className="profile-label">Role: </span>
                                            <p className="profile-value-text">{doctor?.role}</p>                                 
                                        </div>

                                        <div className="col-md-4">    
                                        <span className="profile-label">Gender: </span>
                                            <p className="profile-value-text">{doctor?.gender ? doctor?.gender : 'N/A'}</p>

                                            <span className="profile-label">SSN: </span>
                                            <p className="profile-value-text">{doctor?.ssn ? doctor?.ssn : 'N/A'}</p>                                
                                        </div>
                                    </div>
                            </div>
                            <button className="add-staff-btn mr-5" style={{ float: 'right' }} onClick={() => assignDoctor()}> Assign {doctor?.firstname} {doctor?.lastname} to HR. {firstName && firstName} {lastName && lastName} </button>             
                        </Fragment>}
                    </div>
                </div>
            </div>

            </section>
        </Fragment>
    )
}

export default AssignDrToHr;
