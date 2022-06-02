import React, {useState, useEffect, useRef} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import patientIcon from '../../assets/Images/patientIcon.png';
import doctorIcon from '../../assets/Images/doctorIcon.png'
import hrIcon from '../../assets/Images/network.png';
import { getPatients, getDoctors, getHrLists, getDoctorTelemetaryReport, getPatientTelemetaryReport, getHRTelemetaryReport  } from '../../actions/adminActions';
import Select from 'react-select';
import { useAlert } from 'react-alert';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../layouts/Loader';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import MyDocument from '../../components/MyDocument';
import { GET_DOCTOR_TELEMETARY_REPORT_RESET } from '../../constants/adminConstants';


const TelemetaryReport = () => {

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        pageStyle:"A5",
        documentTitle:"Telemetary Report",
        content: () => componentRef.current,
    });

    const alert = useAlert();
    const [reportBy, setReportBy] = useState('patient');
    const [patientId, setPatientId] = useState("");
    const [doctorId, setDoctorId] = useState("");
    const [hrId, sethrId] = useState("");


    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const { error, patients} = useSelector(state => state.admin);
    const { doctors } = useSelector(state => state.doctor);
    const {  hrs } = useSelector(state => state.hrslist);
    const {loading, telemetaryReport} = useSelector(state => state.telemetaryReport);


    const dispatch = useDispatch();

    useEffect(() => {
        if(error){
            alert.error(error);
        }
        
        dispatch(getPatients());
        dispatch(getDoctors(10, 1));
        dispatch(getHrLists());
        
    }, [dispatch]);

    const options = []
    patients && patients.map((patient) => (
        options.push({ value: patient?._id, label: [patient?.firstname, patient?.lastname, patient?.ssn].join(" ")})
    ))

    const doctorOptions = []
    doctors && doctors.map((doctor) => (
        doctorOptions.push({ value: doctor?._id, label: [doctor?.firstname, doctor?.lastname].join(" ")})
    ))

    const hrOptions = []
    hrs && hrs.map((hr) => (
        hrOptions.push({ value: hr?._id, label: [hr?.firstname, hr?.lastname].join(" ")})
    ))

    const getPatientProfile = (patient) => {    
        setPatientId(patient.value);
    }

    const getDoctorProfile = (doctor) => {
        setDoctorId(doctor.value);
    }

    const getHRProfile = (hr) => {
        sethrId(hr.value);
    }

    const resetReport = () => {
        setPatientId("");
        setStartDate("");
        setEndDate("");
        dispatch({
            type: GET_DOCTOR_TELEMETARY_REPORT_RESET
        })
    } 

    const generateReportByPatient = () => {
        if(!patientId) {
            alert.error('Please select patient');
            return;
        } else if(!startDate) {
            alert.error('Please select start Date');
            return;
        } else if(!endDate) {
            alert.error('Please select end Date');
            return;
        } else {
            dispatch(getPatientTelemetaryReport(patientId, startDate, endDate));
        }
    }

    const generateReportByHR = () => {
        if(!hrId) {
            alert.error('Please select doctor');
            return;
        } else if(!startDate) {
            alert.error('Please select start Date');
            return;
        } else if(!endDate) {
            alert.error('Please select end Date');
            return;
        } else {
            dispatch(getHRTelemetaryReport(hrId, startDate, endDate));
        }
    }

    const generateReportByDoctor = () => {
        if(!hrId) {
            alert.error('Please select HR');
            return;
        } else if(!startDate) {
            alert.error('Please select start Date');
            return;
        } else if(!endDate) {
            alert.error('Please select end Date');
            return;
        } else {
            dispatch(getDoctorTelemetaryReport(doctorId, startDate, endDate));
        }
    }


  return (
    <>
        <MetaData title="Telemetary Report"/>
        <Sidebar />    

        <section className="home-section">
        {/* TopBar */}
        <TopBar />

        <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded-card" style={{backgroundColor: '#FAFAFA'}}>
            <div className="home-content">

                <h5 className="pt-2 mt-2">Telemetary Data<span style={{color: '#ed1b24'}}> Report </span></h5>
                <hr />

                <span className="notes-header"><b>Note: </b> You can generate patient's telemetary data report by patient, by doctor and by HR.</span>

                <div className="row cardWrapper">
                    <div className={`card cardButton ${reportBy === "patient" ? "cardActive" : ""}`}
                        onClick={() => setReportBy("patient")}>
                    <img src={patientIcon} alt="" height="80" width="80"/>
                        By Patient
                    </div>

                    <div className={`card cardButton ${reportBy === "doctor" ? "cardActive" : ""}`} 
                        onClick={() => setReportBy("doctor")}>
                    <img src={doctorIcon} alt="" height="80" width="80"/>
                        By doctor
                    </div>

                    <div className={`card cardButton ${reportBy === "hr" ? "cardActive" : ""}`} 
                        onClick={() => setReportBy("hr")}>
                    <img src={hrIcon} alt="" height="80" width="80"/>
                        By HR
                    </div>
                </div>

                <div>
                {reportBy === "patient" ? <>
                <span className="notes-header"><b>Note: </b> Please select patient, start date and end date to generate report.</span>

                <div className="row-display">    
                    <div className="col-md-3 mt-4">
                    <label>Select Patient <span style={{color: '#ed1b24'}}> *</span> </label>
                    <Select
                        options={options}
                        onChange={getPatientProfile}
                        className="react-selectbox"
                    />
                    </div>

                    <div className="col-md-3 mt-4">
                    <label>From  <span style={{color: '#ed1b24'}}> *</span>  </label>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                        max={moment().format("YYYY-MM-DD")} 
                        className="form-control" placeholder="From"/>
                    </div>

                    <div className="col-md-3 mt-4">
                    <label>To <span style={{color: '#ed1b24'}}> *</span></label>
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                        max={moment().format("YYYY-MM-DD")} 
                        className="form-control" placeholder="To"/> 
                        
                    </div>

                    <div className="col-md-3 mt-4">
                        <label>Action</label>
                        <button className="submit-btn" onClick={generateReportByPatient}>Generate</button>
                    </div>
                </div>
                
                
                </> : reportBy === "doctor" ?  <>
                <span className="notes-header"><b>Note: </b> Please select doctor, start date and end date to generate report.</span>
                
                <div className="row-display">
                <div className="col-md-4 mt-4">
                <label>Select Doctor  <span style={{color: '#ed1b24'}}> *</span>  </label>
                <Select
                    options={doctorOptions}
                    onChange={getDoctorProfile}
                    className="react-selectbox"
                />
                </div>

                <div className="col-md-3 mt-4">
                    <label>From  <span style={{color: '#ed1b24'}}> *</span>  </label>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                        max={moment().format("YYYY-MM-DD")} 
                        className="form-control" placeholder="From"/>
                </div>

                <div className="col-md-3 mt-4">
                    <label>To <span style={{color: '#ed1b24'}}> *</span></label>
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                        max={moment().format("YYYY-MM-DD")} 
                        className="form-control" placeholder="To"/> 
                        
                </div>

                <div className="col-md-3 mt-4">
                    <label>Action</label>
                    <button className="submit-btn" onClick={generateReportByDoctor}>Generate</button>
                </div>
                </div>
                </> : <>
                <span className="notes-header"><b>Note: </b> Please select HR, start date and end date to generate report.</span>
                
                <div className="row-display">
                <div className="col-md-4 mt-4">
                <label>Select HR  <span style={{color: '#ed1b24'}}> *</span>  </label>
                <Select
                    options={hrOptions}
                    onChange={getHRProfile}
                    className="react-selectbox"
                />
                </div>

                <div className="col-md-3 mt-4">
                    <label>From  <span style={{color: '#ed1b24'}}> *</span>  </label>
                    <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                        max={moment().format("YYYY-MM-DD")} 
                        className="form-control" placeholder="From"/>
                </div>

                <div className="col-md-3 mt-4">
                    <label>To <span style={{color: '#ed1b24'}}> *</span></label>
                    <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                        max={moment().format("YYYY-MM-DD")} 
                        className="form-control" placeholder="To"/> 
                </div>

                <div className="col-md-3 mt-4">
                    <label>Action</label>
                    <button className="submit-btn" onClick={generateReportByHR}>Generate</button>
                </div>
                </div>
                </>
                }
                </div>
                
                {telemetaryReport && telemetaryReport?.length > 0 ? <>
                    <div className="row-display">
                    <div className="col-md-7">

                    </div>
                    <button className="accordion" onClick={resetReport}><i className='bx bxs-file-pdf'></i> Reset</button> &nbsp;    
                    
                    <div>
                        <div
                            style={{ display: "none" }}// This make ComponentToPrint show   only while printing
                        > 
                        <MyDocument healthData={telemetaryReport} ref={componentRef} />
                        </div>
                        <button onClick={handlePrint} className="accordion"><i className='bx bxs-file-pdf'></i> Download PDF</button>
                    </div>
                </div>
                </> : null }
                

                {/* Report Result */}
                <br />
                {loading ? <Loader /> : <>
                   {telemetaryReport && telemetaryReport?.length > 0 ? <>
                        <div className="text-center"><span style={{ 
                            color: '#ed1b24',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}>{telemetaryReport?.length}</span> records found.</div>
                   </> : <>
                   <div className="text-center">
                       <b>No Result Found.</b>
                   </div>
                   </>} 
                </>}
            </div>
        </div>
        </section>
    </>
  )
}

export default TelemetaryReport