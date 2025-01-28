
import Sidepannel from './SidePannel'
import TLayout from './TLayout'
import { Outlet } from 'react-router-dom'

const TeachersLayout = () => {
  return (
    <div className="flex ">
    <Sidepannel/>
    <div className="flex-grow p-6 bg-gray-50 " >
    <TLayout/>
    <Outlet />
    
    </div>
  </div>
  )
}

export default TeachersLayout
