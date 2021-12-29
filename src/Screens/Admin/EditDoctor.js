import React, { useEffect, useState, Fragment } from 'react';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader';
import Sidebar from '../../components/AdminDashboard/Sidebar';
import TopBar from '../../components/AdminDashboard/TopBar';
import { doctorProfile, updateDoctor, clearErrors } from '../../actions/adminActions';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { UPDATE_DOCTOR_RESET } from '../../constants/adminConstants';

const EditDoctor = (props) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    let id = props?.location?.state?.id;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState(); 
    const [contactno, setContactno] = useState('');
    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    const [npi, setNpi] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    
    const { error, doctor} = useSelector(state => state.doctorProfile);
    const { loading, error: updateError, isUpdated } = useSelector(state => state.doctor);


    useEffect(() => {
        if(doctor && doctor._id !== id){ 
            dispatch(doctorProfile(id))
        } else {       
            setFirstName(doctor?.firstname);
            setLastName(doctor?.lastname);
            setEmail(doctor?.email);
            setGender(doctor?.gender);
            setContactno(doctor?.contactno);
            setPhone1(doctor?.phone1);
            setPhone2(doctor?.phone2);
            setNpi(doctor?.npinumber);
            setLicenseNumber(doctor?.licensenumber);
        }

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(updateError){
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if(isUpdated === true){
            props?.history.push('/doctors');
               alert.success('Doctor Updated');
            dispatch({
                type: UPDATE_DOCTOR_RESET 
            });
        }
            
    }, [dispatch, alert, error, doctor, id, updateError, isUpdated]);


    const editHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('firstName', firstName);
        formData.set('lastName', lastName);
        formData.set('email', email);
        formData.set('gender', gender);
        formData.set('contactno', contactno);
        formData.set('phone1', phone1);
        formData.set('phone2', phone2);
        formData.set('npinumber', npi);
        formData.set('licenseNumber', licenseNumber);

        dispatch(updateDoctor(id, firstName, lastName, email, gender, contactno, phone1, phone2, npi, licenseNumber));
    }


    return (
        <Fragment>
            <MetaData title="Edit Doctor"/>
                <Sidebar />    

                <section className="home-section">
                {/* TopBar */}
                <TopBar />

                {loading ? <Loader /> : <Fragment>
                <div className="shadow-lg p-3 mb-5 mr-4 ml-4 rounded">
                    <div className="home-content">
                        <h4 className="pt-2 mt-2">Edit Doctor</h4>
                        <hr />

                        
                            <form onSubmit={editHandler}>
                            <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="firstName"><i className='bx bx-user label-icons'></i> First Name</label>
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                autoComplete="off" 
                                                placeholder="First Name"
                                                required
                                                value={firstName}		
                                                onChange={(e) => setFirstName(e.target.value)}
                                                />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="lastName"><i className='bx bx-user label-icons'></i> Last Name</label>
                                                <input 
                                                type="text" 
                                                className="form-control" 
                                                autoComplete="off" 
                                                placeholder="Last Name"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-group">
                                                <label htmlFor="gender"><i className='bx bx-male label-icons'></i> Gender</label>
                                                <select 
                                                    className="form-control"
                                                    defaultValue={gender} 
                                                    value={gender}
                                                    onChange={(e) => setGender(e.target.value)}
                                                    >
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                        </div>
                                    </div>


                                    <div className="col-md-4">
                                    <div className="form-group">
                                            <label htmlFor="email"><i className='bx bx-envelope label-icons'></i> Email Address</label>
                                                <input 
                                                type="email" 
                                                className="form-control" 
                                                autoComplete="off" 
                                                placeholder="Email Address"
                                                required
                                                value={email}		
                                                onChange={(e) => setEmail(e.target.value)}
                                                />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="contactno"><i className='bx bx-phone label-icons'></i> Contact No (Primary)</label>
                                                <input 
                                                type="number" 
                                                className="form-control" 
                                                autoComplete="off" 
                                                placeholder="Contact No"
                                                required
                                                value={contactno}		
                                                onChange={(e) => setContactno(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="phone1"><i className='bx bx-phone label-icons'></i> Contact No (Primary). </label>
                                                <input 
                                                type="number" 
                                                className="form-control" 
                                                autoComplete="off" 
                                                placeholder="Fax Number"
                                                value={phone1}		
                                                onChange={(e) => setPhone1(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="phone2"><i className='bx bx-phone label-icons'></i> Phone No (Secondary)</label>
                                                <input 
                                                type="number" 
                                                className="form-control" 
                                                autoComplete="off" 
                                                placeholder="Phone 2"
                                                value={phone2}		
                                                onChange={(e) => setPhone2(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="licensenumber"><i className='bx bx-id-card label-icons'></i> License Number</label>
                                                <input 
                                                type="number" 
                                                className="form-control" 
                                                autoComplete="off" 
                                                placeholder="License NUmber"
                                                required
                                                value={licenseNumber}		
                                                onChange={(e) => setLicenseNumber(e.target.value)}
                                                />
                                        </div>
                                    </div>
                               </div>

                            <hr />
                            <button className="btn login-btn-class" type="submit"> 
                                Update
                            </button>
                            <br />
                            <br />
                            <br />

                        </form>
                        
                    </div>
                </div>
                </Fragment> }


                </section>
        </Fragment>
    )
}

export default EditDoctor
