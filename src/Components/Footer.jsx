import { quickLinks } from "../assets/Quicklinks";
import { FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa'; // For social icons

const Footer = () => {
  return (
    <footer className="bg-brown p-4 text-white">
      <div className="container mx-auto flex justify-between">
        {/* Quick Links Section */}
        <div className="">
          <h4 className="font-bold text-lg mb-4">Quick Links</h4>
          <ul className="flex flex-col gap-2">
            {
            quickLinks.map((nav, index) => (
              <li key={index} className="hover:underline cursor-pointer">
                {nav}
              </li>
            ))
            }
          </ul>
        </div>

        {/* Social Icons Section */}
        <div className="flex gap-4 ">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-slate-600">
            <FaFacebook size={24} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-slate-600">
            <FaInstagram size={24} />
          </a>
          <a href="mailto:info@example.com" className="text-white hover:text-slate-600">
            <FaEnvelope size={24} />
          </a>
        </div>

        
      </div>
      {/* Copyright Section */}
      <div className="text-center ">
          <p className="text-sm ">&copy; 2024 Terry and Kay School. All rights reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;
