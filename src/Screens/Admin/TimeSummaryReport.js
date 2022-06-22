import React, {useState, useEffect} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import doctorIcon from '../../assets/Images/doctorIcon.png';
import Select from 'react-select';
import hrIcon from '../../assets/Images/network.png';
import { useAlert } from 'react-alert';
import { getDoctors, getHrLists, getTimeSummaryReportByDoctor, getTimeSummaryReportByHR } from '../../actions/adminActions';
import { useDispatch, useSelector} from 'react-redux';
import Loader from '../../layouts/Loader';
import { TIME_SUMMARY_REPORT_RESET } from '../../constants/adminConstants';
import ExportSummaryReportToCSV from '../../components/ExportSummaryReportToCSV';
import { Table } from 'react-bootstrap';

const TimeSummaryReport = () => {
  
  const dispatch = useDispatch();
  const [reportBy, setReportBy] = useState('doctor');
  const alert = useAlert();

  const { error, doctors } = useSelector(state => state.doctor);
  const {  hrs } = useSelector(state => state.hrslist);
  const {loading, timeSummaryReport} = useSelector(state => state.summaryReport);
  const [doctorId, setDoctorId] = useState("");
  const [hrId, sethrId] = useState("");

  const [month, setMonth] = useState('06');
  const [year, setYear] = useState('2022');


  useEffect(() => {
    if(error){
        alert.error(error);
    }

    dispatch(getDoctors(10, 1));
    dispatch(getHrLists());
    
}, [dispatch]);

  const doctorOptions = []
    doctors && doctors.map((doctor) => (
        doctorOptions.push({ value: doctor?._id, label: [doctor?.firstname, doctor?.lastname].join(" ")})
    ))

    const hrOptions = []
    hrs && hrs.map((hr) => (
        hrOptions.push({ value: hr?._id, label: [hr?.firstname, hr?.lastname].join(" ")})
  ))

  const getDoctorProfile = (doctor) => {
    setDoctorId(doctor.value);
}

  const getHRProfile = (hr) => {
    sethrId(hr.value);
  }

  const generateTimeSummaryByDoctor = () => {
    if(!doctorId) {
        alert.error('Please select doctor');
        return;
    } else if(!month){
      alert.error('Please select month');
      return;
    } else if(!year){
      alert.error('Please select month');
      return;
    } else {
      dispatch(getTimeSummaryReportByDoctor(doctorId, month, year));
    }
  }

  const generateTimeSummaryByHR = () => {
    if(!hrId) {
        alert.error('Please select HR');
        return; 
    }  else if(!month){
      alert.error('Please select month');
      return;
    } else if(!year){
      alert.error('Please select month');
      return;
    } else {
      dispatch(getTimeSummaryReportByHR(hrId, month, year));
    }
  }

  const resetReport = () => {
    dispatch({
        type: TIME_SUMMARY_REPORT_RESET
    })
} 


  return (
    <>
    <MetaData title="Time Summary Report"/>
        <Sidebar />    

        <section className="home-section">
        {/* TopBar */}
        <TopBar />

        <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded-card" style={{backgroundColor: '#FAFAFA'}}>
            <div className="home-content">
                <h5 className="pt-2 mt-2">Time Summary<span style={{color: '#004aad'}}> Report </span></h5>
                <hr />

                <span className="notes-header"><b>Note: </b> You can generate time summary report by doctor and by HR.</span>

                <div className="row cardWrapper">
                    <div className={`card cardButton ${reportBy === "doctor" ? "cardActive" : ""}`}
                        onClick={() => setReportBy("doctor")}>
                    <img src={doctorIcon} alt="" height="80" width="80"/>
                        By Doctor
                    </div>

                    <div className={`card cardButton ${reportBy === "hr" ? "cardActive" : ""}`} 
                        onClick={() => setReportBy("hr")}>
                    <img src={hrIcon} alt="" height="80" width="80"/>
                        By HR
                    </div>
                </div>


                <div>
                {reportBy === "doctor" ?  <>
                <span className="notes-header"><b>Note: </b> Please select doctor, start date and end date to generate report.</span>
                
                <div className="row-display">
                <div className="col-md-4 mt-4">
                <label>Select Doctor  <span style={{color: '#004aad'}}> *</span>  </label>
                <Select
                    options={doctorOptions}
                    onChange={getDoctorProfile}
                    className="react-selectbox"
                />
                </div>

                <div className="col-md-3 mt-4">
                    <label>Month  <span style={{color: '#004aad'}}> *</span>  </label>
                    <select 
                      name="month" 
                      className="form-control"
                      value={month} 
                      onChange={e => setMonth(e.target.value)}
                      >
                      <option value="01">January</option>
                      <option value="02">February</option>
                      <option value="03">March</option>
                      <option value="04">April</option>
                      <option value="05">May</option>
                      <option value="06">June</option>
                      <option value="07">July</option>
                      <option value="08">August</option>
                      <option value="09">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                </div>

                <div className="col-md-3 mt-4">
                    <label>Year <span style={{color: '#004aad'}}> *</span></label>
                    <select 
                      name="month" 
                      className="form-control"
                      value={year} 
                      onChange={e => setYear(e.target.value)}
                      >
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                    </select>
                        
                </div>

                <div className="col-md-3 mt-4">
                    <label>Action</label>
                    <button className="submit-btn" onClick={generateTimeSummaryByDoctor}>Generate</button>
                </div>
                </div>
                </> : <>
                <span className="notes-header"><b>Note: </b> Please select HR, start date and end date to generate report.</span>
                
                <div className="row-display">
                <div className="col-md-4 mt-4">
                <label>Select HR  <span style={{color: '#004aad'}}> *</span>  </label>
                <Select
                    options={hrOptions}
                    onChange={getHRProfile}
                    className="react-selectbox"
                />
                </div>

                <div className="col-md-3 mt-4">
                <label>Month  <span style={{color: '#004aad'}}> *</span>  </label>
                    <select 
                      name="month" 
                      className="form-control"
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      >
                      <option value="01">January</option>
                      <option value="02">February</option>
                      <option value="03">March</option>
                      <option value="04">April</option>
                      <option value="05">May</option>
                      <option value="06">June</option>
                      <option value="07">July</option>
                      <option value="08">August</option>
                      <option value="09">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                </div>

                <div className="col-md-3 mt-4">
                <label>Year <span style={{color: '#004aad'}}> *</span></label>
                    <select 
                       name="month" 
                       className="form-control"
                       value={year}
                       onChange={(e) => setYear(e.target.value)}
                       >
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                    </select>
                </div>

                <div className="col-md-3 mt-4">
                    <label>Action</label>
                    <button className="submit-btn" onClick={generateTimeSummaryByHR}>Generate</button>
                </div>
                </div>
                </>
                }
                </div>
            </div>

            {timeSummaryReport && timeSummaryReport?.length > 0 ? <>
                    <hr />
                    <div className="row-display">
                    <div className="col-md-7">

                    </div>
                    <button className="accordion" onClick={resetReport}><i className='bx bxs-file-pdf'></i> Reset</button> &nbsp;    
                    
                    <div>
                        <div
                            style={{ display: "none" }}// This make ComponentToPrint show   only while printing
                        > 
                        </div>
                        {/* <button className="accordion"><i className='bx bxs-file-pdf'></i> Download Excel</button> */}
                        <div className="col-md-2 col-lg-2">
                            <ExportSummaryReportToCSV csvData={timeSummaryReport} fileName="Summary Telemetary Report.csv" />
                        </div>
                    </div>
                </div>
              </> : null }

            <br />
            <br />
                {loading ? <Loader /> : <>
                {timeSummaryReport && timeSummaryReport?.length > 0 ? <>
                        <div className="row-display">
                          <div style={{ 
                              fontSize: '14px',
                              backgroundColor: 'gray',
                              color: '#FFF',
                              padding: '5px',
                              width: '180px',
                              borderRadius: '20px', 
                              textAlign: 'center',
                              height: '30px'
                          }}><span>{timeSummaryReport?.length}</span> record(s) found.
                          </div>
                          
                          <span><b>Report Preview</b></span>
                          
                          <div>
                            <span style={{color: '#9B111E'}}>
                              <small>
                                <i class='bx bxs-circle'></i> Shows reading {'<'} 16 | minutes {'<'} 20
                              </small>
                            </span> 
                            
                            <br />

                            <span style={{color: '#009150'}}>
                              <small>
                                <i class='bx bxs-circle'></i> Shows reading {'>'} 16 | minutes {'>'} 20
                                </small>
                              </span>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <br />
                        <Table striped hover bordered>
                            <thead align="center">
                                <tr>
                                <th>Sr.</th>
                                <th>Patient Name</th>
                                <th>Total Readings Received </th>
                                <th>Total Minutes</th>
                                <th>Month</th>
                                </tr>

                                {timeSummaryReport && timeSummaryReport.map((summaryReport, index) => (
                                  <tr key={index}> 
                                    <td>{index + 1}</td>
                                    <td style={{wordWrap: 'break-word'}}>{summaryReport?.patientName}</td>
                                    {summaryReport.totalReadings > 16 ? <td style={{backgroundColor: '#009150', color: '#FFF', wordWrap: 'break-word'}}>{summaryReport?.totalReadings}</td> : <td style={{backgroundColor: '#9B111E', color: '#FFF', wordWrap: 'break-word'}}>{summaryReport?.totalReadings}</td>}
                                    {summaryReport?.totalMinutes < 20 ? <td style={{backgroundColor: '#9B111E', color: '#FFF'}}>{summaryReport?.totalMinutes} mins</td> : <td style={{backgroundColor: '#009150', color: '#FFF'}}>{summaryReport?.totalMinutes} mins</td>}
                                    <td style={{wordWrap: 'break-word'}}>{summaryReport?.Month}</td>
                                  </tr>
                                ))}
                            </thead>
                            <tbody>
                                  
                            </tbody>
                          </Table>
                        </div>


                   </> : <>
                   <div className="text-center">
                       <b>No Result Found.</b>
                   </div>
                   </>} 
                </>}
        </div>

        </section>
    </>
  )
}

export default TimeSummaryReport;