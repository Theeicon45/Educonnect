import { FaArrowUp } from "react-icons/fa6"
import { moredark, User } from "../Utils/images"

   

const PopulationStats = ({type}) => {
  return (
    <div className=" mt-4 odd:bg-green-100 even:bg-purple-100  flex flex-col gap-4 rounded-2xl p-4 w-[200px] h-[250px]  ">
          {/* Top */}
          <div className="flex items-center justify-between">
            <img src={User} alt="user" width={20} height={20} />
            <img src={moredark} alt="more" width={20} height={20} />
          </div>
          <h1 className="text-2xl font-bold mt-12 ">1,530</h1>
          <h2 className="font-medium text-sm  mb-4">
            {type ? ` ${type}` : "No Type Provided"}
          </h2>
    
          {/* growth/drop */}
    
          <div className=" mt-2 flex gap-8 text-green-500 text-xs">
            <FaArrowUp />
            44.5%
          </div>
        </div>
  )
}

export default PopulationStats
