import React, {Fragment, useEffect} from 'react'
import  Sidebar from '../../components/Staff/Sidebar';
import MetaData from '../../layouts/MetaData';
import StaffPieGraph from '../../components/Staff/StaffPieGraph';
import TopBar from '../../components/Staff/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctorPatients, doctorProfile } from '../../actions/adminActions';
import folderImg from '../../assets/Images/folder.png';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import Loader from '../../layouts/Loader';
import moment from 'moment';
import patientProfileImg from "../../assets/Images/patientProfile.png";

const StaffDashboard = (props) => {

    const { loading, staff, isAuthenticated} = useSelector(state => state.staffAuth);
    const { loading: patientsLoading, doctorpatients } = useSelector(state => state.docPatients);
    const { doctor } = useSelector(state => state.doctorProfile);
    
    let id = staff._id;

    const dispatch = useDispatch();

    useEffect(() => {	
		if(isAuthenticated === false) {
			props?.history?.push("/doctor/login");
		}

        dispatch(getDoctorPatients(id));
        dispatch(doctorProfile(id));

	}, [isAuthenticated])


    return (
        <Fragment>
            <MetaData title="Staff Dashboard" />
            <Sidebar />
            
            <section className="home-section">
                {/* TopBar */}  
                <TopBar />

                <div className="container row">
                    <div className="col-md-9">
                        <div className="home-content">
                            <StaffPieGraph />
                        </div>    
                    </div>

                    <div className="col-md-3 alerts-section rounded-card">
                        <h5 className="text-center">HR Details</h5><hr/>
                        <br/>   
                        {doctor && doctor?.assigned_hr_id ? <>
                            <img src={patientProfileImg} className="img-responsive profile-card-img" alt="patientProfile" /> 
                            <p className="text-center mt-3" style={{fontSize: "12px", wordWrap: 'break-word'}}>HR. {doctor?.assigned_hr_id?.firstname} {doctor?.assigned_hr_id?.lastname}</p>
                            <p className="text-center mt-3" style={{fontSize: "12px", wordWrap: 'break-word'}}> {doctor?.assigned_hr_id?.email}</p>
                            <p className="text-center mt-3" style={{fontSize: "12px", wordWrap: 'break-word'}}> {doctor?.assigned_hr_id?.mobileNo}</p>
                        </> : <> <small style={{fontSize: "12px", marginLeft: "50px"}}>No HR Assigned yet</small></>}
                    </div>
                </div>
            <div>

            <br />
            {patientsLoading ? <Loader /> : <Fragment>
                    <div className="shadow-lg p-3 mb-5 mr-4 ml-4">        
                        <div className="home-content">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h5 className="pt-2 mt-2">My Patients <span style={{color: '#ed1b24'}}> ({doctorpatients && doctorpatients?.length < 10 ? '0'+doctorpatients?.length : doctorpatients?.length}) </span></h5> 
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
                                            <th>Total Devices Assigned</th>
                                        </tr> 
                                        </thead>
                                        <tbody>
                                        {doctorpatients && doctorpatients.map((patient, index) => ( 
                                            <tr align="center" key={index}>
                                            
                                            <td><Link className="link" to={{ pathname: "/doctor/patient/profile", state: {patientid: patient?._id, deviceid: patient?.deviceassigned?.deviceid}}}>{patient?.firstname} {patient?.lastname} <p>{patient?.phone1}</p></Link></td>
                                            
                                            <td> {moment(patient?.DOB).format("ll")} <p><Badge bg="dark text-white">{patient?.gender}</Badge></p></td>
                                            
                                            <td style={{wordWrap: 'break-word'}}>{patient?.email}</td>
                                            
                                            {patient?.block === false ? <td>
                                                <i className='bx bxs-circle' style={{color: 'green'}}></i> <p style={{color: 'green'}}>Activated</p>
                                                </td> : <td><i className='bx bxs-circle'style={{color: 'red'}}></i> <p style={{color: 'red'}}>De-Activated</p>
                                            </td>}
                                            
                                            {patient?.assigned_doctor_id ? <>
                                                <td style={{fontWeight: 'bold', color: '#23408e'}}>Dr.{patient?.assigned_doctor_id?.firstname} {patient?.assigned_doctor_id?.lastname}</td>
                                            </> : <>
                                            <td><Badge bg="danger text-white" className="not-assigned-tag">Not Assigned</Badge></td>
                                            </>}

                                            {patient?.assigned_devices ? <td>0{patient?.assigned_devices.length}</td> : 'No Device Assigend'}
                                            
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
