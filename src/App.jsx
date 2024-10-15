import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from "./Pages/About"
import Contact from "./Pages/Contact"
import Landing from "./Pages/Landing"
import Navbar from './Components/Navbar';
Navbar

const App = () => {
  return (
    <Router>

    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </Router>
  )
}

export default App
