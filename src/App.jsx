import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from "./Pages/About"
import Contact from "./Pages/Contact"
import Landing from "./Pages/Landing"
import Login from './Pages/login';
import Application from './Pages/Application';



const App = () => {
  return (
    <Router>

    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/Application" element={<Application/>}/>

    </Routes>
  </Router>
  )
}

export default App
