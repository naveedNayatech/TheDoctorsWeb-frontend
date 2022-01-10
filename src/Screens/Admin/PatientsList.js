import React, {useEffect, Fragment} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getPatients } from '../../actions/adminActions';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import {Badge, Table } from 'react-bootstrap';

const PatientsList = () => {

    const dispatch = useDispatch();

    const alert = useAlert();
    const { loading, error, patientCount, patients} = useSelector(state => state.admin)
        
    useEffect(() =>{
        if(error){
            return alert.error(error);
        }

        dispatch(getPatients());

    }, [dispatch, alert, error])

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
                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded">
                    <div className="home-content">
                        
                    <div className="row list-box-header">
                            <div className="col-md-9">
                                
                            </div>

                            
                            <Link to="adminDashboard" className="go-back-btn"><i class='bx bx-arrow-back' ></i></Link> &nbsp;
                            <button className="btn refresh-btn"><i class='bx bx-refresh'></i></button> &nbsp;
                            <Link to="/adddoctor" className="add-staff-btn">Enroll New Patient</Link>
                                                        
                        </div>

                        <div className="row">
                            <div className="col-md-7">
                                <h5 className="pt-2 mt-2">Patients List ( {patientCount && patientCount} )</h5>
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
                                <th>Name</th>
                                <th>Contact No </th>
                                <th>Email</th>
                                <th>Phy. Status</th>
                                <th>Insurance Company</th>
                                <th>Consent Status</th>
                                <th>ACTION</th> 
                            </thead>
                            <tbody>
                                {patients && patients.map((patient, index) => (
                                    <tr key={index}>  
                                    <td><Link to={{ pathname: "/patientProfile", state: {patientid: patient?._id, deviceid: patient?.deviceid}}}>{patient?.title} {patient?.firstname} {patient?.lastname} <p style={{color: 'gray'}}>09/22/1975</p></Link></td>
                                    <td>{patient?.contactno} <p>(English)</p></td>
                                    <td>{patient?.email}</td>
                                    <td>{patient?.doctorid === null ? <Badge bg="danger text-white" className="not-assigned-tag">Not Assigned</Badge> : <Badge bg="info text-white" className="assigned-tag">Assigned</Badge>}</td>
                                    <td>{patient?.insurancecompany.map((insurance, index) => ( <p key={index} className="insurance-companies-table">{insurance.companyname} </p>))}</td>
                                    <td>{patient?.rpmconsent === true ? <div><i className='bx bx-pen signed-icon'></i><p>Signed</p></div> : <div><i className='bx bxs-pencil not-signed-icon'></i><p>Not Signed</p></div>}</td>
                                    <td><Link to={{ pathname: "/patientProfile", state: {patientid: patient?._id, deviceid: patient?.deviceid}}} className="rounded-button-profile"><i className='bx bx-user'></i></Link>
                                    <Link disabled className="rounded-button-edit" to="/patients"><i className='bx bx-edit-alt'></i></Link>
                                    <Link className="rounded-button-delete" to="/patients"><i className='bx bxs-user-minus'></i></Link>
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
