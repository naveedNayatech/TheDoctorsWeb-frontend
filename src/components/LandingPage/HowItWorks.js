import React, { Fragment } from 'react'
import MedicalReportImg from '../../assets/Images/medical-report.png'
import PatientImg from '../../assets/Images/patient.png';
import MonitorImg from '../../assets/Images/monitor.png';
import MedicalBookImg from '../../assets/Images/medical-book.png';


const HowItWorks = () => {
    return (
    <Fragment>
    {/* Services Section */}
    <section id="how_it_works" className="services section-bg">
      <div className="container">
        <br /><br />
        <div className="section-title">
          <h2>How It Works</h2>
          <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-8 d-flex align-items-stretch">
            <div className="icon-box">
              <div className="icon"><img src={MedicalReportImg} alt="Image"/></div>
              <h4><a href="">Screen Patient</a></h4>
              <p>Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-8 d-flex align-items-stretch mt-4 mt-md-0">
            <div className="icon-box">
              <div className="icon"><img src={PatientImg} alt="Image" /></div>
              <h4><a href="">Enroll Patient</a></h4>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-8 d-flex align-items-stretch mt-4 mt-lg-0">
            <div className="icon-box">
              <div className="icon"><img src={MonitorImg} /></div>
              <h4><a href="">Verification & Device Check-out</a></h4>
              <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-8 d-flex align-items-stretch mt-4 mt-lg-0">
            <div className="icon-box">
              <div className="icon"><img src={MedicalBookImg} /></div>
              <h4><a href="">Education & Monitoring</a></h4>
              <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis</p>
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
