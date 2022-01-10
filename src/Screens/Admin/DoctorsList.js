import React, {useEffect, useState, Fragment} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctors } from '../../actions/adminActions';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination';
import {Badge, Table } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import moment from 'moment';

const DoctorsList = ({match}) => {

    const dispatch = useDispatch();

    const alert = useAlert();
    const [currentPage, setCurrentPage] = useState(1);
    const [keyword, setKeyword] = useState('');

    const { loading, error, doctorCount, resPerPage, doctors} = useSelector(state => state.admin);
    // const keyword = match.params.keyword;
        
    useEffect(() =>{
        if(error){
            return alert.error(error);
        }
        dispatch(getDoctors(keyword,currentPage));

    }, [dispatch, alert, error, currentPage ]);

    function setCurrentPageNumber(pageNumber) {
        setCurrentPage(pageNumber);
    }

    const searchhandler = (e) => {
        e.preventDefault();

        if(keyword.trim()){
            dispatch(getDoctors(keyword,currentPage));
        }
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
                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded">
                    <div className="home-content">

                        <div className="row list-box-header">
                            <div className="col-md-9">
                                
                            </div>

                            <Link to="adminDashboard" className="go-back-btn"><i class='bx bx-arrow-back' ></i></Link> &nbsp;
                            <button className="btn refresh-btn"><i class='bx bx-refresh'></i></button> &nbsp;
                            <Link to="/adddoctor" className="add-staff-btn">Enroll New Staff</Link>
                                                        
                        </div>

                        <div className="row">
                            <div className="col-md-7">
                                <h5 className="pt-2">Doctors List ( {doctorCount && doctorCount} )</h5> 
                            </div>

                            <div className="col-md-2">
                                <select className="form-control" placeholder="Sort By">
                                <option selected disabled>Sort By</option>
                                    <option value="-1">Ascending Order</option>
                                    <option value="1">Descending Order</option>
                                </select>
                            </div>

                            <form onSubmit={searchhandler}>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        id="search_field"
                                        className="form-control"
                                        placeholder="Search By Email ..."
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <button id="search_btn" className="btn" type="submit">
                                            <i class='bx bx-search'></i>
                                        </button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>  
                    <br />

                    {/* Patient List Card */}
                        <div className="col-md-12">
                         <Fragment>
                         <Table striped hover>
                            <thead align="center">
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Gender </th>
                                <th>Contact #</th>
                                <th>RPM Consent</th>
                                <th>Action</th> 
                            </thead>
                            <tbody>
                            {doctors && doctors.map((doctor, index) => ( 
                                <tr key={doctor?._id}>
                                <td><Image src={doctor?.avatar?.url ? doctor?.avatar?.url : "https://i.pinimg.com/originals/ae/ec/c2/aeecc22a67dac7987a80ac0724658493.jpg"} roundedCircle fluid style={{width: '50px', height: '50px', margin: 0}}/></td>
                                <td><Link to={{ pathname: "/doctorProfile", state: {id: doctor?._id}}}> {doctor?.title} {doctor?.firstname} {doctor?.lastname} <p style={{color: 'gray'}}>({doctor?.role})</p> </Link></td>
                                <td>{doctor?.email}</td>
                                {doctor?.gender === 'Male' ? <td><Badge bg="info text-white" className="male-tag">Male</Badge></td> : <td className="female-tag"> <Badge bg="danger text-white" className="female-tag">Female</Badge></td>}
                                <td>{doctor?.contactno} <p>(English)</p></td>
                                <td className="authorize-icon"><i class='bx bxs-circle'></i><p>Authorized</p></td>
                                <td>
                                    <Link to={{ pathname: "/doctorProfile", state: {id: doctor?._id}}} className="rounded-button-profile"><i className='bx bx-user'></i></Link>
                                    <Link to={{ pathname: "/editDoctor", state: {id: doctor?._id}}} className="rounded-button-edit"><i className='bx bx-edit-alt'></i></Link>
                                    <Link className="rounded-button-delete"><i className='bx bxs-user-minus'></i></Link>
                                </td>
                            </tr> 
                            
                             ))}
                             
                             </tbody>
                            </Table> 

                            {/* Pagination */}
                        {resPerPage <= doctorCount && (
                            <div className="d-flex justify-content-center mt-5"> 
                            <Pagination activePage={currentPage} 
                             itemsCountPerPage={resPerPage} 
                             totalItemsCount = {doctorCount}
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
        </Fragment>
    )
}

export default DoctorsList;
