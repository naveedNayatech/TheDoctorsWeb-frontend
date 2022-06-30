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

        if(!patientId) {
            alert.error('Please select patient');
            return;
        } else if (!startDate) {
            alert.error('Please select start date');
            return;
        } else if(!endDate) {
            alert.error('Please select end date');
            return;
        } else {
            dispatch(getTimeReport(patientId, startDate, endDate));
        }    
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
                                    
                                    <h5 className="pt-2 mt-2">Time <span style={{color: '#004aad'}}>Report </span> </h5> 
                                    
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
                                
                                <button  
                                    name="submit" 
                                    type="submit" 
                                    className="manage_logs_btn mt-4 shadow-none"
                                    onClick={submitHandler}
                                >
                                   <i className='bx bx-paper-plane'></i> Generate Report
                                </button>
                                </div>
                             </div>  {/* First Row Ends Here */}

                             {/* Targets Display */}
                             {loading ? <Loader /> : <>
                             
                             {targets && targets.length > 0 ? <Fragment>
                                 <hr/>
                                <div className="row-display">
                                    
                                    <h5>Report <span style={{color: '#004aad'}}>Result</span></h5>
                                    
                                    <small><b>({startDate} to {endDate})</b></small>                                
                                    
                                    <span>Total Time Spent: <span style={{color: '#004aad', fontWeight: 'bold'}}>{totalTime} mins</span></span>
                                    
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
                                     {/* <br/>
                                     <p className="reportsHeading">{index + 1}</p>  */}
                                     <div className="row-display">
                                        <div>
                                             <label className="profile-label">Patient Name: </label> 
                                             <label className="report-label ml-2">{trgt?.assigned_patient_id?.firstname} {trgt?.assigned_patient_id?.lastname}</label>
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

                                    <div className="notes">
                                        <div className="row-display">
                                            <p className="ml-2 mt-2"><small><b> HR. {trgt?.assigned_hr_id?.firstname} {trgt?.assigned_hr_id?.lastname} </b></small></p>  
                                            <label className="spentTime">{trgt?.timeSpentInMinutes} mins</label>
                                            </div>
                                            
                                            <b>Notes : </b> 
                                        {trgt?.conclusion}
                                        <p className="mt-2" style={{float: 'right'}}><small><b>{moment(trgt?.createdAt).format("lll")} EST</b></small></p>
                                    </div>
                                    <br />
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
