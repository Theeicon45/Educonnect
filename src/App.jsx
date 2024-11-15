import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './Components/AdminLayout';
import Contact from "./Pages/Contact"
import Landing from "./Pages/Landing"
import Login from './Pages/login';
import Application from './Pages/Application';
import AdminPage from './Pages/AdminPage';
import StudentPage from './Pages/StudentPage';
import TeachersPage from './Pages/TeachersPage';


import DashboardOverview from './AdminPages/DashboardOverview';
import AdmissionManagement from './AdminPages/AdmissionManagement';
import StaffManagement from './AdminPages/StaffManagement';
import ResourceSharing from './AdminPages/ResourceSharing';
import Settings from './AdminPages/Settings';
import HelpCenter from './AdminPages/HelpCenter';
import ReportAnalytics from './AdminPages/ReportAnalytics';
import CommunicationCenter from './AdminPages/CommunicationCenter';
import StudentManagement from './AdminPages/StudentManagement';
import FinanceManagement from './AdminPages/FinanceManagement';



const App = () => {
  return (
    <Router>

    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/Application" element={<Application/>}/>
      <Route path="/adminpage" element={<AdminPage />} />
      <Route path="/teacherspage" element={<TeachersPage />} />
      <Route path="/studentpage" element={<StudentPage />} />

      <Route element={<AdminLayout />}>
            <Route path="/AdmissionManagement" element={<AdmissionManagement/>} />
      <Route path="/FinanceManagement" element={<FinanceManagement />} />
      <Route path="/StudentManagement" element={<StudentManagement />} />
      <Route path="/CommunicationCenter" element={<CommunicationCenter />} />
      <Route path="/ReportAnalytics" element={<ReportAnalytics />} />
      <Route path="/HelpCenter" element={<HelpCenter />} />
      <Route path="/StaffManagement" element={<StaffManagement />} />
      <Route path="/DashboardOverview" element={<DashboardOverview />} />
      <Route path="/ResourceSharing" element={<ResourceSharing />} />
      <Route path="/Settings" element={<Settings />} />

        </Route>
      

    </Routes>
  </Router>
  )
}

export default App
