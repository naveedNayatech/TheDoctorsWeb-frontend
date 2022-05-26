import React, {useState, useEffect, Fragment} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import defaultImg from '../../assets/Images/defaultUser.png';
import moment from 'moment';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getHRPatients } from '../../actions/HRActions';
import { removePatientsHR, removeDoctorFromHR } from '../../actions/adminActions';
import { useAlert } from 'react-alert';
import folderImg from '../../assets/Images/folder.png';
import {Badge, Table, Modal } from 'react-bootstrap';


const HRProfile = (props, history) => {

  const dispatch = useDispatch();
  const alert = useAlert();

  let hrInfo = props?.location?.state?.hr;
  let doctor = props?.location?.state?.hr?.assigned_doctor_id;
  let id = hrInfo?._id;


  const [smShow, setSmShow] = useState(false); //small confirm modal.
  const [patientName, setPatientName] = useState(""); //patient name to show in modal.
  const [patientToRemove, setpatientToRemove] = useState(""); //set patient id to remove.
  const [hrId, setHrId] = useState(id); 
  const [doctorDetails, setDoctorDetails] = useState(doctor); 
  const [hrDetails, setHrDetails] = useState(hrInfo);
  const [sort, setSort] = useState(true);
  const [query, setQuery] = useState("");
  const keys = ["firstname", "lastname", "DOB", "email", "phone1"];

  const { hrpatients} = useSelector(state => state.hrPatients);
  const {error, message} = useSelector(state => state.common);

  useEffect(() => {
    if(message){
        alert.success(message);
    }

    if(error){
        alert.error(error)
    }


    dispatch(getHRPatients(hrId));

  },[dispatch, alert, error, message])


  const removePatient = () => {
    dispatch(removePatientsHR(patientToRemove));
    setSmShow(false);
    }

  const removeDoctor = () => {
      dispatch(removeDoctorFromHR(hrId, doctor._id))
      setDoctorDetails("");
  }

  return <Fragment>
      <MetaData title="HR Profile"/>
        <Sidebar />    

        <section className="home-section">
        {/* TopBar */}
        <TopBar />

        <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded">
            <div className="home-content">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-6 col-md-8 col-sm-12 col-xs-12">
                        <h5 className="pt-2 mt-2">HR <span style={{color: '#ed1b24'}}> Profile </span></h5> 
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                        {hrDetails?.assigned_doctor_id ? ' ' : <>
                            <Link to={{ pathname: "/assignDrToHr", state: {id: hrDetails}}} 
                                className="add-staff-btn mt-2">Assign Doctor to Hr. {hrDetails?.lastname}
                            </Link>
                        </>}
                    </div>

                    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                        <Link to={{ pathname: "/assignPatientToHr", state: {id: hrDetails}}} 
                            className="add-staff-btn mt-2">Assign patient to Hr. {hrDetails?.lastname}
                        </Link>
                    </div>
                    
                    </div>
                    <hr />

                        <div className="row">
                            <div className="col-md-3">
                                <div>
                                    <img src={defaultImg} className="img-responsive profile-card-img"/>     
                                    <p className="profile-name">{hrDetails?.firstname} {hrDetails?.lastname} </p>
                                    <p className="profile-value-text text-center">{moment(hrDetails?.createdAt).format("lll")}</p>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div>
                                    <div className="card-inner-margin">
                                        <div className="row">
                                        <div className="col-md-6">
                                            <span className="profile-label">Email: </span>
                                            <p className="profile-value-text" style={{wordWrap: 'break-word'}}>{hrDetails?.email}</p>

                                            <span className="profile-label">Gender: </span>
                                            <p className="profile-value-text">{hrDetails?.gender}</p>                            
                                            
                                            <span className="profile-label">Mobile No: </span>
                                            <p className="profile-value-text">{hrDetails?.mobileNo ? <span style={{color: 'dodgerblue'}}><i className='bx bx-phone'></i> {hrInfo?.mobileNo} </span> : 'N/A'}</p>
                                            </div>


                                            <div className="col-md-6">
                                                <span className="profile-label">DOB : </span>
                                                <p className="profile-value-text">{moment(hrDetails?.DOB).format("ll")}</p>

                                                <span className="profile-label">Phone 1: </span>
                                                <p className="profile-value-text">{hrDetails?.phone1 ? <span style={{color: 'dodgerblue'}}><i className='bx bx-phone'></i> {hrDetails?.phone1} </span> : 'N/A'}</p>                                            
                                            </div>

                                            <div className="col-md-4">
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <h5 className="text-cemter">Assigned <span style={{color: '#ed1b24'}}> Doctor Details </span></h5> 
                                {doctorDetails ? doctorDetails && <>
                                    <div>
                                    <img src={defaultImg} className="img-responsive profile-card-img"/>
                                    <p className="profile-name">Dr. {doctorDetails?.firstname} {doctorDetails?.lastname} </p>
                                    <p className="profile-value-text text-center">{doctorDetails?.email}</p>
                                    <p className="profile-value-text text-center">{doctorDetails?.phone1 ? <span style={{color: 'dodgerblue'}}><i className='bx bx-phone'></i> {doctorDetails?.phone1} </span> : 'N/A'}</p>
                                    <button className="btn btn-danger ml-5" onClick={removeDoctor}>Remove Doctor</button>
                                    </div>
                                    </> : <small style={{color: 'gray'}}>No doctor assigned yet</small>}
                            </div>
                        </div>  

                        <br/><br/>  
                        {/* HRs Patients List */}
                        <div className="row-display">
                        <h5 className="text-cemter">Patients <span style={{color: '#F95800'}}> List ( {hrpatients?.length} )</span></h5> 
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
                        <hr />
                        
                        {hrpatients?.length > 0 ? (<>
                                <div className="col-md-12">
                                    <>
                                        <Table striped hover bordered>
                                        <thead align="center">
                                            <tr>
                                            <th>Name</th>
                                            <th>DOB </th>
                                            <th>Email</th>
                                            <th>Acc Status</th>
                                            <th>Physician</th>
                                            <th>Devices Assigned</th>
                                            <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {sort ? <>
                                        {hrpatients && hrpatients.filter(item => keys.some(key => item[key].toLowerCase().includes(query))).map((patient, index) => ( 
                                            <tr key={index}>
                                            
                                            <td>
                                                <Link to={{ pathname: "/hrPatientProfile", state: {patientid: patient?._id }}}>
                                                    {patient?.firstname} {patient?.lastname} 
                                                    <p>{patient?.phone1}</p>
                                                </Link>
                                            </td>

                                            <td> {moment(patient?.DOB).format("ll")} <p><Badge bg="dark text-white">{patient?.gender}</Badge></p></td>
                                            
                                            <td style={{wordWrap: 'break-word'}}>{patient?.email}</td>
                                            
                                            {patient?.block === false ? <td>
                                                <i className='bx bxs-circle' style={{color: 'green'}}></i> <p style={{color: 'green'}}>Activated</p>
                                                </td> : <td><i className='bx bxs-circle'style={{color: 'red'}}></i> <p style={{color: 'red'}}>De-Activated</p>
                                            </td>}


                                            {patient?.assigned_doctor_id ? <td style={{backgroundColor:'#007673', color: '#FFF'}}> Dr. {patient?.assigned_doctor_id.firstname} {patient?.assigned_doctor_id.lastname}</td> : 'N/A' }
                                            {patient?.assigned_devices ? <td>0{patient?.assigned_devices.length}</td> : 'No Device Assigend'}
                                            
                                            <td>
                                                <Link to="/hrProfile" className="rounded-button-delete" 
                                                    onClick={() => {setSmShow(true); setPatientName(patient?.lastname); setpatientToRemove(patient?._id)}}>
                                                <i className="bx bx-trash" ></i></Link> &nbsp;
                                            </td>
                                        </tr> 
                                        
                                        ))}
                                        </> : <>
                                        {hrpatients && hrpatients.reverse().filter(item => keys.some(key => item[key].toLowerCase().includes(query))).map((patient, index) => ( 
                                            <tr key={index}>
                                            
                                            <td>
                                                <Link to={{ pathname: "/hrPatientProfile", state: {patientid: patient?._id }}}>
                                                    {patient?.firstname} {patient?.lastname} 
                                                    <p>{patient?.phone1}</p>
                                                </Link>
                                            </td>

                                            <td> {moment(patient?.DOB).format("ll")} <p><Badge bg="dark text-white">{patient?.gender}</Badge></p></td>
                                            
                                            <td style={{wordWrap: 'break-word'}}>{patient?.email}</td>
                                            
                                            {patient?.block === false ? <td>
                                                <i className='bx bxs-circle' style={{color: 'green'}}></i> <p style={{color: 'green'}}>Activated</p>
                                                </td> : <td><i className='bx bxs-circle'style={{color: 'red'}}></i> <p style={{color: 'red'}}>De-Activated</p>
                                            </td>}


                                            {patient?.assigned_doctor_id ? <td style={{backgroundColor:'#007673', color: '#FFF'}}> Dr. {patient?.assigned_doctor_id.firstname} {patient?.assigned_doctor_id.lastname}</td> : 'N/A' }
                                            {patient?.assigned_devices ? <td>0{patient?.assigned_devices.length}</td> : 'No Device Assigend'}
                                            
                                            <td>
                                                <Link to="/hrProfile" className="rounded-button-delete" 
                                                    onClick={() => {setSmShow(true); setPatientName(patient?.lastname); setpatientToRemove(patient?._id)}}>
                                                <i className="bx bx-trash" ></i></Link> &nbsp;
                                            </td>
                                        </tr> 
                                        
                                        ))}

                                        </> }
                                        
                                        </tbody>
                                        </Table>    
                                    </>                      
                            </div>
                        </> ) : <>
                        <div>   
                                           
                        <img src={folderImg} className="no-record-found-img"/>
                        <p className="doctor-specilizations">No Patient Assigned Yet...</p>                            
                                    </div>
                                </> }
                      </div>
                    </div>
                </div>
       </section>

       {/* Modal to delete HR Patient */}
       <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Body>
                <small style={{color: '#303030'}}>Are you sure you want to remove patient 
                        <span style={{color: '#303030', fontWeight: 'bold'}}> {patientName}</span> from hr ?
                </small>
            </Modal.Body>

            <Modal.Footer>
                <button className="btn btn-sm btn-danger" onClick={removePatient}>Remove</button>
            </Modal.Footer>
            </Modal> 
        </Fragment>;
};

export default HRProfile;
