import React, {Fragment, useEffect, useState} from 'react';
import clockImg from '../../assets/Images/clockImg.png';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Image } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import TextField from '../../components/Form/TextField';
import { carePlanOfPatient, hrTimeSpentOfCurrentMonth, hrTimeSpentOfCurrentMonthinCCMCategory, getTimeReport } from '../../actions/HRActions';
import { getRemainingReadings} from '../../actions/adminActions';
import moment from 'moment';
import { ADDING_CARE_PLAN_RESET, ADDING_TIME_SPENT_RESET } from '../../constants/HRConstants';
import patientProfileImg from '../../assets/Images/patientProfile.png';
import systolicImg from '../../assets/Images/blood-pressure.png';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import doctorIcon from '../../assets/Images/doctorIcon.png';
import hrIcon from '../../assets/Images/network.png';
import AddTimeManually from '../../components/HR/AddTimeManually';
import RPMMinutesProgress from '../../components/HR/RPMMinutesProgress';
import CCMMinutesProgress from '../../components/HR/CCMMinutesProgress';


const HRPatientInfo = ({patient, telemetaryReadings}) => {

 const dispatch = useDispatch();   
 const alert = useAlert();


 var check = moment(new Date(), 'YYYY/MM/DD');

 let month = check.format('M');
 month = Number(month)
 var year = check.format('YYYY');

//  Careplan Fields
const [carePlanShow ,setCarePlanShow] = useState(false);
const [description, setDescription] = useState('');
const [readingsInDay, setReadingsInDay] = useState('');
const [readingsInNight, setReadingsInNight] = useState('');
const [readingsPerMonth, setReadingsPerMonth] = useState('');
const [fileName, setFileName] = useState({});
const [minutesCategory, setMinutesCategory] = useState('RPM');



const handleClose = () => setAddTimeShow(false);
const handleShow = () => setAddTimeShow(true);
const handleCarePlanModalClose = () => setCarePlanShow(false);
const handleCarePlanModalShow = () => setCarePlanShow(true);
const [addTimeShow, setAddTimeShow] = useState(false);

 const { careplan } = useSelector(state => state.careplan);
 const { totalTime } = useSelector(state => state.totalTimeSpent);
 const { totalTimeinCCM } = useSelector(state => state.totalTimeSpentInCCM);
 const {isSuccessful, carePlanAdded, error: careplanerror } = useSelector(state => state.timeSpent);
 const { count } = useSelector(state => state.readingsCount);
 const {hr} = useSelector(state => state.hrAuth); 
 const {  loading, targets} = useSelector(state => state.target);
 let hrId = hr?._id;
 let patientid = patient?._id;


 let startDate = moment().clone().startOf('month').format('YYYY-MM-DD');
 let endDate = moment().clone().endOf('month').format('YYYY-MM-DD');

    useEffect(() => {
    if(careplanerror){
        return alert.error(careplanerror);
    }

    
    if(isSuccessful) {
        setAddTimeShow(false);
        alert.success('Time added');
        dispatch({ type: ADDING_TIME_SPENT_RESET})
    }


    if(carePlanAdded){
    setCarePlanShow(false);
    alert.success('Care plan added');
    dispatch({ type: ADDING_CARE_PLAN_RESET });
    setDescription(''); 
    }

    // dispatch(getPatientCarePlan(patientid));
    dispatch(hrTimeSpentOfCurrentMonth(patientid, hrId, startDate, endDate));
    dispatch(hrTimeSpentOfCurrentMonthinCCMCategory(patientid, hrId, startDate, endDate));
    dispatch(getRemainingReadings(patientid));
    dispatch(getTimeReport(patientid, startDate, endDate));

    },[dispatch, careplanerror, isSuccessful, carePlanAdded]);


 
 let currMonthName  = moment().format('MMMM');
 let readingsThisMonth;
 let ReadingsperMonth; 
 
 readingsThisMonth = count;
 ReadingsperMonth = careplan?.data?.readingsPerMonth;

 const handleFileChange = e => {
    setFileName(e.target.files[0]);
  }

    const submitCarePlan = () => {
        if(description === '') {
            setCarePlanShow(false);
            alert.error('Description is required');
            return
        }

    dispatch(carePlanOfPatient(patientid, hrId, 
            description, 
            readingsPerMonth, 
            readingsInDay,
            readingsInNight, 
            fileName))
        }

    

    const sendEmail = (email) => {
        window.open(`mailto:${email}`)
    }

    let filteredReadings = calcTotalReadings();

    function calcTotalReadings() {
       return telemetaryReadings && telemetaryReadings.filter(healthData => healthData?.deviceId?.deviceType === "bp").reduce((sum, a) =>  
        sum + 1, 0
      )
    }

  return (
    <>
      <div className="row-display header-wrapper">
            
            <h5 className="pt-2 pl-2 mt-2">{patient?.firstname} {patient?.lastname}<span style={{ color: '#004aad'}}> Details </span></h5>
        

            <div className="row-display">    
                {careplan ? <Fragment>
                    <div>
                        <button disabled className="btn btn-outline-danger mt-2"><small>Careplan Added</small></button>
                    </div>
                </Fragment> : <Fragment>
                    <div>
                        <button disabled className="manage_logs_btn mt-2" onClick={handleCarePlanModalShow}><i className='bx bxs-paper-plane' ></i> Add Careplan</button>
                    </div>    
                </Fragment>}

                <button className="manage_logs_btn shadow-none ml-3 mt-2" onClick={handleShow}><small> <i className='bx bx-time'></i> Add Time Manually</small></button>
            </div>

            </div>
            <br/>
            
            <div className="container row">
                <div className="row-display card timeSpentCard">
                    <img src={clockImg} className="img-responsive" width="50" height="50"/>
                    <small className="total-time-spent">{totalTime} mins spent in RPM Category in <span style={{color: '#004aad'}}>{currMonthName}</span> </small>
                </div>
                &nbsp;&nbsp;&nbsp;
                <div className="row-display card timeSpentCard">
                    <img src={clockImg} className="img-responsive" width="50" height="50"/>
                    <small className="total-time-spent">{totalTimeinCCM} mins spent in CCM Category in <span style={{color: '#004aad'}}>{currMonthName}</span> </small>
                </div>
            </div>
            <br />

            <div className="row container">
                <div className="col-md-3">
                <div className="card card-bordered-01">
                        <img src={patientProfileImg} className="img-responsive profile-card-img mt-4" alt="patientProfile" />

                        <b className="mt-3">{patient?.firstname} {patient?.lastname}  </b>
                        <Link to="/patientProfile" className="link" style={{marginLeft: "10%", fontSize: "14px", marginTop: "7px"}} onClick={() => sendEmail(patient?.email)}>{patient?.email}</Link>
                        <hr />
                        <>

                            <span>{moment(patient?.DOB).format("ll")} </span>
                            <span style={{backgroundColor: "#004aad", padding: '5px', color: "#FFF"}}><small>Age: {moment().diff(moment(patient?.DOB).format("ll"), 'years')} yrs</small></span>

                            <span className="text-center mt-2"><small><b>Account Created Date: </b></small></span>
                            <span className="text-center "><small>{moment(patient?.createdAt).tz("America/New_York").format("lll")}</small></span>

                            <span className="text-center mt-2"><small><b>Account Status: </b></small></span>
                            <span className="text-center "><small>{patient?.block === false ? <span style={{color: "green"}}>Active</span> : <span style={{color: "red"}}>Blocked </span>}</small></span>
                        </>
                    </div>  
                </div>

                <div className="col-md-6">
                    <div className="card card-bordered-01">
                        <span className="mt-3"> <small>{patient?.address}, {patient?.city} - {patient?.line2} - {patient?.city}, {patient?.state} - {patient?.zipCode} </small></span>
                        <hr />
                        <div className="row">
                        <div className="col-md-6">
                            <span className="profile-label">Primary Phone </span>
                            <p className="patient-profile-card-text" style={{color: 'dodgerblue'}}>{patient?.phone1 || 'N/A'}</p>

                            <span className="profile-label">Mobile</span>
                            <p className="patient-profile-card-text">{patient?.mobileNo || 'N/A'} </p>


                        </div>

                        <div className="col-md-6">
                            <div className="row">
                                <img src={doctorIcon} alt="" width="60" height="60"/>
                                <span className="ml-4"><b>Assigned Doctor</b>
                                {patient?.assigned_doctor_id ? <>
                                    <p className="patient-profile-card-text">Dr. {patient?.assigned_doctor_id?.firstname} {patient?.assigned_doctor_id?.lastname}</p>
                                </> : <>
                                <br />
                                    <span className="profile-label">Doctor Not Assigned</span>
                                </>}
                                </span>
                                
                            </div>
                            
                            <br />

                            <div className="row">
                                <img src={hrIcon} alt="" width="60" height="60"/>
                                <span className="ml-4"><b>Assigned Nurse</b>
                                {patient?.assigned_hr_id ? <>
                                    <p className="patient-profile-card-text">Hr. {patient?.assigned_hr_id?.firstname} {patient?.assigned_hr_id?.lastname}</p>
                                </> : <>
                                <br />
                                    <span className="profile-label">HR Not Assigned Yet</span>
                                </>}
                                </span>
                            </div>
                        </div>    
                        </div>
                        <hr />

                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-6">
                                
                                {/*  */}
                                {patient?.assigned_devices && patient?.assigned_devices?.length === 0 ? <>
                                <span className="profile-label">No Device Assigned Yet</span>

                                </> : <>
                                <small><b>Devices Assigned</b> ( 0{patient?.assigned_devices && patient?.assigned_devices?.length} ) </small>

                                {patient?.assigned_devices && patient?.assigned_devices.map((deviceass, index) => (
                                    <div key={index}>
                                        <div style={{padding: '5px', marginTop: '5px'}}>
                                            <div className="row-display">
                                                <div style={{marginLeft: '30px'}}>
                                                <small>IMEI: {deviceass?.deviceObjectId?.imei}</small>
                                                <small><br />Type: {deviceass?.deviceObjectId?.deviceType}</small> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                                    </>}
                            
                            {/*  */}
                                </div>
                                <div className="col-md-6">
                                    <b><small>Diseases: </small></b>
                                    <br/>
                                    <span className="patient-profile-disease-span"> {patient?.diseases ? patient?.diseases : 'N/A'} </span>
                                    <br/>    
                                    <small><b>Insurance Companies</b></small>
                                    <p className="patient-profile-card-text pt-1">{patient?.insurancecompany ? patient?.insurancecompany : 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card card-bordered pt-3 col-md-3 ">
                    <span style={{color: '#FFF'}}>Monthly Target ( {new Date().toLocaleString('en-us',{month:'short', year:'numeric'})} )</span>
                    <hr />
                    
                    <select className="form-control" value={minutesCategory} onChange={e => setMinutesCategory(e.target.value)}>
                        <option value="RPM">RPM Category</option>
                        <option value="CCM">CCM Category</option>
                    </select>
                    <br/>


                    <small><b>RPM Status: </b> <span className="activeRPMStatus">{patient?.rpmconsent == true ? "Active" : "In-Active"}</span></small> 
                    <hr />
                    {minutesCategory === 'RPM' ? <RPMMinutesProgress count={count} totalTime={totalTime} /> 
                    : 
                    <CCMMinutesProgress totalTimeinCCM={totalTimeinCCM}/>
                    }
                    

                </div>
                </div> {/* first row ends here */}

                
                <br />   
                {/* Second rows starts here */}
               
                <div className="container row-display">
                <div className="card card-bordered-02 col-md-8">
                    <div className="row">
                        <div className="col-md-6"> 
                        <small><b>Telemetary Readings (Last 5)</b></small>
                        <hr />
                        {telemetaryReadings && telemetaryReadings.length > 0 ? <>
                            {telemetaryReadings && telemetaryReadings.filter(healthData => healthData?.deviceId?.deviceType === "bp").slice(0,5).map((devicedata, index) => (
                                <div key={index} className="row-display mt-2" >
                                    {devicedata.telemetaryData?.sys && devicedata.telemetaryData?.dia !== undefined ? <>
                                        <Image src={systolicImg} style={{width: '20px', height: '20px'}} /> 
                                            {devicedata?.telemetaryData?.sys} / {devicedata?.telemetaryData?.dia} 
                                        <small> {moment(devicedata?.createdAt).tz("America/New_York").format("lll")}</small>
                                    </> : " "}
                                </div>
                            ))}
                        </> : 'N/A' }
                        </div>

                        <div className="col-md-6">
                            <small><b>Average B.P</b></small>
                            <hr />
                            
                            <div className="row-display">
                           <div className="circularbox">
                            <div className="percent">
                               <svg>
                                    <circle cx="70" cy="70" r="50"></circle>
                                    <circle cx="70" cy="70" r="50"></circle>  
                                </svg> 

                                <div className="number">
                            

                                {telemetaryReadings && telemetaryReadings.filter(healthData => healthData?.deviceId?.deviceType === "bp").slice(0,10).reduce((total, devicedata) =>  
                                   (Number(total) + Number(devicedata?.telemetaryData?.sys) / filteredReadings).toFixed(), 0
                                 )}
                                
                                </div>
                            </div>
                            <h5 className="text">Avg. Systolic</h5>
                           </div>

                           <div className="circularbox">
                            <div className="percent">
                               <svg>
                                    <circle cx="70" cy="70" r="50"></circle>
                                    <circle cx="70" cy="70" r="50"></circle>  
                                </svg> 

                                <div className="number">
                                {telemetaryReadings && telemetaryReadings.filter(healthData => healthData?.deviceId?.deviceType === "bp").slice(0,10).reduce((total, devicedata) =>  
                                   (Number(total) + Number(devicedata?.telemetaryData?.dia) / filteredReadings).toFixed(), 0
                                 )}
                                </div>
                            </div>
                            <h5 className="text">Avg. Diastolic</h5>
                           </div>
                           </div>
                        </div>
                    </div>
                </div>

                <div className="patient-logs-card col-md-3 mr-4">
                    <small><b>Time added ( {new Date().toLocaleString('en-us',{month:'short', year:'numeric'})} )</b></small> 
                    <hr />
                    <small><b>Total Time Added: <span style={{backgroundColor:'crimson', color: '#FFF', padding: '6px', borderRadius: '4px'}}>{totalTime} mins</span></b></small>
                    
                    {targets && targets.length > 0 ? <>
                        {targets.map((trgt, index) => ( 
                                 <div key={index} style={{background: '#004aad', 
                                    padding: '5px', 
                                    listStyle:"none", 
                                    borderRadius: '10px', 
                                    color: '#FFF',
                                    marginTop: '8px'
                                    }}
                                  >
                                    <small>Added <b>{trgt?.timeSpentInMinutes}</b> mins &nbsp;&nbsp;&nbsp; {moment(trgt?.createdAt).tz('America/New_York').format("lll")}</small>

                                 </div>
                        )).reverse()} 
                    </>
                    : <span>
                        No record added this month
                    </span>}

                    </div>
                </div>

                 {/* Second row ends here*/}


             {/* Careplan Modal */}
        <Modal show={carePlanShow} onHide={handleCarePlanModalClose}>
        <Modal.Header >
            <Modal.Title>Add Careplan</Modal.Title> 
            <Button variant="danger" onClick={handleCarePlanModalClose}><i className='bx bx-x'></i></Button>
         </Modal.Header>

            <Modal.Body>
                <Formik initialValues={{
                    description: '', 
                    readingsPerMonth:'',
                    readingsPerDay: '',
                    fileName: ''

                }}
                onSubmit={values => {
                    submitCarePlan(values)
                }}
                >
                { formik => (
                    <div>
                        <Form>                            
                            <TextField 
                                label="Readings / mo" 
                                name="readingsPerMonth" 
                                type="number" 
                                placeholder="Readings / mo"
                                value={readingsPerMonth} 
                                onChange={(e) => setReadingsPerMonth(e.target.value)}
                            />

                            <TextField 
                                label="Reading in Morning" 
                                name="readingsInSlot1" 
                                type="number" 
                                placeholder="Readings / day"
                                value={readingsInDay} 
                                onChange={(e) => setReadingsInDay(e.target.value)}
                            />

                            <TextField 
                                label="Reading in Night" 
                                name="readingsInSlot2" 
                                type="number" 
                                placeholder="Readings / day"
                                value={readingsInNight} 
                                onChange={(e) => setReadingsInNight(e.target.value)}
                            />

                        <label htmlFor="description" className="form-label mt-3">Description</label>
                            <textarea 
                                label="Description" 
                                name="description"
                                className="form-control"
                                rows="4"	
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Type description here .... "
                        />

                            <input 
                                label="File" 
                                name="fileName" 
                                type="file"
                                accept=".doc, .docx, .pdf"
                                className="form-control"
                                style={{border: 'none'}} 
                                onChange={handleFileChange}
                            />
                        <br/>
                        <div className="row-class" style={{justifyContent: 'space-between'}}>
                            <button className="reset-btn ml-3" type="submit"> Submit</button>
                        </div>
                        </Form>
                    </div>
                )}   
                </Formik>   
            </Modal.Body>
        </Modal>
        {/* Careplan Modal ends here*/}

         {/* Time spent Modal */}
         <Modal size="md" show={addTimeShow} onHide={handleClose}>
         <Modal.Header >
            <Modal.Title>Add Time Manually</Modal.Title> 
            <Button variant="danger" onClick={handleClose}><i className='bx bx-x'></i></Button>
         </Modal.Header>

            <Modal.Body>
                <AddTimeManually hrId={hrId} patientId={patientid} />   
            </Modal.Body>
        </Modal>
        {/* Time spent Modal ended here */}
    </>
  )
}

export default HRPatientInfo