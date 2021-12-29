import React, { Fragment } from 'react'
import Sidebar  from '../../components/AdminDashboard/Sidebar';
import TopBar  from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import { Link } from 'react-router-dom';
import RPMDeviceBasicInformation from '../../components/AdminDashboard/RPMDeviceBasicInformation';

const DevicesDetails = () => {
    return (
        <Fragment>
            <MetaData title="Device Details"/>
                    <Sidebar />    

                    <section className="home-section">
                    {/* TopBar */}
                    <TopBar />

                    <div className="shadow-lg p-3 mb-2 mr-4 ml-4 rounded">
                            <div className="home-content">
                                <h5 className="pt-2">Device Details (SN: 20121300046)</h5>
                                <hr /> 

                                <RPMDeviceBasicInformation />    
                            </div>
                    </div>

                </section>        
        </Fragment>
    )
}

export default DevicesDetails
