import Navbar from "../Components/Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        {/* Add your Navbar or Header Component here */}
        <Navbar/>
      </header>
      <main>
        {/* Render the child components */}
        {children}
      </main>
      
    </div>
  );
};

export default Layout;
