import React, { useEffect, useState, Fragment } from 'react';
import MetaData from '../../layouts/MetaData';
import  HRSidebar from '../../components/HR/HRSidebar';
import HRTopBar from '../../components/HR/HRTopbar';
import { getHRPatients, getTimeReport } from '../../actions/HRActions';
import {useSelector, useDispatch} from 'react-redux';
import { RESET_TIME_REPORT_DATA } from '../../constants/HRConstants';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Loader from '../../layouts/Loader';

const TimeReport = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const [patientId, setPatientId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    const { hr} = useSelector(state => state.hrAuth);
    const {  error, hrpatients} = useSelector(state => state.hrPatients);
    const {  loading, targets, totalTime} = useSelector(state => state.target);


    let id = hr._id;


    useEffect(() => {
		if(error) {
			alert.error(error);
		}

        dispatch(getHRPatients(id));
	}, [dispatch])

    const submitHandler = () => {
        var check = moment(new Date(), 'YYYY/MM/DD');

        let month = check.format('M');
        month = Number(month)
        var year = check.format('YYYY');

        dispatch(getTimeReport(patientId, id, startDate, endDate));
    }

    const resetData = () => {
        dispatch({ type: RESET_TIME_REPORT_DATA });
        setPatientId("");
        setStartDate("");
        setEndDate("");
    }
  return <Fragment>
      <MetaData title="HR Dashboard" />
            <HRSidebar />
            
            <section className="home-section">
                {/* TopBar */}  
                <HRTopBar />


                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
                        <div className="home-content">
                            <div className="container">
                                <div className="row-display">
                                    
                                    <h5 className="pt-2 mt-2">Time <span style={{color: '#007673'}}>Report </span> </h5> 
                                    
                                    <div className="row-display">
                                        <Link to="/HrDashboard">
                                            <button className="btn btn-primary mt-3">
                                                <i className='bx bx-arrow-back'></i>
                                            </button>
                                        </Link>
                                        &nbsp;&nbsp;
                                        <Link to="/HrDashboard">
                                            <button className="btn btn-primary mt-3">
                                            <i className='bx bxs-home'></i>
                                            </button>
                                        </Link>
                                    </div> 
                                    
                                </div>
                                <hr /> 

                                
                                <div className="row-display">
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
                                    {hrpatients && hrpatients.map((patient, index) => (
                                        <option key={index} value={patient._id}> {patient.firstname} {patient.lastname} -  {moment(patient.DOB).format("ll")} </option>
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

                                <div className="col-md-3 mt-1">     
                                <label>&nbsp;&nbsp;&nbsp;</label>
                                <button  
                                    name="submit" 
                                    type="submit" 
                                    className="btn submit-btn shadow-none"
                                    onClick={submitHandler}
                                >
                                    Generate Report
                                </button>
                                </div>
                             </div>  {/* First Row Ends Here */}

                             {/* Targets Display */}
                             {loading ? <Loader /> : <>
                             
                             {targets && targets.length > 0 ? <Fragment>
                                 <hr/>
                                <div className="row-display">
                                    
                                    <h5>Report <span style={{color: '#007673'}}>Result</span></h5>
                                    
                                    <span>Total Time Spent: <span style={{color: '#007673', fontWeight: 'bold'}}>{totalTime} Mins</span></span>
                                    
                                    <div className="row-display">
                                    <Link to={{ pathname: "/printReport", state: 
                                    {target: targets, 
                                    timeSpent: totalTime, 
                                    from: startDate, 
                                    to: endDate, 
                                    totalTimeSpent: totalTime 
                                    }}} className="btn submit-btn"><i className='bx bx-printer'></i></Link>
                                    
                                    &nbsp;&nbsp;
                                    <button className="btn submit-btn" onClick={resetData}>
                                        <i className='bx bx-reset'></i>
                                    </button>
                                    </div>
                                    
                                </div>    


                                {targets.map((trgt, index) => ( 
                                 <div key={index}>
                                     <br/>
                                     <p className="reportsHeading">{index + 1}</p> 
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
                                            <label className="form-label">Time Spent: </label> <label className="spentTime">{trgt?.timeSpentInMinutes}</label>
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
                                 </div>
                             ))}

                             </Fragment> : ''}

                             </>}

                             
                        </div>
                    </div>
                </div>
            </section>
  </Fragment>
};

export default TimeReport;
