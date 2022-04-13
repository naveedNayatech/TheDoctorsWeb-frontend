import React, {useEffect, useState, Fragment} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import { getCompletePatientCP } from '../../actions/HRActions';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Badge } from 'react-bootstrap';
import ExportPatientCPTOCSV from '../../components/ExportPatientCPTOCSV';
import { Link } from 'react-router-dom';

const PatientCPReport = () => {

    const dispatch = useDispatch();

    const { patientCompleteCP } = useSelector(state => state.completeCP);

    useEffect(() => {
        dispatch(getCompletePatientCP())
    }, [dispatch])

    const refreshHandler = () => {
        dispatch(getCompletePatientCP())
    }

  return (
    <Fragment>
        <MetaData title="Patient CP Report"/>
        <Sidebar />    

        <section className="home-section">
        {/* TopBar */}
        <TopBar />
        
        <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded-card" style={{backgroundColor: '#FAFAFA'}}>
            <div className="home-content">

                <div className="row-display">
                    
                    <h5 className="pt-2 mt-2">All Patients<span style={{color: '#007673'}}> (CP Report) </span></h5>
                    
                    {patientCompleteCP && patientCompleteCP.length > 0 && (<Fragment>
                        <div className="col-md-2 col-lg-2">
                            <ExportPatientCPTOCSV csvData={patientCompleteCP} fileName="CompleteCP.csv" />
                        </div>
                    </Fragment>)}


                    
                    <div className="row-display">
                        <Link to="/adminDashboard">
                            <button className="btn btn-primary mt-3">
                                <i className='bx bx-arrow-back'></i>
                            </button>
                        </Link>
                        &nbsp;&nbsp;
                        <Link to="/adminDashboard">
                            <button className="btn btn-primary mt-3">
                            <i className='bx bxs-home'></i>
                            </button>
                        </Link>
                        &nbsp;&nbsp;
                        <button className="btn btn-primary mt-3" onClick={refreshHandler}><i className='bx bx-refresh'></i> </button>

                    </div>   

                    
                </div>
            <hr />


            {patientCompleteCP && patientCompleteCP.map((initialreport, index) => (
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

export default PatientCPReport