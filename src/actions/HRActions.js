import axios from 'axios';
import { Prod01 } from '../constants/ActionType';

import {
    HR_PATIENTS_REQUEST,
    HR_PATIENTS_SUCCESS,
    HR_PATIENTS_FAIL,
    ADDING_COMMENT_REQUEST,
    ADDING_COMMENT_SUCCESS,
    ADDING_COMMENT_FAIL,
    ADDING_TIME_SPENT_SUCCESS,
    ADDING_TIME_SPENT_FAIL,
    TIME_REPORT_REQUEST,
    TIME_REPORT_SUCCESS,
    TIME_REPORT_FAIL,
    INITIAL_MONTH_REPORT_REQUEST,
    INITIAL_MONTH_REPORT_SUCCESS,
    INITIAL_MONTH_REPORT_FAIL,
    ADDING_CARE_PLAN_SUCCESS,
    ADDING_CARE_PLAN_FAIL,
    PATIENT_CARE_PLAN_SUCCESS,
    PATIENT_CARE_PLAN_FAIL,
    UPDATE_CARE_PLAN_SUCCESS,
    UPDATE_CARE_PLAN_FAIL,
    TIME_SPENT_OF_CURRENT_MONTH_SUCCESS,
    TIME_SPENT_OF_CURRENT_MONTH_FAIL,
    PATIENT_CP_REPORT_REQUEST,
    PATIENT_CP_REPORT_SUCCESS,
    PATIENT_CP_REPORT_FAIL,
    GET_HR_NOTIFICATIONS_REQUEST,
    GET_HR_NOTIFICATIONS_SUCCESS,
    GET_HR_NOTIFICATIONS_FAIL,
    GET_CAREPLAN_LIST_REQUEST,
    GET_CAREPLAN_LIST_SUCCESS,
    GET_CAREPLAN_LIST_FAIL,
    CLEAR_ERRORS
} from '../constants/HRConstants';

export const getHRPatients = (id) => async (dispatch) => {
    try {
        dispatch({
            type: HR_PATIENTS_REQUEST,
        })

        const token = JSON.parse(localStorage.getItem('token'));

        const { data } = await axios.post(`${Prod01}/hr/patientlist/${id}`, {
            name: 'hammad'
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
export const commentOnReading = (readingId, hrId, comment) => async (dispatch) => {

    try {
        dispatch({
            type: ADDING_COMMENT_REQUEST
        });

        const { data } = await axios.put(`${Prod01}/patient/commentonreading/${readingId}`, {
            conclusion_hr_id: hrId,
            conclusion: comment
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

export const commentOnReadingByStaff = (readingId, staffId, comment) => async (dispatch) => {

    try {
        dispatch({
            type: ADDING_COMMENT_REQUEST
        });

        const { data } = await axios.put(`${Prod01}/patient/commentonreading/${readingId}`, {
            conclusion_doctor_id: staffId,
            conclusion: comment
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

// Time Spent on Patient
export const timeSpentOnPatient = (patientId, hrId, values) => async (dispatch) => {
    try {
        const { data } = await axios.post(`${Prod01}/hr/addtimeforpatient/${hrId}`, {
            assigned_patient_id: patientId,
            timeSpentInMinutes: values.timespent,
            conclusion: values.conclusion
        });

        dispatch({
            type: ADDING_TIME_SPENT_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ADDING_TIME_SPENT_FAIL,
            payload: error.message
        })
    }
}

export const timeSpentOnPatientAuto = (patientId, hrId, minutes, description) => async(dispatch) => {
    try {
       const { data } = await axios.post(`${Prod01}/hr/addtimeforpatient/${hrId}`, {
                assigned_patient_id : patientId,
                timeSpentInMinutes:minutes,
                conclusion: description
           });    
           
        dispatch({ 
            type: ADDING_TIME_SPENT_SUCCESS,
            payload: data
        });
        
    } catch (error) {
       dispatch({
           type: ADDING_TIME_SPENT_FAIL,
           payload: error.message
       })
    }   
}


export const carePlanOfPatient = (patientId, hrId, description, readingsPerMonth, readingsInDay, readingsInNight, fileName) => async (dispatch) => {
    let data;
    try {
    
        data = await axios.post(`${Prod01}/patient/addCarePlan`, {
            assigned_hr_id: hrId,
            assigned_patient_id: patientId,
            Description: description,
            readingsPerMonth: readingsPerMonth,
            readingsInSlot1: readingsInDay,
            readingsInSlot2: readingsInNight,
            fileName: fileName.name
        });


        let formData = new FormData();
        formData.append('file', fileName);

        if (fileName) {
            fetch(`${Prod01}/general/uploadfile`, {
                method: 'POST',
                body: formData,
              }
            )
        }

        dispatch({
            type: ADDING_CARE_PLAN_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ADDING_CARE_PLAN_FAIL,
            payload: 'Care plan already exists'
        })
    }
}

export const getTimeReport = (patientId, startDate, endDate) => async (dispatch) => {
    try {
        dispatch({
            type: TIME_REPORT_REQUEST
        });

        const { data } = await axios.post(`${Prod01}/hr/listtargets&totaltime`, {
            // hrId: hrId,
            patientId: patientId,
            startDate: startDate,
            endDate: endDate
        });

        dispatch({
            type: TIME_REPORT_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: TIME_REPORT_FAIL,
            payload: error.message
        })
    }
}

export const getTimeReportByHR = (hrId, startDate, endDate) => async (dispatch) => {
    try {
        dispatch({
            type: TIME_REPORT_REQUEST
        });

        const { data } = await axios.post(`${Prod01}/hr/listtargets&totaltime`, {
            hrId: hrId,
            startDate: startDate,
            endDate: endDate
        });

        dispatch({
            type: TIME_REPORT_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: TIME_REPORT_FAIL,
            payload: error.message
        })
    }
}

export const getTimeReportByDR = (drId, startDate, endDate) => async (dispatch) => {
    try {
        dispatch({
            type: TIME_REPORT_REQUEST
        });

        const { data } = await axios.post(`${Prod01}/hr/listtargets&totaltime`, {
            drId: drId,
            startDate: startDate,
            endDate: endDate
        });

        dispatch({
            type: TIME_REPORT_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: TIME_REPORT_FAIL,
            payload: error.message
        })
    }
}


export const hrTimeSpentOfCurrentMonth = (patientId, hrId, startDate, endDate) => async (dispatch) => {
    try {

        const { data } = await axios.post(`${Prod01}/hr/listtargets&totaltime`, {
            hrId: hrId,
            patientId: patientId,
            startDate: startDate,
            endDate: endDate
        });

        dispatch({
            type: TIME_SPENT_OF_CURRENT_MONTH_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: TIME_SPENT_OF_CURRENT_MONTH_FAIL,
            payload: error.message
        })
    }
}

export const getInitialMonthReport = (hrId, doctorId, month) => async (dispatch) => {
    try {
        dispatch({
            type: INITIAL_MONTH_REPORT_REQUEST
        });

        let data;

        if (month) {
            data = await axios.post(`${Prod01}/general/report/initialsetup`, {
                month: month
            });
        }

        if (month && hrId) {
            data = await axios.post(`${Prod01}/general/report/initialsetup`, {
                month: month,
                hrId: hrId
            });
        }

        if (month && doctorId) {
            console.log('Doctor ID is ' + doctorId);
            data = await axios.post(`${Prod01}/general/report/initialsetup`, {
                month: month,
                doctorId: doctorId
            });
        }


        dispatch({
            type: INITIAL_MONTH_REPORT_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: INITIAL_MONTH_REPORT_FAIL,
            payload: error.message
        })
    }
}

export const getCompletePatientCP = () => async (dispatch) => {
    try {
        dispatch({
            type: PATIENT_CP_REPORT_REQUEST
        });

        const token = JSON.parse(localStorage.getItem('token'));

        const { data } = await axios.post(`${Prod01}/general/report/initialsetup`, {

        });

        dispatch({
            type: PATIENT_CP_REPORT_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: PATIENT_CP_REPORT_FAIL,
            payload: error.message
        })
    }
}


export const getPatientCarePlan = (patientId) => async (dispatch) => {
    try {
        const token = JSON.parse(localStorage.getItem('token'));

        const data = await axios.get(`${Prod01}/patient/CarePlan/${patientId}`);

        dispatch({
            type: PATIENT_CARE_PLAN_SUCCESS,
            payload: data,
        });


    } catch (error) {
        dispatch({
            type: PATIENT_CARE_PLAN_FAIL,
            payload: error.message
        })
    }
}

export const getHRCareplans = (hrId) => async (dispatch) => {
    try {

        dispatch({
            type: GET_CAREPLAN_LIST_REQUEST
        })

        const { data } = await axios.post(`${Prod01}/patient/CarePlanbydrhr`, {
            "hr_Id": hrId
        });

        dispatch({
            type: GET_CAREPLAN_LIST_SUCCESS,
            payload: data,
        });


    } catch (error) {
        dispatch({
            type: GET_CAREPLAN_LIST_FAIL,
            payload: error.message
        })
    }
}

export const updateCarePan = (description, readingsPerMonth, readingsPerDay, careplanId) => async (dispatch) => {
    try {
        const token = JSON.parse(localStorage.getItem('token'));

        const { data } = await axios.put(`${Prod01}/patient/editcareplan/${careplanId}`, {
            Description: description,
            readingsPerMonth: readingsPerMonth,
            readingsPerDay: readingsPerDay
        });

        dispatch({
            type: UPDATE_CARE_PLAN_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_CARE_PLAN_FAIL,
            payload: error.message
        })
    }
}

export const getHRNotifications = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_HR_NOTIFICATIONS_REQUEST })

        const token = JSON.parse(localStorage.getItem('token'));

        const data = await axios.post(`${Prod01}/general/notifications`, {
            hrId: id
        });

        dispatch({
            type: GET_HR_NOTIFICATIONS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_HR_NOTIFICATIONS_FAIL,
            payload: error
        })
    }
}

// Clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    })
}