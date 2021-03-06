import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import TDW_logo from '../../assets/Images/official_logo.png';
import { Image } from 'react-bootstrap';

const Header = () => {
  return (
 <Fragment>
  {/****************** Top Bar  ************************/}
  <div id="topbar" className="d-flex align-items-center fixed-top">
    <div className="container d-flex justify-content-between">
      <div className="contact-info d-flex align-items-center">
        <i className='bx bx-mail-send'></i> <a href="mailto:contact@example.com">support@thedoctorsweb.com</a>
        <i className='bx bx-phone'></i> +1 813 606 4002
      </div>
      <div className="d-none d-lg-flex social-links align-items-center">
        <a href="#" className="facebook"><i className='bx bxl-facebook'></i></a>
        <a href="#" className="instagram"><i className='bx bxl-instagram' ></i></a>
        <a href="#" className="twitter"><i className='bx bxl-twitter' ></i></a> 
        
        <a href="#" className="linkedin"><i className='bx bxl-linkedin' ></i></a>
      </div>
    </div>
  </div>
  

  {/* Header  */}

  <header id="header" className="fixed-top">
    <div className="container d-flex align-items-center">
      <Image src={TDW_logo} className="landingPageHeaderLogo" alt="logo" />

      <nav id="navbar" className="navbar order-last order-lg-0">
        <ul>
          <li><a className="nav-link scrollto" href="#about-us">About Us</a></li>
          <li><a className="nav-link scrollto" href="#how_it_works">How It Works?</a></li>
          <li><a className="nav-link scrollto" href="#rpm_devices">RPM Devices</a></li>       
          <li><a className="nav-link scrollto" href="#telemedicine">Tele-Medicine</a></li>

          <li style={{float: 'right'}}><Link to="/login" className="nav-link">Login</Link></li>
          
        </ul>
        <i className="bi bi-list mobile-nav-toggle"></i>
      </nav>
      {/********************** Navbar Ends here ************** */}

      <a href="#book_a_demo" className="appointment-btn scrollto"><span className="d-none d-md-inline">Book</span> Demo</a>

    </div>
  </header>

   {/* End Header  */}

   {/* Home Section  */}
  <section id="home" className="d-flex align-items-center">
    <div className="container">
    <h1 className="text-white">RPM <span style={{color: '#88E0EF'}}>Solutions</span>,  <br /> for Physicians</h1>
    <h2 className="text-white">We Provide the Best Monitoring Devices
        with <br /> the help of experienced and qualified
        medical <br/> staff right at your door steps
        "Your devotion <br/> and care bring healing, comfort and hope."</h2>
    </div>
  </section>
  {/*  End Home  */}
    
    
  <main id="main">
        <section id="featured-services" className="featured-services">
          <div className="container" data-aos="fade-up">
    
            <div className="row">
              <div className="col-md-8 col-lg-4 d-flex align-items-stretch">
                <div className="icon-box icon-box-active" data-aos="fade-up" data-aos-delay="100">
                  <div className="icon"><i className='bx bx-devices'></i></div>
                  <strong className="title pl-3"> Monitoring Devices</strong>
                  <p className="description pl-3 mt-3">High quality, envoirnmental friendly Monitoring Devices are at your service. 
                  Quick installation through skilled friendly, tolerent medical staff.</p>
                </div>
              </div>
    
              <div className="col-md-8 col-lg-4 d-flex align-items-stretch mb-5 mb-lg-0">
                <div className="icon-box bordered-box" data-aos="fade-up" data-aos-delay="400">
                  <div className="icon"><i className='bx bx-dna'></i></div>
                  <strong className="title text-white pl-3">Reporting Analytics</strong>
                  <p className="description pl-3 mt-3 text-white">
                  The readings are noted and reported very quick and in efficient manner. Moreover, irregular, 
                  emergent and critical readings are identified and notified to the staff for quick response.
                  </p>
                </div>
              </div>
              
              <div className="col-md-8 col-lg-4 d-flex align-items-stretch mb-5 mb-lg-0">
                <div className="icon-box" data-aos="fade-up" data-aos-delay="300">
                  <div className="icon"><i className='bx bx-support' ></i></div>
                  <strong className="title text-white pl-3">Support Scheduling</strong>
                  <p className="description pl-3 mt-3 text-white">Experienced staff is available to get you educatied over the phone 
                  and in-person real quick for your Monitoring program.</p>
                </div>
              </div>
            </div>
    
          </div>
      </section>
      </main>

     
    </Fragment>
    )
}

export default Header;
