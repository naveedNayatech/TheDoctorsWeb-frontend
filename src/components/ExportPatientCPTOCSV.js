import React, {Fragment} from 'react';
import { CSVLink } from 'react-csv'
const moment = require('moment-timezone');

const ExportPatientCPTOCSV = ({csvData, fileName}) => {

    let result = csvData.map((patient, index) => {
        return {
            'Sr No':index + 1,
            'Pt FName':patient?.firstname,
            'Pt LName': patient.lastname,
            'Pt DOB': moment(patient?.DOB).tz("America/New_York").format("ll"),
            'Pt Gender': patient?.gender,
            'Pt Email': patient?.email,
            'Pt Phone 1':patient?.phone1,
            'Pt Address':patient?.address,
            'Pt City':patient?.city,
            'Pt State':patient?.state,
            'Pt zipCode':patient?.zipCode,
            'Pt SSN':patient?.ssn,
            'Pt Diseases': patient?.diseases,
            'Pt Insurance Companies': patient?.insurancecompany,
            'Pt Initial Setup': patient?.initialsetup,
            'Account Created Date':moment(patient?.createdAt).tz("America/New_York").format("ll"),
            ' ': ' ',
            'Dr FName': patient?.assigned_doctor_id?.firstname,
            'Dr LName': patient?.assigned_doctor_id?.lastname,
            'Dr Gender': patient?.assigned_doctor_id?.gender,
            ' ':' ',
            'HR FName':patient?.assigned_hr_id?.firstname,
            'HR LName':patient?.assigned_hr_id?.lastname,
            'HR DOB': moment(patient?.assigned_hr_id?.DOB).tz("America/New_York").format("ll"),
            'HR Email': patient?.assigned_hr_id?.email,
            'HR Phone 1': patient?.assigned_hr_id?.phone1,
            ' ':' ',
            'DeviceId (01)': patient?.assigned_devices[0]?.deviceObjectId?._id,
            'DeviceType (01)': patient?.assigned_devices[0]?.deviceObjectId?.deviceType,
            'Device Model Number (01)': patient?.assigned_devices[0]?.deviceObjectId?.modelNumber,
            'DeviceId (02)': patient?.assigned_devices[1]?.deviceObjectId?._id,
            'DeviceType (02)': patient?.assigned_devices[1]?.deviceObjectId?.deviceType,
            'Device Model Number (02)': patient?.assigned_devices[1]?.deviceObjectId?.modelNumber,
        }
    })


  return (
    <Fragment>
        <button className="excelreportbutton">
           <i className='bx bxs-cloud-upload'></i> <CSVLink data={result} filename={fileName}> <span style={{color: '#FFF'}}>Download</span></CSVLink> 
        </button>
    </Fragment>
  )
}

export default ExportPatientCPTOCSV