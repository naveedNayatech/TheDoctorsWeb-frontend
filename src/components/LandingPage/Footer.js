import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
    <Fragment>
        {/* Footer Section */}
        <footer id="footer">
            <div className="footer-top">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="footer-info">
                    <h3>THEDOCTORSWEB</h3>
                    <p>
                        The Doctors Web<br />
                        Tampa, FL USA<br /><br />
                        <strong>Phone:</strong> +1 813 606 4002<br />
                        <strong>Email:</strong> support@ethedoctorsweb.com<br />
                    </p>
                    <div className="social-links mt-3">
                        <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
                        <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
                        <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
                        <a href="#" className="google-plus"><i className="bx bxl-skype"></i></a>  
                        <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
                    </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6 footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                    <li><i className="bx bx-chevron-right"></i> <a href="#about-us">About Us</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#how_it_works">How it works?</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#rpm_devices">RPM Devices</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#telemedicine">Telemedicine</a></li>
                    <li><i className="bx bx-chevron-right"></i> <Link to="/login" className="nav-link">Login</Link></li>
                    </ul>
                </div> 

                <div className="col-lg-4 col-md-6 footer-newsletter">
                    <h4>Our Newsletter</h4>
                    <p>Please subscribe to our news letter</p>
                    <form action="" method="post">
                    <input type="email" name="email" /><input type="submit" value="Subscribe" />
                    </form>
                </div>

                </div>
              </div>
            </div>
        </footer>
        {/* End Footer Section */}
        </Fragment>
    )
}

export default Footer;
