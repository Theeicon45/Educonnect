import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUserGraduate, FaChalkboardTeacher, FaMoneyBillWave, FaCommentDots, FaChartBar, FaFolderOpen, FaCog } from 'react-icons/fa';
import { MdSchool } from 'react-icons/md';


const Sidepannel = () => {
  return (
    <div>
      <div className="flex flex-col ">
        
      <Link to="/DashboardOverview" className='flex mb-4 items-end gap-5'><FaTachometerAlt />Dashboard Overview</Link>
      <Link to="/AdmissionManagement" className='flex mb-4 items-end gap-5'><MdSchool />Admission Management</Link>
      <Link to="/StudentManagement" className='flex mb-4 items-end gap-5'><FaUserGraduate />Student Management</Link>
      <Link to="/StaffManagement"className='flex mb-4 items-end gap-5' ><FaChalkboardTeacher />Staff Management</Link>
      <Link to="/FinanceManagement" className='flex mb-4 items-end gap-5'><FaMoneyBillWave /> Finance Management</Link>
      <Link to="/CommunicationCenter"className='flex mb-4 items-end gap-5' ><FaCommentDots />Communication Center</Link>
      <Link to="/ReportAnalytics" className='flex mb-4 items-end gap-5'><FaChartBar /> Report Analytics</Link>
      <Link to="/ResourceSharing" className='flex mb-4 items-end gap-5'><FaFolderOpen /> Resource Sharing</Link>
      <Link to="/HelpCenter" className='flex mb-4 items-end gap-5'>Help Center</Link>
      <Link to="/Settings" className='flex mb-4 items-end gap-5'><FaCog />Settings</Link>

    </div>
    </div>
  )
}

export default Sidepannel
