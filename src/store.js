import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { adminReducers } from './reducers/adminReducers';
import { authReducers } from './reducers/authReducers';
import { newDoctorReducers } from './reducers/adminReducers';
import { doctorProfileReducers } from './reducers/adminReducers'; 
import { patientProfileReducers } from './reducers/adminReducers';
import { doctorReducers } from './reducers/adminReducers';
import { deviceDataReducers } from './reducers/adminReducers';
 
const reducer = combineReducers({
    admin: adminReducers,
    auth: authReducers,
    newDoctor: newDoctorReducers,
    doctorProfile: doctorProfileReducers,
    patientProfile: patientProfileReducers,
    doctor: doctorReducers,
    deviceData: deviceDataReducers 
})

let initialState = {}

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;
