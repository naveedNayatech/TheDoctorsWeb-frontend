import React, {useEffect, Fragment} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getPatients } from '../../actions/adminActions';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';

const PatientsList = () => {

    const dispatch = useDispatch();

    const alert = useAlert();
    const { loading, error, patientCount, patients} = useSelector(state => state.admin)
        
    useEffect(() =>{
        if(error){
            return alert.error(error);
        }

        dispatch(getPatients());

    }, [dispatch, alert, error])

    return (
        <Fragment>
                <MetaData title="Patients List"/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />

                {loading ? <Loader /> : (
                <Fragment>   
                {/*  patients List Filter Section */}
                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded">
                    <div className="home-content">
                        <div className="row">
                            <div className="col-md-7">
                                <h5 className="pt-2 mt-2">Patients List ( {patientCount && patientCount} )</h5>
                            </div>

                            <div className="col-md-2">
                                <select className="form-control" placeholder="Sort By">
                                <option selected disabled>Sort By</option>
                                    <option>Ascending Order</option>
                                    <option>Descending Order</option>
                                    <option>Last Updated</option>
                                </select>
                            </div>


                        <div className="col-md-3">
                            <div>
                                <input type="text" name="search patient" className="form-control" placeholder="Search patient..." />
                            </div>
                        </div>
                        </div>
                    </div>  
                    <hr />

                    <Link to="">
                    <span style={{ float: 'right', paddingRight: 20, fontSize: 14 }}> Add New Patient</span>
                    </Link> 
                    <br/>
                    {/* Patient List Card */}
                        <div className="col-md-12">
                        {patients && <Fragment>
                            <table className="table table-sm table-striped">
                            <thead align="center">
                                <th>REG </th>
                                <th>PT. NAME</th>
                                <th>D.O.B</th>
                                <th>MOBILE </th>
                                <th>EMAIL</th>
                                <th>LOCATION</th>
                                <th>Phy. Status</th>
                                <th>ACTION</th> 
                            </thead>
                            <tbody>
                                {patients && patients.map((patient, index) => (
                                    <tr align="center" key={patient._id}>
                                    <td># {index + 1}</td>  
                                    <td><Link to={{ pathname: "/patientProfile", state: {patientid: patient?._id, deviceid: patient?.deviceid}}}>{patient?.title} {patient?.firstname} {patient?.lastname}</Link></td>
                                    <td>09/22/1958</td>
                                    <td>{patient?.contactno}</td>
                                    <td>{patient?.email}</td>
                                    <td>California</td>
                                    <td>{patient?.doctorid === null ? <span className="patient-profile-doctor-not-assigned">Not Assigned Yet</span> : <span className="patient-profile-doctor-assigned">Assigned</span>}</td>
                                    <td><Link to={{ pathname: "/patientProfile", state: {patientid: patient?._id, deviceid: patient?.deviceid}}} className="rounded-button-profile"><i className='bx bx-user'></i></Link>
                                    <Link disabled className="rounded-button-edit" to="/patients"><i className='bx bx-edit-alt'></i></Link>
                                    <Link className="rounded-button-delete" to="/patients"><i className='bx bxs-user-minus'></i></Link>
                                    </td>
                                    
                                </tr>    
                                ))}
                            </tbody>
                            </table>    
                        </Fragment>}                      
                        </div>
                    </div>
                </Fragment>
            )}
            </section>
        </Fragment>
    )
}

export default PatientsList
