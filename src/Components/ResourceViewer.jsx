import { useState, useEffect } from "react";
import { Select, List, message } from "antd";
import { Document, Page ,pdfjs} from "react-pdf"; // Import react-pdf
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom"; // React Router 
import { moredark } from "../Utils/images";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/browse/pdfjs-dist@2.10.377/build/pdf.worker.min.js`;


const { Option } = Select;

const ResourceViewer = () => {
  const [gradeLevel, setGradeLevel] = useState(null);
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null); // State for selected resource
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // React Router navigate function

  const fetchResources = async (grade) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/resources/${grade}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch resources");
      }

      const data = await response.json();
      setResources(data);
    } catch (error) {
      console.error(error);
      message.error("Could not fetch resources.");
    }
  };

  useEffect(() => {
    if (gradeLevel) {
      fetchResources(gradeLevel);
    }
  }, [gradeLevel]);

  const handleOpenResource = (resource) => {
    const fileUrl = `http://localhost:3000/${resource.file_path.replace("\\", "/")}`;
    window.open(fileUrl, "_blank");
  };

  const renderContent = (resource) => {
    const fileType = resource.file_path.split(".").pop().toLowerCase();
    const fileUrl = `http://localhost:3000/${resource.file_path.replace("\\", "/")}`;
    console.log('The link is',fileUrl);
    if (fileType === "pdf") {
      return (
        <div style={{ height: "700px" }}>
            
          <Document
            file={fileUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            onLoadError={(error) => {
              console.error("Error loading PDF:", error);
              setError("Failed to load PDF file.");
            }}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <div>
            <p>
              Page {pageNumber} of {numPages}
            </p>
            <button
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber(pageNumber - 1)}
            >
              Previous
            </button>
            <button
              disabled={pageNumber >= numPages}
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              Next
            </button>
            {error && <p>{error}</p>}
          </div>
        </div>
      );
    } else if (["mp4", "webm", "ogg"].includes(fileType)) {
      return (
        <ReactPlayer
          url={fileUrl}
          controls
          width="100%"
          height="500px"
        />
      );
    } else {
      return <p>Unsupported file type. Please download the file to view it.</p>;
    }
  };

  return (
    <div className="p-4">
        <div className="flex justify-between items-center">
                    <h1 className="text-lg font-semibold">Media View</h1>
                    <img src={moredark} alt="" width={20} height={20} />
                  </div>
      <Select
        placeholder="Select Grade"
        onChange={setGradeLevel}
        style={{ width: 200, marginBottom: 20 }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
          <Option key={grade} value={grade}>
            Grade {grade}
          </Option>
        ))}
      </Select>

      <List
        bordered
        dataSource={resources}
        renderItem={(item) => (
          <List.Item
            actions={[
              <button
                key={item.id} // Assuming `item.id` is unique
                type="button"
                onClick={() => handleOpenResource(item)} // Trigger selection
              >
                Open
              </button>,
            ]}
          >
            <List.Item.Meta
              title={item.title}
              description={`${item.description} | ${item.category}`}
            />
          </List.Item>
        )}
      />

      <div style={{ marginTop: "20px" }}>
        {selectedResource ? renderContent(selectedResource) : null}
      </div>
    </div>
  );
};

export default ResourceViewer;
