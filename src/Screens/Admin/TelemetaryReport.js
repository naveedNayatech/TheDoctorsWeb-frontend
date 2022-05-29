import React, {useState, useEffect} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import patientIcon from '../../assets/Images/patientIcon.png';
import doctorIcon from '../../assets/Images/doctorIcon.png'
import { getPatients, getDoctors, getDoctorTelemetaryReport } from '../../actions/adminActions';
import Select from 'react-select';
import { useAlert } from 'react-alert';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../layouts/Loader';
import moment from 'moment';


const TelemetaryReport = () => {
    const alert = useAlert();
    const [reportBy, setReportBy] = useState('patient');
    const [patientId, setPatientId] = useState("");
    const [doctorId, setDoctorId] = useState("");

    const { error, patients} = useSelector(state => state.admin);
    const { doctors } = useSelector(state => state.doctor);
    const {loading, telemetaryReport} = useSelector(state => state.telemetaryReport);


    const dispatch = useDispatch();

    useEffect(() => {
        if(error){
            alert.error(error);
        }
        
        dispatch(getPatients());
        dispatch(getDoctors(10, 1));
        
    }, [dispatch]);

    const options = []
    patients && patients.map((patient) => (
        options.push({ value: patient?._id, label: [patient?.firstname, patient?.lastname, patient?.ssn].join(" ")})
    ))

    const doctorOptions = []
    doctors && doctors.map((doctor) => (
        doctorOptions.push({ value: doctor?._id, label: [doctor?.firstname, doctor?.lastname].join(" ")})
    ))

    const getPatientProfile = (patient) => {    
        setPatientId(patient.value);

    }

    const getDoctorProfile = (doctor) => {
        setDoctorId(doctor.value);
        dispatch(getDoctorTelemetaryReport(doctor.value));
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

                <span className="notes-header"><b>Note: </b> You can generate patient's telemetary data report by patient and by doctor.</span>

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
                </div>

                <div>
                {reportBy === "patient" ? <>
                <span className="notes-header"><b>Note: </b> Please select patient from dropdown list.</span>
                
                <div className="col-md-4 mt-4">
                <Select
                    options={options}
                    onChange={getPatientProfile}
                    className="react-selectbox"
                />
                </div></> : <>
                <span className="notes-header"><b>Note: </b> Please select doctor from dropdown list.</span>
                
                <div className="col-md-4 mt-4">
                <Select
                    options={doctorOptions}
                    onChange={getDoctorProfile}
                    className="react-selectbox"
                />
                </div>
                </>}

                </div>

                {/* Report Result */}
                <br />
                {loading ? <Loader /> : <>
                   {telemetaryReport && telemetaryReport?.length > 0 ? telemetaryReport.map((report, index) => (
                       <div key={index}>
                        <div className="container row cardWrapper">
                            <div className="card cardButton">
                                <b>Patient Details</b>
                                <hr />
                                <span className="row-display"><b>Name: </b> &nbsp; {report.assigned_patient_id?.firstname} {report.assigned_patient_id?.lastname}</span>
                                <span className="row-display"><b>Gender: </b>{report.assigned_patient_id?.gender} </span>

                            </div>

                            <div className="card cardButton">
                                <b>Device Details</b>
                                <hr />
                                <span className="row-display"><b>Device ID: </b>{report.deviceId?._id} </span>
                                <span className="row-display"><b>IMEI: </b>{report.deviceId?.imei} </span>
                                <span className="row-display"><b>Model #: </b> &nbsp;{report.deviceId?.modelNumber} </span>
                                <span className="row-display"><b>Device Type: </b>{report.deviceId?.deviceType} </span>
                            </div>

                            <div className="card cardButton">
                                <b>Telemetary Result</b>
                                <hr/>
                                <span>{report?.deviceId?.deviceType === "bp" ? <>
                                <span className="row-display"><b>Systolic: </b>{report.telemetaryData?.sys} </span></> : <>
                                <span className="row-display"><b>Fat: </b>{report.telemetaryData?.fat} </span>
                                </> }</span>

                                <span>{report?.deviceId?.deviceType === "bp" ? <>
                                <span className="row-display"><b>Diastolic: </b>{report.telemetaryData?.dia} </span></> : <>
                                <span className="row-display"><b>Weight: </b>{report.telemetaryData?.wt} </span>
                                </> }</span>

                                <span>{report?.deviceId?.deviceType === "bp" ? <>
                                <span className="row-display"><b>Pulse: </b>{report.telemetaryData?.pul} </span></> : <>
                                <span className="row-display"><b>BMI: </b>{report.telemetaryData?.bmi} </span>
                                </> }</span>
                            </div>  

                            <div className="card cardButton">
                                <b>Added Details</b>
                                <hr />
                                    <div key={index}>
                                        <span className="row-display"><b> Date: </b> &nbsp;{moment(report?.createdAt).tz("America/New_York").format("lll")}</span>
                                    </div>
                                <span> </span>
                            </div>
                        </div>    
                       </div>

                   )) : <>
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