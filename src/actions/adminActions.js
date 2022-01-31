import axios from 'axios';
import { Prod, Prod01 } from '../constants/ActionType';

import { 
    ALL_PATIENTS_REQUEST, 
    ALL_PATIENTS_SUCCESS, 
    ALL_PATIENTS_FAIL, 
    ALL_DOCTORS_REQUEST,
    ALL_DOCTORS_SUCCESS,
    ALL_DOCTORS_FAIL,
    ADD_DOCTOR_REQUEST,
    ADD_DOCTOR_SUCCESS,
    ADD_DOCTOR_FAIL,
    DOCTOR_PROFILE_REQUEST,
    DOCTOR_PROFILE_SUCCESS,
    DOCTOR_PROFILE_FAIL,
    DOCTOR_PATIENTS_REQUEST,
    DOCTOR_PATIENTS_SUCCESS,
    DOCTOR_PATIENTS_FAIL,
    PATIENT_PROFILE_REQUEST,
    PATIENT_PROFILE_SUCCESS,
    PATIENT_PROFILE_FAIL,
    UPDATE_DOCTOR_REQUEST,
    UPDATE_DOCTOR_SUCCESS,
    UPDATE_DOCTOR_FAIL,
    ASSIGN_PATIENT_TO_DOCTOR_REQUEST,
    ASSIGN_PATIENT_TO_DOCTOR_SUCCESS,
    ASSIGN_PATIENT_TO_DOCTOR_FAIL,
    ASSIGN_DEVICE_TO_PATIENT_REQUEST,
    ASSIGN_DEVICE_TO_PATIENT_SUCCESS,
    ASSIGN_DEVICE_TO_PATIENT_FAIL,
    GET_PATIENT_DEVICE_DATA_REQUEST,
    GET_PATIENT_DEVICE_DATA_SUCCESS,
    GET_PATIENT_DEVICE_DATA_FAIL,
    GET_DEVICES_LIST_REQUEST,
    GET_DEVICES_LIST_SUCCESS,
    GET_DEVICES_LIST_FAIL,
    GET_DEVICE_DETAILS_REQUEST,
    GET_DEVICE_DETAILS_SUCCESS,
    GET_DEVICE_DETAILS_FAIL,
    ADD_RPM_DEVICE_REQUEST,
    ADD_RPM_DEVICE_SUCCESS,
    ADD_RPM_DEVICE_FAIL,
    UPDATE_DEVICE_REQUEST,
    UPDATE_DEVICE_SUCCESS,
    UPDATE_DEVICE_FAIL,
    SORT_DEVICES_BY_BROKEN_REQUEST,
    SORT_DEVICES_BY_BROKEN_SUCCESS,
    SORT_DEVICES_BY_BROKEN_FAIL,
    SORT_DEVICES_REQUEST,
    SORT_DEVICES_SUCCESS,
    SORT_DEVICES_FAIL,
    DELETE_RPM_DEVICE_REQUEST,
    DELETE_RPM_DEVICE_SUCCESS,
    DELETE_RPM_DEVICE_FAIL,
    ADD_PATIENT_REQUEST,
    ADD_PATIENT_SUCCESS,
    ADD_PATIENT_FAIL,
    ALL_HRS_REQUEST,
    ALL_HRS_SUCCESS,
    ALL_HRS_FAIL,
    ADD_HR_REQUEST,
    ADD_HR_SUCCESS,
    ADD_HR_FAIL,
    UPDATE_HR_REQUEST,
    UPDATE_HR_SUCCESS,
    UPDATE_HR_FAIL,
    ASSIGN_DOCTOR_TO_HR_REQUEST,
    ASSIGN_DOCTOR_TO_HR_SUCCESS,
    ASSIGN_DOCTOR_TO_HR_FAIL,
    CLEAR_ERRORS
} from '../constants/adminConstants';

export const getPatients = () => async(dispatch) => {
    try {
        dispatch({
            type: ALL_PATIENTS_REQUEST,
        })
        
        const token = JSON. parse(localStorage.getItem('token'));

        const { data } = await axios.get(`${Prod01}/patient/list`, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        });
        
        dispatch({
            type: ALL_PATIENTS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ALL_PATIENTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updatePatientConsentStatus = (patientId) => async(dispatch) => {
    try {
        // dispatch({
        //     type: UPDATE_PATIENT_REQUEST,
        // })
        
        const token = JSON. parse(localStorage.getItem('token'));

        const { data } = await axios.put(`${Prod01}/patient/edit/${patientId}`, {
            rpmconsent : true
        }, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        });
        
        // dispatch({
        //     type: ALL_PATIENTS_SUCCESS,
        //     payload: data
        // })
        
    } catch (error) {
        // dispatch({
        //     type: ALL_PATIENTS_FAIL,
        //     payload: error.response.data.message
        // })
    }
}

// Get list of all doctors => admin
export const getDoctors = () => async(dispatch) => {

    const token = JSON. parse(localStorage.getItem('token'));

    try {
        dispatch({ type: ALL_DOCTORS_REQUEST })
        
        const token = JSON. parse(localStorage.getItem('token'));

        const { data } = await axios.get(`${Prod01}/doctor/list`, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        });
        
        dispatch({
            type: ALL_DOCTORS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ALL_DOCTORS_FAIL,
            payload: error.response.data.message
        })
    }
}


// Get list of all HRs => admin
export const getHrLists = () => async(dispatch) => {

    const token = JSON. parse(localStorage.getItem('token'));

    try {
        dispatch({ type: ALL_HRS_REQUEST })
        
        const token = JSON. parse(localStorage.getItem('token'));

        const { data } = await axios.get(`${Prod01}/hr/list`, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        });
        
        dispatch({
            type: ALL_HRS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ALL_HRS_FAIL,
            payload: error.response.data.message
        })
    }
}


// Add New HR => admin
export const addHR = (values) => async(dispatch) => {
    try {
        dispatch({ 
            type: ADD_HR_REQUEST
        });

        const token = JSON. parse(localStorage.getItem('token'));

        const {data} = await axios.post(`${Prod01}/hr/signup`, values, {
                headers: {
                "Authorization":`Bearer ${token}`
            }
            });
        
        dispatch({
            type: ADD_HR_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ADD_HR_FAIL,
            payload: error.response.data.message
        })
    }
}





// Get doctor profile => admin
export const doctorProfile = (id) => async(dispatch) => {
    try {
        dispatch({ 
            type: DOCTOR_PROFILE_REQUEST 
        })
        
        const token = JSON. parse(localStorage.getItem('token'));

        const { data } = await axios.get(`${Prod01}/doctor/doctorbyid/${id}`, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        });
        
        dispatch({
            loading: false,
            type: DOCTOR_PROFILE_SUCCESS,
            payload: data 
        })
        
    } catch (error) {
        dispatch({
            type: DOCTOR_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get Doctor Patients
export const getDoctorPatients = (id) => async(dispatch) => {
    try {
        dispatch({ 
            type: DOCTOR_PATIENTS_REQUEST 
        })
        
        const token = JSON. parse(localStorage.getItem('token'));

        const { data } = await axios.get(`${Prod01}/doctor/patientlist/${id}`, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        });
        
        dispatch({
            loading: false,
            type: DOCTOR_PATIENTS_SUCCESS,
            payload: data 
        })
        
    } catch (error) {
        dispatch({
            type: DOCTOR_PATIENTS_FAIL,
            payload: error.response.data.message
        })
    }
}




// Update doctor Profile -> ADMIN
export const updateDoctor = (id, firstName, lastName, email, gender, contactno, phone1, phone2, npi, licenseNumber ) => async(dispatch) => {
    try {
        dispatch({  type: UPDATE_DOCTOR_REQUEST });

        const  { data }  = await axios.put(`${Prod}/v1/admin/doctor`, {
            doctorId: id,
            firstname:firstName,
            lastname:lastName,
            email: email,
            gender: gender,
            contactno: contactno,
            phone1: phone1,
            phone2: phone2,
            npinumber: npi,
            licensenumber: licenseNumber,  
        } );
            
        dispatch({ 
            type: UPDATE_DOCTOR_SUCCESS, 
            payload: data.doctor
        })
    
    } catch (error) {
        dispatch({
            type: UPDATE_DOCTOR_FAIL,
            payload: error.response.data.errMessage
        })
      }
    }


// Get patient profile => admin
export const patientProfile = (id) => async(dispatch) => {
    try {
        dispatch({ 
            type: PATIENT_PROFILE_REQUEST 
        })
        
        const token = JSON. parse(localStorage.getItem('token'));

        const { data } = await axios.get(`${Prod01}/patient/patientprofile/${id}`, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        });
        
        dispatch({
            type: PATIENT_PROFILE_SUCCESS,
            loading: false,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: PATIENT_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Add New Doctor => admin
export const addDoctor = (values) => async(dispatch) => {
    try {
        dispatch({ 
            type: ADD_DOCTOR_REQUEST
        });

        const token = JSON. parse(localStorage.getItem('token'));

        const {data} = await axios.post(`${Prod01}/doctor/signup`, values, {
                headers: {
                "Authorization":`Bearer ${token}`
            }
            });
        
        dispatch({
            type: ADD_DOCTOR_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ADD_DOCTOR_FAIL,
            payload: error.response.data.message
        })
    }
}

export const assignPatientToDoctor = (doctorid, patientid) => async(dispatch) => {
 try {
    dispatch({ 
        type: ASSIGN_PATIENT_TO_DOCTOR_REQUEST
    });

    const token = JSON. parse(localStorage.getItem('token'));

    const { data } = await axios.put(`${Prod01}/patient/edit/${patientid}`, {
        assigned_doctor_id: doctorid
    },{
        headers: {
            "Authorization":`Bearer ${token}`
            }
        });

    dispatch({
        type: ASSIGN_PATIENT_TO_DOCTOR_SUCCESS,
        loading: false,
        payload: data
    })    

 } catch (error) {
    dispatch({
        type: ASSIGN_PATIENT_TO_DOCTOR_FAIL,
        payload: error.response.data.message
    })
 }   
}

export const assignDoctorToHR = (hrId, doctorId) => async(dispatch) => {
    try {
       dispatch({ 
           type: ASSIGN_DOCTOR_TO_HR_REQUEST
       });
   
       const token = JSON. parse(localStorage.getItem('token'));
   
       const { data } = await axios.put(`${Prod01}/hr/edit/${hrId}`, {
           assigned_doctor_id: doctorId
       },{
           headers: {
               "Authorization":`Bearer ${token}`
               }
           });
   
       dispatch({
           type: ASSIGN_DOCTOR_TO_HR_SUCCESS,
           payload: data
       })    
   
    } catch (error) {
       dispatch({
           type: ASSIGN_DOCTOR_TO_HR_FAIL,
           payload: error.response.data.message
       })
    }   
}


export const assignPatientToHR = (hrId, patientId) => async(dispatch) => {
    try {
       dispatch({ 
           type: ASSIGN_DOCTOR_TO_HR_REQUEST
       });
   
       const token = JSON. parse(localStorage.getItem('token'));
   
       const { data } = await axios.put(`${Prod01}/patient/edit/${patientId}`, {
        assigned_hr_id: hrId
       },{
           headers: {
               "Authorization":`Bearer ${token}`
               }
           });
   
       dispatch({
           type: ASSIGN_DOCTOR_TO_HR_SUCCESS,
           payload: data
       })    
   
    } catch (error) {
       dispatch({
           type: ASSIGN_DOCTOR_TO_HR_FAIL,
           payload: error.response.data.message
       })
    }   
}


export const assignDeviceToPatient = (patientid, deviceid) => async(dispatch) => {
    try {
       dispatch({ 
           type: ASSIGN_DEVICE_TO_PATIENT_REQUEST
       });
   
       const { data } = await axios.post(`${Prod}/v1/admin/assignDeviceToPatient`, {
               patientid: patientid,
               deviceid: deviceid
           });
   
       dispatch({
           type: ASSIGN_DEVICE_TO_PATIENT_SUCCESS,
           loading: false,
           payload: data.patient
       })    
   
    } catch (error) {
       dispatch({
           type: ASSIGN_DEVICE_TO_PATIENT_FAIL,
           payload: error.response.data.message
       })
    }   
   }
   

   export const removeAssignedDevice = (deviceid, patientid) => async(dispatch) => {
    try {
       dispatch({ 
           type: ASSIGN_DEVICE_TO_PATIENT_REQUEST
       });
   
       const { data } = await axios.post(`${Prod}/v1/admin/removeDeviceFromPatient`, {
            deviceid: deviceid,      
            patientid: patientid
           });
   
       dispatch({
           type: ASSIGN_DEVICE_TO_PATIENT_SUCCESS,
           loading: false,
           payload: data.patient
       })    
   
    } catch (error) {
       dispatch({
           type: ASSIGN_DEVICE_TO_PATIENT_FAIL,
           payload: error.response.data.message
       })
    }   
   }

   export const getPatientTelemetryData = (patientId) => async(dispatch) => {
    
    try {
       dispatch({ 
           type: GET_PATIENT_DEVICE_DATA_REQUEST
       });
       
       const token = JSON. parse(localStorage.getItem('token'));
       const { data } = await axios.post(`${Prod01}/patient/filterpatienthealthData`, {
               patientId: patientId
           }, {
            headers: {
                "Authorization":`Bearer ${token}`
                }
           });
   
       dispatch({
           type: GET_PATIENT_DEVICE_DATA_SUCCESS,
           payload: data
       })    
   
    } catch (error) {
       dispatch({
           type: GET_PATIENT_DEVICE_DATA_FAIL,
           payload: error.message
       })
    }   
   }

   
   export const insertComment = (deviceid, comment, patientid) => async(dispatch) => {
    
    try {
       dispatch({ 
           type: GET_PATIENT_DEVICE_DATA_REQUEST
       });
       
        await axios.post(`${Prod}/v1/admin/commentdevicedata`, {
               id : deviceid,
               comment: comment
           });
   
        // dispatch(getPatientTelemetryData(patientid))    
   
    } catch (error) {
       dispatch({
           type: GET_PATIENT_DEVICE_DATA_FAIL,
           payload: error.response.data.message
       })
    }   
   }


//    Search Device Data by Date 
   export const getDeviceDataByDate = (deviceId, patientId, searchDate) => async(dispatch) => {
    
    console.log('deviceId is ' + deviceId);
    console.log('patientId is ' + patientId);

    try {
       dispatch({ 
           type: GET_PATIENT_DEVICE_DATA_REQUEST
       });
       
       const { data } = await axios.post(`${Prod}/v1/getdevicedataforpatient`, {
               deviceid: deviceId,
               patientid: patientId,
               date: searchDate
           });
   
       dispatch({
           type: GET_PATIENT_DEVICE_DATA_SUCCESS,
           loading: false,
           payload: data
       })    
   
    } catch (error) {
       dispatch({
           type: GET_PATIENT_DEVICE_DATA_FAIL,
           payload: error.response.data.message
       })
    }   
   }

// Get all devices list
export const getAllDevices = () => async(dispatch) => {
    try {
        dispatch({ type: GET_DEVICES_LIST_REQUEST })
        
        const token = JSON. parse(localStorage.getItem('token'));

        const { data } = await axios.get(`${Prod01}/device/list/50/1`, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        })

        dispatch({
            type: GET_DEVICES_LIST_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: GET_DEVICES_LIST_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get device details => admin
export const getDeviceDetails = (id) => async(dispatch) => {
    try {
        dispatch({ 
            type: GET_DEVICE_DETAILS_REQUEST 
        })
        
        const token = JSON. parse(localStorage.getItem('token'));

        const { data } = await axios.get(`${Prod01}/device/byid/${id}`, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        });
        
        dispatch({
            type: GET_DEVICE_DETAILS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: GET_DEVICE_DETAILS_FAIL,
            payload: error.message
        })
    }
}

// Sort Device By Broken
export const sortRPMDevicesByBroken = () => async(dispatch) => {
    try {
        dispatch({ type: SORT_DEVICES_BY_BROKEN_REQUEST })
        
        const token = JSON. parse(localStorage.getItem('token'));
        
        const { data } = await axios.get(`${Prod01}/device/broken`, { 
            headers: {
                "Authorization":`Bearer ${token}`
            }
        });
        
        dispatch({
            type: SORT_DEVICES_BY_BROKEN_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: SORT_DEVICES_BY_BROKEN_FAIL,
            payload: error.response.data.message
        })
    }
}

// Sort RPM Device by In stock and Out of Stock 
export const sortRPMDevices = (stock) => async(dispatch) => {
    try {
        dispatch({ type: SORT_DEVICES_REQUEST })
        
        const token = JSON. parse(localStorage.getItem('token'));

        const { data } = await axios.post(`${Prod01}/device/liststock`, {
            stock: stock
        },{
            headers: {
                "Authorization":`Bearer ${token}`
            }
        },);
        
        dispatch({
            type: SORT_DEVICES_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: SORT_DEVICES_FAIL,
            payload: error.response.data.message
        })
    }
}




export const addRPMDevice = (values) => async(dispatch) => {
    const { deviceId, imei, modelNumber, deviceType, broken, firmwareVersion, hardwareVersion } = values;
   
    try {
        dispatch({ 
            type: ADD_RPM_DEVICE_REQUEST
        });
        
        const token = JSON. parse(localStorage.getItem('token'));

        const {data} = await axios.post(`${Prod01}/device/add`, values , {
                headers: {
                    "Authorization":`Bearer ${token}`
                }      
            });
        
            dispatch({
                type: ADD_RPM_DEVICE_SUCCESS,
                payload: data
            })
        
    } catch (error) {
        dispatch({
            type: ADD_RPM_DEVICE_FAIL,
            payload: error.message
        })
    }
}

// Add Patient
export const addPatient = (values) => async(dispatch) => {
    // const { deviceId, imei, modelNumber, deviceType, broken, firmwareVersion, hardwareVersion } = values;
   
    try {
        dispatch({ 
            type: ADD_PATIENT_REQUEST
        });
        
        const token = JSON. parse(localStorage.getItem('token'));

        const {data} = await axios.post(`${Prod01}/patient/add`, values , {
                headers: {
                    "Authorization":`Bearer ${token}`
                }      
            });
    

            dispatch({
                type: ADD_PATIENT_SUCCESS,
                payload: data
            })
        
    } catch (error) {
        dispatch({
            type: ADD_PATIENT_FAIL,
            payload: error.message
        })
    }
}


// Update RPM Device
export const updateRPMDevice = (dvcId, dvcimei, dvcModelNumber, dvcType, dvcBroken, dvcFirmwareVersion, dvcHardwareVersion) => async(dispatch) => {
    
    try {
        dispatch({ 
            type: UPDATE_DEVICE_REQUEST
        });
        
        const token = JSON. parse(localStorage.getItem('token'));

        const {data} = await axios.put(`${Prod01}/device/edit/${dvcId}`, {
                imei: dvcimei,
                modelNumber:dvcModelNumber,
                deviceType: dvcType,
                broken: dvcBroken,
                firmwareVersion: dvcFirmwareVersion,
                hardwareVersion:dvcHardwareVersion
        }, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        });
        
        dispatch({
            type: UPDATE_DEVICE_SUCCESS,
            payload: data
        })

        console.log(data);
        
    } catch (error) {
        dispatch({
            type: UPDATE_DEVICE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update HR 
export const updateHR = (id, firstname, lastname, email, gender, DOB, phone1, mobileNo) => async(dispatch) => {
    
    try {
        dispatch({ 
            type: UPDATE_HR_REQUEST
        });
        
        const token = JSON. parse(localStorage.getItem('token'));

        const {data} = await axios.put(`${Prod01}/hr/edit/${id}`, {
                firstname: firstname,
                lastname:lastname,
                email: email,
                gender: gender,
                DOB: DOB,
                phone1:phone1,
                mobileNo: mobileNo
        }, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        });
        
        dispatch({
            type: UPDATE_HR_SUCCESS,
            payload: data
        })

        // console.log(data);
        
    } catch (error) {
        dispatch({
            type: UPDATE_HR_FAIL,
            payload: error.response.data.message
        })
    }
}




// Delete RPM Device 
export const deleteRPMDevice = (id) => async(dispatch) => {
    
    try {
        dispatch({ 
            type: DELETE_RPM_DEVICE_REQUEST
        });

        const token = JSON. parse(localStorage.getItem('token'));
        
    
        await axios.delete(`${Prod01}/device/delete/${id}`, { 
            headers: {
                "Authorization":`Bearer ${token}`
            }
        });
        
        dispatch({
            type: DELETE_RPM_DEVICE_SUCCESS
        })

        
    } catch (error) {
        dispatch({
            type: DELETE_RPM_DEVICE_FAIL,
            payload: error.message
        })
    }
}


// Assign RPM Device To Patient
export const assignRPMDeviceToPatient = (deviceId, patientId) => async(dispatch) => {
    
    try {
        // dispatch({ 
        //     type: UPDATE_DEVICE_REQUEST
        // });

        const token = JSON. parse(localStorage.getItem('token'));

        const data = await axios.put(`${Prod01}/patient/edit/${patientId}`, {
            assigned_devices: [{
                deviceObjectId: deviceId
            }],
        }, {
            headers: {
                "Authorization":`Bearer ${token}`
            } 
        });

        let device;

        if(data.status === 201){
            console.log('Putting PatientId in device');
            device = await axios.put(`${Prod01}/device/edit/${deviceId}`, {
                assigned_patient_id: patientId 
            }, {
                headers: {
                    "Authorization":`Bearer ${token}`
                }  
            })
        } 
        
        // console.log(device);
        // dispatch({
        //     type: UPDATE_DEVICE_SUCCESS,
        //     payload: data
        // })

        
    } catch (error) {
        console.log(error);
        // dispatch({
        //     type: UPDATE_DEVICE_FAIL,
        //     payload: error
        // })
    }
}

// Clear errors
export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}

