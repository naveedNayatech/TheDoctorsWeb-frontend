import React, { Fragment } from 'react';
import systolicImg from '../../assets/Images/blood-pressure.png';
import diastolicImg from '../../assets/Images/diastolic.png';
import pulseImg from '../../assets/Images/pulse.png';
import { Image, Badge } from 'react-bootstrap';
import moment from 'moment';

const CuffTelemetaryData = ({healthData}) => {
    let telemetaryData = healthData?.telemetaryData?.telemetaryData;
    let patientInfo = healthData?.assigned_patient_id;
    let deviceDetails = healthData?.deviceId;

  return <Fragment>
      <br /><br />
          <div className="row">
            <div className="col-md-1">
                <Image src={systolicImg} className="systolic-image" />    
            </div>
            
            <div className="col-md-3">
            <span className="profile-label">Systolic : {telemetaryData?.sys}</span>
                {telemetaryData?.sys <= 70 ? <p className="normalBP">Very Low</p> : telemetaryData?.sys > 70 && telemetaryData?.sys <= 120 ? 
                <p className="normalBP">Normal</p> : telemetaryData?.sys > 120 && telemetaryData?.sys <= 140 ? <p className="elevatedBP">Elevated</p> : 
                telemetaryData?.sys > 140 && telemetaryData?.sys <= 160 ? <p className="elevatedBP">High BP</p> : 
                telemetaryData?.sys > 160 && telemetaryData?.sys < 180 ? <p className="elevatedBP">Hypertension</p> : ''}
            </div>

            <div className="col-md-1">
                <Image src={diastolicImg} className="systolic-image" />    
            </div>

            <div className="col-md-3">
            <span className="profile-label">Diastolic : {telemetaryData?.dia}</span>
                {telemetaryData?.dia < 80 ? <p className="normalBP">Low</p> : telemetaryData?.dia >= 80 && telemetaryData?.dia < 90 ? 
                <p className="normalBP">Normal</p> : telemetaryData?.dia >= 90 ? <p className="elevatedBP">High Blood Pressure</p> : ''}
            </div>

            <div className="col-md-1">
                <Image src={pulseImg} className="systolic-image" />    
            </div>

            <div className="col-md-3">
            <span className="profile-label">Pulse : {telemetaryData?.pul}</span>
                <p className="normalBP">Normal</p>
            </div>
        </div> {/* First Row Ends here */}

        {/* Device & Patient Info */}
        <div className="row">
                <div className="col-md-5">
                    <span className="profile-label">Patient Name: </span>
                    <span className="profile-label"> {patientInfo?.firstname} {patientInfo?.lastname}</span>

                    <span className="vl"></span>

                    <span className="profile-label ml-4">Gender: </span>
                    <span className="profile-label"> <Badge bg="info text-white">{patientInfo?.gender}</Badge></span>
                </div>

                <div className="col-md-7">
                    <span className="profile-label">Device ID: </span>
                    <span className="profile-label"> {deviceDetails?._id}</span>

                    <span className="vl"></span>

                    <span className="profile-label ml-2">Device Type: </span>
                    <span className="profile-label"> <Badge bg="info text-white">{deviceDetails?.deviceType}</Badge></span>

                    <span className="vl"></span>

                    <span className="profile-label ml-2">Created At: </span>
                    <span className="profile-label"> {moment(healthData?.createdAt).format("lll")}</span>
                </div>
            </div>

            {/* Comment */}
            {healthData?.conclusion ? <Fragment>
                    <div className="bubble bubble-alt bubble-green"> <p>
                        {healthData?.conclusion} &nbsp;&nbsp;&nbsp; <span style={{fontWeight: 'bold'}}>{healthData?.conslusionTimeDate}</span> 
                        </p>
                        </div>
            </Fragment> : ''}

             <br/>       
    </Fragment>;
};

export default CuffTelemetaryData;
