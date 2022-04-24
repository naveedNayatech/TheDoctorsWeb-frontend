import React, { useEffect, Fragment, useState } from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import MetaData from '../../layouts/MetaData';
import TopBar from '../../components/AdminDashboard/TopBar';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '../../components/Form/TextField';
import GenderSelectbox from '../../components/Form/GenderSelectbox';
import { addPatient, getDoctors, getHrLists } from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import Select from 'react-select';


const AddPatient = (props) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { message, error } = useSelector(state => state.common);
    const { doctors } = useSelector(state => state.doctor);
    const { hrs } = useSelector(state => state.hrslist);
    const [doctorId, setDoctorId] = useState('')
    const [hrId, setHrId] = useState('')


    useEffect(() => {
        if (error) {
            return alert.error(error);
        }

        dispatch(getDoctors());
        dispatch(getHrLists())

        if (message) {
            alert.success(message);
            props?.history.push('/patients');
        }

    }, [dispatch, error, message]);

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
        DOB: Yup.string().required('DOB is required'),
        phone1: Yup.string(),
        gender: Yup.string().required('Gender is required'),
        zipCode: Yup.string(),
        address: Yup.string(),
        city: Yup.string(),
        state: Yup.string(),
        line2: Yup.string(),
        ssn: Yup.string(),
        insurancecompany: Yup.string(),
        diseases: Yup.string(),
    });

    const submitHandler = (values) => {
        if(doctorId !== '')
        values = {...values,assigned_doctor_id:doctorId}

        if(hrId !== '')
        values = {...values,assigned_hr_id:hrId}


        dispatch(addPatient(values));
    }

    const assignDr =(dr) =>{
        setDoctorId(dr.value)
    }

    const assignHr =(hr) =>{
        setHrId(hr.value)
    }

    const optionsForDoc = []
    doctors && doctors.map((doc, index) => (
        optionsForDoc.push({ value: doc?._id, label: [doc?.firstname, doc?.lastname].join(" ") })
    ))

    const optionsForHr = []
    hrs && hrs.map((hr, index) => (
        optionsForHr.push({ value: hr?._id, label: [hr?.firstname, hr?.lastname].join(" ") })
    ))
    console.log("any")
    return <Fragment>
        <MetaData title="Add Patient" />
        <Sidebar />

        <section className="home-section">
            {/* TopBar */}
            <TopBar />

            <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded" style={{ backgroundColor: '#FAFAFA' }}>
                <div className="home-content">
                    <div className="row-display">
                        <h5 className="pt-2 mt-2">Add <span style={{ color: '#007673' }}>Patient </span></h5>
                        <div className="row-display">
                            <Link to="/patients">
                                <button className="btn btn-primary mt-3">
                                    <i className='bx bx-arrow-back'></i>
                                </button>
                            </Link>
                            &nbsp;&nbsp;
                            <Link to="/adminDashboard">
                                <button className="btn btn-primary mt-3">
                                    <i className='bx bxs-home'></i>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <hr className="blue-hr" />

                    <Formik initialValues={{
                        firstname: '',
                        lastname: '',
                        email: '',
                        DOB: '',
                        gender: ''
                    }}
                        validationSchema={validate}
                        onSubmit={values => {
                            submitHandler(values)
                        }}
                    >
                        {formik => (
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

                                        {/* Insurance Company */}
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            {/* <TextField
                                                label="Assign Doctor"
                                                name="insurancecompany"
                                                type="text"
                                                placeholder="Insurance Company"
                                            /> */}
                                            <label className='mt-2'> <b className="mt-1">Assign Dr</b></label>

                                            <Select
                                                options={optionsForDoc}
                                                onChange={assignDr}
                                            />

                                        </div>

                                        {/* Insurance Company */}
                                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            {/* <TextField
                                                label="Assign Hr"
                                                name="insurancecompany"
                                                type="text"
                                                placeholder="Insurance Company"
                                            /> */}
                                            <label className='mt-2'> <b className="mt-1">Assign Hr</b></label>
                                             <Select
                                                options={optionsForHr}
                                                onChange={assignHr}
                                            />
                                        </div>


                                    </div>{/* row ends here */}

                                    {/* Buttons */}
                                    <br />
                                    <div className="row mr-3" style={{ float: 'right' }}>
                                        <button className="reset-btn" type="reset">Reset</button>
                                        <button className="submit-btn ml-3" type="submit">Add Patient</button>
                                    </div>

                                    <br /><br /><br />
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
