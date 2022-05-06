import React, {Fragment, useEffect, useState} from 'react';
import clockImg from '../../assets/Images/clock.png';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Modal, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import TextField from '../../components/Form/TextField';
import { carePlanOfPatient, getPatientCarePlan, hrTimeSpentOfCurrentMonth, timeSpentOnPatient } from '../../actions/HRActions';
import { getRemainingReadings} from '../../actions/adminActions';
import moment from 'moment';
import { ADDING_CARE_PLAN_RESET, ADDING_TIME_SPENT_RESET } from '../../constants/HRConstants';
import patientProfileImg from '../../assets/Images/patientProfile.png';
import {Link} from 'react-router-dom';
import { useAlert } from 'react-alert';


const HRPatientInfo = ({patient}) => {

 const dispatch = useDispatch();   
 const alert = useAlert();

//  const input = new Date();
//  const output = moment(input, "DD-MM-YY");
//  let startDate = output.startOf('month').format('L');
//  let endDate = output.endOf('month').format('L');


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



const handleClose = () => setAddTimeShow(false);
const handleShow = () => setAddTimeShow(true);
const handleCarePlanModalClose = () => setCarePlanShow(false);
const handleCarePlanModalShow = () => setCarePlanShow(true);
const [addTimeShow, setAddTimeShow] = useState(false);

 const { careplan } = useSelector(state => state.careplan);
 const { totalTime } = useSelector(state => state.totalTimeSpent);
 const {isSuccessful, carePlanAdded, error: careplanerror } = useSelector(state => state.timeSpent);
 const { count } = useSelector(state => state.readingsCount);
 const {hr} = useSelector(state => state.hrAuth); 
 let hrId = hr?._id;
 let patientid = patient?._id;
  
    // dispatches
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

    dispatch(getPatientCarePlan(patientid));
    dispatch(hrTimeSpentOfCurrentMonth(patientid, hrId, `${year}-${month}-01`, `${year}-${month=month+1}-01`));
    dispatch(getRemainingReadings(patientid));

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

    const submitTimeSpent = (values) => {
        if(values.timespent === ''){
            return
        } 
        dispatch(timeSpentOnPatient(patient?._id, hr?._id ,values));
    }

  return (
    <>
      <div className="row-display">
            <div>
                <h5 className="pt-2 mt-2">{patient?.firstname} {patient?.lastname}<span style={{ color: '#007673'}}> Details </span></h5>
            </div>
            
            
            <div>
                <img src={clockImg} className="img-responsive img-thumbnail" width="50" height="50"/>
                <small className="total-time-spent">{totalTime} mins spent in month of <span style={{color: '#007673'}}>{currMonthName}</span> </small>
            </div>

            {careplan ? <Fragment>
                <div className="col-md-2">
                    <button disabled className="btn btn-outline-danger mt-2"><small>+ Careplan</small></button>
                </div>
            </Fragment> : <Fragment>
                <div className="col-md-2">
                    <button className="reset-btn mt-2" onClick={handleCarePlanModalShow}>+ Careplan</button>
                </div>    
            </Fragment>}

            <button className="btn btn-info btn-sm shadow-none" onClick={handleShow}><small>Add Time Manually</small></button>

            </div>
            <br/><br/>
    
            <div className="row">
                <div className="col-md-3">
                    <div>
                        <img src={patientProfileImg} className="img-responsive profile-card-img" alt="patientProfile" />
                        
                            <p className="patient-profile-name">{patient?.firstname} {patient?.lastname} </p>
                            
                            <Fragment>
                                <p className="patient-email">{patient?.email}</p>

                                <span className="patient-profile-disease-span"> {patient?.diseases ? patient?.diseases : 'N/A'} </span> 
                            </Fragment>
                    </div>    
                </div>


                <div className="col-md-3">
                        <span className="patient-profile-col-heading">Address Details</span>                                 
                            <hr />

                            <span className="profile-label">Address: </span>
                            <p className="patient-profile-card-text">{patient?.address}, {patient?.city}</p>

                            <span className="profile-label">State: </span>
                            <p className="patient-profile-card-text">{patient?.state} , {patient?.zipCode}</p>

                            <span className="profile-label">Line 2: </span>
                            <p className="patient-profile-card-text">{patient?.line2}</p>
                </div>

                <div className="col-md-3">
                        <span className="patient-profile-col-heading">Contact Information</span>                                 
                            <hr />

                            <span className="profile-label">Phone 1 </span>
                            <p className="patient-profile-card-text">{patient?.phone1 ? patient?.phone1 : 'N/A'}</p>

                            <span className="profile-label">Mobile No </span>
                            <p className="patient-profile-card-text">{patient?.mobileNo ? patient?.mobileNo : 'N/A' } </p>
                </div>

                <div className="col-md-3 ">
                    <span className="patient-profile-col-heading">Patient Analytics</span>                                 
                    <hr />

                    
                    <div className="patient-profile-data-div">
                        <p style={{fontSize: 14}} className="text-center mt-2">RPM Consent : </p>
                        <span className="check-icon mt-2">{patient?.rpmconsent === true ? 'Signed' : 'Not Signed'}</span>
                    </div>

                    {careplan ? <>
                    <div className="patient-profile-data-div mt-2">
                    <p style={{fontSize: 14}} className="text-center mt-2">Readings /mo : </p>
                    <span className="check-icon mt-2">{careplan?.data?.readingsPerMonth}</span>
                    </div>
                    </> : ''}
                    
                    {careplan ? <>
                        <div className="patient-profile-data-div mt-2">
                            <p style={{fontSize: 14}} className="text-center mt-2">Remaining : </p>
                            
                            <span className="check-icon mt-2">{ReadingsperMonth - readingsThisMonth}</span>
                        </div>
                    </> : ''}
                    

                    <div className="patient-profile-data-div mt-2">
                        <p style={{fontSize: 14}} className="text-center mt-2">Initial Month : </p>
                        <span className="check-icon mt-2">{patient?.initialsetup ? patient?.initialsetup : 'N/A'}</span>
                    </div>
                            
                </div>
                </div> {/* first row ends here */}

                
                <br />   
                                <div className="row">
                                <div className="col-md-3">
                                    <span className="patient-profile-col-heading">Physician Information</span>                                 
                                        <hr />
                                    {patient?.assigned_doctor_id ? <>
                                        <span className="profile-label">Doctor</span>
                                    <p className="patient-profile-card-text">
                                        Dr. {patient?.assigned_doctor_id?.firstname} {patient?.assigned_doctor_id?.lastname}</p>
                                    </> : <>
                                        <small>No doctor assigned yet</small>
                                    </>}

                                    {patient?.assigned_hr_id ? <>
                                        <span className="profile-label">HR</span>
                                    <p className="patient-profile-card-text">
                                        Hr. {patient?.assigned_hr_id?.firstname} {patient?.assigned_hr_id?.lastname}</p>
                                    </> : <>
                                        <small>No hr assigned yet</small>
                                    </>}
                                    </div>

                                <div className="col-md-3">
                                    <span className="patient-profile-col-heading">Devices Assigned</span>                                 
                                        <hr />
                                         {patient?.assigned_devices && patient?.assigned_devices.length === 0 ? <Fragment>
                                            <b>No Device Assigned Yet</b>
                                           
                                            </Fragment> : <Fragment>
                                            <span className="profile-label">Assigned Devices (0{patient?.assigned_devices && patient?.assigned_devices.length})</span>
                                            
                                             {patient?.assigned_devices && patient?.assigned_devices.map((deviceass, index) => (
                                                <div key={index}>
                                                    <p key={index}><Badge bg="success text-white">{deviceass?.deviceObjectId?._id} </Badge>
                                                </p>
                                                </div>
                                            ))}           
                                        </Fragment>}      
                                        </div>


                                        <div className="col-md-3">
                                            <span className="patient-profile-col-heading">Insurance companies</span>                                 
                                            <hr />
                                                <div className="row">    
                                                    <div className="col-md-7">
                                                        <p className="patient-profile-card-text">{patient?.insurancecompany ? patient?.insurancecompany : 'N/A'}</p>   
                                                    </div>
                                                </div>                      
                                        </div>

                                        <div className="col-md-3">
                                            <span className="patient-profile-col-heading">Patient Careplan</span>                                 
                                            <hr />        
                                                
                                            {careplan && ( <Fragment>
                                                <small className="patient-profile-careplan-desc">{careplan && careplan?.data?.Description}</small>            
                                                <small style={{float: 'right', marginTop: 10}}>
                                                    <i>Added By: {careplan?.data?.assigned_hr_id?.firstname} {careplan?.data?.assigned_hr_id?.lastname}
                                                    &nbsp;&nbsp;<Badge bg="success text-white">{careplan?.data?.assigned_hr_id?.role}</Badge> 
                                                    </i>
                                                </small>    
                                                <br/><br/>
                                                <Link to={{pathname: "/HR/Careplan/Details", state: {patientId: patientid}}} className="btn btn-dark btn-block"> Read More</Link>
                                            </Fragment>)}
                                        </div>
                                </div> {/* Second row ends here*/}


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
         <Modal show={addTimeShow} onHide={handleClose}>
         <Modal.Header >
            <Modal.Title>Add Time (Manually)</Modal.Title> 
            <Button variant="danger" onClick={handleClose}><i className='bx bx-x'></i></Button>
         </Modal.Header>

            <Modal.Body>
                <Formik initialValues={{
                    timeSpent: '',
                    colclusion: '', 
                }}
                onSubmit={values => {
                    submitTimeSpent(values)
                }}
                >
                { formik => (
                    <div>
                        <Form>
                            <TextField 
                                label="Time Spent (In Mins)" 
                                name="timespent" 
                                type="text" 
                                placeholder="Time Spent"
                            />
                            <small style={{color: 'red', fontSize: '12px'}}>Note: Time should not be greater than 30 mins </small>
                            
                            <TextField 
                                label="Conclusion" 
                                name="conclusion" 
                                type="text"	
                                placeholder="Type your conclusion here .... "
                            />

                        <div className="row-class" style={{justifyContent: 'space-between'}}>
                            <button className="reset-btn ml-3" type="submit">Submit</button>
                        </div>
                        </Form>
                    </div>
                )}   
                </Formik>   
            </Modal.Body>
        </Modal>
        {/* Time spent Modal ended here */}
    </>
  )
}

export default HRPatientInfo