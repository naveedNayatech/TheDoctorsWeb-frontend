import React, {Fragment} from 'react';
import moment from "moment";
import TDWLogoImg from '../../assets/Images/tdw_logo.jpeg';
import {Link} from 'react-router-dom';

const AdminPrintReport = (props) => {

    let targets = props?.location?.state?.target;
    let totalTime = props?.location?.state?.totalTimeSpent
    let startDate = props?.location?.state?.from;
    let endDate = props?.location?.state?.to;


  return <Fragment>
      <div className="container">
            {targets && targets.length > 0 ? <Fragment>
                <div className="row">
                <div className="col-md-5">
                    <img src={TDWLogoImg} style={{width: '110px', height: '90px', marginTop: '-10px'}}/>
                </div>

                <div className="col-md-5">
                    <b className="report-header">Time Spent <span style={{color: '#f95800'}}>Report </span></b>
                </div>

                <div className="col-md-2">
                    <p className="report-date">From: {startDate}</p>
                    <p className="report-date">To: {endDate}</p>
                </div>
            </div>
            <hr />

            <div className="row">
                <div className="col-md-9">

                </div>

                <div className="col-md-3">
                    Total Time : {totalTime} Mins
                </div>
            </div>
                                {targets.map((trgt, index) => ( 
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
                                 </Fragment>
                             ))}

                             </Fragment> : ''}
        </div>
  </Fragment>;
};

export default AdminPrintReport;
