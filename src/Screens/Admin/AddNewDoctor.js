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
import defaultDoctorImg from '../../assets/Images/default.jpg';

const AddNewDoctor = ({ history }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, success} = useSelector(state => state.newDoctor);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male'); 
    const [contactno, setContactno] = useState('');
    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    const [npi, setNpi] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [specialization, setSpecialization] = useState();
    const [avatar, setAvatar] = useState('https://th.bing.com/th/id/OIP.Ghae4OEdb4UmC3hkqpFvLAHaGd?pid=ImgDet&rs=1');
    const [avatarPreview, setAvatarPreview] = useState('https://th.bing.com/th/id/OIP.Ghae4OEdb4UmC3hkqpFvLAHaGd?pid=ImgDet&rs=1');

  const  handleOnchange  =  val  => {
    setSpecialization(val)
  }

  const  options  = [
    { label:  'MBBS', value:  'MBBS'  },
    { label:  'FCPS', value:  'FCPS'  },
    { label:  'HMS', value:  'HMS'  },
    { label:  'Dermatologists', value:  'Dermatologist'  },
    { label:  'Ophthalmologists', value:  'Ophthalmologists'  },
  ]

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


    const submitHandler = (e) => {
        e.preventDefault(); 
		dispatch(addDoctor(firstName, lastName, email, gender, contactno, phone1, phone2, npi, licenseNumber, avatar, specialization));
    }

    const onImageChange = e => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        }
            reader.readAsDataURL(e.target.files[0]);    
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
                        <h5 className="pt-2 mt-2">Add Doctor</h5>
                        <hr />

                        <form onSubmit={submitHandler} encType='multipart/form-data'>

                            <div className="col-md-12">
                            <div style={{textAlign: 'center'}}>
                                <div>
                                    <figure>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>


                                <div className='custom-file col-md-3 m-2'>
                                        <input
                                            type='file'
                                            name='avatar'
                                            className='custom-file-input'
                                            id='customFile'
                                            accept='image/*'
                                            onChange={onImageChange}
                                        />
                                        <label className='custom-file-label' style={{textAlign: 'left'}} htmlFor='customFile'>
                                            Choose Avatar ...
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <br/>


                            <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="firstname"><i className='bx bx-user label-icons'></i> First Name</label>
                                                <input 
                                                type="text" 
                                                name="firstname" 
                                                className="form-control" 
                                                autoComplete="off" 
                                                placeholder="First Name"
                                                required
                                                value={firstName}		
                                                onChange={(e) => setFirstName(e.target.value)}
                                                />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email"><i className='bx bx-envelope label-icons'></i> Email Address</label>
                                                <input 
                                                type="email" 
                                                name="email" 
                                                className="form-control" 
                                                autoComplete="off" 
                                                placeholder="Email Address"
                                                required
                                                value={email}		
                                                onChange={(e) => setEmail(e.target.value)}
                                                />
                                        </div>

                                        <div className="form-group">
                                                <label><i className='bx bx-cog label-icons'></i> Specialization</label>
                                                <div>
                                                    <span>{specialization}</span>
                                                </div>

                                                <MultiSelect
                                                    onChange={handleOnchange}
                                                    style={{width: '100%', backgroundColor: '#FFF'}}
                                                    options={options}
                                                />
                                        </div>

                                        <div className="form-group">
                                        <label htmlFor="phone1"><i className='bx bx-phone label-icons'></i> Phone 1</label>
                                                <input 
                                                type="number" 
                                                name="phone1" 
                                                className="form-control" 
                                                autoComplete="off" 
                                                placeholder="Phone 1"
                                                value={phone1}		
                                                onChange={(e) => setPhone1(e.target.value)}
                                                />
                                        </div>

                                        <div className="form-group">
                                        <label htmlFor="npi"><i className='bx bx-id-card label-icons'></i> NPI Number</label>
                                                <input 
                                                type="number" 
                                                name="npi" 
                                                className="form-control" 
                                                autoComplete="off" 
                                                placeholder="NPI NUmber"
                                                required
                                                value={npi}		
                                                onChange={(e) => setNpi(e.target.value)}
                                                />
                                        </div>
                                        
                                    </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="lastname"><i className='bx bx-user label-icons'></i> Last Name</label>
                                            <input 
                                            type="text" 
                                            name="lastname" 
                                            className="form-control" 
                                            autoComplete="off" 
                                            placeholder="Last Name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            />
                                    </div>

                                        <div className="form-group">
                                                <label htmlFor="gender"><i className='bx bx-male label-icons'></i> Gender</label>
                                                <select 
                                                    name="gender" 
                                                    className="form-control" 
                                                    value={gender} 
                                                    onChange={(e) => setGender(e.target.value)}
                                                    >
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                        </div>

                                        <div className="form-group">
                                        <label htmlFor="contactno"><i className='bx bx-phone label-icons'></i> Contact No</label>
                                                <input 
                                                type="number" 
                                                name="contactno" 
                                                className="form-control" 
                                                autoComplete="off" 
                                                placeholder="Contact No"
                                                required
                                                value={contactno}		
                                                onChange={(e) => setContactno(e.target.value)}
                                                />
                                        </div>

                                        <div className="form-group">
                                        <label htmlFor="phone2"><i className='bx bx-phone label-icons'></i> Phone 2</label>
                                                <input 
                                                type="number" 
                                                name="phone2" 
                                                className="form-control" 
                                                autoComplete="off" 
                                                placeholder="Phone 2"
                                                value={phone2}		
                                                onChange={(e) => setPhone2(e.target.value)}
                                                />
                                        </div>

                                        <div className="form-group">
                                        <label htmlFor="licensenumber"><i className='bx bx-id-card label-icons'></i> License Number</label>
                                                <input 
                                                type="number" 
                                                name="licensenumber" 
                                                className="form-control" 
                                                autoComplete="off" 
                                                placeholder="License NUmber"
                                                required
                                                value={licenseNumber}		
                                                onChange={(e) => setLicenseNumber(e.target.value)}
                                                />
                                        </div>

                                        <button className="btn login-btn-class" type="submit"> 
                                            Save
                                        </button>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
        </Fragment>
    )
}

export default AddNewDoctor
