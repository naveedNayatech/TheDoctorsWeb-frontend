import React, { useEffect, Fragment } from 'react';
import MetaData from '../../layouts/MetaData';
import  HRSidebar from '../../components/HR/HRSidebar';
import HRTopBar from '../../components/HR/HRTopbar';
import { getHRPatients } from '../../actions/HRActions';
import { useSelector, useDispatch } from 'react-redux';
import folderImg from '../../assets/Images/folder.png';
import Loader from '../../layouts/Loader';
import { Link } from 'react-router-dom';
import { Table, Badge } from 'react-bootstrap';
import moment from 'moment';
import { useAlert} from 'react-alert';



const HRPatientsList = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, hr} = useSelector(state => state.hrAuth);
    const { loading, error, hrpatients} = useSelector(state => state.hrPatients);

    let id = hr._id;


    useEffect(() => {
		if(error) {
			alert.error("/hrLogin");
		}

        dispatch(getHRPatients(id));
	}, [dispatch, isAuthenticated])

    useEffect(() => {
		if(error) {
			alert.error("/hrLogin");
		}

        dispatch(getHRPatients(id));
	}, [dispatch, isAuthenticated])


  return <Fragment>
      <MetaData title="Patients List" />
            <HRSidebar />
            
            <section className="home-section">
                {/* TopBar */}  
                <HRTopBar />


                {loading ? <Loader /> : <Fragment>
                    <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
                        <div className="home-content">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-9">
                                        <h5 className="pt-2 mt-2">My Patients ({hrpatients && hrpatients.length}) </h5> 
                    
                                    </div>

                                    <div className="col-md-3">
                                         <Link to="/Hr/AddPatient" className="add-staff-btn">Enroll New Patient</Link> 
                                    </div>
                                </div> 
                                <hr />
                                
                                {hrpatients?.length > 0 ? (<Fragment>
                                <div className="container-fluid col-md-12">
                                    <Fragment>
                                        <Table striped hover bordered>
                                        <thead align="center">
                                            <tr>
                                            <th>Name</th>
                                            <th>DOB </th>
                                            <th>Email</th>
                                            <th>Acc Status</th>
                                            <th>Physician</th>
                                            <th>Devices Assigned</th>
                                            <th>ACTION</th> 
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {hrpatients && hrpatients.map((patient, index) => ( 
                                            <tr key={index}>
                                            
                                            <td>
                                                <Link to={{ pathname: "/hrPatientProfile", state: {patientid: patient?._id }}}>{patient?.firstname} {patient?.lastname} <p>{patient?.phone1}</p></Link></td>
                                            
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
            </section>
  </Fragment>;
};

export default HRPatientsList;
