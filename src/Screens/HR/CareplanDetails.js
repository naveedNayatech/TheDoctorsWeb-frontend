import React, {useState, useEffect, Fragment} from 'react'
import MetaData from '../../layouts/MetaData';
import  HRSidebar from '../../components/HR/HRSidebar';
import HRTopBar from '../../components/HR/HRTopbar';
import { getPatientCarePlan, updateCarePan} from '../../actions/HRActions';
import {useSelector, useDispatch} from 'react-redux';
import { Formik, Form } from 'formik';
import moment from 'moment';
import { Badge, Modal } from 'react-bootstrap';
import { UPDATE_CARE_PLAN_RESET } from '../../constants/HRConstants';
import { useAlert } from 'react-alert';
import TextField from '../../components/Form/TextField';
import { Link } from 'react-router-dom';

const CareplanDetails = (props) => {
  
  const alert = useAlert();
  const dispatch = useDispatch();
  let patientid = props?.location?.state?.patientId;

  const { careplan, isUpdated } = useSelector(state => state.careplan);
  const [carePlanShow ,setCarePlanShow] = useState(false);

  const [description, setDescription] = useState(careplan?.Description);
  const [readingsPerDay, setReadingsPerDay] = useState(careplan?.readingsPerDay);
  const [readingsPerMonth, setReadingsPerMonth] = useState(careplan?.readingsPerMonth);


  const handleCarePlanModalClose = () => setCarePlanShow(false);
  const handleCarePlanModalShow = () => setCarePlanShow(true);

  useEffect(() => {

    dispatch(getPatientCarePlan(patientid));

    if(isUpdated){
      alert.success('Care plan updated');
      setCarePlanShow(false);
      dispatch({ type: UPDATE_CARE_PLAN_RESET})
      dispatch(getPatientCarePlan(patientid));
    }

}, [dispatch, isUpdated]);

  const updatehandler = () => {
    dispatch(updateCarePan(description, readingsPerMonth, readingsPerDay, careplan?._id));
  }

  return (
    <Fragment>
      <MetaData title="Patients Profile"/>
        <HRSidebar />    

        <section className="home-section">
        {/* TopBar */}
        <HRTopBar />

        <div className="shadow-lg p-3 mb-5 mr-4 ml-4 bg-white rounded">        
            <div className="home-content">
                <div className="container">
                <h5 className="pt-2 mt-2"><span style={{ color: '#F95800'}}> Care Plan </span></h5>
                <hr />
                {careplan && (
                  <Fragment>
                      <div className="row">
                  <div className="col-md-4">
                    <b>Patient Details</b>
                    <hr/>
                    <span className="profile-label">Name: {careplan?.assigned_patient_id?.firstname} {careplan?.assigned_patient_id?.lastname}</span><br/>
                    <span className="profile-label">DOB: {moment(careplan?.assigned_patient_id?.DOB).format("ll")}</span><br/>
                    <span className="profile-label">Gender: <Badge bg="info text-white">{careplan?.assigned_patient_id?.gender}</Badge></span><br/>
                    <span className="profile-label">Email: {careplan?.assigned_patient_id?.email}</span><br/>
                    <span className="profile-label">Phone 1: {careplan?.assigned_patient_id?.phone1}</span> <br/>
                    <span className="profile-label">Diseases: {careplan?.assigned_patient_id?.diseases}</span>

                  </div>

                  <div className="col-md-4">
                    <b>Added By</b>
                    <hr/>
                    <span className="profile-label">Name: {careplan?.assigned_hr_id?.firstname} {careplan?.assigned_hr_id?.lastname}</span><br/>
                    <span className="profile-label">DOB: {moment(careplan?.assigned_hr_id?.firstname).format("ll")}</span><br/>
                    <span className="profile-label">Gender: <Badge bg="danger text-white">Male</Badge></span><br/>
                    <span className="profile-label">Email: {careplan?.assigned_hr_id?.email}</span><br/>
                    <span className="profile-label">Phone 1: {careplan?.assigned_hr_id?.phone1}</span> <br/>
                    <span className="profile-label">Role: <Badge bg="warning text-white">{careplan?.assigned_hr_id?.role}</Badge></span>
                  </div>

                  <div className="col-md-4">
                    <b>Careplan</b>
                    <hr/>
                    <small style={{textAlign:'justifyContent'}}>{careplan?.Description}</small> <br/>
                    <Link to={`https://vitalsportal.com/v1/uploadFiles/${careplan?.fileName}`}>{careplan?.fileName}</Link>
                    <small style={{float: 'right', marginRight: 20}}><i>{moment(careplan?.createdAt).format("lll")}</i></small> <br/>
                    <br/>
                    <button className="btn btn-outline-info mt-2" onClick={handleCarePlanModalShow}>Update Careplan</button>
                  </div>
                </div>
                  </Fragment>
                )}
                </div>
            </div>
        </div>
        </section>

       {/* Careplan Modal */}
       <Modal show={carePlanShow} onHide={handleCarePlanModalClose}>
            <Modal.Body>
                <h5>Update <span style={{color: '#F95800'}}> Care Plan </span></h5>
                <hr />
                <Formik initialValues={{
                    description: '', 
                }}
                onSubmit={updatehandler}
                >
                { formik => (
                    <div>
                        <Form>

                        <TextField 
                                label="Readings / mo" 
                                name="readingsPerMonth" 
                                type="number" 
                                placeholder="Readings / mo"
                                value={readingsPerMonth} 
                                onChange={(e) => setReadingsPerMonth(e.target.value)}
                            />

                            <TextField 
                                label="Readings / day" 
                                name="readingsPerDay" 
                                type="number" 
                                placeholder="Readings / day"
                                value={readingsPerDay} 
                                onChange={(e) => setReadingsPerDay(e.target.value)}
                            />

                        <label htmlFor="description" className="form-label mt-3">Description</label>
                            <textarea 
                                label="Description" 
                                name="description"
                                className="form-control"
                                rows="4"	
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Type description here .... "
                            />


                        <br/>
                        <div className="row-class">
                            <button className="btn btn-outline-danger ml-3" type="submit">Update</button>
                        </div>
                        </Form>
                    </div>
                )}   
                </Formik>   
            </Modal.Body>
        </Modal>
        {/* Careplan Modal ends here*/}

    </Fragment>
  )
}

export default CareplanDetails