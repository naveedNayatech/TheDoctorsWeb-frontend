import React, {useState, useEffect, Fragment} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { 
    getPatients, 
    updatePatientConsentStatus, 
    searchPatient, 
    patientDeActivate, 
    patientActivate, 
    getDoctors,
    getHrLists,
    getAdminStats,
    getDoctorsPatientList,
    getHrsPatientList
} from '../../actions/adminActions';
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
    const [doctorId, setDoctorId] = useState('');
    const [hrId, setHrId] = useState('');

    const alert = useAlert();
    const { loading, error, patients, isUpdated} = useSelector(state => state.admin);
    const { doctors } = useSelector(state => state.doctor);
    const { hrs} = useSelector(state => state.hrslist);
    const { totalPatients } = useSelector(state => state.adminStat);
    const [keyword, setKeyword] = useState('');
    const [searchBy ,setSearchBy] = useState('firstname');
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
        dispatch(getDoctors(resPerPage, currentPage));
        dispatch(getHrLists(resPerPage, currentPage));

    }, [dispatch, alert, error, isUpdated, currentPage]);


        const searchPatientByDoctor = (id) => {
            if(id === "undefined" || ''){
                dispatch(getPatients(resPerPage, currentPage));
                dispatch(getDoctors(resPerPage, currentPage));
                dispatch(getHrLists(resPerPage, currentPage));
                return
            }
            dispatch(getDoctorsPatientList(id));
        }


        const searchPatientByHR = (id) => {
            if(id === "undefined" || ''){
                dispatch(getPatients(resPerPage, currentPage));
                dispatch(getDoctors(resPerPage, currentPage));
                dispatch(getHrLists(resPerPage, currentPage));
                return
            }
            dispatch(getHrsPatientList(id));
            setDoctorId('');
        }
       

    const changeConsentStatus = (id, value) => {
        dispatch(updatePatientConsentStatus(id, value));
        alert.success('Status Changed');
    }

    function setCurrentPageNumber(pageNumber) {
        setCurrentPage(pageNumber);
    }

    const searchhandler = () => {
        dispatch(searchPatient(searchBy, keyword));
    }  

    const deActivatePatient = () => {
        dispatch(patientDeActivate(patientModel));
    }

    const activatePatient = () => {
        dispatch(patientActivate(patientModel));
    }

    const refreshHandler = () => {
        dispatch(getPatients(resPerPage, currentPage));
        dispatch(getDoctors(resPerPage, currentPage));
        dispatch(getHrLists(resPerPage, currentPage));
        setHrId('');
        setDoctorId('');
        setKeyword('');
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

                            
                            <Link to="/adminDashboard" className="go-back-btn"><i className='bx bx-arrow-back' ></i></Link> &nbsp;
                            <button className="btn refresh-btn" onClick={refreshHandler}><i className='bx bx-refresh'></i></button> &nbsp;
                            <Link to="/addpatient" className="add-staff-btn"><i className='bx bxs-user'></i> &nbsp;Add New Patient</Link>
                                                        
                        </div>

                        <div className="row-display">
                            
                            <h5 className="pt-2 mt-2">Patients List </h5>
            

                            <div className="mt-2">
                                <select 
                                className="form-control select-input-type"
                                value={doctorId}
                                onChange={(e) => {searchPatientByDoctor(e.target.value); setDoctorId(e.target.value)}}
                                >
                                    <option value="undefined"> Sort By Physician.</option>
                                    {doctors && doctors.map((doc, index) => (
                                        <option value={doc?._id} key={index}>Dr. {doc?.firstname} {doc?.lastname}</option>                                         
                                    ))}
                                </select>    
                            </div>

                            <div className="mt-2">
                                <select 
                                className="form-control select-input-type"
                                value={hrId}
                                onChange={(e) => {searchPatientByHR(e.target.value); setHrId(e.target.value)}} 
                                >
                                    <option value="undefined">Sort By Nurse</option>
                                    {hrs && hrs.map((hr, index) => (
                                        <option value={hr?._id} key={index}> {hr?.firstname} {hr?.lastname}</option>
                                    ))}
                                    
                                </select>    
                            </div>
                            
                            {/* Search Key options */}
                            <div
                            className="row-display"
                            style={{
                                backgroundColor: '#CCCCCC',
                                padding: '10px',
                                borderRadius: '10px',
                            }}>
                            <div>
                                <select 
                                className="form-control select-input-type" 
                                value={searchBy}
                                onChange={e => setSearchBy(e.target.value)}
                                >
                                    <option value="undefined">Search Patient By </option>
                                     <option value="firstname">Firstname</option>
                                     <option value="lastname">Lastname</option>
                                     <option value="email">email</option>
                                     <option value="phone1">phone1</option>
                                     <option value="address">Address</option>
                                </select>    
                            </div>

                            &nbsp;&nbsp;&nbsp;
                            <div>
                                <input type="text" 
                                name="search patient" 
                                className="form-control shadow-none" 
                                placeholder="Search patient..." 
                                value={keyword}
                                onChange={e => setKeyword(e.target.value) }
                                style={{outline: 'none'}}
                                />
                            </div>

                            &nbsp;&nbsp;&nbsp;
                            <button 
                            className="btn add-staff-btn" style={{height: '40px'}}
                            onClick={searchhandler}
                            ><i className='bx bx-search-alt-2'></i></button>
                            </div>
                        </div>
                    </div>  
                    <br />
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
                                <th>Physician</th>
                                <th>Consent Status</th>
                                <th>Last Reading </th>
                                <th>ACTION</th> 
                                </tr>
                            </thead>
                            <tbody>
                            
                            {patients && patients.length > 0 ? <Fragment> 
                                {patients && patients.map((patient, index) => (
                                <tr key={index}>  
                                <td><Link style={{textDecoration: 'none'}} to={{ pathname: "/patientProfile", state: {patientid: patient?._id }}}>{patient?.firstname} {patient?.lastname} <p>{patient?.phone1}</p></Link></td>
                                
                                <td> {moment(patient?.DOB).format("ll")} <p><Badge bg="dark text-white">{patient?.gender}</Badge></p></td> 
                                
                                <td style={{wordWrap: 'break-word'}}>{patient?.email}</td>
                                
                                {patient?.block === false ? <td>
                                    <i className='bx bxs-circle' style={{color: 'green'}}></i> <p style={{color: 'green'}}>Activated</p>
                                    </td> : <td><i className='bx bxs-circle'style={{color: 'red'}}></i> <p style={{color: 'red'}}>De-Activated</p>
                                </td>}
                                    
                                {patient?.assigned_doctor_id ? <>
                                <td style={{fontWeight: 'bold', color: '#23408e'}}>Dr.{patient?.assigned_doctor_id?.firstname} {patient?.assigned_doctor_id?.lastname}</td>
                                </> : <>
                                <td><Badge bg="danger text-white" className="not-assigned-tag">Not Assigned</Badge></td>
                                </>}
                                
                                <td>
                                    <div className="form-check">
                                        <input 
                                            type="checkbox"
                                            id={index}
                                            className="form-check-input"
                                            defaultChecked={patient?.rpmconsent === true ? true : false}
                                            onClick={(event) => changeConsentStatus(patient?._id, event.target.checked ? true : false) }
                                        />

                                        <label style={{ cursor: 'pointer' }} htmlFor={index}>
                                        {patient?.rpmconsent === true ? <span style={{color: 'green', fontWeight: 'bold'}}>
                                            Signed</span>
                                            : <span style={{color: 'red', fontWeight: 'bold'}}>Not Signed</span>}
                                        </label>
                                    </div>
                                </td>

                                <td>{patient?.lastReading ? moment(patient?.lastReading).format("MM/DD/YYYY") : 'N/A'}</td>
                                
                                <td><Link to={{ pathname: "/patientProfile", state: {patientid: patient?._id}}} className="rounded-button-profile"><i className='bx bx-user'></i></Link>
                                <Link className="rounded-button-edit" to={{pathname: '/Patients/Edit', state: {patientDetails: patient}}}><i className='bx bx-edit-alt'></i></Link>
                                
                                {patient?.block === false ? <Link className="rounded-button-delete" to="/patients" onClick={() => {setSmShow(true); setPatientModel(patient?._id); setPatientToDelete(patient?.lastname)}}><i className='bx bx-lock-alt'></i></Link> 
                                : 
                                <Link className="rounded-button-activate" to="/patients" onClick={() => {setSmShow(true); setPatientModel(patient?._id); setPatientToDelete(patient?.lastname)}}><i className='bx bx-lock-open'></i></Link>
                                    }
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
                                {!isSearch && !doctorId && !hrId && resPerPage <= totalPatients && (
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
