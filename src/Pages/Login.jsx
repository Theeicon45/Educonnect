import { FaUser, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Login = () => {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form id="Login-form" className="w-96 p-6 bg-white rounded shadow-md">
          <h2 id="Login" className="text-center text-2xl  mb-4">Login</h2>
          <div id="input-group" className="flex items-center mb-4">
            <FaUser className="icon mr-2 text-gray-600" />
            <input
              id="inputsec"
              type="text"
              placeholder="Type your username"
              required
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-tahiti-500"
            />
          </div>
          <div id="input-group" className="flex items-center mb-4">
            <FaLock className="icon mr-2 text-gray-600" />
            <input
              id="inputsec"
              type="password"
              placeholder="Type your password"
              required
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-tahiti-500"
            />
          </div>
          <div className="text-right mb-4">
            <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-tahiti-500 text-white p-2 rounded hover:bg-cyan-600 transition-colors duration-200"
          >
            LOGIN
          </button>
        </form>
        
      </div>
      <div className=' bg-gray-100'>
        
        <Link to="/">
            <button className='bg-tahiti-400 w-36 right-0 absolute -mt-10 rounded-full  '>Back</button>
             </Link>
      </div>
            
      </>
        
      
    );
  };
  
  export default Login;
  