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
        console.log('id is ' + id);
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
                                            <td><Link to={{ pathname: "/staffPatientProfile", state: {patientid: patient?._id, deviceid: patient?.deviceassigned?.deviceid}}}>{patient?.title} {patient?.firstname} {patient?.lastname} <p style={{color: 'gray'}}>09/22/1975</p></Link></td>
                                            <td>{patient?.contactno} <p>(English)</p></td>
                                            <td>{patient?.email}</td>
                                            <td>{patient?.doctorid === null ? <Badge bg="danger text-white" className="not-assigned-tag">Not Assigned</Badge> : <Badge bg="info text-white" className="assigned-tag">Assigned</Badge>}</td>
                                            <td>{patient?.insurancecompany.map((insurance, index) => ( <p key={index} className="insurance-companies-table">{insurance.companyname} </p>))}</td>
                                            <td>{patient?.rpmconsent === true ? <div><i className='bx bx-pen signed-icon'></i><p>Signed</p></div> : <div><i className='bx bxs-pencil not-signed-icon'></i><p>Not Signed</p></div>}</td>
                                            <td>
                                            <Link to={{ pathname: "/staffPatientProfile", state: {patientid: patient?._id}}} className="rounded-button-profile"><i className='bx bx-user'></i></Link> &nbsp;
                                                {/* <Link to={{ pathname: "/staffPatients", state: {id: doctor?._id}}} className="rounded-button-edit"><i className='bx bx-edit-alt'></i></Link> &nbsp; */}
                                                <Link to="/staffPatients" className="rounded-button-delete"><i className='bx bxs-user-minus'></i></Link> &nbsp;
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
