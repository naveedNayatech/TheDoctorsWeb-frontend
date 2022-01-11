import { 
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    ADMIN_PASSWORD_UPDATE_REQUEST,
    ADMIN_PASSWORD_UPDATE_SUCCESS,
    ADMIN_PASSWORD_UPDATE_FAIL,
    STAFF_LOGIN_REQUEST,
    STAFF_LOGIN_SUCCESS,
    STAFF_LOGIN_FAIL,
    CLEAR_ERRORS,
    STAFF_LOGOUT_SUCCESS,
    STAFF_LOGOUT_FAIL
} from '../constants/authConstants';


export const authReducers = (state = { user: {}, isAuthenticated: false, loading: false}, action) => {
    
    switch(action.type){
    
   case LOGIN_REQUEST: 
    return {
        loading: true,
        isAuthenticated: false,
    }

    case LOGIN_SUCCESS:
        return {
            ...state,
            loading: false,
            isAuthenticated: true,
            user: action.payload
        }
    
    case LOGIN_FAIL:
        return {
            ...state,
            loading: false,
            isAuthenticated: false,
            user: null,
            error: action.payload
        }    

    case LOGOUT_SUCCESS: 
    return {
        loading: false,
        isAuthenticated: false,
        user: null
    }   
    
    case LOGOUT_FAIL: 
    return {
        ...state,
        error: action.payload
    }

    case ADMIN_PASSWORD_UPDATE_REQUEST:
        return { 
            loading: true
        }
   
   case ADMIN_PASSWORD_UPDATE_SUCCESS: 
       return { 
           loading: false,
           user: action.payload
       }
       
    case ADMIN_PASSWORD_UPDATE_FAIL: 
       return { 
           ...state,
           error: action.payload
       }


    case CLEAR_ERRORS: 
    return {
        ...state,
        error: null
    }    
    default:
        return state
    }
}

export const staffAuthReducers = (state = { staff: {}, isAuthenticated: false, loading: false}, action) => {
    
    switch(action.type){
    
   case STAFF_LOGIN_REQUEST: 
    return {
        loading: true,
        isAuthenticated: false,
    }

    case STAFF_LOGIN_SUCCESS:
        return {
            ...state,
            loading: false,
            isAuthenticated: true,
            staff: action.payload
        }
    
    case STAFF_LOGIN_FAIL:
        return {
            ...state,
            loading: false,
            isAuthenticated: false,
            staff: null,
            error: action.payload
        }    

    case STAFF_LOGOUT_SUCCESS: 
    return {
        loading: false,
        isAuthenticated: false,
        staff: null
    }   
    
    case STAFF_LOGOUT_FAIL: 
    return {
        ...state,
        error: action.payload
    }
    case CLEAR_ERRORS: 
    return {
        ...state,
        error: null
    }    
    default:
        return state
    }
}