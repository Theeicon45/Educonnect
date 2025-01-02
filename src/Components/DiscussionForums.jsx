import { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, message } from 'antd';
import { useParams } from 'react-router-dom';

const { TextArea } = Input;

const DiscussionForums = () => {
  const [forums, setForums] = useState([]);
  const [threads, setThreads] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedForumId, setSelectedForumId] = useState(null);
  const [selectedThreadId, setSelectedThreadId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');
  const [newCommentContent, setNewCommentContent] = useState('');
  const token = localStorage.getItem('token');

  // Fetch forums
  useEffect(() => {
    const fetchForums = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/forums', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch forums.');
        }
        const data = await response.json();
        setForums(data);
        
      } catch (error) {
        message.error('Error fetching forums');
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
          const response = await fetch(`http://localhost:3000/api/forums/${selectedForumId}/threads`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch threads.');
          }
          const data = await response.json();
          console.log('Fetched threads data:', data);
          setThreads(data);
        } catch (error) {
          message.error('Error fetching threads');
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
        const response = await fetch(`http://localhost:3000/api/threads/${selectedThreadId}/comments`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        } else {
          message.error('Error fetching comments');
        }
      };

      fetchComments();
    }
  }, [selectedThreadId, token]);

  const handleForumExpand = (forumId) => {
    setSelectedForumId(forumId);
  };

  const handleViewThread = (threadId) => {
    setSelectedThreadId(threadId);
    setShowModal(true);
  };

  const handleCreateThread = async () => {
    const response = await fetch(`http://localhost:3000/api/forums/${selectedForumId}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: newThreadTitle,
        content: newThreadContent,
        createdBy: 1, // Replace with actual user ID from the token
      }),
    });

    if (response.ok) {
      message.success('Thread created successfully');
      setNewThreadTitle('');
      setNewThreadContent('');
      setSelectedForumId(null); // Collapse the forum after creating the thread
    } else {
      message.error('Failed to create thread');
    }
  };

  const handleAddComment = async () => {
    const response = await fetch(`http://localhost:3000/api/threads/${selectedThreadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: newCommentContent,
        createdBy: 1, // Replace with actual user ID from the token
      }),
    });

    if (response.ok) {
      message.success('Comment added');
      setNewCommentContent('');
      setSelectedThreadId(null); // Close modal after adding comment
    } else {
      message.error('Failed to add comment');
    }
  };


  console.log('Threads for forum:', threads);

  const columns = [
    {
      title: 'Forum Name',
      dataIndex: 'Name',
      key: 'name',
      render: (text, record) => (
        <div onClick={() => handleForumExpand(record.Forum_ID)} className="cursor-pointer">
          {text}
        </div>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'description',
    },
    {
        title: 'Threads',
        dataIndex: 'threads',
        key: 'threads',
        render: (threads) => {
          if (!threads) {
            threads = []; // Fallback to an empty array if undefined
          }
          if (threads.length === 0) {
            return <span>No threads available</span>;
          }
          return (
            <>
              {threads.map((thread) => (
                <Button
                  type="primary"
                  key={thread.Thread_ID}
                  onClick={() => handleViewThread(thread.Thread_ID)}
                >
                  View {thread.Title}
                </Button>
              ))}
            </>
          );
        },
      }
      
  ];

  const handleCreateThreadForm = () => (
    <div>
      <Input
        placeholder="Thread Title"
        value={newThreadTitle}
        onChange={(e) => setNewThreadTitle(e.target.value)}
        className="mb-2"
      />
      <TextArea
        placeholder="Thread Content"
        value={newThreadContent}
        onChange={(e) => setNewThreadContent(e.target.value)}
        rows={4}
      />
      <Button type="primary" onClick={handleCreateThread} className="mt-2">
        Create Thread
      </Button>
    </div>
  );

  const renderCommentsModal = () => (
    <Modal
      title="Thread Comments"
      visible={showModal}
      onCancel={() => setShowModal(false)}
      footer={null}
    >
      <div>
        {comments.map((comment) => (
          <div key={comment.Comment_ID} className="my-2">
            <div className="flex justify-between">
              <div className="font-bold">{comment.Created_By}</div>
              <div className="text-gray-500">{comment.Created_At}</div>
            </div>
            <p>{comment.Content}</p>
          </div>
        ))}
      </div>
      <TextArea
        value={newCommentContent}
        onChange={(e) => setNewCommentContent(e.target.value)}
        placeholder="Add a comment"
        rows={3}
      />
      <Button type="primary" onClick={handleAddComment} className="mt-2">
        Post Comment
      </Button>
    </Modal>
  );

  return (
    
    <div>
      <h1>Discussion Forums</h1>

      {/* Forums Table */}
      
      <Table
        columns={columns}
        dataSource={forums}
        loading={loading}
        rowKey="Forum_ID"
        expandable={{
          expandedRowRender: handleCreateThreadForm,
        }}
      />

      {/* Comments Modal */}
      {renderCommentsModal()}
    </div>
  );
};

export default DiscussionForums;
