import React, {useEffect, useState} from 'react';
import MetaData from '../../layouts/MetaData';
import TopBar from '../../components/AdminDashboard/TopBar';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getDoctors, doctorProfile } from '../../actions/adminActions';
import DoctorProfile from '../../components/AdminDashboard/DoctorProfile';

const AdminResetPassword = () => {

  const dispatch = useDispatch();
  const [doctorId, setDoctorId] = useState('');
  const { loading, error, doctors} = useSelector(state => state.doctor);
  const { doctor } = useSelector(state => state.doctorProfile);

  const [userType, setUserType] = useState('doctor');

  useEffect(() => {
    dispatch(getDoctors());

    if(doctorId){
        dispatch(doctorProfile(doctorId))
    }
    
}, [dispatch, error, doctorId]);

  
  return (
    <>
        <MetaData title="Reset Password"/>
              <Sidebar />    

            <section className="home-section">
                {/* TopBar */}
              <TopBar />

              <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded" style={{backgroundColor: '#FAFAFA'}}>
                  <div className="home-content">
                      <h5 className="pt-2 mt-2">Reset <span style={{color: '#F95800'}}>Password </span></h5>
                      <hr />
                  </div>

                  <div className="row justify-content-center">
                      <button 
                        className={`btn ${userType === 'doctor' ? 'btn-primary' : 'link'} m-3`}
                        onClick={() => setUserType('doctor')}
                        > 
                        <i className='bx bxs-user pr-2'></i>
                          Doctor 
                      </button>

                      <button 
                        className={`btn ${userType === 'hr' ? 'btn-secondary' : 'link'} m-3`}
                        onClick={() => setUserType('hr')}> 
                        <i className='bx bxs-user pr-2'></i>
                         HR </button>
                  </div>

                  <br/><br/>

                  {userType === 'doctor' ? <>
                  <div className='row'>
                  <div className="col-md-4">
                      <select 
                      className="form-control"
                      onChange={(e) => setDoctorId(e.target.value)}
                      >

                      <option>Select Doctor</option>
                      {doctors && doctors.map((doc, index) => (
                              <option value={doc?._id} key={index}> {doc?.firstname} {doc?.lastname} {doc?.npinumber} </option>
                          ))} 
                      </select>
                    </div>
                      {doctor && <>
                        <div className="col-md-8">  
                        <DoctorProfile doctors={doctors} doctor={doctor} />
                      </div>
                      </>
                      }
                    </div>
                     </> : null }
                  
                  </div>


            </section>
    </>
  )
}

export default AdminResetPassword