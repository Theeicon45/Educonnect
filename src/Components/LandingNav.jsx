import { transparentBlack } from "../Utils/images"


const LandingNav = () => {
  return (
    <div className=" bg-tahiti-400">
        <nav className="flex items-center pr-4">
            <div className="w-full p-3 " >
                <img src={transparentBlack} alt="" className="w-52"/>
                
            </div>
             
             <button className="bg-white h-8* w-36 items-center rounded-full">Login</button>
        </nav>
    </div>
  )
}

export default LandingNav
