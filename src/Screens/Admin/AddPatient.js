import React, {useEffect, Fragment} from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import MetaData from '../../layouts/MetaData';
import TopBar from '../../components/AdminDashboard/TopBar';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '../../components/Form/TextField';
import GenderSelectbox from '../../components/Form/GenderSelectbox';
import { addPatient } from '../../actions/adminActions';
import {useDispatch, useSelector} from 'react-redux'
import { useAlert } from 'react-alert';
import { PATIENT_RESET } from '../../constants/adminConstants';


const AddPatient = (props) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error ,  isAdded} = useSelector(state => state.patientCRUD);
    const data = [{ value:'One', selected:true }, { value: 'Two' }, { value:'Three' }]


    useEffect(() => {
        if(error){
            return alert.error(error);
        }

        if(isAdded) {
            alert.success('Patient Added');
            props?.history.push('/patients');
            dispatch({
                type: PATIENT_RESET
            });   
        }

    }, [dispatch, alert, error, isAdded]);

    const validate = Yup.object().shape({
		firstname: Yup.string()
        .required('First Name is required')
        .min(2, 'Should be atleast 2 characters')
        .max(20, 'Should be less than 20 characters'),
		lastname: Yup.string() 
		  .min(2, 'Should be atleast 2 characters')
		  .max(20, 'Should be less than 20 characters')
		  .required('Last Name is Required'),
        email: Yup.string().email('Invalid email').required('Email is required'),  
		DOB:Yup.string().required('DOB is required'),
        phone1: Yup.string(),
        gender: Yup.string(),
        zipCode:Yup.string(),
        address:Yup.string(),
        city:Yup.string(),
        state:Yup.string(),
        line2: Yup.string(),
        ssn:Yup.string(),
        insurancecompany: Yup.string(),
        diseases: Yup.string(),
	  });

      const submitHandler = (values) => {
        console.log('diseases are ' + values.diseases);
        // dispatch(addPatient(values));
    }

  return <Fragment>
      <MetaData title="Add Patient"/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />

                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded" style={{backgroundColor: '#FAFAFA'}}>
                    <div className="home-content">
                        <h5 className="pt-2 mt-2">Add <span style={{color: '#F95800'}}>Patient </span></h5>
                        <hr className="blue-hr"/>

                        <Formik initialValues={{
                             firstname: '',
                             lastname:'',
                             email: '',
                             DOB: ''
                         }}
                         validationSchema={validate}
                         onSubmit={values => {
                            submitHandler(values)
                        }}
                         >
                         { formik => (
                           <div>
                               <Form>
                               <div className="row">
                                    {/* First Name */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <TextField 
                                            label="First Name" 
                                            name="firstname" 
                                            type="text" 
                                            placeholder="First Name"
                                        />
                                    </div>

                                    {/* Last Name */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <TextField 
                                            label="Last Name" 
                                            name="lastname" 
                                            type="text" 
                                            placeholder="Last Name"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <TextField 
                                            label="Email" 
                                            name="email" 
                                            type="email" 
                                            placeholder="Email"
                                        />
                                    </div>

                                    {/* DOB */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <TextField 
                                            label="DOB" 
                                            name="DOB" 
                                            type="date" 
                                        />
                                    </div>

                                    {/* Gender */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <GenderSelectbox 
                                        label="Gender"
                                        name="gender"
                                    />
                                    </div>

                                    {/* phone1 */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <TextField 
                                                label="Phone 1" 
                                                name="phone1" 
                                                type="text" 
                                                placeholder="Phone Number"
                                        />
                                    </div>


                                    {/* address */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <TextField 
                                                label="Address" 
                                                name="address" 
                                                type="text" 
                                                placeholder="Address"
                                        />
                                    </div>

                                    {/* City */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <TextField 
                                                label="City" 
                                                name="city" 
                                                type="text" 
                                                placeholder="City"
                                        />
                                    </div>

                                    {/* State */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <TextField 
                                                label="State" 
                                                name="state" 
                                                type="text" 
                                                placeholder="State"
                                        />
                                    </div>

                                    {/* line2 */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <TextField 
                                                label="Line 2" 
                                                name="line2" 
                                                type="text" 
                                                placeholder="Line 2"
                                        />
                                    </div>

                                    {/* Zip Code */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <TextField 
                                                label="Zip Code " 
                                                name="zipCode" 
                                                type="text" 
                                                placeholder="Zip Code"
                                        />
                                    </div>

                                    {/* SSN */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                        <TextField 
                                                label="SSN" 
                                                name="ssn" 
                                                type="text" 
                                                placeholder="SSN"
                                        />
                                    </div>

                                    {/* Disease */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                         <TextField 
                                            label="Diseases" 
                                            name="diseases" 
                                            type="text" 
                                            placeholder="Diseases"
                                        /> 
                                    </div>

                                    {/* Insurance Company */}
                                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                        <TextField 
                                                label="Insurance Company" 
                                                name="insurancecompany" 
                                                type="text" 
                                                placeholder="Insurance Company"
                                        />
                                    </div>


                                </div>{/* row ends here */}

                                 {/* Buttons */}
                                 <br/>
                                 <div className="row mr-3" style={{ float: 'right'}}>
                                    <button className="reset-btn" type="reset">Reset</button>
                                    <button className="submit-btn ml-3" type="submit">Add Patient</button>
                                </div>

                                <br/><br/><br/>
                               </Form>
                           </div>  
                         )}
                        </Formik>   
                    </div>
                </div>

                </section>
  </Fragment>;
};

export default AddPatient;
