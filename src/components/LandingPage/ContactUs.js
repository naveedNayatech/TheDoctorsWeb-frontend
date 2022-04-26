import React, { Fragment } from 'react';
import GmailImg from '../../assets/Images/gmail.png';
import PlaceholderImg from '../../assets/Images/placeholder.png';
import PhoneCallImg from '../../assets/Images/phone-call.png';


const ContactUs = () => {
    return (
    <Fragment>
    {/* Contact Section */}
    <div className="container">
        <hr />
    </div>

    <section id="contact" className="contact">
      <div className="container">

        <div className="section-title">
          <h2>Contact</h2>
          <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
        </div>
      </div>

      {/*********************** Google map  ****************************/}
      <div className="mapouter"><div className="gmap_canvas"><iframe className="gmap_iframe" width="100%" scrolling="no" marginHeight="0" marginWidth="0" src="https://maps.google.com/maps?width=670&amp;height=363&amp;hl=en&amp;q=kist hospital&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe><a href="https://www.fnfgo.com/">FNF Mods</a></div></div>
      
      <div className="container">
        <div className="row mt-5">

          <div className="col-lg-4">
            <div className="info">
              <div className="address">
                <img src={PlaceholderImg} />
                <h4>Location:</h4>
                <p>The Doctors Web</p>
              </div>

              <div className="email">
                <img src={GmailImg} />
                <h4>Email:</h4>
                <p>support@thedoctorsweb.com</p>
              </div>

              <div className="phone">
                <img src={PhoneCallImg} />
                <h4>Call:</h4>
                <p>+1 813 606 4008</p>
              </div>
            </div>
          </div>

          <div className="col-lg-8 mt-5 mt-lg-0">
            <form action="" role="form" className="php-email-form">
              <div className="row">
                <div className="col-md-6 form-group">
                  <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
                </div>
              </div>
              <div className="form-group mt-3">
                <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
              </div>
              <div className="form-group mt-3">
                <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
              </div>
              <div className="text-center"><button type="submit">Send Message</button></div>
              <br /><br /><br />
            </form>
          </div>
        </div>
      </div>
     </section>
    </Fragment>
    )
}

export default ContactUs;
