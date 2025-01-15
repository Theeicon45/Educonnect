import { more } from "../Utils/images"

const Usercards = ({ type }) => {
    return (
      <div className={`rounded-2xl odd:bg-green-200 even:bg-purple-200 p-4 flex-1 min-w[130px]`}>
        <div className="flex justify-between items-center">
            <span className="text-[10px] bg-white px-2 py-1 rounded-full text-cyan-400">2024/25</span>
          <img src={more} alt="More options" width={20} height={20} className="cursor-pointer" />
        </div>
        <h1 className="text-2xl font-semibold my-4">1,724</h1>
        <h2 className="font-medium text-sm text-gray-500">
        {type ? ` ${type}` : "No Type Provided"}
        </h2>
      </div>
    );
  };
  
  

export default Usercards
