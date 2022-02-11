import React, {useState, useEffect, Fragment} from 'react';
import MetaData from '../../layouts/MetaData';
import  HRSidebar from '../../components/HR/HRSidebar';
import HRTopBar from '../../components/HR/HRTopbar';
import Loader from '../../layouts/Loader';
import { patientProfile, getPatientTelemetryData} from '../../actions/adminActions';
import { timeSpentOnPatient, carePlanOfPatient, getPatientCarePlan} from '../../actions/HRActions';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import patientProfileImg from '../../assets/Images/patientProfile.png';
import { Badge, Tabs, Tab, Modal, Spinner, OverlayTrigger, Tooltip} from 'react-bootstrap';
import CuffTelemetaryData from '../../components/Patient/CuffTelemetaryData';
import WeightTelemetaryData from '../../components/Patient/WeightTelemetaryData'; 
import { COMMENT_RESET, ADDING_TIME_SPENT_RESET, ADDING_CARE_PLAN_RESET } from '../../constants/HRConstants';
import { Formik, Form } from 'formik';
import {Link} from 'react-router-dom';
import TextField from '../../components/Form/TextField';

const HRPatientProfile = (props) => {
    const alert = useAlert();

  let patientid = props?.location?.state?.patientid;
  
  const dispatch = useDispatch();
  const [addTimeShow, setAddTimeShow] = useState(false);
  const [carePlanShow ,setCarePlanShow] = useState(false);
  const [description, setDescription] = useState('');

  const { loading, error, patient} = useSelector(state => state.patientProfile);
  const { deviceData } = useSelector(state => state.deviceData);
  const { commentSuccess} = useSelector(state => state.comments);
  const {isSuccessful, carePlanAdded, error: careplanerror } = useSelector(state => state.timeSpent);
  const {hr} = useSelector(state => state.hrAuth);  
  const { careplan } = useSelector(state => state.careplan);
  
  useEffect(() => {
    if(error){
        return alert.error(error);
    }

    if(careplanerror) {
        alert.error(careplanerror);
        dispatch({ type: ADDING_CARE_PLAN_RESET })
        setCarePlanShow(false);
    }

    dispatch(patientProfile(patientid));
    dispatch(getPatientTelemetryData(patientid))
    dispatch(getPatientCarePlan(patientid));

    if(commentSuccess) {
        alert.success('Comment added');
        dispatch({ type: COMMENT_RESET });
        dispatch(patientProfile(patientid));
        dispatch(getPatientTelemetryData(patientid))
    }

    if(isSuccessful) {
        setAddTimeShow(false);
        alert.success('added');
        dispatch({ type: ADDING_TIME_SPENT_RESET})
        dispatch(patientProfile(patientid));
        dispatch(getPatientTelemetryData(patientid))
    }

    if(carePlanAdded){
        setCarePlanShow(false);
        alert.success('Care plan added');
        dispatch({ type: ADDING_CARE_PLAN_RESET })
        setDescription(''); 
        dispatch(patientProfile(patientid));
        dispatch(getPatientTelemetryData(patientid))
    }

}, [dispatch, alert, error, commentSuccess, isSuccessful,carePlanAdded, careplanerror]);


    const handleClose = () => setAddTimeShow(false);
    const handleShow = () => setAddTimeShow(true);
    const handleCarePlanModalClose = () => setCarePlanShow(false);
    const handleCarePlanModalShow = () => setCarePlanShow(true);

    const submitTimeSpent = (values) => {
        if(values.timespent === ''){
            return
        } 
        dispatch(timeSpentOnPatient(patient?._id, hr?._id ,values));
    }

    const submitCarePlan = () => {
        if(description === '') {
            setCarePlanShow(false);
            alert.error('Description is required');
            return
        }
        dispatch(carePlanOfPatient(patient?._id, hr?._id, description))
    }

  return <Fragment>
      <MetaData title="Patients Profile"/>
        <HRSidebar />    

        <section className="home-section">
        {/* TopBar */}
        <HRTopBar />

        {/* Time spent Modal */}
        <Modal show={addTimeShow} onHide={handleClose}>
            <Modal.Body>
                <h5>Add <span style={{color: '#F95800'}}> Time </span></h5>
                <hr />
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
                                label="Time Spent" 
                                name="timespent" 
                                type="text" 
                                placeholder="Time Spent"
                            />
                            
                            <TextField 
                                label="Conclusion" 
                                name="conclusion" 
                                type="text"	
                                placeholder="Type your conclusion here .... "
                            />

                        <div className="row-class" style={{justifyContent: 'space-between'}}>
                            <button className="reset-btn ml-3" type="submit">{loading ? <Spinner animation="border" style={{height: '20px', width: '20px'}}/> : 'Submit'}</button>
                        </div>
                        </Form>
                    </div>
                )}   
                </Formik>   
            </Modal.Body>
        </Modal>
        {/* Time spent Modal ended here */}
        
        {/* Careplan Modal */}
        <Modal show={carePlanShow} onHide={handleCarePlanModalClose}>
            <Modal.Body>
                <h5>Add <span style={{color: '#F95800'}}> Care Plan </span></h5>
                <hr />
                <Formik initialValues={{
                    description: '', 
                }}
                onSubmit={values => {
                    submitCarePlan(values)
                }}
                >
                { formik => (
                    <div>
                        <Form>
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
                        <br/>
                        <div className="row-class" style={{justifyContent: 'space-between'}}>
                            <button className="reset-btn ml-3" type="submit">{loading ? <Spinner animation="border" style={{height: '20px', width: '20px'}}/> : 'Submit'}</button>
                        </div>
                        </Form>
                    </div>
                )}   
                </Formik>   
            </Modal.Body>
        </Modal>
        {/* Careplan Modal ends here*/}

        {loading ? <Loader /> : <Fragment>
                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
                        <div className="home-content">
                            <div className="container">    

                            {patient && <Fragment>
                                <div className="row">
                                <div className="col-md-8">
                                    <h5 className="pt-2 mt-2">{patient?.firstname} {patient?.lastname}<span style={{ color: '#F95800'}}> Details </span></h5>
                                </div>

                                <div className="col-md-2">
                                    <button className="submit-btn mt-2" onClick={handleShow}><small>Add Time</small></button>
                                </div>
                                
                                {careplan ? <Fragment>
                                    <div className="col-md-2">
                                        <button disabled className="btn btn-outline-danger mt-2"><small>Careplan Added</small></button>
                                    </div>
                                </Fragment> : <Fragment>
                                    <div className="col-md-2">
                                        <button className="reset-btn mt-2" onClick={handleCarePlanModalShow}>Add Careplan</button>
                                    </div>    
                                </Fragment>}
                                
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-md-3">
                                        <div>
                                            <img src={patientProfileImg} className="img-responsive profile-card-img" alt="patientProfile" />
                                            
                                                <p className="patient-profile-name">{patient?.firstname} {patient?.lastname} </p>
                                        
                                                <Fragment>
                                                    <p className="patient-email">{patient?.email}</p>
                                                    <p style={{fontSize: 14}} className="text-center">RPM Consent {patient?.rpmconsent === true ? <i className="bx bx-check check-icon"></i>: <i class='bx bx-x cross-icon'></i>}</p>
                                                    <p style={{fontSize: 14}} className="text-center">Readings /mo <i className="check-icon">16</i></p>
                                                    {patient?.initialsetup ? <p style={{fontSize: 14}} className="text-center">Initial setup <i className="check-icon">{patient?.initialsetup}</i></p> : <p className="patient-profile-name">Month Initial:  N/A</p>}
                                                </Fragment>
                                        </div>    
                                    </div>


                                    <div className="col-md-3">
                                            <span className="patient-profile-col-heading">Address</span>                                 
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
                                            <span className="patient-profile-col-heading">Patient Disease (s)</span>                                 
                                             <hr />
                                             <span className="patient-profile-disease-span"> {patient?.diseases ? patient?.diseases : 'N/A'} </span>   
                                    </div>
                                 </div> {/* first row ends here */}


                                 <br />   
                                <div className="row">
                                <div className="col-md-3">
                                    <span className="patient-profile-col-heading">Physician Information</span>                                 
                                        <hr />

                                    <span className="profile-label">Name</span>
                                    <p className="patient-profile-card-text">{patient?.assigned_doctor_id && patient?.assigned_doctor_id.firstname} {patient?.assigned_doctor_id && patient?.assigned_doctor_id.lastname}</p>

                                    <span className="profile-label">Gender</span>
                                    <p className="patient-profile-card-text"><Badge bg="info text-white" className="male-tag">{patient?.assigned_doctor_id && patient?.assigned_doctor_id.gender}</Badge> </p>
                                </div>

                                <div className="col-md-3">
                                    <span className="patient-profile-col-heading">Devices Assigned</span>                                 
                                        <hr />
                                         {patient?.assigned_devices && patient?.assigned_devices.length === 0 ? <Fragment>
                                            <b>No Device Assigned Yet</b>
                                           
                                            </Fragment> : <Fragment>
                                            <span className="profile-label">Assigned Devices (0{patient?.assigned_devices && patient?.assigned_devices.length})</span>
                                            
                                             {patient?.assigned_devices && patient?.assigned_devices.map((deviceass, index) => (
                                                <Fragment>
                                                <p key={index}><Badge bg="success text-white">{deviceass?.deviceObjectId?._id} </Badge>
                                                {/* <button className="btn" style={{color: 'red'}} onClick={() => removeAssignDevice(deviceass?.deviceid)}>
                                                    <i className="bx bx-trash"></i>
                                                </button> */}
                                                </p>
                                                
                                                </Fragment>
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
                                                <small className="patient-profile-careplan-desc">{careplan && careplan?.Description}</small>            
                                                <small style={{float: 'right', marginTop: 10}}>
                                                    <i>Added By: {careplan?.assigned_hr_id?.firstname} {careplan?.assigned_hr_id?.lastname}
                                                    &nbsp;&nbsp;<Badge bg="success text-white">{careplan?.assigned_hr_id?.role}</Badge> 
                                                    </i>
                                                </small>    
                                                <br/><br/>
                                                <Link to={{pathname: "/HR/Careplan/Details", state: {patientId: patientid}}} className="btn btn-dark btn-block"> Read More</Link>
                                            </Fragment>)}
                                        </div>
                                </div> {/* Second row ends here*/}



                        {/* Patient Telemetary Data */}
                        <div className="col-md-3">
                            <h5 className="pt-2 mt-2">Telemetary <span style={{ color: '#F95800'}}>Data </span></h5>
                        </div>


                        <Tabs defaultActiveKey="cuff" id="uncontrolled-tab-example" selectedTabClassName="bg-white">
                            <Tab eventKey="cuff" title="Cuff ( Telemetary Data )">
                            {deviceData && deviceData.map((devicedata, index) => (
                                <div key={index}>
                                    {devicedata?.telemetaryData?.sys && devicedata?.telemetaryData?.dia ? <Fragment>
                                        <CuffTelemetaryData healthData= {devicedata} isAdmin={false} />
                                    </Fragment> : ''}
                                </div>
                            ))}
                            </Tab>

                            <Tab eventKey="weight" title="Weight ( Telemetary Data )">
                                {deviceData && deviceData.map((devicedata, index) => (
                                    <div key={index}>
                                        {devicedata?.telemetaryData?.telemetaryData?.wt && devicedata?.telemetaryData?.telemetaryData?.fat ? <Fragment>
                                            <WeightTelemetaryData healthData={devicedata} isAdmin={false}/>
                                        </Fragment> : ''}   
                                    </div>
                                ))}
                            </Tab>
                        </Tabs>   
                        </Fragment>
                        }
                        </div>
                    </div>
                </div>
                </Fragment>
                }
    </section>
  </Fragment>;
};

export default HRPatientProfile;