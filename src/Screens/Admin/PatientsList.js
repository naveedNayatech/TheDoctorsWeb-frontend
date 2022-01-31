import React, {useState, useEffect, Fragment} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getPatients, updatePatientConsentStatus } from '../../actions/adminActions';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import {Badge, Table } from 'react-bootstrap';
import moment from 'moment';

const PatientsList = () => {

    const dispatch = useDispatch();

    const alert = useAlert();
    const { loading, error, patients} = useSelector(state => state.admin);
    const [patientId, setPatientId] = useState('');
        
    useEffect(() =>{
        if(error){
            return alert.error(error);
        }

        dispatch(getPatients());

    }, [dispatch, alert, error])

    const changeConsentStatus = (id) => {
        console.log('patient Id is' + id);
        dispatch(updatePatientConsentStatus(id))
    }

    return (
        <Fragment>
                <MetaData title="Patients List"/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />

                {loading ? <Loader /> : (
                <Fragment>   
                {/*  patients List Filter Section */}
                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded" style={{backgroundColor: '#FAFAFA'}}>
                    <div className="home-content">
                        
                    <div className="row list-box-header">
                            <div className="col-md-9">
                                
                            </div>

                            
                            <Link to="adminDashboard" className="go-back-btn"><i class='bx bx-arrow-back' ></i></Link> &nbsp;
                            <button className="btn refresh-btn"><i class='bx bx-refresh'></i></button> &nbsp;
                            <Link to="/addpatient" className="add-staff-btn">Enroll New Patient</Link>
                                                        
                        </div>

                        <div className="row">
                            <div className="col-md-7">
                                <h5 className="pt-2 mt-2">Patients List <span style={{color: '#F95800'}}>( {patients && patients?.length < 10 ? '0'+patients?.length : patients?.length} )</span></h5>
                            </div>

                            <div className="col-md-2">
                                <select className="form-control" placeholder="Sort By" >
                                    <option selected disabled>Sort By</option>
                                    <option>Ascending Order</option>
                                    <option>Descending Order</option>
                                </select>
                            </div>
                             
                            <div className="col-md-2">
                                <div style={{width: 200}}>
                                    <input type="text" name="search patient" className="form-control" placeholder="Search patient..." />
                                </div>
                            </div>
                        
                        </div>
                    </div>  
                    <hr />
                    {/* Patient List Card */}
                        <div className="col-md-12">
                        {patients && <Fragment>
                            <Table striped hover>
                            <thead align="center">
                                <tr>
                                <th>Name</th>
                                <th>Contact No </th>
                                <th>Email</th>
                                <th>Phy. Status</th>
                                <th>Role</th>
                                <th>Consent Status</th>
                                <th>ACTION</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {patients && patients.map((patient, index) => (
                                    <tr key={index}>  
                                    <td><Link to={{ pathname: "/patientProfile", state: {patientid: patient?._id }}}>{patient?.title} {patient?.firstname} {patient?.lastname} <p style={{color: 'gray'}}>{moment(patient?.DOB).format("ll")}</p></Link></td>
                                    <td>{patient?.phone1} <p>(English)</p></td> 
                                    <td>{patient?.email}</td>
                                    <td>{patient?.assigned_doctor_id ? <Badge bg="info text-white" className="assigned-tag">Assigned</Badge> : <Badge bg="danger text-white" className="not-assigned-tag">Not Assigned</Badge>}</td>
                                    <td>{patient?.role}</td>
                                    {patient?.rpmconsent === true ? <td>
                                        <div className="custom-control custom-switch">
                                            <input 
                                                type="checkbox" 
                                                disabled
                                                className="custom-control-input" 
                                                checked="true"
                                                style={{border: 'none', backgroundColor: 'red'}}
                                            />
                                            <label className="custom-control-label" htmlFor={index}>Signed</label>
                                        </div>
                                    </td> : 
                                        <td>
                                        <div className="custom-control custom-switch">
                                            <input 
                                                type="checkbox" 
                                                className="custom-control-input" 
                                                id={index}
                                                onChange={() => changeConsentStatus(patient?._id)}
                                            />
                                            <label className="custom-control-label" htmlFor={index}>Not Signed</label>
                                        </div>
                                    </td>
                                    }
                                    
                                    <td><Link to={{ pathname: "/patientProfile", state: {patientid: patient?._id}}} className="rounded-button-profile"><i className='bx bx-user'></i></Link>
                                    {/* <Link disabled className="rounded-button-edit" to="/patients"><i className='bx bx-edit-alt'></i></Link> */}
                                    {/* <Link className="rounded-button-delete" to="/patients"><i className='bx bxs-user-minus'></i></Link> */}
                                    </td>
                                </tr>    
                                ))}
                            </tbody>
                            </Table>    
                        </Fragment>}                      
                        </div>
                    </div>
                </Fragment>
            )}
            </section>
        </Fragment>
    )
}

export default PatientsList
