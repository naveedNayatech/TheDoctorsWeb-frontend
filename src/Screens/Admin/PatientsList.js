import React, {useState, useEffect, Fragment} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getPatients, updatePatientConsentStatus, searchPatient } from '../../actions/adminActions';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import {Badge, Table } from 'react-bootstrap';
import moment from 'moment';
import Pagination from 'react-js-pagination';

const PatientsList = () => {

    const dispatch = useDispatch();

    const alert = useAlert();
    const { loading, error, patients} = useSelector(state => state.admin);
    const { totalPatients } = useSelector(state => state.adminStat);
    const [keyword, setKeyword] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [resPerPage, setResPerPage] = useState(10);
        
    useEffect(() =>{
        if(error){
            return alert.error(error);
        }
        dispatch(getPatients(resPerPage, currentPage));

    }, [dispatch, alert, error, currentPage])

    
    const getPatientsList = () => {
       dispatch(getPatients(resPerPage, currentPage));
    }

    const changeConsentStatus = (id) => {
        dispatch(updatePatientConsentStatus(id));
        getPatientsList(resPerPage, currentPage);
        alert.success('Status Changed');
    }

    function setCurrentPageNumber(pageNumber) {
        setCurrentPage(pageNumber);
    }

    const searchhandler = (searchValue) => {
        if (searchValue === undefined || searchValue === "") {
            getPatientsList(resPerPage, currentPage);
            setIsSearch(false)

        }
        else {
            setIsSearch(true);
            dispatch(searchPatient(searchValue));
        }
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
                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded-card" style={{backgroundColor: '#FAFAFA'}}>
                    <div className="home-content">
                        
                    <div className="row list-box-header">
                            <div className="col-md-9">
                                
                            </div>

                            
                            <Link to="adminDashboard" className="go-back-btn"><i class='bx bx-arrow-back' ></i></Link> &nbsp;
                            <button className="btn refresh-btn"><i class='bx bx-refresh'></i></button> &nbsp;
                            <Link to="/addpatient" className="add-staff-btn">Add New Patient</Link>
                                                        
                        </div>

                        <div className="row">
                            <div className="col-md-9">
                                <h5 className="pt-2 mt-2">Patients List <span style={{color: '#F95800'}}>( {totalPatients && totalPatients < 10 ? '0'+totalPatients : totalPatients} )</span></h5>
                            </div>
                             
                            <div className="col-md-2">
                                <div style={{width: 200}}>
                                    <input type="text" 
                                    name="search patient" 
                                    className="form-control shadow-none" 
                                    placeholder="Search patient..." 
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    onBlur={(e) => {searchhandler(e.target.value)}}
                                    style={{outline: 'none'}}
                                    />
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
                            <small style={{color: 'gray'}}>Showing {resPerPage} records per page</small> 

                            {/* Pagination */}
                                {!isSearch && resPerPage <= totalPatients && (
                                    <div className="d-flex justify-content-center mt-5"> 
                                    <Pagination activePage={currentPage} 
                                    itemsCountPerPage={resPerPage} 
                                    totalItemsCount = {totalPatients}
                                    onChange={setCurrentPageNumber} 
                                    nextPageText = {'⟩'}
                                    prevPageText = {'⟨'}
                                    firstPageText = {'«'}
                                    lastPageText = {'»'}
                                    itemClass='page-item'
                                    linkClass="page-link"
                                    />           
                            </div>
                                )}      
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
