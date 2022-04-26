import React, { useState, Fragment } from 'react';
import systolicImg from '../../assets/Images/blood-pressure.png';
import diastolicImg from '../../assets/Images/diastolic.png';
import pulseImg from '../../assets/Images/pulse.png';
import { Image, Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { commentOnReading } from '../../actions/HRActions';

import patientProfileImg from '../../assets/Images/patientProfile.png';

const moment = require('moment-timezone');

const CuffTelemetaryData = ({props, healthData, isAdmin}) => {

    const  dispatch = useDispatch();

    const { hr} = useSelector(state => state.hrAuth);
    const { staff} = useSelector(state => state.staffAuth);

    let telemetaryData = healthData?.telemetaryData;
    let deviceDetails = healthData?.deviceId;
    let notes = healthData?.notes;

    const [comment, setComment] = useState('');

    const commentHandler = (readingId) => {
        if(hr?._id === undefined){
            dispatch(commentOnReading(readingId, staff?.id, comment));
        } else {
            dispatch(commentOnReading(readingId, hr?.id, comment));
        }
    }

  return <Fragment>
      <div className="telemetary-card">
        <br />
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
                <p className="normalBP">Normal</p> : telemetaryData?.dia >= 90 && telemetaryData?.dia <=100 ? <p className="elevatedBP">Elevated</p> : <p className="elevatedBP">High Blood Pressure</p>}
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
        <div className="row-display telemetary-patient-row pl-2 pr-2">
           
                {/* <div className="col-md-7"> */}
                    <span className="telemetary-patient-row">Device ID: </span>
                    <span className="telemetary-patient-row"> {deviceDetails?._id}</span>

                    <span className="vl"></span>

                    <span className="telemetary-patient-row ml-2">Device Type: </span>
                    <span className="telemetary-patient-row"> <Badge bg="info text-white">{deviceDetails?.deviceType}</Badge></span>

                    <span className="vl"></span>

                    <span className="telemetary-patient-row ml-2">Added D/T: </span>
                    <span className="telemetary-patient-row"> {moment(healthData?.createdAt).tz("America/New_York").format("lll")}</span>
                {/* </div> */}
            </div>


            
            {isAdmin ===true ? <Fragment>
            </Fragment> : 
                <div className="row mt-4">
                    <div className="col-md-10">
                        <input type="text" 
                        className="form-control"
                        placeholder="Type your comment here ....."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        key={telemetaryData?._id}
                        />
                    </div>
    
                    <div className="col-md-2">
                        <button className="submit-btn" type="submit" onClick={() => commentHandler(healthData?._id)}>Submit</button>
                    </div>
                </div>
            } 
            

            {/* Comment */}
            {notes.length > 0 && notes.map((note, index) => ( <div key={index}>
                <div className="row-display-secondary">
                    <div className="mt-3 mr-3">
                        <img src={patientProfileImg} alt="hr/drImg" style={{width: '50px', height: '50px', borderRadius: '50%'}}/>
                    </div>
                    <div className="bubble bubble-alt"> <p className="mr-3"> 
                        {note?.conclusion} <br/> <span style={{fontWeight: 'bold'}}>{moment(note?.dateTime).tz('America/New_York').format("ll")}</span> 
                        </p>
                    </div>
                </div>

                {/* <br/> */}
            </div> 
            ))}  
        </div>
    </Fragment>;   
};


export default CuffTelemetaryData;
