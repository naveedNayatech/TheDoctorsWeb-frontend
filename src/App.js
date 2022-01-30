import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import ProtectedRoute from './components/route/ProtectedRoute';
import StaffProtectedRoute from './components/route/StaffProtectedRoute';
// Admin Dashboard Components
import AdminDashboard from './components/AdminDashboard/Dashboard';
import Profile from './Screens/Admin/Profile';
import LandingPage from './Screens/LandingPage';
import Login from './Screens/Login';
import PatientsList from './Screens/Admin/PatientsList'; 
import DoctorsList from './Screens/Admin/DoctorsList'; 
import DoctorProfile from './Screens/Admin/DoctorProfile';
import AddNewDoctor from './Screens/Admin/AddNewDoctor';
import PatientProfile from './Screens/Admin/PatientProfile';
import EditDoctor from './Screens/Admin/EditDoctor';
import AssignDoctorToPatient from './Screens/Admin/AssignDoctorToPatient';
import RPMDevices from './Screens/Admin/RPMDevices';
import DevicesDetails from './Screens/Admin/DevicesDetails';
import AddRPMDevice from './Screens/Admin/AddRPMDevice';
import UpdateRPMDevice from './Screens/Admin/UpdateRPMDevice';
import PrintReceipt from './Screens/Admin/PrintReceipt';
import AddPatient from './Screens/Admin/AddPatient';
import HRList from './Screens/Admin/HRList';
import HRAdd from './Screens/Admin/HRAdd';
import UpdateHR from './Screens/Admin/UpdateHR';
import HRProfile from './Screens/Admin/HRProfile';
import AssignDrToHr from './Screens/Admin/AssignDrToHr';
import AssignPatientToHr from './Screens/Admin/AssignPatientToHR';
// Staff Screens
import StaffLogin from './Screens/Staff/StaffLogin';
import StaffDashboard from './Screens/Staff/StaffDashboard';
import StaffProfile from './Screens/Staff/StaffProfile';
import StaffPatient from './Screens/Staff/StaffPatients';
import StaffPatientProfile from './Screens/Staff/StaffPatientProfile';


function App() {
  return (
    <Router>
        <Route exact path='/' component={LandingPage} />,  
        <Route exact path='/login' component={Login} />,
        <ProtectedRoute exact path='/patients' isAdmin={true} component={PatientsList} />
        <ProtectedRoute exact path='/doctors' component={DoctorsList} />
        <ProtectedRoute exact path='/adminDashboard' isAdmin={true} component={AdminDashboard} />
        <ProtectedRoute exact path='/doctorProfile' isAdmin={true} component={DoctorProfile} />
        <ProtectedRoute exact path='/me' isAdmin={true} component={Profile} />
        <ProtectedRoute exact path='/adddoctor' isAdmin={true} component={AddNewDoctor} />
        <ProtectedRoute exact path='/patientprofile' isAdmin={true} component={PatientProfile} />
        <ProtectedRoute exact path="/editDoctor" isAdmin={true} component={EditDoctor} />
        <ProtectedRoute exact path='/assigndoctor' isAdmin={true} component={AssignDoctorToPatient} />
        <ProtectedRoute exact path='/devices' isAdmin={true} component={RPMDevices} />
        <ProtectedRoute exact path='/devicedetails' isAdmin={true} component={DevicesDetails} />
        <ProtectedRoute exact path='/device' isAdmin={true} component={AddRPMDevice} />
        <ProtectedRoute exact path='/printReceipt' isAdmin={true} component={PrintReceipt} />
        <ProtectedRoute exact path='/updatedevice' isAdmin={true} component={UpdateRPMDevice} />
        <ProtectedRoute exact path='/addpatient' isAdmin={true} component={AddPatient} />
        <ProtectedRoute exact path='/hrlist' isAdmin={true} component={HRList} /> 
        <ProtectedRoute exact path='/addhr' isAdmin={true} component={HRAdd} />
        <ProtectedRoute exact path='/updateHR' isAdmin={true} component={UpdateHR} />
        <ProtectedRoute exact path='/hrProfile' isAdmin={true} component={HRProfile} />
        <ProtectedRoute exact path='/assignDrToHr' isAdmin={true} component={AssignDrToHr} />
        <ProtectedRoute exact path='/assignPatientToHr' isAdmin={true} component={AssignPatientToHr} />
        {/*  */}
        <Route exact path="/stafflogin" component={StaffLogin} />
        <StaffProtectedRoute exact path="/Dashboard" isStaff={true} component={StaffDashboard} />
        <StaffProtectedRoute exact path="/staffProfile" component={StaffProfile} />
        <StaffProtectedRoute exact path="/staffPatients" component={StaffPatient} />
        <StaffProtectedRoute exact path="/staffPatientProfile" component={StaffPatientProfile} />
    </Router>
  )      
};

export default App;
