import React, {useEffect, useState, Fragment} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctors, searchDoctor, doctorDeActivate, doctorActivate } from '../../actions/adminActions';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination';
import {Badge, Table, Modal } from 'react-bootstrap';
import moment from 'moment';
import { UPDATE_DOCTOR_RESET } from '../../constants/adminConstants';

const DoctorsList = () => {

    const dispatch = useDispatch();

    const alert = useAlert();
    const [currentPage, setCurrentPage] = useState(1);
    const [resPerPage, setResPerPage] = useState(10);
    const [keyword, setKeyword] = useState('');
    const [isSearch, setIsSearch] = useState(false);

    const [smShow, setSmShow] = useState(false); //small confirm modal
    const [doctorModel, setDoctorModel] = useState(null);
    const [doctorToDelete, setDoctorToDelete] = useState(null);

    const { loading, error, isUpdated} = useSelector(state => state.admin);
    const { doctors } = useSelector(state => state.doctor);
    const { totalDrs } = useSelector(state => state.adminStat);
        
    useEffect(() =>{
        if(error){
            alert.error(error);
        }

        if(isUpdated) {
            alert.success('Account Status Changed');
            dispatch(getDoctors(resPerPage, currentPage));
            dispatch({type: UPDATE_DOCTOR_RESET})
            setSmShow(false);
        }

        dispatch(getDoctors(resPerPage, currentPage));

    }, [dispatch, alert, error, currentPage, isUpdated]);

    function setCurrentPageNumber(pageNumber) {
        setCurrentPage(pageNumber);
    }

    const searchhandler = (searchValue) => {
        if (searchValue === undefined || searchValue === "") {
            dispatch(getDoctors(resPerPage, currentPage));
            setIsSearch(false)

        }
        else {
            setIsSearch(true);
            dispatch(searchDoctor(searchValue));
        }
    }  

    const refreshHandler = () => {
        dispatch(getDoctors(resPerPage, currentPage));
        setIsSearch(false);
        setKeyword('');

    }

    const deActivateDoctor = () => {
        dispatch(doctorDeActivate(doctorModel));
    }

    const activateDoctor = () => {
        dispatch(doctorActivate(doctorModel));
    }

    return (
        <Fragment>
                <MetaData title="Doctors"/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />

                {loading ? <Loader /> : (
                <Fragment>   
                {/*  patients List Filter Section */}
                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded-card">
                    <div className="home-content">

                        <div className="row list-box-header">
                            <div className="col-md-9">
                                
                            </div>
                            
                            <Link to="adminDashboard" className="go-back-btn"><i class='bx bx-arrow-back' ></i></Link> &nbsp;
                            <button className="btn refresh-btn" onClick={refreshHandler}><i class='bx bx-refresh'></i></button> &nbsp;
                            <Link to="/adddoctor" className="add-staff-btn">Add New Doctor</Link>
                                                        
                        </div>

                        <div className="row">
                            <div className="col-md-9">
                                <h5 className="pt-2">Doctors List <span style={{color: '#F95800'}}>( {totalDrs && totalDrs < 10 ? '0'+totalDrs : totalDrs} )</span></h5> 
                            </div>

                    
                            <div className="col-md-3">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control shadow-none"
                                        placeholder="Search by name ..."
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
                         <Fragment>
                         <Table striped hover bordered>
                            <thead align="center">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Gender </th>
                                    <th>NPI Number</th>
                                    <th>Phone 1</th>
                                    <th>Acc Status</th>
                                    <th>Action</th>
                                </tr> 
                            </thead>
                            <tbody>
                            {doctors && doctors.map((doctor, index) => ( 
                                <tr key={index}>
                                <td><Link to={{ pathname: "/doctorProfile", state: {id: doctor?._id}}}> Dr. {doctor?.firstname} {doctor?.lastname} <p style={{color: 'gray'}}>{moment(doctor?.DOB).format("ll")}</p> </Link></td>
                                <td style={{wordWrap: 'break-word'}}>{doctor?.email}</td>
                                {doctor?.gender === 'male' ? <td><Badge bg="info text-white" className="male-tag">Male</Badge></td> : <td className="female-tag"> <Badge bg="danger text-white" className="female-tag">Female</Badge></td>}
                                <td>{doctor?.npinumber ? doctor?.npinumber : 'N/A'}</td>
                                <td>{doctor?.phone1 ? doctor?.phone1 : 'N/A'} <p>( English )</p></td>
                                {doctor?.block === false ? <td>
                                        <i className='bx bxs-circle' style={{color: 'green'}}></i> <p style={{color: 'green'}}>Activated</p>
                                        </td> : <td><i class='bx bxs-circle'style={{color: 'red'}}></i> <p style={{color: 'red'}}>De-Activated</p>
                                </td>}
                                <td>
                                    <Link to={{ pathname: "/doctorProfile", state: {id: doctor?._id}}} className="rounded-button-profile"><i className='bx bx-user'></i></Link>
                                    <Link to={{ pathname: "/Doctor/Edit", state: {id: doctor}}} className="rounded-button-edit"><i className='bx bx-edit-alt'></i></Link>
                                    
                                    {doctors.block === false ? <Fragment>
                                        <Link className="rounded-button-delete" onClick={() => {setSmShow(true); setDoctorModel(doctor?._id); setDoctorToDelete(doctor?.lastname)}}><i className='bx bx-lock-alt'></i></Link>
                                    </Fragment> : 
                                    <Fragment>
                                        <Link className="rounded-button-activate" onClick={() => {setSmShow(true); setDoctorModel(doctor?._id); setDoctorToDelete(doctor?.lastname)}}><i className='bx bx-lock-open'></i></Link>
                                    </Fragment>}
                                </td>
                            </tr> 
                            
                             ))}
                             
                             </tbody>
                            </Table> 
                            <small style={{color: 'gray'}}>Showing {resPerPage} records per page</small> 


                            {/* Pagination */}
                                {!isSearch && resPerPage <= totalDrs && (
                                    <div className="d-flex justify-content-center mt-5"> 
                                    <Pagination activePage={currentPage} 
                                    itemsCountPerPage={resPerPage} 
                                    totalItemsCount = {totalDrs}
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
                        </Fragment>                      
                        </div>
                    </div>
                </Fragment>
             )}
            </section>

            <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Body>
                    <small style={{color: 'gray'}}>Are you sure you want to activate / de-activate 
                        <span style={{color: '#000'}}> Dr. {doctorToDelete}'s</span> Account ?
                    </small>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-sm btn-success" onClick={activateDoctor}>Activate</button>
                    <button className="btn btn-sm btn-danger" onClick={deActivateDoctor}>De-Activate</button>
                </Modal.Footer>
            </Modal>  
        </Fragment>
    )
}

export default DoctorsList;
