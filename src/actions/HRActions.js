import axios from 'axios';
import { Prod, Prod01 } from '../constants/ActionType';
 
import {
    HR_PATIENTS_REQUEST,
    HR_PATIENTS_SUCCESS,
    HR_PATIENTS_FAIL,
    ADDING_COMMENT_REQUEST,
    ADDING_COMMENT_SUCCESS,
    ADDING_COMMENT_FAIL,
    CLEAR_ERRORS
} from '../constants/HRConstants';

export const getHRPatients = (id) => async(dispatch) => {   
try {
    dispatch({
        type: HR_PATIENTS_REQUEST,
    }) 

    const token = JSON. parse(localStorage.getItem('token'));

    const { data } = await axios.get(`${Prod01}/hr/patientlist/${id}`,{
        headers: {
            "Authorization":`Bearer ${token}`
         }
    });
        
        dispatch({
            type: HR_PATIENTS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: HR_PATIENTS_FAIL,
            payload: error.response.data.message
        })   
    }
}

// HR comment on reading
export const commentOnReading = (readingId, hrId, comment) => async(dispatch) => {
    
    try {
       dispatch({ 
           type: ADDING_COMMENT_REQUEST
       });
    
       const token = JSON. parse(localStorage.getItem('token'));

       const { data } = await axios.put(`${Prod01}/patient/commentonreading/${readingId}`, {
            conclusion_hr_id:hrId,
            conclusion: comment
           }, {
            headers: {
                "Authorization":`Bearer ${token}`
             }
           });    
           
        dispatch({ 
            type: ADDING_COMMENT_SUCCESS,
            payload: data
        });
        
    } catch (error) {
       dispatch({
           type: ADDING_COMMENT_FAIL,
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