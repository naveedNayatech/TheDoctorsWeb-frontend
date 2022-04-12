import React, {useState, useEffect, Fragment} from 'react';
import {Badge, Table, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import { getHrLists, HRDeactivate, HRActivate } from '../../actions/adminActions';
import { useDispatch, useSelector} from 'react-redux';
import { useAlert } from 'react-alert';
import moment from 'moment';
import {UPDATE_HR_RESET} from '../../constants/adminConstants';

const HRList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, hrs, isUpdated} = useSelector(state => state.hrslist);

    const [smShow, setSmShow] = useState(false); //small confirm modal
    const [HRModel, setHRModel] = useState(null);
    const [HRToDelete, setHRToDelete] = useState(null);
    const [sort, setSort] = useState(true);
    const [query, setQuery] = useState(""); // set search query.
    const keys = ["firstname", "lastname", "email", "DOB", "gender"];

    useEffect(() =>{
        if(error){
            return alert.error(error);
        }

        if(isUpdated){
            alert.success('Account Updated');
            dispatch({ type: UPDATE_HR_RESET});
            setSmShow(false);
            dispatch(getHrLists());

        }

        dispatch(getHrLists());

    }, [dispatch, error, isUpdated]);

    const deActivateHR = () => {
        dispatch(HRDeactivate(HRModel));
    }

    const activateHR = () => {
        dispatch(HRActivate(HRModel));
    }
    

  return <Fragment>
        <MetaData title="HRs"/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />

                {loading ? <Loader /> : ( <Fragment>
                    <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded">
                    <div className="home-content">

                        <div className="row">
                            <div className="col-md-7">
                                <h5 className="pt-2">HRs List <span style={{color: '#F95800'}}>( 04 )</span></h5> 
                            </div>
                            <div className="row-display">
                                <Link to="/adminDashboard" className="go-back-btn"><i className='bx bx-arrow-back' ></i></Link> &nbsp;
                                
                                <input type="text" 
                                    placeholder="Search..." 
                                    className="form-control" 
                                    style={{width: '200px'}}
                                    onChange={e => setQuery(e.target.value)}
                                />
                                &nbsp;&nbsp;&nbsp;
                                <button className="btn add-staff-btn" onClick={() => setSort(!sort)}>
                                    {sort ? <i className="bx bx-down-arrow-alt"></i> : <i className="bx bx-up-arrow-alt"></i>}
                                </button>

                                &nbsp;&nbsp;&nbsp;
                                <Link to="/addhr" className="add-staff-btn">Add New HR</Link>
                            </div>
                        </div>

                        <br />


                        {/* HRs List */}
                        <div className="col-md-12">
                         <Fragment>
                         <Table striped hover bordered>
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
                            {sort ? <>
                                {hrs && hrs.filter(item => keys.some(key => item[key]?.toLowerCase().includes(query))).map((hr, index) => (
                               <tr key={index}>
                                <td><Link style={{textDecoration: 'none'}} to={{ pathname: "/hrProfile", state: {hr: hr}}}> {hr?.firstname} {hr?.lastname} <p style={{color: 'gray'}}>({hr?.role})</p> </Link></td>
                                <td>{moment(hr?.DOB).format("ll")}</td>    
                                <td style={{wordWrap: 'break-word'}}>{hr?.email}</td>    
                                {hr?.gender === 'male' ? <td><Badge bg="primary text-white" className="male-tag">Male</Badge></td> : <td className="female-tag"> <Badge bg="warning text-white" className="female-tag">Female</Badge></td>}    
                                {hr?.assigned_doctor_id ? <td style={{backgroundColor: '#007673', color: '#FFF'}}>
                                    Dr. {hr?.assigned_doctor_id?.firstname} {hr?.assigned_doctor_id?.lastname} 
                                    <p style={{ wordWrap: 'break-word'}}> {hr?.assigned_doctor_id?.email}</p></td> : 
                                <td>N/A</td>}
                                {hr?.block === false ? <td>
                                        <i className='bx bxs-circle' style={{color: 'green'}}></i> <p style={{color: 'green'}}>Activated</p>
                                        </td> : <td><i className='bx bxs-circle'style={{color: 'red'}}></i> <p style={{color: 'red'}}>De-Activated</p>
                                </td>}
                                <td>
                                    <Link to={{ pathname: "/hrProfile", state: {hr: hr}}} className="rounded-button-profile"><i className='bx bx-user'></i></Link>
                                    <Link to={{ pathname: "/updateHR", state:{ hr: hr}}} className="rounded-button-edit"><i className='bx bx-edit-alt'></i></Link>
                                   {hr?.block === false ? <Fragment>
                                        <Link to="hrlist" className="rounded-button-delete" onClick={() => {setSmShow(true); setHRModel(hr?._id); setHRToDelete(hr?.lastname)}}><i className='bx bx-lock-alt'></i></Link>
                                   </Fragment> : <Fragment>
                                        <Link to="hrlist" className="rounded-button-activate" onClick={() => {setSmShow(true); setHRModel(hr?._id); setHRToDelete(hr?.lastname)}}><i className='bx bx-lock-open'></i></Link>
                                    </Fragment>} 

                                </td>
                               </tr> 
                            ))}
                            </> : <>
                            {hrs && hrs.reverse().filter(item => keys.some(key => item[key]?.toLowerCase().includes(query))).map((hr, index) => (
                               <tr key={index}>
                                <td><Link style={{textDecoration: 'none'}} to={{ pathname: "/hrProfile", state: {hr: hr}}}> {hr?.firstname} {hr?.lastname} <p style={{color: 'gray'}}>({hr?.role})</p> </Link></td>
                                <td>{moment(hr?.DOB).format("ll")}</td>    
                                <td style={{wordWrap: 'break-word'}}>{hr?.email}</td>    
                                {hr?.gender === 'male' ? <td><Badge bg="primary text-white" className="male-tag">Male</Badge></td> : <td className="female-tag"> <Badge bg="warning text-white" className="female-tag">Female</Badge></td>}    
                                {hr?.assigned_doctor_id ? <td>Dr. {hr?.assigned_doctor_id?.firstname} {hr?.assigned_doctor_id?.lastname}</td> : <td>N/A</td>}
                                {hr?.block === false ? <td>
                                        <i className='bx bxs-circle' style={{color: 'green'}}></i> <p style={{color: 'green'}}>Activated</p>
                                        </td> : <td><i className='bx bxs-circle'style={{color: 'red'}}></i> <p style={{color: 'red'}}>De-Activated</p>
                                </td>}
                                <td>
                                    <Link to={{ pathname: "/hrProfile", state: {hr: hr}}} className="rounded-button-profile"><i className='bx bx-user'></i></Link>
                                    <Link to={{ pathname: "/updateHR", state:{ hr: hr}}} className="rounded-button-edit"><i className='bx bx-edit-alt'></i></Link>
                                   {hr?.block === false ? <Fragment>
                                        <Link to="hrlist" className="rounded-button-delete" onClick={() => {setSmShow(true); setHRModel(hr?._id); setHRToDelete(hr?.lastname)}}><i className='bx bx-lock-alt'></i></Link>
                                   </Fragment> : <Fragment>
                                        <Link to="hrlist" className="rounded-button-activate" onClick={() => {setSmShow(true); setHRModel(hr?._id); setHRToDelete(hr?.lastname)}}><i className='bx bx-lock-open'></i></Link>
                                    </Fragment>} 

                                </td>
                               </tr> 
                            ))}
                            </>}
                            
                            </tbody>
                        </Table>
                        </Fragment>
                        </div>

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
                        <span style={{color: '#000'}}> HR. {HRToDelete}'s</span> Account ?
                    </small>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn btn-sm btn-success" onClick={activateHR}>Activate</button>
                    <button className="btn btn-sm btn-danger" onClick={deActivateHR}>De-Activate</button>
                </Modal.Footer>
            </Modal>  
    </Fragment>;
};

export default HRList;
