import React, {Fragment, useEffect} from 'react'
import  Sidebar from '../../components/Staff/Sidebar';
import TopBar from '../../components/Staff/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import { useSelector, useDispatch } from 'react-redux';
import folderImg from '../../assets/Images/folder.png';
import { doctorProfile } from '../../actions/adminActions';
import { Link } from 'react-router-dom';

const StaffPatients = ({ history }) => {
    const dispatch = useDispatch();
    
    const { isAuthenticated, staff} = useSelector(state => state.staffAuth);
    const { loading, error, doctor, docpatients} = useSelector(state => state.doctorProfile);
    
    let id = staff._id;

    useEffect(() => {
		
		if(isAuthenticated === false) {
			history.push("/stafflogin");
		}

        console.log('id is ' + id);
        dispatch(doctorProfile(id));

	}, [dispatch, isAuthenticated])

    return (
        <Fragment>
           <MetaData title="My Patients"/>

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
                                        <h5 className="pt-2 mt-2">My Patients ({docpatients && docpatients.length}) </h5> 
                                        <hr />
                                    </div>
                                </div> 
                                
                                {docpatients?.length > 0 ? (<Fragment>
                                <div className="col-md-12">
                                    <Fragment>
                                        <table className="table table-sm table-striped">
                                        <thead align="center">
                                            <th>REG </th>  
                                            <th>NAME</th>
                                            <th>EMAIL</th>
                                            <th>GENDER </th>
                                            <th>CONTACT NO</th>
                                            <th>PREFERRED LANGUAGE</th>
                                            <th>ACTION</th> 
                                        </thead>
                                        <tbody>
                                        {docpatients && docpatients.map((patient, index) => ( 
                                            <tr align="center" key={doctor?._id}>
                                            <td style={{fontWeight: 'bold'}}>{index + 1}</td>
                                            <td><Link to={{ pathname: "/staffPatientProfile", state: {patientid: patient?._id}}}>{patient?.firstname} {patient?.lastname}</Link></td>
                                            <td>{patient?.email}</td>
                                            {patient?.gender === 'Male' ? <td className="male-tag"> <i className='bx bx-male'></i> {patient?.gender}</td> : <td className="female-tag"> <i className='bx bx-female'></i> {patient?.gender}</td>}
                                            <td>{patient?.contactno}</td>
                                            <td>{patient?.preferredlanguage}</td>
                                            <td>
                                            <Link to={{ pathname: "/staffPatientProfile", state: {patientid: patient?._id}}} className="rounded-button-profile"><i className='bx bx-user'></i></Link> &nbsp;
                                                <Link to={{ pathname: "/staffPatients", state: {id: doctor?._id}}} className="rounded-button-edit"><i className='bx bx-edit-alt'></i></Link> &nbsp;
                                                <Link to="/staffPatients" className="rounded-button-delete"><i className='bx bxs-user-minus'></i></Link> &nbsp;
                                            </td>
                                        </tr> 
                                        
                                        ))}
                                        
                                        </tbody>
                                        </table>    
                                    </Fragment>                      
                            </div>
                        </Fragment> ) : <Fragment>

                        <div>   
                                           
                                <img src={folderImg} className="no-record-found-img"/>
                                <p className="doctor-specilizations">No Patient Assigned Yet...</p>
                            
                             
                        </div>
                        </Fragment> }
                                  

                                <hr />
                            </div>
                        </div>
                    </div>
                         </Fragment> } 
                </section>     
        </Fragment>
    )
}

export default StaffPatients
