import React, {Fragment, useEffect} from 'react'
import  Sidebar from '../../components/Staff/Sidebar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import TopBar from '../../components/Staff/TopBar';
import { useSelector } from 'react-redux';

const StaffDashboard = (props) => {

    const { loading, isAuthenticated} = useSelector(state => state.staffAuth);

    useEffect(() => {
		
		if(isAuthenticated === false) {
			props?.history?.push("/stafflogin");
		}

	}, [isAuthenticated])


    return (
        <Fragment>
            <MetaData title="Staff Dashboard" />
            <Sidebar />
            
            <section className="home-section">
                {/* TopBar */}  
                <TopBar />

                
            </section>

        </Fragment>
    )
}

export default StaffDashboard;
