import React, {useEffect, useState, Fragment} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import { getPatients, patientProfile, getHrLists } from '../../actions/adminActions';
import { getTimeReport, getTimeReportByHR } from '../../actions/HRActions';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { RESET_TIME_REPORT_DATA } from '../../constants/HRConstants';
import Loader from '../../layouts/Loader';


const AdminTimeReport = () => {

    const dispatch = useDispatch();

    const { patients} = useSelector(state => state.admin);
    const { patient } = useSelector(state => state.patientProfile);
    const { loading, targets, totalTime} = useSelector(state => state.target);
    const { hrs } = useSelector(state => state.hrslist);

    const [patientId, setPatientId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [hrId, setHRId] = useState('');
    const [reportBy, setReportBy] = useState('patient');

    useEffect(() =>{
        dispatch(getPatients());

        if(patientId) {
            dispatch(patientProfile(patientId));
        }

        dispatch(getHrLists());

    }, [dispatch, patientId])

    const submitHandler = () => {
        if(reportBy === 'patient'){
            dispatch(getTimeReport(patientId, patient?.assigned_hr_id?._id, startDate, endDate)); 
        }
        else {
            dispatch(getTimeReportByHR(hrId, startDate, endDate)); 
        }
    }

    const resetData = () => {
        dispatch({ type: RESET_TIME_REPORT_DATA });
    }

  return <Fragment>
      <MetaData title="Time Report"/>
        <Sidebar />    

        <section className="home-section">
        {/* TopBar */}
        <TopBar />

        <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded-card" style={{backgroundColor: '#FAFAFA'}}>
            <div className="home-content">

            <div className="col-md-7">
                <h5 className="pt-2 mt-2">Time <span style={{color: '#007673'}}>Report</span></h5>
            </div>
            <hr />

            <div className="row justify-content-center">
                <button className={`btn + ${reportBy === 'patient' ?'submit-btn shadow-none' : 'link'} m-3`} 
                    onClick={() => setReportBy("patient")}> By Patient
                </button>

                <button 
                    className={`btn + ${reportBy === 'hr' ? 'submit-btn shadow-none' : 'link'} m-3`}
                    onClick={() => setReportBy("hr")}> By HR
                </button>
            </div>
           

            {/* first row */}
            <div className="row">
                <div className="col-md-3">
                {reportBy === 'patient' ? <>
                <label htmlFor="from">Select Patient </label>
                    <select 
                        label="From" 
                        name="from" 
                        className="form-control"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                    >
                    <option value="SelectPatient">Select Patient</option>
                    {patients && patients.map((patient, index) => (
                        <option key={index} value={patient._id} > {patient.firstname} {patient.lastname} -  {moment(patient.DOB).format("ll")} </option>
                    ))}
                    </select>                
                </> : <>
                <label htmlFor="from">Select HR </label>
                <select 
                      className="form-control"
                      value={hrId}
                      onChange={(e) => setHRId(e.target.value)}
                      >

                      <option>Select HR</option>
                      {hrs && hrs.map((hr, index) => (
                              <option value={hr?._id} key={index}> {hr?.firstname} {hr?.lastname} {hr?.npinumber} </option>
                          ))} 
                </select>                        
                </>}
               </div>


                <div className="col-md-3">
                <label htmlFor="from">From </label>
                    <input 
                        label="From" 
                        name="from" 
                        type="date" 
                        className="form-control"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}

                    />
                </div>

                <div className="col-md-3">     
                <label htmlFor="to">To </label>
                <input  
                    name="to" 
                    type="date" 
                    className="form-control"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                </div>

                <div className="col-md-3 mt-2">     
                <label>&nbsp;&nbsp;&nbsp;</label>
                <button  
                    name="submit" 
                    type="submit" 
                    className="btn add-staff-btn mt-4"
                    onClick={submitHandler}
                >
                    Generate Report
                </button>
                </div>
                </div>  
                {/* First Row Ends Here */}
                {loading ? <Loader /> : <>
                {targets && targets.length > 0 ? <Fragment>
                                 
                                 <br /><hr />
                                 <div className="row-display">
                                     <div className="col-md-4">
                                         <h5>Query <span style={{color: '#007673'}}>Result</span></h5>
                                     </div>
 
                                     <span>Total Time Spent: <span style={{color: '#007673', fontWeight: 'bold'}}>{totalTime} Mins</span></span>
 
 
                                     <div className="row-display">
                                         &nbsp;&nbsp;&nbsp;
                                         <Link to={{ pathname: "/Admin/Report/Print", state: 
                                         {target: targets, 
                                         timeSpent: totalTime, 
                                         from: startDate, 
                                         to: endDate, 
                                         totalTimeSpent: 
                                         totalTime }}} 
                                         className="btn add-staff-btn">Print Report</Link>
                                         &nbsp;&nbsp;&nbsp;
                                         <button className="btn add-staff-btn" onClick={resetData}>Reset</button>
                                     </div>
                                 </div>    
 
 
                                {targets && targets.map((trgt, index) => ( 
                                  <div className="m-5">
                                      <br/>
                                      <p className="reportsHeading">0{index + 1}</p> 
                                      <div className="row-display">
                                          <div>
                                             <label className="profile-label">Patient Name: </label> 
                                             <label className="report-label ml-2"> {trgt?.assigned_patient_id?.firstname} {trgt?.assigned_patient_id?.lastname}</label>
                                          </div>
 
                                          <div>
                                             <label className="profile-label">Patient Email: </label> 
                                             <label className="report-label ml-2">{trgt?.assigned_patient_id?.email}</label>
                                          </div>
 
                                          <div>
                                             <label className="profile-label">Patient DOB: </label> 
                                             <label className="report-label ml-2">{moment(trgt?.assigned_patient_id?.DOB).format("ll")}</label>
                                          </div>
                                      </div>
 
                                      <div className="row-display">
                                             <div>
                                                 <label className="profile-label">Time Spent: </label> <label className="spentTime">{trgt?.timeSpentInMinutes} Mins</label>
                                             </div>
 
                                             <div>
                                                 <label className="profile-label">By: </label> <label className="report-label">{trgt?.assigned_hr_id?.firstname} {trgt?.assigned_hr_id?.lastname}</label>
                                             </div>
 
                                             <div>
                                                 <label className="profile-label">Created At: </label> <label className="report-label">{moment(trgt?.createdAt).format("ll")}</label>
                                             </div>
                                     </div>
 
                                          <div className="col-md-12">
                                             <label className="bubble bubble-alt bubble-green">{trgt?.conclusion}</label>
                                          </div>
                                      
                                      <br /><br />
                                  </div>
                              ))}
                         </Fragment> : ''}
                        </>}
                       </div>
                    </div>
                 </section>
            </Fragment>
};

export default AdminTimeReport;
