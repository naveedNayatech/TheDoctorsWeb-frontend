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
            patientCount: action.payload.patientCount,
            patients: action.payload.patients        
        }

        case ALL_PATIENTS_FAIL: 
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
                doctorCount: action.payload.doctorCount,
                doctors: action.payload.doctors 
            }
            
        case ALL_DOCTORS_FAIL:
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

export const newDoctorReducers = (state = {doctors: {} }, action) => {
    switch (action.type) {
 
     case ADD_DOCTOR_REQUEST: 
      return {
          ...state,
          loading: true
      }
 
     case ADD_DOCTOR_SUCCESS: 
         return {
             loading: false,
             success: action.payload.success,
             doctor: action.payload.doctor
         }  
     
     case ADD_DOCTOR_FAIL:
         return {
             ...state,
             error: action.payload
         }    
     
     case ADD_DOCTOR_RESET: 
     return {
         ...state,
         success: false
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
                success: action.payload.success,
                doctor: action.payload.doctor,
                docpatients: action.payload.docpatients
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


export const doctorReducers = (state = {doctor: {}}, action) => {
    switch(action.type) {
        case UPDATE_DOCTOR_REQUEST:     
            return {
                ...state,
                loading: true
            }


        case UPDATE_DOCTOR_SUCCESS: 
            return {
             ...state,   
             loading: false,
             isUpdated: true,
            }  

        case UPDATE_DOCTOR_RESET:
            return {
                ...state,
                isUpdated: false,
            }

        case UPDATE_DOCTOR_FAIL: 
        return {
         ...state,
         error: action.payload
        }

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
                success: action.payload.success,
                patient: action.payload
            }
        
        case ASSIGN_PATIENT_TO_DOCTOR_SUCCESS: 
        case ASSIGN_DEVICE_TO_PATIENT_SUCCESS:
        return {
            ...state,
            loading: false,
            success: action.payload.success,
            patient: action.payload,
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
            deviceData: action.payload.data        
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
        return { 
            loading: true,      
        }

        case GET_DEVICES_LIST_SUCCESS:  
        return { 
            loading: false,  
            deviceCount: action.payload.deviceCount,
            devices: action.payload.devices        
        }


        case GET_DEVICES_LIST_FAIL: 
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
                success: action.payload.success,
                deviceDetails: action.payload.findDevice,
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
      return {
          ...state,
          loading: true
      }
 
     case ADD_RPM_DEVICE_SUCCESS: 
         return {
             loading: false,
             success: action.payload.success,
         }  
     
     case ADD_RPM_DEVICE_FAIL:
         return {
             ...state,
             error: action.payload
         }    
     
    case ADD_RPM_DEVICE_RESET: 
         return { 
             ...state,
          success: false
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
