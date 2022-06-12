import React, {useState} from 'react';
import MetaData from '../../layouts/MetaData';
import  HRSidebar from '../../components/HR/HRSidebar';
import HRTopBar from '../../components/HR/HRTopbar';
import {useAlert} from 'react-alert';
import { TIME_SUMMARY_REPORT_RESET } from '../../constants/adminConstants';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector} from 'react-redux';
import { getTimeSummaryReportByHR } from '../../actions/adminActions';
import ExportSummaryReportToCSV from '../../components/ExportSummaryReportToCSV';

const HRSummaryReport = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const [month, setMonth] = useState('06');
  const [year, setYear] = useState('2022');

  const { hr } = useSelector(state => state.hrAuth);
  const {loading, timeSummaryReport} = useSelector(state => state.summaryReport);

  const generateTimeSummaryByHR = () => {
     if(!month){
      alert.error('Please select month');
      return;
    } else if(!year){
      alert.error('Please select month');
      return;
    } else {
      dispatch(getTimeSummaryReportByHR(hr?._id, month, year));
    }
  }

  const resetReport = () => {
    dispatch({
        type: TIME_SUMMARY_REPORT_RESET
    })
  }  


  return (
    <>
     <MetaData title="Time Summary Report" />
            <HRSidebar />
            
            <section className="home-section">
                {/* TopBar */}  
                <HRTopBar />

        <>
            <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
                <div className="home-content">
                    <div className="container">
                            <h5 >Time Summary <span style={{color: '#004aad'}}> Report </span> </h5> 
                            <hr />
                            <span className="notes-header"><b>Note: </b> You can generate time summary report selecting month and year.</span>

                            <div className="row cardWrapper">
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
                                <button className="submit-btn" onClick={generateTimeSummaryByHR}>Generate</button>
                            </div>
                            </div>

                        </div>
                  </div>

                  <br />
                  {timeSummaryReport && timeSummaryReport?.length > 0 ? <>
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
                {loading ? <Loader /> : <>
                   {timeSummaryReport && timeSummaryReport?.length > 0 ? <>
                        <div className="text-center"><span style={{ 
                            color: '#004aad',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}>{timeSummaryReport?.length}</span> records found.</div>
                   </> : <>
                   <div className="text-center">
                       <b>No Result Found.</b>
                   </div>
                   </>} 
                </>}

              </div>
        </>
      </section>
    
    </>
  )
}

export default HRSummaryReport;