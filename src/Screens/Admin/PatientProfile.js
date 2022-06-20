import React, { useEffect, useState, Fragment } from 'react';
import MetaData from '../../layouts/MetaData';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import CuffTelemetaryData from '../../components/Patient/CuffTelemetaryData'; 
import WeightTelemetaryData from '../../components/Patient/WeightTelemetaryData';
import PatientInfo from '../../components/Patient/PatientInfo';
import { patientProfile, getRemainingReadings, getPatientTelemetryData, sortTelemetartData} from '../../actions/adminActions';
// import { getPatientCarePlan } from '../../actions/HRActions';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import moment from 'moment';
import { Tab, Row, Col, Nav} from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import Pagination from 'react-js-pagination';
import PatientProfileGraph from '../../components/PatientProfileGraph';
 

const PatientProfile = (props) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    let patientid = props?.location?.state?.patientid;


    const { loading, error, patient, isUpdated} = useSelector(state => state.patientProfile);
    const { deviceData, Count } = useSelector(state => state.deviceData);
    const { careplan } = useSelector(state => state.careplan);
    const { count } = useSelector(state => state.readingsCount);

    const [accordion, setAccordion] = useState(false);
    const [readingPerPage, setReadingsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, sortBy] = useState(-1);

    
    useEffect(() => {
        if(error){
            return alert.error(error);
        }

        dispatch(patientProfile(patientid));
        dispatch(getPatientTelemetryData(patientid, readingPerPage, currentPage, sort));
        
        // dispatch(getPatientCarePlan(patientid));
        dispatch(getRemainingReadings(patientid));
        
        
        if(isUpdated) {
            alert.success('Updated Successfully');
        }

    }, [dispatch, alert, error, isUpdated, currentPage, sort]);

    const sortPatientTelemetaryData = () => {
        dispatch(sortTelemetartData(patientid, startDate, endDate, readingPerPage, currentPage));
    }
    
    const refreshHandler = () => {
        dispatch(patientProfile(patientid));
        dispatch(getPatientTelemetryData(patientid, readingPerPage, currentPage, sort))
        // dispatch(getPatientCarePlan(patientid));
        setStartDate('');
        setEndDate('');
        // setSort('')
    }

    
    let readingsThisMonth;
    let ReadingsperMonth; 
 
    readingsThisMonth = count;
    ReadingsperMonth = careplan?.data?.readingsPerMonth;
    
    function setCurrentPageNumber(currentPage) {
        setCurrentPage(currentPage);
    }

    return (
        <Fragment>
            <MetaData title="Patient Profile"/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />
                
                {loading ? <Loader /> : <Fragment>
                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
                        <div className="home-content">
                            <div className="container">    

                            {patient && <Fragment>
                                {/* Patient Info Component */}
                                <PatientInfo 
                                    patient={patient}
                                    count={count}
                                    telemetaryReadings={deviceData}
                                    patientid={patientid}
                                />

                            {deviceData && deviceData.length > 0 ? <Fragment>
                            <br/><br/>
                        
                            <div className="col-md-12">
                                <h5 className="pt-2 mt-2">Telemetary Data <span style={{ color: '#004aad'}}>(Total Readings: {Count}) </span></h5>
                            </div>

                            <div className="row-display patient-profile-col-heading" style={{ 
                                padding: 10,
                                borderRadius: '10px'
                                }}> 
                            
                            <div style={{width: '30%'}}>
                            <label>To: </label>
                              <input 
                                type="date"
                                value={startDate}
                                onChange={e => setStartDate(e.target.value)}
                                max={moment().format("YYYY-MM-DD")} 
                                className="form-control"
                                />
                            </div>
                            
                            &nbsp;&nbsp;
                            <div style={{width: '30%'}}>                            
                            <label>From: </label>
                              <input 
                                type="date"
                                value={endDate}
                                onChange={e => setEndDate(e.target.value)}
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
                                <Nav.Link eventKey="first">BP Monitor Data</Nav.Link>
                                </Nav.Item>
                                <Nav.Item style={{cursor: 'pointer'}}>
                                <Nav.Link eventKey="second">Weight Scale Monitor</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>

                        {/* Accordion for graphical representation */}
                        {deviceData && deviceData.filter(healthdata => healthdata?.deviceId?.deviceType === 'bp') ? <>
                        <div className="container graphWrapper">
                            <button className="accordion" onClick={() => setAccordion(accordion => !accordion)}>
                                Show Graphically
                                <i className={accordion ? `bx bx-minus` : `bx bx-plus`}></i>
                            </button>
                            
                            {accordion === true ? <div className="panel">
                                <PatientProfileGraph healthData={deviceData} />
                            </div> : ""}
                        </div> 
                        </> : <></> }
                        
                        
                        {/* Accordion for graphical representation ends here */}
                        

                        <Col sm={12}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                
                                {deviceData && deviceData.filter(healthdata => healthdata?.deviceId?.deviceType === 'bp').map((devicedata, index) => (
                                    <div key={index}>
                                        <CuffTelemetaryData healthData={devicedata} count={Count} readingsPerPage={readingPerPage} currentPage={currentPage} isAdmin={true} />
                                    </div>
                                ))}

                                
                                {readingPerPage <= Count && (
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
                                
                                {/* Pagination */}
                                
                                </Tab.Pane>
        

                                <Tab.Pane eventKey="second">
                                {deviceData && deviceData.filter(healthdata => healthdata?.deviceId?.deviceType === 'weight').map((devicedata, index) => (
                                    <div key={index}>
                                         <Fragment>
                                            <WeightTelemetaryData healthData={devicedata} count={Count} isAdmin={true} />
                                        </Fragment>   
                                    </div>
                                ))}
                                </Tab.Pane>
                            </Tab.Content>
                            </Col>
                    </Row>
                    </Tab.Container>
                    
                  
                    </Fragment> : <small className="text-center" style={{color: 'gray', marginLeft: '350px'}}>No telemetary data found <button className="btn btn-link" onClick={refreshHandler}>Refresh List</button></small>}
                 
                    </Fragment> }
                </div>
                
                <br /><br />
            </div>                           
        </div>
    </Fragment> 

    
    }         
    </section>
                            
        </Fragment>
    )
}

export default PatientProfile
