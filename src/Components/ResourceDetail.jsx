import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // React Router hook
import { Document, Page } from "react-pdf";
import ReactPlayer from "react-player";
import { message, Spin } from "antd";

const ResourceDetail = () => {
  const { id } = useParams(); // Get the resource ID from the URL
  const [resource, setResource] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchResource = async (resourceId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3000/api/resources/${resourceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch resource");
      }

      const data = await response.json();
      setResource(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      message.error("Could not fetch resource.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchResource(id);
    }
  }, [id]);

  const renderContent = () => {
    if (!resource) return null;

    const fileType = resource.file_path.split(".").pop().toLowerCase();
    const fileUrl = `http://localhost:3000${resource.file_path.replace("\\", "/")}`;

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

  if (loading) {
    return (
      <div style={{ textAlign: "center" }}>
        <Spin size="large" />
        <p>Loading resource...</p>
      </div>
    );
  }

  if (!resource) {
    return <p>Resource not found.</p>;
  }

  return (
    <div>
      <h1>{resource.title}</h1>
      <p>{resource.description}</p>
      <div>{renderContent()}</div>
    </div>
  );
};

export default ResourceDetail;
