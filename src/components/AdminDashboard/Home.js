import React, { useEffect,  Fragment } from 'react';
import TopBar from '../AdminDashboard/TopBar';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { getPatients, getAllLogs, getAdminStats } from '../../actions/adminActions';
import { Link } from 'react-router-dom';
import {Table, Badge} from 'react-bootstrap';
import DashboardGraphs from '../AdminDashboard/DashboardGraphs';
const moment = require('moment-timezone');

const Home = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { patients} = useSelector(state => state.admin);
    const { loading, logs} = useSelector(state => state.log);
    const { totalPatients, totalHrs, totalDrs, totalDevices } = useSelector(state => state.adminStat)

    useEffect(() => {
          dispatch(getPatients());
          dispatch(getAllLogs());
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
                                        <span className="text">Up from Yesterday</span>
                                    </div>
                                </div>
                                <i className="bx bx-user cart"></i>
                        </div>

                    <div className="box box1">
                        <div className="left-side">
                            <Link to="/devices" className="box_topic">RPM Inventory <br /></Link>
                            <div className="number">{totalDevices && totalDevices < 10 ? '0'+totalDevices : totalDevices }</div>
                            <div className="indicator">
                                <i className="bx bx-up-arrow-alt down"></i>
                                <span className="text">Up from Yesterday</span>
                            </div>
                        </div>
                        <i className="bx bx-devices cart two"></i>
                    </div>

                    <div className="box box2">
                        <div className="left-side">
                            <Link to="/doctors" className="box_topic">Total Doctors<br /></Link>
                            <div className="number">{totalDrs && totalDrs < 10 ? '0'+totalDrs : totalDrs}</div>
                            <div className="indicator">
                                <i className="bx bx-up-arrow-alt down"></i>
                                <span className="text">Up from Yesterday</span>
                            </div>
                        </div>
                        <i className="bx bx-user cart three"></i>
                    </div>

                    <div className="box box3">
                        <div className="left-side">
                            <Link to="/hrs" className="box_topic">Total HRs <br/></Link>
                            <div className="number">{totalHrs && totalHrs < 10 ? '0'+totalHrs : totalHrs}</div>
                            <div className="indicator">
                                <i className="bx bx-down-arrow-alt down"></i>
                                <span className="text">Up from Yesterday</span>
                            </div>
                        </div>
                        <i className="bx bxs-cart-download cart four"></i>
                    </div>
                </div>

                <br />

                {/* Graphs & Alerts Section */}
                <div className="container-fluid row">
                    <div className="col-lg-12">
                        <DashboardGraphs />
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
                                    <h5 className="title">Logs</h5>
                                    <hr />
                                    {logs && logs.map((log, index) => (
                                         <div key={index}>        
                                             <ul>
                                                 <ol><small>{log?.text}.</small> <p><small><i>
                                                 {moment(log.createdAt).tz("America/New_York").format("lll")}
                                                 </i></small></p></ol>
                                             </ul>
                                         </div>
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
