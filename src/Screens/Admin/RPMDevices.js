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
                            <thead align="center">
                                <th>SERIAL NUMBER </th>  
                                <th>IMEI</th>
                                <th>MODEL NUMBER</th>
                                <th>STATUS </th>
                                <th>LAST ACTIVE</th>
                                <th>SIGNAL</th>
                                <th>BATTERY</th>
                                <th>ACTION</th> 
                            </thead>

                            <tbody>      
                            {devices && devices.map((device, index) => (                      
                                <tr align="center" key={device}>
                                    <td><Link to={{ pathname:"/devicedetails", state: {deviceid: device?.deviceId}}}>{device?.deviceId}</Link></td>
                                    <td>{device?.imei}</td>
                                    <td>{device?.modelNumber}</td>
                                    {device?.status === true ? <td style={{color: 'green', fontWeight: 'bold'}}>Activated</td> : <td style={{color: 'red', fontWeight: 'bold'}}>Deactivated</td>}
                                    <td>{moment(device?.lastActive).format("lll")}</td>
                                    <td style={{color: 'red'}}>{device?.signal}</td>
                                    <td>{device?.battery}%</td>
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
