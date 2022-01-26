import React, { Fragment } from 'react'
import WebAnalyticsImg from '../../assets/Images/web-analytics.png';
import BloodPressureGaugeImg from '../../assets/Images/blood-pressure-gauge.png';
import GlucometerImg from '../../assets/Images/glucometer.png';
import OximeterImg from '../../assets/Images/oximeter.png';

const RPMDevices = () => {
    return (
        <Fragment>
     {/************************* RPM Devices  *********************************/}
     <section id="rpm_devices">
      <div>
        <div className="container-fluid text-center">
          <div className="row">
            <div className="rpm-devices-card-01 col-lg-3 col-md-3 col-sm-12 col-xs-12">
              <img src={WebAnalyticsImg} className="rpm-card-images"/>
              <h5 className="text-white">Remote Weight Monitoring</h5>
              <hr style={{backgroundColor:'#F95800'}} />
              <p className="text-white">Offers real-time and accurate weight tracking for patients with chronic health conditions and obesity-related health concerns.</p>
            </div>

            <div className="rpm-devices-card-02 col-md-3 col-sm-12 col-xs-12">
              <img src={BloodPressureGaugeImg} className="rpm-card-images"/>
              <h5 className="rpm-section-heading text-white">Remote Blood Pressure Cuff</h5>
              <hr style={{backgroundColor:'#081D45'}}/>
              <p className="text-white">Through a 4G cellular-connected Blood Pressure Cuff, patients with hypertension and other ailments may send real-time information to the provider’s servers upon completing their Blood Pressure Measurement.</p>
            </div>

            <br />

            <div className="rpm-devices-card-01 col-md-3 col-sm-12 col-xs-12">
              <img src={GlucometerImg} className="rpm-card-images"/>
              <h5 className="rpm-section-heading text-white">Blood Glucose Monitoring</h5>
              <hr style={{backgroundColor:'#F95800'}}/>
              <p className="text-white">Remote tracking of blood sugar levels is made easier. For patients with diabetes, regularly monitor and track your blood glucose levels and lessen further health risks through proactive treatment.</p>
            </div>

            <div className="rpm-devices-card-02 col-md-3 col-sm-12 col-xs-12">
              <img src={OximeterImg} className="rpm-card-images"/>
              <h5 className="rpm-section-heading text-white">Remote Pulse Oximeter</h5>
              <hr style={{backgrounColor:'#081D45'}}/>
              <p className="text-white">Get accurate vital signs monitoring, such as your blood oxygen level, pulse rate, and perfusion index. Avoid complications by alerting providers in real-time, which allows immediate treatment and prevention.</p>
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
