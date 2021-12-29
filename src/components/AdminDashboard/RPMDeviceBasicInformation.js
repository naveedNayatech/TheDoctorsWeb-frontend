import React, { Fragment } from 'react'

const RPMDeviceBasicInformation = () => {
    return (
        <Fragment>
            <small><b>Basic Information: </b></small>
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <th scope="col-md-3">Model Number</th>
                            <td scope="col-md-3">BS-2001-G1</td>
                            <th scope="col-md-3">Manufecturer</th>
                            <td scope="col-md-3">lifesense</td>
                        </tr>

                        <tr>
                            <th scope="col-md-3">Serial Number</th>
                            <td scope="col-md-3">20121300046</td>
                            <th scope="col-md-3">Status</th>
                            <td scope="col-md-3" style={{color: 'green'}}><b>Activated</b></td>
                        </tr>

                        <tr>
                            <th scope="col-md-3">Created At</th>
                            <td scope="col-md-3">2021-10-26 07:04:32</td>
                            <th scope="col-md-3">Activated At</th>
                            <td scope="col-md-3">2021-10-26 08:31:17</td>
                        </tr>

                        <tr>
                            <th scope="col-md-3">Last Active</th>
                            <td scope="col-md-3">2021-12-27 00:56:02</td>
                            <th scope="col-md-3">Connection Status</th>
                            <td scope="col-md-3" style={{color: 'red'}}><b>Disconnected</b></td>
                        </tr>

                        <tr>
                            <th scope="col-md-3">Application Version</th>
                            <td scope="col-md-3">-</td>
                            <th scope="col-md-3">MCU version</th>
                            <td scope="col-md-3"><b>-</b></td>
                        </tr>

                        <tr>
                            <th scope="col-md-3">Modem Version</th>
                            <td scope="col-md-3">D005</td>
                            <th scope="col-md-3">hardware Version</th>
                            <td scope="col-md-3">H001</td>
                        </tr>

                        <tr>
                            <th scope="col-md-3">Firmware Version</th>
                            <td scope="col-md-3">dev</td>
                            <th scope="col-md-3">User</th>
                            <td scope="col-md-3">david@thedoctorsweb.com</td>
                        </tr>
                    </tbody>
                </table>
                
                <br/>    
                <small><b>More Information</b></small>

                <table class="table table-bordered">
                    <tbody>
                            <tr>
                                <th scope="col-md-3">IMEI</th>
                                <td scope="col-md-3">864351051389668</td>
                                <th scope="col-md-3">IMSI</th>
                                <td scope="col-md-3">-</td>
                            </tr>

                            <tr>
                                <th scope="col-md-3">ICCID</th>
                                <td scope="col-md-3">-</td>
                                <th scope="col-md-3">Battery Level</th>
                                <td scope="col-md-3">100%</td>
                            </tr>
                        </tbody>
                    </table>
                           
        </Fragment>
    )
}

export default RPMDeviceBasicInformation
