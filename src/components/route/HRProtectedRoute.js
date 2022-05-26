import React, {Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HRProtectedRoute = ({isHR, component: Component, ...rest}) => {
    
    const { isAuthenticated, error, loading, hr } = useSelector(state => state.hrAuth);

    return (
        <Fragment> 
            {loading === false && (
                <Route {...rest} render={props => {
                    if(isAuthenticated === false){
                        return props?.history.push('/hr/login')
                    }

                    if(isHR === true && hr.role === 'HrMedical'){
                        // return props?.history.push('/HrDashboard')
                        <Redirect to="/HrDashboard" />
                    }

                    return <Component {...props} /> 
                }}
             />
            )}
        </Fragment>
    )
}

export default HRProtectedRoute;