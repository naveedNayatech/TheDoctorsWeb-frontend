import React, { Fragment } from 'react';
import moment from "moment";
import TDWLogoImg from '../../assets/Images/tdw_logo.jpeg';

const PrintReceipt = (props) => {
 
    let device = props?.location?.state?.deviceAssigned;
    let patient = props?.location?.state?.patientDetails;

    const printReceipt = () => {
        window.print();
      }

 return <Fragment>
        <div className="text-center" style={{alignSelf: 'center'}}>
            <div className="row">
                <div className="col-md-4">

                </div>

                <div className="col-md-4">
                    <img src={TDWLogoImg} style={{width: '140px', height: '140px'}} /><br/>
                    <b>Device Receipt</b>
                    <hr style={{color: '#F95800', height: 3}} />
                    
                    <h5 style={{color: 'gray'}}>Assigned To</h5>
                     <b>Patient Name : </b> <span>{patient?.title} {patient?.firstname} {patient?.lastname}</span> <br/>
                     <b>Address : </b> <span>{patient?.address} {patient?.line2} {patient?.city} {patient?.state} {patient?.zipCode}  </span> <br />   

                    <hr/>
                     <h5 style={{color: 'gray'}}>Device Details</h5>
                     <b>Device ID : </b> <span>{device?.deviceId}</span> <br/><br />

                     <span style={{backgroundColor: '#DCDCDC', 
                     padding: '15px', 
                     borderRadius: '10px'
                     }}><b> Date: </b> <span>{moment().format("DD-MM-YYYY hh:mm:ss")}</span></span> <br/>

                    <button className="btn btn-danger mt-3" onClick={printReceipt}>Print Receipt</button>
                    
                    
                    <div className="col-md-4"></div>

                </div>
            </div>
                

        </div>
  </Fragment>
};

export default PrintReceipt;
