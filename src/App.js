import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import ProtectedRoute from './components/route/ProtectedRoute';
import StaffProtectedRoute from './components/route/StaffProtectedRoute';
import HRProtectedRoute from './components/route/HRProtectedRoute';
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
import AdminTimeReport from './Screens/Admin/AdminTimeReport';
import AdminPrintReport from './Screens/Admin/AdminPrintReport';
import EditPatient from './Screens/Admin/EditPatient';
import InitialMonthReport from './Screens/Admin/InitialMonthReport';
import PatientCPReport from './Screens/Admin/PatientCPReport';
import CompleteInventoryList from './Screens/Admin/CompleteInventoryList';
import AdminResetPassword from './Screens/Admin/AdminResetPassword';
import TelemetaryReport from './Screens/Admin/TelemetaryReport';

// Staff Screens
import StaffLogin from './Screens/Staff/StaffLogin';
import StaffDashboard from './Screens/Staff/StaffDashboard';
import StaffProfile from './Screens/Staff/StaffProfile';
import StaffPatient from './Screens/Staff/StaffPatients';
import StaffPatientProfile from './Screens/Staff/StaffPatientProfile';
import DoctorAddPatient from './Screens/Staff/DoctorAddPatient';
import DocCareplanList from './Screens/Staff/DocCareplanList';
// HR Screens
import HrLogin from './Screens/HR/HrLogin';
import HRDashboard from './Screens/HR/HRDashboard'; 
import HRPatientsList from './Screens/HR/HRPatientsList';
import HRPatientProfile from './Screens/HR/HRPatientProfile';
import HR from './Screens/HR/HR';
import TimeReport from './Screens/HR/TimeReport';
import PrintReport from './Screens/HR/PrintReport';
import HRAddPatient from './Screens/HR/HRAddPatient';
import CareplanDetails from './Screens/HR/CareplanDetails';
import CareplanList from './Screens/HR/CareplanList';
// General links
import ForgotPassword from './Screens/ForgotPassword';
import ResetPassword from './Screens/ResetPassword';

function App() {
  return (
    <Router>
        <Route exact path='/' component={LandingPage} />,  
        <Route exact path='/login' component={Login} />,
        <Route exact path='/auth/forgot' component={ForgotPassword} />
        <Route exact path="/v1/auth/reset-password" component={ResetPassword} />
        <ProtectedRoute exact path='/patients' isAdmin={true} component={PatientsList} />
        <ProtectedRoute exact path='/doctors' component={DoctorsList} />
        <ProtectedRoute exact path='/adminDashboard' isAdmin={true} component={AdminDashboard} />
        <ProtectedRoute exact path='/doctorProfile' isAdmin={true} component={DoctorProfile} />
        <ProtectedRoute exact path='/me' isAdmin={true} component={Profile} />
        <ProtectedRoute exact path='/adddoctor' isAdmin={true} component={AddNewDoctor} />
        <ProtectedRoute exact path='/patientprofile' isAdmin={true} component={PatientProfile} />
        <ProtectedRoute exact path="/Doctor/Edit" isAdmin={true} component={EditDoctor} />
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
        <ProtectedRoute exact path="/Admin/Report" isAdmin={true} component={AdminTimeReport} />
        <ProtectedRoute exact path='/Admin/Report/Print' isAdmin={true} component={AdminPrintReport} />
        <ProtectedRoute exact path='/Patients/Edit' isAdmin={true} component={EditPatient} />
        <ProtectedRoute exact path="/Admin/Report/InitialMonth" isAdmin={true} component={InitialMonthReport} />
        <ProtectedRoute exact path='/Admin/Report/patient' isAdmin={true} component={PatientCPReport} />
        <ProtectedRoute exact path='/Admin/Inventory/Download' isAdmin={true} component={CompleteInventoryList} />
        <ProtectedRoute exact path="/Credentials" isAdmin={true} component={AdminResetPassword} />
        <ProtectedRoute exact path='/report/telemetary' isAdmin={true} component={TelemetaryReport} />
        {/* <Route exact path='/pdfReport' isAdmin={true} component={MyDocument} /> */}

         {/* Staff Routes */}
        <Route exact path="/doctor/login" component={StaffLogin} />
        <StaffProtectedRoute exact path="/doctor/dashboard" isStaff={true} component={StaffDashboard} />
        <StaffProtectedRoute exact path="/staffProfile" component={StaffProfile} />
        <StaffProtectedRoute exact path="/doctor/patients" component={StaffPatient} />
        <StaffProtectedRoute exact path="/doctor/patient/profile" component={StaffPatientProfile} />
        <StaffProtectedRoute exact path="/doctor/Addpatient" component={DoctorAddPatient} />
        <StaffProtectedRoute exact path="/doctor/careplan" component={DocCareplanList} />
        {/* HR Routes */}
        <Route exact path="/hr/login" component={HrLogin} />
        <HRProtectedRoute exact path="/HrDashboard" isHR={true} component={HRDashboard} />
        <HRProtectedRoute exact path="/HrPatients" isHR={true} component={HRPatientsList} />
        <HRProtectedRoute exact path="/hrpatientProfile" isHR={true} component={HRPatientProfile} />
        <HRProtectedRoute exact path="/hr" isHR={true} component={HR} />
        <HRProtectedRoute exact path="/timeReport" isHR={true} component={TimeReport} />
        <HRProtectedRoute exact path="/printReport" isHR={true} component={PrintReport} />
        <HRProtectedRoute exact path="/Hr/AddPatient" component={HRAddPatient} />
        <HRProtectedRoute exact path="/HR/Careplan/Details" isHR={true} component={CareplanDetails} />
        <HRProtectedRoute exact path="/HR/careplans" isHR={true} component={CareplanList} />
    </Router>
  )      
};

export default App;
