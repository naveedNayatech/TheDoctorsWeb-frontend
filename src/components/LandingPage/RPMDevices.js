import React, { Fragment } from 'react'
import WebAnalyticsImg from '../../assets/Images/web-analytics.png';
import BloodPressureGaugeImg from '../../assets/Images/blood-pressure-gauge.png';
import GlucometerImg from '../../assets/Images/glucometer.png';
import OximeterImg from '../../assets/Images/oximeter.png';

const RPMDevices = () => {
    return (
        <Fragment>
     {/************************* RPM Devices  *********************************/}
    <section className="section rpm_devices-section" id="rpm_devices">
      <div className="container">
        <h2 className="telemedicine-heading">RPM Devices</h2>

        <h5 className="telemedine-subheading">High-performing devices for quality health management</h5>
        
        <p>RPM devices are cellular or internet-connected devices that offer real-time data and information to patients and healthcare providers. The devices are also designed to provide a convenient user experience through its easy-to-navigate features and simpler functions.  </p>
        <hr />

        <div className="container-fluid text-center">
          <div className="row">
            <div className="col-md-6">
              <img src={WebAnalyticsImg} alt="Image" className="rpm-card-images"/>
              <h5 className="rpm-section-heading">Remote Weight Monitoring</h5>
              <hr />
              <p>Offers real-time and accurate weight tracking for patients with chronic health conditions and obesity-related health concerns.</p>
            </div>

            <div className="col-md-6">
              <img src={BloodPressureGaugeImg} alt="Image" className="rpm-card-images"/>
              <h5 className="rpm-section-heading">Remote Blood Pressure Cuff</h5>
              <hr />
              <p>Through a 4G cellular-connected Blood Pressure Cuff, patients with hypertension and other ailments may send real-time information to the provider’s servers upon completing their Blood Pressure Measurement.</p>
            </div>

            <br />

            <div className="col-md-6">
              <img src={GlucometerImg} className="rpm-card-images"/>
              <h5 className="rpm-section-heading">Remote Blood Glucose Monitoring</h5>
              <hr />
              <p>Remote tracking of blood sugar levels is made easier. For patients with diabetes, regularly monitor and track your blood glucose levels and lessen further health risks through proactive treatment.</p>
            </div>

            <div className="col-md-6">
              <img src={OximeterImg} className="rpm-card-images"/>
              <h5 className="rpm-section-heading">Remote Pulse Oximeter</h5>
              <hr />
              <p>Get accurate vital signs monitoring, such as your blood oxygen level, pulse rate, and perfusion index. Avoid complications by alerting providers in real-time, which allows immediate treatment and prevention.</p>
            </div>

            
          </div>
        </div>
      
      </div>
    </section>
     {/************************** RPM Devices Ends Here  *******************************/}
        </Fragment>
    )
}

export default RPMDevices
