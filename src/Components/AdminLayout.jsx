import Sidepannel from "./Sidepannel"
import { Outlet } from 'react-router-dom';
const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidepannel/>
      <div className="flex-grow p-6 ">
      <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
