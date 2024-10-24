import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from "./Pages/About"
import Contact from "./Pages/Contact"
import Landing from "./Pages/Landing"
import Login from './Pages/login';



const App = () => {
  return (
    <Router>

    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </Router>
  )
}

export default App
