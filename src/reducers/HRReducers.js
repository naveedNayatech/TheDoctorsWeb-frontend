import { 
    HR_PATIENTS_REQUEST,
    HR_PATIENTS_SUCCESS,
    HR_PATIENTS_FAIL,
    ADDING_COMMENT_REQUEST,
    ADDING_COMMENT_SUCCESS,
    ADDING_COMMENT_FAIL,
    COMMENT_RESET,
    ADDING_TIME_SPENT_SUCCESS,
    ADDING_TIME_SPENT_FAIL,
    ADDING_TIME_SPENT_RESET,
    TIME_REPORT_REQUEST,
    TIME_REPORT_SUCCESS,
    TIME_REPORT_FAIL,
    RESET_TIME_REPORT_DATA,
    ADDING_CARE_PLAN_SUCCESS,
    ADDING_CARE_PLAN_FAIL,
    ADDING_CARE_PLAN_RESET,
    PATIENT_CARE_PLAN_SUCCESS,
    PATIENT_CARE_PLAN_FAIL,
    UPDATE_CARE_PLAN_SUCCESS,
    UPDATE_CARE_PLAN_FAIL,
    UPDATE_CARE_PLAN_RESET,
    CLEAR_ERRORS
} from '../constants/HRConstants';

export const hrpatientsReducers = (state = {}, action) => {
    switch (action.type) {
        case HR_PATIENTS_REQUEST: 
            return {
                loading: true,
            }
        
        case HR_PATIENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                hrpatients: action.payload
            }
        
        case HR_PATIENTS_FAIL:
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

export const commentReducers = (state = {loading: false, commentSuccess: false}, action) => {
    switch (action.type) {
        case ADDING_COMMENT_REQUEST: 
            return {
                loading: true,
            }
        
        case ADDING_COMMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                commentSuccess: true,
            }
        
        case ADDING_COMMENT_FAIL:
            return {
                loading: false,
                commentSuccess: false,
            }

        case CLEAR_ERRORS: 
         return {
            ...state,
            error: null   
         }  
         
         case COMMENT_RESET: 
         return {
             loading: false,
             commentSuccess: false,
         }
         
        default: 
            return state; 
    } 
}

export const hrtimeSpentReducers = (state = {loading: false, isSuccessful: false, carePlanAdded: false}, action) => {
    switch (action.type) {
    
        case ADDING_TIME_SPENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isSuccessful:true,
            }
        
        case ADDING_TIME_SPENT_FAIL:
            return {
                loading: false,
                isSuccessful:false,
            }

        case ADDING_CARE_PLAN_SUCCESS: 
            return{
                loading: false,
                carePlanAdded: true
            }
        
        case ADDING_CARE_PLAN_FAIL: 
        return {
            loading: false,
            error: action.payload
        }
    
        case ADDING_CARE_PLAN_RESET: 
            return{
                loading: false,
                carePlanAdded: false
            }

        case CLEAR_ERRORS: 
         return {
            ...state,
            error: null   
         }  
         
         case ADDING_TIME_SPENT_RESET: 
         return {
             loading: false,
             isSuccessful:false,
         }
         
        default: 
            return state; 
    } 
}

export const hrTimeReportReducers = (state = {targets:{}}, action) => {
    switch (action.type) {
    
        case TIME_REPORT_REQUEST:
            return {
                loading: true,
            }
        
        case TIME_REPORT_SUCCESS:
            return {
                loading: false,
                targets: action.payload.targets,
                totalTime: action.payload.totalTime
            }
        
        case RESET_TIME_REPORT_DATA: 
        return {
            loading: false,
            targets: null,
            totalTime: 0
        }

        case TIME_REPORT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
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

export const carePlanReducers = (state={careplan:{}}, action) => {
    switch (action.type) {
        
        case PATIENT_CARE_PLAN_SUCCESS:
            return {
                careplan: action.payload
        }

        case PATIENT_CARE_PLAN_FAIL:
            return {
                error: action.payload
            }

        case UPDATE_CARE_PLAN_SUCCESS: 
            return {
                isUpdated: true
            }

        case UPDATE_CARE_PLAN_FAIL: 
            return {
                error: action.payload
            }

        case UPDATE_CARE_PLAN_RESET: 
            return {
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
