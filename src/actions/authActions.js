import axios from 'axios';
import { Prod, Prod01 } from '../constants/ActionType';
import { useAlert } from 'react-alert';

import { 
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    STAFF_LOGIN_REQUEST,
    STAFF_LOGIN_SUCCESS,
    STAFF_LOGIN_FAIL,
    STAFF_LOGOUT_SUCCESS,
    STAFF_LOGOUT_FAIL,
    HR_LOGIN_REQUEST,
    HR_LOGIN_SUCCESS,
    HR_LOGIN_FAIL,
    ADMIN_PASSWORD_UPDATE_REQUEST,
    ADMIN_PASSWORD_UPDATE_SUCCESS,
    ADMIN_PASSWORD_UPDATE_FAIL,
    HR_LOGOUT_SUCCESS,
    HR_LOGOUT_FAIL,
    CLEAR_ERRORS
} from '../constants/authConstants';

import { 
    SHOW_ALERT_MESSAGE,
    HIDE_ALERT_MESSAGE,
    FETCH_ERROR
} from '../constants/Common';


// Login 
export const login = (values) => async(dispatch) => {
    const { email, password} = values;
    try {
       dispatch({
           type: LOGIN_REQUEST
       })     

       const res  = await axios.post(`${Prod01}/admin/login`, {
           email,
           password
       });
       
       if (res.data) {
        localStorage.setItem(
          "token",
          JSON.stringify(res.data.tokens.access.token)
        );
        localStorage.setItem(
          "admin",
          JSON.stringify(res.data.Admin)
        );
       }

       dispatch({
           type: LOGIN_SUCCESS,
           payload: res.data
       })

    } catch (error) {
        dispatch({
            type: FETCH_ERROR,
            payload: 'Invalid email or password'
          })
          dispatch({
            type: HIDE_ALERT_MESSAGE
          })
          dispatch({
              type: LOGIN_FAIL
          })
    }
}

// Staff Login 
export const staffLogin = (values) => async(dispatch) => {
    try {
       dispatch({
           type: STAFF_LOGIN_REQUEST
       })     

       const res = await axios.post(`${Prod01}/doctor/login`, values);

       if (res.data) {
        localStorage.setItem(
          "token",
          JSON.stringify(res.data.tokens.access.token)
        );
        localStorage.setItem(
          "doctor",
          JSON.stringify(res.data.doctor)
        );
       }

       dispatch({
           type: STAFF_LOGIN_SUCCESS,
           payload: res.data.doctor
       })
       
    } catch (error) {
        dispatch({
            type: STAFF_LOGIN_FAIL,
            payload: error.message
        })
    }
}

// HR Login 
export const hrLogin = (values) => async(dispatch) => {
    try {
       dispatch({
           type: HR_LOGIN_REQUEST
       })     

       const res = await axios.post(`${Prod01}/hr/login`, values);

       if (res.data) {
        localStorage.setItem(
          "token",
          JSON.stringify(res.data.tokens.access.token)
        );
        localStorage.setItem(
          "hr",
          JSON.stringify(res.data.hr)
        );
       }

       dispatch({
           type: HR_LOGIN_SUCCESS,
           payload: res.data.hr
       })
       
    } catch (error) {
        dispatch({
            type: HR_LOGIN_FAIL,
            payload: error.message
        })
    }
}

// HR Logout 
export const hrLogout = () => async(dispatch) => {
    try {
       dispatch({
           type: HR_LOGOUT_SUCCESS
       })
       
    } catch (error) {
        dispatch({
            type: HR_LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update Password -> ADMIN 
export const updatePassword = (id, oldpassword, password) => async(dispatch) => {
    try {
       dispatch({
           type: ADMIN_PASSWORD_UPDATE_REQUEST
       })     

    console.log('id is '+ id, 'oldpassword is ' + oldpassword + 'newPassword is ' + password);

       const config = {
           headers: {
               'Content-Type': 'application/json'
           }
       }

       const { data } = await axios.put(`${Prod}/v1/admin/update`, {
           id,
           oldpassword,
           password
       }, config);

       dispatch({
           type: ADMIN_PASSWORD_UPDATE_SUCCESS,
           payload: data.admin
       })
       
    } catch (error) {
        dispatch({
            type: ADMIN_PASSWORD_UPDATE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Logout 
export const logout = () => async(dispatch) => {
    try {
       dispatch({
           type: LOGOUT_SUCCESS
       })
       
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}


// Logout 
export const staffLogout = () => async(dispatch) => {
    try {
       dispatch({
           type: STAFF_LOGOUT_SUCCESS
       })
       
    } catch (error) {
        dispatch({
            type: STAFF_LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const forgotpassword = (values) => async(dispatch) => {
    const { email } = values;  
    try {
       const res  = await axios.post(`${Prod01}/auth/forgot-password`, {
           email
       });
      
       if(res){
        dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: "Email Sent"
          });
        dispatch({
            type: HIDE_ALERT_MESSAGE
        })
       }
       
       
    } catch (error) {
       dispatch({
        type: FETCH_ERROR,
        payload: 'Email cannot be sent'
      })
      dispatch({
        type: HIDE_ALERT_MESSAGE
      })
    }
}

export const resetpassword = (values, queryToken) => async(dispatch) => {
    const { password } = values;  
    try {
       const res = await axios.post(`${Prod01}/auth/reset-password?token=${queryToken}`, {
           password: password
       });
      
       if(res){
        dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: "Password has been reset"
          });
        dispatch({
            type: HIDE_ALERT_MESSAGE
        })
       }
       
       
    } catch (error) {
       dispatch({
        type: FETCH_ERROR,
        payload: 'Unable to update password'
      })
      dispatch({
        type: HIDE_ALERT_MESSAGE
      })
    }
}


export const resetpasswordById = (password, id) => async(dispatch) => {  
    
    const token = JSON. parse(localStorage.getItem('token'));

    try {
       const res = await axios.post(`${Prod01}/general/resetpasswordanyuser`, {
           id: id,
           password: password
       }, {
        headers: {
            "Authorization":`Bearer ${token}`
        } 
       });
      
       if(res){
        dispatch({
            type: SHOW_ALERT_MESSAGE,
            payload: "Password has been reset"
          });
        dispatch({
            type: HIDE_ALERT_MESSAGE
        })
       }
       
       
    } catch (error) {
       dispatch({
        type: FETCH_ERROR,
        payload: 'Unable to update password'
      })
      dispatch({
        type: HIDE_ALERT_MESSAGE
      })
    }
}



// Clear errors
export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}