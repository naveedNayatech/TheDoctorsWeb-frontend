import React, {useState, useEffect, Fragment} from 'react'
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import { getInitialMonthReport } from '../../actions/HRActions';
import { RESET_INITIAL_MONTH_DATA } from '../../constants/HRConstants';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from 'react-bootstrap';
import moment from 'moment';
import ExportReactCSV from '../../components/ExportReactCSV';


const InitialMonthReport = () => {

    const [month, setMonth] = useState('');
    const dispatch = useDispatch();

    const {initialMonthPatients} = useSelector(state => state.initialMonthReport);

    useEffect(() => {
        if(month){
            dispatch(getInitialMonthReport(month))
        }
    }, [month])

    const resetHandler = () => {
        dispatch({
            type: RESET_INITIAL_MONTH_DATA
        })
        setMonth('');
    }

  return (
    <Fragment>
        <MetaData title="Initial Month Report"/>
        <Sidebar />    

        <section className="home-section">
        {/* TopBar */}
        <TopBar />

        <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded-card" style={{backgroundColor: '#FAFAFA'}}>
            <div className="home-content">

                <div className="col-md-7">
                    <h5 className="pt-2 mt-2">Initial Month<span style={{color: '#F95800'}}> Report </span></h5>
                </div>
                <hr />
                
                <div className="col-md-4">
                <label htmlFor="from">Select Patient </label>
                    <select 
                        label="From" 
                        name="from" 
                        className="form-control"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                    >
                    <option value="SelectMonth">Select Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                    </select>
                </div>

                 {/* Heading */}
                       
                     {initialMonthPatients && initialMonthPatients.length > 0 && (<Fragment>
                    <hr />
                    <div className="row">
                     <div className="col-md-8 col-lg-8">
                         <p style={{color: 'gray', fontWeight: 'bold'}}>Results Found: <span style={{color: '#F95800'}}>{initialMonthPatients && initialMonthPatients.length} </span></p>
                     </div>

                    <div className="col-md-2 col-lg-2">
                        <ExportReactCSV csvData={initialMonthPatients} fileName="InitialMonthPatients.csv" />
                        </div>

                        <div className="col-md-2">
                        <button className="reset-btn" onClick={resetHandler}>Reset</button>
                    </div>
                    </div>
                     <hr/>
                    </Fragment>)}                     
                
                {/* Heading */}


                {initialMonthPatients && initialMonthPatients.map((initialreport, index) => (
                    <Fragment>
                        <div className="row" key={index}>
                           <div className="col-md-1">
                               <span style={{color: 'gray', fontWeight: 'bold'}}>{index}</span>
                           </div>
                            <div className="col-md-4">
                                <b>Patient Details</b>
                                <br/>
                                <span className="profile-label">Name: {initialreport?.firstname} {initialreport?.lastname}</span><br/>
                                <span className="profile-label">DOB: {moment(initialreport?.DOB).format("ll")}</span><br/>
                                <span className="profile-label">Gender: <Badge bg="info text-white">{initialreport?.gender}</Badge></span><br/>
                                <span className="profile-label">Email: {initialreport?.email}</span><br/>
                                <span className="profile-label">Phone 1: {initialreport?.phone1}</span> <br/>
                                <span className="profile-label">Diseases: {initialreport?.diseases}</span>
                                <span className="profile-label">Initial Month: <Badge bg="danger text-white"> {month} </Badge></span>
                            </div>

                            <div className="col-md-3">
                                <b>Doctor Details</b>
                                <br/>
                                <span className="profile-label">Name: {initialreport?.assigned_doctor_id?.firstname} {initialreport?.assigned_doctor_id?.lastname}</span><br/>
                                <span className="profile-label">Gender: <Badge bg="danger text-white">Male</Badge></span><br/>
                            </div>

                            <div className="col-md-4">
                                <b>Device Details</b>
                                <br/>
                                {initialreport?.assigned_devices && initialreport?.assigned_devices.map((device, index) => (
                                    <div key={index}>
                                        <span className="profile-label">Device ID: {device?.deviceObjectId?._id}</span><br/>
                                        <span className="profile-label">Type: <Badge bg="info text-white" className="male-tag">{device?.deviceObjectId?.deviceType}</Badge></span><br/>
                                    </div>
                                ))}
                                
                            </div>
                        </div>
                        <hr />
                    </Fragment>
                ))}
            </div>
        </div>


        </section>
    </Fragment>
  )
}

export default InitialMonthReport