import React, { useEffect,  Fragment } from 'react';
import TopBar from '../AdminDashboard/TopBar';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { getPatients, getAllDevices } from '../../actions/adminActions';
import { Link } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { patientCount, patients} = useSelector(state => state.admin);
    const { deviceCount, devices} = useSelector(state => state.devices);

    useEffect(() => {
          dispatch(getPatients());
          dispatch(getAllDevices());
        
    }, [dispatch]);


    return (
        <Fragment>

        <section className="home-section">
            <TopBar />

            {/*  Home content  */}
            <div className="home-content">
                <div className="overview-boxes">
                    <div className="box">
                        <div className="left-side">
                            <div className="box_topic">Total Patients</div>
                            <div className="number">{patientCount && patientCount < 10 ? '0'+patientCount : patientCount }</div>
                            <div className="indicator">
                                <i className="bx bx-up-arrow-alt"></i>
                                <span className="text">Up from Yesterday</span>
                            </div>
                        </div>
                        <i className="bx bx-user cart"></i>
                    </div>

                    <div className="box box1">
                        <div className="left-side">
                            <div className="box_topic">RPM Devices</div>
                            <div className="number">{deviceCount && deviceCount < 10 ? '0'+deviceCount : deviceCount }</div>
                            <div className="indicator">
                                <i className="bx bx-up-arrow-alt"></i>
                                <span className="text">Up from Yesterday</span>
                            </div>
                        </div>
                        <i className="bx bx-devices cart two"></i>
                    </div>

                    <div className="box">
                        <div className="left-side">
                            <div className="box_topic">Total Staff</div>
                            <div className="number">120</div>
                            <div className="indicator">
                                <i className="bx bx-up-arrow-alt"></i>
                                <span className="text">Up from Yesterday</span>
                            </div>
                        </div>
                        <i className="bx bx-user cart three"></i>
                    </div>

                    <div className="box">
                        <div className="left-side">
                            <div className="box_topic">Total Profit</div>
                            <div className="number">63,300</div>
                            <div className="indicator">
                                <i className="bx bx-down-arrow-alt down"></i>
                                <span className="text">Up from Yesterday</span>
                            </div>
                        </div>
                        <i className="bx bxs-cart-download cart four"></i>
                    </div>
                </div>

                <div className="container">
                    <hr />
                </div>

                {/* Sales Content */}
                <div className="sales-boxes">
                    <div className="recent-sale box">
                        <div className="container-fluid row">
                            <div className="col-lg-8 col-md-8">
                                <h5 className="title">Recently Added Patients</h5>
                                <div className="sales-details">
                                {patients && <Fragment>
                                    <table className="table table-bordered">
                                        <thead>
                                          <th>P Name</th>
                                          <th>Email</th>
                                          <th>Gender</th>
                                          <th>Phone #</th>
                                          <th>profile</th>
                                        </thead>
                                        <tbody>
                                        {patients && patients.map((patient, index) => (
                                        <tr key={index}>
                                          <td>{patient?.title} {patient?.firstname} {patient?.lastname}</td>
                                          <td>{patient?.email}</td>
                                          <td>{patient?.gender}</td>
                                          <td>{patient?.contactno}</td>
                                          <td><Link to={{ pathname: "/patientProfile", state: {patientid: patient?._id, deviceid: patient?.deviceid}}}>Profile</Link></td>
                                        </tr>
                                        ))}
                                        </tbody>
                                      </table>
                                      </Fragment> }
                                </div>
                            </div>

                            
                                <div className="col-md-4 col-lg-4">
                                    <h5 className="title">RPM Devices</h5>
                                    {devices && <Fragment>        
                                    <table className="table table-bordered">
                                        <thead>
                                          <th>Type</th>  
                                          <th>Device (SN)</th>  
                                          <th>Status</th>
                                        </thead>
                                        <tbody>
                                            {devices && devices.map((device, index) => (
                                             <tr>
                                                 <td><img src="https://www.iconpacks.net/icons/2/free-stethoscope-icon-3539-thumb.png" style={{borderRadius: '50%', width: '50px', height: '50px'}} /></td>
                                                <td><Link to={{ pathname:"/devicedetails", state: {deviceid: device?.deviceId}}}>{device?.deviceId}</Link></td>
                                                {device?.status === true ? <td style={{color: 'green', fontWeight: 'bold'}}>Activated</td> : <td style={{color: 'red', fontWeight: 'bold'}}>Deactivated</td>}
                                             </tr>
                                            ))}
                                        </tbody>
                                      </table>
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
