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
import { devicesReducers } from './reducers/adminReducers';
import { deviceDetailsReducers } from './reducers/adminReducers';
import { newDeviceReducers } from './reducers/adminReducers';
import { patientReducers } from './reducers/adminReducers';
import { doctorpatientsReducers } from './reducers/adminReducers';
import {staffAuthReducers} from './reducers/authReducers';
import { hrsReducers } from './reducers/adminReducers';
import { adminStatsReducers } from './reducers/adminReducers';
import { hrAuthReducers } from './reducers/authReducers';
import { hrpatientsReducers } from './reducers/HRReducers'; 
import { commentReducers } from './reducers/HRReducers';
import { hrtimeSpentReducers } from './reducers/HRReducers';
import { hrTimeReportReducers } from './reducers/HRReducers';
import { carePlanReducers } from './reducers/HRReducers';
import {initialMonthReportReducers} from './reducers/HRReducers';
import { timeSpentCurrentMonthReducer } from './reducers/HRReducers';
import {adminNotificationsReducers} from './reducers/adminReducers';
import { patientCPReportReducers } from './reducers/HRReducers';
import { inventoryStatsReducers } from './reducers/adminReducers';
import { hrNotificationsReducers } from './reducers/HRReducers';
import { remainingReadingsReducer } from './reducers/adminReducers';
import { logsReducers } from './reducers/adminReducers';

const reducer = combineReducers({
    admin: adminReducers,
    auth: authReducers,
    newDoctor: newDoctorReducers,
    doctorProfile: doctorProfileReducers,
    patientProfile: patientProfileReducers,
    doctor: doctorReducers,
    deviceData: deviceDataReducers,
    devices: devicesReducers,
    deviceDetails: deviceDetailsReducers,
    device : newDeviceReducers,
    staffAuth: staffAuthReducers,
    patientCRUD: patientReducers,
    docPatients: doctorpatientsReducers,
    hrslist: hrsReducers,
    hrAuth: hrAuthReducers,
    hrPatients:hrpatientsReducers,
    comments: commentReducers,
    timeSpent: hrtimeSpentReducers,
    target : hrTimeReportReducers,
    adminStat: adminStatsReducers,
    careplan: carePlanReducers,
    initialMonthReport:initialMonthReportReducers,
    adminNoti: adminNotificationsReducers,
    totalTimeSpent: timeSpentCurrentMonthReducer,
    completeCP : patientCPReportReducers,
    inventoryStats: inventoryStatsReducers,
    hrNoti: hrNotificationsReducers,
    readingsCount: remainingReadingsReducer,
    log: logsReducers

})

let initialState = {}

const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;
