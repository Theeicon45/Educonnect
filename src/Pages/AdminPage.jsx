import { useEffect } from 'react';
import AdminLayout from "../Components/AdminLayout"
const AdminPage = () => {
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, '', window.location.href);
    };
  }, []);

  return (
    <div >
     <AdminLayout/>
     
    </div>
  )
}

export default AdminPage
