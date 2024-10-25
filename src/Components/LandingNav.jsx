import { transparentBlack } from "../Utils/images"
import { Link } from 'react-router-dom';

const LandingNav = () => {
  return (
    <div className=" bg-tahiti-400">
        <nav className="flex items-center pr-4">
            <div className="w-full p-3 " >
             <Link to="/">
              <img src={transparentBlack} alt="" className="w-52"/>
             </Link>
               
            
            </div>
             <Link to="/login">
             <button className="bg-white h-8 w-36 items-center rounded-full hover:bg-slate-200 active:bg-tahiti-800 ease-in">Login</button>
             </Link>
             
        </nav>
    </div>
  )
}

export default LandingNav
