import React, { useEffect,  Fragment } from 'react';
import TopBar from '../AdminDashboard/TopBar';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { getPatients, getAllDevices, getAdminStats } from '../../actions/adminActions';
import { Link } from 'react-router-dom';
import {Table, Badge} from 'react-bootstrap';
import DashboardAlerts from '../AdminDashboard/DashboardAlerts';
import DashboardGraphs from '../AdminDashboard/DashboardGraphs';
import moment from 'moment';

const Home = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { patients} = useSelector(state => state.admin);
    const { deviceCount, devices} = useSelector(state => state.devices);
    const { totalPatients, totalHrs, totalDrs, totalDevices } = useSelector(state => state.adminStat)

    useEffect(() => {
          dispatch(getPatients());
          dispatch(getAllDevices());
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
                            <div className="box_topic">Total Patients</div>
                            <div className="number">{totalPatients && totalPatients < 10 ? '0'+totalPatients : totalPatients }</div>
                            <div className="indicator">
                                <i className="bx bx-up-arrow-alt"></i>
                                <span className="text">Up from Yesterday</span>
                            </div>
                        </div>
                        <i className="bx bx-user cart"></i>
                    </div>

                    <div className="box box1">
                        <div className="left-side">
                            <div className="box_topic">Inventory</div>
                            <div className="number">{totalDevices && totalDevices < 10 ? '0'+totalDevices : totalDevices }</div>
                            <div className="indicator">
                                <i className="bx bx-up-arrow-alt"></i>
                                <span className="text">Up from Yesterday</span>
                            </div>
                        </div>
                        <i className="bx bx-devices cart two"></i>
                    </div>

                    <div className="box box2">
                        <div className="left-side">
                            <div className="box_topic">Total Doctors</div>
                            <div className="number">{totalDrs && totalDrs < 10 ? '0'+totalDrs : totalDrs}</div>
                            <div className="indicator">
                                <i className="bx bx-up-arrow-alt"></i>
                                <span className="text">Up from Yesterday</span>
                            </div>
                        </div>
                        <i className="bx bx-user cart three"></i>
                    </div>

                    <div className="box box3">
                        <div className="left-side">
                            <div className="box_topic">Total HRs</div>
                            <div className="number">{totalHrs && totalHrs < 10 ? '0'+totalHrs : totalHrs}</div>
                            <div className="indicator">
                                <i className="bx bx-down-arrow-alt down"></i>
                                <span className="text">Up from Yesterday</span>
                            </div>
                        </div>
                        <i className="bx bxs-cart-download cart four"></i>
                    </div>
                </div>

                <div className="container">
                    <hr style={{background: '#F95800', height: '1px'}} />
                </div>

                {/* Graphs & Alerts Section */}
                <div className="container-fluid row">
                    <div className="col-lg-7">
                        <DashboardGraphs />
                    </div>

                    <div className="col-lg-5">
                        <DashboardAlerts />
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
                                    <Table className="striped bordered hover">
                                        <thead>
                                        <tr>
                                          <th>Pt. Name</th>
                                          <th>DOB</th>
                                          <th>Gender</th>
                                          <th>SSN</th>
                                          <th>profile</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {patients && patients.slice(0,5).map((patient, index) => (
                                        <tr key={index}>
                                          <td>{patient?.title} {patient?.firstname} {patient?.lastname}</td>
                                          <td>{moment(patient?.DOB).format("ll")}</td>
                                          {patient?.gender === 'male' ? <td><Badge bg="primary text-white" className="male-tag">Male</Badge></td> : <td className="female-tag"> <Badge bg="warning text-white" className="female-tag">Female</Badge></td>}
                                          <td>{patient?.phone1}</td>
                                          <td><Link to={{ pathname: "/patientProfile", state: {patientid: patient?._id, deviceid: patient?.deviceid}}}>Profile</Link></td>
                                        </tr>
                                        ))}
                                        </tbody>
                                      </Table>
                                      </Fragment> }
                                </div>
                            </div>

                            
                                <div className="col-md-4 col-lg-4">
                                    <h5 className="title">Recently Added Devices</h5>
                                    {devices && <Fragment>        
                                    <Table className="striped bordered hover">
                                        <thead>
                                        <tr>
                                          <th>Type</th>  
                                          <th>Device ID</th>  
                                          <th>Type</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                            {devices && devices.slice(0,5).map((device, index) => (
                                             <tr key={index}>
                                                 <td><img src="https://www.iconpacks.net/icons/2/free-stethoscope-icon-3539-thumb.png" style={{borderRadius: '50%', width: '50px', height: '50px'}} /></td>
                                                <td><Link to={{ pathname:"/devicedetails", state: {deviceid: device?.deviceId}}}>{device?._id}</Link></td>
                                                {device?.deviceType === 'bp' ? 
                                                    <td><Badge bg="warning text-white" className="male-tag">cuff</Badge></td>
                                                    : device.deviceType === 'spo2' ? <td><Badge bg="info text-white" className="male-tag">Spo2</Badge></td> : 
                                                    <td><Badge bg="danger text-white" className="male-tag">Weight</Badge></td>}
                                                </tr>
                                                ))}
                                        </tbody>
                                      </Table>
                                      </Fragment> }
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
