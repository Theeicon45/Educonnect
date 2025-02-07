import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";

const ResourceSharing = () => {
  const [filter, setFilter] = useState("All");
  const [resources, setResources] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null); // Track selected video
  const [playing, setPlaying] = useState(false); // Track if the video is playing
  const videoRefs = useRef({});

  // Fetch resources from database
  useEffect(() => {
    fetch("http://localhost:3000/api/resources")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setResources(data);
          console.log(data);
        } else {
          console.error("API did not return an array:", data);
          setResources([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching resources:", err);
        setResources([]);
      });
  }, []);

  // Filter resources based on type
  const filterByType = (resource) => {
    const filePath = resource.file_path.toLowerCase();

    if (filter === "All") return true;

    if (filter === "Books") {
      return /\.(txt|doc|docx|pdf)$/i.test(filePath); // Filter document files
    }

    if (filter === "Pictures") {
      return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(filePath); // Filter image files
    }

    if (filter === "Audio") {
      return /\.(mp3|m4a|wav)$/i.test(filePath); // Filter audio files
    }

    if (filter === "Videos") {
      return /\.(mp4|avi|mov|wmv)$/i.test(filePath); // Filter video files
    }

    return false; // Default to no match
  };

  // Apply filter to resources
  const filteredResources = resources.filter(filterByType);

  // Handle video click to make it large
  const handleVideoClick = (video) => {
    setSelectedVideo(video); // Set clicked video as selected
    setPlaying(true); // Start playing when selected
  };

  // Handle mouse enter for small videos (muted and autoplay)
  const handleMouseEnter = (id) => {
    if (videoRefs.current[id]) {
      videoRefs.current[id].seekTo(0); // Reset video to the beginning
      videoRefs.current[id].getInternalPlayer().play(); // Start playing the video
      videoRefs.current[id].getInternalPlayer().muted = true; // Mute the video
    }
  };

  // Handle mouse leave for small videos (pause and unmute)
  const handleMouseLeave = (id) => {
    if (videoRefs.current[id]) {
      videoRefs.current[id].seekTo(0); // Reset video to the beginning
      videoRefs.current[id].getInternalPlayer().pause(); // Pause the video when mouse leaves
      videoRefs.current[id].getInternalPlayer().muted = false; // Unmute after mouse leaves
    }
  };

  // Ensure the selected video persists after filtering
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);

    // If a video is selected, make sure it's still part of the filtered resources
    if (
      selectedVideo &&
      !filteredResources.find((res) => res.id === selectedVideo.id)
    ) {
      setSelectedVideo(null); // Deselect the video if it's no longer in the list
    }
  };

  return (
    <div className="p-4">
      {/* Filter Options */}
      <div className="flex space-x-4 mb-4">
        {["All", "Books", "Videos", "Pictures", "Audio"].map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded ${
              filter === category ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleFilterChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Render Selected Video at the Top */}
      {selectedVideo && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">{selectedVideo.title}</h3>
          <ReactPlayer
            url={`http://localhost:3000/${selectedVideo.file_path}`}
            playing={playing} // Ensure the video plays when selected
            controls
            width="100%"
            height="500px" // Make it large
          />
          <p className="mt-2 text-sm">{selectedVideo.description}</p>
        </div>
      )}

      {/* Resource Grid */}
      <div className="grid grid-cols-3 gap-4">
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            className="flex flex-col justify-between px-2 rounded shadow cursor-pointer"
            onClick={() =>
              resource.resource_type === "video" && handleVideoClick(resource)
            } // Only videos can be clicked
            onMouseEnter={() =>
              resource.resource_type === "video" &&
              handleMouseEnter(resource.id)
            } // Play on hover
            onMouseLeave={() =>
              resource.resource_type === "video" &&
              handleMouseLeave(resource.id)
            } // Reset on leave
          >
            {/* Render Based on Type */}
            <div className="flex-grow rounded-lg">
              {resource.resource_type === "video" ? (
                <ReactPlayer
                  ref={(ref) => (videoRefs.current[resource.id] = ref)} // Store ref for each video
                  url={`http://localhost:3000/${resource.file_path}`}
                  playing={false} // Don't play until selected
                  controls={false} // No controls for small videos
                  width="100%"
                  height="100%" // Make videos smaller by default
                  type="video/mp4"
                  className="rounded-lg" // Rounded corners for videos
                />
              ) : resource.resource_type === "book" ? (
                <a
                  href={`http://localhost:3000/${resource.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  Open Document
                </a>
              ) : resource.resource_type === "picture" ? (
                <img
                  src={`http://localhost:3000/${resource.file_path}`}
                  alt={resource.title}
                  className="w-full h-32 object-cover rounded" // Rounded corners for images
                />
              ) : resource.resource_type === "audio" ? (
                <ReactPlayer
                  url={`http://localhost:3000/${resource.file_path}`}
                  controls
                  width="100%"
                  height="50px"
                  type="audio/mp4"
                />
              ) : null}
            </div>

            <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
            <p className="text-sm text-gray-400">{resource.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceSharing;
