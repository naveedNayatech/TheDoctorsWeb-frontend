import React, {useState, useEffect, Fragment} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getPatients, updatePatientConsentStatus, searchPatient, patientDeActivate, patientActivate } from '../../actions/adminActions';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import {Badge, Table, Modal } from 'react-bootstrap';
import moment from 'moment';
import Pagination from 'react-js-pagination';
import {UPDATE_PATIENT_RESET} from '../../constants/adminConstants';


const PatientsList = () => {

    const dispatch = useDispatch();

    const [smShow, setSmShow] = useState(false); //small confirm modal
    const [patientModel, setPatientModel] = useState(null);
    const [patientToDelete, setPatientToDelete] = useState(null);

    const alert = useAlert();
    const { loading, error, patients, isUpdated} = useSelector(state => state.admin);
    const { totalPatients } = useSelector(state => state.adminStat);
    const [keyword, setKeyword] = useState('');
    const [isSearch, setIsSearch] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [resPerPage, setResPerPage] = useState(10);
        
    useEffect(() =>{
        if(error){
            return alert.error(error);
        }

        if(isUpdated){
            alert.success('Status Changed');
            dispatch({type: UPDATE_PATIENT_RESET});
            dispatch(getPatients(resPerPage, currentPage));
            setSmShow(false);
        }
        dispatch(getPatients(resPerPage, currentPage));

    }, [dispatch, alert, error, isUpdated, currentPage])

    
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

    const deActivatePatient = () => {
        dispatch(patientDeActivate(patientModel));
    }

    const activatePatient = () => {
        dispatch(patientActivate(patientModel))
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
                            <Table striped hover bordered>
                            <thead align="center">
                                <tr>
                                <th>Name</th>
                                <th>DOB </th>
                                <th>Email</th>
                                <th>Acc Status</th>
                                <th>Phy. Status</th>
                                <th>Consent Status</th>
                                <th>ACTION</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {patients && patients.length > 0 ? <Fragment> 
                                    {patients && patients.map((patient, index) => (
                                    <tr key={index}>  
                                    <td><Link to={{ pathname: "/patientProfile", state: {patientid: patient?._id }}}>{patient?.title} {patient?.firstname} {patient?.lastname} <p>{patient?.phone1}</p></Link></td>
                                    <td> {moment(patient?.DOB).format("ll")} <p><Badge bg="dark text-white">{patient?.gender}</Badge></p></td> 
                                    <td style={{wordWrap: 'break-word'}}>{patient?.email}</td>
                                    {patient?.block === false ? <td>
                                        <i className='bx bxs-circle' style={{color: 'green'}}></i> <p style={{color: 'green'}}>Activated</p>
                                        </td> : <td><i class='bx bxs-circle'style={{color: 'red'}}></i> <p style={{color: 'red'}}>De-Activated</p></td>}
                                    <td>{patient?.assigned_doctor_id ? <Badge bg="info text-white" className="assigned-tag">Assigned</Badge> : <Badge bg="danger text-white" className="not-assigned-tag">Not Assigned</Badge>}</td>
                                    
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
                                    <Link className="rounded-button-edit" to={{pathname: '/Patients/Edit', state: {patientDetails: patient}}}><i className='bx bx-edit-alt'></i></Link>
                                    
                                    {patient?.block === false ? <Link className="rounded-button-delete" to="/patients" onClick={() => {setSmShow(true); setPatientModel(patient?._id); setPatientToDelete(patient?.lastname)}}><i className='bx bx-lock-alt'></i></Link> 
                                    : 
                                    <Link>
                                    <Link className="rounded-button-activate" to="/patients" onClick={() => {setSmShow(true); setPatientModel(patient?._id); setPatientToDelete(patient?.lastname)}}><i className='bx bx-lock-open'></i></Link>
                                    </Link> }
                                    </td>
                                </tr>    
                                ))}
                                </Fragment> : <div>
                                    <small className="not-found-text">Patients Not Found</small>
                                </div> }
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

                                <Modal
                                    size="sm"
                                    show={smShow}
                                    onHide={() => setSmShow(false)}
                                    aria-labelledby="example-modal-sizes-title-sm"
                                >
                                    <Modal.Body>
                                        <small style={{color: 'gray'}}>Are you sure you want to activate / de-activate 
                                            <span style={{color: '#000'}}> {patientToDelete}</span> ?
                                        </small>
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <button className="btn btn-sm btn-success" onClick={activatePatient}>Activate</button>
                                        <button className="btn btn-sm btn-danger" onClick={deActivatePatient}>De-Activate</button>
                                    </Modal.Footer>
                                </Modal>  
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
