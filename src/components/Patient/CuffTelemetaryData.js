import React, { useState, useEffect, Fragment } from 'react';
import systolicImg from '../../assets/Images/blood-pressure.png';
import diastolicImg from '../../assets/Images/diastolic.png';
import pulseImg from '../../assets/Images/pulse.png';
import { Image, Badge } from 'react-bootstrap';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { commentOnReading } from '../../actions/HRActions';
import {COMMENT_RESET} from '../../constants/HRConstants';
import {useAlert } from 'react-alert';



const CuffTelemetaryData = ({props, healthData, isAdmin}) => {

    const  dispatch = useDispatch();
    const alert = useAlert();

    const { hr} = useSelector(state => state.hrAuth);

    let telemetaryData = healthData?.telemetaryData?.telemetaryData;
    let patientInfo = healthData?.assigned_patient_id;
    let deviceDetails = healthData?.deviceId;
    let notes = healthData?.notes;

    const [comment, setComment] = useState('');

    const commentHandler = (readingId) => {
        dispatch(commentOnReading(readingId, hr?.id, comment));
    }

  return <Fragment>
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
                    <span className="profile-label"> {moment(healthData?.createdAt).format("ll")}</span>
                </div>
            </div>


            
            {isAdmin ===true ? <Fragment>
            </Fragment> : 
                <div className="row">
                    <div className="col-md-10">
                        <input type="text" 
                        className="form-control mt-1"
                        placeholder="Enter your comment here ....."
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


            {/* Comment on Reading */}
            
            {/* Comment Section */}


            {/* Comment */}
            {notes.length > 0 && notes.map((note, index) => ( <div key={index}>
                <div className="bubble bubble-alt bubble-green"> <p>
                    {note?.conclusion} &nbsp;&nbsp;&nbsp; <span style={{fontWeight: 'bold'}}>{moment(note?.dateTime).format("lll")}</span> 
                    </p>
                </div>
                <br/><br/><br/>
            </div> 
            ))}
                    
    </Fragment>;
};

export default CuffTelemetaryData;
