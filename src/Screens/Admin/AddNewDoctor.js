import React, { useEffect, useState, Fragment } from 'react';
import MetaData from '../../layouts/MetaData';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import MultiSelect from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { addDoctor, clearErrors } from '../../actions/adminActions';
import { useAlert } from 'react-alert';
import { ADD_DOCTOR_RESET} from '../../constants/adminConstants';
import TextField from '../../components/Form/TextField';
import GenderSelectbox from '../../components/Form/GenderSelectbox';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const AddNewDoctor = ({ history }) => { 

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, success} = useSelector(state => state.newDoctor);

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
		password: Yup.string()
        .min(6, 'Minimum 6 characters')
        .max(20, 'Maximum 20 characters')
        .required('Password is Required'),
        DOB:Yup.string().required('DOB is required'),
        mobileNo: Yup.string(),
        phone1: Yup.string(),
        gender: Yup.string(),
        npinumber: Yup.string(),
        licensenumber: Yup.string()
	  });

    // const  handleOnchange  =  val  => {
    //     setSpecialization(val)
    // }

    // const  options  = [
    //     { label:  'MBBS', value:  'MBBS'  },
    //     { label:  'FCPS', value:  'FCPS'  },
    //     { label:  'HMS', value:  'HMS'  },
    //     { label:  'Dermatologists', value:  'Dermatologist'  },
    //     { label:  'Ophthalmologists', value:  'Ophthalmologists'  },
    // ]

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

    if(success){
        alert.success('Doctor Added');
        history.push('/doctors');
        dispatch({
            type: ADD_DOCTOR_RESET
        });
    }
}, [dispatch, alert, error, success, history]);

    const submitHandler = (values) => {
		dispatch(addDoctor(values));
    }

    return (
        <Fragment>
            <MetaData title="Add Doctor"/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />


                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded">
                    <div className="home-content">
                        <h5 className="pt-2 mt-2">Add <span style={{color: '#F95800'}}> Doctor</span></h5>
                        <hr className="blue-hr" />

                        <Formik initialValues={{ }}
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

                                     {/* Gender */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <GenderSelectbox 
                                        label="Gender"
                                        name="gender"
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

                                     {/* Email */}
                                     <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                         <TextField 
                                             label="Email" 
                                             name="email" 
                                             type="email" 
                                             placeholder="Email Address"
                                         />
                                     </div>

                                     {/* Password */}
                                     <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                         <TextField 
                                             label="Password" 
                                             name="password" 
                                             type="text" 
                                             placeholder="Password"
                                         />
                                     </div>

                                     {/* Phone1 */}
                                     <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                         <TextField 
                                             label="Phone 1" 
                                             name="phone1" 
                                             type="text" 
                                             placeholder="Phone 1"
                                         />
                                     </div>

                                     {/* Mobile Number */}
                                     <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                         <TextField 
                                             label="Mobile Number" 
                                             name="mobileNo" 
                                             type="text" 
                                             placeholder="Mobile Number"
                                         />
                                     </div>

                                    {/* NPI Number */}
                                    <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                    <TextField 
                                            label="NPI Number" 
                                            name="npinumber" 
                                            type="text"
                                            placeholder="NPI Number" 
                                        />
                                    </div>

                                     {/* license Number */}
                                     <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                         <TextField 
                                             label="license Number" 
                                             name="licensenumber" 
                                             type="text" 
                                             placeholder="License Number"
                                         />
                                     </div>


                                    </div> {/* row ends here */}

                                    {/* Buttons */}
                                    <div className="row mr-3" style={{ float: 'right'}}>
                                        <button className="reset-btn" type="reset">Reset</button>
                                        <button className="submit-btn ml-3" type="submit">Add Doctor</button>
                                    </div>

                                    <br/><br/>
                            </Form>
                        </div>   
                        )}
                        </Formik>

                        </div>
                    </div>
                </section>
        </Fragment>
    )
}

export default AddNewDoctor
