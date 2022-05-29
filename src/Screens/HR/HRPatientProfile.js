import React, {useState, useEffect, Fragment} from 'react';
import MetaData from '../../layouts/MetaData';
import  HRSidebar from '../../components/HR/HRSidebar';
import HRTopBar from '../../components/HR/HRTopbar';
import Loader from '../../layouts/Loader';
import { patientProfile, getPatientTelemetryData, sortTelemetartData} from '../../actions/adminActions';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Nav, Tab} from 'react-bootstrap';
import CuffTelemetaryData from '../../components/Patient/CuffTelemetaryData';
import WeightTelemetaryData from '../../components/Patient/WeightTelemetaryData'; 
import { COMMENT_RESET } from '../../constants/HRConstants';
import moment from 'moment';
import Pagination from 'react-js-pagination';
import HRPatientInfo from '../../components/HR/HRPatientInfo';
import PatientProfileGraph from '../../components/PatientProfileGraph';


const HRPatientProfile = (props) => {
    const alert = useAlert();

    let patientid = props?.location?.state?.patientid;

    const [filterStartDate, setFilterStartDate] = useState('');
    const [filterEndDate, setFilterEndDate] = useState('');
  
    const dispatch = useDispatch();
    const [addTimeShow, setAddTimeShow] = useState(false);

  const { loading, error, patient} = useSelector(state => state.patientProfile);
  const { deviceData, Count } = useSelector(state => state.deviceData);
  const { commentSuccess} = useSelector(state => state.comments);
//   const {isSuccessful, carePlanAdded, error: careplanerror } = useSelector(state => state.timeSpent); 
  const [accordion, setAccordion] = useState(false);

  const [readingPerPage, setReadingsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, sortBy] = useState(-1);


  useEffect(() => {
    if(error){
        return alert.error(error);
    }

    dispatch(patientProfile(patientid));
    dispatch(getPatientTelemetryData(patientid, readingPerPage, currentPage, sort))

    if(commentSuccess) {
        alert.success('Comment added');
        dispatch({ type: COMMENT_RESET });
        dispatch(patientProfile(patientid));
        dispatch(getPatientTelemetryData(patientid, readingPerPage, currentPage, sort))
    }

}, [dispatch, alert, error, commentSuccess, currentPage, sort]);


    const sortPatientTelemetaryData = (date) => { 
        dispatch(sortTelemetartData(patientid, filterStartDate, filterEndDate));
    }

    const refreshHandler = () => {
        dispatch(patientProfile(patientid));
        dispatch(getPatientTelemetryData(patientid))
        setFilterStartDate("");
        setFilterEndDate("");
    }

    function setCurrentPageNumber(currentPage) {
        setCurrentPage(currentPage);
    }
    
  return <Fragment>
      <MetaData title="Patients Profile"/>
        <HRSidebar />    

        <section className="home-section">
        {/* TopBar */}
        <HRTopBar 
        displayTimer="yes"
        patientid={patientid}
        />

        {loading ? <Loader /> : <Fragment>
                <div className="shadow-lg m-3 bg-white rounded">        
                        <div className="home-content">
                            <div>    


                            {patient && <Fragment>
                                <HRPatientInfo 
                                    patient={patient}
                                    healthData={deviceData}
                                />


                        {/* Patient Telemetary Data */}
                        {deviceData && deviceData.length > 0 ? <Fragment>
                       

                        <div className="col-md-12 container">
                                <h5 className="pt-2 mt-2">Telemetary Data <span style={{ color: '#ed1b24'}}>(Total Readings: {Count}) </span></h5>
                            </div>

                            <div className="row-display patient-profile-col-heading container" style={{ 
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

                        <div className="container">
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

                             {/* Accordion for graphical representation */}
                        <div className="container graphWrapper">
                            <button className="accordion" onClick={() => setAccordion(accordion => !accordion)}>
                                Show Graphical Representation
                                <i className={accordion ? `bx bx-minus` : `bx bx-plus`}></i>
                            </button>

                            {accordion === true ? <div className="panel">
                                <PatientProfileGraph healthData={deviceData} />
                            </div> : ""}
                        </div>
                        {/* Accordion for graphical representation ends here */}

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
                                        <WeightTelemetaryData healthData={devicedata} isAdmin={false} />    
                                    </div>
                                ))}
                                </Tab.Pane>
                            </Tab.Content>
                            </Col>
                    </Row>
                    </Tab.Container>
                    </div>
                    
                       
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
