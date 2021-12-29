import React, { Fragment } from 'react'
import Sidebar  from '../../components/AdminDashboard/Sidebar';
import TopBar  from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import { Link } from 'react-router-dom';


const RPMDevices = () => {
    return (
        <Fragment>
              <MetaData title="RPM Devices "/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />

                <div className="shadow-lg p-3 mb-2 mr-4 ml-4 rounded">
                        <div className="home-content">
                            <h5 className="pt-2">My Devices</h5>
                            <hr /> 
                        </div>

                        {/* Devices List Card */}
                        <div className="col-md-12">
                         <Fragment>
                            <table className="table table-sm table-striped">
                            <thead align="center">
                                <th>SERIAL NUMBER </th>  
                                <th>IMEI</th>
                                <th>MODEL NUMBER</th>
                                <th>STATUS </th>
                                <th>LAST ACTIVE</th>
                                <th>SIGNAL</th>
                                <th>BATTERY</th>
                                <th>ACTION</th> 
                            </thead>
                            <tbody>                            
                                <tr align="center" key="1">
                                    <td><Link to="/devicedetails">20121300046</Link></td>
                                    <td>864351051389668</td>
                                    <td>BS-2001-G1</td>
                                    <td>Activated</td>
                                    <td>12/27 00:56</td>
                                    <td style={{color: 'red'}}>Weak</td>
                                    <td>100%</td>
                                    <td>
                                        <Link to="/devicedetails" className="rounded-button-profile"><i className='bx bx-list-ul'></i></Link>
                                        <Link to="/devices" className="rounded-button-deactivate"><i class='bx bx-power-off'></i></Link>
                                    </td>
                                </tr>

                                <tr align="center" key="2">
                                    <td><Link to="/devicedetails">20121300046</Link></td>
                                    <td>864351051389668</td>
                                    <td>BS-2001-G1</td>
                                    <td>Activated</td>
                                    <td>12/27 00:56</td>
                                    <td style={{color: 'red'}}>Weak</td>
                                    <td>100%</td>
                                    <td>
                                        <Link to="/devicedetails" className="rounded-button-profile"><i className='bx bx-list-ul'></i></Link>
                                        <Link to="/devices" className="rounded-button-deactivate"><i class='bx bx-power-off'></i></Link>
                                    </td>
                                </tr>

                                <tr align="center" key="3">
                                    <td><Link to="/devicedetails">100213700032</Link></td>
                                    <td>867730051419038</td>
                                    <td>LS802-GP-015</td>
                                    <td>Activated</td>
                                    <td>12/27 00:56</td>
                                    <td style={{color: 'red'}}>Weak</td>
                                    <td>100%</td>
                                    <td>
                                        <Link to="/devicedetails" className="rounded-button-profile"><i className='bx bx-list-ul'></i></Link>
                                        <Link to="/devices" className="rounded-button-deactivate"><i class='bx bx-power-off'></i></Link>
                                    </td>
                                </tr>                      
                             </tbody>
                            </table>    
                        </Fragment>                      
                        </div>
                    </div>            
                </section>
        </Fragment>
    )
}

export default RPMDevices
