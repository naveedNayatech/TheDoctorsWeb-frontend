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


                <div className="home-content">
                <div className="overview-boxes">
                    <div className="box staff-box0">
                        <div className="left-side">
                            <div className="box_topic">My Patients</div>
                            <div className="number">{doctorpatients && doctorpatients.length}</div>
                            <div className="indicator">
                                <i className="bx bx-up-arrow-alt"></i>
                                <span className="text">Up from Yesterday</span>
                            </div>
                        </div>
                        <i className="bx bx-user cart"></i>
                    </div>

                    <div className="box staff-box1">
                        <div className="left-side">
                            <div className="box_topic">Devices Assigned</div>
                            <div className="number">00</div>
                            <div className="indicator">
                                <i className="bx bx-up-arrow-alt"></i>
                                <span className="text">Up from Yesterday</span>
                            </div>
                        </div>
                        <i className="bx bx-devices cart two"></i>
                    </div>

                    <div className="box staff-box2">
                        <div className="left-side">
                            <div className="box_topic">Total Staff</div>
                            <div className="number">00</div>
                            <div className="indicator">
                                <i className="bx bx-up-arrow-alt"></i>
                                <span className="text">Up from Yesterday</span>
                            </div>
                        </div>
                        <i className="bx bx-user cart three"></i>
                    </div>

                    {/* Pie Graph */}
                    <StaffPieGraph />
                </div>
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
                                            <th>Gender</th>
                                            <th>Contact No </th>
                                            <th>Email</th>
                                            <th>Phy. Status</th>
                                            <th>Consent Status</th>
                                            <th>Action</th>
                                        </tr> 
                                        </thead>
                                        <tbody>
                                        {doctorpatients && doctorpatients.map((patient, index) => ( 
                                            <tr align="center" key={index}>
                                            <td><Link to={{ pathname: "/staffPatientProfile", state: {patientid: patient?._id, deviceid: patient?.deviceassigned?.deviceid}}}>{patient?.title} {patient?.firstname} {patient?.lastname} <p style={{color: 'gray'}}>09/22/1975</p></Link></td>
                                            <td>{patient?.phone1} <p>(English)</p></td>
                                            <td>{patient?.gender ? patient?.gender : 'N/A'}</td>
                                            <td>{patient?.email}</td>
                                            <td>{patient?.doctorid === null ? <Badge bg="danger text-white" className="not-assigned-tag">Not Assigned</Badge> : <Badge bg="info text-white" className="assigned-tag">Assigned</Badge>}</td> 
                                            <td>{patient?.rpmconsent === true ? 'Signed' : 'Not Signed'}</td>
                                            <td>
                                            <Link to={{ pathname: "/staffPatientProfile", state: {patientid: patient?._id}}} className="rounded-button-profile"><i className='bx bx-user'></i></Link> &nbsp;
                                                {/* <Link to={{ pathname: "/staffPatients", state: {id: doctor?._id}}} className="rounded-button-edit"><i className='bx bx-edit-alt'></i></Link> &nbsp; */}
                                                {/* <Link to="/staffPatients" className="rounded-button-delete"><i className='bx bxs-user-minus'></i></Link> &nbsp; */}
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

            </div>

             

                
            </section>

        </Fragment>
    )
}

export default StaffDashboard;
