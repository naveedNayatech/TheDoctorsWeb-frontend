import React, { Fragment } from 'react';
import moment from 'moment';

const RPMDeviceBasicInformation = (props) => {

    let deviceDetails = props?.deviceData;

    return (
        <Fragment>
            <small><b>Basic Information: </b></small>
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <th scope="col-md-3">Model Number</th>
                            <td scope="col-md-3">{deviceDetails?.modelNumber}</td>
                            <th scope="col-md-3">Manufecturer</th>
                            <td scope="col-md-3">{deviceDetails?.manufecture}</td>
                        </tr>

                        <tr>
                            <th scope="col-md-3">Serial Number</th>
                            <td scope="col-md-3">{deviceDetails?.deviceId}</td>
                            <th scope="col-md-3">Status</th>
                            <td scope="col-md-3" style={{color: deviceDetails?.status === true ? 'green': 'red'}}><b>{deviceDetails?.status === true ? 'Activated' : 'De-Activated'}</b></td>
                        </tr>

                        <tr>
                            <th scope="col-md-3">Created At</th>
                            <td scope="col-md-3">{moment(deviceDetails?.createdAt).format("lll")}</td>
                            <th scope="col-md-3">Activated At</th>
                            <td scope="col-md-3">2021-10-26 08:31:17</td>
                        </tr>

                        <tr>
                            <th scope="col-md-3">Last Active</th>
                            <td scope="col-md-3">{deviceDetails?.lastActive}</td>
                            <th scope="col-md-3">Connection Status</th>
                            <td scope="col-md-3" style={{color: 'red'}}><b>{deviceDetails?.connectionStatus}</b></td>
                        </tr>

                        <tr>
                            <th scope="col-md-3">Application Version</th>
                            <td scope="col-md-3"><b>-</b></td>
                            <th scope="col-md-3">MCU version</th>
                            <td scope="col-md-3"><b>-</b></td>
                        </tr>

                        <tr>
                            <th scope="col-md-3">Modem Version</th>
                            <td scope="col-md-3">{deviceDetails?.modemVersion}</td>
                            <th scope="col-md-3">hardware Version</th>
                            <td scope="col-md-3">{deviceDetails?.hardwareVersion}</td>
                        </tr>

                        <tr>
                            <th scope="col-md-3">Firmware Version</th>
                            <td scope="col-md-3">{deviceDetails?.firmwareVersion}</td>
                            <th scope="col-md-3">User</th>
                            <td scope="col-md-3">{deviceDetails?.User}</td>
                        </tr>
                    </tbody>
                </table>
                
                <br/>    
                <small><b>More Information</b></small>

                <table className="table table-bordered">
                    <tbody>
                            <tr>
                                <th scope="col-md-3">IMEI</th>
                                <td scope="col-md-3">{deviceDetails?.imei}</td>
                                <th scope="col-md-3">IMSI</th>
                                <td scope="col-md-3">{deviceDetails?.imsi === ' ' ? deviceDetails?.imsi : 'N/A'}</td>
                            </tr>

                            <tr>
                                <th scope="col-md-3">ICCID</th>
                                <td scope="col-md-3">{deviceDetails?.iccid === ' ' ? deviceDetails?.iccid : 'N/A'}</td>
                                <th scope="col-md-3">Battery Level</th>
                                <td scope="col-md-3">{deviceDetails?.battery}</td>
                            </tr>
                        </tbody>
                    </table>
                           
        </Fragment>
    )
}

export default RPMDeviceBasicInformation
