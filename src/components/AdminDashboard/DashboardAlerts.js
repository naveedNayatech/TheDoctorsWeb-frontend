import React, { useEffect, Fragment } from 'react'
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAdminNotifications } from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import moment from 'moment';

const DashboardAlerts = () => {

    const alert = useAlert();
    const { notifications, error} = useSelector(state => state.adminNoti);
    
    const dispatch = useDispatch();

    useEffect(() => {
        if(error) {
            alert.error(error);
        }
        dispatch(getAdminNotifications());
  }, [dispatch]);


    return (
        <Fragment>
            <section className="alerts-section rounded-card">
            <h5 className="title">Notifications</h5> 

            {notifications && notifications?.data?.map((noti, index) =>(
               <Fragment>
                 <Link style={{textDecoration: 'none'}} to={{ pathname: "/patientProfile", state: {patientid: noti?.patientId}}}>
                    <Alert variant={noti?.status === "High" ? "danger" : noti?.status === 'Elevated' ? "warning" : "success"}>
                        <small>{noti?.textAny} &nbsp;&nbsp;&nbsp; <b>status: {noti?.status} </b></small>
                        <div style={{justifyContent: 'space-between'}}>
                            <small style={{fontSize: '12px', color: 'gray', float:'right'}}>{moment(noti?.createdAt).format("lll")}</small>
                            <br/>
                        </div>    
                    </Alert>
                </Link>
               </Fragment> 
            ))}
            </section>
        </Fragment>
    )
}

export default DashboardAlerts
