import React, { useEffect,  Fragment } from 'react';
import TopBar from '../AdminDashboard/TopBar';
import { useSelector, useDispatch } from 'react-redux';
import { getPatients, getAllLogs, getAdminStats } from '../../actions/adminActions';
import { Link } from 'react-router-dom';
import {Table, Badge, Image, Spinner} from 'react-bootstrap';
import DashboardGraphs from '../AdminDashboard/DashboardGraphs';
import hrIcon from '../../assets/Images/network.png';
import doctorIcon from '../../assets/Images/doctorIcon.png';
import patientIcon from '../../assets/Images/patientIcon.png';
import heartIcon from '../../assets/Images/heart.png';
import verifiedIcon from "../../assets/Images/verified-user.png";
import banIcon from "../../assets/Images/ban-user.png";
const moment = require('moment-timezone');

const Home = () => {
    const dispatch = useDispatch();

    const { patients} = useSelector(state => state.admin);
    const { loading, logs} = useSelector(state => state.log);
    const { totalPatients, totalHrs, totalDrs, totalDevices, activePts, blockPts } = useSelector(state => state.adminStat)

    const todayDate = moment().format("ll");

    useEffect(() => {
          dispatch(getPatients());
          dispatch(getAllLogs(todayDate));
          dispatch(getAdminStats())
    }, [dispatch]);


    return (
        <Fragment>

        <section className="home-section">
            <TopBar />
                
            {/*  Home content  */}
            <div className="home-content">
                <div className="overview-boxes">
                        <div className="box box0">
                                <div className="left-side">
                                    <Link to="/patients" className="box_topic">Total Patients <br /></Link>
                                    <div className="number">{totalPatients && totalPatients < 10 ? '0'+totalPatients : totalPatients }</div>
                                    <div className="indicator">
                                        <i className="bx bx-up-arrow-alt down"></i>
                                        <span className="text">Updated just now</span>
                                    </div>
                                </div>
                                <Image src={patientIcon} className="cart" />
                                {/* <i className="bx bx-user cart"></i> */}
                        </div>

                    <div className="box box1">
                        <div className="left-side">
                            <Link to="/devices" className="box_topic">RPM Devices <br /></Link>
                            <div className="number">{totalDevices && totalDevices < 10 ? '0'+totalDevices : totalDevices }</div>
                            <div className="indicator">
                                <i className="bx bx-up-arrow-alt down"></i>
                                <span className="text">Updated just now</span>
                            </div>
                        </div>
                        <Image src={heartIcon} className="cart"/>
                        {/* <i className="bx bx-devices cart two"></i> */}
                    </div>

                    <div className="box box2">
                        <div className="left-side">
                            <Link to="/doctors" className="box_topic">Total Doctors<br /></Link>
                            <div className="number">{totalDrs && totalDrs < 10 ? '0'+totalDrs : totalDrs}</div>
                            <div className="indicator">
                                <i className="bx bx-up-arrow-alt down"></i>
                                <span className="text">Updated just now</span>
                            </div>
                        </div>
                        <Image src={doctorIcon} className="cart three" />
                    </div>

                    <div className="box box3">
                        <div className="left-side">
                            <Link to="/hrs" className="box_topic">Nurses <br/></Link>
                            <div className="number">{totalHrs && totalHrs < 10 ? '0'+totalHrs : totalHrs}</div>
                            <div className="indicator">
                                <i className="bx bx-down-arrow-alt down"></i>
                                <span className="text">Updated just now</span>
                            </div>
                        </div>
                        {/* <i className="bx bxs-cart-download cart four"></i> */}
                        <Image src={hrIcon} className="cart" />

                    </div>
                </div>

                <br />

                {/* Graphs & Alerts Section */}
                <div className="container-fluid row">
                    <div className="col-lg-9">
                        <DashboardGraphs />
                    </div>
                    <div className="col-lg-3">
                        <div className="card card-bordered-01" style={{backgroundColor: '#E9FFF2'}}>
                            <div className="row-display">
                                <div className="container">
                                    <h5 className="mt-2" style={{color: '#009150'}}><b>Active <br/> patients</b></h5> 
                                    <p className="number">{activePts}</p>
                                </div>
                                <img src={verifiedIcon} alt="" width="100" height="100"/>
                            </div>                            
                        </div>
                        <hr />

                        <div className="card card-bordered-01" style={{backgroundColor: '#E9FFF2'}}>
                            <div className="row-display">
                                <div className="container">
                                    <h5 className="mt-2" style={{color: '#9B111E'}}><b>Inactive <br />Patients</b></h5>
                                    <p className="number">{blockPts < 10 ? '0'+blockPts : blockPts}</p>    
                                </div>
                                <img src={banIcon} alt="" width="100" height="100"/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sales Content */}
                <div className="sales-boxes mt-5">
                    <div className="recent-sale box">
                        <div className="container-fluid row">
                            <div className="col-lg-8 col-md-8">
                            <h5 className="title">Recently Added Patients</h5>
                                <div className="sales-details">
                                {patients && <Fragment>
                                    <Table striped hover bordered>
                                        <thead>
                                        <tr>
                                        <th>Name</th>
                                        <th>DOB </th>
                                        <th>Email</th>
                                        <th>Phone #</th>
                                        <th>Diseases</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {patients && patients.slice(0,9).map((patient, index) => (
                                        <tr key={index}>
                                           <td><Link style={{textDecoration: 'none'}} to={{ pathname: "/patientProfile", state: {patientid: patient?._id }}}>{patient?.firstname} {patient?.lastname} <p>{patient?.phone1}</p></Link></td>
                                    
                                            <td> {moment(patient?.DOB).format("ll")} <p><Badge bg="dark text-white">{patient?.gender}</Badge></p></td> 
                                    
                                            <td style={{wordWrap: 'break-word'}}>{patient?.email}</td>
                                          
                                            <td>{patient?.phone1}</td>
                                          <td>{patient?.diseases || 'N/A'}</td>
                                        </tr>
                                        ))}
                                        </tbody>
                                      </Table>
                                      </Fragment> }
                                </div>
                            </div>

                            
                                <div className="col-md-4 col-lg-4 logs-card">
                                    <div className="row-display">
                                     <h5 className="title">Logs ( {todayDate} )</h5>
                                     <Link to="/logs" className="link">
                                        <span className="manage_logs_btn"><i className='bx bx-slider-alt'></i> Manage Logs</span>
                                     </Link>
                                    </div>
                                    <hr />
                                    {logs && logs.slice(0,50).map((log, index) => (     
                                             <ul key={index}>
                                                {loading ? <Spinner animation="border" style={{height: '20px', width: '20px'}}/> : <>
                                                    <ol><small>{index +1 +" )"} {log?.text}.</small> 
                                                    &nbsp;&nbsp;&nbsp;<span><small>
                                                    {moment(log.createdAt).tz("America/New_York").format("lll")}
                                                    </small></span></ol>
                                                </>}
                                             </ul>
                                    ))} 
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                </section>

        </Fragment>
    )
}

export default Home
