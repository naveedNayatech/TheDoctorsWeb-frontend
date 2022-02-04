import React, {useEffect, useState, Fragment} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import { getPatients, patientProfile } from '../../actions/adminActions';
import { getTimeReport } from '../../actions/HRActions';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { RESET_TIME_REPORT_DATA } from '../../constants/HRConstants';

const AdminTimeReport = () => {

    const dispatch = useDispatch();

    const { loading, error, patients} = useSelector(state => state.admin);
    const { patient } = useSelector(state => state.patientProfile);
    const {  targets, totalTime} = useSelector(state => state.target);

    const [patientId, setPatientId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() =>{
        dispatch(getPatients());

        if(patientId) {
            dispatch(patientProfile(patientId));
        }

    }, [dispatch, patientId])

    const submitHandler = () => {
        // console.log('start Date is ' + startDate);
        // console.log('end Date is ' + endDate);
        // console.log('patient Id is ' + patientId);
        // console.log('hr Id is ' + patient?.assigned_hr_id);

        dispatch(getTimeReport(patientId, patient?.assigned_hr_id, startDate, endDate)); 
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

        <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded" style={{backgroundColor: '#FAFAFA'}}>
            <div className="home-content">

            <div className="col-md-7">
                <h5 className="pt-2 mt-2">Time <span style={{color: '#F95800'}}>Report {patient?.firstname } {patient?.lastname }</span></h5>
            </div>
            <hr />

            {/* first row */}
            <div className="row">
                <div className="col-md-3">
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
                    className="btn btn-primary mt-4"
                    onClick={submitHandler}
                >
                    Generate Report
                </button>
                </div>
                </div>  
                {/* First Row Ends Here */}
                
                {targets && targets.length > 0 ? <Fragment>
                                 <hr/>
                                <div className="row">
                                    <div className="col-md-7">
                                        <h5>Report <span style={{color: '#F95800'}}>Result</span></h5>
                                    </div>

                                    <div className="col-md-2">
                                        <span>Total Time Spent: <span style={{color: '#F95800', fontWeight: 'bold'}}>{totalTime} Mins</span></span>
                                    </div>

                                    <div className="col-md-2">
                                        <Link to={{ pathname: "/Admin/Report/Print", state: {target: targets, timeSpent: totalTime, from: startDate, to: endDate, totalTimeSpent: totalTime }}} className="btn btn-info">Print Report</Link>
                                    </div>

                                    <div className="col-md-1">
                                        <button className="btn btn-danger" onClick={resetData}>Reset</button>
                                    </div>
                                </div>    


                {targets && targets.map((trgt, index) => ( 
                                 <Fragment>
                                     <br/>
                                     <p className="reportsHeading">Patient Details:{}</p> 
                                     <div className="row">
                                         <div className="col-md-3">
                                            <label className="form-label">Name: </label> <label className="report-label">{trgt?.assigned_patient_id?.firstname} {trgt?.assigned_patient_id?.lastname}</label>
                                         </div>

                                         <div className="col-md-5">
                                            <label className="form-label">Email: </label> <label className="report-label">{trgt?.assigned_patient_id?.email}</label>
                                         </div>

                                         <div className="col-md-4">
                                            <label className="form-label">DOB: </label> <label className="report-label">{moment(trgt?.assigned_patient_id?.DOB).format("ll")}</label>
                                             
                                         </div>
                                     </div>

                                     <div className="row">
                                         <div className="col-md-3">
                                            <label className="form-label">Conclusion: </label>
                                         </div>

                                         <div className="col-md-2">
                                            <label className="form-label">Time Spent: </label> <label className="spentTime">{trgt?.timeSpentInMinutes} Mins</label>
                                         </div>

                                         <div className="col-md-4">
                                            <label className="form-label">By: </label> <label className="report-label">{trgt?.assigned_hr_id?.firstname} {trgt?.assigned_hr_id?.lastname}</label>
                                         </div>

                                         <div className="col-md-3">
                                            <label className="form-label">Created At: </label> <label className="report-label">{moment(trgt?.createdAt).format("ll")}</label>
                                         </div>

                                         <div className="col-md-12">
                                            <label className="bubble bubble-alt bubble-green">{trgt?.conclusion}</label>
                                         </div>
                                     </div>
                                     <hr />
                                 </Fragment>
                             ))}
                        </Fragment> : ''}
                       </div>
                    </div>
                 </section>
            </Fragment>
};

export default AdminTimeReport;
