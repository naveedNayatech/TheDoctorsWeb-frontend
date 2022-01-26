import React, { Fragment } from 'react'

const AboutUs = () => {
    return (
        <Fragment>
             <section className="about-us-section" id="about-us">
                <div className="container">
                <br />
                <h2 className="telemedicine-heading about-us">About Us</h2>
                <h5 className="telemedine-subheading">Core Solutions of Virtual Care by TheDoctorsWeb</h5>
                <br />
                
                <div className="about_us_points">
                    <p className="about-us-point">Remote Patient Monitoring</p>
                    <p className="about-us-point">Chronic Care Management</p>
                    <p className="about-us-point">Telemedicine</p>
                </div>
                
                </div>
            </section>
        </Fragment>
    )
}

export default AboutUs
