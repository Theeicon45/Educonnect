import AnnouncementManager from "../Components/AnnouncementManager";
import CreateEvent from "../Components/CreateEvent";
import DiscussionForums from "../Components/DiscussionForums";
import EventManager from "../Components/EventManager";

const CommunicationCenter = () => {
  return (
    <div className="">
      <div className="flex items-center w-full">
        {/*Left */}
        <div className=" w-1/2">
          <AnnouncementManager />
        </div>
        {/* Right */}
        <div className="w-1/2">
          <EventManager />
        </div>
      </div>
      <DiscussionForums/>
    </div>
  );
};

export default CommunicationCenter;
