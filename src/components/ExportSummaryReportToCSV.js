import React from 'react';
import { CSVLink } from 'react-csv'

const ExportSummaryReportToCSV = ({csvData, fileName}) => {

    let result = csvData.map((report, index) => {
        return {
            'Sr No':index + 1,
            'Patient Name':report?.patientName,
            'Total Readings':report?.totalReadings,
            'Total Minutes': report?.totalMinutes,
            'Month': report?.Month,
            'Category': report?.category == true ? 'CCM' : 'RPM' 
        }
    })


  return (
    <button className="accordion">
        <i className='bx bxs-cloud-upload'></i> <CSVLink data={result} filename={fileName}> <span style={{color: '#FFF'}}>Download</span></CSVLink> 
    </button>
  )
}

export default ExportSummaryReportToCSV