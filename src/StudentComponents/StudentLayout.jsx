
import Sidepannel from './SidePannel'
import Slayout from './Slayout'
import { Outlet } from 'react-router-dom'

const StudentLayout = () => {
  return (
    <div className="flex ">
    <Sidepannel/>
    <div className="flex-grow p-6 bg-gray-50 " >
    <Slayout/>
    <Outlet />
    
    </div>
  </div>
  )
}

export default StudentLayout
