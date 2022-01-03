import React, { useEffect, useState, Fragment } from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../../layouts/MetaData';
import { addRPMDevice, clearErrors } from '../../actions/adminActions';
import { useAlert } from 'react-alert';
import DateTimePicker from 'react-datetime-picker';
import { ADD_RPM_DEVICE_RESET } from '../../constants/adminConstants';


const AddRPMDevice = (props) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, success} = useSelector(state => state.device);
    const [deviceId, setDeviceId] = useState('');
    const [imei, setIMEI] = useState('');
    const [modelNumber, setModelNumber] = useState('');
    const [status, setStatus] = useState(true);
    const [signal, setSignal] = useState('high');
    const [battery, setBattery] = useState('');
    const [modemVersion, setModemVersion] = useState('');
    const [firmwareVersion, setFirmwareVersion] = useState('');
    const [manufecture, setManufecture] = useState('lifesense');
    const [connectionStatus, setConnectionStatus] = useState('connected');
    const [hardwareVersion, setHardwareVersion] = useState('H001');
    const [user, setUser] = useState('david@thedoctorweb.com');
    const [iccid, setICCID] = useState('');
    const [imsi, setIMSI] = useState('');
    const [lastActivated, onChange] = useState(new Date());


    useEffect(() => {
       
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(success) {
            alert.success('Device Added');
            props.history.push('/devices');
            dispatch({
                type: ADD_RPM_DEVICE_RESET
            });
        }



    }, [dispatch, alert, success, error])

    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(addRPMDevice(deviceId, imei, modelNumber, status, signal, battery, modemVersion, firmwareVersion, manufecture, connectionStatus, hardwareVersion, user, iccid, imsi, lastActivated));
    }

    return (
        <Fragment>
            <MetaData title="Add RPM Device"/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />

                {/* Header */}
                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded">
                    <div className="home-content">
                        <h5 className="pt-2 mt-2">Add RPM Device</h5>
                        <hr />
                    

                <form onSubmit={submitHandler}>
                    <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label htmlFor="deviceId"><i className='bx bx-devices label-icons'></i> Device ID</label>
                                <input 
                                type="text" 
                                name="deviceId" 
                                className="form-control" 
                                autoComplete="off" 
                                placeholder="Device ID"
                                required
                                value={deviceId}		
                                onChange={(e) => setDeviceId(e.target.value)}
                                />
                        </div>
                    </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="imei"><i className='bx bx-devices label-icons'></i> IMEI</label>
                                    <input 
                                    type="text" 
                                    name="imei" 
                                    className="form-control" 
                                    autoComplete="off" 
                                    placeholder="IMEI"
                                    value={imei}		
                                    onChange={(e) => setIMEI(e.target.value)}
                                    />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                    <label htmlFor="modelNumber"><i className='bx bx-devices label-icons'></i> Model Number</label>
                                        <input 
                                        type="text" 
                                        name="modelNumber" 
                                        className="form-control" 
                                        autoComplete="off" 
                                        placeholder="Model Number"
                                        value={modelNumber}		
                                        onChange={(e) => setModelNumber(e.target.value)}
                                        />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                    <label htmlFor="status"><i className='bx bx-devices label-icons'></i> Status</label>
                                    <select 
                                        name="status" 
                                        className="form-control" 
                                        value={status} 
                                        onChange={(e) => setStatus(e.target.value)}
                                        >
                                        <option value="true">Activated</option>
                                        <option value="false">De-Activated</option>
                                    </select>
                            </div>
                        </div>


                        <div className="col-md-4">
                            <div className="form-group">
                                    <label htmlFor="signal"><i className='bx bx-devices label-icons'></i> Signal</label>
                                    <select 
                                        name="signal" 
                                        className="form-control" 
                                        value={signal} 
                                        onChange={(e) => setSignal(e.target.value)}
                                        >
                                        <option value="high">High</option>
                                        <option value="medium">Medium</option>
                                        <option value="low">Low</option>
                                    </select>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="battery"><i className='bx bx-devices label-icons'></i> Battery</label>
                                    <input 
                                    type="number" 
                                    name="battery" 
                                    min="0"
                                    max="100"
                                    className="form-control" 
                                    autoComplete="off" 
                                    placeholder="Battery"
                                    value={battery}		
                                    onChange={(e) => setBattery(e.target.value)}
                                    />
                            </div>
                        </div>


                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="modemVersion"><i className='bx bx-devices label-icons'></i> Modem Version</label>
                                    <input 
                                    type="text" 
                                    name="modemVersion" 
                                    className="form-control" 
                                    autoComplete="off" 
                                    placeholder="Modem Version"
                                    value={modemVersion}		
                                    onChange={(e) => setModemVersion(e.target.value)}
                                    />
                            </div>
                        </div>


                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="firmwareVersion"><i className='bx bx-devices label-icons'></i> Firmware Version</label>
                                    <input 
                                    type="text" 
                                    name="firmwareVersion" 
                                    className="form-control" 
                                    autoComplete="off" 
                                    placeholder="Firmware Version"
                                    value={firmwareVersion}		
                                    onChange={(e) => setFirmwareVersion(e.target.value)}
                                    />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="manufecture"><i className='bx bx-devices label-icons'></i> Manufecture</label>
                                    <input 
                                    type="text" 
                                    name="manufecture" 
                                    className="form-control" 
                                    autoComplete="off" 
                                    placeholder="Manufecture"
                                    value={manufecture}		
                                    onChange={(e) => setManufecture(e.target.value)}
                                    />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label htmlFor="connectionStatus"><i className='bx bx-devices label-icons'></i> Connection Status</label>
                                    <select 
                                        className="form-control"
                                        value={connectionStatus}
                                        onChange={(e) => setConnectionStatus(e.target.value)}> Connection Status        

                                    <option value="connected"> Connected</option>
                                    <option value="disconnected"> Disconnected</option>
                                    </select>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                    <label htmlFor="hardwareVersion"><i className='bx bx-devices label-icons'></i> Hardware Version</label>
                                    <input 
                                    type="text" 
                                    name="hardwareVersion" 
                                    className="form-control" 
                                    autoComplete="off" 
                                    placeholder="Hardware Version"
                                    value={hardwareVersion}		
                                    onChange={(e) => setHardwareVersion(e.target.value)}
                                    />
                            </div>
                        </div>


                        <div className="col-md-4">
                            <div className="form-group">
                                    <label htmlFor="user"><i className='bx bx-devices label-icons'></i> User</label>
                                    <input 
                                    type="text" 
                                    name="user" 
                                    className="form-control" 
                                    autoComplete="off" 
                                    placeholder="User"
                                    value={user}		
                                    onChange={(e) => setUser(e.target.value)}
                                    />
                            </div>
                        </div>


                        <div className="col-md-4">
                            <div className="form-group">
                                    <label htmlFor="lastActivated"><i className='bx bx-devices label-icons'></i> Last Activated</label>
                                    
                                    <DateTimePicker
                                        className="form-control"
                                        onChange={onChange}
                                        value={lastActivated}
                                    />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                    <label htmlFor="iccid"><i className='bx bx-devices label-icons'></i> ICCID</label>
                                    <input 
                                    type="text" 
                                    name="iccid" 
                                    className="form-control" 
                                    autoComplete="off" 
                                    placeholder="ICCID"
                                    value={iccid}		
                                    onChange={(e) => setICCID(e.target.value)}
                                    />
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                    <label htmlFor="imsi"><i className='bx bx-devices label-icons'></i> IMSI</label>
                                    <input 
                                    type="text" 
                                    name="imsi" 
                                    className="form-control" 
                                    autoComplete="off" 
                                    placeholder="IMSI"
                                    value={imsi}		
                                    onChange={(e) => setIMSI(e.target.value)}
                                    />
                            </div>
                        </div>

                        

                    </div>

                    <button className="btn login-btn-class" type="submit"> 
                        Add Device
                    </button>
                    <br/><br/><br/>

               </form>
              </div>
            </div>




                </section>
        </Fragment>
    )
}

export default AddRPMDevice;
