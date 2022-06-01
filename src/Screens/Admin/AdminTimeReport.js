import React, {useEffect, useState, Fragment} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import { getPatients, patientProfile, getHrLists, getDoctors } from '../../actions/adminActions';
import { getTimeReport, getTimeReportByHR, getTimeReportByDR } from '../../actions/HRActions';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { RESET_TIME_REPORT_DATA } from '../../constants/HRConstants';
import Loader from '../../layouts/Loader';
import {useAlert} from 'react-alert';


const AdminTimeReport = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { patients} = useSelector(state => state.admin);
    const { patient } = useSelector(state => state.patientProfile);
    const { loading, targets, totalTime} = useSelector(state => state.target);
    const { hrs } = useSelector(state => state.hrslist);
    const { doctors } = useSelector(state => state.doctor);

    const [patientId, setPatientId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [hrId, setHRId] = useState('');
    const [drId, setDRId] = useState('');
    const [reportBy, setReportBy] = useState('patient');

    useEffect(() =>{
        dispatch(getPatients());

        if(patientId) {
            dispatch(patientProfile(patientId));
        }

        dispatch(getHrLists());
        dispatch(getDoctors(10, 1));

    }, [dispatch, patientId])

    const submitHandler = () => {
        if(reportBy === 'patient'){
            if(!patientId){
                alert.error('please select patient');
                return;
            } else if (!startDate) {
                alert.error('please select start date');
                return;
            } else if(!endDate) {
                alert.error('please select end date');
                return;
            } else {
                dispatch(getTimeReport(patientId, startDate, endDate)); 
                return;
            }
            
        }
        if(reportBy === 'hr'){
            if(!hrId){
                alert.error('please select HR');
                return;
            } else if (!startDate) {
                alert.error('please select start date');
                return;
            } else if(!endDate) {
                alert.error('please select end date');
                return;
            } else {
            dispatch(getTimeReportByHR(hrId, startDate, endDate)); 
            return;
            }
        }
        else {
            if(!drId){
                alert.error('please select Doctor');
                return;
            } else if (!startDate) {
                alert.error('please select start date');
                return;
            } else if(!endDate) {
                alert.error('please select end date');
                return;
            } else {
            dispatch(getTimeReportByDR(drId, startDate, endDate)); 
            return;
            }
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

            <div className="row-display">
                <h5 className="pt-2 mt-2">Time Spent <span style={{color: '#ed1b24'}}>Report</span></h5>

                <div className="row-display">
                    <Link to="/adminDashboard">
                        <button className="btn btn-primary mt-3">
                            <i className='bx bx-arrow-back'></i>
                        </button>
                    </Link>
                    &nbsp;&nbsp;
                    <Link to="/adminDashboard">
                        <button className="btn btn-primary mt-3">
                        <i className='bx bxs-home'></i>
                        </button>
                    </Link>
                </div>   
            </div>
            <br />

            <p className='text-center'>Generate Time Report By:</p>

            <div className="row justify-content-center">
                <button className={`btn + ${reportBy === 'patient' ?'submit-btn shadow-none' : 'link'} m-3`} 
                    onClick={() => setReportBy("patient")}> By Patient
                </button>

                <button 
                    className={`btn + ${reportBy === 'hr' ? 'submit-btn shadow-none' : 'link'} m-3`}
                    onClick={() => setReportBy("hr")}> By HR
                </button>

                <button 
                    className={`btn + ${reportBy === 'doctor' ? 'submit-btn shadow-none' : 'link'} m-3`}
                    onClick={() => setReportBy("doctor")}> By Doctor
                </button>
            </div>
           <hr />

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
                </> : reportBy === 'hr' ? <>
                    
                <label htmlFor="from">Select HR </label>
                <select 
                      className="form-control"
                      value={hrId}
                      onChange={(e) => setHRId(e.target.value)}
                      >

                      <option>Select HR</option>
                      {hrs && hrs.map((hr, index) => (
                              <option value={hr?._id} key={index}> HR. {hr?.firstname} {hr?.lastname} {hr?.npinumber} </option>
                          ))} 
                </select>                        
                </>
                 : <>
                <label htmlFor="from">Select Doctor </label>
                <select 
                      className="form-control"
                      value={drId}
                      onChange={(e) => setDRId(e.target.value)}
                      >
                      <option>Select Doctor</option>
                      {doctors && doctors.map((doctor, index) => (
                              <option value={doctor?._id} key={index}> Dr. {doctor?.firstname} {doctor?.lastname} {doctor?.npinumber} </option>
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
                                         <h5>Search <span style={{color: '#ed1b24'}}>Result</span></h5>
                                     </div>
 
                                     <span>Total Time Spent: <span style={{color: '#ed1b24', fontWeight: 'bold'}}>{totalTime} Minutes  ( {startDate && startDate} {endDate && "=>" + endDate} ) </span></span>
 
 
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
                                  <div className="m-5" key={index}>
                                      {/* <br/>
                                      <p className="reportsHeading">{index + 1}</p> 
                                      <br /><br /> */}
                                      <div className="row-display">
                                          <div>
                                             <label className="profile-label">Patient Name: </label> 
                                             <label className="report-label ml-2"> Pt. {trgt?.assigned_patient_id?.firstname} {trgt?.assigned_patient_id?.lastname}</label>
                                          </div>
 
                                          <div>
                                             <label className="profile-label">Patient Email: </label> 
                                             <label className="report-label ml-2">{trgt?.assigned_patient_id?.email}</label>
                                          </div>
 
                                          <div>
                                             <label className="profile-label">Patient DOB: </label> 
                                             <label className="report-label ml-2">{moment(trgt?.assigned_patient_id?.DOB).format("ll")}</label>
                                          </div>

                                          <div>
                                                 {/* <label className="profile-label">Time Spent: </label> <label className="spentTime">{trgt?.timeSpentInMinutes} Mins</label> */}
                                             </div>
                                      </div>
 
                                      <div className="row-display">
                                             

                                     </div>

                                         <div className="notes">
                                            <div className="row-display">
                                               <p className="ml-2 mt-2"><small><b> HR. {trgt?.assigned_hr_id?.firstname} {trgt?.assigned_hr_id?.lastname} </b></small></p>  
                                                <label className="spentTime">{trgt?.timeSpentInMinutes} Mins</label>
                                             </div>
                                             
                                             <b>Notes : </b> 
                                            {trgt?.conclusion}
                                            <p className="mt-2" style={{float: 'right'}}><small><b>{moment(trgt?.createdAt).format("ll")}</b></small></p>
                                        </div>
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
