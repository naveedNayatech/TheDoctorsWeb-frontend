import React, {Fragment, useEffect} from 'react'
import  Sidebar from '../../components/Staff/Sidebar';
import TopBar from '../../components/Staff/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import { useSelector } from 'react-redux';
import moment from 'moment';
import doctorProfileImg from '../../assets/Images/patientProfile.png';

const StaffProfile = ({ history }) => {


    const { loading, isAuthenticated, staff} = useSelector(state => state.staffAuth);
    
    useEffect(() => {
		
		if(isAuthenticated === false) {
			history.push("/doctor/login");
		}

	}, [isAuthenticated])

    return (
        <Fragment>
            <MetaData title="Doctors Profile"/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />

                
                    {loading ? <Loader /> : <Fragment>
                    <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
                        <div className="home-content">
                        <div className="container">
                         <div className="row">
                             <div className="col-md-12">
                                <h5 className="pt-2 mt-2">My <span style={{color: '#F95800'}}>Profile</span> </h5> 
                             </div>
                         </div>   

                         <hr/>
                        

                        {staff && <Fragment>
                            <div className="row">
                            <div className="col-md-4">
                                <div>
                                    <img src={staff?.avatar?.url ? staff?.avatar?.url : doctorProfileImg} className="img-responsive profile-card-img"/>
                                        
                                    <p className="profile-name">Dr. {staff?.firstname} {staff?.lastname} </p>
                                    
                                    
                                    {staff.specialization && staff?.specialization.map((spec, index) => (
                                        
                                            <Fragment key={spec?._id}>
                                                <p className="doctor-specilizations">{spec?.fieldname }</p>
                                                <br />
                                            </Fragment>
                        
                                    ))}
                                </div>
                            </div>

                            <div className="col-md-8">
                                <div>
                                    <div className="card-inner-margin">
                                        <div className="row">
                                            <div className="col-md-6">
                                            <span className="profile-label">Email: </span>
                                                <p className="profile-value-text">{staff?.email}</p>

                                                <span className="profile-label">Gender: </span>
                                                <p className="profile-value-text">{staff?.gender}</p>

                                                <span className="profile-label">Contact #: </span>
                                                <p className="profile-value-text">{staff?.contactno ? staff?.contactno : 'N/A'}</p>

                                                <span className="profile-label">Phone # 1: </span>
                                                <p className="profile-value-text">{staff?.phone1 !== '' ? staff?.phone1 : 'N/A'}</p>
                                            </div>


                                            <div className="col-md-6">
                                            <span className="profile-label">Phone # 2: </span>
                                                <p className="profile-value-text"> {staff?.phone2 !== '' ? staff?.phone2 : 'N/A'} </p>

                                                <span className="profile-label">License #: </span>
                                                <p className="profile-value-text">{staff?.npinumber}</p>

                                                <span className="profile-label">NPI #: </span>
                                                <p className="profile-value-text">{staff?.licensenumber}</p>

                                                <span className="profile-label">Account Created Date: </span>
                                                <p className="profile-value-text">{moment(staff?.createdAt).format("lll")}</p>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                    
                        </Fragment>}
                        
                        </div>
                    </div>
                    </div>
                    </Fragment>
                    }
            </section>
        </Fragment>
    )
}

export default StaffProfile
