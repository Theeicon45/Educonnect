import StudentNav from "./StudentNav";

const Slayout = ({ children }) => {
  return (
    <div>
      <header>
        {/* Add your Navbar or Header Component here */}
        <StudentNav/>
      </header>
      <main>
        {/* Render the child components */}
        {children}
      </main>
    </div>
  );
};

export default Slayout;
