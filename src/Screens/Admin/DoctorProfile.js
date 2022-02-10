import React, { useEffect, Fragment } from 'react';
import MetaData from '../../layouts/MetaData';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { doctorProfile, getDoctorPatients } from '../../actions/adminActions';
import doctorProfileImg from '../../assets/Images/doctorprofile.jpg';
import folderImg from '../../assets/Images/folder.png';
import Loader from '../../layouts/Loader';
import { useAlert } from 'react-alert';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {Badge} from 'react-bootstrap';

const DoctorProfile = (props) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    let docId = props?.location?.state?.id;

    
    const { loading, error, doctor } = useSelector(state => state.doctorProfile);
    const { doctorpatients } = useSelector(state => state.docPatients);


    useEffect(() => {
        if(error){
            return alert.error(error);
        }
        
        dispatch(doctorProfile(docId));
        dispatch(getDoctorPatients(docId));
    }, [dispatch, alert, error]);


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
                         <div className="row">
                             <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                                <h5 className="pt-2 mt-2">Doctor <span style={{color: '#F95800'}}> Details </span></h5> 
                             </div>

                             <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                 <Link to={{ pathname: "/assigndoctor", state: {id: doctor?._id, firstName: doctor?.firstname, lastName: doctor?.lastname}}} 
                                 className="add-staff-btn mt-2">Assign Patient to Dr. {doctor?.lastname}
                                 </Link>
                             </div>
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
                                            <p className="profile-value-text">{doctor?.email}</p>

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
                        
                        
                        {/* Patient List Card */}


                        {/* paste patients list fragment here */}
                        {doctorpatients && doctorpatients?.length > 0 ? (<Fragment>
                            <h5 className="pt-2 mt-2">Patient's List <span style={{color: '#F95800'}}>({doctorpatients && doctorpatients.length < 10 ? '0'+doctorpatients.length : doctorpatients.length})</span></h5> 
                            <hr className="blue-hr"/>

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
                                            <td><Link to={{ pathname: "/patientProfile", state: {patientid: patient?._id, deviceid: patient?.deviceassigned?.deviceid}}}>{patient?.title} {patient?.firstname} {patient?.lastname} <p style={{color: 'gray'}}>09/22/1975</p></Link></td>
                                            <td>{patient?.phone1} <p>(English)</p></td>
                                            <td>{patient?.email}</td>
                                            <td>{patient?.doctorid === null ? <Badge bg="danger text-white" className="not-assigned-tag">Not Assigned</Badge> : <Badge bg="info text-white" className="assigned-tag">Assigned</Badge>}</td>
                                            <td>{patient?.insurancecompany ? patient?.insurancecompany : 'N/A'}</td> 
                                            <td>{patient?.rpmconsent === true ? 'Signed' : 'Not Signed'}</td>
                                            <td>
                                            <Link to={{ pathname: "/patientProfile", state: {patientid: patient?._id}}} className="rounded-button-profile"><i className='bx bx-user'></i></Link> &nbsp;
                                                {/* <Link to={{ pathname: "/editDoctor", state: {id: doctor?._id}}} className="rounded-button-edit"><i className='bx bx-edit-alt'></i></Link> &nbsp; */}
                                                {/* <Link to="/#" className="rounded-button-delete"><i className='bx bxs-user-minus'></i></Link> &nbsp; */}
                                            </td>
                                        </tr> 
                                        
                                        ))}
                                        
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
        </Fragment>
    )
}

export default DoctorProfile
