import React from 'react'
import { CSVLink } from 'react-csv'
import Button from 'react-bootstrap/Button';
import moment from 'moment';

export const ExportReactCSV = ({csvData, fileName}) => {

    let result = csvData.map((patient, index) => {
        return {
            'Sr No':index + 1,
            'initial Month':'February',
            'First Name':patient?.firstname,
            'Last Name': patient.lastname,
            'DOB': moment(patient?.DOB).format("ll"),
            'Gender': patient?.gender,
            'Email': patient?.email,
            'Phone 1':patient?.phone1,
            'Diseases': patient?.diseases,
            'Doctor Firstname': patient?.assigned_doctor_id?.firstname,
            'Doctor Lastname': patient?.assigned_doctor_id?.lastname,
            'DeviceId (01)': patient?.assigned_devices[0]?.deviceObjectId?._id,
            'DeviceType (01)': patient?.assigned_devices[0]?.deviceObjectId?.deviceType,
            'DeviceId (02)': patient?.assigned_devices[1]?.deviceObjectId?._id,
            'DeviceType (02)': patient?.assigned_devices[1]?.deviceObjectId?.deviceType,
        }
    })


    return (
        <button className="excelreportbutton">
           <i className='bx bxs-cloud-upload'></i> <CSVLink data={result} filename={fileName}> <span style={{color: '#FFF'}}>Download</span></CSVLink> 
        </button>
    )
}

export default ExportReactCSV;