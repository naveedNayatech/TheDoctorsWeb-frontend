import axios from 'axios';
import { Prod, Prod01 } from '../constants/ActionType';
const moment = require('moment-timezone');

import { 
    ALL_PATIENTS_REQUEST, 
    ALL_PATIENTS_SUCCESS, 
    ALL_PATIENTS_FAIL, 
    ALL_DOCTORS_REQUEST,
    ALL_DOCTORS_SUCCESS,
    ALL_DOCTORS_FAIL,
    DOCTOR_PROFILE_REQUEST,
    DOCTOR_PROFILE_SUCCESS,
    DOCTOR_PROFILE_FAIL,
    DOCTOR_PATIENTS_REQUEST,
    DOCTOR_PATIENTS_SUCCESS,
    DOCTOR_PATIENTS_FAIL,
    PATIENT_PROFILE_REQUEST,
    PATIENT_PROFILE_SUCCESS,
    PATIENT_PROFILE_FAIL,
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
    SORT_DEVICES_BY_BROKEN_REQUEST,
    SORT_DEVICES_BY_BROKEN_SUCCESS,
    SORT_DEVICES_BY_BROKEN_FAIL,
    SORT_DEVICES_REQUEST,
    SORT_DEVICES_SUCCESS,
    SORT_DEVICES_FAIL,
    ALL_HRS_REQUEST,
    ALL_HRS_SUCCESS,
    ALL_HRS_FAIL,
    ASSIGN_DOCTOR_TO_HR_REQUEST,
    ASSIGN_DOCTOR_TO_HR_SUCCESS,
    ASSIGN_DOCTOR_TO_HR_FAIL,
    ADMIN_STATS_SUCCESS,
    ADMIN_STATS_FAIL,
    INVENTORY_STATS_SUCCESS,
    INVENTORY_STATS_FAIL,
    UPDATE_PATIENT_REQUEST,
    UPDATE_PATIENT_SUCCESS,
    UPDATE_PATIENT_FAIL,
    GET_ADMIN_NOTIFICATIONS_REQUEST,
    GET_ADMIN_NOTIFICATIONS_SUCCESS,
    GET_ADMIN_NOTIFICATIONS_FAIL,
    GET_PATIENT_REMAINING_READINGS,
    GET_LOGS_REQUEST,
    GET_LOGS_SUCCESS,
    GET_LOGS_FAIL,
    HR_PROFILE_SUCCESS,
    HR_PROFILE_FAIL,
    CLEAR_ERRORS
} from '../constants/adminConstants';

import { 
    FETCH_START,
    SHOW_ALERT_MESSAGE,
    HIDE_ALERT_MESSAGE,
    FETCH_ERROR
} from '../constants/Common';

let token = JSON. parse(localStorage.getItem('token'));

export const getPatients = (resPerPage, currentPage) => async(dispatch) => {
    try {
        dispatch({
            type: ALL_PATIENTS_REQUEST,
        })
    
        const { data } = await axios.get(`${Prod01}/patient/list/${resPerPage}/${currentPage}`, {
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

// Get Doctor's Patient List
export const getDoctorsPatientList = (docId) => async(dispatch) => {
    try {
        dispatch({
            type: ALL_PATIENTS_REQUEST,
        })

        const { data } = await axios.post(`${Prod01}/doctor/patientlist/${docId}`, {
            name: 'Hammad'
        },{
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

export const getHrsPatientList = (hrId) => async(dispatch) => {
    try {
        dispatch({
            type: ALL_PATIENTS_REQUEST,
        })
        
        const { data } = await axios.post(`${Prod01}/hr/patientlist/${hrId}`,{
            name: 'Hammad'
        }, {
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

// Search Patient By Name
export const searchPatient = (searchBy, keyword) => async(dispatch) => {
    try {
        dispatch({
            type: ALL_PATIENTS_REQUEST,
        })

        const { data } = await axios.post(`${Prod01}/patient/search`,{
            key: searchBy,
            value:keyword
        }, {
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


export const updatePatient = (_id, pFirstName, pLastName, pEmail, pDOB, pGender, pPhone1, pAddress, pCity, pLine2, pState, pSSN, pDiseases, pInsurance) => async(dispatch) => {
    try {
        dispatch({
            type: UPDATE_PATIENT_REQUEST,
        })

        const { data } = await axios.put(`${Prod01}/patient/edit/${_id}`,{
            firstname: pFirstName,
            lastname: pLastName,
            email: pEmail,
            DOB: pDOB,
            gender: pGender,
            phone1: pPhone1,
            address: pAddress,
            city: pCity,
            line2: pLine2,
            state: pState,
            ssn: pSSN,
            diseases: pDiseases,
            insurancecompany: pInsurance
        }, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        });
        
        dispatch({
            type: UPDATE_PATIENT_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: UPDATE_PATIENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const patientDeActivate = (_id) => async(dispatch) => {
    try {
        dispatch({
            type: UPDATE_PATIENT_REQUEST,
        })

        const { data } = await axios.post(`${Prod01}/patient/block/${_id}`,{
            block: true
        }, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        });
        
        dispatch({
            type: UPDATE_PATIENT_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: UPDATE_PATIENT_FAIL,
            payload: error.response.data.message
        })
    }
}


export const patientActivate = (_id) => async(dispatch) => {
    try {
        dispatch({
            type: UPDATE_PATIENT_REQUEST,
        })

        const { data } = await axios.post(`${Prod01}/patient/block/${_id}`,{
            block: false
        }, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        });
        
        dispatch({
            type: UPDATE_PATIENT_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: UPDATE_PATIENT_FAIL,
            payload: error.response.data.message
        })
    }
}


export const doctorDeActivate = (_id) => async(dispatch) => {
    try {   
        dispatch({
            type: FETCH_START
        })

        await axios.put(`${Prod01}/doctor/edit/${_id}`,{
            block: true
        }, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        });

        dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: "Doctor Account De-activated"
            });
        
        dispatch({
            type: HIDE_ALERT_MESSAGE
        })
        
        
        
    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: 'Unable to update doctor'
          })
        dispatch({
            type: HIDE_ALERT_MESSAGE
          })
    }
}


export const doctorActivate = (_id) => async(dispatch) => {
    try {  
        dispatch({
            type: FETCH_START
        })

       await axios.put(`${Prod01}/doctor/edit/${_id}`,{
            block: false
        }, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        });
        
        dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: "Doctor account activated"
            });
        
        dispatch({
            type: HIDE_ALERT_MESSAGE
        })
        
    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: 'Unable to update doctor'
          })
        dispatch({
            type: HIDE_ALERT_MESSAGE
          })
    }
}


export const updatePatientConsentStatus = (patientId, value) => async(dispatch) => {
    try {
        dispatch({
            type: FETCH_START
        })

        const { data } = await axios.put(`${Prod01}/patient/edit/${patientId}`, {
            rpmconsent : value
        }, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        });
        
        dispatch(getPatients(10, 1));
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
export const getDoctors = (resPerPage, currentPage) => async(dispatch) => {
    try {
        dispatch({ type: ALL_DOCTORS_REQUEST })

        const { data } = await axios.get(`${Prod01}/doctor/list/${resPerPage}/${currentPage}`, {
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

// Search Doctors by Admin

export const searchDoctor = (value) => async(dispatch) => {
    try {
        dispatch({ type: ALL_DOCTORS_REQUEST })

        const { data } = await axios.post(`${Prod01}/doctor/search`,{
            search: value
        }, {
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
    try {
        dispatch({ type: ALL_HRS_REQUEST })

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
        await axios.post(`${Prod01}/hr/signup`, values, {
                headers: {
                "Authorization":`Bearer ${token}`
            }
            });
        
        dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: "New HR Added"
            });
        
        dispatch({
            type: HIDE_ALERT_MESSAGE
        })
        
    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: 'Unable to add a new hr'
          })
        dispatch({
            type: HIDE_ALERT_MESSAGE
          })
    }
}


// Get doctor profile => admin
export const doctorProfile = (id) => async(dispatch) => {
    try {
        dispatch({ 
            type: DOCTOR_PROFILE_REQUEST 
        })

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

export const getHrProfile = (id) => async(dispatch) => {
    try {
        const { data } = await axios.get(`${Prod01}/hr/hrbyid/${id}`, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        });
        
        dispatch({
            loading: false,
            type: HR_PROFILE_SUCCESS,
            payload: data 
        })
        
    } catch (error) {
        dispatch({
            type: HR_PROFILE_FAIL,
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

        const { data } = await axios.post(`${Prod01}/doctor/patientlist/${id}`, {
            name: 'Hammad'
        },{
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

export const removePatientsDoctor = (patientId, doctorId) => async(dispatch) => {
    try {
        await axios.post(`${Prod01}/patient/unsetHrDr`,{
            patientId: patientId,
            drId: true
        }, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        });

        dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: "Patient removed from Doctor"
            });
        
        dispatch({
            type: HIDE_ALERT_MESSAGE
        })
           
        dispatch(getDoctorPatients(doctorId))
        
    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: 'cannot remove patient'
          })
          dispatch({
            type: HIDE_ALERT_MESSAGE
          })
    }
}

export const removePatientsHR = (patientId) => async(dispatch) => {
    try {
        const res = await axios.post(`${Prod01}/patient/unsetHrDr`,{
            patientId: patientId,
            hrId: true
        }, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        });

        if(res){
            dispatch({
                type: SHOW_ALERT_MESSAGE,
                payload: "Patient removed from hr"
              });
            
            dispatch({
                type: HIDE_ALERT_MESSAGE
            })
           }
        
    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: 'cannot remove patient'
          })
          dispatch({
            type: HIDE_ALERT_MESSAGE
          })
    }
}

export const removeDoctorFromHR = (hrId) => async(dispatch) => {
    try {
        const res = await axios.post(`${Prod01}/hr/removeDr`,{
            hrId: hrId
        }, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        });

        if(res){
            dispatch({
                type: SHOW_ALERT_MESSAGE,
                payload: "Doctor removed from hr"
              });
            
            dispatch({
                type: HIDE_ALERT_MESSAGE
            })
           }
        
    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: 'cannot remove doctor'
          })
          dispatch({
            type: HIDE_ALERT_MESSAGE
          })
    }
}



// Update doctor Profile -> ADMIN
export const updateDoctor = (_id, docfirstname, doclastname, docDOB, docemail, docgender, docphone1, docmobileno, docnpi, doclicenseNumber) => async(dispatch) => {
    try {
        await axios.put(`${Prod}/doctor/edit/${_id}`, {
            firstname: docfirstname,
            lastname: doclastname,
            DOB: docDOB,
            email: docemail,
            gender: docgender,
            phone1: docphone1,
            mobileNo: docmobileno,
            npi: docnpi,
            licensenumber: doclicenseNumber
        }, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        } );

        dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: "Doctor information Updated"
            });
        
        dispatch({
            type: HIDE_ALERT_MESSAGE
        })
            
    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: 'Unable to update a doctor'
          })
        dispatch({
            type: HIDE_ALERT_MESSAGE
          })
      }
    }


// Get patient profile => admin
export const patientProfile = (id) => async(dispatch) => {
    try {
        dispatch({ 
            type: PATIENT_PROFILE_REQUEST 
        })

        const { data }= await axios.get(`${Prod01}/patient/patientprofile/${id}`, {
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
        await axios.post(`${Prod01}/doctor/signup`, values, {
                headers: {
                "Authorization":`Bearer ${token}`
            }
        });

        dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: "New Doctor Added"
            });
        
        dispatch({
            type: HIDE_ALERT_MESSAGE
        })
        
    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: 'Unable to add a new doctor'
          })
        dispatch({
            type: HIDE_ALERT_MESSAGE
          })
    }
}

export const assignPatientToDoctor = (doctorid, patientid) => async(dispatch) => {
 try {
    dispatch({ 
        type: FETCH_START
    });

    await axios.put(`${Prod01}/patient/edit/${patientid}`, {
        assigned_doctor_id: doctorid
    },{
        headers: {
            "Authorization":`Bearer ${token}`
            }
    });

    dispatch({
		type: SHOW_ALERT_MESSAGE,
		payload: "Patient assigned to doctor"
		});
	
	dispatch({
		type: HIDE_ALERT_MESSAGE
	})

    
 } catch (error) {
    dispatch({
		type: FETCH_ERROR,
		payload: 'Cannot assign patient.'
	  })
	dispatch({
		type: HIDE_ALERT_MESSAGE
	  })
 }   
}

export const assignDoctorToHR = (hrId, doctorId) => async(dispatch) => {
    try {
       dispatch({ 
           type: ASSIGN_DOCTOR_TO_HR_REQUEST
       });
   
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
   

   export const removeAssignedDevice = (device, patientid) => async(dispatch) => {
    try {
        const data = await axios.post(`${Prod01}/patient/addremovedevice/${patientid}`, {
            "assignDevice":false,
            "device_id":device._id,
            "deviceId":device.deviceObjectId?._id
        }, {
            headers: {
                "Authorization":`Bearer ${token}`
            } 
        });

        let deviceUpdate;

        deviceUpdate = await axios.put(`${Prod01}/device/edit/${device?.deviceObjectId?._id}`, {
            assigned_patient_id: null 
        }, {
            headers: {
                "Authorization":`Bearer ${token}`
            }  
        })
        
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

   export const getPatientTelemetryData = (patientId, recordsPerPage, currentPage, sort) => async(dispatch) => {
    
    try {
       dispatch({ 
           type: GET_PATIENT_DEVICE_DATA_REQUEST
       });
       
       const { data } = await axios.post(`${Prod01}/patient/filterpatienthealthData/${recordsPerPage}/${currentPage}`, {
               patientId: patientId,
               createdAt: sort
           }, {
            headers: {
                "Authorization":`Bearer ${token}`
                }
           });
   
       dispatch({
           type: GET_PATIENT_DEVICE_DATA_SUCCESS,
           payload: data.healthData,
           count: data.Count
       })    
   
    } catch (error) {
       dispatch({
           type: GET_PATIENT_DEVICE_DATA_FAIL,
           payload: error.message
       })
    }   
}

export const sortTelemetartData = (patientId, startDate, endDate) => async(dispatch) => {    
    try {
       dispatch({ 
           type: GET_PATIENT_DEVICE_DATA_REQUEST
       });
       
       const { data } = await axios.post(`${Prod01}/patient/filterpatienthealthData/100/1`, {
                patientId: patientId,
                startDate: startDate,
                endDate: endDate,
           }, {
            headers: {
                "Authorization":`Bearer ${token}`
                }
           });
   
       dispatch({
           type: GET_PATIENT_DEVICE_DATA_SUCCESS,
           payload: data.healthData,
           count: data.Count
       })    
   
    } catch (error) {
       dispatch({
           type: GET_PATIENT_DEVICE_DATA_FAIL,
           payload: error.message
       })
    }   
}

export const getRemainingReadings = (id) => async(dispatch) => {
    try{
    const {data} =  await axios.get(`${Prod01}/patient/getReadingCount/${id}`, {
            headers: {
                "Authorization":`Bearer ${token}`
                }
           });
    
    dispatch({
        type: GET_PATIENT_REMAINING_READINGS,
        payload: data
    })  
    

    } catch(error) {
        dispatch({
            payload: error.message
        })
    }
}

   export const insertComment = (deviceid, comment) => async(dispatch) => {
    try {
       dispatch({ 
           type: GET_PATIENT_DEVICE_DATA_REQUEST
       });
       
        await axios.post(`${Prod}/v1/admin/commentdevicedata`, {
               id : deviceid,
               comment: comment
           });
       
   
    } catch (error) {
       dispatch({
           type: GET_PATIENT_DEVICE_DATA_FAIL,
           payload: error.response.data.message
       })
    }   
   }


//    Search Device Data by Date 
   export const getDeviceDataByDate = (deviceId, patientId, searchDate) => async(dispatch) => {
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
export const getAllDevices = (resperpage, currentpage) => async(dispatch) => {
    try {
        dispatch({ type: GET_DEVICES_LIST_REQUEST })

        const { data } = await axios.get(`${Prod01}/device/list/${resperpage}/${currentpage}`, {
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

// Get All Logs
export const getAllLogs = () => async(dispatch) => {
    try {
        dispatch({ type: GET_LOGS_REQUEST })

        const { data } = await axios.get(`${Prod01}/admin/logs`, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        })

        dispatch({
            type: GET_LOGS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: GET_LOGS_FAIL,
            payload: error.response.data.message
        })
    }
}



// Get Admin Stats 
export const getAdminStats = () => async(dispatch) => {
    try {
        const { data } = await axios.get(`${Prod01}/admin/stats`, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        })

        dispatch({
            type: ADMIN_STATS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: ADMIN_STATS_FAIL,
            payload: error.message
        })
    }
}

export const getInventoryStats = () => async(dispatch) => {
    try {
        const { data } = await axios.get(`${Prod01}/device/stats`, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        })

        dispatch({
            type: INVENTORY_STATS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: INVENTORY_STATS_FAIL,
            payload: error.message
        })
    }
}

// Get device details => admin
export const getDeviceDetails = (id) => async(dispatch) => {
    try {
        dispatch({ 
            type: GET_DEVICE_DETAILS_REQUEST 
        })

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

// Search RPM Devices
export const searchRPMDevices = (searchBy, search) => async(dispatch) => {
    try {
        dispatch({ type: SORT_DEVICES_REQUEST })

        const { data } = await axios.post(`${Prod01}/device/search`, {
            key: searchBy,
            value: search
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
    try { 
        await axios.post(`${Prod01}/device/add`, values , {
                headers: {
                    "Authorization":`Bearer ${token}`
                }      
            });

            dispatch({
                type: SHOW_ALERT_MESSAGE,
                payload: "New Device Added"
                });
            
            dispatch({
                type: HIDE_ALERT_MESSAGE
            })
        
    } catch (error) {

        dispatch({
            type: FETCH_ERROR,
            payload: 'Unable to add a new device'
          })
        dispatch({
            type: HIDE_ALERT_MESSAGE
          })
    }
}

// Add Patient
export const addPatient = (values) => async(dispatch) => {
    try {
        dispatch({ 
            type: FETCH_START
        });

      await axios.post(`${Prod01}/patient/add`, values , {
            headers: {
                "Authorization":`Bearer ${token}`
            }      
        });
    

        dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: "New Patient Added"
            });
        
        dispatch({
            type: HIDE_ALERT_MESSAGE
        })
        
    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: 'Unable to add a new patient'
          })
        dispatch({
            type: HIDE_ALERT_MESSAGE
          })
    }
}


// Update RPM Device
export const updateRPMDevice = (dvcId, dvcimei, dvcModelNumber, dvcType, dvcBroken, dvcFirmwareVersion, dvcHardwareVersion) => async(dispatch) => {
    
    try {
        dispatch({ 
            type: FETCH_START
        });

        await axios.put(`${Prod01}/device/edit/${dvcId}`, {
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
            type: SHOW_ALERT_MESSAGE,
            payload: "Device Updated"
            });
        
        dispatch({
            type: HIDE_ALERT_MESSAGE
        })
        
                
    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: 'Unable to update a device'
          })
        dispatch({
            type: HIDE_ALERT_MESSAGE
          })
    }
}

// Update HR 
export const updateHR = (id, firstname, lastname, email, gender, DOB, phone1, mobileNo) => async(dispatch) => {
    
    try {  

       await axios.put(`${Prod01}/hr/edit/${id}`, {
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
            type: SHOW_ALERT_MESSAGE,
            payload: "HR Information updated"
            });
        
        dispatch({
            type: HIDE_ALERT_MESSAGE
        })
        
    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: 'Unable to update hr'
          })
        dispatch({
            type: HIDE_ALERT_MESSAGE
          })
    }
}

export const HRDeactivate = (_id) => async(dispatch) => {
    try {
        await axios.put(`${Prod01}/hr/edit/${_id}`, {
                block: true
        }, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        });
        
        dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: "HR Account De-activated"
            });
        
        dispatch({
            type: HIDE_ALERT_MESSAGE
        })
        
    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: 'Unable to update hr'
          })
        dispatch({
            type: HIDE_ALERT_MESSAGE
          })
    }
}


export const HRActivate = (_id) => async(dispatch) => {
    try { 
        await axios.put(`${Prod01}/hr/edit/${_id}`, {
                loginAttemps: 0,
                block: false
        }, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        });
        
        dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: "HR Account activated"
            });
        
        dispatch({
            type: HIDE_ALERT_MESSAGE
        })
        
    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: 'Unable to update hr'
          })
        dispatch({
            type: HIDE_ALERT_MESSAGE
          })
    }
}

// Delete RPM Device 
export const deleteRPMDevice = (id) => async(dispatch) => {
    try {
        dispatch({ 
            type: FETCH_START
        });
        
        await axios.delete(`${Prod01}/device/delete/${id}`, { 
            headers: {
                "Authorization":`Bearer ${token}`
            }
        });
        
        dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: "Device Deleted"
            });
        
        dispatch({
            type: HIDE_ALERT_MESSAGE
        })

        
    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: 'Unable to delete a device'
          })
        dispatch({
            type: HIDE_ALERT_MESSAGE
          })
    }
}


// Assign RPM Device To Patient
export const assignRPMDeviceToPatient = (deviceId, patientId) => async(dispatch) => {
    
    try {
        dispatch({ 
            type: FETCH_START
        });

       await axios.post(`${Prod01}/patient/addremovedevice/${patientId}`, {
            "assignDevice":true,
            "deviceId":deviceId
        }, {
            headers: {
                "Authorization":`Bearer ${token}`
            } 
        });

        await axios.put(`${Prod01}/patient/edit/${patientId}`, {
            rpmconsent: true,
        }, {
            headers: {
                "Authorization":`Bearer ${token}`
            }
        })

        let device;

        
        device = await axios.put(`${Prod01}/device/edit/${deviceId}`, {
            assignedTime: moment(new Date()).tz("America/New_York").format("DD/MM/YYYY"),
            assigned_patient_id: patientId 
        }, {
            headers: {
                "Authorization":`Bearer ${token}`
            }  
        })
        
        
        dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: "Device Assigned to Patient"
            });
        
        dispatch({
            type: HIDE_ALERT_MESSAGE
        })

        
    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: 'Cannot assign device to patient'
          })
        dispatch({
            type: HIDE_ALERT_MESSAGE
          })
    }
}

export const getAdminNotifications = () => async(dispatch) => {
    try {
        dispatch({ type: GET_ADMIN_NOTIFICATIONS_REQUEST})

        const data = await axios.post(`${Prod01}/general/notifications`, {
                admin: true
        }, {
            headers: {
                "Authorization":`Bearer ${token}`
            } 
        });

        dispatch({ 
            type: GET_ADMIN_NOTIFICATIONS_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({ 
            type: GET_ADMIN_NOTIFICATIONS_FAIL,
            payload: error
        })
    }
}

// Clear errors
export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}

