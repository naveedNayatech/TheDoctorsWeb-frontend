import { 
    HR_PATIENTS_REQUEST,
    HR_PATIENTS_SUCCESS,
    HR_PATIENTS_FAIL,
    ADDING_COMMENT_REQUEST,
    ADDING_COMMENT_SUCCESS,
    ADDING_COMMENT_FAIL,
    COMMENT_RESET,
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



