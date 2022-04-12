import React, {Fragment, useState, useEffect} from 'react'
import MetaData from '../../layouts/MetaData';
import  HRSidebar from '../../components/HR/HRSidebar';
import HRPieGraph from '../../components/HR/HRPieGraph';
import HRTopBar from '../../components/HR/HRTopbar';
import { useDispatch, useSelector } from 'react-redux';
import { getHRPatients } from '../../actions/HRActions';
import folderImg from '../../assets/Images/folder.png';
import { Link } from 'react-router-dom';
import { Badge, Table } from 'react-bootstrap';
import Loader from '../../layouts/Loader';
import { useAlert } from 'react-alert';
import moment from 'moment';

const StaffDashboard = (props) => {

    const { loading, hr, isAuthenticated} = useSelector(state => state.hrAuth);
    const {  error, hrpatients} = useSelector(state => state.hrPatients);

    const [sort, setSort] = useState(true);
    const [query, setQuery] = useState("");
    const keys = ["firstname", "lastname", "DOB", "email", "phone1"];

    const dispatch = useDispatch();
    const alert = useAlert();
    let id = hr._id;

    
    useEffect(() => {
		if(error) {
			alert.error("/hrLogin");
		}

        dispatch(getHRPatients(id));
	}, [dispatch, isAuthenticated])

    return (
        <Fragment>
            <MetaData title="HR Dashboard" />
            <HRSidebar />
            
            <section className="home-section">
                <HRTopBar />


                <div className="home-content">
                <div className="overview-boxes">
                    <HRPieGraph />
                </div>
            </div>
            <div>
            <br />

            {loading ? <Loader /> : <Fragment>
                    <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white">        
                        <div className="home-content">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                    <div className="row-display">
                                        <h5 className="pt-2 mt-2">Patients ({hrpatients && hrpatients.length}) </h5> 

                                        <div className="row-display"> 
                                            <input 
                                                type="text" 
                                                className="form-control mt-2"
                                                onChange={e => setQuery(e.target.value)}
                                                placeholder="Search"
                                                style={{width: '180px', height: '40px'}}
                                            /> 

                                            &nbsp;&nbsp;&nbsp;
                                            <button className="btn add-staff-btn mt-2" 
                                            onClick={() => setSort(sort => !sort)}
                                            style={{height: '40px'}}
                                            >
                                            {sort ? <i className="bx bx-down-arrow-alt"></i> : <i className="bx bx-up-arrow-alt"></i>}
                                                </button>
                                        </div>
                                    
                                    </div>
                                        <br />
                                    </div>
                                </div> 
                                
                                {hrpatients?.length > 0 ? (<Fragment>
                                <div className="col-md-12">
                                    <Fragment>
                                        <Table striped hover bordered>
                                        <thead align="center">
                                            <tr>
                                            <th>Name</th>
                                            <th>DOB </th>
                                            <th>Email</th>
                                            <th>Acc Status</th>
                                            <th>Physician</th>
                                            <th>Devices Assigned</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {sort ? <>
                                        {hrpatients && hrpatients.filter(item => keys.some(key => item[key].toLowerCase().includes(query))).map((patient, index) => (  
                                            <tr key={index}>
                                            
                                            <td>
                                                <Link style={{textDecoration: 'none'}} to={{ pathname: "/hrPatientProfile", state: {patientid: patient?._id }}}>{patient?.firstname} {patient?.lastname} <p>{patient?.phone1}</p></Link>
                                            </td>

                                            <td> {moment(patient?.DOB).format("ll")} <p><Badge bg="dark text-white">{patient?.gender}</Badge></p></td>
                                            
                                            <td style={{wordWrap: 'break-word'}}>{patient?.email}</td>
                                            
                                            {patient?.block === false ? <td>
                                                <i className='bx bxs-circle' style={{color: 'green'}}></i> <p style={{color: 'green'}}>Activated</p>
                                                </td> : <td><i className='bx bxs-circle'style={{color: 'red'}}></i> <p style={{color: 'red'}}>De-Activated</p>
                                            </td>}


                                            {patient?.assigned_doctor_id ? <td style={{backgroundColor:'#D3D3D3'}}> {patient?.assigned_doctor_id.firstname} {patient?.assigned_doctor_id.lastname}</td> : 'N/A' }
                                            {patient?.assigned_devices ? <td>0{patient?.assigned_devices.length}</td> : 'No Device Assigend'}
                                            
                                        </tr> 
                                        
                                        ))}
                                         </> : <>
                                        
                                         {hrpatients && hrpatients.reverse().filter(item => keys.some(key => item[key].toLowerCase().includes(query))).map((patient, index) => ( 
                                            <tr key={index}>
                                            
                                            <td>
                                                <Link to={{ pathname: "/hrPatientProfile", state: {patientid: patient?._id }}}>
                                                    {patient?.firstname} {patient?.lastname} 
                                                    <p>{patient?.phone1}</p>
                                                </Link>
                                            </td>

                                            <td> {moment(patient?.DOB).format("ll")} <p><Badge bg="dark text-white">{patient?.gender}</Badge></p></td>
                                            
                                            <td style={{wordWrap: 'break-word'}}>{patient?.email}</td>
                                            
                                            {patient?.block === false ? <td>
                                                <i className='bx bxs-circle' style={{color: 'green'}}></i> <p style={{color: 'green'}}>Activated</p>
                                                </td> : <td><i className='bx bxs-circle'style={{color: 'red'}}></i> <p style={{color: 'red'}}>De-Activated</p>
                                            </td>}


                                            {patient?.assigned_doctor_id ? <td style={{backgroundColor:'#007673', color: '#FFF'}}> Dr. {patient?.assigned_doctor_id.firstname} {patient?.assigned_doctor_id.lastname}</td> : 'N/A' }
                                            {patient?.assigned_devices ? <td>0{patient?.assigned_devices.length}</td> : 'No Device Assigend'}
                                            
                                        </tr> 
                                        
                                        ))}

                                         </> }
                                        
                                        </tbody>
                                        </Table>    
                                    </Fragment>                      
                            </div>
                        </Fragment> ) : <Fragment>
                        <div>   
                                           
                        <img src={folderImg} className="no-record-found-img"/>
                        <p className="doctor-specilizations">No Patient Assigned Yet...</p>                            
                                    </div>
                                </Fragment> }
                            </div>
                        </div>
                    </div>
                </Fragment>
                    }
            
            
            </div>                
        </section>
    </Fragment>
    )
}

export default StaffDashboard;
