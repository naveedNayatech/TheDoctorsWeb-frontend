import axios from 'axios';
import { Prod } from '../constants/ActionType';

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
    ADMIN_PASSWORD_UPDATE_REQUEST,
    ADMIN_PASSWORD_UPDATE_SUCCESS,
    ADMIN_PASSWORD_UPDATE_FAIL,
    CLEAR_ERRORS
} from '../constants/authConstants';


// Login 
export const login = (email, password, role) => async(dispatch) => {
    try {
       dispatch({
           type: LOGIN_REQUEST
       })     

       const config = {
           headers: {
               'Content-Type': 'application/json'
           }
       }

       const { data } = await axios.post(`${Prod}/v1/adminlogin`, {
           email,
           password,
           role
       }, config);

       dispatch({
           type: LOGIN_SUCCESS,
           payload: data.admin
       })
       
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

// Staff Login 
export const staffLogin = (email, password, role) => async(dispatch) => {
    try {
       dispatch({
           type: STAFF_LOGIN_REQUEST
       })     

       const config = {
           headers: {
               'Content-Type': 'application/json'
           }
       }

       const { data } = await axios.post(`${Prod}/v1/login`, {
           email,
           password,
           role
       }, config);

       dispatch({
           type: STAFF_LOGIN_SUCCESS,
           payload: data.doctor
       })
       
    } catch (error) {
        dispatch({
            type: STAFF_LOGIN_FAIL,
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
       await axios.get(`${Prod}/v1/adminlogout`);

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
       await axios.get(`${Prod}/v1/stafflogout`);

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


// Clear errors
export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}