import React, { Fragment } from 'react'
import { Alert } from 'react-bootstrap';

const DashboardAlerts = () => {
    return (
        <Fragment>
            <section className="alerts-section">
            <h5 className="title">Top Alerts</h5> 

            <Alert variant="primary">
                Doctor liam has added a new patient. 
            </Alert>

            <Alert variant="warning">
                Patient Alex monthly readings.  
            </Alert>

            <Alert variant="danger">
                Patient Adeel BP needs to be checked.
            </Alert>

            <Alert variant="primary">
                RPM device assigned to patient John.
            </Alert>

            <Alert variant="primary">
                This is a primary alert—check it out!
            </Alert>
            </section>
        </Fragment>
    )
}

export default DashboardAlerts
