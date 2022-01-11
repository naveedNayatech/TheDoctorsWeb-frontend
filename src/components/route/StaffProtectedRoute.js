import React, {Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StaffProtectedRoute = ({component: Component, ...rest }) => {
    
    const { isAuthenticated, error, loading, staff } = useSelector(state => state.staffAuth);

    return (
        <Fragment>
            
            {loading === false && (
                <Route {...rest} render={props => {

                    if(isAuthenticated === false){
                        return <Redirect to="/stafflogin" />
                    }
                    
                    
                    if(staff.role === 'HR'){
                        return <Redirect to="/Dashboard" />
                    }

                     return <Component {...props} /> 
                }}
                />
            )}
        </Fragment>
    )
}

export default StaffProtectedRoute;