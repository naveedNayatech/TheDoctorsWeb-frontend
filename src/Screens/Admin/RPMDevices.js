import React, { useState, useEffect, Fragment } from 'react';
import Sidebar  from '../../components/AdminDashboard/Sidebar';
import TopBar  from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDevices, sortRPMDevicesByBroken, sortRPMDevices, deleteRPMDevice } from '../../actions/adminActions';
import { useAlert } from 'react-alert'; 
import Loader from '../../layouts/Loader';
import moment from 'moment';
import { Badge, Modal } from 'react-bootstrap';
import { DELETE_RPM_DEVICE_RESET } from '../../constants/adminConstants';

const RPMDevices = (props) => {

    const dispatch = useDispatch();

    const alert = useAlert();

    const { loading, error, deviceCount, devices, isDeleted } = useSelector(state => state.devices);

    const [deviceModel, setDeviceModel] = useState(null);
    const [deviceToDelete, setDeviceToDelete] = useState(null);

    const [smShow, setSmShow] = useState(false); //small confirm modal

    useEffect(() => {
        if(error){
            return alert.error(error);
        }

        if(isDeleted) {
            alert.success('Deleted');
            props?.history.push('/devices');
            dispatch({
                type: DELETE_RPM_DEVICE_RESET
            });
            setSmShow(false);    
        }

        dispatch(getAllDevices());
    }, [dispatch, alert, error, isDeleted])

    const sortDevices = (event) => {
        let updatedValue = event.target.value;

        if (updatedValue === "true" || updatedValue == "false") {
            updatedValue = JSON.parse(updatedValue);
        }

        dispatch(sortRPMDevices(updatedValue));
    }

    const sortDevicesByBroken = (event) => {
        let brokenValue = event.target.value;

        if (brokenValue === "true") {
            brokenValue = JSON.parse(brokenValue);
        }

        dispatch(sortRPMDevicesByBroken(brokenValue));
    }

    const deleteHandler = () => {
        console.log('Deleted');
        dispatch(deleteRPMDevice(deviceToDelete));
    }

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
                                    <div className="col-md-6">
                                        {deviceCount ? 
                                        <h5 className="pt-2">Inventory <span style={{color: '#F95800'}}>( {deviceCount < 10 ? '0'+deviceCount : deviceCount} )</span> </h5> : null
                                        }
                                        
                                    </div>

                                    <div className="col-md-2">
                                        <select name="listDevice" 
                                            className="form-control shadow-none"
                                            defaultValue={'List Device By'}
                                            onChange={sortDevices}
                                        >
                                            <option disabled>List Device By</option>
                                            <option value="true"> In Stock</option>
                                            <option value="false"> Out Of Stock</option>
                                        </select>
                                    </div>

                                    <div className="col-md-2">
                                        <select name="listDevice" 
                                            className="form-control shadow-none"
                                             defaultValue={'Sort By'}
                                             onChange={sortDevicesByBroken}
                                        >
                                            <option disabled>Sort By</option>
                                            <option value="true"> Broken</option>
                                        </select>
                                    </div>

                                    <div className="col-md-2 mt-2 pt-2">
                                        <Link to="/device" style={{ float: 'right'}}>
                                            <small>Add New RPM Device</small>
                                        </Link>
                                    </div>
                                </div>
                            <hr className="blue-hr"/> 
                        </div>

                        {/* Devices List Card */}
                          {/* Devices List Card */}
                          <div className="col-md-12">
                         <Fragment>
                         {devices && <Fragment>
                            <table className="table table-sm table-striped">
                            <thead align="center">
                                <tr>
                                    <th>Device ID</th>
                                    <th>IMEI</th>
                                    <th>Device Type </th>
                                    <th>Broken</th>
                                    <th>Firmware Version</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr> 
                            </thead>

                            <tbody>      
                            {devices && devices.map((device, index) => (                      
                                <tr align="center" key={index}>
                                    <td><Link to={{ pathname:"/devicedetails", state: {id: device?._id}}}>{device?._id}</Link></td>
                                    <td>{device?.imei ? device?.imei : 'N/A'}</td>
                                    {device?.deviceType === 'bp' ? 
                                    <td><Badge bg="warning text-white" className="male-tag">cuff</Badge></td>
                                        : device.deviceType === 'spO2' ? <td><Badge bg="info text-white" className="male-tag">Spo2</Badge></td> : 
                                        <td><Badge bg="danger text-white" className="male-tag">Weight</Badge></td>}
                                    {device?.broken === true ? <td style={{color: 'red', fontWeight: 'bold'}}>Broken</td> : <td>unbroken</td> }
                                    <td>{device?.firmwareVersion ? device?.firmwareVersion : 'N/A'}</td>
                                    {device?.assigned_patient_id ? <td style={{color: 'gray', fontWeight: 'bold'}}>Assigned</td> : <td style={{color: 'green', fontWeight: 'bold'}}>In Stock</td>}
                                    <td>
                                        <Link to={{ pathname:"/devicedetails", state: {id: device?._id}}} className="rounded-button-profile"><i className='bx bx-list-ul'></i></Link>
                                        <Link to={{ pathname:"/updatedevice", state: {deviceDetails: device}}} className="rounded-button-edit"><i className='bx bx-edit-alt'></i></Link>                       
                                        <Link to="/devices" className="rounded-button-delete" onClick={() => {setSmShow(true); setDeviceModel(device?._id); setDeviceToDelete(device?._id)}} ><i className='bx bx-minus'></i></Link>
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

                        <Modal
                            size="sm"
                            show={smShow}
                            onHide={() => setSmShow(false)}
                            aria-labelledby="example-modal-sizes-title-sm"
                        >
                            <Modal.Body>
                                <small style={{color: 'gray'}}>Are you sure you want to delete RPM device having model number
                                    <span style={{color: '#000'}}> {deviceModel}</span> ?
                                 </small>
                            </Modal.Body>

                            <Modal.Footer>
                                <button className="btn btn-sm btn-danger" onClick={deleteHandler}>Delete</button>
                            </Modal.Footer>
                        </Modal>
                    </Fragment> 
                    )}
                </section>
                
        </Fragment>
    )
}

export default RPMDevices
