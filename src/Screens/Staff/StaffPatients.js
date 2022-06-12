import React, {Fragment, useEffect} from 'react'
import  Sidebar from '../../components/Staff/Sidebar';
import TopBar from '../../components/Staff/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import { useSelector, useDispatch } from 'react-redux';
import folderImg from '../../assets/Images/folder.png';
import { getDoctorPatients } from '../../actions/adminActions';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';

const StaffPatients = ({ history }) => {
    const dispatch = useDispatch();
    
    const { isAuthenticated, staff} = useSelector(state => state.staffAuth);
    const { loading, doctorpatients } = useSelector(state => state.docPatients);
    
    let id = staff._id;

    useEffect(() => {
        dispatch(getDoctorPatients(id));
	}, [dispatch])

    return (
        <Fragment>
           <MetaData title="My Patients"/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />

                {loading ? <Loader /> : <Fragment>
                    <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
                        <div className="home-content">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-9">
                                        <h5 className="pt-2 mt-2">My Patients <span style={{color: '#004aad'}}> ({doctorpatients && doctorpatients?.length < 10 ? '0'+doctorpatients?.length : doctorpatients?.length}) </span></h5> 
                                    </div>

                                    <div className="col-md-3">
                                        <Link to="/doctor/Addpatient" className="add-staff-btn">Enroll New Patient</Link>
                                    </div>
                                </div>
                                <hr /> 
                                
                                {doctorpatients?.length > 0 ? (<Fragment>
                                <div className="col-md-12">
                                    <Fragment>
                                        <table className="table table-sm table-striped">
                                        <thead align="center">
                                        <tr>  
                                            <th>Name</th>
                                            <th>Contact No </th>
                                            <th>Email</th>
                                            <th>Phy. Status</th>
                                            <th>Insurance Company</th>
                                            <th>Consent Status</th>
                                            <th>Action</th>
                                        </tr> 
                                        </thead>
                                        <tbody>
                                        {doctorpatients && doctorpatients.map((patient, index) => ( 
                                            <tr align="center" key={index}>
                                            <td><Link class="link" to={{ pathname: "/doctor/patient/profile", state: {patientid: patient?._id, deviceid: patient?.deviceassigned?.deviceid}}}>{patient?.title} {patient?.firstname} {patient?.lastname} <p style={{color: 'gray'}}>09/22/1975</p></Link></td>
                                            <td>{patient?.phone1} <p><Badge bg="dark text-white">{patient?.gender}</Badge></p></td>
                                            <td>{patient?.email}</td>
                                            <td>{patient?.doctorid === null ? <Badge bg="danger text-white" className="not-assigned-tag">Not Assigned</Badge> : <Badge bg="info text-white" className="assigned-tag">Assigned</Badge>}</td>
                                            <td>{patient?.insurancecompany ? patient?.insurancecompany : 'N/A'} </td>
                                            <td>{patient?.rpmconsent === true ? <p>Signed</p> : <p>Not Signed</p>}</td>
                                            <td>
                                            <Link to={{ pathname: "/doctor/patient/profile", state: {patientid: patient?._id}}} className="rounded-button-profile"><i className='bx bx-user'></i></Link> &nbsp;
                                            </td>
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
                </section>     
        </Fragment>
    )
}

export default StaffPatients
