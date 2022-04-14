import React, { useEffect, Fragment, useState } from 'react';
import MetaData from '../../layouts/MetaData';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { doctorProfile, getDoctorPatients, removePatientsDoctor } from '../../actions/adminActions';
import folderImg from '../../assets/Images/folder.png';
import Loader from '../../layouts/Loader';
import { useAlert } from 'react-alert';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {Badge, Modal} from 'react-bootstrap';

const DoctorProfile = (props) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    let docId = props?.location?.state?.id;
    const [smShow, setSmShow] = useState(false); //small confirm modal.
    const [patientName, setPatientName] = useState(""); //patient name to show in modal.
    const [patientToRemove, setpatientToRemove] = useState(""); //set patient id to remove.
    const [doctorId, setDoctorID] = useState(docId); 
    const [sort, setSort] = useState(true);
    const [query, setQuery] = useState("");
    const keys = ["firstname", "lastname", "DOB", "email", "phone1", "diseases"];

    const { loading, error: doctorProfileError, doctor } = useSelector(state => state.doctorProfile);
    const { doctorpatients } = useSelector(state => state.docPatients);
    const {error, message} = useSelector(state => state.common);

    useEffect(() => {
        if(message){
            alert.success(message);
        }
    
        if(error){
            alert.error(error)
        }
        
        dispatch(doctorProfile(doctorId));
        dispatch(getDoctorPatients(doctorId));
    }, [dispatch, error, doctorId, message, doctorId]);


    const removePatient = () => {
        dispatch(removePatientsDoctor(patientToRemove, doctorId));
        setSmShow(false);
    }


    return (
        <Fragment>
            <MetaData title="Doctors Profile"/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />

                
                    {loading ? <Loader /> : <Fragment>
                    <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
                        <div className="home-content">
                        <div className="container">
                         <div className="row-display">
                            <h5 className="pt-2 mt-2">Doctor <span style={{color: '#F95800'}}> Details </span></h5> 
                                                         
                            <Link to={{ pathname: "/assigndoctor", state: {id: doctor?._id, firstName: doctor?.firstname, lastName: doctor?.lastname}}} 
                            className="add-staff-btn mt-2">Assign Patient to Dr. {doctor?.lastname}
                            </Link>
                         </div>   

                         <hr className="blue-hr"/>
                        

                        {doctor && <Fragment>
                            <div className="row">
                            <div className="col-md-4">
                                <div>
                                    <img src={doctor?.avatar?.url ? doctor?.avatar?.url : 'https://freepikpsd.com/file/2019/10/default-user-image-png-4-Transparent-Images.png'} className="img-responsive profile-card-img"/>
                                        
                                    <p className="profile-name">Dr. {doctor?.firstname} {doctor?.lastname} </p>
                                    
                                </div>
                            </div>

                            <div className="col-md-8">
                                <div>
                                    <div className="card-inner-margin">
                                        <div className="row">
                                        <div className="col-md-4">
                                            <span className="profile-label">Email: </span>
                                            <p className="profile-value-text" style={{wordWrap: 'break-word'}}>{doctor?.email}</p>

                                            <span className="profile-label">Gender: </span>
                                            <p className="profile-value-text">{doctor?.gender}</p>

                                            <span className="profile-label">License Number: </span>
                                            <p className="profile-value-text">{doctor?.licensenumber ? doctor?.licensenumber : 'N/A'}</p>
                                            
                                            </div>


                                            <div className="col-md-4">
                                                <span className="profile-label">DOB : </span>
                                                <p className="profile-value-text">{moment(doctor.DOB).format("ll")}</p>

                                                <span className="profile-label">Phone 1: </span>
                                                <p className="profile-value-text">{doctor?.phone1 ? <span style={{color: 'dodgerblue'}}><i className='bx bx-phone'></i> {doctor?.phone1} </span> : 'N/A'}</p>
                                                
                                                <span className="profile-label">Created At: </span>
                                                <p className="profile-value-text">{moment(doctor?.createdAt).format("lll")}</p>
                                            
                                            </div>

                                            <div className="col-md-4">
                                                <span className="profile-label">NPI #: </span>
                                                <p className="profile-value-text">{doctor?.licensenumber}</p>

                                                <span className="profile-label">Mobile No: </span>
                                                <p className="profile-value-text">{doctor?.mobileNo ? <span style={{color: 'dodgerblue'}}><i className='bx bx-phone'></i> {doctor?.mobileNo} </span> : 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>    


                        {/* paste patients list fragment here */}
                        {doctorpatients && doctorpatients?.length > 0 ? (<Fragment>
                            <div className="row-display">
                                <h5 className="pt-2 mt-2">Patient's List <span style={{color: '#F95800'}}>({doctorpatients && doctorpatients.length < 10 ? '0'+doctorpatients.length : doctorpatients.length})</span></h5> 
                                
                            <div className="row-display">
                                <input 
                                type="text" 
                                className="form-control mt-2"
                                onChange={e => setQuery(e.target.value)}
                                placeholder="Search"
                                style={{width: '180px', height: '40px'}}
                                /> 

                                &nbsp;&nbsp;&nbsp;
                                <button className="btn add-staff-btn mt-2" 
                                onClick={() => setSort(sort => !sort)}
                                style={{height: '40px'}}
                                >
                                    {sort ? <i className="bx bx-down-arrow-alt"></i> : <i className="bx bx-up-arrow-alt"></i>}
                                </button>
                            </div>
                            </div>
                            <br />

                                <div className="col-md-12">
                                    <Fragment>
                                        <table className="table table-sm table-striped">
                                        <thead align="center">
                                            <tr>  
                                            <th>Name</th>
                                            <th>Contact No </th>
                                            <th>Email</th>
                                            <th>Phy. Status</th>
                                            <th>Assigned Physician</th>
                                            <th>Diseases</th>
                                            <th>Action</th>
                                            </tr> 
                                        </thead>
                                        <tbody>
                                        {sort ? <>
                                            {doctorpatients && doctorpatients.filter(item => keys.some(key => item[key]?.toLowerCase().includes(query))).map((patient, index) => ( 
                                            <tr align="center" key={index}>
                                            <td><Link style={{textDecoration: 'none'}} to={{ pathname: "/patientProfile", state: {patientid: patient?._id, deviceid: patient?.deviceassigned?.deviceid}}}>
                                                {patient?.firstname} {patient?.lastname}  
                                                <p>{patient?.phone1}</p></Link>
                                            </td>

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

                                            <td style={{wordWrap: 'break-word'}}>{patient?.diseases}</td>
                                            <td>
                                            <Link to={{ pathname: "/patientProfile", state: {patientid: patient?._id}}} className="rounded-button-profile"><i className='bx bx-user'></i></Link> &nbsp;
                                            <Link to="/doctorProfile" className="rounded-button-delete" onClick={() => {setSmShow(true); setPatientName(patient?.lastname); setpatientToRemove(patient?._id)}}><i className="bx bx-trash" ></i></Link> &nbsp;
                                                {/* <Link to="/#" className="rounded-button-delete"><i className='bx bxs-user-minus'></i></Link> &nbsp; */}
                                            </td>
                                        </tr> 
                                        
                                        ))}    
                                        </> : <>
                                        {doctorpatients && doctorpatients.reverse().filter(item => keys.some(key => item[key].toLowerCase().includes(query))).map((patient, index) => ( 
                                            <tr align="center" key={index}>
                                            <td><Link style={{textDecoration: 'none'}} to={{ pathname: "/patientProfile", state: {patientid: patient?._id, deviceid: patient?.deviceassigned?.deviceid}}}>
                                                {patient?.firstname} {patient?.lastname}  
                                                <p>{patient?.phone1}</p></Link>
                                            </td>

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

                                            <td style={{wordWrap: 'break-word'}}>{patient?.diseases}</td>
                                            <td>
                                            <Link to={{ pathname: "/patientProfile", state: {patientid: patient?._id}}} className="rounded-button-profile"><i className='bx bx-user'></i></Link> &nbsp;
                                            <Link to="/doctorProfile" className="rounded-button-delete" onClick={() => {setSmShow(true); setPatientName(patient?.lastname); setpatientToRemove(patient?._id)}}><i className="bx bx-trash" ></i></Link> &nbsp;
                                                {/* <Link to="/#" className="rounded-button-delete"><i className='bx bxs-user-minus'></i></Link> &nbsp; */}
                                            </td>
                                        </tr> 
                                        
                                        ))}
                                        </> }
                                        
                                        
                                        </tbody>
                                        </table>    
                                    </Fragment>                      
                            </div>
                        </Fragment> ) : <Fragment>

                        <div>    
                        <h5 className="pt-2 mt-2">Patient's List </h5> 
                            <hr className="blue-hr"/>
                                           
                                <img src={folderImg} className="no-record-found-img"/>
                                <p className="doctor-specilizations">No Patient Assigned Yet...</p>
                            
                             
                        </div>
                        </Fragment> }               


                        {/* paste patients list fragment here */}
                        </Fragment>}
                        
                        </div>
                    </div>
                    </div>
                    </Fragment>
                    }
            </section>

             <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Body>
                    <small style={{color: '#303030'}}>Are you sure you want to remove patient 
                            <span style={{color: '#303030', fontWeight: 'bold'}}> {patientName}</span> from doctor 
                            <span style={{color: '#303030', fontWeight: 'bold'}}> {doctor?.firstname} {doctor?.lastname} ?
                            </span>
                            
                    </small>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-sm btn-danger" onClick={removePatient}>Remove</button>
                </Modal.Footer>
             </Modal> 
        </Fragment>
    )
}

export default DoctorProfile
