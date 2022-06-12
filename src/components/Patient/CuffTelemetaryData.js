import React, { useState, Fragment } from 'react';
import systolicImg from '../../assets/Images/blood-pressure.png';
import diastolicImg from '../../assets/Images/diastolic.png';
import pulseImg from '../../assets/Images/pulse.png';
import { Image, Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { commentOnReading } from '../../actions/HRActions';

import patientProfileImg from '../../assets/Images/doctorIcon.png';

const moment = require('moment-timezone');

const CuffTelemetaryData = ({ healthData, isAdmin}) => {

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

    let sysBPCategory; //variable to store category of BP

    function calcSysBpCategory(sys) {
        switch(true){
            case (sys > 210):
                sysBPCategory = "Hypertension- stage 4"
                break;
            case (sys >= 180 && sys <= 210):
                sysBPCategory = "Hypertension-Stage 3"
                break;
            case (sys >= 160 && sys <= 179):
                sysBPCategory = "Hypertension-Stage 2"
            break;
            case (sys >= 140 && sys <= 159):
                sysBPCategory = "Hypertension-Stage 1"
            break;
            case (sys >= 130 && sys <= 139):
                sysBPCategory = "Pre-hypertension"
            break;
            case (sys >= 121 && sys <= 129):
                sysBPCategory = "High Normal B.P"
            break;
            case (sys >= 100 && sys <= 120):
                sysBPCategory = "Normal Blood Pressure"
            break;
            case (sys >= 100 && sys <= 120):
                sysBPCategory = "Normal Blood Pressure"
            break;
            case (sys >= 90 && sys <= 99):
                sysBPCategory = "Low Normal B.P"
            break;
            case (sys >= 70 && sys <= 89):
                sysBPCategory = "Low Blood Pressure"
            break;
            case (sys >= 50 && sys <= 69):
                sysBPCategory = "Too Low Blood Pressure"
            break;
            case (sys < 50):
                sysBPCategory = "Extremely Low B.P"
            break;
            default:
                sysBPCategory = "Invalid B.P"
            } 
        }

    let diaBpCategory;

    function calcDiaBpCategory(dia) {
        switch(true){
            case (dia > 120):
                diaBpCategory = "Hypertension- stage 4"
                break;
            case (dia >= 110 && dia <= 120):
                diaBpCategory = "Hypertension-Stage 3"
                break;
            case (dia >= 100 && dia <= 109):
                diaBpCategory = "Hypertension-Stage 2"
            break;
            case (dia >= 90 && dia <= 99):
                diaBpCategory = "Hypertension-Stage 1"
            break;
            case (dia >= 130 && dia <= 139):
                diaBpCategory = "Pre-hypertension"
            break;
            case (dia >= 85 && dia <= 89):
                diaBpCategory = "High Normal B.P"
            break;
            case (dia >= 81 && dia <= 84):
                diaBpCategory = "Normal Blood Pressure"
            break;
            case (dia >= 65 && dia <= 80):
                diaBpCategory = "Normal Blood Pressure"
            break;
            case (dia >= 60 && dia <= 64):
                diaBpCategory = "Low Normal B.P"
            break;
            case (dia >= 40 && dia <= 59):
                diaBpCategory = "Low Blood Pressure"
            break;
            case (dia >= 35 && dia <= 39):
                diaBpCategory = "Too Low Blood Pressure"
            break;
            case (dia < 35):
                diaBpCategory = "Extremely Low B.P"
            break;
            default:
                diaBpCategory = "Invalid B.P"
            } 
        }

    

  return <Fragment>
      {telemetaryData?.sys && telemetaryData?.dia !== " " && telemetaryData?.sys && telemetaryData?.dia !== undefined ? 
      <>
      <div className="telemetary-card">
        <br />
          <div className="row">
            <div className="col-md-1">
                <Image src={systolicImg} className="systolic-image" />    
            </div>

            {calcSysBpCategory(telemetaryData?.sys)}
                
            <div className="col-md-3">
            <span className="profile-label">Systolic : {telemetaryData?.sys}</span>
                <br/>
                <small><b>{sysBPCategory}</b></small>
            </div>

            <div className="col-md-1">
                <Image src={diastolicImg} className="systolic-image" />    
            </div>

            {calcDiaBpCategory(telemetaryData?.dia)}

            <div className="col-md-3">
            <span className="profile-label">Diastolic : {telemetaryData?.dia}</span>
                <br/>
                <small><b>{diaBpCategory}</b></small>
            </div>

            <div className="col-md-1">
                <Image src={pulseImg} className="systolic-image" />    
            </div>

            <div className="col-md-2">
            <span className="profile-label">Pulse : {telemetaryData?.pul}</span>
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
      </>
    
     : <> </>}   
      
    </Fragment>;   
};


export default CuffTelemetaryData;
