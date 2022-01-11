import axios from 'axios';
import { Prod } from '../constants/ActionType';

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
    CLEAR_ERRORS
} from '../constants/adminConstants';

export const getPatients = () => async(dispatch) => {
    try {
        dispatch({
            type: ALL_PATIENTS_REQUEST,
        })
        
        const { data } = await axios.get(`${Prod}/v1/admin/patientslist`);
        
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

// Get list of all doctors => admin
export const getDoctors = (keyword = '', currentPage = 1) => async(dispatch) => {
    try {
        dispatch({ type: ALL_DOCTORS_REQUEST })
        
        const { data } = await axios.get(`${Prod}/v1/admin/doctorslist?keyword=${keyword}&page=${currentPage}`);
        
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

// Get doctor profile => admin
export const doctorProfile = (id) => async(dispatch) => {
    try {
        dispatch({ 
            type: DOCTOR_PROFILE_REQUEST 
        })
        
        const { data } = await axios.post(`${Prod}/v1/admin/doctor`, {
            doctorId: id
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

// Update doctor Profile -> ADMIN
export const updateDoctor = (id, firstName, lastName, email, gender, contactno, phone1, phone2, npi, licenseNumber ) => async(dispatch) => {
    try {
        dispatch({  type: UPDATE_DOCTOR_REQUEST });
        
        console.log('ID is ' + id);
        console.log('first name is ' + firstName);


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
    console.log('Fetching patient Profile ID is ' + id);
    try {
        dispatch({ 
            type: PATIENT_PROFILE_REQUEST 
        })
        
        const { data } = await axios.post(`${Prod}/v1/admin/patient`, {
            patientid: id
        });
        
        dispatch({
            type: PATIENT_PROFILE_SUCCESS,
            loading: false,
            payload: data.patient
        })
        
    } catch (error) {
        dispatch({
            type: PATIENT_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Add New Doctor => admin
export const addDoctor = (firstName, lastName, email, gender, contactno, phone1, phone2, npi, licenseNumber, avatar, specialization) => async(dispatch) => {
    try {
        
        dispatch({ 
            type: ADD_DOCTOR_REQUEST
        });

            const {data} = await axios.post(`${Prod}/v1/admin/registerdoctor`, {
            title:'Dr.', 
            firstname:firstName, 
            lastname:lastName, 
            email:email, 
            gender:gender,
            password:'Asd@16566',
            contactno:contactno, 
            phone1:phone1,  
            phone2:phone2, 
            npinumber:npi, 
            licensenumber:licenseNumber, 
            "role":"Doctor", 
            avatar: avatar,
            specialization: [{
                fieldname: specialization
            }]
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

    const { data } = await axios.put(`${Prod}/v1/admin/patient`, {
            id: patientid,
            doctorId: doctorid
        });

    dispatch({
        type: ASSIGN_PATIENT_TO_DOCTOR_SUCCESS,
        loading: false,
        payload: data.patient
    })    

 } catch (error) {
    dispatch({
        type: ASSIGN_PATIENT_TO_DOCTOR_FAIL,
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

   export const getPatientTelemetryData = (patientId, sort) => async(dispatch) => {
    
    try {
       dispatch({ 
           type: GET_PATIENT_DEVICE_DATA_REQUEST
       });
       
       const { data } = await axios.post(`${Prod}/v1/devicedata`, {
               patientId: patientId,
               sort
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
        
        const { data } = await axios.get(`${Prod}/v1/devices`);
        
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
        
        const { data } = await axios.post(`${Prod}/v1/device`, {
            deviceId: id
        });
        
        dispatch({
            type: GET_DEVICE_DETAILS_SUCCESS,
            loading: false,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: GET_DEVICE_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const addRPMDevice = (deviceId, imei, modelNumber, status, signal, battery, modemVersion, firmwareVersion, manufecture, connectionStatus, hardwareVersion, user, iccid, imsi, lastActivated) => async(dispatch) => {
    try {
        
        dispatch({ 
            type: ADD_RPM_DEVICE_REQUEST
        });

            const {data} = await axios.post(`${Prod}/v1/device/add`, {
                deviceId: deviceId,
                imei: imei,
                modelNumber:modelNumber,
                status: status,
                lastActive: lastActivated,
                signal: signal,
                battery:battery,
                modemVersion:modemVersion,
                firmwareVersion:firmwareVersion,
                manufecture:manufecture,
                connectionStatus:connectionStatus,
                hardwareVersion:hardwareVersion,
                User:user,
                iccid:iccid,
                imsi:imsi
        });
        
        dispatch({
            type: ADD_RPM_DEVICE_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ADD_RPM_DEVICE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear errors
export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}

