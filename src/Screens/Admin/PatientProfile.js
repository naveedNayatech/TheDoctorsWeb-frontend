import React, { useEffect, useState, Fragment } from 'react';
import MetaData from '../../layouts/MetaData';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import CuffTelemetaryData from '../../components/Patient/CuffTelemetaryData'; 
import WeightTelemetaryData from '../../components/Patient/WeightTelemetaryData';
import PatientInfo from '../../components/Patient/PatientInfo';
import { patientProfile, getRemainingReadings, getPatientTelemetryData, sortTelemetartData} from '../../actions/adminActions';
import { getPatientCarePlan } from '../../actions/HRActions';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import moment from 'moment';
import { Badge , Tabs, Tab} from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import Pagination from 'react-js-pagination';
 

const PatientProfile = (props) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const [sortDate, setSortDate] = useState('');

    let patientid = props?.location?.state?.patientid;


    const { loading, error, patient, isUpdated} = useSelector(state => state.patientProfile);
    const { deviceData, Count } = useSelector(state => state.deviceData);
    const { careplan } = useSelector(state => state.careplan);
    const { count } = useSelector(state => state.readingsCount);

    const [readingPerPage, setReadingsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    
    useEffect(() => {
        if(error){
            return alert.error(error);
        }

        dispatch(patientProfile(patientid));
        dispatch(getPatientTelemetryData(patientid, readingPerPage, currentPage));
        dispatch(getPatientCarePlan(patientid));
        dispatch(getRemainingReadings(patientid));
        
        
        if(isUpdated) {
            alert.success('Updated Successfully');
        }

    }, [dispatch, alert, error, isUpdated, currentPage]);


        const sortPatientTelemetaryData = (date) => {
            const dateToFind = new Date(date).toLocaleDateString('zh-Hans-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }); 
            dispatch(sortTelemetartData(patientid, dateToFind));
        }


    const refreshHandler = () => {
        dispatch(patientProfile(patientid));
        dispatch(getPatientTelemetryData(patientid))
        dispatch(getPatientCarePlan(patientid));
        setSortDate('');
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
                                    ReadingsperMonth={ReadingsperMonth}
                                    readingsThisMonth={readingsThisMonth}
                                    careplan={careplan}
                                    patientid={patientid}
                                />

                            {deviceData && deviceData.length > 0 ? <Fragment>
                            <br/><br/>
                        
                            <div className="col-md-12">
                                <h5 className="pt-2 mt-2">Telemetary Data <span style={{ color: '#F95800'}}>(Total Readings: {Count}) </span></h5>
                            </div>

                            <div className="row-display" style={{backgroundColor: 'gray', color: '#FFF', padding: 10}}> 
                            
                            <div style={{width: '30%'}}>
                            <label>To: </label>
                              <input 
                                type="date"
                                max={moment().format("YYYY-MM-DD")} 
                                className="form-control"
                                />
                            </div>

                            <div style={{width: '30%'}}>                            
                            <label>From: </label>
                              <input 
                                type="date"
                                max={moment().format("YYYY-MM-DD")} 
                                className="form-control"
                             />
                             </div>

                             <div style={{width: '30%'}}>                            
                                <label>Sort By: </label>
                                    <select className="form-control">
                                        <option value="1">Ascending</option>
                                        <option value="-1">Descending</option>
                                    </select>
                             </div>

                             <div> 
                                <button className="btn add-staff-btn mt-4">Search</button>    
                            </div>
                            </div>

                        <br /><br />
                        {console.log("total Counts are " + Count)}

                    <Tabs defaultActiveKey="cuff" id="uncontrolled-tab-example">
                        <Tab eventKey="cuff" title="Cuff ( Telemetary Data )">
                        {deviceData && deviceData.map((devicedata, index) => (
                            <div key={index}>
                                {devicedata?.telemetaryData?.sys && devicedata?.telemetaryData?.dia ? <Fragment>
                                    <CuffTelemetaryData healthData={devicedata} count={Count} readingsPerPage={readingPerPage} currentPage={currentPage} isAdmin={true} />
                                </Fragment> : ''}
                            </div>
                        ))}

                        {/* Pagination */}
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
                        </Tab>
                        
                        <Tab eventKey="weight" title="Weight ( Telemetary Data )">
                        {deviceData && deviceData.map((devicedata, index) => (
                            <div key={index}>
                                 {devicedata?.telemetaryData?.wt && devicedata?.telemetaryData?.fat ? <Fragment>
                                    <WeightTelemetaryData healthData={devicedata} isAdmin={true} />
                                </Fragment> : ''}   
                            </div>
                        ))}
                        </Tab>

                    </Tabs>
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
