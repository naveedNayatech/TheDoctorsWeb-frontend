import React, {useEffect, Fragment} from 'react';
import {Badge, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import { getHrLists } from '../../actions/adminActions';
import { useDispatch, useSelector} from 'react-redux';
import { useAlert } from 'react-alert';
import moment from 'moment';


const HRList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, hrs} = useSelector(state => state.hrslist);

    useEffect(() =>{
        if(error){
            return alert.error(error);
        }

        dispatch(getHrLists());

    }, [dispatch, error]);


    
  return <Fragment>
        <MetaData title="HRs"/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />

                {loading ? <Loader /> : ( <Fragment>
                    <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded">
                    <div className="home-content">

                        <div className="row list-box-header">
                            <div className="col-md-9">
                            <h5 className="pt-2">HRs List <span style={{color: '#F95800'}}>( 01 )</span></h5> 
                            </div>

                            <Link to="/adminDashboard" className="go-back-btn"><i className='bx bx-arrow-back' ></i></Link> &nbsp;
                            <button className="btn refresh-btn"><i className='bx bx-refresh'></i></button> &nbsp;
                            <Link to="/addhr" className="add-staff-btn">Add New HR</Link>
                                                        
                        </div>

                        <hr className="blue-hr"/>


                        {/* HRs List */}
                        <div className="col-md-12">
                         <Fragment>
                         <Table striped hover>
                            <thead align="center">
                                <tr>
                                <th>Name</th>
                                <th>D.O.B</th>
                                <th>Email</th>
                                <th>Gender </th>
                                <th>HR Of</th>
                                <th>Account Status</th>
                                <th>Action</th>
                                </tr> 
                            </thead>
                            <tbody>
                            {hrs && hrs.map((hr, index) => (
                               <tr key={index}>
                                <td><Link to={{ pathname: "/hrProfile", state: {hr: hr}}}> {hr?.firstname} {hr?.lastname} <p style={{color: 'gray'}}>({hr?.role})</p> </Link></td>
                                <td>{moment(hr?.DOB).format("ll")}</td>    
                                <td>{hr?.email}</td>    
                                {hr?.gender === 'male' ? <td><Badge bg="primary text-white" className="male-tag">Male</Badge></td> : <td className="female-tag"> <Badge bg="warning text-white" className="female-tag">Female</Badge></td>}    
                                {hr?.assigned_doctor_id ? <td>Dr. {hr?.assigned_doctor_id?.firstname} {hr?.assigned_doctor_id?.lastname}</td> : <td>N/A</td>}
                                <td>Activated</td>
                                <td>
                                    <Link to={{ pathname: "/hrProfile", state: {hr: hr}}} className="rounded-button-profile"><i className='bx bx-user'></i></Link>
                                    <Link to={{ pathname: "/updateHR", state:{ hr: hr}}} className="rounded-button-edit"><i className='bx bx-edit-alt'></i></Link>
                                </td>
                               </tr> 
                            ))}
                            </tbody>
                        </Table>
                        </Fragment>
                        </div>

                      </div>
                    </div>
                </Fragment> 
                )}
                </section>
    </Fragment>;
};

export default HRList;
