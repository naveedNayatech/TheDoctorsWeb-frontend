import React, { Fragment } from 'react';

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
                        KIST Hospital Road<br />
                        44700 KTM, NEPAL<br /><br />
                        <strong>Phone:</strong> +1 5589 55488 55<br />
                        <strong>Email:</strong> prcare@example.com<br />
                    </p>
                    <div className="social-links mt-3">
                        <a href="https://www.facebook.com/groups/577400563258704" className="facebook"><i className="bx bxl-facebook"></i></a>
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
                    <li><i className="bx bx-chevron-right"></i> <a href="#about">Who we help?</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#services">How it works?</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#doctor">RPM Devices</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#contact">Telemedicine</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#contact">Login</a></li>
                    </ul>
                </div> 

                <div className="col-lg-4 col-md-6 footer-newsletter">
                    <h4>Our Newsletter</h4>
                    <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
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
