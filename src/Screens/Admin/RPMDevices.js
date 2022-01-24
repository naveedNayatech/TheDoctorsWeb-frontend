import React, { useEffect, Fragment } from 'react';
import Sidebar  from '../../components/AdminDashboard/Sidebar';
import TopBar  from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDevices } from '../../actions/adminActions';
import { useAlert } from 'react-alert'; 
import Loader from '../../layouts/Loader';
import moment from 'moment';
import { Badge } from 'react-bootstrap';

const RPMDevices = () => {

    const dispatch = useDispatch();

    const alert = useAlert();

    const { loading, error, deviceCount, devices} = useSelector(state => state.devices);


    useEffect(() => {
        if(error){
            return alert.error(error);
        }

        dispatch(getAllDevices());
    }, [dispatch, alert, error])


    return (
        <Fragment>
              <MetaData title="RPM Devices "/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />
                {loading ? <Loader /> : ( <Fragment>    
                <div className="shadow-lg p-3 mb-2 mr-4 ml-4 rounded">
                
                    <div className="home-content">
                                <div className="row">
                                    <div className="col-md-9">
                                        <h5 className="pt-2">My Devices ( {deviceCount && deviceCount} ) </h5>
                                    </div>

                                    <div className="col-md-3 mt-2 pt-2">
                                        <Link to="device" style={{ float: 'right'}}>
                                            <small>Add RPM Device</small>
                                        </Link>
                                    </div>
                                </div>
                            <hr /> 
                        </div>

                        {/* Devices List Card */}
                        <div className="col-md-12">
                         <Fragment>
                         {devices && <Fragment>
                            <table className="table table-sm table-striped">
                            <tr>
                                <th>Device ID</th>
                                <th>IMEI</th>
                                <th>Device Type </th>
                                <th>Broken</th>
                                <th>Firmware Version</th>
                                <th>Hardware Version</th>
                                <th>Action</th>
                            </tr> 

                            <tbody>      
                            {devices && devices.map((device, index) => (                      
                                <tr align="center" key={device}>
                                    <td><Link to={{ pathname:"/devicedetails", state: {deviceid: device?.deviceId}}}>{device?.deviceId}</Link></td>
                                    <td>{device?.imei ? device?.imei : 'N/A'}</td>
                                    {device?.deviceType === 'bp' ? 
                                    <td><Badge bg="warning text-white" className="male-tag">cuff</Badge></td>
                                        : device.deviceType === 'spo2' ? <td><Badge bg="info text-white" className="male-tag">Spo2</Badge></td> : 
                                        <td><Badge bg="danger text-white" className="male-tag">Weight</Badge></td>}
                                    {device?.broken === true ? <td style={{color: 'red', fontWeight: 'bold'}}>Broken</td> : <td>unbroken</td> }
                                    <td>{device?.firmwareVersion ? device?.firmwareVersion : 'N/A'}</td>
                                    {device?.assigned_patient_id ? <td style={{color: 'gray', fontWeight: 'bold'}}>Assigned</td> : <td style={{color: 'green', fontWeight: 'bold'}}>In Stock</td>}
                                    <td>
                                        <Link to={{ pathname:"/devicedetails", state: {deviceid: device?.deviceId}}} className="rounded-button-profile"><i className='bx bx-list-ul'></i></Link>
                                        <Link to="/devices" className="rounded-button-deactivate"><i className='bx bx-power-off'></i></Link>
                                    </td>
                                </tr>                      
                                ))}
                             </tbody>
                            </table>   
                            </Fragment> 
                            } 
                          </Fragment>                
                         </div>
                        </div>
                    </Fragment> 
                    )}
                </section>
                
        </Fragment>
    )
}

export default RPMDevices
