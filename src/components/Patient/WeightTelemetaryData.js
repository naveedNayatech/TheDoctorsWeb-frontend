import React, {useState, Fragment} from 'react';
import weightImg from '../../assets/Images/scale.png';
import fatImg from '../../assets/Images/fat.png';
import bmiImg from '../../assets/Images/bmi.png';
import { Image, Badge } from 'react-bootstrap';
import moment from 'moment';
import { commentOnReading } from '../../actions/HRActions';
import {COMMENT_RESET} from '../../constants/HRConstants';
import { useSelector, useDispatch } from 'react-redux';

const WeightTelemetaryData = ({props, healthData, isAdmin}) => {

    const dispatch = useDispatch();

    console.log('isAdmin is ' + isAdmin);
    const { hr} = useSelector(state => state.hrAuth);
    const { isAuthenticated, staff} = useSelector(state => state.staffAuth);

    let telemetaryData = healthData?.telemetaryData;
    let patientInfo = healthData?.assigned_patient_id;
    let deviceDetails = healthData?.deviceId;
    let notes = healthData?.notes;

    const [comment, setComment] = useState('');

    const commentHandler = (readingId) => {
        if(hr?._id === undefined){
            // console.log('Doctor is commenting')
            dispatch(commentOnReading(readingId, staff?.id, comment));
        } else {
            // console.log('HR is commenting')
            dispatch(commentOnReading(readingId, hr?.id, comment));
        }
    }

  return <Fragment>
      <br /><br /> 
      <div className="row">
      <div className="col-md-1">
          <Image src={weightImg} className="systolic-image" />    
      </div>
      
      <div className="col-md-3">
          <span className="profile-label">Weight : {telemetaryData?.wt}</span>
          {telemetaryData?.wt >= 40 && telemetaryData?.wt <= 60 ? <p className="normalBP">Under Weight</p> : telemetaryData?.wt >= 61 && telemetaryData?.wt <= 80 ? 
          <p className="normalBP">Healthy Weight</p> : telemetaryData?.wt >=81 && telemetaryData?.wt <= 100 ? <p className="elevatedBP">Obese</p> : 
          telemetaryData?.wt >= 101 ? <p className="elevatedBP">Very Obese</p> : ''}
      </div>

      <div className="col-md-1">
          <Image src={fatImg} className="systolic-image" />    
      </div>

      <div className="col-md-3">
          <span className="profile-label">Fat : {telemetaryData?.fat}</span>
          {/* {telemetaryData?.bmi >= 19 && telemetaryData?.bmi <=24 ? <p className="normalBP">Normal Weight</p> : telemetaryData?.bmi >= 25 && telemetaryData?.bmi <= 29 ? 
          <p className="normalBP">Overweight</p> : telemetaryData?.bmi >=30 && telemetaryData?.bmi <= 39 ? <p className="elevatedBP">Obesity</p> : 
          telemetaryData?.bmi >= 40 ? <p className="elevatedBP">Severe Obesity</p> : ''} */}
      </div>

      <div className="col-md-1">
          <Image src={bmiImg} className="systolic-image" />    
      </div>

      <div className="col-md-3">
          <span className="profile-label">BMI : {telemetaryData?.bmi}</span>
          {telemetaryData?.bmi >= 19 && telemetaryData?.bmi <=24 ? <p className="normalBP">Normal Weight</p> : telemetaryData?.bmi >= 25 && telemetaryData?.bmi <= 29 ? 
          <p className="normalBP">Overweight</p> : telemetaryData?.bmi >=30 && telemetaryData?.bmi <= 39 ? <p className="elevatedBP">Obesity</p> : 
          telemetaryData?.bmi >= 40 ? <p className="elevatedBP">Severe Obesity</p> : ''}
      </div>
    </div>

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


            {/* Comment on reading */}
            {isAdmin === true ? <Fragment>
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

            {/* Comment */}
            {notes.length > 0 && notes.map((note, index) => ( <div key={index}>
                <div className="bubble bubble-alt bubble-green"> <p>
                    {note?.conclusion} &nbsp;&nbsp;&nbsp; <span style={{fontWeight: 'bold'}}>{moment(note?.dateTime).format("ll")}</span> 
                    </p>
                </div>
                <br/><br/><br/>
            </div> 
            ))}


            {/* Comment */}
            {healthData?.conclusion ? <Fragment>
                    <div className="bubble bubble-alt bubble-green"> <p>
                        {healthData?.conclusion} &nbsp;&nbsp;&nbsp; <span style={{fontWeight: 'bold'}}>{healthData?.conslusionTimeDate}</span> 
                        </p>
                        </div>
            </Fragment> : ''}

             <br/> 
    </Fragment>
};

export default WeightTelemetaryData;
