import { useState } from 'react';
import { FaUser, FaLock, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  // Handler for form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        
        const { role } = data;

        // Redirect based on role
        if (role.toLowerCase() === 'admin') {
          navigate('/DashboardOverview');
      } else if (role.toLowerCase() === 'teacher') {
          navigate('/teacherspage');
      } else if (role.toLowerCase() === 'student') {
          navigate('/studentpage');
      }
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form id="Login-form" className="w-96 p-6 bg-white rounded shadow-md" onSubmit={handleLogin}>
        <Link to="/">
          <FaArrowLeft className="icon hover:text-tahiti-400 active:text-tahiti-800" />
        </Link>
        <h2 id="Login" className="text-center text-2xl mb-4">Login</h2>

        <div id="input-group" className="flex items-center mb-4">
          <FaUser className="icon mr-2 text-gray-600" />
          <input
            id="inputsec"
            type="text"
            placeholder="Type your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-tahiti-500"
          />
        </div>

        <div id="input-group" className="flex items-center mb-4">
          <FaLock className="icon mr-2 text-gray-600" />
          <input
            id="inputsec"
            type={passwordVisible ? "text" : "password"}
            placeholder="Type your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-tahiti-500"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="ml-2"
          >
            {passwordVisible ? <FaEyeSlash className="text-gray-600" /> : <FaEye className="text-gray-600" />}
          </button>
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
  );
};

export default Login;
