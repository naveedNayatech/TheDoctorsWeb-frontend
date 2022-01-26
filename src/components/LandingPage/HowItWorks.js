import React, { Fragment } from 'react'
import MedicalReportImg from '../../assets/Images/medical-report.png'
import PatientImg from '../../assets/Images/patient.png';
import MonitorImg from '../../assets/Images/monitor.png';
import MedicalBookImg from '../../assets/Images/medical-book.png';
import HowItWorksImg from '../../assets/Images/how-it-works.png';

const HowItWorks = () => {
    return (
    <Fragment>
    {/* Services Section */}
    <section id="how_it_works" className="services section-bg">
      <div className="container">
        <br /><br />
        <div className="section-title">
          <h2>How It Works</h2>
        </div>

        <div className="row">
          <div className="col-lg-4 col-md-8 col-sm-12">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="how-it-works-card-01">
                <div className="row"><img src={MedicalReportImg} className="how-it-works-icon"/> <strong className="how-it-works-card-heading mt-4">Screen Patient</strong> </div>
                  <p style={{textAlign: 'justify'}}>Necessary patient evaluation is done, general medical condition is determined. 
                    The medical necessaty for monitoring equipment requested is calculated</p>
              </div>
              </div>

            <hr style={{background: '#F95800', height: '3px'}}/>  
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="how-it-works-card">
                <div className="row"><img src={PatientImg} className="how-it-works-icon"/> <strong className="mt-4">Enroll Patient</strong> </div>
                  <p style={{textAlign: 'justify'}}>Quick enrollment process by efficient patient in-take cordinators.</p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-8 col-sm-12">
            <img src={HowItWorksImg} className="img-responsive img-fluid" style={{marginTop: '-60px'}} alt="image"/>
          </div>

          <div className="col-lg-4 col-md-8 col-sm-12">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="how-it-works-card">
                <div className="row"><img src={MonitorImg} className="how-it-works-icon"/> <strong className="mt-4">Verification & Device Check-out</strong> </div>
                  <p style={{textAlign: 'justify'}}>Maintaining the usage of equipment, determining how frequent it is used, 
                    any assistance patient requires? And when done easy rolling back.</p>
              </div>
          </div>

          <hr style={{background: '#081D45', height: '3px'}} />
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="how-it-works-card-04">
              <div className="row"><img src={MedicalBookImg} className="how-it-works-icon"/> <strong className="mt-4">Education & Monitoring</strong> </div>
                <p style={{textAlign: 'justify'}}>Patients are given basic and necessary knowledge of the equipment they are using.</p>
            </div>
          </div>
          </div>
        </div>
        </div>

    </section>

    {/* End Services Section */}
    </Fragment>
    )
}

export default HowItWorks;
