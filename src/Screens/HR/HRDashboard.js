import React, {Fragment, useEffect} from 'react'
import MetaData from '../../layouts/MetaData';
import  HRSidebar from '../../components/HR/HRSidebar';
import HRPieGraph from '../../components/HR/HRPieGraph';
import HRTopBar from '../../components/HR/HRTopbar';
import { useDispatch, useSelector } from 'react-redux';
import { getHRPatients } from '../../actions/HRActions';
import folderImg from '../../assets/Images/folder.png';
import { Link } from 'react-router-dom';
import { Badge, Table } from 'react-bootstrap';
import Loader from '../../layouts/Loader';
import { useAlert } from 'react-alert';
import moment from 'moment';

const StaffDashboard = (props) => {

    const { loading, hr, isAuthenticated} = useSelector(state => state.hrAuth);
    const {  error, hrpatients} = useSelector(state => state.hrPatients);

    const dispatch = useDispatch();
    const alert = useAlert();
    let id = hr._id;

    
    useEffect(() => {
		if(error) {
			alert.error("/hrLogin");
		}

        dispatch(getHRPatients(id));
	}, [dispatch, isAuthenticated])

    return (
        <Fragment>
            <MetaData title="HR Dashboard" />
            <HRSidebar />
            
            <section className="home-section">
                {/* TopBar */}  
                <HRTopBar />


                <div className="home-content">
                <div className="overview-boxes">
                    <div className="box staff-box0">
                        <div className="left-side">
                            <div className="box_topic">My Patients</div>
                            <div className="number">{hrpatients && hrpatients.length}</div>
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
                    <HRPieGraph />
                </div>
            </div>
            <div>
            <br />

            {loading ? <Loader /> : <Fragment>
                    <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
                        <div className="home-content">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h5 className="pt-2 mt-2">My Patients ({hrpatients && hrpatients.length}) </h5> 
                                        <hr />
                                    </div>
                                </div> 
                                
                                {hrpatients?.length > 0 ? (<Fragment>
                                <div className="col-md-12">
                                    <Fragment>
                                        <Table className="table table-sm table-striped">
                                        <thead align="center">
                                            <tr>
                                            <th>Name</th>
                                            <th>Contact No </th>
                                            <th>Email</th>
                                            <th>Phy. Status</th>
                                            <th>Role</th>
                                            <th>Patient Of</th>
                                            <th>Devices Assigned</th>
                                            <th>ACTION</th> 
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {hrpatients && hrpatients.map((patient, index) => ( 
                                            <tr key={index}>
                                            <td><Link to={{ pathname: "/hrPatientProfile", state: {patientid: patient?._id }}}>{patient?.title} {patient?.firstname} {patient?.lastname} <p style={{color: 'gray'}}>{moment(patient?.DOB).format("ll")}</p></Link></td>
                                            <td>{patient?.phone1} <p>(English)</p></td> 
                                            <td>{patient?.email}</td>
                                            <td>{patient?.assigned_doctor_id ? <Badge bg="info text-white" className="assigned-tag">Assigned</Badge> : <Badge bg="danger text-white" className="not-assigned-tag">Not Assigned</Badge>}</td>
                                            <td>{patient?.role}</td>
                                            {patient?.assigned_doctor_id ? <td style={{backgroundColor:'#D3D3D3'}}> {patient?.assigned_doctor_id.firstname} {patient?.assigned_doctor_id.lastname}</td> : 'N/A' }
                                            {patient?.assigned_devices ? <td>{patient?.assigned_devices.length}</td> : 'No Device Assigend'}
                                            <td>
                                            <Link to={{ pathname: "/hrPatientProfile", state: {patientid: patient?._id}}} className="rounded-button-profile"><i className='bx bx-user'></i></Link> &nbsp;
                                                {/* <Link to={{ pathname: "/staffPatients", state: {id: hrpatients ?._id}}} className="rounded-button-edit"><i className='bx bx-edit-alt'></i></Link> &nbsp; */}
                                                {/* <Link to="/staffPatients" className="rounded-button-delete"><i className='bx bxs-user-minus'></i></Link> &nbsp; */}
                                            </td>
                                        </tr> 
                                        
                                        ))}
                                        
                                        </tbody>
                                        </Table>    
                                    </Fragment>                      
                            </div>
                        </Fragment> ) : <Fragment>
                        <div>   
                                           
                        <img src={folderImg} className="no-record-found-img"/>
                        <p className="doctor-specilizations">No Patient Assigned Yet...</p>                            
                                    </div>
                                </Fragment> }
                            </div>
                        </div>
                    </div>
                </Fragment>
                    }
            
            
            </div>                
        </section>
    </Fragment>
    )
}

export default StaffDashboard;
