import React, { useEffect, Fragment } from 'react';
import MetaData from '../../layouts/MetaData';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import { doctorProfile } from '../../actions/adminActions';
import doctorProfileImg from '../../assets/Images/doctorprofile.jpg';
import folderImg from '../../assets/Images/folder.png';
import Loader from '../../layouts/Loader';
import { useAlert } from 'react-alert';
import moment from 'moment';
import { Link } from 'react-router-dom';

const DoctorProfile = (props) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    let id = props?.location?.state?.id;

    
    const { loading, error, doctor, docpatients} = useSelector(state => state.doctorProfile);


    useEffect(() => {
        if(error){
            return alert.error(error);
        }

        dispatch(doctorProfile(id));
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
                             <div className="col-md-8">
                                <h5 className="pt-2 mt-2">Doctor Details  </h5> 
                             </div>

                             <div className="col-md-4">
                                 <Link to={{ pathname: "/assigndoctor", state: {id: doctor?._id, firstName: doctor?.firstname, lastName: doctor?.lastname}}} className="btn btn-info mt-2">Assign Patient to Dr. {doctor?.firstname}</Link>
                             </div>
                         </div>   

                         <hr />
                        

                        {doctor && <Fragment>
                            <div className="row">
                            <div className="col-md-4">
                                <div>
                                    <img src={doctor?.avatar?.url ? doctor?.avatar?.url : doctorProfileImg} className="img-responsive profile-card-img"/>
                                        
                                    <p className="profile-name">{doctor?.title}. {doctor?.firstname} {doctor?.lastname} </p>
                                    
                                    
                                    {doctor.specialization && doctor?.specialization.map((spec, index) => (
                                        
                                            <Fragment key={spec?._id}>
                                                <p className="doctor-specilizations">{spec?.fieldname }</p>
                                                <br />
                                            </Fragment>
                        
                                    ))}
                                </div>
                            </div>

                            <div className="col-md-8">
                                <div>
                                    <div className="card-inner-margin">
                                        <div className="row">
                                            <div className="col-md-6">
                                            <span className="profile-label">Email: </span>
                                                <p className="profile-value-text">{doctor?.email}</p>

                                                <span className="profile-label">Gender: </span>
                                                <p className="profile-value-text">{doctor?.gender}</p>

                                                <span className="profile-label">Contact #: </span>
                                                <p className="profile-value-text">{doctor?.contactno ? doctor?.contactno : 'N/A'}</p>

                                                <span className="profile-label">Phone # 1: </span>
                                                <p className="profile-value-text">{doctor?.phone1 !== '' ? doctor?.phone1 : 'N/A'}</p>
                                            </div>


                                            <div className="col-md-6">
                                            <span className="profile-label">Phone # 2: </span>
                                                <p className="profile-value-text"> {doctor?.phone2 !== '' ? doctor?.phone2 : 'N/A'} </p>

                                                <span className="profile-label">License #: </span>
                                                <p className="profile-value-text">{doctor?.npinumber}</p>

                                                <span className="profile-label">NPI #: </span>
                                                <p className="profile-value-text">{doctor?.licensenumber}</p>

                                                <span className="profile-label">Account Created Date: </span>
                                                <p className="profile-value-text">{moment(doctor?.createdAt).format("lll")}</p>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>    
                        
                        
                        {/* Patient List Card */}
                        {docpatients?.length > 0 ? (<Fragment>
                            <h5 className="pt-2 mt-2">Patient's List ({docpatients && docpatients.length})</h5> 
                            <hr />

                                <div className="col-md-12">
                                    <Fragment>
                                        <table className="table table-sm table-striped">
                                        <thead align="center">
                                            <th>REG </th>  
                                            <th>NAME</th>
                                            <th>EMAIL</th>
                                            <th>GENDER </th>
                                            <th>CONTACT NO</th>
                                            <th>PREFERRED LANGUAGE</th>
                                            <th>ACTION</th> 
                                        </thead>
                                        <tbody>
                                        {docpatients && docpatients.map((patient, index) => ( 
                                            <tr align="center" key={doctor?._id}>
                                            <td style={{fontWeight: 'bold'}}>{index + 1}</td>
                                            <td><Link to={{ pathname: "/patientProfile", state: {patientid: patient?._id}}}>{patient?.firstname} {patient?.lastname}</Link></td>
                                            <td>{patient?.email}</td>
                                            {patient?.gender === 'Male' ? <td className="male-tag"> <i className='bx bx-male'></i> {patient?.gender}</td> : <td className="female-tag"> <i className='bx bx-female'></i> {patient?.gender}</td>}
                                            <td>{patient?.contactno}</td>
                                            <td>{patient?.preferredlanguage}</td>
                                            <td>
                                            <Link to={{ pathname: "/patientProfile", state: {patientid: patient?._id}}} className="rounded-button-profile"><i className='bx bx-user'></i></Link> &nbsp;
                                                <Link to={{ pathname: "/editDoctor", state: {id: doctor?._id}}} className="rounded-button-edit"><i className='bx bx-edit-alt'></i></Link> &nbsp;
                                                <Link className="rounded-button-delete"><i className='bx bxs-user-minus'></i></Link> &nbsp;
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
                            <hr />
                                           
                                <img src={folderImg} className="no-record-found-img"/>
                                <p className="doctor-specilizations">No Patient Assigned Yet...</p>
                            
                             
                        </div>
                        </Fragment> }                
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
