import React, {useState, useEffect, Fragment} from 'react';
import MetaData from '../../layouts/MetaData';
import  HRSidebar from '../../components/HR/HRSidebar';
import HRTopBar from '../../components/HR/HRTopbar';
import Loader from '../../layouts/Loader';
import { patientProfile, getPatientTelemetryData, sortTelemetartData, getRemainingReadings} from '../../actions/adminActions';
import { timeSpentOnPatient, carePlanOfPatient, getPatientCarePlan, hrTimeSpentOfCurrentMonth} from '../../actions/HRActions';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import patientProfileImg from '../../assets/Images/patientProfile.png';
import { Badge, Row, Col, Nav, Tab, Modal, Spinner} from 'react-bootstrap';
import CuffTelemetaryData from '../../components/Patient/CuffTelemetaryData';
import WeightTelemetaryData from '../../components/Patient/WeightTelemetaryData'; 
import { COMMENT_RESET, ADDING_TIME_SPENT_RESET, ADDING_CARE_PLAN_RESET } from '../../constants/HRConstants';
import { Formik, Form } from 'formik';
import {Link} from 'react-router-dom';
import TextField from '../../components/Form/TextField';
import clockImg from '../../assets/Images/clock.png'
import moment from 'moment';
import Pagination from 'react-js-pagination';


const HRPatientProfile = (props) => {
    const alert = useAlert();

  let patientid = props?.location?.state?.patientid;

    const input = new Date();
    const output = moment(input, "DD-MM-YY");
    let currMonthName  = moment().format('MMMM');
    let startDate = output.startOf('month').format('L');
    let endDate = output.endOf('month').format('L');
    let readingmonth;

    const [filterStartDate, setFilterStartDate] = useState('');
    const [filterEndDate, setFilterEndDate] = useState('');
  
  const dispatch = useDispatch();
  const [addTimeShow, setAddTimeShow] = useState(false);
  const [carePlanShow ,setCarePlanShow] = useState(false);
  const [description, setDescription] = useState('');
  const [readingsInDay, setReadingsInDay] = useState('');
  const [readingsInNight, setReadingsInNight] = useState('');
  const [readingsPerMonth, setReadingsPerMonth] = useState('');
  const [fileName, setFileName] = useState({});


  const { loading, error, patient} = useSelector(state => state.patientProfile);
  const { deviceData, Count } = useSelector(state => state.deviceData);
  const { commentSuccess} = useSelector(state => state.comments);
  const { count } = useSelector(state => state.readingsCount);
  const {isSuccessful, carePlanAdded, error: careplanerror } = useSelector(state => state.timeSpent);
  const {hr} = useSelector(state => state.hrAuth);  
  const { careplan } = useSelector(state => state.careplan);
  const { totalTime } = useSelector(state => state.totalTimeSpent);
  
  let hrId = hr?._id;

  const [readingPerPage, setReadingsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, sortBy] = useState(-1);


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
    dispatch(getPatientTelemetryData(patientid, readingPerPage, currentPage, sort))
    dispatch(getPatientCarePlan(patientid));
    dispatch(hrTimeSpentOfCurrentMonth(patientid, hrId, startDate, endDate));
    dispatch(getRemainingReadings(patientid));

    if(commentSuccess) {
        alert.success('Comment added');
        dispatch({ type: COMMENT_RESET });
        dispatch(patientProfile(patientid));
        dispatch(getPatientTelemetryData(patientid, readingPerPage, currentPage, sort))
    }

    if(isSuccessful) {
        setAddTimeShow(false);
        alert.success('added');
        dispatch({ type: ADDING_TIME_SPENT_RESET})
        dispatch(patientProfile(patientid));
        dispatch(getPatientTelemetryData(patientid, readingPerPage, currentPage, sort))
    }

    if(carePlanAdded){
        setCarePlanShow(false);
        alert.success('Care plan added');
        dispatch({ type: ADDING_CARE_PLAN_RESET })
        setDescription(''); 
        dispatch(patientProfile(patientid));
        dispatch(getPatientTelemetryData(patientid, readingPerPage, currentPage, sort))
    }

}, [dispatch, alert, error, commentSuccess, isSuccessful,carePlanAdded, careplanerror, currentPage, sort]);


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

    const handleFileChange = e => {
        setFileName(e.target.files[0]);
      }

    const submitCarePlan = () => {
        if(description === '') {
            setCarePlanShow(false);
            alert.error('Description is required');
            return
        }

        dispatch(carePlanOfPatient(patient?._id, hr?._id, 
            description, 
            readingsPerMonth, 
            readingsInDay,
            readingsInNight, 
            fileName))
    }

    const sortPatientTelemetaryData = (date) => { 
        dispatch(sortTelemetartData(patientid, filterStartDate, filterEndDate));
    }

    const refreshHandler = () => {
        dispatch(patientProfile(patientid));
        dispatch(getPatientTelemetryData(patientid))
        dispatch(getPatientCarePlan(patientid));
        dispatch(hrTimeSpentOfCurrentMonth(patientid, hrId, startDate, endDate));
        setFilterStartDate("");
        setFilterEndDate("");
    }

    function setCurrentPageNumber(currentPage) {
        setCurrentPage(currentPage);
    }
    
    let readingsThisMonth;
    let ReadingsperMonth; 
 
    readingsThisMonth = count;
    ReadingsperMonth = careplan?.data?.readingsPerMonth;

    

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
                                <div className="col-md-3">
                                    <h5 className="pt-2 mt-2">{patient?.firstname} {patient?.lastname}<span style={{ color: '#F95800'}}> Details </span></h5>
                                </div>
                                
                                
                                <div className="col-md-5">
                                    <img src={clockImg} className="img-responsive img-thumbnail" width="50" height="50"/>
                                    <small className="total-time-spent">{totalTime} mins spent in month of <span style={{color: '#F95800'}}>{currMonthName}</span> </small>
                                </div>
                                
                                

                                <div className="col-md-2">
                                    <button className="submit-btn mt-2" onClick={handleShow}><small>Add Time</small></button>
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
                                
                                </div>
                                <br />

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
                                        <span className="profile-label">Name</span>
                                    <p className="patient-profile-card-text">
                                        {patient?.assigned_doctor_id?.firstname} {patient?.assigned_doctor_id?.lastname}</p>
                                    </> : <>
                                        <small>No doctor assigned yet</small>
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


                        
                        {/* Patient Telemetary Data */}
                        {deviceData && deviceData.length > 0 ? <Fragment>
                       

                        <div className="col-md-12">
                                <h5 className="pt-2 mt-2">Telemetary Data <span style={{ color: '#F95800'}}>(Total Readings: {Count}) </span></h5>
                            </div>

                            <div className="row-display patient-profile-col-heading" style={{ 
                                padding: 10,
                                borderRadius: '10px'
                                }}
                            > 
                            
                            <div style={{width: '30%'}}>
                            <label>To: </label>
                              <input 
                                type="date"
                                value={filterStartDate}
                                onChange={e => setFilterStartDate(e.target.value)}
                                max={moment().format("YYYY-MM-DD")} 
                                className="form-control"
                                />
                            </div>
                            
                            &nbsp;&nbsp;
                            <div style={{width: '30%'}}>                            
                            <label>From: </label>
                              <input 
                                type="date"
                                value={filterEndDate}
                                onChange={e => setFilterEndDate(e.target.value)}
                                max={moment().format("YYYY-MM-DD")} 
                                className="form-control"
                             />
                             </div>
                            
                             &nbsp;&nbsp;
                             <div style={{width: '30%'}}>                            
                                <label>Sort By: </label>
                                    <select 
                                    value={sort}
                                    onChange={e => sortBy(e.target.value)}
                                    className="form-control">
                                        <option value="-1">Descending (last to first)</option>
                                        <option value="1">Ascending (first to last)</option>
                                    </select>
                             </div>
                            
                            &nbsp;&nbsp;
                             <div> 
                                 <label>Search</label>
                                    <button 
                                        className="btn add-staff-btn"
                                        onClick={sortPatientTelemetaryData}>Search
                                    </button>    
                            </div>

                            <div> 
                                 <label>Reset</label>
                                    <button
                                        onClick={refreshHandler} 
                                        className="btn add-staff-btn">Reset
                                    </button>    
                            </div>
                            </div>

                        <br /><br />
                        
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Col sm={12}>
                                <Nav variant="pills" className="flex-row">
                                    <Nav.Item style={{cursor: 'pointer'}}>
                                    <Nav.Link eventKey="first">Cuff (B.P | Telemetary Data)</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item style={{cursor: 'pointer'}}>
                                    <Nav.Link eventKey="second">Weight (Telemetary Data)</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>

                            <Col sm={12}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                {deviceData && deviceData.map((devicedata, index) => (
                                    <div key={index}>
                                        {devicedata?.telemetaryData?.sys && devicedata?.telemetaryData?.dia ? <Fragment>
                                            <CuffTelemetaryData healthData={devicedata} count={Count} readingsPerPage={readingPerPage} currentPage={currentPage} isAdmin={false} />
                                        </Fragment> : ''}
                                    </div>
                                ))}

                                {/* Pagination */}
                                {!filterStartDate && !filterEndDate && readingPerPage <= Count && (
                                    <div className="d-flex justify-content-center mt-5"> 
                                    <Pagination activePage={currentPage} 
                                    itemsCountPerPage={readingPerPage} 
                                    totalItemsCount = {Count}
                                    onChange={setCurrentPageNumber} 
                                    nextPageText = {'⟩'}
                                    prevPageText = {'⟨'}
                                    firstPageText = {'«'}
                                    lastPageText = {'»'}
                                    itemClass='page-item'
                                    linkClass="page-link"
                                    />           
                                </div>
                                )} 
                                </Tab.Pane>
                                
                                

                                <Tab.Pane eventKey="second">
                                {deviceData && deviceData.map((devicedata, index) => (
                                    <div key={index}>
                                        {devicedata?.telemetaryData?.wt && devicedata?.telemetaryData?.fat ? <Fragment>
                                            <WeightTelemetaryData healthData={devicedata} isAdmin={false} />
                                        </Fragment> : ''}   
                                    </div>
                                ))}
                                </Tab.Pane>
                            </Tab.Content>
                            </Col>
                    </Row>
                    </Tab.Container>

                    
                       
                        </Fragment> : <small className="text-center" style={{color: 'gray', marginLeft: '350px'}}>No telemetary data found <button className="btn btn-primary btn-sm"onClick={refreshHandler}>Refresh List</button></small>}
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
