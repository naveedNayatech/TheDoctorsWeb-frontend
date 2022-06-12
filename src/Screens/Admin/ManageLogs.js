import React, {useState, useEffect} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import hrIcon from '../../assets/Images/network.png';
import doctorIcon from '../../assets/Images/doctorIcon.png';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector} from 'react-redux';
import { getDoctors, getHrLists, searchAdminLogs, searchAdminLogsByHR} from '../../actions/adminActions';
import Select from 'react-select';
import Loader from '../../layouts/Loader';
import { SEARCH_LOG_RESET } from '../../constants/adminConstants';
import LoginLogoutLogType from '../../components/AdminDashboard/LoginLogoutLogType';
import ViewPatientProfileLogType from '../../components/AdminDashboard/ViewPatientProfileLogType';

const ManageLogs = () => {
const dispatch = useDispatch();
const [reportBy, setReportBy] = useState("doctor");
const alert = useAlert();
const [doctorId, setDoctorId] = useState("");
const [hrId, sethrId] = useState("");
const [logType, setLogType] = useState("logs");

const { error, doctors } = useSelector(state => state.doctor);
const {  hrs } = useSelector(state => state.hrslist);
const { loading, logs } = useSelector(state => state.searchLogResult);

useEffect(() => {
    if(error){
        alert.error(error);
    }

    dispatch(getDoctors(10, 1));
    dispatch(getHrLists());
}, [dispatch]);



const doctorOptions = []
    doctors && doctors.map((doctor) => (
        doctorOptions.push({ value: doctor?._id, label: ["Dr. " + doctor?.firstname, doctor?.lastname].join(" ")})
    ))

    const hrOptions = []
    hrs && hrs.map((hr) => (
        hrOptions.push({ value: hr?._id, label: ["Hr. " + hr?.firstname, hr?.lastname].join(" ")})
  ))

  const getDoctorProfile = (doctor) => {
    setDoctorId(doctor.value);
}

  const getHRProfile = (hr) => {
    sethrId(hr.value);
  }

  const searchLogs = () => {
    if(reportBy === 'doctor' && logType){
        dispatch(searchAdminLogs(doctorId, logType))
    } else if(reportBy === 'nurse' && logType){
        dispatch(searchAdminLogsByHR(hrId, logType))
    }
  }

  const resetLogs = () => {
    dispatch({
        type: SEARCH_LOG_RESET
    })
} 

  return (
    <>
       <MetaData title="Manage Logs"/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />

                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded-card" style={{backgroundColor: '#FAFAFA'}}>
                    <div className="home-content">
                        <h5 className="pt-2 mt-2">Manage Logs <span style={{color: '#004aad'}}></span></h5>
                        <hr />

                    <span className="notes-header"><b>Note: </b> If you select only doctor / nurse and hit search, it will display all logs of that particular role. Also you can search between two dates.</span>

                       <div className="row cardWrapper">
                        <div className={`card cardButton ${reportBy === "doctor" ? "cardActive" : ""}`}
                            onClick={() => setReportBy("doctor")}>
                        <img src={doctorIcon} alt="" height="80" width="80"/>
                            Doctor
                        </div>

                        <div className={`card cardButton ${reportBy === "nurse" ? "cardActive" : ""}`} 
                            onClick={() => setReportBy("nurse")}>
                        <img src={hrIcon} alt="" height="80" width="80"/>
                            Nurse
                        </div>
                    </div>

                    {/* See List */}
                    <div>
                {reportBy === "doctor" ?  <>
                
                <div className="row-display">
                <div className="col-md-3 mt-4">
                <label>Select Doctor  <span style={{color: '#004aad'}}> *</span>  </label>
                <Select
                    options={doctorOptions}
                    onChange={getDoctorProfile}
                    className="react-selectbox"
                />
                </div>

                <div className="col-md-4 mt-4">
                    <label>Select Type </label>
                    <select
                        className="form-control"
                        value={logType}
                        onChange={(e) => setLogType(e.target.value)}
                    >
                    <option value="logs">login/logout</option>
                    <option value="patient">View Patient Profile</option>
                    <option value="accountCreated">Account Created</option>
                    <option value="device">RPM Device</option>
                    <option value="targets">Add Time</option>
                    <option value="report">Generate Report</option>
                    <option value="report">Uploaded a document</option>
                    </select>
                </div>

                <div className="col-md-3 mt-4">
                    <label>Action</label>
                    <button className="submit-btn" onClick={searchLogs}>Search</button>
                </div>
                </div>
                </> : <>
                
                <div className="row-display">
                <div className="col-md-4 mt-4">
                <label>Select Nurse  <span style={{color: '#004aad'}}> *</span>  </label>
                <Select
                    options={hrOptions}
                    onChange={getHRProfile}
                    className="react-selectbox"
                />
                </div>

                <div className="col-md-4 mt-4">
                    <label>Select Type </label>
                    <select
                        className="form-control"
                        value={logType}
                        onChange={(e) => setLogType(e.target.value)}
                    >
                    <option value="logs">login/logout</option>
                    <option value="patient">View Patient Profile</option>
                    <option value="accountCreated">Account Created</option>
                    <option value="device">RPM Device</option>
                    <option value="targets">Add Time</option>
                    <option value="report">Generate Report</option>
                    <option value="report">Uploaded a document</option>
                    </select>
                </div>

                

                <div className="col-md-4 mt-4">
                    <label>Action</label>
                    <button className="submit-btn" onClick={searchLogs}>Search</button>
                </div>
                </div>
                </>
                }
                </div>
                {/* List ends here */}    
                </div>
              
                <hr />
                {loading ? <Loader /> : <>
                {logs && logs.length > 0 ? <>
                    <div className="row-display">
                        <small className="pt-2 mt-2"><b>Results Found <span style={{color: '#004aad'}}>( {logs && logs.length} )</span></b></small>
                        <span className="manage_logs_btn" onClick={resetLogs}><i className='bx bx-slider-alt'></i> Reset Logs</span>
                    </div>

                    {logType === 'logs' ? <>
                        <LoginLogoutLogType reportBy={reportBy} logType={logType} logs={logs} />
                    </> : ""}

                    {logType === 'patient' ? <>
                        <ViewPatientProfileLogType reportBy={reportBy} logType={logType} logs={logs} />
                    </> : ""} 
                </> : <>
                    <p className="text-center" style={{color: 'red'}}><small>No Result Found.</small></p>
                </>}
                </>}

                </div>
        </section>
    </>
  )
}

export default ManageLogs