import Navbar from "../Components/Navbar";
import TeacherNavbar from "./TeacherNav";

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        {/* Add your Navbar or Header Component here */}
        <TeacherNavbar />
      </header>
      <main>
        {/* Render the child components */}
        {children}
      </main>
    </div>
  );
};

export default Layout;
