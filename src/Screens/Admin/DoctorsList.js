import React, {useEffect, Fragment} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctors } from '../../actions/adminActions';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';

const DoctorsList = () => {

    const dispatch = useDispatch();

    let index = 1;
    const alert = useAlert();
    const { loading, error, doctorCount, doctors} = useSelector(state => state.admin)
        
    useEffect(() =>{
        if(error){
            return alert.error(error);
        }
        console.log('Doctors list needs to be fetched');
        dispatch(getDoctors());

    }, [dispatch, alert, error ])

    return (
        <Fragment>
                <MetaData title="Doctors"/>
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
                                <h5 className="pt-2">Doctors List ( {doctorCount && doctorCount} )</h5> 
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
                                <input type="text" name="search_doctor" className="form-control" placeholder="Search doctor..." />
                            </div>
                        </div>
                        </div>
                    </div>  
                    <hr />

                    <Link to="/adddoctor">
                    <span style={{ float: 'right', paddingRight: 20, fontSize: 14 }}> Add New Doctor</span>
                    </Link> 
                    <br/>
                    {/* Patient List Card */}
                        <div className="col-md-12">
                         <Fragment>
                            <table className="table table-sm table-striped">
                            <thead align="center">
                                <th>REG </th>  
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>GENDER </th>
                                <th>CONTACT NO</th>
                                <th>NPI</th>
                                <th>ACTION</th> 
                            </thead>
                            <tbody>
                            {doctors && doctors.map((doctor, index) => ( 
                                <tr align="center" key={doctor?._id}>
                                <td style={{fontWeight: 'bold'}}>{index + 1}</td>
                                <td><Link to={{ pathname: "/doctorProfile", state: {id: doctor?._id}}}> {doctor?.firstname} {doctor?.lastname}  </Link></td>
                                <td>{doctor?.email}</td>
                                {doctor?.gender === 'Male' ? <td className="male-tag"> <i className='bx bx-male'></i> {doctor?.gender}</td> : <td className="female-tag"> <i className='bx bx-female'></i> {doctor?.gender}</td>}
                                <td>{doctor?.contactno}</td>
                                <td>{doctor?.npinumber}</td>
                                <td>
                                    <Link to={{ pathname: "/doctorProfile", state: {id: doctor?._id}}} className="rounded-button-profile"><i className='bx bx-user'></i></Link>
                                    <Link to={{ pathname: "/editDoctor", state: {id: doctor?._id}}} className="rounded-button-edit"><i className='bx bx-edit-alt'></i></Link>
                                    <Link className="rounded-button-delete"><i className='bx bxs-user-minus'></i></Link>
                                </td>
                            </tr> 
                            
                             ))}
                             
                             </tbody>
                            </table>    
                        </Fragment>                      
                        </div>
                    </div>
                </Fragment>
             )}
            </section>
        </Fragment>
    )
}

export default DoctorsList;
