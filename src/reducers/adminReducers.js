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
    ADD_DOCTOR_RESET,
    DOCTOR_PROFILE_REQUEST,
    DOCTOR_PROFILE_SUCCESS,
    DOCTOR_PROFILE_FAIL,
    DOCTOR_PATIENTS_REQUEST,
    DOCTOR_PATIENTS_SUCCESS,
    DOCTOR_PATIENTS_FAIL,
    FETCH_DOCTOR_PATIENTS_SUCCESS,
    PATIENT_PROFILE_REQUEST,
    PATIENT_PROFILE_SUCCESS,
    PATIENT_PROFILE_FAIL,
    UPDATE_DOCTOR_REQUEST,
    UPDATE_DOCTOR_SUCCESS,
    UPDATE_DOCTOR_RESET,
    UPDATE_DOCTOR_FAIL,
    ASSIGN_PATIENT_TO_DOCTOR_REQUEST,
    ASSIGN_PATIENT_TO_DOCTOR_SUCCESS,
    ASSIGN_PATIENT_TO_DOCTOR_FAIL,
    RESET_ASSIGN_PATIENT_TO_HR,
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
    ADD_RPM_DEVICE_RESET,
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
    DELETE_RPM_DEVICE_RESET,
    ADD_PATIENT_REQUEST,
    ADD_PATIENT_SUCCESS,
    ADD_PATIENT_FAIL,
    PATIENT_RESET,
    ALL_HRS_REQUEST,
    ALL_HRS_SUCCESS,
    ALL_HRS_FAIL,
    ADD_HR_REQUEST,
    ADD_HR_SUCCESS,
    ADD_HR_FAIL,
    UPDATE_HR_REQUEST,
    UPDATE_HR_SUCCESS,
    UPDATE_HR_FAIL,
    UPDATE_HR_RESET,
    ASSIGN_DOCTOR_TO_HR_REQUEST,
    ASSIGN_DOCTOR_TO_HR_SUCCESS,
    ASSIGN_DOCTOR_TO_HR_FAIL,
    ADMIN_STATS_SUCCESS,
    ADMIN_STATS_FAIL,
    UPDATE_PATIENT_REQUEST,
    UPDATE_PATIENT_SUCCESS,
    UPDATE_PATIENT_FAIL,
    UPDATE_PATIENT_RESET,
    GET_ADMIN_NOTIFICATIONS_REQUEST,
    GET_ADMIN_NOTIFICATIONS_SUCCESS,
    GET_ADMIN_NOTIFICATIONS_FAIL,
    CLEAR_ERRORS
} from '../constants/adminConstants';

export const adminReducers = (state = { patients: [], doctors: []}, action) => {
    switch(action.type) {
        case ALL_PATIENTS_REQUEST: 
        return { 
            loading: true,  
            patients: []            
        }

        case ALL_PATIENTS_SUCCESS: 
        return { 
            loading: false,  
            patients: action.payload       
        }

        case ALL_PATIENTS_FAIL: 
        case UPDATE_PATIENT_REQUEST:
        return { 
            loading: false,  
            error: action.payload        
        }

        case ALL_DOCTORS_REQUEST:
            return { 
                loading: true, 
                doctors: []    
            }

        case ALL_DOCTORS_SUCCESS:
            return { 
                loading: false,  
                doctors: action.payload 
            }
            
        case ALL_DOCTORS_FAIL:
            return { 
                loading: false,  
                error: action.payload
        }

        case UPDATE_PATIENT_SUCCESS: 
            return {
                loading: false,
                isUpdated: true 
        }

        case UPDATE_PATIENT_FAIL: return {
            loading: false,
            error: action.payload
        }

        case UPDATE_DOCTOR_SUCCESS: 
            return {
             loading: false,
             isUpdated: true,
            }  

        case UPDATE_DOCTOR_RESET:
            return {
                loading: false,
                isUpdated: false,
            }
        
        case UPDATE_DOCTOR_FAIL: 
            return {
             error: action.payload
            }

        case UPDATE_PATIENT_RESET: return {
            loading: false,
            isUpdated: false
        }
       

        case CLEAR_ERRORS: 
        return { 
            ...state,
            error: null 

        }

        default: 
         return state;
    }
} 

export const newDoctorReducers = (state = {}, action) => {
    switch (action.type) {
 
     case ADD_DOCTOR_REQUEST: 
      return {
          loading: true
      }
 
     case ADD_DOCTOR_SUCCESS: 
         return {
             loading: false,
             success: true,
         }  
     
     case ADD_DOCTOR_FAIL:
         return {
             ...state,
             error: action.payload
         }    
     
     case ADD_DOCTOR_RESET: 
     return {
         ...state,
         success: false,
         loading: false
     }    
     
     case CLEAR_ERRORS: 
         return {
            ...state,
            error: null   
         }    
     default: 
        return state; 
    } 
 }

 export const doctorProfileReducers = (state = {doctor: {}}, action) => {
    switch (action.type) {
        case DOCTOR_PROFILE_REQUEST: 
            return {
                loading: true,
            }
        
        case DOCTOR_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                doctor: action.payload
            }
        
        case DOCTOR_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS: 
         return {
            ...state,
            error: null   
         }    
        default: 
            return state; 
    } 
}

export const doctorpatientsReducers = (state = {}, action) => {
    switch (action.type) {
        case DOCTOR_PATIENTS_REQUEST: 
            return {
                loading: true,
            }
        
        case DOCTOR_PATIENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                doctorpatients: action.payload
            }
        
        case DOCTOR_PATIENTS_SUCCESS:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS: 
         return {
            ...state,
            error: null   
         }    

        default: 
            return state; 
    } 
}

export const doctorReducers = (state = {doctor: {}}, action) => {
    switch(action.type) {
    
        case CLEAR_ERRORS: 
            return {
               ...state,
               error: null   
            }        
        
        default:{
            return state
            }     
    }
}

export const patientProfileReducers = (state = {patient: {}}, action) => {
    switch (action.type) {
        case PATIENT_PROFILE_REQUEST: 
        case ASSIGN_PATIENT_TO_DOCTOR_REQUEST:
        case ASSIGN_DEVICE_TO_PATIENT_REQUEST:
            return {
                loading: true,
            }
        
        case PATIENT_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                patient: action.payload
            }
        
        case ASSIGN_PATIENT_TO_DOCTOR_SUCCESS: 
        case ASSIGN_DEVICE_TO_PATIENT_SUCCESS:
        return {
            ...state,
            loading: false,
            success: true,
            // patient: action.payload,
            isUpdated: true
        }    
        
        case PATIENT_PROFILE_FAIL:
        case ASSIGN_PATIENT_TO_DOCTOR_FAIL:
        case ASSIGN_DEVICE_TO_PATIENT_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS: 
                return {
                ...state,
                error: null   
                }    
        default: 
            return state; 
    } 
}

export const deviceDataReducers = (state = { deviceData: []}, action) => {
    switch(action.type) {
        case GET_PATIENT_DEVICE_DATA_REQUEST: 
        return { 
            loading: true,              
        }

        case GET_PATIENT_DEVICE_DATA_SUCCESS: 
        return { 
            loading: false,  
            deviceData: action.payload        
        }

        case GET_PATIENT_DEVICE_DATA_FAIL: 
        return { 
            loading: false,  
            error: action.payload        
        }

        case CLEAR_ERRORS: 
        return { 
            ...state,
            error: null 
        }

        default: 
         return state;
    }
} 

export const devicesReducers = (state = { devices: []}, action) => {
    switch(action.type) {
        case GET_DEVICES_LIST_REQUEST:
        case SORT_DEVICES_REQUEST:
        case SORT_DEVICES_BY_BROKEN_REQUEST:     
        case DELETE_RPM_DEVICE_REQUEST:
        return { 
            loading: true,      
        }

        case GET_DEVICES_LIST_SUCCESS:  
        return { 
            loading: false,  
            deviceCount: action.payload.count,
            devices: action.payload.devices        
        }

        case SORT_DEVICES_BY_BROKEN_SUCCESS: 
        return {
            loading: false, 
            devices: action.payload
        }

        case SORT_DEVICES_SUCCESS: 
        return {
            loading: false, 
            devices: action.payload,
        }

        case DELETE_RPM_DEVICE_SUCCESS: 
        return {
            loading: false, 
            isDeleted: true
        }

        case DELETE_RPM_DEVICE_RESET: 
        return { 
            ...state,
         loading: false,
         isDeleted: false
        }

        case GET_DEVICES_LIST_FAIL: 
        case SORT_DEVICES_BY_BROKEN_FAIL:
        case SORT_DEVICES_FAIL:
        case DELETE_RPM_DEVICE_FAIL:
        return { 
            loading: false,  
            error: action.payload        
        }

        case CLEAR_ERRORS: 
        return { 
            ...state,
            error: null 
        }

        default: 
         return state;
    }
} 

export const deviceDetailsReducers = (state = {deviceDetails: {}}, action) => {
    switch (action.type) {
        case GET_DEVICE_DETAILS_REQUEST: 
            return {
                loading: true,
            }
        
        case GET_DEVICE_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                deviceDetails: action.payload,
            }
        
        case GET_DEVICE_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS: 
         return {
            ...state,
            error: null   
         }    
        default: 
            return state; 
    } 
}

export const newDeviceReducers = (state = {devices: {} }, action) => {
    switch (action.type) {
 
     case ADD_RPM_DEVICE_REQUEST: 
     case UPDATE_DEVICE_REQUEST:
      return {
          ...state,
          loading: true
      }
 
     case ADD_RPM_DEVICE_SUCCESS: 
         return {
             loading: false,
             success: true,
         }  

    case UPDATE_DEVICE_SUCCESS: 
         return {
             loading: false,
             isUpdated: true
         }    
     
     case ADD_RPM_DEVICE_FAIL:
     case UPDATE_DEVICE_FAIL:
         return {
             ...state,
             error: action.payload
         }    
    

    case ADD_RPM_DEVICE_RESET: 
        return { 
            ...state,
        loading: false,
        success: false,
        isUpdated: false
        }      
     
     case CLEAR_ERRORS: 
         return {
            ...state,
            error: null   
         }    
     default: 
        return state; 
    } 
 }

 export const patientReducers =  (state = {}, action) => {
    switch (action.type) {
        case ADD_PATIENT_REQUEST: 
         return {
             ...state,
             loading: true
         }

         case ADD_PATIENT_SUCCESS: 
        return {
            loading: false,
             isAdded: true
        }

        case ADD_PATIENT_FAIL: 
        return {
            error: action.payload
        }

        case PATIENT_RESET: 
        return {
            isAdded: false,
            loading: false,
        }
        default: // need this for default case
        return state 
    }
}

// HRs Reducers
export const hrsReducers =  (state = { hrs: []}, action) => {
    switch (action.type) {
        case ALL_HRS_REQUEST: 
        case ADD_HR_REQUEST:
        case UPDATE_HR_REQUEST:
        case ASSIGN_DOCTOR_TO_HR_REQUEST:
         return {
             loading: true
         }

        case ALL_HRS_SUCCESS: 
            return {
                loading: false,
                hrs: action.payload
            }
         
        case ADD_HR_SUCCESS: 
         return {
            loading: false,
            isAdded: true
         }   

         case UPDATE_HR_SUCCESS: 
             return {
                 loading: false,
                 isUpdated: true
             }

         case ASSIGN_DOCTOR_TO_HR_SUCCESS: 
            return { 
             loading: false,
             isAssigned: true,
            }
            
        case RESET_ASSIGN_PATIENT_TO_HR:
            return { 
                isAssigned: false,
            }

        case UPDATE_HR_RESET: 
        return { 
            loading: false,
            isUpdated: false
        }

        case ALL_HRS_FAIL:
        case ADD_HR_FAIL:
        case UPDATE_HR_FAIL: 
        case ASSIGN_DOCTOR_TO_HR_FAIL:
        return {
            error: action.payload
        }

        default: // need this for default case
        return state 
    }
}

export const adminStatsReducers = (state = { totalPatients:0, totalHrs: 0, totalDrs:0, totalDevices:0  }, action) => {
    switch (action.type) {
        case ADMIN_STATS_SUCCESS: 
            return {
                loading: false,
                totalPatients: action.payload.totalPatients,
                totalHrs: action.payload.totalHrs, 
                totalDrs: action.payload.totalDrs,
                totalDevices: action.payload.totalDevices
            }

        case ADMIN_STATS_FAIL:
            return {
                ...state,
                error: action.payload
            } 
            
        default: // need this for default case
        return state    
    }
}

export const adminNotificationsReducers = (state = { notifications:[] }, action) => {
    switch (action.type) {
        case GET_ADMIN_NOTIFICATIONS_REQUEST: 
            return {
                loading: true,
            }

        case GET_ADMIN_NOTIFICATIONS_SUCCESS:
            return {
                loading: false,
                notifications: action.payload
            }
            
        case GET_ADMIN_NOTIFICATIONS_FAIL:
            return {
                ...state,
                error: action.payload
        }
            
        default: // need this for default case
        return state    
    }
}