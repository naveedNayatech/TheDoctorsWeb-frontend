import React, {useEffect} from 'react';
import Sidebar from '../../components/Staff/Sidebar';
import TopBar from '../../components/Staff/TopBar';
import MetaData from '../../layouts/MetaData';
import { getDoctorCareplans } from '../../actions/adminActions';
import { Table } from 'react-bootstrap';
import Loader from '../../layouts/Loader';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';


const DocCareplanList = () => {

  const dispatch = useDispatch();
  const { staff} = useSelector(state => state.staffAuth);
  const { loading, doccareplanlist } = useSelector(state => state.careplans);
  let id = staff._id;

  useEffect(() => {
    dispatch(getDoctorCareplans(id));
}, [dispatch])



  return (<>
    <MetaData title="My Patients"/>
    <Sidebar />    

    <section className="home-section">
    {/* TopBar */}
    <TopBar />

    <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded" style={{backgroundColor: '#FAFAFA'}}>
        <div className="home-content">
            <h5 className="pt-2 mt-2">Careplan <span style={{color: '#007673'}}>List </span></h5>
            <hr />
              <>
              {loading ? <Loader /> : <Table striped hover bordered>
                            <thead align="center">
                                <tr>
                                <th>Patient Name</th>
                                <th>HR  </th>
                                <th>RPD / RPM </th>
                                <th>Careplan Description</th>
                                <th>File</th> 
                                </tr>
                            </thead>

                             <tbody>
                                {doccareplanlist && doccareplanlist.length > 0 ? <>
                                  {doccareplanlist && doccareplanlist.map((careplan, index) => ( 
                                    <tr key={index}>
                                    
                                    <td>
                                        <small>{careplan?.assigned_patient_id?.firstname}
                                               {careplan?.assigned_patient_id?.lastname}
                                         </small>
                                    </td> 


                                    <td> <small>{careplan?.assigned_hr_id?.firstname} 
                                                {careplan?.assigned_hr_id?.lastname}
                                         </small>
                                    </td>
                                        
                                    <td> <small>{careplan?.readingsPerDay || 'N/A'} / {careplan?.readingsPerMonth || 'N/A'}
                                        </small>
                                    </td>

                                    <td> <small>{careplan?.Description || 'N/A'}</small></td>

                                    <td><small>
                                        <Link style={{textDecoration: 'none'}} to={`https://vitalsportal.com/v1/uploadFiles/${careplan?.fileName}`}>{careplan?.fileName || 'N/A'} </Link>    
                                         </small>
                                     </td>
                                </tr> 
                                
                                ))}
                                </> : 
                                  <td>
                                  <small>No Careplan for this doctor</small>
                                  </td>
                                }
                                </tbody> 
                        </Table> }
              </>
            
        </div>
    </div>
    </section>
    </>
  )
}

export default DocCareplanList