import { useEffect, useState } from "react";
import { Table, Button, Modal, Input, message } from "antd";
import { IoMdSend } from "react-icons/io";

const { TextArea } = Input;

const DiscussionForums = () => {
  const [forums, setForums] = useState([]);
  const [threads, setThreads] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedForumId, setSelectedForumId] = useState(null);
  const [selectedThreadId, setSelectedThreadId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [threadFormValues, setThreadFormValues] = useState({});
  const [newCommentContent, setNewCommentContent] = useState("");
  const token = localStorage.getItem("token");

  // Fetch forums
  useEffect(() => {
    const fetchForums = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/forums", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch forums.");
        }
        const data = await response.json();
        setForums(data);
      } catch (error) {
        message.error("Error fetching forums");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchForums();
  }, [token]);

  // Fetch threads when a forum is selected
  useEffect(() => {
    if (selectedForumId) {
      const fetchThreads = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `http://localhost:3000/api/forums/${selectedForumId}/threads`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch threads.");
          }
          const data = await response.json();
          setThreads(data);
        } catch (error) {
          console.error("Error fetching threads:", error);
          message.error("Error fetching threads");
        } finally {
          setLoading(false);
        }
      };

      fetchThreads();
    }
  }, [selectedForumId, token]);

  // Fetch comments when a thread is selected
  useEffect(() => {
    if (selectedThreadId) {
      const fetchComments = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/threads/${selectedThreadId}/comments`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setComments(data);
          } else {
            message.error("Failed to fetch comments");
          }
        } catch (error) {
          console.error("Error fetching comments:", error);
          message.error("Error fetching comments");
        }
      };
  
      fetchComments();
    }
  }, [selectedThreadId, token]); // When selectedThreadId or token changes, fetch comments again
  

  const handleForumExpand = (forumId) => {
    // Toggle the expanded forum
    if (selectedForumId === forumId) {
      setSelectedForumId(null); // Close if it's already open
    } else {
      setSelectedForumId(forumId);
    }
  };

  const handleViewThread = (threadId) => {
    setSelectedThreadId(threadId);
    setShowModal(true);
  };

  const handleCreateThread = async (forumId) => {
    const formValues = threadFormValues[forumId];

    if (!formValues || !formValues.title.trim() || !formValues.content.trim()) {
      message.error("Title and content are required!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/forums/${forumId}/threads`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: formValues.title.trim(),
            content: formValues.content.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create thread.");
      }

      const data = await response.json();
      message.success("Thread created successfully!");

      // Reset form values for the specific forum
      setThreadFormValues((prevValues) => ({
        ...prevValues,
        [forumId]: { title: "", content: "" },
      }));

      // Update threads for the forum
      setThreads((prevThreads) => [
        ...prevThreads,
        {
          Thread_ID: data.threadId,
          Title: data.title,
          Content: data.content,
          Created_By: data.createdBy,
          Created_At: data.createdAt,
          Forum_ID: forumId,
        },
      ]);
    } catch (error) {
      console.error(error);
      message.error("Error creating thread");
    }
  };

  const handleInputChange = (forumId, field, value) => {
    setThreadFormValues((prevValues) => ({
      ...prevValues,
      [forumId]: {
        ...prevValues[forumId],
        [field]: value,
      },
    }));
  };

  const handleAddComment = async () => {
    if (!newCommentContent.trim()) {
      message.error("Comment content cannot be empty.");
      return;
    }
  
    const response = await fetch(
      `http://localhost:3000/api/threads/${selectedThreadId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure token is correct here
        },
        body: JSON.stringify({
          content: newCommentContent,
        }),
      }
    );
  
    if (response.ok) {
      message.success("Comment added");
      setNewCommentContent("");  // Reset the comment input
      setSelectedThreadId(null);  // Close the modal after adding comment
      setShowModal(false);
    } else {
      message.error("Failed to add comment");
    }
  };
  
  
  

  const columns = [
    {
      title: "Forum Name",
      dataIndex: "Name",
      key: "name",
      render: (text, record) => (
        <div
          onClick={() => handleForumExpand(record.Forum_ID)}
          className="cursor-pointer"
        >
          {text}
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "description",
    },
    {
      title: "Threads",
      key: "threads",
      render: (_, record) => {
        const forumThreads = threads.filter(
          (thread) => thread.Forum_ID === record.Forum_ID
        );
        if (!forumThreads || forumThreads.length === 0) {
          return <span>No threads available</span>;
        }
        return (
          <>
            {forumThreads.map((thread) => (
              <Button
                type="primary"
                key={thread.Thread_ID}
                onClick={() => handleViewThread(thread.Thread_ID)}
                style={{
                  maxWidth: "200px", // Optional: Adjust width for consistent styling
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                className="p-2 mb-2 mx-2"
                title={thread.Title} // Show full title on hover
              >
                View {thread.Title.split(" ").slice(0, 2).join(" ")}...
              </Button>
            ))}
          </>
        );
      },
    },
  ];

  const handleCreateThreadForm = (forumId) => {
    const formValues = threadFormValues[forumId] || { title: "", content: "" };

    return (
      <div className="p-4">
        <Input
          placeholder="Thread Title"
          value={formValues.title}
          onChange={(e) =>
            handleInputChange(forumId, "title", e.target.value)
          }
          className="mb-2"
        />
        <TextArea
          placeholder="Thread Content"
          value={formValues.content}
          onChange={(e) =>
            handleInputChange(forumId, "content", e.target.value)
          }
          rows={4}
        />
        <Button
          type="primary"
          onClick={() => handleCreateThread(forumId)}
          className="mt-2"
        >
          Create Thread
        </Button>
      </div>
    );
  };

  const renderCommentsModal = () => (
    <Modal
      title="Thread Comments"
      visible={showModal}
      onCancel={() => setShowModal(false)}
      footer={null}
    >
      <div className="border-2 border-tahiti-500 rounded-lg h-[300px] flex flex-col justify-between">
        <div>
          {/* Display Existing Comments */}
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.Comment_ID} className="my-2">
                <div className="flex justify-between">
                  <div className="font-bold">{comment.Created_By}</div>
                  <div className="text-gray-500">
                    {new Date(comment.Created_At).toLocaleString()}
                  </div>
                </div>
                <p>{comment.Content}</p>
              </div>
            ))
          ) : (
            <p>No comments available.</p>
          )}
        </div>
  
        {/* Add Comment */}
        <div className="flex relative">
          <TextArea
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
            placeholder="Add a comment"
            rows={3}
          />
          <Button
            type="primary"
            onClick={handleAddComment}
            className="absolute translate-x-[30em] mt-10"
          >
            <IoMdSend />
          </Button>
        </div>
      </div>
    </Modal>
  );
  
  return (
    <div className="p-4 mt-4 ">
      <h1 className="font-semibold text-2xl">Discussion Forums</h1>

      {/* Forums Table */}
      <Table
        columns={columns}
        dataSource={forums}
        loading={loading}
        rowKey="Forum_ID"
        expandable={{
          expandedRowRender: (record) => handleCreateThreadForm(record.Forum_ID),
        }}
      />

      {/* Comments Modal */}
      {renderCommentsModal()}
    </div>
  );
};

export default DiscussionForums;
