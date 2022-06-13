import React from 'react';
import {Table} from 'react-bootstrap';
import moment from 'moment';

const AccountCreatedLogType = ({reportBy, logType, logs}) => {
  return (
    <div>
         <Table striped hover bordered>
            <thead align="center">
                <tr>
                    <th>Created By</th>
                    <th>Role</th>
                    <th>Patient Name</th>
                    <th>Patient Email</th>
                    <th>Log Detail</th>
                    <th>Date & Time</th>
                </tr> 
            </thead>
            <tbody>
            {logs && logs.map((log, index) => (
            <tr key={index}>
                {reportBy === 'doctor' && logType === 'accountCreated' ? <>
                    <td>Dr. {log?.doctor_id?.firstname} {log?.doctor_id?.lastname}
                        <p style={{color: 'gray'}}>{log?.doctor_id?.gender}</p>
                    </td>
                    <td>{log?.doctor_id?.role}</td>
                    <td>{log?.patient_id?.firstname} {log?.patient_id?.lastname}</td>
                    <td style={{wordWrap: 'break-word'}}>{log?.patient_id?.email}</td>
                    <td>{log?.text}</td>
                    <td>{moment(log?.createdAt).tz('America/New_York').format("lll")} (EST)</td>
                </> : <>
                <td>HR. {log?.hr_id?.firstname} {log?.hr_id?.lastname}
                        <p style={{color: 'gray'}}>{log?.hr_id?.gender}</p>
                    </td>
                    <td>{log?.hr_id?.role}</td>
                    <td>{log?.patient_id?.firstname} {log?.patient_id?.lastname}</td>
                    <td style={{wordWrap: 'break-word'}}>{log?.patient_id?.email}</td>
                    <td>{log?.text}</td>
                    <td>{moment(log?.createdAt).tz('America/New_York').format("lll")} (EST)</td>
                </>}
            </tr>
            ))}
            </tbody>
        </Table>
    </div>
  )
}

export default AccountCreatedLogType