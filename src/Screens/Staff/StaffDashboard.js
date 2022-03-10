import React, {Fragment, useEffect} from 'react'
import  Sidebar from '../../components/Staff/Sidebar';
import MetaData from '../../layouts/MetaData';
import StaffPieGraph from '../../components/Staff/StaffPieGraph';
import TopBar from '../../components/Staff/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorPatients } from '../../actions/adminActions';
import folderImg from '../../assets/Images/folder.png';
import { Link } from 'react-router-dom';
import { Badge, Form } from 'react-bootstrap';
import Loader from '../../layouts/Loader';
import patientProfileImg from '../../assets/Images/patientProfile.png';
import moment from 'moment';

const StaffDashboard = (props) => {

    const { loading, staff, isAuthenticated} = useSelector(state => state.staffAuth);
    const { loading: patientsLoading, doctorpatients } = useSelector(state => state.docPatients);
    
    let id = staff._id;

    const dispatch = useDispatch();

    useEffect(() => {	
		if(isAuthenticated === false) {
			props?.history?.push("/stafflogin");
		}

        dispatch(getDoctorPatients(id));

	}, [isAuthenticated])


    return (
        <Fragment>
            <MetaData title="Staff Dashboard" />
            <Sidebar />
            
            <section className="home-section">
                {/* TopBar */}  
                <TopBar />

                <div className="container row">
                    <div className="col-md-12">
                        <div className="home-content">
                            <StaffPieGraph />
                        </div>    
                    </div>

                    {/* <div className="col-md-3 alerts-section rounded-card">
                        HR Details   
                         <img src={patientProfileImg} className="img-responsive profile-card-img" alt="patientProfile" /> 
                         <p className="patient-profile-name"> Alex Adeel</p>
                         <p className="patient-profile-name"> adeelahmad@gmail.com</p>
                         <p className="patient-profile-name"> +844-569-558</p>

                    </div> */}
                </div>
                

            <div>

            <br />
            {patientsLoading ? <Loader /> : <Fragment>
                    <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
                        <div className="home-content">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h5 className="pt-2 mt-2">My Patients <span style={{color: '#F95800'}}> ({doctorpatients && doctorpatients.length}) </span></h5> 
                                        <hr />
                                    </div>
                                </div> 
                                
                                {doctorpatients?.length > 0 ? (<Fragment>
                                <div className="col-md-12">
                                    <Fragment>
                                        <table className="table table-sm table-striped">
                                        <thead align="center">
                                        <tr>  
                                            <th>Name</th>
                                            <th>DOB </th>
                                            <th>Email</th>
                                            <th>Acc Status</th>
                                            <th>Physician</th>
                                            <th>Devices Assigned</th>
                                        </tr> 
                                        </thead>
                                        <tbody>
                                        {doctorpatients && doctorpatients.map((patient, index) => ( 
                                            <tr align="center" key={index}>
                                            
                                            <td><Link to={{ pathname: "/staffPatientProfile", state: {patientid: patient?._id, deviceid: patient?.deviceassigned?.deviceid}}}>{patient?.firstname} {patient?.lastname} <p>{patient?.phone1}</p></Link></td>
                                            
                                            <td> {moment(patient?.DOB).format("ll")} <p><Badge bg="dark text-white">{patient?.gender}</Badge></p></td>
                                            
                                            <td style={{wordWrap: 'break-word'}}>{patient?.email}</td>
                                            
                                            {patient?.block === false ? <td>
                                                <i className='bx bxs-circle' style={{color: 'green'}}></i> <p style={{color: 'green'}}>Activated</p>
                                                </td> : <td><i className='bx bxs-circle'style={{color: 'red'}}></i> <p style={{color: 'red'}}>De-Activated</p>
                                            </td>}
                                            
                                            {patient?.assigned_doctor_id ? <>
                                                <td>Dr.{patient?.assigned_doctor_id?.firstname} {patient?.assigned_doctor_id?.lastname}</td>
                                            </> : <>
                                            <td><Badge bg="danger text-white" className="not-assigned-tag">Not Assigned</Badge></td>
                                            </>}

                                            {patient?.assigned_devices ? <td>{patient?.assigned_devices.length}</td> : 'No Device Assigend'}
                                            
                                        </tr> 
                                        ))}
                                        
                                        </tbody>
                                        </table>    
                                    </Fragment>                      
                                    </div>
                                </Fragment> ) : <Fragment>

                                <div>   
                                <img src={folderImg} className="no-record-found-img"/>
                                <p className="doctor-specilizations">No Patient Assigned Yet...</p>         
                                </div>
                                </Fragment> }
                                        <hr />
                                    </div>
                                </div>
                            </div>
                         </Fragment> }

            </div>

             

                
            </section>

        </Fragment>
    )
}

export default StaffDashboard;
