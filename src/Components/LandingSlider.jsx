import {  Inside } from "../Utils/images"
import { Link } from 'react-router-dom';

const LandingSlider = () => {
  return (
    <>
      <div className="w-full h-svh overflow-hidden">
        <img src={Inside} alt="inside" className=""/>
        <p id="landing-text" className=" absolute   top-80 text-tahiti-900  left-1/2" >Establish a Bright Future for Your Child <br /> at Terry and Kay School, <br /> Where Excellence Begins.</p>
        <Link to="/Application">
         <button id="button1" type="submit" className=" hover:bg-cyan-900 absolute bg-cyan-500 -translate-y-96 p-2 w-48 rounded-full left-1/2 "> Apply now</button>
        </Link>
       
      </div>
    </>
  )
}

export default LandingSlider
