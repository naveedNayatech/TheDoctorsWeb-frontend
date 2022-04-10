import React, { useEffect } from 'react';
import MetaData from '../../layouts/MetaData';
import  HRSidebar from '../../components/HR/HRSidebar';
import HRTopBar from '../../components/HR/HRTopbar';
import { useSelector, useDispatch } from 'react-redux';
import { getHRCareplans } from '../../actions/HRActions';
import { Table, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../../layouts/Loader';

const CareplanList = () => {

    const dispatch = useDispatch();
    const {hr} = useSelector(state => state.hrAuth);

    const { loading, careplanlist } = useSelector(state => state.careplans);

    let hrId = hr?._id;

    useEffect(() => {

     dispatch(getHRCareplans(hrId));   
    }, [dispatch]);


  return (
    <>
      <MetaData title="Careplan List"/>
        <HRSidebar />    

        <section className="home-section">
        {/* TopBar */}
        <HRTopBar />

        <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
            <div className="home-content">
                <div className="container">
                    <h5 className="pt-2 mt-2"><span style={{ color: '#F95800'}}> Careplans </span></h5>
                    <hr />
                </div>


                <div className="container-fluid col-md-12">
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
                                 {careplanlist && careplanlist.map((careplan, index) => ( 
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
                                
                                </tbody> 
                        </Table> }
                    </>
                    </div>



            </div>
        </div>
        </section>
    </>
  )
}

export default CareplanList