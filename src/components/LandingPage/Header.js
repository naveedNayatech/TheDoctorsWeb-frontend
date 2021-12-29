import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom';

const Header = () => {

  let listener = null
  const [scrollState, setScrollState] = useState("top")

  React.useEffect(() => {

     /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }


  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
   let navbarlinks = select('#navbar .scrollto', true)
   const navbarlinksActive = () => {
     let position = window.scrollY + 200
     navbarlinks.forEach(navbarlink => {
       if (!navbarlink.hash) return
       let section = select(navbarlink.hash)
       if (!section) return
       if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
         navbarlink.classList.add('active')
       } else {
         navbarlink.classList.remove('active')
       }
     })
   }
   window.addEventListener('load', navbarlinksActive)
   onscroll(document, navbarlinksActive)

  
  
    let selectHeader = select('#header')
    let selectTopbar = select('#topbar')
    listener = document.addEventListener("scroll", e => {
      var scrolled = document.scrollingElement.scrollTop
      if (scrolled >= 120) {
        selectHeader.classList.add('header-scrolled');
        if (selectTopbar) {
          selectTopbar.classList.add('topbar-scrolled')
        }
      } else {
        selectHeader.classList.remove('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.remove('topbar-scrolled')
        }
      }
    })
    return () => {
      document.removeEventListener("scroll", listener)
    }
  }, [scrollState])

 

    return (
 <Fragment>
  {/****************** Top Bar  ************************/}
  <div id="topbar" className="d-flex align-items-center fixed-top">
    <div className="container d-flex justify-content-between">
      <div className="contact-info d-flex align-items-center">
        <i className='bx bx-mail-send'></i> <a href="mailto:contact@example.com">thedoctorsweb@example.com</a>
        <i className='bx bx-phone'></i> +1 5567 23453 21
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

      <h1 className="logo me-auto"><Link to="/">THEDOCTORSWEB</Link></h1>
    
      <nav id="navbar" className="navbar order-last order-lg-0">
        <ul>
          <li><a className="nav-link scrollto" href="#about-us">About Us</a></li>
          <li><a className="nav-link scrollto" href="#how_it_works">How It Works?</a></li>
          <li><a className="nav-link scrollto" href="#rpm_devices">RPM Devices</a></li>       
          <li><a className="nav-link scrollto" href="#telemedicine">Tele-Medicine</a></li>
          <li><Link to="/login" className="nav-link">Login</Link></li>
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
      <h1>RPM Solutions,  <br /> for Physicians</h1>
      <h2>Lorem ipsum dolor sit amet consectetur <br/> adipisicing elit. Iste eius, ipsa quo nam animi <br/>  expedita? Optio qui totam expedita sunt sit laborum <br/>"Your devotion and care bring healing, comfort and hope."</h2>
      <a href="#about" className="btn-get-started scrollto">View More</a>
    </div>
  </section>
  {/*  End Home  */}
    
    
    <main id="main">
         {/******************** Featured Services Section  ***********************/}
        <section id="featured-services" className="section featured-services">
          <div className="container" data-aos="fade-up">
    
            <div className="row">
              <div className="col-md-8 col-lg-4 d-flex align-items-stretch mb-5 mb-lg-0">
                <div className="icon-box" data-aos="fade-up" data-aos-delay="100">
                  <div className="icon"><i className='bx bx-devices'></i></div>
                  <h4 className="title"><a href=""> Monitoring Devices</a></h4>
                  <p className="description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. At labore molestiae fugit impedit quis beatae. Odio quis dignissimos nulla, illo, maiores sit provident iure eveniet ex repellat veniam ipsam obcaecati?</p>
                </div>
              </div>
    
              <div className="col-md-8 col-lg-4 d-flex align-items-stretch mb-5 mb-lg-0">
                <div className="icon-box" data-aos="fade-up" data-aos-delay="400">
                  <div className="icon"><i className='bx bx-dna'></i></div>
                  <h4 className="title"><a href="">Reporting Analytics</a></h4>
                  <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero illo, repellendus animi, sequi fugit laboriosam reprehenderit eum optio perspiciatis odit odio ab quibusdam corrupti iure facere provident veritatis corporis aut.</p>
                </div>
              </div>
              
              <div className="col-md-8 col-lg-4 d-flex align-items-stretch mb-5 mb-lg-0">
                <div className="icon-box" data-aos="fade-up" data-aos-delay="300">
                  <div className="icon"><i className='bx bx-support' ></i></div>
                  <h4 className="title"><a href="">Support Scheduling</a></h4>
                  <p className="description">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil numquam corporis consequatur nisi fuga. Temporibus adipisci ex, doloribus neque sit tenetur maiores fugit dolorem qui illum recusandae eum quas? At!</p>
                </div>
              </div>
            </div>
    
          </div>
      </section>
      </main>

      {/* End Featured Services Section */}
    </Fragment>
    )
}

export default Header;
