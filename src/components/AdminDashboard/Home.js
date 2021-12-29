import React, { Fragment } from 'react';
import TopBar from '../AdminDashboard/TopBar';

const Home = () => {

    return (
        <Fragment>

        <section className="home-section">
            <TopBar />

            {/*  Home content  */}
            <div className="home-content">
                <div className="overview-boxes">
                    <div className="box">
                        <div className="left-side">
                            <div className="box_topic">Total Patients</div>
                            <div className="number">15,245</div>
                            <div className="indicator">
                                <i className="bx bx-up-arrow-alt"></i>
                                <span className="text">Up from Yesterday</span>
                            </div>
                        </div>
                        <i className="bx bx-user cart"></i>
                    </div>

                    <div className="box">
                        <div className="left-side">
                            <div className="box_topic">Inventory</div>
                            <div className="number">38,500</div>
                            <div className="indicator">
                                <i className="bx bx-up-arrow-alt"></i>
                                <span className="text">Up from Yesterday</span>
                            </div>
                        </div>
                        <i className="bx bxs-cart-add cart two"></i>
                    </div>

                    <div className="box">
                        <div className="left-side">
                            <div className="box_topic">RPM Devices</div>
                            <div className="number">1,500</div>
                            <div className="indicator">
                                <i className="bx bx-up-arrow-alt"></i>
                                <span className="text">Up from Yesterday</span>
                            </div>
                        </div>
                        <i className="bx bx-devices cart three"></i>
                    </div>

                    <div className="box">
                        <div className="left-side">
                            <div className="box_topic">Total Profit</div>
                            <div className="number">63,300</div>
                            <div className="indicator">
                                <i className="bx bx-down-arrow-alt down"></i>
                                <span className="text">Up from Yesterday</span>
                            </div>
                        </div>
                        <i className="bx bxs-cart-download cart four"></i>
                    </div>
                </div>

                <div className="container">
                    <hr />
                </div>

                {/* Sales Content */}
                <div className="sales-boxes">
                    <div className="recent-sale box">
                        <div className="container-fluid row">
                            <div className="col-lg-8 col-md-8">
                                <h4 className="title">Recently Added Patients</h4>
                                <div className="sales-details">
                                    <table className="table table-striped">
                                        <thead>
                                          <th>Avatar</th>  
                                          <th>P Name</th>
                                          <th>Birth</th>
                                          <th>Mobile</th>
                                          <th>Email</th>
                                          <th>profile</th>
                                        </thead>
                                        <tbody>
                                        <tr>
                                          <td><img src="https://pickaface.net/gallery/avatar/unr_random_160817_0304_2mvqp69.png" style={{borderRadius: '50%', width: '50px', height: '50px'}} /></td>  
                                          <td>Peter</td>
                                          <td>09/22/1958</td>
                                          <td>6095583763</td>
                                          <td>NA</td>
                                          <td><button className="btn btn-sm profile-btn" type="submit">Profile</button></td>
                                        </tr>

                                       
                                        <tr>
                                            <td><img src="https://pickaface.net/gallery/avatar/unr_random_160817_0304_2mvqp69.png" style={{borderRadius: '50%', width: '50px', height: '50px'}} /></td>  
                                            <td>Peter</td>
                                            <td>09/22/1958</td>
                                            <td>6095583763</td>
                                            <td>NA</td>
                                            <td><button className="btn btn-sm profile-btn" type="submit">Profile</button></td>
                                        </tr>

                                        <tr>
                                            <td><img src="https://pickaface.net/gallery/avatar/unr_random_160817_0304_2mvqp69.png" style={{borderRadius: '50%', width: '50px', height: '50px'}} /></td>  
                                            <td>Peter</td>
                                            <td>09/22/1958</td>
                                            <td>6095583763</td>
                                            <td>NA</td>
                                            <td><button className="btn btn-sm profile-btn" type="submit">Profile</button></td>
                                        </tr>

                                        <tr>
                                            <td><img src="https://pickaface.net/gallery/avatar/unr_random_160817_0304_2mvqp69.png" style={{borderRadius: '50%', width: '50px', height: '50px'}} /></td>  
                                            <td>Peter</td>
                                            <td>09/22/1958</td>
                                            <td>6095583763</td>
                                            <td>NA</td>
                                            <td><button className="btn btn-sm profile-btn" type="submit">Profile</button></td>
                                        </tr>

                                        <tr>
                                            <td><img src="https://pickaface.net/gallery/avatar/unr_random_160817_0304_2mvqp69.png" style={{borderRadius: '50%', width: '50px', height: '50px'}} /></td>  
                                            <td>Peter</td>
                                            <td>09/22/1958</td>
                                            <td>6095583763</td>
                                            <td>NA</td>
                                            <td><button className="btn btn-sm profile-btn" type="submit">Profile</button></td>
                                        </tr>
                                        </tbody>
                                      </table>
                                </div>
                            </div>

                            
                                <div className="col-md-4 col-lg-4">
                                    <h4 className="title">RPM Devices</h4>
                                    
                                    <table className="table table-bordered">
                                        <thead>
                                          <th>Device</th>  
                                          <th>Name</th>
                                          <th>Status</th>
                                        </thead>
                                        <tbody>
                                        <tr>
                                          <td><img src="https://img.medicalexpo.com/images_me/photo-m2/67891-13167624.jpg" style={{borderRadius: '50%', width: '50px', height: '50px'}}/></td>  
                                          <td>RPM-899RJ</td>
                                          <td><span className="success-tag">Assigned</span></td>
                                        </tr>
                                        <tr>
                                          <td><img src="https://img.medicalexpo.com/images_me/photo-m2/67891-13167624.jpg" style={{borderRadius: '50%', width: '50px', height: '50px'}}/></td>  
                                          <td>RPM-584XY</td>
                                          <td><span className="success-tag">Assigned</span></td>
                                        </tr>
                                        <tr>
                                            <td><img src="https://img.medicalexpo.com/images_me/photo-m2/67891-15829815.jpg" style={{borderRadius: '50%', width: '50px', height: '50px'}}/></td>  
                                          <td>RPM-659XW</td>
                                          <td><span className="warning-tag">Pending</span></td>
                                        </tr>
                                        <tr>
                                          <td><img src="https://img.medicalexpo.com/images_me/photo-m2/67891-13167624.jpg" style={{borderRadius: '50%', width: '50px', height: '50px'}}/></td>  
                                          <td>RPM-659XW</td>
                                          <td><span className="success-tag">Assigned</span></td>
                                        </tr>
                                        </tbody>
                                      </table>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                </section>

        </Fragment>
    )
}

export default Home
