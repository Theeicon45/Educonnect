import UploadResource from "../Components/UploadResource"


const ResourceSharing = () => {
  return (
    <div className="">
      <div className="flex items-center h-[400px] gap-8 p-4">
        {/* Left */}
          <div className="w-1/2 h-full bg-purple-100 rounded-lg">
          <UploadResource/>
          </div>
          {/* Right */}
          <div className="w-1/2 h-full bg-green-100 rounded-lg">r</div>
      </div>
    </div>
  )
}

export default ResourceSharing
